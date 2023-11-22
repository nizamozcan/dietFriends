import React from "react";
import {View, Text} from "react-native";
import LottieView from "lottie-react-native";
import Modal from "react-native-modal";

interface Props {
    loading?:boolean
    isVisible?:boolean
}

export const Animation = (props: Props) => {
    const {loading,isVisible}=props
    if(loading){
        return (
                <Modal isVisible={isVisible} coverScreen={true} >
                    <View style={{alignItems:'center'}}>
                        <LottieView source={require('../../assets/animation/splashScreen.json')} autoPlay loop
                                    style={{width: 200, height: 200}}/>
                    </View>
                </Modal>
        )
    }

}
