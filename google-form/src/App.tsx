import { NavigationContainer } from '@react-navigation/native';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import SurveyStack from './navigations/SurveyStack';
import rootReducer from './store';

const App = () => {
  const store = createStore(rootReducer);
  const persistor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ActionSheetProvider>
          <NavigationContainer>
            <SurveyStack />
          </NavigationContainer>
        </ActionSheetProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
