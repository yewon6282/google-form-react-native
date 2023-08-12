import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import SurveyStack from './navigations/SurveyStack';

const App = () => {
  return (
    <NavigationContainer>
      <SurveyStack />
      <StatusBar style="auto" />
    </NavigationContainer>
  );
};

export default App;
