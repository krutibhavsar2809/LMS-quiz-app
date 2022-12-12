import reducer from './reducer';
import { legacy_createStore as createStore } from 'redux';
import { persistStore } from 'redux-persist';
import { devToolsEnhancer } from 'redux-devtools-extension';

const store = createStore(reducer, /* preloadedState, */ devToolsEnhancer(
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
)); 
// need to remove devToolEnhancer as we are saving quiz data to redux for security purpose

export const persistor = persistStore(store);
export default store;