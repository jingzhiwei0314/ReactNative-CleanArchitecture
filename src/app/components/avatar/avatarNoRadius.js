import React, {Component} from 'react'
import {Text, StyleSheet, View, Image} from 'react-native'

export default class AvatarNoRadius extends Component {
    render() {
        const avatar = this.props.avatar || '';
        return (
            <View>
                {avatar.length != 0 &&
                <Image source={{uri: avatar}}
                       style={{width: this.props.width, height: this.props.height}}/>
                }
                {!avatar &&
                <View style={[styles.mainStyle, {
                    width: this.props.width,
                    height: this.props.height,
                }]}>
                    <Text style={{color: 'white', fontSize: this.props.fontSize}}>
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
    }
})
