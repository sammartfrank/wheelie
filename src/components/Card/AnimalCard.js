
const AnimalCard = ({ item: { starred, name, taxonomy, image } }) => {
    return (
      <div className='card-wrapper'>
        {starred && <div className='star-item' />}
        <h2 className='item-title'>{name || '--'}</h2>
        <p>
          <b>Scientific Name:</b> {taxonomy?.scientificName || '--'}
        </p>
        {image && <img src={image} alt={name} />}
      </div>
    );
}

export default AnimalCard;