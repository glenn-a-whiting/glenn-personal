import random
items = ['one','two']
weights = [1,4]

def weightedSelection(items,weights):
    if len(items) != len(weights):
        raise Exception('weights and items must be equal length lists')
    limits = list()
    for i in weights:
        limits.append(sum(limits)+i)
    place = random.randrange(limits[-1])
    for index,i in enumerate(limits):
        if place < i:
            return items[index]
c = [0,0]
for i in range(10000):
    if weightedSelection(items,weights) == 'one':
        c[0]+=1
    else:
        c[1]+=1
print(c[0]/c[1])