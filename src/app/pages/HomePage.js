/**
 * DESC:  首页
 * User: Administrator
 * Date: 2019/9/23
 * Time: 14:19
 */
import React from 'react';
import {Platform, SafeAreaView, StyleSheet, Text} from 'react-native';
import BaseComponent from '../components/BaseComponent'
import {observer} from "mobx-react";
import rootStore from '../stores/RootStore';
import {setStatusBar} from '../components/HOC/StatusBar'
import HomePageStore from "../stores/store/HomePageStore";
import SplashScreen from "react-native-splash-screen";
import COLOR from "../../common/configs/colors";

@setStatusBar({

    // barStyle: 'light-content',
    // translucent: true,
    // backgroundColor: COLOR.mainColor
})
@observer
export default class HomePage extends BaseComponent {
    constructor(props) {
        rootStore.homePageStore = new HomePageStore();
        super(props, rootStore.homePageStore);
        this.setNavigation(this.props.navigation);
        console.log(" HomePage  constructor ...");
        this.homePageStore = rootStore.homePageStore;
    }

    componentDidMount() {
        super.componentDidMount();
        if (Platform.OS === "android") {
            SplashScreen.hide();
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.scroll_wrapper}>
                <Text style={styles.title_txt}>APP 首页</Text>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    scroll_wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title_txt: {
        fontSize: 24,
        color: COLOR.mainColor
    },
});
