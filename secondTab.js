import React, { Component } from "react";

import {
  View,
  Text,
  Dimensions,
  TextInput,
  StyleSheet,
  PickerIOS,
  ActionSheetIOS,
  Alert,
  Item,
    Picker,
  AsyncStorage,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator,
  ListView,
  TouchableHighlight,
  Platform
} from "react-native";
import { Navigation } from "react-native-navigation";
import TouchID from "react-native-touch-id";
import moment from "jalali-moment";

export default class SecondTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      pass: "",
      cost_list: [],
      who_paid: "ali",
      mount: 0,
      description: "",
      mojoodi: 0,
      today_cost: 0,
      cost_type: "دسته بندی"
    };
    AsyncStorage.getItem("name", (err, store) => {
      if (store !== null) {
        this.setState({ who_paid: JSON.parse(store) });
      }
    });
    this.props.navigator.setStyle({
      navBarHidden: false // make the nav bar hidden
    });

    fetch("http://koalafruit.ir/api/readCostType.php")
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ cost_list: responseJson });
        console.log(responseJson, "dkfdkfjkdkd");
        let selectedFormat = "jYYYY/jMM/jDD";
        let time = "jYYYY/jMM";

        let rrr = moment().format(selectedFormat);
        let ddd = moment().format(time);

        let pp = { date: rrr, month: ddd, month_: "%" + ddd + "%" };
        console.log(pp, "ffdfdfdfdfdf");
        fetch("http://koalafruit.ir/api/today_cost.php", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(pp)
        })
          .then(response => response.json())
          .then(responseJson => {
            console.log(responseJson[0], "ffdfdfdfdfdf");
            this.setState({
              today_cost: responseJson[0]["IFNULL(SUM(cost_mount),0)"]
            });
            fetch("http://koalafruit.ir/api/mojoodi.php", {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
              },
              body: JSON.stringify(pp)
            })
              .then(response => response.json())
              .then(responseJsonM => {
                console.log(responseJsonM[0], "lklkflflfl");
                this.setState({ mojoodi: responseJsonM[0]["ccc"] });
              });
          });
      });
  }

  sendIt() {
    if ((this.sendIt.cost_type !== "", this.state.mount !== 0)) {
      this.setState({ loading: true });
      let selectedFormat = "jYYYY/jMM/jDD";
      let time = "HH:MM";

      let rrr = moment().format(selectedFormat);
      let ddd = moment().format(time);

      let summery = {
        type: this.state.cost_type,
        mount: this.state.mount,
        description: this.state.description,
        who_paid: this.state.who_paid,
        date: rrr,
        time: ddd
      };
      console.log(summery, "dlfkdlfkldfl");

      fetch("http://koalafruit.ir/api/set_new_cost.php", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(summery)
      }).then(response => {
        console.log(response, "dlfkdlfkldfl");
        this.setState({ mount: 0, loading: false });
        this.desc.clear();
        this.mount.clear();

        alert("با موفقیت ثبت شد");
      });
    } else {
      alert("ورودی های خود را بررسی کنید");
    }
  }

  render() {
      let width = Dimensions.get('window').width;
      let height = Dimensions.get('window').height;
    let options = ["Home", "Savings", "Car", "GirlFriend"];
    let selectedFormat = "jYYYY/jMM/jDD HH:mm";
    let rrr = moment().format(selectedFormat);
    const numberWithCommas = x => {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    if (this.state.loading) {
      return (
        <KeyboardAvoidingView
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(52, 52, 52, 0.5)",
            height: height
          }}
        >
          <View
            style={{
              margin: 3,
              borderRadius: 7,
              height: 0.3 * Dimensions.get("window").width,
              width: 0.3 * Dimensions.get("window").width,
              backgroundColor: "white",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <ActivityIndicator color="#7E07A9" />
          </View>
        </KeyboardAvoidingView>
      );
    }
    return (
      <ScrollView style={{ flex:1, backgroundColor: "#eeeeee" }}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior="padding"
          enabled
        >
          <Text
            style={{ fontFamily: "B Koodak", color: "#8c14fc", marginBottom: 13 }}
          >
            {rrr}
          </Text>
          <View
            style={{
              flexDirection: "column",
              width: width,
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 13
            }}
          >
            <View
              style={{
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    textAlign: "center",
                    color: "#8c14fc",
                    fontSize: 23,
                    fontFamily: "B Koodak"
                  }}
                >
                  {"تومان" + " "}
                </Text>
                <Text style={styles.instructions}>
                  {" " +
                    numberWithCommas(parseInt(this.state.today_cost)) +
                    " "}
                </Text>
                <Text style={styles.instructions2}>
                  {" " + "هزینه های امروز:"}
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    textAlign: "center",
                    color: "#8c14fc",
                    fontSize: 23,
                    fontFamily: "B Koodak"
                  }}
                >
                  {"تومان" + " "}
                </Text>
                <Text style={styles.instructions}>
                  {" " + numberWithCommas(parseInt(this.state.mojoodi)) + " "}
                </Text>
                <Text style={styles.instructions2}>{"موجودی این ماه:"}</Text>
              </View>
            </View>
          </View>
            <View
                style={{
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    height:200,
                    width:100,
                    marginBottom:33
                }}
            >
                <View style={{borderWidth:2,borderColor:'#8c14fc',borderRadius:7}}>
                <Picker
                    mode={"dialog"}
                    selectedValue={this.state.cost_type}
                    color={'red'}
                    style={{height:200,width:200}}
                    itemStyle={{fontFamily:"B Koodak" }}

                    onValueChange={(itemValue, itemIndex) => {
                        console.log(itemValue, "dkfdklfjdlf");
                        this.setState({cost_type:itemValue})


                    }}
                >
                    {this.state.cost_list.map(function (tt) {
                        return(


                            <Picker.Item
                                style={{ color: "red" }}
                                label={tt.type_name}
                                value={tt.type_name}
                                key={parseInt(tt.type_id)}
                            />
                        );
                    })}
                </Picker>
                </View>
            </View>

          <TextInput
            ref={input => {
              this.mount = input;
            }}
            style={{
              marginBottom: 7,
              marginTop: 13,
              backgroundColor: "white",
              borderWidth: 2,
              borderColor: "#FFD340",
              fontFamily: "B Koodak",
              borderRadius: 7,
              height: 40,
              width: "80%",
              alignItems: "center",
              justifyContent: "center"
            }}
            placeholder="مبلغ هزینه شده"
            keyboardType={
              "number-pad"
            }
            onChangeText={text => this.setState({ mount: text })}
          />
          <TextInput
            ref={input => {
              this.desc = input;
            }}
            style={{
              marginBottom: 7,
              marginTop: 13,
              backgroundColor: "white",
              borderWidth: 2,
              borderColor: "#FFD340",
              borderRadius: 7,
              width: "80%",
              height: 40,
              fontFamily: "B Koodak",
              alignItems: "center",
              justifyContent: "center"
            }}
            placeholder="توضیحات"
            onChangeText={text => this.setState({ description: text })}
          />
          <TouchableHighlight
            style={
              this.state.mount !== 0 && this.state.cost_type !== ""
                ? {
                    borderWidth: 0,
                    borderColor: "#FFD340",
                    height: 43,
                    marginTop: 13,
                  marginBottom:13,
                    width: "80%",
                    borderRadius: 7,
                    backgroundColor: "#00b5cc",
                    alignItems: "center",
                    justifyContent: "center"
                  }
                : {
                    borderWidth: 0,
                    borderColor: "#FFD340",
                    height: 43,
                    marginTop: 13,
                      marginBottom:13,
                      width: "80%",
                    borderRadius: 7,
                    backgroundColor: "#BDC3C7",
                    alignItems: "center",
                    justifyContent: "center"
                  }
            }
            underlayColor="white"
            onPress={() => this.sendIt()}
          >
            <View>
              <Text style={styles.welcome}>ثبت هزینه</Text>
            </View>
          </TouchableHighlight>
          <View
            style={{
              flexDirection: "row",
              width: "99%",
              marginTop: 7,
              justifyContent: "space-between"
            }}
          >
            <TouchableHighlight
              underlayColor="#7E07A9"
              onPress={() =>
                this.props.navigator.push({
                  screen: "HistoryTab",
                  title: "",
                  navigatorStyle: { navBarBackgroundColor: "#C5EFF7" } // override the navigator style for the pushed screen (optional)
                })
              }
              style={{
                width: "30%",
                height: 43,
                backgroundColor: "#FFAE00",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 7
              }}
            >
              <View>
                <Text style={{ fontFamily: "B Koodak", color: "black" }}>
                  تاریخچه هزینه ها
                </Text>
              </View>
            </TouchableHighlight>

            <View style={{ width: "30%" }} />
            <TouchableHighlight
              underlayColor="#7E07A9"
              onPress={() =>
                this.props.navigator.push({
                  screen: "NewEarn",
                  title: "",
                  navigatorStyle: { navBarBackgroundColor: "#C5EFF7" } // override the navigator style for the pushed screen (optional)
                })
              }
              style={{
                width: "30%",
                height: 43,
                backgroundColor: "#60D6A9",
                borderRadius: 7,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <View>
                <Text style={{ fontFamily: "B Koodak", color: "black" }}>
                  افزودن درامد
                </Text>
              </View>
            </TouchableHighlight>
          </View>
            <View>
                <TouchableHighlight
                    underlayColor="#7E07A9"
                    onPress={() =>
                        this.props.navigator.push({
                            screen: "Analyse",
                            title: "",
                            navBarHidden : true,
                            navigatorStyle: { navBarBackgroundColor: "#C5EFF7" } // override the navigator style for the pushed screen (optional)
                        })
                    }
                    style={{
                        width: "30%",
                        height: 43,
                        backgroundColor: "#60D6A9",
                        borderRadius: 7,
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                    <Text style={{fontFamily:"B Koodak",color:'black',margin:7}}>analyctics</Text>
                </TouchableHighlight>
            </View>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#eeeeee",
    flexDirection: "column",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    height: Dimensions.get('window').height,
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    color: "black",
    fontFamily: "B Koodak"
  },
  instructions: {
    textAlign: "center",
    color: "#8c14fc",
    fontSize: 23,
    fontFamily: "B Koodak",
    width: "30%"
  },
  instructions2: {
    textAlign: "center",
    color: "#8c14fc",
    fontSize: 23,
    fontFamily: "B Koodak"
  }
});

module.export = SecondTab;
