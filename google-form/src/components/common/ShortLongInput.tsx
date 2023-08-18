import { StyleSheet, TextInput, View } from 'react-native';

type ShortLongInputProps = {
  questionType: 'short' | 'long';
};

const ShortLongInput = ({ questionType }: ShortLongInputProps) => {
  return (
    <View style={styles.wrapper}>
      <TextInput
        placeholder={questionType === 'short' ? '단답형 텍스트' : '장문형 텍스트'}
        placeholderTextColor={'#717579'}
        style={[styles.textInput, { width: questionType === 'short' ? 167 : 284 }]}
      ></TextInput>
      <View style={[styles.bottomBorder, { width: questionType === 'short' ? 167 : 284 }]}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginLeft: 30,
    marginBottom: 24,
    marginRight: '2%',
    minHeight: 62,
  },
  textInput: {
    height: 27,
    fontSize: 14,
    fontWeight: '400',
  },
  bottomBorder: {
    width: 284,
    height: 1,
    borderWidth: 1,
    borderStyle: 'dotted',
    borderColor: '#00000060',
  },
});

export default ShortLongInput;
