import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './src/store';
import TabsNavigator from './src/navigation/TabsNavigator';
import { initDB } from './src/database/sqlite';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './src/firebase/config';
import LoginScreen from './src/screens/LoginScreen';

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initDB();

    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) return null; // splash simple

  return (
    <Provider store={store}>
      <NavigationContainer>
        {user ? <TabsNavigator /> : <LoginScreen />}
      </NavigationContainer>
    </Provider>
  );
}
