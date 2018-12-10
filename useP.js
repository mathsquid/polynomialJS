
vvk=[];
p =new Polynomial();

for (var i=0; i<20; i++){
  var m = new Term();
  m.coefficient = 10-i;
  m.monomial = new Monomial(i%6,i&3,i%2);
  k.push(m);
  p.addTerm(m);
}

document.write("<br>")

document.write("<br>")
document.write(p);
document.write("<br>")

//k.sort(bynum);
p.terms.sort(bynum);

document.write("<br>")
document.write("<br>")
document.write(p);
document.write("<br>")


p.terms.sort(bydeg);

document.write("<br>")
document.write("<br>")
document.write(p);
document.write("<br>")
