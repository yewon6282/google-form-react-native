import {
  GestureResponderEvent,
  Image,
  StyleSheet,
  Text,
  Pressable,
  View,
} from 'react-native';
import { QuestionSort } from '../../types/Survey';
import { SurveyTypeData } from '../../../assets/json/SurveyData';

interface SurveyTypeButtonProps {
  isSelected: QuestionSort;
  onPress: (e: GestureResponderEvent) => void;
}

const SurveyTypeButton = ({ isSelected, onPress }: SurveyTypeButtonProps) => {
  const selectedType = SurveyTypeData.filter(
    (data) => data.value === isSelected
  )[0];

  return (
    <View style={styles.wrapper}>
      <Pressable onPress={(e) => onPress(e)} style={styles.container}>
        {selectedType.icon && (
          <Image source={selectedType.icon} style={styles.typeIcon} />
        )}
        <Text style={styles.labelText}>{selectedType.label}</Text>
        <Image
          source={require('../../../assets/image/down-arrow-icon.png')}
          style={styles.downArrowIcon}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingLeft: 12,
    paddingRight: 19,
    width: 208,
    height: 48,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#80868b',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },
  typeIcon: {
    width: 24,
    height: 24,
  },
  labelText: {
    width: 112,
    fontSize: 14,
    fontWeight: '400',
    color: '#202124',
  },
  downArrowIcon: {
    width: 10,
    height: 5,
  },
});

export default SurveyTypeButton;
