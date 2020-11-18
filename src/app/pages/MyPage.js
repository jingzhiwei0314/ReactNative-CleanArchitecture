/**
 * DESC:
 * User: Administrator
 * Date: 2019/9/25
 * Time: 16:05
 */
import React from 'react';
import {Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import BaseComponent from '../components/BaseComponent'
import {observer} from "mobx-react";
import rootStore from '../stores/RootStore';
import {setStatusBar} from '../components/HOC/StatusBar'
import MyPageStore from "../stores/store/MyPageStore";
import NormalTextCell from "../components/normalTextCell/normalTextCell";
import {phoneMask} from "../../common/utils/StringUtils";
import Config from "../../common/Config";

@setStatusBar()
@observer
export default class MyPage extends BaseComponent {


    constructor(props) {
        rootStore.myPageStore = new MyPageStore();
        super(props, rootStore.myPageStore);
        this.setNavigation(this.props.navigation);
        console.log(" MyPage  constructor ...");
        this.myPageStore = rootStore.myPageStore;
    }

    render() {
        super.render();
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.container}>
                    {!this.myPageStore.isLogin &&
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => {

                        }}>
                        <View style={{flexDirection: 'row', marginTop: 40, marginLeft: 15}}>
                            <Image source={require('../assets/images/my/default_avatar.png')}
                                   style={styles.loginAvatar}/>
                            <View style={styles.personInfo}>
                                <Text style={styles.personInfoText}>登录/注册</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    }

                    {this.myPageStore.isLogin &&
                    <View style={{flexDirection: 'column', marginTop: 40, marginLeft: 15, marginRight: 15}}>
                        <View style={{flexDirection: 'row'}}>
                            <Image source={require('../assets/images/my/default_avatar.png')}
                                   style={styles.loginAvatar}/>
                            <View style={styles.personInfo}>
                                <Text style={[styles.personInfoText, {
                                    letterSpacing: 1
                                }]}>{phoneMask(Config.getInstance().getPhone())}</Text>
                                {/*<Image style={styles.userVipFlagIcon}
                                       source={require('../assets/images/my/my_page_normal_user.png')}/>*/}
                            </View>
                        </View>
                    </View>
                    }

                    <NormalTextCell
                        titleSize={15}
                        height={55}
                        titleColor={COLOR.COLOR_2B2C2D}
                        needBorder={true}
                        showEntryIcon={true}
                        marginTop={60}
                        title={'在线客服'}
                        titleMarginLeft={(10)}
                        onClick={() => {
                        }}
                        leftIcon={() => {
                            return (<Image resizeMode={'contain'}
                                           source={require('../assets/images/my/my_page_complaint_suggestion_icon.png')}
                                           style={{width: 25, height: 25}}/>)
                        }}
                    />

                    <NormalTextCell
                        height={55}
                        titleSize={15}
                        titleColor={COLOR.COLOR_2B2C2D}
                        needBorder={true}
                        showEntryIcon={true}
                        title={'设置'}
                        titleMarginLeft={(10)}
                        onClick={() => {
                        }}
                        leftIcon={() => {
                            return (<Image resizeMode={'contain'}
                                           source={require('../assets/images/my/my_page_setting_icon.png')}
                                           style={{width: 25, height: 25}}/>)
                        }}
                    />
                    <View style={styles.bottomRoot}>
                        <Text style={styles.bottomTitle}>— ReactNative —</Text>
                        <Text style={styles.bottomTip}>ReactNative的干净架构设计</Text>
                    </View>
                </View>
            </SafeAreaView>
        );
    }

}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
    notLoginRoot: {
        height: '40%',
        flexDirection: 'column',
        alignItems: 'center',
    },
    LoginRoot: {
        height: '40%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginAvatar: {
        height: (70),
        width: (70),
    },
    personInfo: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginLeft: 10,
    },
    personInfoText: {
        color: COLOR.COLOR_2B2C2D,
        fontSize: 18,
    },
    personInfoText1: {
        color: COLOR.COLOR_929599,
        fontSize: 12,
    },
    userVipFlagIcon: {
        width: 70,
        height: 22
    },
    myVipRoot: {
        flexDirection: 'row',
        backgroundColor: COLOR.COLOR_F4F5F9,
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 20,
    },
    myVipIcon: {
        width: 38,
        height: 34,
        marginTop: 15,
        marginBottom: 15,
        marginLeft: 15,
    },
    myVipTitle: {
        fontSize: 18,
        color: COLOR.COLOR_2B2C2D,
    },
    myVipTip: {
        marginTop: 3,
        fontSize: 12,
        color: COLOR.COLOR_929599,
    },
    openVip: {
        position: 'absolute',
        right: 0,
        marginRight: 30,
        width: 70,
        height: (28),
        backgroundColor: COLOR.COLOR_EBC272,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 45,
    },
    loginPhone: {
        fontSize: (15),
        marginTop: 15,
        color: COLOR.COLOR_2B2C2D,
    },
    notLoginTip1: {
        fontSize: (24),
        marginTop: (80),
        color: COLOR.COLOR_2B2C2D,
    },
    notLoginTip2: {
        fontSize: (12),
        marginTop: (10),
        color: COLOR.COLOR_616264,
    },
    getCodeBtn: {
        left: 0,
        width: 120,
        height: (35),
        marginLeft: (15),
        marginRight: (15),
        marginTop: (15),
        backgroundColor: COLOR.COLOR_4478F3,
    },
    bottomRoot: {
        flexGrow: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    bottomTitle: {
        color: COLOR.COLOR_919599,
        fontSize: (12),
    },
    bottomTip: {
        color: COLOR.COLOR_C1C6CC,
        fontSize: (11),
        marginTop: (5),
        marginBottom: (30),
    },
});
