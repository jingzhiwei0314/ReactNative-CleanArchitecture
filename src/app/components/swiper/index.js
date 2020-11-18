import React, {Component} from 'react';
import {
    StyleSheet,
    Image,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';

import Swiper from 'react-native-swiper';
import {PX2DP_W, PX2DP_H} from '../../utils';
import {hidden} from 'ansi-colors';


const dot = () => {
    return (
        <View style={{
            backgroundColor: 'rgba(0,0,0,.2)',
            width: 8,
            height: 8,
            borderRadius: 4,
            marginLeft: 3,
            marginRight: 3,
            marginTop: 3,
            marginBottom: 3,
        }}/>
    );
}

const activeDot = () => {
    return (
        <View style={{
            backgroundColor: '#007aff',
            width: 8,
            height: 8,
            borderRadius: 4,
            marginLeft: 3,
            marginRight: 3,
            marginTop: 3,
            marginBottom: 3,
        }}/>
    );
}

export default class SwiperSlide extends Component {

    render() {
        const {data} = this.props;

        return (
            <Swiper
                style={styles.wrapper}
                autoplay
                showsButtons={false}
                removeClippedSubviews={false} //这个很主要啊，解决白屏问题
                horizontal={true}
                paginationStyle={styles.paginationStyle}
                dotStyle={styles.dotStyle}
                activeDotStyle={styles.activeDotStyle}
            >
                {
                    data.map(item => {
                        return (
                            <TouchableOpacity style={styles.slide} key={item.id}
                                              activeOpacity={1}
                                              onPress={() => {
                                                  this.props.navigate('webView',
                                                      {
                                                          uri: item.webUrl,
                                                          title: item.title
                                                      })
                                              }}>
                                <Image resizeMode='cover' style={styles.image} source={{uri: item.pic}}/>
                            </TouchableOpacity>


                        );
                    })
                }
            </Swiper>
        );
    }
}


const styles = StyleSheet.create({
    wrapper: {
        height: PX2DP_H(80),
    },
    paginationStyle: {
        bottom: 6,
    },
    dotStyle: {
        width: 22,
        height: 3,
        backgroundColor: '#fff',
        opacity: 0.4,
        borderRadius: 0,
    },
    activeDotStyle: {
        width: 22,
        height: 3,
        backgroundColor: '#fff',
        borderRadius: 0,
    },

    slide: {
        width:'100%',
        height: PX2DP_H(80),
        // backgroundColor: '#9DD6EB',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        borderRadius: 5,
        overflow: 'hidden',
    },
    image: {
        width: PX2DP_W(345),
        height: PX2DP_H(80),
        borderRadius: 45,
    }
})
