import {
  ChangeEssentialType,
  ChangeQuestionType,
  ChangeTypeType,
  DeleteOptionType,
  OptionTextType,
  OptionsType,
  QuestionType,
} from '../types/Survey';

const ADDQUESTION = 'ADDQUESTION' as const;
const CHANGEQUESTION = 'CHANGEQUESTION' as const;
const COPYQUESTION = 'COPYQUESTION' as const;
const DELETEQUESTION = 'DELETEQUESTION' as const;
const CHANGETYPE = 'CHANGETYPE' as const;
const CHANGEESSENTIAL = 'CHANGEESSENTIAL' as const;
const ADDOPTION = 'ADDOPTION' as const;
const ADDETCOPTION = 'ADDETCOPTION' as const;
const CHANGEOPTION = 'CHANGEOPTION' as const;
const DELETEOPTION = 'DELETEOPTION' as const;

export const addQuestion = () => ({ type: ADDQUESTION });
export const changeQuestion = ({ id, title }: ChangeQuestionType) => ({
  type: CHANGEQUESTION,
  id,
  title,
});
export const copyQuestion = (id: number) => ({ type: COPYQUESTION, id });
export const deleteQuestion = (id: number) => ({ type: DELETEQUESTION, id });
export const changeType = ({ id, questionType }: ChangeTypeType) => ({
  type: CHANGETYPE,
  id,
  questionType,
});
export const changeEssential = ({ id, isEssential }: ChangeEssentialType) => ({
  type: CHANGEESSENTIAL,
  id,
  isEssential,
});
export const addOption = (id: number) => ({ type: ADDOPTION, id });
export const addETCOption = (id: number) => ({ type: ADDETCOPTION, id });
export const changeOption = ({ id, optionId, text }: OptionTextType) => ({
  type: CHANGEOPTION,
  id,
  optionId,
  text,
});
export const deleteOption = ({ id, optionId }: DeleteOptionType) => ({
  type: DELETEOPTION,
  id,
  optionId,
});

type ReviewingAction =
  | ReturnType<typeof addQuestion>
  | ReturnType<typeof changeQuestion>
  | ReturnType<typeof copyQuestion>
  | ReturnType<typeof deleteQuestion>
  | ReturnType<typeof changeType>
  | ReturnType<typeof changeEssential>
  | ReturnType<typeof addOption>
  | ReturnType<typeof addETCOption>
  | ReturnType<typeof changeOption>
  | ReturnType<typeof deleteOption>;

type ReviewingState = {
  questions: QuestionType[];
};

const initialState: ReviewingState = {
  questions: [{ id: 1, title: '', questionType: 'short', isEssential: false }],
};

