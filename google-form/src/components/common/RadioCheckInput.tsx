import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { addETCOption, addOption } from '../../store/reviewing';
import { OptionsType } from '../../types/Survey';
import RadioCheckOptionInput from './RadioCheckOptionInput';

type RadioCheckInputProps = {
  id: number;
  options: OptionsType[] | undefined;
  questionType: 'optional' | 'checkbox';
};

const RadioCheckInput = ({
  id,
  options,
  questionType,
}: RadioCheckInputProps) => {
  const dispatch = useDispatch();

  const handleNewOption = () => {
    dispatch(addOption(id));
  };

  const handleETCOption = () => {
    dispatch(addETCOption(id));
  };

  const isFull = options?.filter((option) => option.value === null).length || 0;

  return (
    <View>
      {options?.map((option) => (
        <View key={option.id} style={styles.wrapper}>
          <RadioCheckOptionInput
            id={id}
            optionId={option.id}
            text={option.value}
            questionType={questionType}
          />
        </View>
      ))}
      <View style={styles.wrapper}>
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.checkIconWrapper}>
            <Image
              source={
                questionType === 'optional'
                  ? require('../../../assets/image/empty-radio-button.png')
                  : require('../../../assets/image/empty-check-icon.png')
              }
              style={styles.checkIcon}
            />
          </View>
          <View style={styles.addOptionWrapper}>
            <Pressable onPress={handleNewOption}>
              <Text style={styles.addOption}>옵션 추가</Text>
            </Pressable>
            {!isFull && (
              <>
                <Text style={styles.orText}>또는</Text>
                <Pressable onPress={handleETCOption}>
                  <Text style={styles.addOther}>&apos;기타&apos; 추가</Text>
                </Pressable>
              </>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
    height: 48,
  },
  checkIconWrapper: {
    marginRight: 10,
    width: 20,
    height: 20,
  },
  checkIcon: {
    width: '100%',
    height: '100%',
  },
  addOptionWrapper: {
    flexDirection: 'row',
  },
  addOption: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    color: '#202124',
  },
  orText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    color: '#202124',
  },
  addOther: {
    paddingHorizontal: 8,
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    color: '#1a73e8',
  },
});

export default RadioCheckInput;
