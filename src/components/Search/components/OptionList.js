import { updateItem, useDataContext } from '../../../context/dataContext';
import './styles.css';

const RenderOptions = (displayedOptions = []) => {
  const { dispatch } = useDataContext();
  return displayedOptions.map((item) => {
    return (
      <li
        className='option-box'
        key={item.id}
        onClick={() => updateItem(dispatch, { ...item, starred: true })}
      >
        <div className='option-content'>
          <p>{item.name}</p>
          <em>{item.type}</em>
          {item.starred && <div className='star' />}
        </div>
      </li>
    );
  });
};

const OptionList = ({ options = [] }) => {
  const possibleOptions = options?.length;
  const displayedOptions = options?.slice(0, 10);

  return (
    <ul className='options-box'>
      {RenderOptions(displayedOptions)}
      <p className='results-summary'>
        <em>Results found: {possibleOptions}</em>
      </p>
    </ul>
  );
};

export default OptionList;
