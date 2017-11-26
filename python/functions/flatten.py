""" Returns 1D list from ND list """
def flatten(lis): 
	if not isinstance(lis,list):
		return
	out = list()
	for i in lis:
		if isinstance(i, list):
			innerlist = flatten(i)
			for j in innerlist:
				out.append(j)
		else:
			out.append(i)
	return out