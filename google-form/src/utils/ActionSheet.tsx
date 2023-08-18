import { ActionSheetIOS } from 'react-native';

interface OptionsType {
  options: string[];
  cancelButtonIndex: number;
}

interface ShowActionSheetProps {
  options: OptionsType;
  callback: (buttonIndex: number) => void;
}

const showActionSheet = ({ options, callback }: ShowActionSheetProps) => {
  ActionSheetIOS.showActionSheetWithOptions(options, callback);
};

export default showActionSheet;
