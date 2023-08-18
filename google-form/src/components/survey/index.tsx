import { ScrollView, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import SurveyTop from './SurveyTop';
import SurveyCard from './SurveyCard';
import BottomBar from '../common/BottomBar';

const Survey = () => {
  const questionList = useSelector((state: RootState) => state.reviewing.questions);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollScreen}>
        <SurveyTop />
        {questionList.map((list) => (
          <View key={list.id}>
            <SurveyCard
              id={list.id}
              title={list.title}
              options={list.options}
              questionType={list.questionType}
              isEssential={list.isEssential}
            />
          </View>
        ))}
      </ScrollView>
      <BottomBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 12,
    width: '100%',
    minHeight: '100%',
    backgroundColor: '#f0ebf8',
  },
  scrollScreen: {
    marginBottom: 60,
  },
});

export default Survey;
