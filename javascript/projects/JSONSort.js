// Sort JSON objects recursively

def sort(d,recurse=False): #recursively sort JSON by keys
	if isinstance(d,dict):
		r = {}
		k = sorted(list(d.keys()))
		for i in k:
			if recurse and (isinstance(d[i],dict) or isinstance(d[i],list)):
				r[i] = sort(d[i],recurse)
			elif isinstance(d[i],list):
				r[i] = sorted(d[i])
				for j in r[i]:
					if isinstance(r[i],dict):
						r[i][j] = sort(r[i][j])
			else:
				r[i] = d[i]
		return r
	elif isinstance(d,list):
		flag = False
		dicts = []
		lists = []
		objects = []
		others = []
		for i in d:
			if not (isinstance(i,str) or isinstance(i,int) or isinstance(i,float)):
				flag = True
				if isinstance(i,dict):
					dicts.append(sort(i))
				elif isinstance(i,list):
					lists.append(sort(i))
				else:
					objects.append(i)
			else:
				others.append(i)
		print(others)
		r = sorted(others)
		if flag:
			r += lists + dicts + objects
		return r
	else:
		return d