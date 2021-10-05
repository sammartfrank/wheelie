import Spinner from 'react-bootstrap/Spinner';
import './styles.css'
const Loader = () => {
  return (
    <div className="loader">
    <Spinner animation='border' role='status'>
      <span className='visually-hidden'>Loading...</span>
    </Spinner>
    </div>
  );
};

export default Loader;
