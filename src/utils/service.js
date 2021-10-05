export const getData = async () => {
  const response = await fetch('http://localhost:3001/search?', {
    method: 'get',
  });

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
