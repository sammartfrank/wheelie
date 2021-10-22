import './styles.css';

import AnimalCard from './AnimalCard';
import ProductCard from './ProductCard';
import CompanyCard from './CompanyCard';

const Card = ({ item }) => {
  switch (item.type) {
    case 'animal':
      return <AnimalCard item={item} />;
    case 'product':
      return <ProductCard item={item} />;
    case 'company':
      return <CompanyCard item={item} />;
    default:
      throw new Error('Card Type not supported');
  }
};

export default Card;
