import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Spinner, Header } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
   state = { loggedIn: null };

   componentWillMount() {
      firebase.initializeApp({
         apiKey: 'AIzaSyDliew0twyeEpEShYNWrhbKY2FOBQzXNBs',
         authDomain: 'auth-react-1bd34.firebaseapp.com',
         databaseURL: 'https://auth-react-1bd34.firebaseio.com',
         storageBucket: 'auth-react-1bd34.appspot.com',
         messagingSenderId: '392322291477'
      });

      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            this.setState({ loggedIn: true });
         } else {
            this.setState({ loggedIn: false });
         }
      });
   }

   renderContent() {
      switch (this.state.loggedIn) {
         case true:
            return (
               <Card>
                  <CardSection>
                     <Button onPress={() => firebase.auth().signOut()}>
                        Log Out
                     </Button>
                  </CardSection>
               </Card>
            );
         case false:
            return <LoginForm />;
         default:
            return (
               <View style={{ marginTop: 30 }}>
                     <Spinner size="large" />
               </View>
            );
      }
   }

   render() {
      return (
         <View>
            <Header headerText="Authentication" />
            {this.renderContent()}
         </View>
      );
   }
}

export default App;
