import random
import sys
name = "bot"
word = {'greetings':[0,1,2,3],'kick':[4,5,6,7],'hello':[8,9,10,11],'run':[12,13,14,15]} ### initial words, to be removed later ###
replies = ['"Hi there."','"huh?"','"hello"', '"hmm.."']; ### initial replies, to be replaced ###

showDebug = bool('false'); ### Toggle output of debug text ###
inChat = "true"; ### Toggle fake chat ###
prevMessage = ''; ### previous message made by user will be stored here ###
prevReply = ''; ### previous reply (index) chosen by bot will be stored here ###

def isScore(messageIn): ### Check if message is a score ###
	if len(messageIn) < 4:
		return 'false';
	if ((len(messageIn) == 4) and (messageIn[1] == '/')) or ((len(messageIn) == 5) and (messageIn[2] == '/') and (messageIn[0] != '-')): ### checks for the slash in appropriate place, also makes sure value is not negative ###
		return 'true';
	else:
		return 'false';

def getScore(messageIn): ### Find score given by user ###
	if len(messageIn) == 5: ### If message has 5 chars, return value 10. This means values like 11, 15 will be treated as 10 ###
		return '10';
	elif len(messageIn) == 4: ### return first character if length is 4 ###
		return messageIn[0];

def weightedSelection(messageIn):
	messageWords = messageIn.split(); ### turn string into list of words ###
	replyWeights = []; ### prepare list replyWeights ###
	for a in range(0, len(replies)):
			replyWeights.append(0); ### add as many values to replyWeights as there are replies, initializing all to 0 ###
	
	for b in range(0, len(replyWeights)):
		for c in range(0, len(messageWords)):
			messageWord = messageWords[c];
			replyWeights[b] += word[messageWord][b]; ### for every word(c) in message, add weight of their reply(b) to replyWeights(b) ###
	
	randomRange = []; ### prepare list for numbers to be used for ranges ###
	for e in range(0, len(replyWeights)):
		rangeLimit = int(0); ### prepare number to add to ###
		for f in range(0, e):
			rangeLimit += int(replyWeights[f]); ### For all replies weights, set corresponding range upper limit as sum of all before it. i.e: that [1,3,5] becomes [1,4,9] ###
		randomRange.append(rangeLimit); ### append sum to randomRange ###
	
	numToReturn = 0; ### initialize number to return ###
	
	rand = random.randrange(0, len(randomRange));  ### generate random number up to the final value in randomRange ###
	for n in range(len(randomRange)):
		if int(len(messageWords)) > 1: ### test if there is more than one word ###
			if n == 0:
				if (rand < randomRange[1]):
					numToReturn += n;
			elif n == int(len(randomRange)):
				if (rand > randomRange[n-1]) and (rand < randomRange[n]):
					numToreturn += n;
			else:
				if (rand > randomRange[n]) and (rand < randomRange[(n+1)-1]):
					numToreturn += n;
		else:
			numToReturn += rand;
	if showDebug == "true":
		print (int(numToReturn/4));
	return int(numToReturn/4);

def processMessage(messageIn):
	messageOut = ''; ### prepare message ###
	score = ''; ### prepare score ###
	if isScore(messageIn) == 'true':
		score = int(getScore(messageIn)); ### Find out score from message, but only if text is a score. ###
		score -= int(5);
		if showDebug == "true": ### debug text toggle ###
			messageOut += "score:" + score;
		else:
			if score > 0: ### Different messages for incrementing or decrementing scores ###
				messageOut += "Thanks!";
			elif score < 0:
				messageOut += "I'll try to improve.";
			else:
				messageOut += "Thanks for helping!";
		
		prevMessageWords = prevMessage.split();
		if isScore(prevMessage) == 'false': ### Makes sure the previously send message to patch wasn't also a score ###
			for i in range(len(prevMessageWords)):
				prevMessageWord = prevMessageWords[i];
				global prevReply;
				if score < 0:
					if word[prevMessageWord][prevReply] < abs(int(score)): ### If decrement will result in a negative value, set weight to zero ###
						word[prevMessageWord][prevReply] = 0;
				else:
					word[prevMessageWord][prevReply] += int(score);
		else:
			messageOut += " Although you already gave me a score."; ### If the previous message was a score, do not change any weights ###
	else:
		messageWords = messageIn.split();
		for i in range(0, len(messageWords)):
			newestWord = messageWords[i];
			if newestWord not in word: ### if there are words in message which are not in the dictionary, add them, and initialize their values to average ###
				word[newestWord] = [];
				for v in range(0, len(replies)):
					word[newestWord].append(0); ### prepare reply weight ###
					replyWeightSum = 0; ### prepare arithmetic process ###
					wordList = list(word.keys()); ### create indexable copy of the dictionary ###
					for u in range(0, len(wordList)):
						replyWeightSum += int(word[wordList[u]][v]); ### for every word(u) in the dictionary, add the reply(v) to the sum. ((e.g: word[0], reply0; word[1], reply0; ..)). ###
					replyWeightAverage = int(replyWeightSum/len(wordList)); ### find truncated average ###
					word[newestWord][v] += replyWeightAverage; ### set weight of reply(v) of the new word as average. ###
				if showDebug == "true":
					print('"' + newestWord + '" added to dictionary');
		replyIndex = weightedSelection(messageIn); ### choose reply from weighted random ###
		messageOut = replies[replyIndex];
		prevReply = replyIndex;
	return messageOut;

