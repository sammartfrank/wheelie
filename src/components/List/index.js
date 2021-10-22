import { useEffect } from 'react';
import { useDataContext, getItems } from '../../context/dataContext';
import { useUi } from '../../context/uiContext';
import Card from '../Card';

import './styles.css';

const List = () => {
  const { state, dispatch } = useDataContext();
  const { uiState, interfaceDispatch } = useUi();

  useEffect(() => {
    getItems(dispatch);
  }, [dispatch]);

  const renderCards = (list) => {
    return state[list].map((item) => (
      <Card key={`${item.name}-${item.id}`} item={item} />
    ));
  };

  return Object.keys(state).map((list) => {
    if (list === 'isLoading') return [];
    return (
      <div className='list-wrapper' key={list}>
        <h2
          className='list-title'
          onClick={() =>
            interfaceDispatch({
              type: `${uiState[list] ? 'collapse' : 'un-collapse'}`,
              value: list,
            })
          }
        >
          {list} <em className='list-detail'>items found</em>
          {uiState[list] ? '-' : '+'}
        </h2>
        <hr />
        <div className={`collapse ${uiState[list] && 'in'}`}>
          <div className='item-list'>{renderCards(list)}</div>
        </div>
      </div>
    );
  });
};

export default List;
