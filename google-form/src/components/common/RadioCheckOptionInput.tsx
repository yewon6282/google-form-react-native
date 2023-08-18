import { Image, Pressable, StyleSheet, TextInput, View } from 'react-native';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { changeOption, deleteOption } from '../../store/reviewing';
import { OptionTextType } from '../../types/Survey';
import { handleDebounce } from '../../utils/DebounceUtils';

interface RadioCheckOptionInputProps extends OptionTextType {
  questionType: 'optional' | 'checkbox';
}

const RadioCheckOptionInput = ({
  id,
  optionId,
  text,
  questionType,
}: RadioCheckOptionInputProps) => {
  const dispatch = useDispatch();

  const [value, setValue] = useState<OptionTextType>({
    id,
    optionId,
    text,
  });

  const debouncedValue = handleDebounce(value.text, 300);

  useEffect(() => {
    dispatch(changeOption({ id, optionId: value.optionId, text: debouncedValue }));
  }, [debouncedValue]);

  const handleOptionText = ({ optionId, text }: OptionTextType) => {
    setValue({ id, optionId, text });
  };

  const handleDeleteOption = (optionId: number) => {
    dispatch(deleteOption({ id, optionId }));
  };

  return (
    <>
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
        <TextInput
          placeholder={text === null ? '기타...' : `옵션 ${optionId + 1}`}
          placeholderTextColor={'#202124'}
          style={styles.textInput}
          onChangeText={(e) => handleOptionText({ id, optionId, text: e })}
        ></TextInput>
      </View>
      <Pressable onPress={() => handleDeleteOption(optionId)} style={styles.closeIconWrapper}>
        <Image source={require('../../../assets/image/close-icon.png')} style={styles.closeIcon} />
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  checkIconWrapper: {
    marginRight: 10,
    width: 20,
    height: 20,
  },
  checkIcon: {
    width: '100%',
    height: '100%',
  },
  textInput: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 15,
    color: '#202124',
  },
  closeIconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 48,
    height: 48,
  },
  closeIcon: {
    width: 14,
    height: 14,
  },
});

export default RadioCheckOptionInput;
