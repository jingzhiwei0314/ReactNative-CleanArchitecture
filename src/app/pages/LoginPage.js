/**
 * DESC:
 * User: Administrator
 * Date: 2019/9/24
 * Time: 11:47
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    Image,
    TextInput,
    TouchableOpacity,
    Platform,
    NativeModules, Alert, Linking,
} from 'react-native';
import BaseComponent from '../components/BaseComponent';
import {inject, observer} from 'mobx-react';
import rootStore from '../stores/RootStore';
import {setStatusBar} from '../components/HOC/StatusBar';
import LoginPageStore from '../stores/store/LoginPageStore';
import Button from '../components/Button';
import SplashScreen from 'react-native-splash-screen';
import {
    checkUpdate,
    downloadUpdate,
    isFirstTime,
    isRolledBack,
    markSuccess,
    switchVersion,
    switchVersionLater,
} from 'react-native-update';
import _updateConfig from '../../../update.json';

const {appKey} = _updateConfig[Platform.OS];

@setStatusBar()
@observer
export default class LoginPage extends BaseComponent {

    constructor(props) {
        rootStore.loginPageStore = new LoginPageStore();
        super(props, rootStore.loginPageStore);
        console.log(' LoginPage  constructor ...');
        this.loginPageStore = rootStore.loginPageStore;
    }

    componentDidMount() {
        super.componentDidMount();
        if (Platform.OS === 'android') {
            SplashScreen.hide();
        }

        if (isFirstTime) {
            Log('LoginPage 这是当前版本第一次启动,是否要模拟启动失败?失败将回滚到上一版本');
            this.showHUDMessage('这是当前版本第一次启动,是否要模拟启动失败?失败将回滚到上一版本');
            markSuccess();

            // Alert.alert('提示', '这是当前版本第一次启动,是否要模拟启动失败?失败将回滚到上一版本', [
            //     {
            //         text: '是', onPress: () => {
            //             throw new Error('模拟启动失败,请重启应用');
            //         },
            //     },
            //     {
            //         text: '否', onPress: () => {
            //             markSuccess();
            //         },
            //     },
            // ]);
        } else if (isRolledBack) {
            Log('LoginPage 刚刚更新失败了,版本被回滚.');
            // Alert.alert('提示', '刚刚更新失败了,版本被回滚.');
            this.showHUDMessage('刚刚更新失败了,版本被回滚.');
        }

    }

    doUpdate = async (info) => {
        try {
            const hash = await downloadUpdate(info);

            Log('LoginPage 下载完毕,是否重启应用?');
            this.showHUDMessage('下载完毕,是否重启应用?');
            switchVersionLater(hash);

            // Alert.alert('提示', '下载完毕,是否重启应用?', [
            //     {
            //         text: '是', onPress: () => {
            //             switchVersion(hash);
            //         },
            //     },
            //     {text: '否'},
            //     {
            //         text: '下次启动时', onPress: () => {
            //             switchVersionLater(hash);
            //         },
            //     },
            // ]);
        } catch (err) {
            Log('LoginPage 更新失败 err -> ', err);
            this.showHUDMessage('更新失败');
            // Alert.alert('提示', '更新失败.');
        }
    };
    checkUpdate = async () => {
        if (__DEV__) {
            // 开发模式不支持热更新，跳过检查
            return;
        }
        let info;
        try {
            info = await checkUpdate(appKey);
        } catch (err) {
            console.warn(err);
            return;
        }

        if (info.expired) {
            Log('LoginPage 您的应用版本已更新,请前往应用商店下载新的版本');
            this.showHUDMessage('您的应用版本已更新,请前往应用商店下载新的版本');
            info.downloadUrl && Linking.openURL(info.downloadUrl);
            //
            // Alert.alert('提示', '您的应用版本已更新,请前往应用商店下载新的版本', [
            //     {
            //         text: '确定', onPress: () => {
            //             info.downloadUrl && Linking.openURL(info.downloadUrl);
            //         },
            //     },
            // ]);
        } else if (info.upToDate) {
            Log('LoginPage 您的应用版本已是最新');
            this.showHUDMessage('您的应用版本已是最新');
            // Alert.alert('提示', '您的应用版本已是最新.');
        } else {
            Log(`LoginPage 检查到新的版本 ${info.name} , 是否下载? ${info.description}`);
            this.showHUDMessage(`LoginPage 检查到新的版本 ${info.name} , 是否下载? ${info.description}`);
            this.doUpdate(info);
            // Alert.alert('提示', '检查到新的版本' + info.name + ',是否下载?\n' + info.description, [
            //     {
            //         text: '是', onPress: () => {
            //             this.doUpdate(info);
            //         },
            //     },
            //     {text: '否'},
            // ]);
        }
    };


    /**
     * 验证码获取成功跳转至验证验证码
     * */
    toCodeLogin = () => {
        this.props.navigation.navigate('codeLogin',
            {
                phone: this.loginPageStore.phone,
            });
    };


    render() {
        super.render();
        return (
            <SafeAreaView style={styles.container}>
                {/*  title  */}
                <View style={styles.title}>
                    <Text style={styles.titleLeft}>欢迎登录已更新</Text>
                    <TouchableOpacity style={styles.titleRightBtn}
                                      activeOpacity={1}
                                      onPress={() => {
                                          this.props.navigation.goBack();
                                      }}>
                        <Image style={styles.titleRight}
                               source={require('../assets/images/my/login_res_close.png')}/>
                    </TouchableOpacity>

                </View>

                {/*  手机号输入框  */}
                <View style={styles.inputRoot}>
                    <TextInput
                        placeholder={'请输入手机号'}
                        placeholderTextColor={COLOR.COLOR_C1C6CC}
                        keyboardType={'numeric'}
                        maxLength={11}
                        value={this.loginPageStore.phone}
                        onChangeText={(text) => {
                            this.loginPageStore.phone = text;
                        }}
                        style={styles.input}/>

                </View>

                <Text style={styles.newUserTip}>未注册的手机号验证后自动创建账号</Text>

                {/*   获取验证码   */}
                <Button style={styles.getCodeBtn} value="获取验证码"
                        onPress={() => {
                            this.checkUpdate();
                            // this.loginPageStore.getCode();
                        }}
                        fontSize={(18)}
                />

                <Image style={{width: 100, height: 100, marginTop: 40}} resizeMode={'contain'}
                       source={require('../assets/images/my/auth_fingerprint03.png')}/>


                <Image style={{width: 100, height: 100, marginTop: 40}} resizeMode={'contain'}
                       source={require('../assets/images/my/auth_ic_card_e5c.png')}/>
            </SafeAreaView>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: COLOR.background,
    },
    title: {
        width: '100%',
        marginTop: (20),
        paddingLeft: (15),
        paddingRight: (15),
        height: (30),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    titleLeft: {
        fontSize: (24),
        color: COLOR.mainColor,
    },
    titleRightBtn: {
        height: (20),
        width: (20),
        marginRight: 15,
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
        width: '100%',
        paddingLeft: (15),
        paddingRight: (15),
    },
    input: {
        height: (55),
        padding: (5),
        marginTop: (50),
        borderBottomWidth: (0.5),
        fontSize: (18),
        borderColor: COLOR.COLOR_D3D9E0,
    },
    getCodeBtn: {
        left: 0,
        width: '90%',
        height: (45),
        marginLeft: (15),
        marginRight: (15),
        marginTop: (73),
        backgroundColor: COLOR.mainColor,
    },
    bottomView: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: (15),
        paddingRight: (15),
        marginTop: (10),
    },
    newUserTip: {
        width: '100%',
        marginTop: 10,
        fontSize: (13),
        paddingLeft: (15),
        color: COLOR.COLOR_999999,
    },
    pwdBtn: {},
    pwdLoginTip: {
        textAlign: 'right',
        fontSize: (13),
        color: COLOR.mainColor,
    },
});
