import { useHomepage } from '../../hooks';
import Card from '../Card';

import './styles.css';

const List = () => {
  const { show, data, toggleShow } = useHomepage();

  const renderCards = (list) => {
    return data[list].map((item) => (
      <Card key={`${item.name}-${item.id}`} item={item} />
    ));
  };

  return Object.keys(data).map((list) => {
    const itemsLength = data[list].length;
    return (
      <div className='list-wrapper' key={list}>
        <h2 className='list-title' onClick={toggleShow(list)}>
          {list} <em className='list-detail'>({itemsLength} items found)</em>
          {show[list] ? '-' : '+'}
        </h2>
        <hr />

        {!itemsLength ? (
          <div>Items being rendered. It may take a few seconds.</div>
        ) : (
          <div className={`collapse ${show[list] && 'in'}`}>
            <div className='item-list'>{renderCards(list)}</div>
          </div>
        )}
      </div>
    );
  });
};

export default List;
