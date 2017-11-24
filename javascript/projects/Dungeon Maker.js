class Furniture {
	constructor(room, desc) {
		this.room = room;
		this.description = desc;
		this.room.furniture.push(this);
		this.items = [];
		this.actions = {};
	}

	take(player, item) {
		if (item instanceof String) {
			if (
				this.items.some(function(i) {
					i.name == item;
				})
			) {
				this.items.forEach(function(i, index) {
					if (i.name == item) {
						player.inventory.push(i);
						this.items.pop(index);
					}
				});
			} else {
				return null;
			}
		} else if (item instanceof Number) {
			player.inventory.push(this.items[item]);
			this.items.pop(item);
		}
	}

	interact(item) {
		Object.keys(actions).forEach(function(itm) {
			if (itm.hash == item.hash) {
				actions[item.hash]();
			}
		});
	}
}

function hash() {
	let char = [
		'0',
		'1',
		'2',
		'3',
		'4',
		'5',
		'6',
		'7',
		'8',
		'9',
		'a',
		'b',
		'c',
		'd',
		'e',
		'f',
	];
	let hash = '';
	for (let i = 0; i < 32; i++) {
		hash += Math.floor(Math.random() * char.length);
	}
	return hash;
}

class Item {
	constructor(name, desc, weight = 1.0) {
		this.name = name;
		this.description = desc;
		this.weight = weight;
		this.hash = hash();
		this.actions = {};
	}

	use(on) {
		on.interact(this);
	}

	interact(item) {
		Object.keys(actions).forEach(function(itm) {
			if (itm.hash == item.hash) {
				actions[item.hash]();
			}
		});
	}
}

class Weapon extends Item {
	constructor(name, desc, damage) {
		super(name, desc);
		this.damage = damage;
	}
}

class Container extends Item {
	constructor(name, desc, capacity) {
		super(name, desc);
		this.items = [];
		this.capacity = capacity;
	}

	add(item) {
		function selfContainmentCheck(item, callback, self) {
			if (item instanceof Container) {
				callback(
					item.items.some(function(itm) {
						if (itm instanceof Container) {
							if (itm == item) {
								return true;
							} else {
								selfContainmentCheck(itm, function(res) {
									return res;
								});
							}
						} else {
							return false;
						}
					}),
					self
				);
			} else {
				callback(false, self);
			}
		}

		selfContainmentCheck(
			item,
			function(result, self) {
				if (result) {
					throw 'Error: Self-containment';
				} else {
					self.items.push(item);
				}
			},
			this
		);
	}
}

class Bag extends Container {
	constructor(name, desc, size) {
		super(name, desc, size);
	}
}

class Clothes {
	constructor(type, color, material, name) {
		if (
			[
				'shirt',
				'pants',
				'underwear',
				'bra',
				'gloves',
				'hat',
				'socks',
				'shoes',
			].some(function(t) {
				return type == t;
			})
		) {
			this.type = type;
			this.name = name;
			this.color = color;
			this.material = material;
		}
	}
}

function clothe() {
	let colors = ['red', 'orange', 'blue', 'white', 'grey'];
	let ret = [];
	[
		'shirt',
		'pants',
		'underwear',
		'bra',
		'gloves',
		'hat',
		'socks',
		'shoes',
	].forEach(function(t) {
		ret.push(
			new Clothes(
				i,
				colors[Math.floor(Math.random() * colors.length)],
				'cotton'
			)
		);
	});
	return ret;
}

class Conversation {
	constructor(
		display,
		item,
		trade,
		def,
		bothHaveItem = '',
		playerLacksItem = '',
		npcLacksItem = ''
	) {
		this.display = display; //display in conversation context
		this.item = item; //Item to give
		this.trade = trade; //Item to accept
		this.bothHaveItem = bothHaveItem; //reply when both have the required items
		this.playerLacksItem = playerLacksItem; //reply when you don't have the required item
		this.npcLacksItem = npcLacksItem; //reply when npc lacks the item
		this.default = def; //reply when neither have an item, or if npc sells nothing
	}
}

