import React, { Component, Fragment,useEffect} from 'react';
import ItemDropdown from '../item-name-dropdown';

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


export default class Home extends React.Component {
    // ShowCurrentDate=()=>{
    //
    //     var date = new Date().getDate();
    //     var month = new Date().getMonth() + 1;
    //     var year = new Date().getFullYear();
    //     var hours = new Date().getHours();
    //     var min = new Date().getMinutes();
    //     var sec = new Date().getSeconds();
    //
    //     console.log(this.state.customerName + '-' + this.state.customerContact + '-' + date + '-' + month + '-' + year + ','+hours+':'+min+':'+sec)
    //     // Alert.alert(date + '-' + month + '-' + year);
    //     this.setState({ orderID:this.state.customerName + '-' + this.state.customerContact + '-' + date + '-' + month + '-' + year + ','+hours+':'+min+':'+sec})
    //
    //
    //     console.log(this.state.Quantity)
    //
    //
    // }
    constructor(props) {
        super(props);
        this.state = {
            orderID:'',
            customerName:'1',
            customerContact:'',
            newSelect:'Search by Shop',
            allShops:[],
            allItems:[],
            Quantity:[],
            selectedItems: [
                // {
                //     id: 7,
                //     itemName: 'Go',
                // },
                // {
                //     id: 8,
                //     itemName: 'Swift',
                // }
            ],
            selectedShops: [

            ]
        }
    }
    // ========================
    componentDidMount() {
        this.setState({isLoading: true});

        // fetch('https://healthyfoodssabra.herokuapp.com/api/products')
        fetch('http://192.168.8.100:8080/api/shops')
            .then(response => response.json())
            .then(data => this.setState({allShops: data}));

        // fetch('https://healthyfoodssabra.herokuapp.com/api/products')
        //     fetch('http://192.168.8.100:8080/api/items')
        //     .then(response => response.json())
        //     .then(data => this.setState({allItems: data}));


        // const requestOptions = {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ searchUsername: 'userone'})
        // };
        //
        // fetch('http://192.168.8.100:8080/api/itemforuser',requestOptions)
        //     .then(response => response.json())
        //     .then(data => this.setState({allItems: data, isLoading: false}));

    }


    itemList(){
        // console.log('test')

        // return(
        //
        //     <View><Button title='{testing}'/></View>
        // );

        for(let i=0; i<5; i++){
            return(
                <View><Text>as</Text></View>
                );

        }
    }



// ====================
    render() {


        return (


            <View>
                {/*<View style={{alignItems:"center"}}>*/}
                {/*    <Image style={{*/}
                {/*        width: 200,*/}
                {/*        height: 200*/}
                {/*    }} source={require('../assets/images/logo.png')}/>*/}
                {/*</View>*/}


                {/*shop dropdown=========================================================================*/}
                <ShopDropdown
                    onItemSelect={(shop) => {
                        console.log("testing")
                        // this.setState({productSelected:false})

                        const shops = this.state.selectedShops;
                        items.push(shop)
                        this.setState({ newSelect:shop.username})
                        this.setState({ selectedShops: shops });

                    }}
                    containerStyle={{ padding: 5, width: "75%" }}
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
                                borderColor: '#592828',
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


                <Button title='load' onPress={() =>

                    fetch('http://192.168.8.100:8080/api/itemforuser',{
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ searchUsername: this.state.newSelect})
                    })
                    .then(response => response.json())
                    .then(data => this.setState({allItems: data, isLoading: false}))
                }/>

                {/*item dropdown=========================================================================*/}
                {/* Multi */}
                <ItemDropdown
                    multi={true}
                    selectedItems={this.state.selectedItems}
                    onItemSelect={(item) => {
                        const items = this.state.selectedItems;
                        items.push(item)

                        // console.log(this.state.allItems);
                        this.setState({ selectedItems: items });
                    }}
                    containerStyle={{ padding: 5 }}
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
                                borderColor: '#ccc',
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
                {/*<TextInput*/}
                {/*    onChangeText={(value) => this.setState({customerName: value})}*/}
                {/*    // onChangeText={this.state.customerName}*/}
                {/*    // value={TextInput}*/}
                {/*    placeholder="Enter Your Name"*/}
                {/*/>*/}


                {/*<TextInput*/}
                {/*    onChangeText={(value) => this.setState({customerContact: value})}*/}
                {/*    // onChangeText={this.state.customerName}*/}
                {/*    // value={TextInput}*/}
                {/*    placeholder="Enter Your Contact Number"*/}
                {/*/>*/}
                {/*<Button title='create order id' onPress={*/}
                {/*    this.ShowCurrentDate*/}


                {/*}/>*/}


                {/*<View><Text>{this.state.orderID}</Text></View>*/}

                {/*<View style={{flexDirection:'row'}}>*/}

                {/*    <View style={{width:"50%",margin:5}}>*/}
                {/*        <Text>Item Name</Text>*/}
                {/*    </View>*/}
                {/*    <View style={{width:"50%",margin:5}}>*/}
                {/*        <Text>Quantity</Text>*/}
                {/*    </View>*/}
                {/*</View>*/}

                {/*<View style={{flexDirection:'row'}}>*/}

                {/*    <View style={{width:"50%",margin:5}}>*/}
                {/*        <Text>{this.state.selectedItems.itemName}</Text>*/}
                {/*    </View>*/}
                {/*    <View style={{width:"50%",margin:5}}>*/}
                {/*        <Text>Q</Text>*/}
                {/*    </View>*/}
                {/*</View>*/}




                {/*<View>*/}
                {/*    {this.itemList()}*/}
                {/*</View>*/}


                <Button title='order' onPress={() =>
                    console.log(this.state.selectedItems)
                    //  this.itemList()
                }/>



            </View>




        );
    }
}
