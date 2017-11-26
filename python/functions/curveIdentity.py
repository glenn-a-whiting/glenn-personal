from math import *
l = []
for i in range(360):
    t = radians(i)
    x = sin(t) + 2*sin(2*t)
    y = cos(t) - 2*cos(2*t)
    z = -sin(3*t)
    l.append([x,y,z])
out = []
for p1 in l:
    row = []
    for p2 in l:
        dist = ((p1[0]-p2[0])**3)+((p1[1]-p2[1])**3)+((p1[2]-p2[2])**3)**(1/3)
        row.append("{0:.2f}".format(dist))
    out.append(row)
def tabbed(arr):
    ret = ""
    for h in arr:
        for cell in h:
            ret += str(cell) + "\t"
        ret += "\n"
    return ret

print(tabbed(out))