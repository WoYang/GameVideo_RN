import React, {
  Component
} from 'react';

import {
  StackNavigator
} from 'react-navigation'

import MyCategaryPage from './MyCategaryPage'
import MyPosterPage from './MyPosterPage'
import MyPlayer from './MyPlayer'

const MyNavigator = StackNavigator({
    MyCategaryPage:{
      screen:MyCategaryPage,
      navigationOptions: {
          header:null //隐藏标题栏
      }
    },
    MyPosterPage:{
      screen:MyPosterPage,
      navigationOptions: {
          header:null //隐藏标题栏
      }
    },
    MyPlayer:{
      screen:MyPlayer,
      navigationOptions: {
          header:null //隐藏标题栏
      }
    }
});

export default MyNavigator;