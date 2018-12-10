var m1 = new Monomial(0,0,0);
var m2 = new Monomial(4,1,2);
var m3 = new Monomial(1,1,1);
var m4 = new Monomial(0,0,0);

// m1.randomize();
// m2.randomize();
// m3.randomize();
// m4.randomize();

var sortOrder = byLexOrder;



var yy = Math.floor(Math.random()*4);
document.write("<br>");
var f = new Polynomial();
for (var i = 0; i<7; i++){
  //var m = new Monomial(yy%2,i%4,yy);
  var m = new Monomial(i%2,i%3,0);
   m.randomize();
  var t = new Term();
  t.coefficient = Math.floor(Math.random()*10);
  t.coefficient = 1;
  t.monomial = m;
  // document.write(t+"<br>");
  f.addTerm(t);
  // document.write("     "+f.terms.length+ "  f = "+ f);
  // document.write("<br>");
}
document.write("<br>");
//
// f.terms.sort(byCoefficient);
// document.write("coeff  f = "+ f);
// document.write("<br>");
// f.terms.sort(byDegree);
//
// document.write("degre  f = "+ f);
document.write("<br>");
document.write("<br>");

document.write("         f = "+ f);
document.write("<br><br>");



f.terms.sort(sortOrder);
document.write("    Lex  f = "+ f);
document.write("<br><br>");

sortOrder = byDegLex;
f.terms.sort(sortOrder);
document.write(" DegLex  f = "+ f);



// document.write("<hr>");
// document.write(m1);
// document.write("<br>");
// document.write(m2);
// document.write("<br>");
// document.write(m1.times(m2));
// document.write("<hr>");


// var t1 = new Term(-3, m1);
// var t2 = new Term(7, m2);
// var t3 = new Term(-1, m3);
// var t4 = new Term(-1, m4);
//
// var listOfTerms = [t1,t2,t3,t4];
//
//
//
// document.write("Test adding one polynomial to another<br><br>");
// var p = new Polynomial();
// var q = new Polynomial();
// for (var i = 0; i<3; i++){
//   var k = Math.floor(Math.random()*4);
//   p.addTerm(listOfTerms[k]);
// }
// for (var i = 0; i<3; i++){
//   var k = Math.floor(Math.random()*4);
//   q.addTerm(listOfTerms[k]);
// }
//
// document.write("  p = "+ p);
// document.write("<br>");
// document.write("  q = "+ q);
// document.write("<br>");
// p.addPolynomial(q);
// document.write("p+q = "+ p);
// document.write("<br>");
// document.write("<hr>");
//
//
//
//
// document.write("<br>");
// document.write("Test multiplying polynomials.<br><br>");
// var p = new Polynomial();
// var q = new Polynomial();
// m2 = new Monomial();
// m2.randomize();
// p.addTerm(new Term(Math.floor(Math.random()*10)-10,m2));
// m2 = new Monomial();
// m2.randomize();
// p.addTerm(new Term(Math.floor(Math.random()*10),m2));
//
//
// m2 = new Monomial();
// m2.randomize();
// q.addTerm(new Term(Math.floor(Math.random()*10),m2));
// m2 = new Monomial();
// m2.randomize();
// q.addTerm(new Term(Math.floor(Math.random()*10),m2));
//
// document.write("p = "+ p);
// document.write("<br>");
//
// document.write("q = "+ q);
// document.write("<br><br>");
// document.write("q*p= "+p.timesPolynomial(q));
//
// document.write("<br><br>");
// p.addPolynomial(q);
// document.write("q+p= "+p);
