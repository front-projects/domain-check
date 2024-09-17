function delayedPromise() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Проміс виконано через 2 секунди');
    }, 2000);
  });
}

export const checkDomain = async (domain) => {
  await delayedPromise();
  return true;
};
