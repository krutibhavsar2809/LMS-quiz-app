import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import store, { persistor } from './Redux/store'
import LoadingView from './Components/Common/LoadingView';
import { UserProfileProvider } from './Components/Context/UserProfileContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={<LoadingView />}>
        <UserProfileProvider>
          <App />
        </UserProfileProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
