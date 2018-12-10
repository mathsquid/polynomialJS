var bcolor;
bcolor=65793*(Math.floor(Math.random()*32)+96);
color=bcolor.toString(16);
bcolor+=bcolor;
document.body.bgColor=bcolor.toString(16);

// var sortOrder = byDegLex;
var sortOrder = byLexOrder;


// polynomial to be divided
var f = new Polynomial();
flist = [[1,2,1,0],[1,1,2,0],[1,0,2,0]];
// flist = [[1,1,2,0],[-1,1,0,0]];
// flist = [[1,1,2,1],[-1,1,0,0]];

// divisor polynomials (called f1, f2, ... in book)
var d = [new Polynomial(),new Polynomial()];
d0 = [[1,1,1,0],[-1,0,0,0]];
d1 = [[1,0,2,0],[-1,0,0,0]];




// build the polynomials
f.setToArray(flist);
d[0].setToArray(d0);
d[1].setToArray(d1);

var ss = 2;

f.terms.sort(sortOrder);
for (var i2=0; i2<ss; i2++) d[i2].terms.sort(sortOrder);


document.write("<br>");

// console.log(ss);

document.write("   f = " + f + "<br>");
// console.log(ss);
document.write("d[0] = " + d[0] + "<br>");
// console.log(ss);
document.write("d[1] = " + d[1] + "<br><hr><br>");


// console.log(ss);

// console.log(ss);
// console.log(ss);






// build the array of a-polynomials.
var a=[];

a.push(new Polynomial());
a.push(new Polynomial());

//build the remainder polynomial r
var r = new Polynomial();
var p = new Polynomial();







// console.log("ss="+ss+ "      s="+s);


p.setEqualTo(f);
var sterm = new Term();
var sPoly = new Polynomial();
sterm.coefficient=0;
sterm.monomial = new Monomial(0,0,0);


var DEBUGSTOPPER =0;

document.write("<br>");
document.write("   p = " + p + "<br>");


var ii=0;
// document.write("zero = "+ Monomial.ZERO + "<br>");

while (!(p.isEqualToZero()) && DEBUGSTOPPER <999){
  // document.write("outer loop started  ii = " + ii + " <br>")
  DEBUGSTOPPER++;
  ii=0;
  var divisionOccurred = false;
  // document.write("ss="+ss+"  ii="+ii+" divisionOccurred="+divisionOccurred+"<br>");
  while(ii<ss && !divisionOccurred) {
    // document.write("*divisionoccurred="+divisionOccurred+"<br>");
    // document.write("inner loop started  ii = " + ii + " <br>")
    sterm = new Term();
    sPoly = new Polynomial();
    // document.write(d[ii].leadingTerm() + ", "+p.leadingTerm());
    // document.write("   p = "+p+"<br>");
    if (d[ii].leadingTerm().divides(p.leadingTerm())){
      // document.write("divide and subtract<br>");
      sterm = p.leadingTerm().dividedBy(d[ii].leadingTerm());
      a[ii].addTerm(sterm);
      sPoly.addTerm(sterm);
      p.subtractPolynomial(sPoly.timesPolynomial(d[ii]));
      p.collect();
      p.terms.sort(sortOrder);
      divisionOccurred = true;
    }
    else ii++;

  }
    if ( !divisionOccurred ){
      // document.write("  XX  ");
      r.addTerm(p.leadingTerm());
      // document.write("    p = " + p + "<br>");
      p.subtractTerm(p.leadingTerm())
      // document.write("    p = " + p + "<br>");
      p.collect();
      p.terms.sort(sortOrder);
    }

  document.write("<br>");
  // document.write("    p = " + p + "<br>");
  document.write("   a0 = " + a[0] + "<br>");
  document.write("   a1 = " + a[1] + "<br>");
  document.write("    r = " + r + "<br>");
  // document.write("xy<sup>2</sup> - x = (y)(xy + 1) + (0)(y<sup>2</sup> - 1) + - x - y");

  // document.write("DEBUGSTOPPER = " + DEBUGSTOPPER + "<br><hr><br><br>");

}
document.write("<hr>");


document.write(f+" = ");
document.write("("+a[0]+")");
document.write("("+d[0]+")");
document.write(" + ");
document.write("("+a[1]+")");
document.write("("+d[1]+")");
document.write(" + ");
document.write(r);

document.write("<br>");


// document.write("<br><br><hr><br>");
//
// for (var i3 in d){
//   document.write("<br>");
//   document.write("d[" + i3 + "] = " + d[i3]);
// }
//
//
//
//
//
//
//
//
//
//
// document.write("<br>");
// document.write("  f  = " + f);
//
// document.write("<br><br>   p = "+p);
