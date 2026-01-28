import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './src/store';
import TabsNavigator from './src/navigation/TabsNavigator';
import { initDB } from './src/database/sqlite';

export default function App() {
  useEffect(() => {
    initDB();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <TabsNavigator />
      </NavigationContainer>
    </Provider>
  );
}
