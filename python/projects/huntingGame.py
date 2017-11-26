# Click run or press Ctrl-Enter




































































































from math import *
import random
import time
fws = " "
fwvl = "|"
fwh = "-"
fwo = "O"
fwn = {
    1:"1",
    2:"2",
    3:"3",
    4:"4",
    5:"5",
    6:"6",
    7:"7",
    8:"8",
    9:"9",
    10:"+"
}
print("///////////////////////////////////\n/////////  Hunting Game  //////////\n///////////////////////////////////\n")
size = 0
toeat = 0
reproduce = None
chance = None
while size < 3 and toeat < 1:
    try:
        size = int(input('Game size:'))+2
    except ValueError:
        print('please enter an integer')
    try:
        toeat = int(input('prey count:'))
    except ValueError:
        print('please enter an integer')
    if size < 3:
        print('Game size must be at least 1')
    if toeat < 1:
        print('Prey count must be at least 1')
while reproduce == None:
    reproduce = input('Allow reproducing (y/n)?') == 'y'
    if reproduce == None:
        print('please specify an option.')
    elif reproduce:
        while chance == None:
            try:
                chance = int(input('chance of reproducing (1 in n):'))
            except ValueError:
                print('please give an integer')

print("\nControls: use WASD followed by enter.\nconsecutive wasd letters combine \nto form larger or angled moves.\n\nNumbers indicate overlapping entities \n\n\nHit Enter to start.")
input('')
you = [int(size/2),int(size/2)]
eaten = 0

class Prey:
    pos = list()
    fpos = list()
    
    def __init__(self,x,y):
        self.pos = [y,x]
        self.fpos = [float(y),float(x)]
    
    def move(self):
        angle = atan2(you[1] - self.fpos[1],you[0] - self.fpos[0])+pi
        self.fpos = [self.fpos[0] + cos(angle), self.fpos[1] + sin(angle)]
        if self.fpos[0] < 1:
            self.fpos[0]+=1
        if self.fpos[0] > size-1:
            self.fpos[0]-=1
        if self.fpos[1] < 1:
            self.fpos[1]+=1
        if self.fpos[1] > size-1:
            self.fpos[1]-=1
        self.pos = [int(self.fpos[0]),int(self.fpos[1])]

preypos = list()
preys = list()
for i in range(toeat):
    preys.append(Prey(random.randrange(1,size-1),random.randrange(1,size-1)))
    preypos.append(preys[i].pos)

prev = ""
moves = 0
game = True
while game:
    
    you[0] += prev.count("s") - prev.count("w")
    you[1] += prev.count("d") - prev.count("a")
    
    if you[0] < 1:
        you[0] = 1
    if you[1] < 1:
        you[1] = 1
    if you[0] > size-2:
        you[0] = size-2
    if you[1] > size-2:
        you[1] = size-2
        
    for index,i in enumerate(preys):
        if reproduce:
            if random.random() < 1.0/float(chance):
                newprey = Prey(i.pos[0],i.pos[1])
                preys.append(newprey)
                preypos.append(newprey.pos)
        if i.pos == you:
            preys.pop(index)
            preypos.pop(index)
            eaten += 1
        else:
            i.move()
            preypos[index] = i.pos
    
    area = ""
    for i in range(size):
        row = ""
        for j in range(size):
            if i == you[0] and j == you[1]:
                row += "X"
            elif [i,j] in preypos:
                c = 0
                for k in preypos:
                    if k == [i,j]:
                        c += 1
                if c > 9:
                    row += fwn[10]
                else:
                    row += fwn[c]
            elif i == 0 or i == size-1:
                if j == 0 or j == size-1:
                    row += fwo
                else:
                    row += fwh
            else:
                if j == 0 or j == size-1:
                    row += fwvl
                else:
                    row += fws
        area += row + "\n"
    print(area)
    print("eaten: " + str(eaten) + "/" + str(len(preys)))
    if len(preys) == 0:
        game = False
    else:
        prev = input('move:')
        moves += 1
print("You won!   moves: " + str(moves))