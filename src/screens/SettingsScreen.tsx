import React, { useEffect, useState } from "react";
import { Alert, FlatList, SafeAreaView, ScrollView, Text, View } from "react-native";
import auth from "@react-native-firebase/auth";
import { CustomInputs } from "../components/inputs/CustomInputs";
import { CustomButton } from "../components/buttons/CustomButton";
import { useNavigation } from "@react-navigation/native";

const SettingsScreen = () => {
  const navigation = useNavigation();
  const [data, setData] = useState("");
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  useEffect(() => {
    getUser();
  }, []);
  const getUser = async () => {
    let userData = await auth().currentUser;
    setName(userData?.displayName);
    setMail(userData?.email);
  };
  const updateUser = () => {
    var user = auth().currentUser;
    console.log(user)
    user?.updateProfile({
      displayName: name
    }).then(()=>Alert.alert('Güncelleme Başarılı')).catch((x)=>Alert.alert(x))
  };
  const check = async () => {
    var user = await auth().currentUser;
    console.log(user);

  };
  const signOut=()=>{
    auth()  .signOut()
    navigation.navigate('Login')
  }
  return (
    <SafeAreaView style={{ margin: 10 }}>
      <ScrollView>
        <View style={{ alignSelf: "center" }}>
          <Text style={{ fontSize: 20 }}>Profil Bilgileriniz</Text>
        </View>
        <CustomInputs placeholder={"Mail Adresiniz"} value={mail} onChange={(x: string) => setMail(x)} disabled={true}/>
        <CustomInputs placeholder={"İsim Ve Soyisim"} value={name} onChange={(x: string) => setName(x)} />
        <CustomButton text={"Güncelle"} onPress={updateUser} />
        <CustomButton text={"Çıkış Yap"} onPress={signOut}  buttonStyle={{backgroundColor:'white'}}/>

      </ScrollView>
    </SafeAreaView>
  );
};
export default SettingsScreen;
