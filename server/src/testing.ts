function divide(dividend: number, divisor: number) {
    return new Promise<number>((resolve, reject) => {
      if (divisor == 0) return reject(new Error('Cannot divide by zero'));
      if (dividend == 0) return resolve(0);
      setTimeout(() => {
        resolve(dividend / divisor);
      }, 1000);
    });
  }

export { divide }
