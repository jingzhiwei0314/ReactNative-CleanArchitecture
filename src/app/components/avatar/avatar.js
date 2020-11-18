import React, {Component} from 'react'
import {Text, StyleSheet, View, Image} from 'react-native'

export default class Avatar extends Component {
    render() {
        const defaultAvatar = this.props.defaultAvatar || '';
        const avatar = this.props.avatar || '';
        return (
            <View>

                {avatar.length != 0 &&
                <Image source={{uri: avatar}}
                       style={{width: this.props.size, height: this.props.size, borderRadius: this.props.size / 2}}/>
                }
                {!avatar &&
                <View style={[styles.mainStyle, {
                    width: this.props.size,
                    height: this.props.size,
                    borderRadius: this.props.size / 2
                }]}>
                    <Text style={{color: 'white', fontSize: 16}}>
                        {this.props.name.substr(this.props.name.length - 2, 2)}
                    </Text>
                </View>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainStyle: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLOR.COLOR_177CFF,
        borderRadius: 5,
    }
})
