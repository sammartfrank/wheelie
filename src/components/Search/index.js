import './styles.css';
import OptionList from './components/OptionList';

import { useSearch } from '../../hooks/index';

const Search = () => {
  const {
    handleOnChange,
    handleKeyDown,
    handleSelectChange,
    filteredItems,
    showOptions,
  } = useSearch();

  return (
    <>
      <div className='search-box'>
        <input
          type='text'
          placeholder='Enter a query'
          onChange={handleOnChange}
          onKeyDown={handleKeyDown}
        />
        <select onChange={handleSelectChange}>
          <option value='all'>All</option>
          <option value='animals'>Animals</option>
          <option value='companies'>Companies</option>
          <option value='products'>Products</option>
        </select>
      </div>
      <div>
        {/* {starredCount > 0 && (
          <button className='fav-list-button' onClick={handleAnchorClick}>
            Favourite items: {starredCount ? starredCount : '--'}
          </button>
        )} */}
        {/* <div className={`faved-list ${show ? 'show' : 'hidden'}`}>
          <ul className='faved-ul'>
            {starredItems.map((item) => (
              <li className='faved-item' key={item.id}>
                # {item.name}
              </li>
            ))}
          </ul>
        </div> */}
      </div>
      {filteredItems && showOptions && <OptionList options={filteredItems} />}
    </>
  );
};

export default Search;
