const CompanyCard = ({ item: { starred, name, description, address } }) => {
  return (
    <div className='card-wrapper'>
      {starred && <div className='star-item' />}
      <h2>{name || '--'}</h2>
      <p>
        <b>Description:</b> {description || '--'}
      </p>
      <p>
        <b>Addres:</b> {address.address1 || '--'}
      </p>
    </div>
  );
};
export default CompanyCard;
