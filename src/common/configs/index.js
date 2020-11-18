import CONSTANT from './constant';
import COLOR from './colors';
import API from '../../data/http/api/API';
import EventType from '../../common/constant/EventType';
import zh from '../../common/language/zh';
import {Dimensions, PixelRatio, Platform} from 'react-native';

global.CONSTANT = CONSTANT;
global.COLOR = COLOR;
global.API = API;
global.EventType = EventType;
global.ZH = zh;

const env = 'online';

const appConfig = {
    dev: {},
    test: {
        postUrl: 'http://test.zhishanjr.com',
    },
    online: {
        postUrl: 'http://api.suinijie.vip',
    },
};

const base = {
    LOGIN_INFO: '',
    SPLASH_SECONDS: 1.5,
};


export const deviceWidth = Dimensions.get('window').width;      //设备的宽度
export const deviceHeight = Dimensions.get('window').height;    //设备的高度
let fontScale = PixelRatio.getFontScale();                      //返回字体大小缩放比例
let pixelRatio = PixelRatio.get();      //当前设备的像素密度
const defaultPixel = 2;
//iphone6的像素密度
//px转换成dp
const defaultW = Platform.OS === 'ios' ? 750 : 720;
const defaultH = Platform.OS === 'ios' ? 1334 : 1280;
const w2 = defaultW / defaultPixel;
const h2 = defaultH / defaultPixel;
const scale = Math.min(deviceHeight / h2, deviceWidth / w2);   //获取缩放比例
//noinspection JSAnnotator
/**
 * 设置text为sp
 * @param size sp
 * return number dp
 */
export function setSpText(size: number) {
    // size = size/pixelRatio;
    // size = Math.round((size * scale + 0.5) * pixelRatio / fontScale);
    return size;
}

//noinspection JSAnnotator
export function scaleSize(size: number) {
    size = Math.round(size * scale + 0.5);
    return size / defaultPixel;
}

export function Log(...params) {
    if (false) {
        // debug模式
        console.log(...params);
    } else {
        // release模式
        // Log('release模式');
    }
}

export function Log_W(...params) {
    if (__DEV__) {
        // debug模式
        console.warn(...params);
    } else {
        // release模式
        // Log('release模式');
    }
}

global.FONT = setSpText;

global.SCALE = scaleSize;

global.WIDTH = deviceWidth;

global.HEIGHT = deviceHeight;

global.Log = Log;
global.Log_W = Log_W;

export default Object.assign(base, appConfig[env]);
