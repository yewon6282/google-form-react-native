import { ImageSourcePropType } from 'react-native';

export type SurveyTypeDataType = {
  id: number;
  icon: ImageSourcePropType;
  label: string;
  value: string;
};

export type QuestionSort = short | long | option | check;

export interface OptionsType {
  id: number;
  value: string | null;
}

export interface QuestionType {
  id: number;
  title: string | null;
  options?: OptionsType[];
  questionType: QuestionSort;
  isEssential: boolean;
}

export interface ChangeQuestionType {
  id: number;
  title: string | null;
}

export interface ChangeTypeType {
  id: number;
  questionType: QuestionSort;
}

export interface ChangeEssentialType {
  id: number;
  isEssential: boolean;
}

export interface QuestionMenuType {
  id: number;
  value: QuestionSort;
  label: string;
}

export interface DeleteOptionType {
  id: number;
  optionId: number;
}

export interface OptionTextType {
  id: number;
  optionId: number;
  text: string | null;
}
