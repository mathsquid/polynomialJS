document.write("<br>Test array<br><br>");

var num=10;


var printArray = function(){
  for (var i=0; i<num; i++){
    document.write("["+a[i]+"]  ");
  }
  document.write("<br><br><br>");
}

var printArray2 = function(){
  for (var i=0; i<num; i++){
    document.write("["+a[i]+"]<br>");
  }
}


a=[];
for (var i=0; i<num; i++){
  var b = new Array();
    for (var j=0; j<4; j++){
      b.push(Math.floor(Math.random()*3));
    }
  a.push(b);
}


var s1 = function(a,b){
  return a[1]-b[1];
}




printArray();
a.sort();
printArray2();
