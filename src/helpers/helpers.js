export const moneyFormat = (price) => {
  let formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return formatter.format(price);
};

export const calculateCartCount = (arr) => {
  return arr.reduce((sum, current) => {
    return (sum += current.quantity);
  }, 0);
};
