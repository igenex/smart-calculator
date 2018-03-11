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
    this.cache.reduceRight((prev, curr, i) => {
      if((/(add|subtract)/.test(curr[1]) && /(add|subtract)/.test(prev[1]))
      ||  !(/(add|subtract)/.test(curr[1])) && /(add|subtract)/.test(prev[1])
      || (prev[1] === curr[1] && /(add|subtract)/.test(curr[1]))
      || (curr[1] === 'pow' && !(/(add|subtract)/.test(prev[1])))){
        return curr;
      } else {
        this.cache.splice(i,2,[this.getOperation(prev[1], curr[0], prev[0]), curr[1]]);
        return [this.getOperation(prev[1], curr[0], prev[0]), curr[1]];
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

const calculator = new SmartCalculator(6);

const value = calculator
  .pow(2)
  .pow(1)
  .add(33)
  .pow(1)
  .multiply(2)
  .multiply(1)
  .add(39)
  .multiply(2)
  .multiply(2); //258

console.log(value);

module.exports = SmartCalculator;


