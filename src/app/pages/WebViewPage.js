/**
 * DESC: 用于展示Web网页
 * User: Administrator
 * Date: 2019/7/25
 * Time: 17:20
 */
import React, {Component} from 'react';
import {
    BackHandler,
    ScrollView,
    Dimensions,
    Image,
    Platform,
    StyleSheet,
    TouchableOpacity,
    Keyboard,
    View,
    WebView,
} from 'react-native';
import {setStatusBar} from '../components/HOC/StatusBar'
import {isiOS, isiPhoneX} from "../components/utils/device";

const STATUS_BAR_HEIGHT = isiOS() ? (isiPhoneX() ? 34 : 20) : 0

let ScreenHeight = Dimensions.get('window').height - 44 - STATUS_BAR_HEIGHT;

@setStatusBar()
export default class WebViewPage extends Component {

    uri;
    static navigationOptions = ({navigation}) => {
        return ({
            headerTitle: navigation.state.params.title,
            headerBackTitle: null,
            headerLeft: <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                    navigation.state.params.goBackPage();
                }}
            >
                <Image source={require("../components/asset/icon/back.png")}
                       style={{height: 20, width: 20, marginLeft: 15}}/>
            </TouchableOpacity>,
        })
    }

    constructor(props) {
        super(props);
        this.nav = this.props.navigation;//导航
        this.state = {
            progress: 0,
            webViewHeight: ScreenHeight,

        };
        // 添加返回键监听(对Android原生返回键的处理)
        this.addBackAndroidListener(this.nav);
    }

    componentWillMount() {
        this.uri = this.props.navigation.state.params.uri;
    }

    componentDidMount() {
        if (Platform.OS === 'ios') {
            this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
            this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
        }
        this.props.navigation.setParams({//给导航中增加监听事件
            goBackPage: this._goBackPage
        });
    }

    componentWillUnmount() {
        if (Platform.OS === 'ios') {
            this.keyboardDidShowListener.remove();
            this.keyboardDidHideListener.remove();
        }
    }

    _keyboardDidShow(e) {
        this.setState({webViewHeight: ScreenHeight - (e.endCoordinates.height / 2)})
    }

    _keyboardDidHide(e) {
        this.setState({webViewHeight: ScreenHeight})
    }

    onNavigationStateChange = navState => {
        this.setState({
            backButtonEnabled: navState.canGoBack
        });
    };

    // 监听原生返回键事件
    addBackAndroidListener(navigator) {
        if (Platform.OS === 'android') {
            BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
        }
    }

    onBackAndroid = () => {
        if (this.state.backButtonEnabled) {
            this.refs['webView'].goBack();
            return true;
        } else {
            return false;
        }
    };

    //自定义返回事件
    _goBackPage = () => {
        //  官网中描述:backButtonEnabled: false,表示webView中没有返回事件，为true则表示该webView有回退事件
        if (this.state.backButtonEnabled) {
            this.refs['webView'].goBack();
        } else {//否则返回到上一个页面
            this.nav.goBack();
        }
    };

    render() {
        return (
            <View style={Platform.OS === 'ios' ? {
                height: this.state.webViewHeight,
            } : {
                flex: 1,
            }}>
                <WebView
                    style={{
                        height: '100%',
                    }}
                    ref="webView"
                    onNavigationStateChange={this.onNavigationStateChange}
                    source={{uri: this.uri}}
                />
            </View>

        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
