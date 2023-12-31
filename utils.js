const shuffle = (arr) => {
  let counter = arr.length;
  while (counter > 0) {
    const index = Math.floor(Math.random() * counter);
    counter--;

    const temporary = arr[counter];
    arr[counter] = arr[index];
    arr[index] = temporary;
  }
  return arr;
};
