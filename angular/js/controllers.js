angular.module("app").controller("sampleCtrl", function($scope,str){
  $scope.var = "";
  $scope.palindrome = false;
  $scope.wordCount = 0;
  $scope.acronym = "";
  $scope.phoneticAlphabet = {
    "a":"Alpha",
    "b":"Bravo",
    "c":"Charlie",
    "d":"Delta",
    "e":"Echo",
    "f":"Foxtrot",
    "g":"Golf",
    "h":"Hotel",
    "i":"India",
    "j":"Juliett",
    "k":"Kilo",
    "l":"Lima",
    "m":"Mike",
    "n":"November",
    "o":"Oscar",
    "p":"Papa",
    "q":"Quebec",
    "r":"Romeo",
    "s":"Sierra",
    "t":"Tango",
    "u":"Uniform",
    "v":"Victor",
    "w":"Whiskey",
    "x":"Xray",
    "y":"Yankee",
    "z":"Zulu"
  };
  $scope.assign = function(){
    $scope.var = str.reverse($scope.info);
    $scope.palindrome = str.isPalindrome($scope.info);
    $scope.wordCount = $scope.info.length === 0 ? 0 : $scope.info.split(" ").length;
    $scope.acronym = "";
    $scope.info.split(" ").forEach(w => $scope.acronym += w.charAt(0));
  }
});
