/**
 * DESC:
 * User: Administrator
 * Date: 2019/9/24
 * Time: 19:23
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text, SafeAreaView, TouchableOpacity, Image, TextInput} from 'react-native';
import BaseComponent from '../components/BaseComponent'
import {inject, observer} from "mobx-react";
import rootStore from '../stores/RootStore';
import {setStatusBar} from '../components/HOC/StatusBar'
import CodeLoginPageStore from "../stores/store/CodeLoginPageStore";
import Button from "../components/Button";
import {observable} from "mobx";
import {NavigationActions, StackActions} from "react-navigation";

@setStatusBar()
@observer
export default class CodeLoginPage extends BaseComponent {
    constructor(props) {
        rootStore.codeLoginPageStore = new CodeLoginPageStore();
        super(props, rootStore.codeLoginPageStore);
        this.setNavigation(this.props.navigation);
        console.log(" CodeLoginPage  constructor ...");
        this.codeLoginPageStore = rootStore.codeLoginPageStore;
    }

    componentWillMount() {
        super.componentWillMount();
        this.codeLoginPageStore.phone = this.props.navigation.state.params.phone;
    }


    replacePage = () => {
        this.props.navigation.dispatch(resetAction);
    }

    render() {
        super.render();
        return (
            <SafeAreaView style={styles.container}>
                {/*  title  */}
                <View style={styles.title}>
                    <TouchableOpacity style={styles.titleRightBtn}
                                      activeOpacity={1}
                                      onPress={() => {
                                          this.props.navigation.goBack();
                                      }}>
                        <Image style={styles.titleRight}
                               source={require('../components/asset/icon/back.png')}/>
                    </TouchableOpacity>
                </View>

                {/*   欢迎  */}
                <Text style={styles.welcomeTitle}>验证码已发送至</Text>
                <Text style={styles.welcomeTitle1}>{this.codeLoginPageStore.phone}</Text>
                {/*  手机号输入框  */}
                <View style={styles.inputRoot}>
                    <TextInput
                        placeholder={'请输入验证码'}
                        placeholderTextColor={COLOR.COLOR_C1C6CC}
                        keyboardType={'numeric'}
                        maxLength={8}
                        value={this.codeLoginPageStore.code}
                        onChangeText={(text) => {
                            this.codeLoginPageStore.code = text
                        }}
                        style={styles.input}/>

                    <TouchableOpacity
                        disabled={!this.codeLoginPageStore.verifyEnable}
                        onPress={() => {
                            console.log("TouchableOpacity getcode");
                            this.codeLoginPageStore.getVerifyCode();
                        }} style={[styles.verifyButton]}>
                        <Text style={[styles.verifyTv,
                            this.codeLoginPageStore.verifyEnable ?
                                {color: COLOR.mainColor} : {color: COLOR.COLOR_C1C6CC}]}>{this.codeLoginPageStore.verifyText}</Text>
                    </TouchableOpacity>
                </View>

                {/*   获取验证码   */}
                <Button style={styles.getCodeBtn} value="登录"
                        onPress={() => {
                            this.codeLoginPageStore.login();
                        }}
                        fontSize={(18)}
                />

            </SafeAreaView>
        );
    }
}
//重置路由
const resetAction = StackActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({routeName: 'mainPage'}),
    ]
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center'
    },
    title: {
        width: '100%',
        marginTop: (20),
        paddingLeft: (15),
        paddingRight: (15),
        height: (30),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    titleLeft: {
        fontSize: (18),
        fontWeight: 'bold'
    },
    titleRightBtn: {
        height: (20),
        width: (20),
    },
    titleRight: {
        height: (20),
        width: (20),
    },
    welcomeTitle: {
        width: '100%',
        paddingLeft: (15),
        paddingRight: (15),
        fontSize: (30),
        color: COLOR.COLOR_2B2C2D,
        marginTop: (51),
    },
    welcomeTitle1: {
        width: '100%',
        paddingLeft: (15),
        paddingRight: (15),
        marginTop: (10),
        fontSize: (13),
        color: COLOR.COLOR_616264,
    },
    inputRoot: {
        height: (40),
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: (0.5),
        borderColor: COLOR.COLOR_bcbcc8,
        paddingLeft: (15),
        marginTop: (40),
        paddingRight: (15),
    },
    input: {
        borderBottomWidth: 0,
        width: 200,
        marginLeft: 0,
        marginRight: 0,
        height: (55),
        padding: (5),
        fontSize: (18),
    },
    verifyButton: {
        height: '100%',
        width: 100,
        paddingHorizontal: 10,
        borderRadius: 8,
        paddingVertical: 5,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
    },
    verifyTv: {
        fontSize: 15,
        textAlign: 'center',
    },
    getCodeBtn: {
        left: 0,
        width: '90%',
        height: (45),
        marginLeft: (15),
        marginRight: (15),
        marginTop: (60),
        backgroundColor: COLOR.mainColor,
    },
    newUserTip: {
        fontSize: (13),
        color: COLOR.COLOR_999999,
        marginTop: (10)
    },
    pwdBtn: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    pwdLoginTip: {
        textAlign: 'right',
        fontSize: (13),
        color: COLOR.COLOR_6F9DEF,
    }
});
