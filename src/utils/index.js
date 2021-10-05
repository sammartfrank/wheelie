export const reduceData = (data = []) => {
  return data?.reduce(
    (prevValue, currValue) => {
      if (currValue.type === 'animal') {
        prevValue = {
          ...prevValue,
          animals: [...prevValue.animals].concat(currValue),
        };
      }
      if (currValue.type === 'company') {
        prevValue = {
          ...prevValue,
          companies: [...prevValue.companies].concat(currValue),
        };
      }
      if (currValue.type === 'product') {
        prevValue = {
          ...prevValue,
          products: [...prevValue.products].concat(currValue),
        };
      }
      return prevValue;
    },
    {
      companies: [],
      animals: [],
      products: [],
    }
  );
};
