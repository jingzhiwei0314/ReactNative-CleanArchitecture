/**
 * 全屏页面中使用的 Header 组件。非全屏页面使用 react-nativetion 的 Header 即可。
 *
 * 组件会根据当前运行的环境调整高度，考虑了状态栏。
 */

import React from 'react';
import {StyleSheet, View, Text, StatusBar} from 'react-native';

import {isiOS, isiPhoneX} from '../utils/device'

const STATUS_BAR_HEIGHT = isiOS() ? (isiPhoneX() ? 34 : 20) : 0

const Header = ({color = '#fff', height = STATUS_BAR_HEIGHT}) => {
    const headerStyle = [
        styles.header,
        {height: height},
        (isiOS()) && {
            width: '100%',
            backgroundColor: color,
        },
    ]

    return (
        <View style={headerStyle}>

        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        height: STATUS_BAR_HEIGHT,
    },
    title: {
        flex: 2,
        fontSize: 17,
        textAlign: 'center',
    },
    left: {
        flex: 1,
        flexDirection: 'row',
    },
    right: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
});

export default Header;
