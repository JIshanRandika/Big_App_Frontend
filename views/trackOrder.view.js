import React, { Component, Fragment,useEffect} from 'react';

import {
    Platform,
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    Alert,
    Dimensions,
    TextInput,
    KeyboardAvoidingView,
    ImageBackground,
    Button,
    ScrollView,
    SafeAreaView,
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
    async remove(id) {
        await fetch(`http://192.168.8.101:8080/api/order/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            this.getOrderDetail
            console.log("Remove Done!");
            let updatedItems = [...this.state.items].filter(i => i._id !== id);
            this.setState({items: updatedItems});

        });
    }

    render() {
        return (
            <View>
                <View style={{alignItems:'center'}}>
                    <View style={{flexDirection: 'row',alignItems:'center'}}>

                        <Image style={{
                            width: 50,
                            height: 50
                        }} source={require('../assets/images/logo.png')}/>
                        <Image style={{
                            width: 50,
                            height: 50
                        }} source={require('../assets/images/logo.png')}/>
                        <Image style={{
                            width: 50,
                            height: 50
                        }} source={require('../assets/images/logo.png')}/>
                        <Image style={{
                            width: 50,
                            height: 50
                        }} source={require('../assets/images/logo.png')}/>
                        <Image style={{
                            width: 50,
                            height: 50
                        }} source={require('../assets/images/logo.png')}/>
                        <Image style={{
                            width: 50,
                            height: 50
                        }} source={require('../assets/images/logo.png')}/>
                        <Image style={{
                            width: 50,
                            height: 50
                        }} source={require('../assets/images/logo.png')}/>
                        <Image style={{
                            width: 50,
                            height: 50
                        }} source={require('../assets/images/logo.png')}/>

                    </View>

                </View>
            <View style={{alignItems:'center'}}>
                <View style={{width:350}}>
                    <TextInput
                        style={{
                            marginVertical:5,
                            padding: 12,
                            borderWidth: 1,
                            borderColor: '#2892D7',
                            borderRadius: 5,}}

                        onChangeText={(value) => this.setState({customerContact: value})}
                        // onChangeText={this.state.customerName}
                        // value={TextInput}
                        placeholder="Enter Your Contact Number"
                    />
                </View>

                <View style={{width:350}}>
                <TextInput
                    style={{
                        marginVertical:5,
                        padding: 12,
                        borderWidth: 1,
                        borderColor: '#2892D7',
                        borderRadius: 5,}}

                    onChangeText={(value) => this.setState({orderSecretCode: value})}
                    // onChangeText={this.state.customerName}
                    // value={TextInput}
                    placeholder="Enter a secrete code to track your order"
                />
                </View>
            </View>
                <View style={{marginHorizontal:28,marginVertical:10}}>
                    <Button title='Check' onPress={
                        this.getOrderDetail
                    }/>
                </View>
                <SafeAreaView style={{height:"65%"}}>
                    <ScrollView>

                        { this.state.orderData.map((item, index) => {
                            return(
                                <View style={{alignItems:'center'}}>
                                    <View
                                        style={{
                                            backgroundColor:'#dedede',
                                            width:350,
                                            marginVertical:5,
                                            borderRadius:5,
                                            padding:10
                                        }}>
                                        <View>
                                            {/*<Text style={{fontWeight:'bold'}}>{item.orderID}</Text>*/}
                                            <Text style={{fontWeight:'bold',fontSize:14}}>Order ID:</Text>
                                            <View style={{alignItems:'center'}}>
                                                <Text style={{fontWeight:'bold',color:'#173753'}}>{item.orderID}</Text>
                                            </View>
                                            <Text style={{fontWeight:'bold',fontSize:14}}>Shop Name:</Text>
                                            <View style={{alignItems:'center'}}>
                                                <Text style={{fontWeight:'bold',color:'#173753'}}>{item.shopName}</Text>
                                            </View>
                                            <Text style={{fontWeight:'bold',fontSize:14}}>Ordered Items:</Text>
                                            <View>
                                                <SafeAreaView style={{height:40}}>
                                                    <ScrollView>
                                                        <View style={{alignItems:'center'}}>
                                                            { item.itemAndQuantity.map((item, key)=>(
                                                                <Text style={{fontWeight:'bold',color:'#173753'}} key={key} > { item } </Text>)
                                                            )}
                                                        </View>
                                                    </ScrollView>
                                                </SafeAreaView>
                                            </View>
                                            <Text style={{fontWeight:'bold',fontSize:14}}>Status:</Text>
                                            {item.acceptStatus==='waiting' && (
                                                <View>
                                                    <View
                                                        style={{
                                                            backgroundColor:'#39ba00',
                                                            marginVertical:5,
                                                            borderRadius:5,
                                                            padding:10,
                                                            alignItems:'center',
                                                        }}
                                                    >
                                                        <Text style={{color:'white', fontWeight:'bold'}}>Waiting</Text>
                                                    </View>
                                                    <Button
                                                        color='red'
                                                        onPress={() => this.remove(item._id) & this.getOrderDetail}
                                                        title="Delete"
                                                    />
                                                </View>

                                            )}
                                            {(item.acceptStatus==='done'&& item.readyStatus==='waiting') && (
                                                <View>
                                                    <View
                                                        style={{
                                                            backgroundColor:'#ffc800',
                                                            marginVertical:5,
                                                            borderRadius:5,
                                                            padding:10,
                                                            alignItems:'center',
                                                        }}
                                                    >
                                                        <Text style={{color:'white', fontWeight:'bold'}}>Accepted</Text>
                                                    </View>

                                                </View>

                                            )}
                                            {(item.readyStatus==='done'&& item.completeStatus==='waiting') && (
                                                <View>
                                                    <View
                                                        style={{
                                                            backgroundColor:'#00ffb8',
                                                            marginVertical:5,
                                                            borderRadius:5,
                                                            padding:10,
                                                            alignItems:'center',
                                                        }}
                                                    >
                                                        <Text style={{color:'white', fontWeight:'bold'}}>Ready</Text>
                                                    </View>

                                                </View>

                                            )}

                                            {(item.completeStatus==='done') && (
                                                <View>
                                                    <View
                                                        style={{
                                                            backgroundColor:'#0004ff',
                                                            marginVertical:5,
                                                            borderRadius:5,
                                                            padding:10,
                                                            alignItems:'center',
                                                        }}
                                                    >
                                                        <Text style={{color:'white', fontWeight:'bold'}}>Completed</Text>
                                                    </View>
                                                    <Button
                                                        color='red'
                                                        onPress={() => this.remove(item._id) & this.getOrderDetail}
                                                        title="Delete"
                                                    />
                                                </View>

                                            )}

                                        </View>
                                    </View>
                                </View>
                            )

                        })}
                    </ScrollView>
                </SafeAreaView>






            </View>
        )
    }
}