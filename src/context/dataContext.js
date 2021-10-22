import { createContext, useContext, useReducer } from 'react';
import { editData, getData } from '../utils/service';
import { reduceData } from '../utils/index';

const Context = createContext();

async function getItems(dispatch) {
  dispatch({ type: 'start-fetch' });
  try {
    const items = await getData(1, 25);
    const newState = reduceData(items);
    dispatch({ type: 'success-fetch', newState });
  } catch (error) {
    dispatch({ type: 'fail-fetch', error });
  }
}

async function updateItem(dispatch, item) {
  dispatch({ type: 'start-update' });
  try {
    const updatedItem = await editData(item.id, item);
    dispatch({ type: 'success-update', updatedItem });
    getItems(dispatch)
  } catch (error) {
    dispatch({ type: 'fail-update', error });
  }
}

const contextReducer = (state, action) => {
  switch (action.type) {
    case 'start-fetch': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'success-fetch': {
      return {
        ...state,
        ...action.newState,
        isLoading: false,
      };
    }
    case 'failed-fetch': {
      return {
        ...state,
        error: action.error,
        isLoading: false,
      };
    }
    case 'start-update': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'success-update': {
      return {
        ...state,
        isLoading: false,
      };
    }
    case 'failed-update': {
      return {
        ...state,
        isLoading: false,
        error: action.error
      }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(contextReducer, {
    animals: [],
    companies: [],
    products: [],
    isLoading: false,
  });
  const value = { state, dispatch };
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

const useDataContext = () => {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error('useDataContext must be inside a Provider');
  }
  return context;
};

export { ContextProvider, useDataContext, updateItem, getItems };
