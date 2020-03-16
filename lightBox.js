
import {View,Text,Linking,AsyncStorage, KeyboardAvoidingView,TouchableOpacity,TextInput, StyleSheet,ActivityIndicator,Alert, renderRow,ListView,TouchableHighlight} from 'react-native';
import React, {Component} from 'react';
import { Navigation } from 'react-native-navigation';
import TouchID from 'react-native-touch-id'
const optionalConfigObject = {
    title: "Authentication Required", // Android
    color: "#e00606", // Android,
    fallbackLabel: "Show Passcode" // iOS (if empty, then label is hidden)
}
export default class LightBox extends Component {

    constructor(props) {

        super(props);

        this.state = {
            loading: false,
            pass:'',
            user_id:'',
            alert:false,
            load:true,
            name:''
        };

    }

    getInfo(){
        if(this.state.name !=='') {
            this.setState({loading: true});
            AsyncStorage.setItem('name', JSON.stringify(this.state.name));
            TouchID.authenticate('', optionalConfigObject)
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
                    this.props.navigator.push({
                        screen: 'FirstTabScreen',
                        title: '',
                        navigatorStyle: {navBarBackgroundColor:'#C5EFF7'}, // override the navigator style for the pushed screen (optional)

                    });
                });

        }else {
            alert('enter name!')
        }
    }
    render() {
        if (this.state.loading) {
            return (
                <View style={{justifyContent:'center',alignItems:'center',backgroundColor:'rgba(52, 52, 52, 0.5)',height:'100%'}}>
                    <View style={this.state.alert ? Alert.alert(
                        '',
                        'ظاهرا خطایی رخ داده،مجددا امتحان کنید',
                        [
                            {text: 'باشه', onPress: () =>
                            this.props.navigator.dismissModal({
                                animationType: 'slide-down' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
                            })
                            }


                        ],
                        {cancelable: false}
                    )
                    :{margin:3,height:'23%',borderRadius:7,backgroundColor:'#52B3D9',width:'97%',justifyContent:'center',flexDirection:'column',alignItems:'center'}}>

                    <ActivityIndicator
                    color = 'white'
                    size= {33}/>
                    </View>
                </View>
            );
        }

        return (
            <KeyboardAvoidingView style={{justifyContent:'center',alignItems:'center',backgroundColor:'rgba(52, 52, 52, 0.5)',height:'100%'}}>

               <View style={{margin:3,borderRadius:7,backgroundColor:'#663399',width:'97%',flexDirection:'column',alignItems:'center'}}>
                   <View style={{justifyContent:'flex-end',flexDirection:'row',alignItems:'flex-end',width:'100%',height:33}}>
                   <TouchableOpacity
                       underlayColor="#00A08A"
                       onPress={() => {
                           Navigation.dismissModal({
                               animationType: 'screen' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
                           });}

                       }>


                       <Text style={{color:'white',marginTop:13,marginRight:7,fontSize:17,        fontFamily:'B Koodak'
                       }}>بستن</Text>

                   </TouchableOpacity>
                   </View>
                   <TextInput
                       style={{        fontFamily:'B Koodak',
                           marginTop:7,marginBottom:7,backgroundColor:'white',borderWidth:2,borderColor:'#F7CA18',borderRadius:7,height:53,width:'50%',alignItems:'center',justifyContent:'center'}}
                       placeholder="یک نام انتخاب کن"
                       onChangeText={(text) => this.setState({name:text})}
                   />
                   <TouchableOpacity
                       underlayColor="#00A08A"
                       style={{marginTop:13,marginBottom:7,borderWidth:0,borderColor:'#22A7F0',backgroundColor:"#F9BF3B",borderRadius:7,width:'50%',alignItems:'center',justifyContent:'center'}}
                   onPress={() => {
                       this.getInfo()                   }

                       }>

                           <Text style={{color:'black',margin:13,        fontFamily:'B Koodak'
                           }}>تایید</Text>
                   </TouchableOpacity>
               </View>
            </KeyboardAvoidingView>



        );

    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'B Koodak',
        backgroundColor: '#00A08A',
    },
    welcome: {
        color:'white',
        fontSize: 20,
        textAlign: 'center',
        margin: 17,
        fontFamily:'B Koodak'


    },
    detailBox:{
        margin:3,
        borderRadius:3,
        height:33,
        flexDirection:'row',
        borderWidth:0,
        alignItems:'center',
        backgroundColor:'#03C9A9',
        justifyContent:'flex-end'

    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
        fontFamily:'B Koodak'

    },
});
module.export = LightBox;