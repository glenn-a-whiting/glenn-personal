class Room:
    size = list()
    objects = dict()
    
    ref = {
        "NoneType":"#",
        "Door":"D",
        "Player":"*"
    }
    
    def __init__(self,size):
        error = "Room constructor requires a list of one or two integers"
        if not isinstance(size,list):
            raise Exception(error)
        for i in size:
            if not isinstance(i,int):
                raise Exception(error)
        
        if len(size) == 1:
            self.size = [size[0],size[0]]
        elif len(size) == 2:
            self.size = [size[1],size[0]]
        else:
            raise Exception(error)
    
    def addObject(self,x,y,name="nameless",instance=None):
        if x < 0 or x > self.size[1]-1 or y < 0 or y > self.size[0]-1:
            raise Exception("Objects must be placed within room bounds. \nThis room's bounds: "+"(0,0) to ("+str(self.size[1])+","+str(self.size[0])+")")
        else:
            self.objects[name] = [y,x,instance]
    
    def removeObject(self,name):
        del self.objects[name]
    
    def objectAt(self,x,y):
        for i in self.objects:
            if i[0] == y and i[1] == x:
                return i[2]
    def display(self):
        out = ""
        for y in range(self.size[0]):
            row = "\n"
            for x in range(self.size[1]):
                if x == 0 or x == self.size[1]-1:
                    if y == 0 or y == self.size[0]-1:
                        row += "O"
                    else:
                        row += "|"
                else:
                    if y == 0 or y == self.size[0]-1:
                        row += "-"
                    else:
                        flag = False
                        for i in self.objects:
                            if [y,x] == self.objects[i][0:2]:
                                row += self.ref[type(self.objects[i][2]).__name__]
                                flag = True
                                break
                        if not flag:
                            row += " "
            out += row
        print(out)

class Door:
    room = None #Room
    locked = False
    key = None #Key
    link = None #Door

    def __init__(self,room):
        self.room = room

main = Room([7,7])

class Player:
    health = 100
    name = None
    room = None
    
    def __init__(self,name,room=main):
        pass

second = Room([7,7])
player = Player("John")

door1 = Door(main)
door2 = Door(second)
door2.link = door1
door1.link = door2

main.addObject(1,1,player.name,player)
main.addObject(2,2,'door1',door1)
second.addObject(2,2,'door2',door2)

main.addObject(-1,3,'Vase')
main.display()