import { StyleSheet, TextInput, View } from 'react-native';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeExplanation, changeTitle } from '../../store/naming';
import { RootState } from '../../store';
import { handleDebounce } from '../../utils/DebounceUtils';

const SurveyTop = () => {
  const { title, explanation } = useSelector(
    (state: RootState) => state.naming
  );
  const dispatch = useDispatch();

  const [titleValue, setTitleValue] = useState<string>(title);
  const debouncedTitle = handleDebounce(titleValue, 300);

  useEffect(() => {
    dispatch(changeTitle(debouncedTitle));
  }, [debouncedTitle]);

  const handleTitle = (value: string) => {
    setTitleValue(value);
  };

  const [explanationValue, setExplanationValue] = useState<string>(explanation);
  const debouncedExplanation = handleDebounce(explanationValue, 300);

  useEffect(() => {
    dispatch(changeExplanation(debouncedExplanation));
  }, [debouncedExplanation]);

  const handleExplanation = (value: string) => {
    setExplanationValue(value);
  };

  return (
    <View style={styles.section}>
      <View style={styles.topBorder}></View>
      <View style={styles.titleInputWrapper}>
        <TextInput
          placeholder={title || '제목 없는 설문지'}
          placeholderTextColor={'#202124'}
          style={styles.titleInput}
          onChangeText={(e) => handleTitle(e)}
        ></TextInput>
      </View>
      <View style={styles.subTitleInputWrapper}>
        <TextInput
          placeholder={explanation || '설문지 설명'}
          placeholderTextColor={'#717579'}
          style={styles.subTitleInput}
          onChangeText={(e) => handleExplanation(e)}
        ></TextInput>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    position: 'relative',
    paddingTop: 22,
    paddingBottom: 24,
    width: '100%',
    height: 138,
    borderRadius: 8,
    border: '1px solid #dadce0',
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  topBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: 10,
    backgroundColor: '#673AB7',
  },
  titleInputWrapper: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 340,
    height: 64,
  },
  titleInput: {
    width: '100%',
    height: '100%',
    fontSize: 32,
    color: '#202124',
  },
  subTitleInputWrapper: {
    marginTop: 4,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 340,
    height: 22,
  },
  subTitleInput: {
    width: '100%',
    height: '100%',
    fontSize: 15,
    fontWeight: '400',
    color: '#202124',
  },
});

export default SurveyTop;
