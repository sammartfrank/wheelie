const ProductCard = ({
  item: { starred, name, productCategory, previewText },
}) => {
  return (
    <div className='card-wrapper'>
      {starred && <div className='star-item' />}
      <h2>{name || '--'}</h2>
      <p>
        <b>Category</b> {productCategory || '--'}
      </p>
      <p>
        <b>Description:</b> {previewText || '--'}
      </p>
    </div>
  );
};

export default ProductCard;
