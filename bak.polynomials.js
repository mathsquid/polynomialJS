// polynomial.js
// implementing a polynomial in three variables.

// Monomials
function Monomial(coefficient=0, xExponent=0, yExponent=0, zExponent=0){
  if (isNaN(coefficient) || isNaN(xExponent) || isNaN(yExponent) || isNaN(zExponent))  throw new TypeError();
  this.xExponent = xExponent;
  this.yExponent = yExponent;
  this.zExponent = zExponent;
  this.coefficient = coefficient;
}

Monomial.prototype = {
  degree: function() {
    return this.xExponent + this.yExponent + this.zExponent;
  },


  randomize: function(){
    var r = new Monomial();
    do{
      this.coefficient = -5+Math.floor(Math.random()*10);
      this.xExponent   = Math.floor(Math.random()*2);
      this.yExponent   = Math.floor(Math.random()*2);
      this.zExponent   = Math.floor(Math.random()*2);
      this.zExponent = 0;
      this.yExponent = 0;
    } while (this.coefficient == 0);
      return r;
  },

  copyValuesFrom: function(otherMonomial) {
     this.coefficient   = otherMonomial.coefficient;
     this.xExponent   = otherMonomial.xExponent;
     this.yExponent   = otherMonomial.yExponent;
     this.zExponent   = otherMonomial.zExponent;
    },

  multiplyBy: function(otherMonomial) {
    if (this.coefficient == 0 || otherMonomial.coefficient == 0)
    this.setZero();
    else {
      this.coefficient *= otherMonomial.coefficient;
      this.xExponent   += otherMonomial.xExponent;
      this.yExponent   += otherMonomial.yExponent;
      this.zExponent   += otherMonomial.zExponent;
    }
  },

  times: function(otherMonomial) {
    var product = new Monomial(0,0,0,0);
    product.coefficient = this.coefficient * otherMonomial.coefficient;
    if (product.coefficient == 0) return Monomial.ZERO;
    product.xExponent   = this.xExponent   + otherMonomial.xExponent;
    product.yExponent   = this.yExponent   + otherMonomial.yExponent;
    product.zExponent   = this.zExponent   + otherMonomial.zExponent;
    return product;
  },

  setZero: function(){
  this.coefficient = 0;
  this.xExponent   = 0;
  this.yExponent   = 0;
  this.zExponent   = 0;
},

  isEqualTo: function(otherMonomial){
  if(otherMonomial.coefficient == this.coefficient &&
     otherMonomial.xExponent == this.xExponent &&
     otherMonomial.yExponent == this.yExponent &&
     otherMonomial.zExponent == this.zExponent)
    return true;
    else return false;
},

  isDivisibleBy: function(otherMonomial) {
    if (otherMonomial.isEqualTo(Monomial.ZERO)) return false;
    if (this.isEqualTo(Monomial.ZERO)) return true;
    if(otherMonomial.xExponent <= this.xExponent &&
       otherMonomial.yExponent <= this.yExponent &&
       otherMonomial.zExponent <= this.zExponent)
      return true;
      else return false;
  },

  divides: function(otherMonomial) {
    if (this.isEqualTo(Monomial.ZERO)) return false;
    if(otherMonomial.xExponent >= this.xExponent &&
       otherMonomial.yExponent >= this.yExponent &&
       otherMonomial.zExponent >= this.zExponent)
      return true;
      else return false;
  },

  toString: function(){
    // console.log(this.degree());
    if (this.coefficient == 0) return 0;
    if (this.degree() == 0) return " "+this.coefficient.toString();
    var s = " ";
    if (this.coefficient != 1) s += this.coefficient;

    if (this.xExponent !=0){
      s+="x";
      if (this.xExponent != 1) s+="<sup>"+this.xExponent+"</sup>";
    }
    if (this.yExponent !=0){
      s+="y";
      if (this.yExponent != 1) s+="<sup>"+this.yExponent+"</sup>";
    }
    if (this.zExponent !=0){
      s+="z";
      if (this.zExponent != 1) s+="<sup>"+this.zExponent+"</sup>";
    }
    return s;
    return this.coefficient+"x^"+this.xExponent+"y^"+this.yExponent+"z^"+this.zExponent;
  }
};

Monomial.ZERO =  new Monomial(0,0,0,0);


// define a polynomial as a list of Monomials

function Polynomial(){
  this.terms =[];
};

Polynomial.prototype.timesPolynomial =function (otherPolynomial){
    var newPoly = new Polynomial();
    for (var j in otherPolynomial.terms){
      for (var i in this.terms){
        var m = this.terms[i].times(otherPolynomial.terms[j]);
        newPoly.terms.push(m)
      }
    }
    newPoly.collect();
    return newPoly;
  };

Polynomial.prototype.collect = function(){
  console.log("collecting");
  for (var i=0; i < this.terms.length-1; i++){
      for (var j=i+1; j<this.terms.length; j++){
        if (this.terms[i].xExponent == this.terms[j].xExponent &&
            this.terms[i].yExponent == this.terms[j].yExponent &&
            this.terms[i].zExponent == this.terms[j].zExponent) {
            this.terms[i].coefficient += this.terms[j].coefficient;
            this.terms[j].xExponent =0;
            this.terms[j].yExponent =0;
            this.terms[j].zExponent =0;
            this.terms[j].coefficient =0;
          }
        }
      }
};

Polynomial.prototype.timesMonomial =function (otherMonomial){
  var newPoly = new Polynomial();
  for (var i in this.terms){
    var m = this.terms[i].times(otherMonomial);
    newPoly.terms.push(m)
  }
  return newPoly;
};

Polynomial.prototype.addPolynomial = function(p){
  for (var i in p.terms){
    this.addMonomial(p.terms[i]);
  }
  this.terms.sort();
};

Polynomial.prototype.addMonomial = function(m){
  for (var t=0; t<this.terms.length; t++){
    if (this.terms[t].xExponent == m.xExponent &&
        this.terms[t].yExponent == m.yExponent &&
        this.terms[t].zExponent == m.zExponent){
      this.terms[t].coefficient += m.coefficient;
      this.terms.sort()
      return;
    }
  }
  this.terms.push(m);
  this.terms.sort();
};

Polynomial.prototype.degree = function(){
  var deg = 0;
  for (var i in this.terms){
    if (this.terms[i].degree() > deg)
     deg=this.terms[i].degree();
   }
  return deg;
}

Polynomial.prototype.toString = function(){
  var s = "";
  if (this.terms.length==1) return this.terms[0].toString();
  s+= this.terms[0].toString();
  var n = new Monomial();
  for (var t = 1; t < this.terms.length; t++) {
    // console.log(t);
    n.copyValuesFrom(this.terms[t]);
    // console.log(n);
    // console.log(n.toString());
    if(n.coefficient < 0) {
      s+=" -";
      n.coefficient*= -1;
      s+=n.toString();
    }
    else {
      s+=" +";
      s+=n.toString();
    }
  }
  return s;
};
