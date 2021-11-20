import React, { Component, Fragment,useEffect} from 'react';
import ItemDropdown from '../item-name-dropdown';
import * as Progress from 'react-native-progress';
import ShopDropdown from '../shop-name-dropdown';

import {
    Platform, StyleSheet, View, Text,
    Image, TouchableOpacity, Alert, Dimensions, TextInput, KeyboardAvoidingView, ImageBackground, Button,
} from 'react-native';


var items = [
    {
        id: "1",
        itemName: 'JavaScript',
    },
    {
        id: "200",
        itemName: 'Java',
    },
    {
        id: "50",
        itemName: 'Ruby',
    },
    {
        id: "10",
        itemName: 'React Native',
    },
    {
        id: "20",
        itemName: 'PHP',
    },
    {
        id: "2",
        itemName: 'Python',
    },
    {
        id: "1",
        itemName: 'Go',
    },
    {
        id: "8",
        itemName: 'Swift',
    },
];


export default class CreatOrderView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            orderID:'',
            customerName:'1',
            customerContact:'',
            newSelect:'Select a shop',
            allShops:[],
            allItems:[],
            Quantity:[],
            isLoading:true,
            selectedItems: [

            ],
            selectedShops: [

            ]
        }
    }



    // ========================
    componentDidMount() {



        fetch('https://bigdealershipbackend.herokuapp.com/api/shops')
            .then(response => response.json())
            .then(data => this.setState({allShops: data}))
            .then(()=>this.setState({isLoading:false}));



    }


    itemList(){


        for(let i=0; i<5; i++){
            return(
                <View><Text>as</Text></View>
                );

        }
    }



// ====================
    render() {


        return (

            <KeyboardAvoidingView>
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
                    {this.state.isLoading && (
                        <View>
                            <View>
                                <Progress.CircleSnail color={['red', 'green', 'blue']} />
                            </View>
                            <View style={{marginTop:10}}>
                                <Text>Loading...</Text>
                            </View>
                        </View>


                    )}
                {/*shop dropdown=========================================================================*/}
                    {!this.state.isLoading && (
                <ShopDropdown
                    onItemSelect={(shop) => {
                        console.log("testing")
                        // this.setState({productSelected:false})

                        const shops = this.state.selectedShops;
                        items.push(shop)
                        this.setState({ newSelect:shop.username})
                        this.setState({ selectedShops: shops });

                        fetch('https://bigdealershipbackend.herokuapp.com/api/availableitemforuser',{
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ searchUsername: this.state.newSelect})
                        })
                            .then(response => response.json())
                            .then(data => this.setState({allItems: data, isLoading: false}))

                    }}
                    containerStyle={{ padding: 5, width: 350 }}
                    onRemoveItem={(shop, index) => {
                        const shops = this.state.selectedItems.filter((sitem) => sitem.id !== shop.id);
                        this.setState({ selectedShops: shops });
                    }}
                    itemStyle={{
                        padding: 10,
                        marginTop: 2,
                        backgroundColor: '#ddd',
                        borderColor: '#bbb',
                        borderWidth: 1,
                        borderRadius: 5,
                    }}
                    itemTextStyle={{ color: '#222' }}
                    itemsContainerStyle={{ maxHeight: 100 }}
                    items={this.state.allShops}
                    // defaultIndex={2}
                    resetValue={false}
                    textInputProps={
                        {
                            placeholder: this.state.newSelect,
                            underlineColorAndroid: "transparent",
                            style: {

                                padding: 12,
                                borderWidth: 1,
                                borderColor: '#3d3d3d',
                                borderRadius: 5,
                            },
                            // onTextChange: text => alert(text)
                        }
                    }
                    listProps={
                        {
                            nestedScrollEnabled: true,
                        }
                    }
                />
                    )}
                </View>


                {/*item dropdown=========================================================================*/}
                {/* Multi */}
                <View style={{alignItems:'center'}}>
                <ItemDropdown
                    multi={true}
                    selectedItems={this.state.selectedItems}
                    onItemSelect={(item) => {
                        const items = this.state.selectedItems;
                        items.push(item)

                        // console.log(this.state.allItems);
                        this.setState({ selectedItems: items });
                    }}
                    containerStyle={{ padding: 5, width: 350 }}
                    onRemoveItem={(item, index) => {

                        const items = this.state.selectedItems.filter((sitem) => sitem._id !== item._id);
                        this.setState({ selectedItems: items });
                    }}
                    itemStyle={{
                        padding: 10,
                        marginTop: 2,
                        backgroundColor: '#ddd',
                        borderColor: '#bbb',
                        borderWidth: 1,
                        borderRadius: 5,
                    }}
                    itemTextStyle={{ color: '#222' }}
                    itemsContainerStyle={{ maxHeight: 140 }}
                    items={this.state.allItems}
                    // items={items}
                    // defaultIndex={2}
                    chip={true}
                    resetValue={false}
                    textInputProps={
                        {
                            placeholder: "Select your items",
                            underlineColorAndroid: "transparent",
                            style: {
                                padding: 12,
                                borderWidth: 1,
                                borderColor: '#2892D7',
                                borderRadius: 5,
                            },

                            // onTextChange: text => console.log(this.state.allItems)
                        }
                    }
                    listProps={
                        {
                            nestedScrollEnabled: true,
                        }
                    }
                />
                </View>







            </View>

            </KeyboardAvoidingView>


        );
    }
}
