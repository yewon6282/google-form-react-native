import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SurveyScreen from '../screens/SurveyScreen';

const Stack = createNativeStackNavigator();

const SurveyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={'Survey'} component={SurveyScreen} />
    </Stack.Navigator>
  );
};

export default SurveyStack;
