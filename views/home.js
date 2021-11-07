import React, { Component, Fragment } from 'react';
import ItemDropdown from '../item-name-dropdown';

import ShopDropdown from '../shop-name-dropdown';

import {
    Platform, StyleSheet, View, Text,
    Image, TouchableOpacity, Alert, Dimensions, TextInput, KeyboardAvoidingView,ImageBackground
} from 'react-native';


var items = [
    {
        id: 1,
        itemName: 'JavaScript',
    },
    {
        id: 200,
        itemName: 'Java',
    },
    {
        id: 50,
        itemName: 'Ruby',
    },
    {
        id: 10,
        itemName: 'React Native',
    },
    {
        id: 20,
        itemName: 'PHP',
    },
    {
        id: 2,
        itemName: 'Python',
    },
    {
        id: 1,
        itemName: 'Go',
    },
    {
        id: 8,
        itemName: 'Swift',
    },
];


export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newSelect:'Search by Shop',
            allShops:[],
            allItems:[],
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

        fetch('https://healthyfoodssabra.herokuapp.com/api/products')
        // fetch('http://localhost:8080/api/items')
            .then(response => response.json())
            .then(data => this.setState({allShops: data}));

        // fetch('https://healthyfoodssabra.herokuapp.com/api/products')
            fetch('http://192.168.8.101:8080/api/items')
            .then(response => response.json())
            .then(data => this.setState({allItems: data}));


    }





// ====================
    render() {
        return (


            <Fragment>
                <View style={{alignItems:"center"}}>
                    <Image style={{
                        width: 200,
                        height: 200
                    }} source={require('../assets/images/logo.png')}/>
                </View>


                {/*shop dropdown=========================================================================*/}
                {/*<ShopDropdown*/}
                {/*    onItemSelect={(shop) => {*/}
                {/*        console.log("testing")*/}
                {/*        // this.setState({productSelected:false})*/}

                {/*        const shops = this.state.selectedShops;*/}
                {/*        items.push(shop)*/}
                {/*        this.setState({ newSelect:shop.name})*/}
                {/*        this.setState({ selectedShops: shops });*/}

                {/*    }}*/}
                {/*    containerStyle={{ padding: 5, width: "75%" }}*/}
                {/*    onRemoveItem={(shop, index) => {*/}
                {/*        const shops = this.state.selectedItems.filter((sitem) => sitem.id !== shop.id);*/}
                {/*        this.setState({ selectedShops: shops });*/}
                {/*    }}*/}
                {/*    itemStyle={{*/}
                {/*        padding: 10,*/}
                {/*        marginTop: 2,*/}
                {/*        backgroundColor: '#ddd',*/}
                {/*        borderColor: '#bbb',*/}
                {/*        borderWidth: 1,*/}
                {/*        borderRadius: 5,*/}
                {/*    }}*/}
                {/*    itemTextStyle={{ color: '#222' }}*/}
                {/*    itemsContainerStyle={{ maxHeight: 100 }}*/}
                {/*    items={this.state.allShops}*/}
                {/*    // defaultIndex={2}*/}
                {/*    resetValue={false}*/}
                {/*    textInputProps={*/}
                {/*        {*/}
                {/*            placeholder: this.state.newSelect,*/}
                {/*            underlineColorAndroid: "transparent",*/}
                {/*            style: {*/}
                {/*                padding: 12,*/}
                {/*                borderWidth: 1,*/}
                {/*                borderColor: '#592828',*/}
                {/*                borderRadius: 5,*/}
                {/*            },*/}
                {/*            // onTextChange: text => alert(text)*/}
                {/*        }*/}
                {/*    }*/}
                {/*    listProps={*/}
                {/*        {*/}
                {/*            nestedScrollEnabled: true,*/}
                {/*        }*/}
                {/*    }*/}
                {/*/>*/}













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

                        const items = this.state.selectedItems.filter((sitem) => sitem.id !== item.id);
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
                    // items={this.state.allItems}
                    items={items}
                    // defaultIndex={2}
                    chip={true}
                    resetValue={false}
                    textInputProps={
                        {
                            placeholder: "placeholder",
                            underlineColorAndroid: "transparent",
                            style: {
                                padding: 12,
                                borderWidth: 1,
                                borderColor: '#ccc',
                                borderRadius: 5,
                            },

                            onTextChange: text => console.log(this.state.allItems)
                        }
                    }
                    listProps={
                        {
                            nestedScrollEnabled: true,
                        }
                    }
                />


            </Fragment>
        );
    }
}
