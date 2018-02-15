angular.module("app").service("str",function(){
  this.echo = function(s){
    return s;
  };

  this.reverse = function(s){
    var res = "";
    for(var i = s.length; i >= 0; i--){
      res += s.charAt(i);
    }
    return res;
  };

  this.isPalindrome = function(st){
    var s1 = st.replace(/\s/g,"");
    var s2 = this.reverse(s1);

    if(s1.length === 0) return false;
    for(var i = 0; i < s1.length; i++){
      if(s1.charAt(i) != s2.charAt(i)){
        return false;
      }
    }
    return true;
  }
});
