import Search from '../components/Search';
import List from '../components/List';
import './styles.css';

import { ContextProvider } from '../context/dataContext';
import { UserInterfaceContextProvider } from '../context/uiContext';

const Homepage = () => {
  return (
    <ContextProvider>
      <Search />
      <UserInterfaceContextProvider>
        <div className='content-wrapper'>
          <List />
        </div>
      </UserInterfaceContextProvider>
    </ContextProvider>
  );
};

export default Homepage;
