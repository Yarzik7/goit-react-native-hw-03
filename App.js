import { useState } from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  useWindowDimensions,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useFonts } from 'expo-font';
import RegistrationScreen from './src/screens/RegistrationScreen';
import LoginScreen from './src/screens/LoginScreen';
import colors from './src/constants/colors';

const backgroundImage = require('./src/assets/background.jpg');

const App = () => {
  const { height } = useWindowDimensions();
  const [activeScreen, setActiveScreen] = useState('signUp');
  const [fontsLoaded] = useFonts({
    'Roboto-Regular': require('./src/assets/fonts/Roboto/Roboto-Regular.ttf'),
    'Roboto-Medium': require('./src/assets/fonts/Roboto/Roboto-Medium.ttf'),
    'Roboto-Bold': require('./src/assets/fonts/Roboto/Roboto-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  const fullHeight = Math.ceil(height + StatusBar.currentHeight ?? 0);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={activeScreen === 'login' ? -208 : -142}
      >
        <ImageBackground
          source={backgroundImage}
          resizeMode="cover"
          imageStyle={{ height: fullHeight }}
          style={styles.backgroundView}
        >
          <View style={[styles.authContainer, activeScreen === 'login' && styles.paddingLogin]}>
            {activeScreen === 'login' ? (
              <LoginScreen activeScreen={activeScreen} setActiveScreen={setActiveScreen} />
            ) : (
              <RegistrationScreen activeScreen={activeScreen} setActiveScreen={setActiveScreen} />
            )}
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  authContainer: {
    paddingHorizontal: 16,
    paddingBottom: 45,
    alignItems: 'center',
    backgroundColor: colors.white,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  backgroundView: {
    height: '100%',
    justifyContent: 'flex-end'
  },
  paddingLogin: {
    paddingBottom: 111,
  },
});

export default App;
