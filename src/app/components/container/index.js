import React, {Component} from 'react';
import {View, StyleSheet, ImageBackground} from 'react-native';
import {PX2DP_W} from "../../utils";

export default class Container extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {children, style} = this.props;

        return (
            <ImageBackground roundAsCircle={true}
                             resizeMode={'stretch'} style={{...styles.wrapper, ...style}}
                             source={require('../asset/icon/home_top_bg.png')}>
                {children}
            </ImageBackground>
        );
    }
}


const styles = StyleSheet.create({
    wrapper: {
        marginLeft: PX2DP_W(15),
        marginRight: PX2DP_W(15),
    }
});
