import { StyleSheet, View } from 'react-native';
import Survey from '../components/survey';

const SurveyScreen = () => {
  return (
    <View style={styles.container}>
      <Survey />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    minHeight: '100%'
  },
});

export default SurveyScreen;