class NPC {
	constructor(name, desc) {
		this.name = name;
		this.description = desc;
		this.inventory = []; //NPC inventory
		this.conversation = []; //Conversation array
		this.wearing = clothe();
	}

	talkTo(player) {
		let text = '';
		for (let i in this.conversation) {
			text += '\n' + i.display;
		}
		say = int(input(text));

		if (isinstance(say, int)) {
			if (say === 0) {
				player.speakingTo = null;
				print('Stopped talking to ' + this.name + '.');
			} else if (say > 1 && say < len(this.conversation)) {
				if (
					this.conversation[say].item === null ||
					this.inInventory(this.conversation[say].item)
				) {
					if (
						this.conversation[say].trade === null ||
						player.inInventory(this.conversation[say].trade)
					) {
						print(this.conversation[say].bothHaveItem);
						if (this.conversation[say].item !== null) {
							this.giveToPlayer(
								player,
								this.fromInventory(this.conversation[say].item)
							);
						}
						if (this.conversation[say].trade !== null) {
							this.receiveFromPlayer(
								player,
								player.fromInventory(
									this.conversation[say].trade
								)
							);
						}
					} else {
						print(this.conversation[say].playerLacksItem);
					}
				} else {
					if (
						this.conversation[say].trade === null ||
						player.inInventory(this.conversation[say].trade)
					) {
						print(this.conversation[say].npcLacksItem);
					} else {
						print(this.conversation[say].default);
					}
				}
			} else {
				print('(Type a number corresponding to a response)');
			}
		} else {
			print('(Type a number corresponding to a response)');
		}
	}
}

class Key {
	constructor(door) {
		if (door instanceof Door) {
			this.door = [door];
		} else if (
			door instanceof Array &&
			door.every(function(d) {
				d instanceof Door;
			})
		) {
			this.door = door;
		}
	}
}

class Door {
	constructor(
		room,
		leadsTo,
		oneway = false,
		locked = false,
		joining = false
	) {
		this.room = room;
		this.dest = leadsTo;
		this.room.doors.append(this);
		this.locked = locked;
		this.description = 'Unknown room';
		this.sibling = None;

		if (!joining) {
			this.sibling = new Door(this.dest, this.room, oneway, oneway, true);
			this.sibling.sibling = this;
		}

		if (this.room.known) {
			this.sibling.description = this.room.name;
		}
	}

	lock(key) {
		if (this in key.door || this.sibling in key.door) {
			this.locked = true;
			console.log('You locked the door');
		}
	}

	unlock(key) {
		if (this in key.door || this.sibling in key.door) {
			this.locked = false;
			console.log('You unlocked the door');
		}
	}

	use(player) {
		if (!this.locked) {
			player.room = this.sibling.room;
			console.log('You enter ' + this.sibling.room.name);
			if (!this.dest.known) {
				this.dest.known = true;
				this.description = this.dest.name; //if discovering a new room, set room as known, and apply destination room name to source door
				this.sibling.description = this.room.name;
				console.log('You discovered ' + this.description);
			}
		}
	}

	interact(item) {
		var actions = {};
		Object.keys(actions).forEach(function(itm) {
			if (itm.hash == item.hash) {
				actions[item.hash]();
			}
		});
	}
}

class Room {
	constructor() {
		this.name = name;
		this.known = known;
		this.items = [];
		this.doors = [];
		this.people = [];
		this.furniture = [];
	}
}

class Player {
	constructor() {
		this.room = room;
		this.name = name;
		this.health = 100.0;
		this.inventory = [];
		this.weapons = []; //if none, use fists
		this.speakingTo = -1;
		this.searching = -1;
		this.wearing = clothe();
	}
}

//////////////////////////////////////////////////////////////
///////////////////////  Game Setup  /////////////////////////
//////////////////////////////////////////////////////////////

var bigKnapsack = new Bag('knapsack', 'brown knapsack', 50);
var smallKnapsack = new Bag('knapsack', 'brown knapsack', 10);
bigKnapsack.add(smallKnapsack);
smallKnapsack.add(bigKnapsack);

//////////////////////////////////////////////////////////////