print("Commands: .debug | .addWord | .addReply | .dictionary | .replies | .wordWeights | .setWeightsIndividual | .setWeightsAll | .stop \n-------------------------\n#fakechat\n")
while inChat:
	message = input("You >>");
	
	if message[0] == '.':
			
		if message == '.stop':
			print(name + " >> Bye!")
			break;
		
		if message == '.addWord':
			newWord = input('New word: ');
			if newWord in word:
			    print ('"' + newWord + '" exists in dictionary.');
			else:
				word[newWord] = [];
				for x in range(0, len(replies)):
					word[newWord].append(0);
				print('Added "' + newWord + '" to dictionary.');
				print('Initialized weights to:');
				print(word[newWord]);
		
		elif message == '.addReply':
			newReply = input('New reply:')
			newReply = newReply.replace('%name%', name)
			replies.append(newReply);
			for (key, value) in word.items():
				value.append(0);
			
		elif message == '.dictionary':
			print(list(word.keys()));
		
		elif message == '.replies':
			for i in range(0, len(replies)):
				print("reply" + str(i) + " ", end="");
				print("'" + replies[i] + "'");
		
		elif message == '.wordWeights':
			wordPicked = input("Word:");
			if wordPicked in word:
				for i in range(0, len(replies)):
					print("reply" + str(i) + " ", end="");
					print("= " + str(word[wordPicked][i]));
			else:
				print("Word not in dictionary");
		
		elif message == '.setWeightsIndividual':
			wordsPicked = input("Words:").split();
			invalidCount = int(0);
			for i in range(0, len(wordsPicked)):
				wordPicked = wordsPicked[i];
				if wordPicked in word:
					print(wordPicked + ":");
					for n in range(0, len(replies)):
						newWeight = input("set weight of reply" + str(n) + "\n" + replies[n] + ":");
						if newWeight == '': ### If blank, leave weight unchanged ###
							newWeight = word[wordPicked][n];
						else:
							word[wordPicked][n] = newWeight;
				else:
					invalidCount += 1;
			if int(invalidCount) == int(len(wordsPicked)):
				print('None of those words are in the dictionary');
		
		elif message == '.setWeightsAll':
			wordsPicked = input("Words:").split();
			invalidCount = int(0);
			for j in range(0,len(wordsPicked)):
				if wordsPicked[j] not in word:
					invalidCount += 1;
			if int(invalidCount) == int(len(wordsPicked)):
				print('None of those words are in the dictionary')
			else:	
				for i in range(len(replies)):
					wordPicked = wordsPicked[i];
					newWeight = input("set weight of reply" + str(i) + "\n" + replies[i] + ":")
					for n in range(len(replies)):
						if wordPicked in word:
							word[wordPicked][n] = newWeight
		
		elif message == ".debug":
			if showDebug == bool('true'):
				showDebug = bool('false')
				print('debugging enabled.')
			else:
				showDebug = bool('true')
				print('debugging disabled')
		
		elif message == ".removeReply":
			print("last | index [int]")
			replyPicked = input("reply:")
			if replyPicked == 'last':
				replies.pop();
				wordKeys = list(word.keys())
				for key in range(len(word)):
					word[wordKeys[key]].pop()
			elif replyPicked[0:6] == "index ":
				indexPicked = int(replyPicked[6:len(replyPicked)]);
				print(indexPicked);
				if indexPicked < len(replies):
					replies.pop(indexPicked);
				else:
					print("Out of range!");
		
		else:
			print("You tried to perform a command, but something went wrong");
	
	else:
		reply = processMessage(message);
		print(name + " >> " + reply);
		prevMessage = message;