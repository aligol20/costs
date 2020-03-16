
import { View, Text, Dimensions, SectionList, AlertIOS, TextInput, StyleSheet, Alert, ListView,AsyncStorage, TouchableHighlight } from 'react-native';
import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import TouchID from 'react-native-touch-id';
import moment from 'jalali-moment';

const optionalConfigObject = {
    title: "Authentication Required", // Android
    color: "#e00606", // Android,
    fallbackLabel: "Show Passcode" // iOS (if empty, then label is hidden)
}
export default class HistoryTab extends React.Component {
    constructor(props) {

        super(props);
        this.state = {
            user: '',
            pass: '',
            list: [],
            named:''
        };
        this.props.navigator.setStyle({
            navBarHidden: false, // make the nav bar hidden
        });

        this.getHistory();
    }
    getHistory() {
        fetch('http://koalafruit.ir/api/get_cost_history_header.php')
            .then((response) => response.json())
            .then((responseJsonHeader) => {
                console.log(responseJsonHeader, 'dfdffdfdfdf')
                fetch('http://koalafruit.ir/api/get_cost_history.php')
                    .then((response) => response.json())
                    .then((responseJson) => {
                        let yuy = []
                        for (let r = 0; r < responseJsonHeader.length; r++) {
                            yuy[r] = [];
                        }
                        for (let i = 0; i < responseJsonHeader.length; i++) {
                            let ghoo = responseJson.filter(x => x.persian_date === responseJsonHeader[i].persian_date);

                            yuy[i] = { title: [responseJsonHeader[i]], data: ghoo };
                            console.log(ghoo, 'kdkfjkdfjkdkf')
                            console.log(ghoo, 'kdkfjkdfjkdkf')
                            console.log(yuy[i], 'kdkfjkdfjkdkf7')

                        }
                        console.log(yuy, 'jhjhjjhjhjhjhhhj')
                        this.setState({ list: yuy })


                    });
            });


    }
    render() {
        let width = Dimensions.get('window').width;
        const numberWithCommas = (x) => {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        };

        return (
            <View>

                <SectionList
                    renderItem={({ item, index, section }) =>


                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', borderRadius: 7, borderWidth: 2, borderColor: '#35D699', margin: 3 }}>
                            <View style={{ marginTop: 7, marginBottom: 7, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontFamily: 'B Koodak', color: 'black' }}>{item.cost_description}</Text>
                            </View>
                            <View style={{ width: '15%', justifyContent: 'center', alignItems: 'center' }}>

                                <Text style={{ fontFamily: 'B Koodak', color: 'black' }}>{item.who_paid}</Text>
                            </View>
                            <View style={{ width: '20%', justifyContent: 'center', alignItems: 'center' }}>

                                <Text style={{ fontFamily: 'B Koodak', color: 'black' }}>{item.cost_type}</Text>
                            </View>
                            <View style={{ width: '25%', justifyContent: 'center', alignItems: 'center' }}>

                                <Text style={{ fontFamily: 'B Koodak', color: 'black' }}>{numberWithCommas(parseInt(item.cost_mount)) + 'تومان'}</Text>
                            </View>
                            <View style={{ width: '15%', justifyContent: 'center', alignItems: 'center' }}>

                                <Text style={{ fontFamily: 'B Koodak', color: 'black' }}>{item.time}</Text>
                            </View>




                        </View>



                    }

                    renderSectionHeader={({ section: { title } }) => (
                        <View style={{ alignItems: 'center', backgroundColor: '#8942D6', justifyContent: 'center', flexDirection: 'column' }}>
                        <View style={{width:width,justifyContent:'space-between',flexDirection:'row'}}>
                            <Text style={{
                                margin: 13, color: 'white',textAlign:'left', fontSize: 17, fontFamily: 'B Koodak'
                            }}>{numberWithCommas(parseInt(title[0]['SUM(cost_mount)']))+' تومان'}</Text>

                            <View style={{width:30}}/>
                            <Text style={{
                                margin: 13, color: 'white',textAlign:'left', fontSize: 17, fontFamily: 'B Koodak'
                            }}>{title[0].persian_date}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', width: width,marginBottom:5 }}>
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>

                                    <Text style={styles.instructions}>توضیح</Text>
                                </View>
                                <View style={{ width: '15%', justifyContent: 'center', alignItems: 'center' }}>

                                    <Text style={styles.instructions}>چه کسی؟</Text>
                                </View>
                                <View style={{ width: '20%', justifyContent: 'center', alignItems: 'center' }}>

                                    <Text style={styles.instructions}>نوع</Text>
                                </View>
                                <View style={{ width: '25%', justifyContent: 'center', alignItems: 'center' }}>

                                    <Text style={styles.instructions}>مبلغ</Text>
                                </View>
                                <View style={{ width: '15%', justifyContent: 'center', alignItems: 'center' }}>

                                    <Text style={styles.instructions}>زمان</Text>
                                </View>
                            </View>
                        </View>
                    )}
                    sections={this.state.list}
                    stickySectionHeadersEnabled={true}
                    keyExtractor={(item, index) => item + index}
                />

            </View>



        );

    }

}

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('window').height,
        backgroundColor: '#ffffff',
        flexDirection: 'column',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: 'white',
        fontFamily: 'B Koodak'

    },
    instructions: {
        textAlign: 'center',
        color: 'white',
        fontFamily: 'B Koodak',
    },
});

module.export = HistoryTab;