function reviewing(
  state: ReviewingState = initialState,
  action: ReviewingAction
) {
  switch (action.type) {
    case ADDQUESTION: {
      const setId =
        state.questions.length > 0
          ? state.questions[state.questions.length - 1].id + 1
          : 1;
      return {
        questions: [
          ...state.questions,
          { id: setId, title: '', questionType: 'short', isEssential: false },
        ],
      };
    }
    case CHANGEQUESTION: {
      const setAnotherQuestion = state.questions.filter(
        (element) => element.id !== action.id
      );
      const setQuestion = {
        ...state.questions.filter((element) => element.id === action.id)[0],
        title: action.title,
      };
      const newObject = [...setAnotherQuestion, setQuestion];
      return {
        questions: newObject.sort((a: QuestionType, b: QuestionType) => {
          return +a.id - +b.id;
        }),
      };
    }
    case COPYQUESTION: {
      const copyTarget = {
        ...state.questions.filter((element) => element.id === action.id)[0],
        id: state.questions[state.questions.length - 1].id + 1,
      };
      const newObject = [...state.questions, copyTarget];
      return {
        questions: newObject,
      };
    }
    case DELETEQUESTION:
      return {
        questions: state.questions.filter(
          (question) => question.id !== action.id
        ),
      };
    case CHANGETYPE: {
      const setAnotherQuestion = state.questions.filter(
        (element) => element.id !== action.id
      );
      let setQuestion;
      if (action.questionType === 'short' || action.questionType === 'long') {
        setQuestion = {
          ...state.questions.filter((element) => element.id === action.id)[0],
          questionType: action.questionType,
        };
      } else {
        setQuestion = {
          ...state.questions.filter((element) => element.id === action.id)[0],
          questionType: action.questionType,
          options: [{ id: 0, value: '' }],
        };
      }
      const newObject = [...setAnotherQuestion, setQuestion];
      return {
        questions: newObject.sort((a: QuestionType, b: QuestionType) => {
          return +a.id - +b.id;
        }),
      };
    }
    case CHANGEESSENTIAL: {
      const setAnotherQuestion = state.questions.filter(
        (element) => element.id !== action.id
      );
      const setQuestion = {
        ...state.questions.filter((element) => element.id === action.id)[0],
        isEssential: action.isEssential,
      };
      const newObject = [...setAnotherQuestion, setQuestion];
      return {
        questions: newObject.sort((a: QuestionType, b: QuestionType) => {
          return +a.id - +b.id;
        }),
      };
    }
    case ADDOPTION: {
      const setAnotherQuestion = state.questions.filter(
        (element) => element.id !== action.id
      );
      const setQuestion = {
        ...state.questions.filter((element) => element.id === action.id)[0],
        options: [
          ...(state.questions[action.id - 1]?.options ?? []),
          {
            id: state.questions[action.id - 1]?.options?.length ?? 0,
            value: null,
          },
        ],
      };
      const newObject = [...setAnotherQuestion, setQuestion];
      return {
        questions: newObject.sort((a: QuestionType, b: QuestionType) => {
          return +a.id - +b.id;
        }),
      };
    }
    case ADDETCOPTION: {
      const setAnotherQuestion = state.questions.filter(
        (element) => element.id !== action.id
      );
      const setQuestion = {
        ...state.questions.filter((element) => element.id === action.id)[0],
        options: [
          ...(state.questions[action.id - 1]?.options ?? []),
          {
            id: state.questions[action.id - 1]?.options?.length ?? 0,
            value: '',
          },
        ],
      };
      const newObject = [...setAnotherQuestion, setQuestion];
      return {
        questions: newObject.sort((a: QuestionType, b: QuestionType) => {
          return +a.id - +b.id;
        }),
      };
    }
    case CHANGEOPTION: {
      const setAnotherQuestion = state.questions.filter(
        (element) => element.id !== action.id
      );
      const setQuestion = state.questions.filter(
        (element) => element.id === action.id
      )[0];
      const setAnotherOption = setQuestion.options?.filter(
        (element) => element.id !== action.optionId
      );
      const setOptions = { id: action.optionId, value: action.text };
      const newOptions = [...(setAnotherOption ?? []), setOptions].sort(
        (a: OptionsType, b: OptionsType) => {
          return +a.id - +b.id;
        }
      );
      const newObject = [
        ...setAnotherQuestion,
        { ...setQuestion, options: newOptions },
      ];
      return {
        questions: newObject.sort((a: QuestionType, b: QuestionType) => {
          return +a.id - +b.id;
        }),
      };
    }
    case DELETEOPTION: {
      const setAnotherQuestion = state.questions.filter(
        (element) => element.id !== action.id
      );
      const setQuestion = {
        ...state.questions.filter((element) => element.id === action.id)[0],
        options: [
          ...(state.questions[action.id - 1]?.options?.filter(
            (option) => option.id !== action.optionId
          ) ?? []),
        ],
      };
      const newObject = [...setAnotherQuestion, setQuestion];
      return {
        questions: newObject.sort((a: QuestionType, b: QuestionType) => {
          return +a.id - +b.id;
        }),
      };
    }
    default:
      return state;
  }
}

export default reviewing;
