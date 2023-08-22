import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Button, SafeAreaView, Alert, FlatList } from "react-native";
import { Colors } from "../assets/colors/Colors";
import Modal from "react-native-modal";
import { CustomInputs } from "../components/inputs/CustomInputs";
import { CustomButton } from "../components/buttons/CustomButton";
import database from "@react-native-firebase/database";
import auth from "@react-native-firebase/auth";
import FormatData from "../Formats/FormatData";

const HomeScreen = (props) => {
  const [data, setData] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [displayName, setDisplayName] = useState("");

  const sendData = async () => {
    const uid = auth().currentUser?.uid;
    const data = {
      title: title,
      value: value,
      uid: uid,
      displayName: displayName,
      date: (new Date()).toISOString()
    };
    const response = await database().ref("/userData").push(data);
    setModalVisible(false);

  };
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    database()
      .ref("/userData")
      .once("value")
      .then(snapshot => {
        const dataFormat = FormatData(snapshot.val());
        setData(dataFormat);
      });
  };
  const createList = () => {
    const user = auth().currentUser?.displayName;
    console.log(user);
    if (user == null || user == "") {
      Alert.alert("Lütfen Önce Ayarlar Bölümünden Adınızı Düzenleyiniz");
    } else {
      setModalVisible(true);
      setDisplayName(user);

    }
  };
  const renderItem = ({ item }) => {
    console.log(item);
    return (
      <TouchableOpacity style={{ minHeight: 300, backgroundColor: "white", borderRadius: 20, margin: 10, padding: 10 }}>
        <Text style={{ alignSelf: "center", fontWeight: "600", flex: 0.2 }}>
          {item.title}
        </Text>
        <View style={{ width: "100%", borderWidth: 0.5 }}></View>
        <Text style={{ flex: 4, marginTop: 10 }}>
          {item.value}
        </Text>
        <Text style={{ flex: 0.5, alignSelf: "flex-end" }}>
          {item.displayName}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "lightBlue" }}>
      <FlatList data={data} renderItem={renderItem} />
      <Modal isVisible={isModalVisible}
             coverScreen={true}
             swipeDirection="left"
             style={{ backgroundColor: Colors.Green, marginTop: 50, borderRadius: 25, padding: 20 }}
      >
        <View style={{ flex: 1 }}>
          <Text style={{ color: "white" }}>Uygulamış olduğunuz diyeti paylaşın</Text>
          <CustomInputs placeholder={"Diyetin Adı"} onChange={(x: string) => setTitle(x)} />
          <CustomInputs placeholder={"Diyetinizi Kısaca Açıklayınız"} multiline={true} inputStyle={{ height: "75%" }}
                        onChange={(x: string) => setValue(x)} />
          <View style={{ flexDirection: "row" }}>
            <CustomButton text={"Kapat"} buttonStyle={{ flex: 1, borderWidth: 2, borderColor: "white" }}
                          onPress={() => setModalVisible(false)} />
            <CustomButton text={"Paylaş"} buttonStyle={{ backgroundColor: "white", flex: 1 }} onPress={sendData} />
          </View>

        </View>
      </Modal>
      <TouchableOpacity style={styles.buttonStyle} onPress={createList}><Text
        style={{ fontSize: 40, fontWeight: "300", alignSelf: "center", color: "white" }}>+</Text></TouchableOpacity>
    </SafeAreaView>
  );
};
export default HomeScreen;
const styles = StyleSheet.create({
  buttonStyle: {
    position: "absolute",
    right: 10,
    bottom: 10,
    backgroundColor: Colors.Green,
    width: 75,
    height: 75,
    justifyContent: "center",
    borderRadius: 75
  }
});
