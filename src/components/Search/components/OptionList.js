import { useHomepage } from '../../../hooks/index';

import './styles.css';

const RenderOptions = (displayedOptions = []) => {
  const { handleFaved } = useHomepage();

  return displayedOptions.map(({ id, name, type, starred }) => {
    return (
      <li
        className='option-box'
        key={id}
        onClick={handleFaved(id, displayedOptions)}
      >
        <div className='option-content'>
          <p>{name}</p>
          <em>{type}</em>
          {starred && <div className='star' />}
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
