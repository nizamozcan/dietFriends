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
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
            <ImageBackground
                source={require('../../assets/icons/iconLogo.jpg')}
                style={styles.background}
            >
                <View style={{flex: 1, padding: 16}}>
                    <Header title={title}/>
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
