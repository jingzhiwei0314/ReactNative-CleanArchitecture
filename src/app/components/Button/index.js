import React, {Component} from 'react';
import {
    TouchableOpacity,
    Text,
    ImageBackground
} from 'react-native';
import {PX2DP_W} from "../../utils";

const styles = {
    defauleStyle: {
        width: 310,
        height: 40,
        color: "#FFFFFF",
        justifyContent: "center",
        alignItems: "center",
        position: 'relative',
        left: "50%",
        marginLeft: -155,
        borderRadius: 100,
        showBackground: false,
        textColor: '#FFF'
    },
    textStyle: {
        color: "#FFF",
    }
}

class Button extends Component {
    constructor(props) {
        super(props)
    }

    handlePress = fn => {
        fn && fn();
    }

    render() {
        const {
            value,
            onPress,
            style,
            textColor,
            fontWeight,
            fontSize,
            showBackground
        } = this.props;
        return (
            <TouchableOpacity
                style={{
                    ...styles.defauleStyle,
                    ...style
                }}
                activeOpacity={1}
                onPress={() => (this.handlePress(onPress))}
            >

                {showBackground && <ImageBackground
                    source={require('../asset/icon/btn_background.png')}
                    style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                    <Text
                        style={{
                            ...styles.textStyle,
                            color: textColor || "#FFF",
                            fontSize: fontSize || PX2DP_W(16),
                            fontWeight: fontWeight || 'normal',
                        }}
                    >{value}</Text>
                </ImageBackground>}

                {!showBackground && <Text
                    style={{
                        ...styles.textStyle,
                        color: textColor || "#FFF",
                        fontSize: fontSize || PX2DP_W(16),
                        fontWeight: fontWeight || 'normal',
                    }}
                >{value}</Text>}


            </TouchableOpacity>
        );
    }
}

export default Button;
