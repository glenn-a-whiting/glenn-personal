import random
from math import *
objects = []
chunks = {}

class ob:
	def __init__(self,pos):
		self.x = pos[0]
		self.y = pos[1]
		self.z = pos[2]
		self.chunk = None
		self.assign()
	
	def assign(self):
		if self.chunk != None:
			for index, ref in enumerate(chunks[self.chunk]): #remove self from chunk
				if ref == self:
					c.pop(index)
		self.chunk = str(int(floor(self.x/10)))+","+str(int(floor(self.y/10)))+","+str(int(floor(self.z/10)))
		if self.chunk not in chunks:
			chunks[self.chunk] = []
		chunks[self.chunk].append(self)
	
	def __repr__(self):
		return "("+str(round(self.x))[:-2]+","+str(round(self.y))[:-2]+","+str(round(self.z))[:-2]+")"

for i in range(1000):
	objects.append(ob([random.random()*100,random.random()*100,random.random()*100]))
print(chunks)