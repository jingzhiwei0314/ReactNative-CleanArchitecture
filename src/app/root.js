import React, {Component} from 'react';
import {Provider} from 'mobx-react';
import rootStore from './stores/RootStore';
import configs from '../common/configs';
import {Animated, Easing, Image, Platform, ToastAndroid} from 'react-native';
import {createAppContainer, createBottomTabNavigator, createStackNavigator, NavigationActions} from 'react-navigation';
import CardStackStyleInterpolator from 'react-navigation-stack/src/views/StackView/StackViewStyleInterpolator';
import HomePage from './pages/HomePage';
import ProductListPage from './pages/ProductListPage';
import MyPage from './pages/MyPage';
import WebViewPage from './pages/WebViewPage';
import LoginPage from './pages/LoginPage';
import CodeLoginPage from './pages/CodeLoginPage';

import {Images, variable} from './assets';

const {primary, gray} = variable;
global.configs = configs;

const TITLE_OFFSET = Platform.OS === 'ios' ? 70 : 56;

//实现定义某个页面的动画效果
const TransitionConfiguration = () => {
    return {
        transitionSpec: {
            duration: 300,
            easing: Easing.linear(),
            timing: Animated.timing,
        },
        screenInterpolator: CardStackStyleInterpolator.forHorizontal,
    };
};

const AppTabNavigator = createBottomTabNavigator(
    {
        Home: {
            screen: HomePage,
            navigationOptions: ({navigation}) => ({
                tabBarLabel: '首页',
                tabBarIcon: ({focused}) => {
                    let {isFocused} = navigation;
                    return (
                        !isFocused()
                            ? <Image resizeMode={'contain'} style={{width: 20, height: 20}} source={Images['home']}/>
                            : <Image resizeMode={'contain'} style={{width: 20, height: 20}}
                                     source={Images['home_active']}/>
                    );
                },
            }),
        },
        List: {
            screen: ProductListPage,
            navigationOptions: ({navigation}) => ({
                tabBarLabel: '列表',
                tabBarIcon: ({focused}) => {
                    let {isFocused} = navigation;
                    return (
                        !isFocused()
                            ? <Image resizeMode={'contain'} style={{width: 20, height: 20}} source={Images['list']}/>
                            : <Image resizeMode={'contain'} style={{width: 20, height: 20}}
                                     source={Images['list_active']}/>
                    );
                },
            }),
        },
        My: {
            screen: MyPage,
            navigationOptions: ({navigation}) => ({
                tabBarLabel: '我的',
                tabBarIcon: ({focused}) => {
                    let {isFocused} = navigation;
                    return (
                        !isFocused()
                            ? <Image resizeMode={'contain'} style={{width: 20, height: 20}} source={Images['my']}/>
                            :
                            <Image resizeMode={'contain'} style={{width: 20, height: 20}} source={Images['my_active']}/>
                    );
                },
            }),
        },
    },
    {
        initialRouteName: 'Home',
        backBehavior: 'none', // 按 back 键是否跳转到第一个Tab(首页)， none 为不跳转
        tabBarPosition: 'bottom',
        swipeEnabled: false,
        animationEnabled: false,
        configureTransition: TransitionConfiguration,
        lazy: true,
        headerLeft: null,
        tabBarOptions: {
            activeTintColor: primary,
            inactiveTintColor: gray,
            showIcon: true,
        },
        navigationOptions: ({navigation}) => {
            return {
                header: null,
            };
        },


    });


const RootStack = createStackNavigator({
    mainPage: {
        screen: AppTabNavigator,
    },
    login: {
        screen: LoginPage,
        navigationOptions: {
            header: null,
        },
    },
    codeLogin: {
        screen: CodeLoginPage,
        navigationOptions: {
            header: null,
        },
    },

    webView: {
        screen: WebViewPage,
        navigationOptions: {
            title: '网页',
        },
    },
}, {
    initialRouteName: 'login',
    headerMode: 'screen',
    gesturesEnabled: true,
    mode: 'card',
    transitionConfig: TransitionConfiguration,
    defaultNavigationOptions: {
        headerBackTitle: null,
        headerBackImage: <Image source={require('./components/asset/icon/back.png')}
                                style={{height: 20, width: 20, marginLeft: Platform.OS === 'android' ? 0 : 15}}/>,
        headerStyle: {
            elevation: 0,
            backgroundColor: '#FFFFFF',
            borderBottomWidth: 0.5,
            borderColor: '#f2f2f2',
            height: 44,
        },
        headerTitleStyle: {
            fontSize: 17,
            fontWeight: 'normal',
            alignSelf: 'center',
            textAlign: 'center',
            color: '#030303',
            flex: 1,
        },
        headerRightContainerStyle: {
            paddingRight: 10,
        },
        headerTitleContainerStyle: {
            left: TITLE_OFFSET,
            right: TITLE_OFFSET,
        },
    },
});


// export default createAppContainer(RootStack);


/**
 * React-Navigation 3.*版本以后 需要将配置好的路由进行createAppContainer，否则会报错
 */
const Root = createAppContainer(RootStack);

var stateIndex,
    oStateIndex = false,
    goBack = false,
    lastBackPressed = false;
const defaultGetStateForAction = RootStack.router.getStateForAction;
RootStack.router.getStateForAction = (action, state) => {
    if (state) {
        stateIndex = state.index;
        if (action.type === NavigationActions.BACK) {
            // if (state.routes[state.index].params)
            if (state.routes[state.index].routeName == 'mainPage') {
                if (lastBackPressed + 2000 < Date.now()) {
                    ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
                    lastBackPressed = Date.now();
                    const routes = [...state.routes];
                    return {
                        ...state,
                        ...state.routes,
                        index: routes.length - 1,
                    };
                }
            }
        }
    }
    return defaultGetStateForAction(action, state);
};

/**
 * React-Native 入口
 */
export default class App extends Component {
    render() {
        return (
            <Provider rootStore={rootStore}>
                <Root/>
            </Provider>
        );
    }
}
