export const getCompanies = async (page = 1, limit = 10) => {
  const response = await fetch(
    `http://localhost:3001/search?type=company&_page=${page}&_limit=${limit}}`,
    {
      method: 'get',
    }
  );

  const result = await response.json();
  return result;
};

export const getAnimals = async (page = 1, limit = 10) => {
  const response = await fetch(
    `http://localhost:3001/search?type=animal&_page=${page}&_limit=${limit}}`,
    {
      method: 'get',
    }
  );

  const result = await response.json();
  return result;
};

export const getProducts = async (page = 1, limit = 10) => {
  const response = await fetch(
    `http://localhost:3001/search?type=product&_page=${page}&_limit=${limit}}`,
    {
      method: 'get',
    }
  );
  const result = await response.json();
  return result;
};

export const editData = async (id, payload) => {
  const response = await fetch(`http://localhost:3001/search/${id}`, {
    method: 'put',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const result = await response.json();
  return result;
};

export const getData = async (page = 1, limit = 30) => {
  const response = await Promise.all([
    getAnimals(page, limit),
    getCompanies(page, limit),
    getProducts(page, limit),
  ]);
  return response;
};
