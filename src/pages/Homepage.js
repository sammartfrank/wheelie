import Search from '../components/Search';
import List from '../components/List';
import './styles.css';

const Homepage = () => {
  return (
    <div>
      <Search />
      <div className='content-wrapper'>
        <List />
      </div>
    </div>
  );
};

export default Homepage;
