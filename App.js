import React from 'react';
import { StyleSheet, View } from 'react-native';
import ProductContainer from './Screens/Products/ProductContainer';
import Header from './Shared/Header';
import { NavigationContainer } from '@react-navigation/native';
import Main from './Navigators/main';
import { NativeBaseProvider } from 'native-base';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import Auth from './Context/store/Auth'
import { Provider } from 'react-redux' //impede our entire app with redux state and then we need to encapulate our entire app inside provider so the state will be managed inside entire app
import store from './Redux/store'
export default function App() {
  //we remove product container and add main of navigation that will redirect us based on component
  return (
    <Auth>
      <Provider store={store}>
        <NavigationContainer>
          <Header />
          <Main />
          <Toast ref={(ref) => Toast.setRef(ref)} />
        </NavigationContainer>
      </Provider>
    </Auth>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});