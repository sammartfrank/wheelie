import { createContext, useContext, useReducer } from 'react';

const UiContext = createContext();

const uiContextReducer = (state, action) => {
  switch (action.type) {
    case 'collapse': {
      return {
        ...state,
        [action.value]: false
      };
    }
    case 'un-collapse': {
      return {
        ...state,
        [action.value]: true,
      };
    }
    default: {
      throw new Error(`Undandled action type:$ ${action.type}`);
    }
  }
};

const UserInterfaceContextProvider = ({ children }) => {
  const [uiState, interfaceDispatch] = useReducer(uiContextReducer, {
    animals: true,
    companies: false,
    products: false,
  });
  const value = { uiState, interfaceDispatch };

  return <UiContext.Provider value={value}>{children}</UiContext.Provider>;
};

const useUi = () => {
  const context = useContext(UiContext);
  if (context === undefined) {
    throw new Error('useUi must be inside a Provider');
  }
  return context;
};

export { UserInterfaceContextProvider, useUi };
