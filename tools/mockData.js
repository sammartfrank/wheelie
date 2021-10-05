const faker = require("faker");
const { createAvatar } = require("@dicebear/avatars");
const style = require("@dicebear/avatars-avataaars-sprites");

const SET_SIZE = 2500;
const DATA_TYPES = {
  animal: "animal",
  company: "company",
  product: "product",
};

const generateAnimals = () => {
  const animals = [];
  for (let i = 0; i < SET_SIZE; i++) {
    const skipImgEvery = 4;
    const animalType = faker.animal.type();
    const name = `${faker.commerce.color()} ${faker.animal[animalType]()}`;

    const animal = {
      type: DATA_TYPES.animal,
      id: `${DATA_TYPES.animal}.${i}`,
      starred: false,
      taxonomy: {
        family: animalType,
        scientificName: `${animalType}us ${faker.lorem.word()}`,
      },
      name,
    };
    if (i % skipImgEvery !== 0) {
      animal.image = generateAvatar(name);
    }

    animals.push(animal);
  }
  return animals;
};

const generateAvatar = (seed) => {
  let svg = createAvatar(style, {
    seed,
    dataUri: true,
  });
  return svg;
};

const generateCompanies = () => {
  const companies = [];
  const useSecondaryAddressEvery = 4;

  for (let i = 0; i < SET_SIZE; i++) {
    const stateCode = faker.address.stateAbbr();
    const address = {
      address1: faker.address.streetAddress(),
      city: faker.address.city(),
      state: stateCode,
      postalCode: faker.address.zipCodeByState(stateCode),
    };
    if (i % useSecondaryAddressEvery === 0) {
      address.address2 = faker.address.secondaryAddress();
    }

    const company = {
      type: DATA_TYPES.company,
      id: `${DATA_TYPES.company}.${i}`,
      starred: false,
      name: `${faker.company.companyName()}`,
      description: `${faker.company.bsAdjective()} ${faker.company.catchPhraseDescriptor()} ${faker.company.catchPhraseNoun()}`,
      address,
    };

    companies.push(company);
  }
  return companies;
};

const generateProducts = () => {
  const showImgEvery = 5;
  const products = [];
  for (let i = 0; i < SET_SIZE; i++) {
    const name = `${faker.commerce.productMaterial()} ${faker.commerce.productAdjective()} ${faker.commerce.productName()}`;
    const product = {
      type: DATA_TYPES.product,
      id: `${DATA_TYPES.product}.${i}`,
      starred: false,
      name,
      productCategory: faker.commerce.product(),
      previewText: faker.commerce.productDescription(),
    };
    if (i % showImgEvery === 0) {
      product.image = generateAvatar(name);
    }

    products.push(product);
  }
  return products;
};

const generateMockData = () => {
  const animals = generateAnimals();
  const companies = generateCompanies();
  const products = generateProducts();

  let interleavedResults = [];
  for (let i = 0; i < SET_SIZE; i++) {
    interleavedResults = interleavedResults.concat(
      animals[i],
      companies[i],
      products[i]
    );
  }

  return {
    animals,
    companies,
    products,
    search: interleavedResults,
  };
};

module.exports = { ...generateMockData() };
