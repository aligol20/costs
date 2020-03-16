
import React, {Component} from 'react';
import {View,Text, Dimensions,AlertIOS,TextInput,AsyncStorage, StyleSheet,Alert, ListView,TouchableHighlight} from 'react-native';
import { Navigation } from 'react-native-navigation';
import TouchID from 'react-native-touch-id'
const optionalConfigObject = {
    title: "Authentication Required", // Android
    color: "#e00606", // Android,
    fallbackLabel: "Show Passcode" // iOS (if empty, then label is hidden)
  }
export default class FirstTabScreen extends React.Component {
    constructor(props) {

        super(props);
        this.state = {user: '',
            pass:''
        };
        this.props.navigator.setStyle({
            navBarHidden: true, // make the nav bar hidden
        });
    }
    checkfinger(){

        TouchID.isSupported()
  .then(biometryType => {
    // Success code
    if (biometryType === 'FaceID') {
        console.log('FaceID is supported.');
    } else {
        console.log('TouchID is supported.');
        TouchID.authenticate('to demo this react-native component', optionalConfigObject)
        .then(success => {
        //   alert('Authenticated Successfully');
            this.props.navigator.push({
        screen: 'SecondTab',
        title: '',
        navigatorStyle: {navBarBackgroundColor:'#C5EFF7'}, // override the navigator style for the pushed screen (optional)

    });
        })
        .catch(error => {
          alert('Authentication Failed');
        });
    }
  })
  .catch(error => {
    // Failure code
    console.log(error);
  });
        const optionalConfigObject = {
            title: "Authentication Required", // Android
            color: "#e00606", // Android,
            fallbackLabel: "Show Passcode" // iOS (if empty, then label is hidden)
          }
          
       
    }
    render() {
        AsyncStorage.getItem('name',(err,store)=>{
            if(store !== null){
                TouchID.authenticate('', optionalConfigObject)
                    .then(success => {
                        //   alert('Authenticated Successfully');
                        this.props.navigator.push({
                            screen: 'LightBox',
                            title: '',
                            navigatorStyle: {navBarBackgroundColor:'#C5EFF7'}, // override the navigator style for the pushed screen (optional)

                        });
                    })
                    .catch(error => {
                        alert('Authentication Failed');
                    });
            }else {
                this.checkfinger()
                // this.props.navigator.push({
                //     screen: 'SecondTab',
                //     title: '',
                //     navigatorStyle: {navBarBackgroundColor:'#C5EFF7'}, // override the navigator style for the pushed screen (optional)
                //
                // });
            }

        });

        return (

            <View style={styles.container}>
                
                <TouchableHighlight
                                    underlayColor="white"

                style={{height:43,width:73,borderRadius:7,backgroundColor:'orange',alignItems:'center',justifyContent:'center'}}
                    onPress={()=> this.checkfinger()}>
                <Text style={styles.welcome}>ورود</Text>
                </TouchableHighlight>

            </View>
        );

    }

}

const styles = StyleSheet.create({
    container: {
        height:'100%',
        backgroundColor:'#ffffff',
        flexDirection:'column',
        padding:10,
        justifyContent:'center',
        alignItems:'center'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color:'white',
        fontFamily:'B Koodak'

    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

module.export = FirstTabScreen;
