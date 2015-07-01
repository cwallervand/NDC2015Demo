require('babel/polyfill');
let request = require('request');

let Ndc2015 = {
  *idGenerator() {
    let index = 0;
    while (true) {
      let resetId = yield index++;
      if (resetId) {
        index = resetId;
      }
    }
  },
  *fibonacciGenerator() {
    let fn1 = 1;
    let fn2 = 1;
    while (true) {
      let currentVal = fn2;
      fn2 = fn1;
      fn1 += currentVal;
      let reset = yield currentVal;

      if (reset) {
        fn1 = 1;
        fn2 = 1;
      }
    }
  },
  promiseFunc(message, timeout) {
    return new Promise((resolve, rejevt) => {
      setTimeout(() => {
        resolve(message);
      }, timeout);
    });
  },
  getData(url) {
    return new Promise((resolve, reject) => {
      request(url, (error, response, body) => {
        if (response.statusCode === 200) {
          resolve(JSON.parse(body));
        }
        if (error || response.statusCode === 404) {
          reject('Oh noes!!');
        }
      })
    });
  }
};

Ndc2015.getData('http://coinabul.com/api.php')
  .then((data) => {
    let message =
    `One Bitcoin has the value of
     USD: ${data.BTC.USD}
    `;
    console.log(message);
    return Ndc2015.promiseFunc('Some IDs', 2000);
  })
  .then((message) => {
    console.log(message);
    let idGenerator = Ndc2015.idGenerator();
    console.log(idGenerator.next().value);
    console.log(idGenerator.next().value);
    console.log(idGenerator.next().value);
    console.log(idGenerator.next().value);
    console.log(idGenerator.next().value);
    return idGenerator.next(15).value;
  })
  .then((id) => {
    console.log(`ID set to ${id}`);
    return Ndc2015.promiseFunc('Some Fibonacci numbers', 1000);
  })
  .then((message) => {
    console.log(message);
    let fibonacciGenerator = Ndc2015.fibonacciGenerator();
    console.log(fibonacciGenerator.next().value);
    console.log(fibonacciGenerator.next().value);
    console.log(fibonacciGenerator.next().value);
    console.log(fibonacciGenerator.next().value);
    console.log(fibonacciGenerator.next().value);
    console.log(fibonacciGenerator.next().value);
    console.log(fibonacciGenerator.next().value);
    console.log(fibonacciGenerator.next().value);
    return Ndc2015.promiseFunc('May the force be with you', 500);
  })
  .then((message) => {
    console.log(message);
  })
  .catch((err) => {
    console.log('Error', err);
  });
