angular.module("app").controller("sampleCtrl", function($scope,str){
  $scope.var = "";
  $scope.palindrome = false;
  $scope.wordCount = 0;
  $scope.acronym = "";
  
  $scope.assign = function(){
    $scope.var = str.reverse($scope.info);
    $scope.palindrome = str.isPalindrome($scope.info);
    $scope.wordCount = $scope.info.length === 0 ? 0 : $scope.info.split(" ").length;
    $scope.acronym = "";
    $scope.info.split(" ").forEach(w => $scope.acronym += w.charAt(0));
  }
});
