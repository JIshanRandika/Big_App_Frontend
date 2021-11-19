import React, { Component } from 'react';
import {
  Text,
  FlatList,
  TextInput,
  View,
  TouchableOpacity,
  Keyboard, Button
} from 'react-native';

const defaultItemValue = {
  itemName: '', _id: 0
};


var itemAndQuantityList = []

export default class SearchableDropDown extends Component {
  createOrderID=()=>{

    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var hours = new Date().getHours();
    var min = new Date().getMinutes();
    var sec = new Date().getSeconds();

    console.log(this.state.customerName + '-' + this.state.customerContact + '-' + date + '-' + month + '-' + year + ','+hours+':'+min+':'+sec)
    // Alert.alert(date + '-' + month + '-' + year);
    this.setState({ orderID:this.state.customerName + '-' + this.state.customerContact + '-' + date + '-' + month + '-' + year + ','+hours+':'+min+':'+sec})

  }
  constructor(props) {
    super(props);
    this.renderTextInput = this.renderTextInput.bind(this);
    this.renderFlatList = this.renderFlatList.bind(this);
    this.searchedItems = this.searchedItems.bind(this);
    this.renderItems = this.renderItems.bind(this);
    this.state = {
      selectedshopname:'a',
      orderID:'',
      customerName:'1',
      customerContact:'',
      item: {},
      listItems: [],
      focus: false
    };
  }
  submitOrder=()=>{
    const {order} = this.state;
    let items = this.props.items;
    console.log('as-'+this.state.selectedshopname)
    for(let i=0; i<itemAndQuantityList.length; i++){
      fetch('http://192.168.8.101:8080/api/order', {
      method:'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({
        orderID:this.state.orderID,
        shopName:this.state.selectedshopname,
        itemAndQuantity:itemAndQuantityList[i],
        acceptStatus:'waiting',
        completeStatus:'waiting'

      }),
    });


  }}




  renderFlatList = () => {
    if (this.state.focus) {
      const flatListPorps = { ...this.props.listProps };
      const oldSupport = [
        { key: 'keyboardShouldPersistTaps', val: 'always' },
        { key: 'nestedScrollEnabled', val : false },
        { key: 'style', val : { ...this.props.itemsContainerStyle } },
        { key: 'data', val : this.state.listItems },
        { key: 'keyExtractor', val : (item, index) => index.toString() },
        { key: 'renderItem', val : ({ item, index }) => this.renderItems(item, index) },
      ];
      oldSupport.forEach((kv) => {
        if(!Object.keys(flatListPorps).includes(kv.key)) {
          flatListPorps[kv.key] = kv.val;
        } else {
          if(kv.key === 'style') {
            flatListPorps['style'] = kv.val;
          }
        }
      });
      return (
        <FlatList
          { ...flatListPorps }
        />
      );
    }
  };

  componentDidMount = () => {

    const listItems = this.props.items;
// console.log(listItems)
    // const selectedshopname=this.props.newSelect

    const defaultIndex = this.props.defaultIndex;
    // this.setState({selectedshopname:selectedshopname})
    if (defaultIndex && listItems.length > defaultIndex) {
      this.setState({
        listItems,
        item: listItems[defaultIndex]
      });
    } else {
      this.setState({ listItems });
    }
  };

  searchedItems = searchedText => {
    let setSort = this.props.setSort;
    if (!setSort && typeof setSort !== 'function') {
        setSort = (item, searchedText) => {
          return item.itemName.toLowerCase().indexOf(searchedText.toLowerCase()) > -1
        };
    }
    var ac = this.props.items.filter((item) => {
      return setSort(item, searchedText);
    });
    let item = {
      _id: -1,
      itemName: searchedText,
      username:searchedText
    };
    this.setState({ listItems: ac, item: item });
    const onTextChange = this.props.onTextChange || this.props.textInputProps.onTextChange || this.props.onChangeText || this.props.textInputProps.onChangeText;
    if (onTextChange && typeof onTextChange === 'function') {
      setTimeout(() => {
        onTextChange(searchedText);
      }, 0);
    }
  };

  renderItems = (item, index) => {
    if(this.props.multi && this.props.selectedItems && this.props.selectedItems.length > 0) {
      return (
          this.props.selectedItems.find(sitem => sitem._id === item._id)
          ?
          <TouchableOpacity style={{ ...this.props.itemStyle, flex: 1, flexDirection: 'row' }}>
            <View style={{ flex: 0.9, flexDirection: 'row', alignItems: 'flex-start' }}>
              <Text>{ item.itemName }</Text>
            </View>
            <View style={{ flex: 0.1, flexDirection: 'row', alignItems: 'flex-end' }}>
              <TouchableOpacity onPress={() => setTimeout(() => { this.props.onRemoveItem(item, index) }, 0) } style={{ backgroundColor: '#f16d6b', alignItems: 'center', justifyContent: 'center', width: 25, height: 25, borderRadius: 100, marginLeft: 10}}>
                <Text>X</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
         :
          <TouchableOpacity
          onPress={() => {
            this.setState({ item: item });
            setTimeout(() => {
              this.props.onItemSelect(item);
            }, 0);
          }}
          style={{ ...this.props.itemStyle, flex: 1, flexDirection: 'row' }}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-start' }}>
              <Text>{ item.itemName }</Text>
            </View>
          </TouchableOpacity>
      )
    } else {
      return (
        <TouchableOpacity
          style={{ ...this.props.itemStyle }}
          onPress={() => {
            this.setState({ item: item, focus: false });
            Keyboard.dismiss();
            setTimeout(() => {
              this.props.onItemSelect(item);
              if (this.props.resetValue) {
                this.setState({ focus: true, item: defaultItemValue });
                this.input.focus();
              }
            }, 0);
          }}
        >
          {
            this.props.selectedItems && this.props.selectedItems.length > 0 && this.props.selectedItems.find(x => x._id === item._id)
            ?
              <Text style={{ ...this.props.itemTextStyle }}>{item.itemName}</Text>
            :
              <Text style={{ ...this.props.itemTextStyle }}>{item.itemName}</Text>
          }
        </TouchableOpacity>
      );
    }
  };

  renderListType = () => {
    return this.renderFlatList();
  };

  renderTextInput = () => {
    const textInputProps = { ...this.props.textInputProps };
    const oldSupport = [
      { key: 'ref', val: e => (this.input = e) },
      { key: 'onTextChange', val: (text) => { this.searchedItems(text) } },
      { key: 'underlineColorAndroid', val: this.props.underlineColorAndroid },
      {
        key: 'onFocus',
        val: () => {
          this.props.onFocus && this.props.onFocus()
          this.setState({
            focus: true,
            item: defaultItemValue,
            listItems: this.props.items
          });
        }
      },
      {
        key: 'onBlur',
        val: () => {
          this.props.onBlur && this.props.onBlur(this);
          this.setState({ focus: false, item: this.props.selectedItems });
        }
      },
      {
        key: 'value',
        val: this.state.item ? this.state.item.itemName : ''
      },
      {
        key: 'style',
        val: { ...this.props.textInputStyle }
      },
      {
        key: 'placeholderTextColor',
        val: this.props.placeholderTextColor
      },
      {
        key: 'placeholder',
        val: this.props.placeholder
      }
    ];
    oldSupport.forEach((kv) => {
      if(!Object.keys(textInputProps).includes(kv.key)) {
        if(kv.key === 'onTextChange' || kv.key === 'onChangeText') {
          textInputProps['onChangeText'] = kv.val;
        } else {
          textInputProps[kv.key] = kv.val;
        }
      } else {
        if(kv.key === 'onTextChange' || kv.key === 'onChangeText') {
          textInputProps['onChangeText'] = kv.val;
        }
      }
    });
    return (
      <TextInput
      { ...textInputProps }
      onBlur={(e) => {
        if (this.props.onBlur) {
          this.props.onBlur(e);
        }
        if (this.props.textInputProps && this.props.textInputProps.onBlur) {
          this.props.textInputProps.onBlur(e);
        }
        this.setState({ focus: false, item: this.props.selectedItems });
      }
      }
      />
    )
  }


  // async handleSubmit(event) {
  //   event.preventDefault();
  //   const {order} = this.state;
  //
  //   await fetch('http://192.168.8.100:8080/api/order', {
  //     method:'POST',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(order),
  //   });
  //   // this.props.history.push('/profile');
  // }



  render = () => {
    return (
      <View
        keyboardShouldPersist="always"
        style={{ ...this.props.containerStyle }}
      >

        { this.renderTextInput() }
        {this.renderListType()}
        { this.renderSelectedItems() }


        {/*<Button title="Qtest" onPress={() =>*/}
        {/*    console.log(quantityList)*/}
        {/*}*/}
        {/*/>*/}
        <View>
          {/*<Text>{quantityList}</Text>*/}
          { itemAndQuantityList.map((item, key)=>(
              <Text key={key} > { item } </Text>)
          )}
        </View>

        {/*<View><Text></Text></View>*/}
        <TextInput
            onChangeText={(value) => this.setState({customerName: value})}
            // onChangeText={this.state.customerName}
            // value={TextInput}
            placeholder="Enter Your Name"
        />


        <TextInput
            onChangeText={(value) => this.setState({customerContact: value})}
            // onChangeText={this.state.customerName}
            // value={TextInput}
            placeholder="Enter Your Contact Number"
        />
        <Button title='create order id' onPress={
          this.createOrderID
        }/>
        <View><Text>{this.state.orderID}</Text></View>


        <Button type="submit" color='blue' title='Confirm order'

                onPress={
                  this.submitOrder
                }
        />
        {/*<Button type="submit" color='blue' title='Confirm order'/>*/}
      </View>





    );

  };

  printAitem(){

  }

  renderSelectedItems(){
    var quantity='0';
    var tester='';
    let items = this.props.selectedItems || [];
    if(items !== undefined && items.length > 0 && this.props.chip && this.props.multi){
     return <View style={{flexDirection: 'row',  flexWrap: 'wrap', paddingBottom: 10, marginTop: 5 }}>
                 { items.map((item, index) => {


                     return (

                         <View key={index} style={{
                                 // width: (item.itemName.length * 8) + 60,
                                 justifyContent: 'center',
                              width:'100%',
                                 flex: 0,
                                 backgroundColor: '#eee',
                                 flexDirection: 'row',
                                 alignItems: 'center',
                                 margin: 5,
                                 padding: 8,
                                 borderRadius: 15,
                             }}>
                             <Text style={{ color: '#555',width:'30%' }}>{item.itemName}</Text>
                           <TextInput
                               style={{borderWidth: 1}}
                               onChangeText={(value) => quantity=value}
                               // onTouchStart={quantity=''}
                               // onContentSizeChange={(value) =>{
                               //   quantityList.push(value)
                               // }}
                               // onEndEditing={text => quantityList.push(text)}
                               // onEndEditing={(value) =>{
                               //   quantityList.push(value)
                               // }
                               // }

                               placeholder="Enter Quantity"
                           />


                           <Button
                               title='delete'
                               onPress={() => setTimeout(() => { this.props.onRemoveItem(item, index) }, 0) }
                               color='red'
                                   />

                             {/*<TouchableOpacity onPress={() => setTimeout(() => { this.props.onRemoveItem(item, index) }, 0) } style={{ backgroundColor: '#f16d6b', alignItems: 'center', justifyContent: 'center', width: 25, height: 25, borderRadius: 100, marginLeft: 10}}>*/}
                             {/*    <Text>X</Text>*/}
                             {/*</TouchableOpacity>*/}
                           {/*<View>*/}

                           {/*<TouchableOpacity disabled={a} onPress={() => a=true}>*/}
                           {/*  <Text>set</Text>*/}
                           {/*</TouchableOpacity>*/}

                             {/*<Button*/}

                             {/*    title='test'*/}
                             {/*    onPress={() =>*/}
                             {/*    quantity=''*/}

                             {/*     }*/}
                             {/*/>*/}

                           <Button

                               title='Add to List'
                               // onPress={() =>
                               // console.log(item.itemName + ' - ' + quantity)
                               //
                               // }
                               color='green'
                               onPress={() =>
                                   itemAndQuantityList.push(item.itemName+' = '+quantity) &
                                   this.setState({selectedshopname:item.username})&
                                   setTimeout(() => { this.props.onRemoveItem(item, index) }, 0)
                               }



                           />



                           {/*</View>*/}

                         </View>

                 )
             })
         }
         </View>
    }
 }
}
