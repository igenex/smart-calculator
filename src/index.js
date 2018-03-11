class SmartCalculator {
  constructor(initialValue) {
    this.number = initialValue;
    this.cache = [];
    this.result = 0;
  }

  add(number) {
    this.cache.push([number, 'add']);
    return this;
  }

  subtract(number) {
    this.cache.push([number, 'subtract']);
    return this;
  }

  multiply(number) {
    this.cache.push([number, 'multiply']);
    return this;
  }

  devide(number) {
    this.cache.push([number, 'devide']);
    return this;
  }

  pow(number) {
    this.cache.push([number, 'pow']);
    return this;
  }

  getOperation(type, number1, number2) {
    switch(type){
      case 'add' :
        return number1 += number2;
        break;
      case 'subtract' :
        return number1 -= number2;
        break;
      case 'multiply' :
        return number1 *= number2;
        break;
      case 'devide':
        return number1 /= number2;
        break;
      case 'pow' :
        return Math.pow(number1, number2);
        break;
    }
  }

  calculate() {

    let pocket = [];
    let result = [];

    this.cache.reduceRight((prev, curr, i, array) => {
      if((/(add|subtract)/.test(curr[1]) && /(add|subtract)/.test(prev[1]))
        ||  !(/(add|subtract)/.test(curr[1])) && /(add|subtract)/.test(prev[1])
        || (prev[1] === curr[1] && /(add|subtract)/.test(curr[1]))
        || (curr[1] === 'pow' && !(/(add|subtract)/.test(prev[1])))){
        if(curr[1] === 'pow' && !(/(add|subtract)/.test(prev[1]))) {
          pocket.push([prev[0], prev[1]]);
        }
        return curr;
      } else {
        result = [this.getOperation(prev[1], curr[0], prev[0]), curr[1]];
        this.cache.splice(i, 2, result);

        if(pocket.length > 0) {
          result = [this.getOperation(pocket[0][1], array[i][0], pocket[0][0]), curr[1]];
          this.cache.splice(i,2,result);
          pocket = [];
          return result;
        }

        return result;
      }
    });

    this.result = this.cache.reduce((prev,curr,i) => {
      this.cache.splice(i,1,[this.getOperation(curr[1], prev[0], curr[0]), curr[1]]);
      return [this.getOperation(curr[1], prev[0], curr[0]), curr[1]];
    }, [this.number,""]);
  }

  powFilter() {
    if(this.cache.findIndex(arr => arr[1] === "pow") > -1){
      this.cache.reduceRight((prev, curr, i) => {
        if(prev[1] === "pow" && prev[1] === curr[1]) {
          this.cache.splice(i,2, [Math.pow(curr[0], prev[0]), 'pow']);
          return [Math.pow(curr[0], prev[0]), 'pow'];
        } return curr;
      })
    }
    return this.cache;
  }

  valueOf() {
    this.powFilter();
    this.calculate();
    this.cache = [];
    return this.result[0];
  }

}

module.exports = SmartCalculator;


