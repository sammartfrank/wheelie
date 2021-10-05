import './styles.css';

const Card = ({ item }) => {
  switch (item.type) {
    case 'animal':
      return (
        <div className='card-wrapper'>
          {item.starred && <div className='star-item' />}
          <h2 className='item-title'>{item.name || '--'}</h2>
          <p>
            <b>Scientific Name:</b> {item.taxonomy.scientificName || '--'}
          </p>
          {item.image && <img src={item.image} alt={item.name} />}
        </div>
      );
    case 'product':
      return (
        <div className='card-wrapper'>
          {item.starred && <div className='star-item' />}
          <h2>{item.name || '--'}</h2>
          <p>
            <b>Category</b> {item.productCategory || '--'}
          </p>
          <p>
            <b>Description:</b> {item.previewText || '--'}
          </p>
        </div>
      );
    case 'company':
      return (
        <div className='card-wrapper'>
          {item.starred && <div className='star-item' />}
          <h2>{item.name || '--'}</h2>
          <p>
            <b>Description:</b> {item.description || '--'}
          </p>
          <p>
            <b>Addres:</b> {item.address.address1 || '--'}
          </p>
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
