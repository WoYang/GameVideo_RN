import React, {
  Component,
} from 'react';

import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator, 
  FlatList,
  BackHandler,
} from 'react-native';

import MyPlayer from './MyPlayer'
import BackInterface from './BackInterface';

var REQUEST_URL = 'https://m.zhanqi.tv/api/static/game.lives';
var PLAY_URL = 'https://alhls-cdn.zhanqi.tv/zqlive';

var perNum = 20;

let pageNo = 1;
let totalPage=1;
let itemNo=0;

class MyPosterPage extends BackInterface {

  constructor(props) {
    super(props);
    super.addNavigationStack('MyPosterPage');
    this.state = {
      refreshing: false,
      dataArray: [],
      showFoot: 0,           //0：隐藏footer  1：已加载完成,没有更多数据
      isRefreshing: false,   //下拉控制
    };
    this.loadData = this.loadData.bind(this);
    this.player_video = this.player_video.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    if(pageNo > totalPage){
      return;
    }
    //通过navigation获取参数
    const {params} = this.props.navigation.state;
    const id = params.id;

    fetch(REQUEST_URL + '/' + id + '/' + perNum + '-' + pageNo + '.json')
    .then((response) => response.json())
    .then((responseData) => {
      //下拉刷新
      if(pageNo == 1){
        this.state.dataArray = [];
      } 
      let cnt = responseData.data.cnt;
      let data = responseData.data.rooms;

      let dataBlob = [];
      let i = itemNo;
      let page = parseInt(cnt/perNum);
      totalPage = cnt>perNum?(cnt%perNum?page + 1:page):1;
      //console.warn('cnt:'+cnt+' totalPage:'+totalPage);

      data.map(function (item) {
        dataBlob.push({
          key: i,
          value: item,
        })
        i++;
      });
      //使用Map保证不重复
      itemNo = i;

      let foot = 0;
      if(pageNo >= totalPage){
        foot = 1;
      }

      this.setState({
        dataArray:this.state.dataArray.concat(dataBlob),
        showFoot:foot,
        isRefreshing:false,
      });
      data = null;
      dataBlob = null;
    }).catch((error) => {

    }).done();
  }

  render() {
    return (
      <FlatList
      data={this.state.dataArray}
      renderItem={this.renderItem.bind(this)}
      ListHeaderComponent={this.renderHeader.bind(this)}
      onRefresh={this.onRefresh.bind(this)}
      refreshing={this.state.refreshing}
      ListFooterComponent={this.renderFooter.bind(this)}
      onEndReached={this.onEndReached.bind(this)}
      onEndReachedThreshold={1}
      ItemSeparatorComponent={this.mySeparator}
      />
      );
  }

  mySeparator(){
    return <View style={{height:1,backgroundColor:'#999999'}}/>;
  }

  onRefresh(){
    if(this.state.isRefreshing){

    }else{
     pageNo = 1;
     this.loadData();
   }
 }

 renderHeader(){
  return (
    <View style={styles.headView}>
    <Text style={{color:'white'}}>
    暂时没有新的内容了
    </Text>
    </View>
    )
}

renderFooter() {
  if (this.state.showFoot === 1) {
    return (
      <View style={{height:30,alignItems:'center',justifyContent:'flex-start',}}>
      <Text style={{color:'#999999',fontSize:14,marginTop:5,marginBottom:5,}}>
      没有更多数据了
      </Text>
      </View>
      );
  } else if(this.state.showFoot === 2) {
    return (
      <View style={styles.footer}>
      <ActivityIndicator />
      <Text>正在加载更多数据...</Text>
      </View>
      );
  } else if(this.state.showFoot === 0){
    return (
      <View style={styles.footer}>
      <Text></Text>
      </View>
      );
  }
}

onEndReached() {
  if(this.state.showFoot != 0 ){
    return ;
  }
  if((pageNo != 1) && (pageNo >= totalPage)){
    return;
  } else {
    pageNo++;
  }
  this.setState({showFoot:2});
  this.loadData();
}

renderItem(poster) {
  var item = poster.item.value;
  return (
    <TouchableOpacity style={styles.container} onPress={() => {this.player_video(item)}}>
    <View style={styles.container}>
    <Image
    source={{uri:item.spic}}
    style={styles.small}>
    </Image>
    <View style={styles.rightContainer}>
    <Text style={styles.title}>{item.title}</Text>
    <Text style={styles.introduce}>{"主播："+item.nickname}</Text>
    <Text style={styles.introduce}>{"观看人数："+item.online}</Text>
    </View>
    </View>
    </TouchableOpacity>
    );
}

player_video(item) {
    //通过navigation传递参数
    this.props.navigation.navigate('MyPlayer',{play_url: PLAY_URL + '/' + item.videoId +'.m3u8'});
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderTopWidth: 0.5,
    borderTopColor: '#E8E8E8'
  },
  loading: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFE439'
  },
  rightContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 7,
    textAlign: 'left',
  },
  originaltitle: {
    fontSize: 13,
    fontStyle:'italic',
    marginTop: -2,
    marginLeft: 7,
    marginBottom: 4,
  },
  introduce: {
    marginLeft: 7,
    textAlign: 'left',
  },
  small: {
    margin: 7,
    marginLeft: 13,
    width: 103,
    height: 64,
  },
  footer:{
    flexDirection:'row',
    height:24,
    justifyContent:'center',
    alignItems:'center',
    marginBottom:10,
  },
  VideoSurface: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default MyPosterPage;
