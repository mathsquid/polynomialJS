// polynomial.js
// implementing a polynomial in three variables.

// Monomials
function Monomial(xExponent=0, yExponent=0, zExponent=0){
  if (isNaN(xExponent) || isNaN(yExponent) || isNaN(zExponent))  throw new TypeError();
  this[0] = xExponent;
  this[1] = yExponent;
  this[2] = zExponent;
}

Monomial.prototype = {
  degree: function() {
    return this[0] + this[1] + this[2];
  },

  randomize: function(){
    var r = new Monomial();
    this[0]   = Math.floor(Math.random()*4);
    this[1]   = Math.floor(Math.random()*4);
    this[2]   = Math.floor(Math.random()*4);
    this[2]   = 0;
    return r;
  },

  copyValuesFrom: function(otherMonomial) {
    this[0]   = otherMonomial[0];
    this[1]   = otherMonomial[1];
    this[2]   = otherMonomial[2];
  },

  multiplyBy: function(otherMonomial) {
    this[0]   += otherMonomial[0];
    this[1]   += otherMonomial[1];
    this[2]   += otherMonomial[2];
  },

  times: function(otherMonomial) {
    var product = new Monomial(0,0,0,0);
    product[0]   = this[0]   + otherMonomial[0];
    product[1]   = this[1]   + otherMonomial[1];
    product[2]   = this[2]   + otherMonomial[2];
    return product;
  },

  setZero: function(){
    this[0]   = 0;
    this[1]   = 0;
    this[2]   = 0;
  },

  isEqualTo: function(otherMonomial){
    if(otherMonomial[0] == this[0] &&
       otherMonomial[1] == this[1] &&
       otherMonomial[2] == this[2])
      return true;
      else return false;
    },


    isDivisibleBy: function(otherMonomial) {
      if(otherMonomial[0] <= this[0] &&
        otherMonomial[1] <= this[1] &&
        otherMonomial[2] <= this[2])
        return true;
        else return false;
      },

      divides: function(otherMonomial) {
        if(otherMonomial[0] >= this[0] &&
          otherMonomial[1] >= this[1] &&
          otherMonomial[2] >= this[2])
          return true;
          else return false;
        },


        toString: function(){
          // return "[" + this[0] +" "+ this[1] +" "+ this[2] +"]";
          if(this.degree()==0) return "1";
          s ="";
          if(this[0]!=0) s+="x";
          if(this[0]>1)  s+="<sup>"+this[0]+"</sup>";
          if(this[1]!=0) s+="y";
          if(this[1]>1)  s+="<sup>"+this[1]+"</sup>";
          if(this[2]!=0) s+="z";
          if(this[2]>1)  s+="<sup>"+this[2]+"</sup>";
          return s;
        }
      };


      // define a term as a monomial with a coefficient


      function Term(coefficient, monomial){
        this.coefficient = coefficient;
        this.monomial    = monomial;
      };

      Term.prototype.degree = function(){
        return (this.monomial[0]+this.monomial[1]+this.monomial[2]);
      }

      Term.prototype.copyValuesFrom = function(otherTerm){
        this.coefficient = otherTerm.coefficient;
        this.monomial = new Monomial(otherTerm.monomial[0],
                                     otherTerm.monomial[1],
                                     otherTerm.monomial[2])
      };




      Term.prototype.divides = function(that){
        if (this.monomial.divides(that.monomial) &&
              this.coefficient != 0) return true;
        return false;
      };

      Term.prototype.dividedBy  = function(that){
        var n = new Term(0, new Monomial);
        // console.log(n.coefficient);
        // console.log(n.monomial);
        // console.log("--");
        // console.log(that.coefficient);
        // console.log(that.monomial);
        n.coefficient = this.coefficient / that.coefficient;
        n.monomial[0] = this.monomial[0]-that.monomial[0];
        n.monomial[1] = this.monomial[1]-that.monomial[1];
        n.monomial[2] = this.monomial[2]-that.monomial[2];
        return n;
      }

      Term.prototype.toString = function(){
        // console.log(this);
        var s = "";
        if (this.coefficient==0) return s;
        s += this.coefficient.toString();
        if (this.monomial.degree() == 0) return s;
        s += this.monomial.toString();
        return s;
      };

      Term.prototype.multiplyByTerm = function(otherTerm){
        this.coefficient *= otherTerm.coefficient;
        this[0] += otherTerm[0];
        this[1] += otherTerm[1];
        this[2] += otherTerm[2];
      };

      Term.prototype.timesTerm = function(otherTerm){
        var n = new Term(0, new Monomial());
        // console.log("this:"+this.toString());
        // console.log(otherTerm.toString());
        n.coefficient = this.coefficient * otherTerm.coefficient;
        n.monomial[0] = this.monomial[0] + otherTerm.monomial[0];
        n.monomial[1] = this.monomial[1] + otherTerm.monomial[1];
        n.monomial[2] = this.monomial[2] + otherTerm.monomial[2];
        return n;
      };

      Monomial.ZERO = new Monomial(0,0,0);
      Term.ZERO = new Term(0, Monomial.ZERO);

      Term.prototype.toString = function(){
        if (this.monomial.isEqualTo(Monomial.ZERO)){
          // console.log("aosidh");
          s = this.coefficient;
          return s;
        }
        if (this.coefficient ==1){
          s = this.monomial.toString();
          return s;
        }
        if (this.coefficient == -1){
          s="- ";
          s+=this.monomial.toString();
          return s;
        }
        s=this.coefficient.toString();
        s+=this.monomial.toString();
        return s;
      };

      function byCoefficient(a,b){return a.coefficient-b.coefficient;};
      function byDegLex(a,b){
        var degdiff = b.degree - a.degree;
        if (degdiff != 0) return b.degree()-a.degree();
        return byLexOrder(a,b);
      };

      function byLexOrder(a,b){
        diff=[];
        for (var i=0; i<3; i++){
          diff[i]=b.monomial[i]-a.monomial[i];
        }
        var i=0;
        while (i<3 && diff[i]==0) i++;
        return diff[i];
      };

      //------------------------------------------------------------
      //------------------------------------------------------------

      function Polynomial(){
        this.terms = [];
      };

      Polynomial.prototype.isEqualToZero = function(){
        if (this.terms.length==0) return true;
          return false;
      };

      Polynomial.prototype.setToArray =function(list){
      for (var i in list){
        var t = new Term();
        t.coefficient=list[i][0];
        t.monomial = new Monomial(list[i][1],list[i][2],list[i][3]);
        this.addTerm(t);
      }
      }

      Polynomial.prototype.setEqualTo = function(otherPoly){
        this.terms=[];
        for (var i in otherPoly.terms){
          var t = new Term();
          t.copyValuesFrom(otherPoly.terms[i]);
          this.terms.push(t);
        }
      };


      Polynomial.prototype.timesPolynomial =function (otherPolynomial){
        var newPoly = new Polynomial();
        for (var j in otherPolynomial.terms){
          for (var i in this.terms){
            var m = this.terms[i].timesTerm(otherPolynomial.terms[j]);
            newPoly.terms.push(m)
          }
        }
        newPoly.collect();
        return newPoly;
      };

      Polynomial.prototype.collect = function(){
        // console.log("collecting");
        // combine like terms
        for (var i=0; i < this.terms.length-1; i++){
          for (var j=i+1; j<this.terms.length; j++){
            if (this.terms[i].monomial[0] == this.terms[j].monomial[0] &&
              this.terms[i].monomial[1] == this.terms[j].monomial[1] &&
              this.terms[i].monomial[2] == this.terms[j].monomial[2]) {
                this.terms[i].coefficient += this.terms[j].coefficient;
                this.terms[j].monomial[0] =0;
                this.terms[j].monomial[1] =0;
                this.terms[j].monomial[2] =0;
                this.terms[j].coefficient =0;
              }
            }
          }
          // delete terms with coefficient zero
          this.terms = this.terms.filter(function(x){return x.coefficient != 0;});
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
            this.addTerm(p.terms[i]);
          }
          // this.collect();
          // this.terms.sort(sortOrder); // SPLATT
        };


        Polynomial.prototype.subtractPolynomial = function(p){
          for (var i in p.terms){
            this.subtractTerm(p.terms[i]);
          }
          // this.collect();
          // this.terms.sort(byLexOrder); // SPLATT
        };



        Polynomial.prototype.addTerm = function(m){
          var nt = new Term();
          nt.coefficient = m.coefficient;
          nt.monomial = new Monomial(m.monomial[0],m.monomial[1],m.monomial[2]);
          this.terms.push(nt);
          // this.collect();
          // this.terms.sort(byLexOrder); //SPLATT
        };

        Polynomial.prototype.subtractTerm = function(m){
          var nt = new Term();
          nt.coefficient = -m.coefficient;
          nt.monomial = new Monomial(m.monomial[0],m.monomial[1],m.monomial[2]);
          this.terms.push(nt);
          // this.collect();
          // this.terms.sort(byLexOrder); //SPLATT
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
          if (this.terms.length==0) return 0;
          var s = this.terms[0].toString();

          if (this.terms.length==1) return s;

          for (var i=1; i<this.terms.length; i++){
            var tmpTerm = new Term();
            tmpTerm.monomial = new Monomial();
            tmpTerm.monomial.copyValuesFrom(this.terms[i].monomial);
            tmpTerm.coefficient = Math.abs(this.terms[i].coefficient);
            if (this.terms[i].coefficient<0) s+=" - ";
            else s += " + ";
            s+=tmpTerm.toString();
          }
          return s;
        };

        Polynomial.prototype.leadingTerm = function(){
          var lt = new Term();
          this.terms.sort(sortOrder); // SPLATT
          lt.coefficient = this.terms[0].coefficient;
          lt.monomial = new Monomial();
          lt.monomial.copyValuesFrom(this.terms[0].monomial);
          return lt;
        }
        Polynomial.prototype.leadingCoefficient = function(){
          return this.terms[0].coefficient;
        }
        Polynomial.prototype.leadingMonomial = function(){
          var lm = new Monomial();
          lm.copyValuesFrom(this.terms[0].monomial);
          return lm;
        }
