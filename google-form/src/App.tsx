import { NavigationContainer } from '@react-navigation/native';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import SurveyStack from './navigations/SurveyStack';

const App = () => {
  return (
    <ActionSheetProvider>
      <NavigationContainer>
        <SurveyStack />
      </NavigationContainer>
    </ActionSheetProvider>
  );
};

export default App;
