import React, { Component } from 'react';
import { BackHandler } from 'react-native';
const navigation_stack = [];
class BackInterface extends Component {

	constructor(props) {
		super(props);
		BackHandler.addEventListener('hardwareBackPress', this.go_back.bind(this));		
	}

	addNavigationStack(item){
		//无法正常跳转
		//navigation_stack.push(item);
	}

	go_back() {

		if (this.props.navigation) {
			if(navigation_stack.length > 0){
				var item = navigation_stack.pop();	//通过Name也不能跳转
				this.props.navigation.goBack(item);
			}else{
				//无法正常回退到首页.只能在传null时可以正常返回
				//this.props.navigation.goBack();
				this.props.navigation.goBack(null);
			}
			return true;
		}
		return false;
		

	}
}
module.exports = BackInterface;