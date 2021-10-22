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
          <List />
      </UserInterfaceContextProvider>
    </ContextProvider>
  );
};

export default Homepage;
