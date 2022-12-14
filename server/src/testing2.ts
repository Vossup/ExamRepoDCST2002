function getAnswer() {
  return (
    new Promise<number>((resolve) => {
      setTimeout(() => {
        resolve(42);
      }, 1000);
    })
  );
}

export { getAnswer }