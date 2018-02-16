angular.module("app").controller("sampleCtrl", function($scope,$http,str){
  $scope.var = "";
  $scope.palindrome = false;
  $scope.wordCount = 0;
  $scope.acronym = "";
  $scope.dictionary = 0;
  $http.get("C:/Users/Glenn/Documents/Resume/github/glenn-personal/angular/resources/dictionary.txt").then(function(response){
    $scope.dictionary = Object.keys(response.data).length;
  }).catch(function(err){
    console.log(err);
  });

  $scope.assign = function(){
    $scope.var = str.reverse($scope.info);
    $scope.palindrome = str.isPalindrome($scope.info);
    $scope.wordCount = $scope.info.length === 0 ? 0 : $scope.info.split(" ").length;
    $scope.acronym = "";
    $scope.info.split(" ").forEach(w => $scope.acronym += w.charAt(0));
  }
});
