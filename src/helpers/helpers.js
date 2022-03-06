import axios from 'axios';

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

export const fetchCollections = async () => {
  const { data } = await axios.get('http://localhost/my-app/src/backend/api/collections.php');

  return data;
};

export const batchVariants = (array) => {
  let temp = [];
  let final = [];

  for (let i = 0; i < array.length; i = i + 2) {
    let current = array[i]; //store first batch of variants in a variable
    if (array[i + 1] !== undefined) {
      let next = array[i + 1]; //store next batch of variants
      for (let a = 0; a < current.length; a++) {
        for (let b = 0; b < next.length; b++) {
          temp.push(`${current[a]} / ${next[b]}`);
          //push current variant of the first object and
          //current variant of the second object into an array
          final.push(temp); //record the array
          temp = []; //renew the temporary array
        }
      }
    }
  }
  return final;
};
