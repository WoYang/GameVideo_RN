import React, {
  Component,
} from 'react';

import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import MyPosterPage from './MyPosterPage'

var REQUEST_URL = 'https://m.douyu.com/api/cate/list';

let cols = 3;
let gap = 10;

let ScreenWidth = Dimensions.get('window').width;
let ImageWidth = (ScreenWidth - (cols + 1) * gap) / cols;

class MyCategaryPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      dataArray: [],
    };
    this.loadData = this.loadData.bind(this);
    this.select_item = this.select_item.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    fetch(REQUEST_URL+'?type=')
    .then((response) => response.json())
    .then((responseData) => {
      let data = responseData.data.cate2Info;
      this.state.dataArray = [];
      this.setState({
        dataArray:this.state.dataArray.concat(data),
      });
    }).catch((error) => {

    }).done();
  }

  render() {
    return (
      <FlatList
      data={this.state.dataArray}
      renderItem={this.renderItem.bind(this)}
      onRefresh={this.onRefresh.bind(this)}
      refreshing={this.state.refreshing}
      horizontal={false}
      numColumns={cols}
      />
      );
  }

  onRefresh(){
   this.loadData();
 }


 renderItem(categary) {
  var item = categary.item;
  return (
    <TouchableOpacity style={styles.container} onPress={() => {this.select_item(item)}}>
    <View style={styles.innerViewStyle}>

    <Image
    source={{uri:item.icon}}
    style={styles.iconStyle}>
    </Image>

    <Text numberOfLines={1} style={styles.textStyle}>{item.cate2Name}</Text>

    </View>
    </TouchableOpacity>
    );
}

select_item(item) {
    //通过navigation传递参数
    this.props.navigation.navigate('MyPosterPage',{type:item.shortName});
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderTopWidth: 0.5,
    borderTopColor: '#E8E8E8'
  },
  innerViewStyle:{
    marginLeft: gap,
    marginRight: gap,
    alignItems:'center',
  },
  iconStyle:{
    width: ImageWidth,
    height: ImageWidth * 1.2,
    resizeMode:'contain'
  },
  textStyle:{
    textAlign:'center',
    fontSize: 15,
    color: '#555555',
  },
});

export default MyCategaryPage;
