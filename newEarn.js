
import {View,Text,Linking,AsyncStorage, KeyboardAvoidingView,TouchableOpacity,TextInput, StyleSheet,ActivityIndicator,Alert, renderRow,ListView,TouchableHighlight} from 'react-native';
import React, {Component} from 'react';
import { Navigation } from 'react-native-navigation';
import moment from 'jalali-moment';
import TouchID from 'react-native-touch-id'
const optionalConfigObject = {
    title: "Authentication Required", // Android
    color: "#e00606", // Android,
    fallbackLabel: "Show Passcode" // iOS (if empty, then label is hidden)
}
export default class NewEarn extends Component {

    constructor(props) {

        super(props);

        this.state = {
            loading: false,
            pass:'',
            user_id:'',
            alert:false,
            load:true,
            name:'',
            mount:0
        };

    }

    getInfo(){
        let time = "jYYYY/jMM";

        let ddd = moment().format(time);
        let pp={mount:parseInt(this.state.mount),source:this.state.source,date:ddd};
        console.log(pp,'dddddlldldlldld');

        fetch('http://koalafruit.com/api/new_earn.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(pp)
        }).then((response)  => {
            console.log(response,'dddddlldldlldld');
                Navigation.dismissModal({
                    animationType: 'screen' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
                });
            this.props.navigator.push({
                screen: 'SecondTab',
                title: '',
                navigatorStyle: {navBarBackgroundColor:'#C5EFF7'}, // override the navigator style for the pushed screen (optional)

            });
            });
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
            <View style={{justifyContent:'center',alignItems:'center',backgroundColor:'rgba(52, 52, 52, 0.5)',height:'100%'}}>

               <View style={{margin:3,borderRadius:7,backgroundColor:'#663399',width:'97%',flexDirection:'column',alignItems:'center'}}>

                   <TextInput
                       style={{        fontFamily:'B Koodak',
                           marginTop:7,marginBottom:7,backgroundColor:'white',borderWidth:2,borderColor:'#F7CA18',borderRadius:7,height:53,width:'50%',alignItems:'center',justifyContent:'center'}}
                       placeholder="درامد"
                       keyboardType="number-pad"
                       onChangeText={(text) => this.setState({mount:text})}
                   />
                   <TextInput
                       style={{        fontFamily:'B Koodak',
                           marginTop:7,marginBottom:7,backgroundColor:'white',borderWidth:2,borderColor:'#F7CA18',borderRadius:7,height:53,width:'50%',alignItems:'center',justifyContent:'center'}}
                       placeholder="منبع"
                       onChangeText={(text) => this.setState({source:text})}
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
            </View>



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
module.export = NewEarn;