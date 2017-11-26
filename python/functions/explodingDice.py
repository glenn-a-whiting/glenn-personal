import random

def explodingDice(sides, num):
	total = int()
	roll = random.randrange(sides)+1
	if roll >= num:
		total += roll
		total += explodingDice(sides, num)
	else:
		total += roll
	return total