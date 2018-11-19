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
import BackInterface from './BackInterface';

//获取全部游戏分类视频  400-1 表示1次获取400个数据
var REQUEST_URL = 'https://m.zhanqi.tv/api/static/game.lists';

var perNum = 400;
var pageNum = 1;

let cols = 3;
let gap = 10;

let ScreenWidth = Dimensions.get('window').width;
let ImageWidth = (ScreenWidth - (cols + 1) * gap) / cols;

class MyCategaryPage extends BackInterface {

  constructor(props) {
    super(props);
    super.addNavigationStack('MyCategaryPage');
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
    fetch(REQUEST_URL + '/' + perNum + '-' + pageNum +'.json')
    .then((response) => response.json())
    .then((responseData) => {
      let data = responseData.data.games;
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
    source={{uri:item.spic}}
    style={styles.iconStyle}>
    </Image>

    <Text numberOfLines={1} style={styles.textStyle}>{item.name}</Text>

    </View>
    </TouchableOpacity>
    );
}

select_item(item) {
    //通过navigation传递参数
    this.props.navigation.navigate('MyPosterPage',{id:item.id});
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
