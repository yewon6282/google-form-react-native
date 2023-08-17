import { Image, Pressable, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { addQuestion } from '../../store/reviewing';

const BottomBar = () => {
  const dispatch = useDispatch();

  const handleQuestion = () => {
    dispatch(addQuestion());
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonListWrapper}>
        <Pressable onPress={handleQuestion} style={styles.ListIconWrapper}>
          <Image
            source={require('../../../assets/image/add-icon.png')}
            style={styles.ListIcon}
          />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 11,
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: 60,
  },
  buttonListWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 358,
    height: '100%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: '#fff',
  },
  ListIconWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 48,
    height: 48,
  },
  ListIcon: {
    width: 24,
    height: 24,
  },
});

export default BottomBar;
