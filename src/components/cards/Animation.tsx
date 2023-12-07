import React from "react";
import {View, Text} from "react-native";
import LottieView from "lottie-react-native";
import Modal from "react-native-modal";

interface Props {
    loading?:boolean
    waitScreen?:boolean
}

export const Animation = (props: Props) => {
    const {loading,waitScreen}=props
    if(loading && waitScreen==false){
        return (
                <Modal isVisible={loading} coverScreen={true} >
                    <View style={{alignItems:'center'}}>
                        <LottieView source={require('../../assets/animation/splashScreen.json')} autoPlay loop
                                    style={{width: 200, height: 200}}/>
                    </View>
                </Modal>
        )
    }
    else if (loading &&waitScreen){
        return (
            <Modal isVisible={loading} coverScreen={true} >
                <View style={{alignItems:'center'}}>
                    <LottieView source={require('../../assets/animation/loadingAnimation.json')} autoPlay loop
                                style={{width: 200, height: 200}}/>
                </View>
            </Modal>
        )
    }

}
