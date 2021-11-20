import React, { Component, Fragment,useEffect} from 'react';

import {
    Platform, StyleSheet, View, Text,
    Image, TouchableOpacity, Alert, Dimensions, TextInput, KeyboardAvoidingView, ImageBackground, Button,
} from 'react-native';

function HomeView({navigation}) {
        return (
            <View>
                <View style={{alignItems:"center"}}>
                    <Image style={{
                        width: 300,
                        height: 300
                    }} source={require('../assets/images/logo.png')}/>
                </View>

                <View style={{margin:20}}>
                    <View style={{marginVertical:20}}>
                        <Button
                            color='#2892D7'
                            onPress={() => navigation.navigate('Order Creator')}
                            title="New order >>>>>>>>>>>>>>>>>>>"
                        />
                    </View>

                    <View style={{marginVertical:20}}>
                        <Button
                            color='#173753'
                            onPress={() => navigation.navigate('Order Tracker')}
                            title="<<<<<<<<<< Track your orders"
                        />
                    </View>
                </View>

            </View>
        )
}




export default HomeView;