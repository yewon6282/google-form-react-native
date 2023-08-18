import {
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { QuestionType } from '../../types/Survey';
import SurveyTypeButton from '../common/SurveyTypeButton';
import ShortLongInput from '../common/ShortLongInput';
import RadioCheckInput from '../common/RadioCheckInput';
import { ModalData } from '../../../assets/json/SurveyData';
import {
  changeEssential,
  changeQuestion,
  copyQuestion,
  deleteQuestion,
} from '../../store/reviewing';
import { handleDebounce } from '../../utils/DebounceUtils';

const SurveyCard = (data: QuestionType) => {
  const { id, title, options, questionType, isEssential } = data;
  const dispatch = useDispatch();

  const [value, setValue] = useState(title);

  const debouncedValue = handleDebounce(value, 300);

  useEffect(() => {
    dispatch(changeQuestion({ id, title: debouncedValue }));
  }, [debouncedValue]);

  const handleQuestionTitle = (question: string) => {
    setValue(question);
  };

  const handleEssential = (isEssential: boolean) => {
    dispatch(changeEssential({ id, isEssential }));
  };

  const [showModal, setShowModal] = useState(false);

  const handleModal = () => {
    setShowModal(!showModal);
  };

  const handleQuestion = (value: string) => {
    setShowModal(!showModal);
    if (value === 'copy') {
      dispatch(copyQuestion(id));
    } else {
      dispatch(deleteQuestion(id));
    }
  };

  return (
    <Pressable style={styles.section}>
      <View style={styles.leftBorder} />
      <View style={styles.dragIconWrapper}>
        <Image
          source={require('../../../assets/image/drag-icon.png')}
          style={styles.dragIcon}
        />
      </View>
      <View style={styles.cardCommonWrapper}>
        <View style={styles.titleInputWrapper}>
          <TextInput
            placeholder={title || '제목없는 질문'}
            placeholderTextColor={'#202124'}
            style={styles.titleInput}
            onChangeText={(e) => handleQuestionTitle(e)}
          ></TextInput>
        </View>
        <View style={styles.ImageIconWrapper}>
          <Image
            source={require('../../../assets/image/image-icon.png')}
            style={styles.ImageIcon}
          />
        </View>
        <SurveyTypeButton isSelected={questionType} id={id} />
      </View>
      {(questionType === 'short' || questionType === 'long') && (
        <ShortLongInput questionType={questionType} />
      )}
      {(questionType === 'optional' || questionType === 'checkbox') && (
        <RadioCheckInput
          id={id}
          options={options}
          questionType={questionType}
        />
      )}
      <View style={styles.cardBottomWrapper}>
        <Text style={styles.essentialText}>필수</Text>
        <Switch
          trackColor={{ false: '#b9b9b9', true: '#e1d8f1' }}
          thumbColor={isEssential ? '#673ab7' : '#fafafa'}
          ios_backgroundColor="#b9b9b9"
          onValueChange={handleEssential}
          value={isEssential}
          style={styles.isEssentialSwitch}
        ></Switch>
        <Pressable onPress={handleModal} style={styles.dotIconWrapper}>
          <Image
            source={require('../../../assets/image/dot-icon.png')}
            style={styles.dotIcon}
          />
        </Pressable>
        <Modal
          animationType="slide"
          transparent={true}
          visible={showModal}
          onRequestClose={() => setShowModal(!showModal)}
        >
          <View style={styles.modalBox}>
            <View style={styles.modal}>
              {ModalData.map((data) => (
                <View key={data.id} style={styles.modalMenuWrap}>
                  {data.value !== 'cancel' ? (
                    <Pressable
                      onPress={() => handleQuestion(data.value)}
                      style={{ flexDirection: 'row' }}
                    >
                      <Image source={data.icon} style={styles.modalMenuIcon} />
                      <Text style={styles.modalMenuLabel}>{data.label}</Text>
                    </Pressable>
                  ) : (
                    <Pressable onPress={() => setShowModal(!showModal)}>
                      <Text
                        style={(styles.modalMenuLabel, { textAlign: 'center' })}
                      >
                        {data.label}
                      </Text>
                    </Pressable>
                  )}
                </View>
              ))}
            </View>
          </View>
        </Modal>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  section: {
    position: 'relative',
    marginTop: 12,
    width: '100%',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#dadce0',
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  dragIconWrapper: {
    width: '100%',
    height: 24,
  },
  dragIcon: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 24,
    height: 24,
  },
  leftBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 6,
    height: '100%',
    backgroundColor: '#4285F4',
  },
  cardCommonWrapper: {
    paddingHorizontal: 30,
    paddingBottom: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
  titleInputWrapper: {
    marginBottom: 8,
    width: '100%',
    height: 64,
    backgroundColor: '#f8f9fa',
    borderBottomWidth: 1,
    borderBottomColor: '#80868b',
  },
  titleInput: {
    padding: 16,
    height: '100%',
    fontSize: 16,
    color: '#202124',
    fontWeight: '400',
    lineHeight: 24,
  },
  ImageIconWrapper: {
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: 48,
    height: 48,
  },
  ImageIcon: {
    width: 24,
    height: 24,
  },
  cardBottomWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
    height: 64,
    borderTopWidth: 1,
    borderTopColor: '#80868b',
  },
  essentialText: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    color: '#202124',
  },
  isEssentialSwitch: {
    marginLeft: 12,
  },
  dotIconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 48,
    height: 48,
  },
  dotIcon: {
    width: 24,
    height: 24,
  },
  modalBox: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modal: {
    width: 168,
    paddingVertical: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  modalMenuWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 48,
  },
  modalMenuIcon: {
    width: 24,
    height: 24,
  },
  modalMenuLabel: {
    paddingHorizontal: 16,
    width: 100,
    fontSize: 16,
    fontWeight: '400',
  },
});

export default SurveyCard;
