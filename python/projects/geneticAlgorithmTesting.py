import random
## Genetic algorithm ##
class Organism:
    def __init__(self,newfactor=0.0):
        self.age = 0
        self.factor = newfactor
    
    def reproduce(self):
        return Organism(self.factor + random.random())
    
    def ageup(self):
        self.age += 1
    
    def __str__(self):
        return 'age:'+str(self.age)+'  factor:'+str(self.factor)

l = []
for i in range(4):
    l.append(Organism())
generations = 1

while generations < 5:
    generations += 1
    new = []
    for i in l:
        i.ageUp()
        new.append(i.reproduce)
    bq = list()
    for i in l:
        if len(bq) < len(l)/4:
            bq.append(i)
        else:
            for index,j in enumerate(bq):
                if i.factor < j.factor:
                    bq[index]=i
    for i in bq:
        del(i)
    l+=new
print(l)