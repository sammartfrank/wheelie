import Search from '../components/Search';
import List from '../components/List';
import './styles.css';

const Homepage = () => {
  return (
    <>
      <Search />
      <div className='content-wrapper'>
        <List />
      </div>
    </>
  );
};

export default Homepage;
