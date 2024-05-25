import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import store, {persistor} from '@/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import AppNavigator from '@/navigation';

import {GestureHandlerRootView} from 'react-native-gesture-handler';

import Toast from 'react-native-toast-message';
import toastConfig from './components/Toast/Toast';

const App = () => {
  console.log(toastConfig)
  return (
    <>
      <GestureHandlerRootView style={{flex: 1}}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <AppNavigator />
          </PersistGate>
        </Provider>
      </GestureHandlerRootView>
      <Toast  />
    </>
  );
};
export default App;
