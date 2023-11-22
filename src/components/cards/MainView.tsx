import React from "react";
import {SafeAreaView, ImageBackground, StyleSheet, View} from "react-native";
import {Header} from "../headers/Header";
import {Header2} from "../headers/Header2";
import {useSelector} from "react-redux";
import {RootState} from "@reduxjs/toolkit/query";

interface Props {
    children?: any;
    title?: string;
    noBack?: boolean;
    onPressHeader?: () => void;
    noHeader?: boolean
    settingsNavigation?: () => void;
    noSettingsImage?: boolean
}

export const MainView = (props: Props) => {
    const {children, title, noBack, noSettingsImage, settingsNavigation, onPressHeader} = props

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>

            {props.noHeader == true ? null :
                <Header2 noSettingsImage={noSettingsImage} settingsNavigation={settingsNavigation} title={title}
                         noBack={noBack} navigation={onPressHeader}/>}
            <View style={{flex: 1, paddingHorizontal: 16,paddingBottom:4}}>
                {children}
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'center', // Arka plan resmini kaplamasını sağlar
    }
});
