import './styles.css';

const Card = ({ item }) => {
  const isFaved = item.starred && '-show';
  switch (item.type) {
    case 'animal':
      return (
        <div className='card-wrapper'>
          <div className={`star-item${isFaved}`} />
          <h4 className='item-title'>{item.name || '--'}</h4>
          <p>Scientific Name: {item.taxonomy.scientificName || '--'}</p>
          {item.image && <img src={item.image} alt={item.name} />}
        </div>
      );
    case 'product':
      return (
        <div className='card-wrapper'>
         <div className={`star-item${item.starred && '-show'}`} />
          <h4>{item.name || '--'}</h4>
          <p>Category: {item.productCategory || '--'}</p>
          <p>Description: {item.previewText || '--'}</p>
        </div>
      );
    case 'company':
      return (
        <div className='card-wrapper'>
         <div className={`star-item${item.starred && '-show'}`} />
          <h4>{item.name || '--'}</h4>
          <p>Description: {item.description || '--'}</p>
          <p>Addres: {item.address1 || '--'}</p>
        </div>
      );
    default:
      return (
        <div className='card-wrapper'>
          <h4>{item.name || '--'}</h4>
        </div>
      );
  }
};

export default Card;
