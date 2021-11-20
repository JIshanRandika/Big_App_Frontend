import React, { Component, Fragment,useEffect} from 'react';

import {
    Platform, StyleSheet, View, Text,
    Image, TouchableOpacity, Alert, Dimensions, TextInput, KeyboardAvoidingView, ImageBackground, Button,
} from 'react-native';

export default class TrackOrderView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            customerContact:'',
            orderSecretCode:'',
            orderData:[]
        }
    }
    getOrderDetail=()=>{
        fetch('http://192.168.8.101:8080/api/orderfortracker',{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ customerContact: this.state.customerContact,orderSecretCode:this.state.orderSecretCode})
        })
            .then(response => response.json())
            .then(data => this.setState({orderData: data}))
            .then(data =>console.log(this.state.orderData))
    }

    render() {
        return (
            <View>
                <TextInput
                    onChangeText={(value) => this.setState({customerContact: value})}
                    // onChangeText={this.state.customerName}
                    // value={TextInput}
                    placeholder="Enter Your Contact Number"
                />

                <TextInput
                    onChangeText={(value) => this.setState({orderSecretCode: value})}
                    // onChangeText={this.state.customerName}
                    // value={TextInput}
                    placeholder="Enter a secrete code to track your order"
                />


                <Button title='Check' onPress={
                    this.getOrderDetail
                }/>

                { this.state.orderData.map((item, index) => {
                    return(
                        <View>
                            <Text>{item.orderID}</Text>
                        </View>
                        )

                })}

            </View>
        )
    }
}