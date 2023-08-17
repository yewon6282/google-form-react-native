const SurveyTypeData = [
  {
    id: 0,
    icon: require('../../assets/image/short-text-icon.png'),
    label: '단답형',
    value: 'short',
  },
  {
    id: 1,
    icon: require('../../assets/image/long-text-icon.png'),
    label: '장문형',
    value: 'long',
  },
  {
    id: 2,
    icon: require('../../assets/image/radio-icon.png'),
    label: '객관식 질문',
    value: 'optional',
  },
  {
    id: 3,
    icon: require('../../assets/image/check-icon.png'),
    label: '체크박스',
    value: 'checkbox',
  },
  {
    id: 4,
    icon: '',
    label: '취소',
    value: 'cancel',
  },
];

const ModalData = [
  {
    id: 0,
    icon: require('../../assets/image/copy-icon.png'),
    label: '항목 복제',
    value: 'copy',
  },
  {
    id: 1,
    icon: require('../../assets/image/bin-icon.png'),
    label: '삭제',
    value: 'delete',
  },
  {
    id: 2,
    icon: '',
    label: '취소',
    value: 'cancel',
  },
];

export { SurveyTypeData, ModalData };
