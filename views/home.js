import React, { Component, Fragment } from 'react';
import SearchableDropdown from '../item-name-dropdown';
import {
    Platform, StyleSheet, View, Text,
    Image, TouchableOpacity, Alert, Dimensions, TextInput, KeyboardAvoidingView,ImageBackground
} from 'react-native';


var items = [
    {
        id: 1,
        name: 'JavaScript',
    },
    {
        id: 2,
        name: 'Java',
    },
    {
        id: 3,
        name: 'Ruby',
    },
    {
        id: 4,
        name: 'React Native',
    },
    {
        id: 5,
        name: 'PHP',
    },
    {
        id: 6,
        name: 'Python',
    },
    {
        id: 7,
        name: 'Go',
    },
    {
        id: 8,
        name: 'Swift',
    },
];


export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedItems: [
                {
                    id: 7,
                    name: 'Go',
                },
                {
                    id: 8,
                    name: 'Swift',
                }
            ],
            selectedShops: [

            ]
        }
    }
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
                <SearchableDropdown
                    onItemSelect={(shop) => {
                        console.log("testing")
                        // this.setState({productSelected:false})

                        const items = this.state.selectedShops;
                        items.push(shop)
                        this.setState({newselect:shop.name})
                        this.setState({ selectedShops: items });

                    }}
                    containerStyle={{ padding: 5, width: "75%" }}
                    onRemoveItem={(item, index) => {
                        const items = this.state.selectedItems.filter((sitem) => sitem.id !== item.id);
                        this.setState({ selectedShops: items });
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
                    items={this.state.allProducts}
                    // defaultIndex={2}
                    resetValue={false}
                    textInputProps={
                        {
                            placeholder: this.state.newselect,
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













                {/*item dropdown=========================================================================*/}
                {/* Multi */}
                <SearchableDropdown
                    multi={true}
                    selectedItems={this.state.selectedItems}
                    onItemSelect={(item) => {
                        const items = this.state.selectedItems;
                        items.push(item)
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
                    items={items}
                    defaultIndex={2}
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
                            // onTextChange: text => alert(text)
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
