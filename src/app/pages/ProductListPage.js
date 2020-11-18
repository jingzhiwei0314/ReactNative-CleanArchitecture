/**
 * DESC: 产品列表
 * User: Administrator
 * Date: 2019/12/6
 * Time: 14:47
 */
import React from 'react';
import {SafeAreaView, StyleSheet, Text,} from 'react-native';
import BaseComponent from '../components/BaseComponent'
import {observer} from "mobx-react";
import rootStore from '../stores/RootStore';
import {setStatusBar} from '../components/HOC/StatusBar'
import ProductListPageStore from "../stores/store/ProductListPageStore";
import COLOR from "../../common/configs/colors";

@setStatusBar()
@observer
export default class ProductListPage extends BaseComponent {


    constructor(props) {
        rootStore.productListPageStore = new ProductListPageStore();
        super(props, rootStore.productListPageStore);
        this.setNavigation(this.props.navigation);
        Log(" ProductListPage  constructor ...");
        this.productListPageStore = rootStore.productListPageStore;
    }


    render() {
        return (
            <SafeAreaView style={styles.scroll_wrapper}>
                <Text style={styles.title_txt}>产品列表</Text>
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
