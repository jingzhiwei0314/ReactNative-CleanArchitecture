import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions, Image, Animated, Easing, Alert, BackHandler, Platform} from 'react-native';

const WINDOW_WIDTH = Dimensions.get('window').width;


/** 
 * https://github.com/magicismight/react-native-root-siblings  * 
 * npm install react-native-root-siblings --save
 */
import RootSiblings from 'react-native-root-siblings';
import Toast from "react-native-root-toast";
import {StackActions, NavigationActions} from 'react-navigation';
import AccountController from "../../domain/controller/account/AccountController";

let loadingView = null;
let timer = null;
let rotationAnim = new Animated.Value(0);

let baseNavigation = null;
let resetAction = StackActions.reset({
    index: 1,
    actions: [
        NavigationActions.navigate({routeName: 'mainPage'}),
        NavigationActions.navigate({routeName: 'login', params: {}})
    ]
});
export default class BaseComponent extends Component {

    /**
     * Store层对象句柄
     */
    basePageStore;

    constructor(props, basePageAction) {
        super(props);
        this.basePageStore = basePageAction;
        if (this.basePageStore != null) {
            this.basePageStore.setPageView(this);
        }
    }

    setNavigation(navigation) {
        console.log(navigation);
        baseNavigation = navigation;
    }

    /**
     * 调用BaseAction中生命周期方法
     */
    componentWillMount() {
        console.log("BaseComponent componentWillMount ...");
        if (this.basePageStore != null)
            this.basePageStore.componentWillMount();
        if (Platform.OS === 'android') {
            BackHandler.addEventListener("hardwareBackPress", this.onBackClicked);
        }
    }

    //返回 ;//return  true 表示返回上一页  false  表示跳出RN
    onBackClicked = () => { // 默认 表示跳出RN
        if (loadingView) {
            return true;
        }
        return false;
    };


    componentDidMount() {
        console.log("BaseComponent componentDidMount ...");
        if (this.basePageStore != null)
            this.basePageStore.componentDidMount();
    }

    componentWillUnmount() {
        console.log("BaseComponent componentWillUnmount ...");
        if (this.basePageStore != null)
            this.basePageStore.componentWillUnmount();
        if (Platform.OS === 'android') {
            BackHandler.removeEventListener("hardwareBackPress", this.onBackClicked);
        }
    }

    /**
     * 授权过期重新登录
     * @private
     */
    _exceptionLogout() {
        AccountController.getInstance().clearCache();
        // Alert.alert(
        //     '提示',
        //     '您的账号在其他地点登录，请重新登录',
        //     [
        //         {text: '确认', onPress: () => baseNavigation.dispatch(resetAction)},
        //     ],
        //     {cancelable: false}
        // );
    }


    _initializeRotationAnimation() {
        rotationAnim.setValue(0);

        Animated.timing(rotationAnim, {
            toValue: 1,
            duration: 1000,
            easing: Easing.linear
        }).start(() => {
            if (loadingView) {
                this._initializeRotationAnimation();
                Log('BaseComponent showHUDLoading... 4444 ');
            }
        });
    }

    _initializeRotationAnimation() {
        rotationAnim.setValue(0);

        Animated.timing(rotationAnim, {
            toValue: 1,
            duration: 1000,
            easing: Easing.linear
        }).start(() => {
            if (loadingView) {
                this._initializeRotationAnimation();
            }
        });
    }


    /**
     * 弹出HUDLoading 挡住下面的控件交互
     */
    showHUDLoadingAndTip(tip) {
        const hud = (
            <View style={{
                position: 'absolute', top: 0, bottom: 0, left: 0, right: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <View style={{
                    width: 200,
                    height: 115,
                    borderRadius: 6,
                    backgroundColor: COLOR.COLOR_WHITE,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Animated.Image style={styles.iconStyle} source={require('./asset/icon/loading.png')}/>
                    {tip &&
                    <Text style={{
                        fontSize: 12,
                        color: COLOR.COLOR_333333,
                        marginTop: 5,
                        textAlign: 'center'
                    }}>{tip}</Text>
                    }
                </View>
            </View>);

        if (timer) {
            clearTimeout(timer);
        }

        if (loadingView) {
            loadingView.update(hud);
        } else {
            loadingView = new RootSiblings(hud);
        }

        this._initializeRotationAnimation();
    }

    /**
     * 弹出HUDLoading 挡住下面的控件交互
     */
    showHUDLoading() {
        const hud = (
            <View style={styles.maskView}>
                <View style={styles.iconContainer}>
                    <Animated.Image style={styles.iconStyle} source={require('./asset/icon/loading.png')}/>
                </View>
            </View>);

        if (timer) {
            clearTimeout(timer);
        }

        if (loadingView) {
            loadingView.update(hud);
        } else {
            loadingView = new RootSiblings(hud);
        }

        this._initializeRotationAnimation();
    }


    /**
     * 隐藏HUD
     */
    hidenHUDLoading() {
        if (loadingView) {
            loadingView.destroy();
            loadingView = null;
        }
    }

    showHUDMessage(message: string) {
        Toast.show(message, {
            duration: Toast.durations.SHORT,
            position: Toast.positions.CENTER,
            shadow: true,
            animation: true,
            hideOnPress: false,
            opacity: 0.7,
            delay: 0
        });

    }

    render() {

    }

}
const styles = StyleSheet.create({
    maskView: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute'
    },
    QRCodeView: {},
    textContainer: {
        paddingHorizontal: 15,
        paddingTop: 10,
        paddingBottom: 12,
        marginHorizontal: 0.1 * WINDOW_WIDTH,
        borderRadius: 6
    },
    textStyle: {
        fontSize: 15,
        color: '#fff',
        textAlign: 'center',
        letterSpacing: 0.5,
        lineHeight: 18
    },
    iconContainer: {
        padding: 15,
        borderRadius: 6
    },
    iconStyle: {
        width: 48,
        height: 48,
        transform: [
            {
                rotate: rotationAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '360deg']
                })
            }
        ]
    }
});
