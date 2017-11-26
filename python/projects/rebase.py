from math import floor as floor
syms = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X']
number = 73686780563

## Convert an integer to any custom base system.
def rebase(num,arr):
	result = num
	string = ""
	while result > 0:
		string = arr[result % len(arr)] + string
		result = int(floor(result/len(arr)))
	return string

print(rebase(number,syms))