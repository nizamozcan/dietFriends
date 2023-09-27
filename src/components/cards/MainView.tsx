import React from "react";
import {SafeAreaView, ImageBackground, StyleSheet, View} from "react-native";
import {Header} from "../headers/Header";

interface Props {
    children: any;
    title: string;
}

export const MainView = (props: Props) => {
    const {children, title} = props
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#F9EDD9'}}>
            <ImageBackground
                source={require('../../assets/icons/iconLogo.jpg')}
                style={styles.background}
            >
                <Header title={title}/>
                <View style={{flex: 1, padding: 16}}>
                    {children}
                </View>

            </ImageBackground>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover', // Arka plan resmini kaplamasını sağlar
    }
});
