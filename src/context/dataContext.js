import { createContext, useContext, useReducer } from 'react';
import { editData, getData } from '../utils/service';
const Context = createContext();

async function getItems(dispatch) {
  dispatch({ type: 'start-fetch' });
  try {
    const items = await getData(1, 25).then((val) =>
      console.log('Response getData: ', val)
    );
    console.log('🚀 ---------------------------');
    console.log('🚀 ~ items', items);
    console.log('🚀 ---------------------------');
    dispatch({ type: 'success-fetch', items });
  } catch (error) {
    dispatch({ type: 'fail-fetch', error });
  }
}

async function updateItem(dispatch, item, updates) {
  dispatch({ type: 'start-update', updates });
  try {
    const updatedItem = await editData(item.id, item).then((updatedItem) => {
      console.log('the item updated: ', updatedItem);
    });
    dispatch({ type: 'success-update', updatedItem });
  } catch (error) {
    dispatch({ type: 'fail-update', error });
  }
}

const contextReducer = (state, action) => {
  switch (action.type) {
    case 'start-update': {
      return {
        ...state,
        isLoading: true
      };
    }
    case 'success-update': {
      let data;
      action.items.forEach((item) => {
        switch (item[0].type) {
          case 'animal': {
            data = {
              ...data,
              animals: [...data.animals, item],
            };
            break;
          }
          case 'product': {
            data = {
              ...data,
              products: [...data.products, item],
            };
            break;
          }
          case 'company': {
            data = {
              ...data,
              companies: [...data.companies, item],
            };
            break;
          }
          default: {
            throw new Error('Unhandled type');
          }
        }
      });
      return {
        ...data,
        isLoading: false
      }
    }
    case 'fail-update': {
      return {
        ...state,
        error: action.error,
        isLoading: false
      };
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

const useStarContext = () => {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error('useStar must be inside a Provider');
  }
  return context;
};

export { ContextProvider, useStarContext, updateItem, getItems };
