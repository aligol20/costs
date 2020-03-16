import React, {Component} from 'react'
import { View, Text, Dimensions, SectionList, AlertIOS, TextInput, StyleSheet, Alert, ListView,AsyncStorage, TouchableHighlight } from 'react-native';

const chartConfig = {
    backgroundGradientFrom: '#22313f',
    backgroundGradientTo: '#22313f',
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`
}
const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

export default class Analyse extends React.Component {
    constructor(props) {

        super(props);
        this.state = {
            user: '',
            pass: '',
            list: [],
            named:'',
            cost_array:[]
        };
        this.props.navigator.setStyle({
            navBarHidden: false, // make the nav bar hidden
        });

        this.getHistory();
    }
    getHistory() {
        fetch('http://koalafruit.ir/api/analys_cost.php')
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson,'slkdskd')
                let goozoo = 0;
                let c_array=[];
                let r = responseJson.length;
                for (let i=0;i<r;i++){
                    goozoo =goozoo + parseInt(responseJson[i]['SUM(cost_mount)'])
                    console.log(responseJson[i]['SUM(cost_mount)'],'lldlskdlsd'+i)

                }
                for (let i=0;i<r;i++){
                    c_array.push({name:responseJson[i].type_en,percent:parseInt(responseJson[i]['SUM(cost_mount)']),
                        color: "#"+((1<<24)*Math.random()|0).toString(16), legendFontColor: '#7F7F7F', legendFontSize: 15 ,})
                }
                this.setState({sum_cost:goozoo,cost_array:c_array})
                console.log(c_array,'lldlskdlsd')

            })}
    render() {
        const data = [0.4, 0.6, 0.8]

        return(
            <View style={{background:'#22313f',height:screenHeight}}>

            </View>
        )
    }


}


module.export = Analyse;
