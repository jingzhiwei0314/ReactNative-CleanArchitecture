import React, {Component} from "react";
import {
    PanResponder,
    StyleSheet,
    View,
    processColor,
    Text
} from 'react-native';


var CIRCLE_SIZE = 22;
var BOX_WIDTH = 200;

export default class SceneS extends Component {
    constructor(props) {
        super(props);

        props.getRangeValue(props.initValue || 0);
        BOX_WIDTH = props.boxWidth || 200;
        this.state = {
            lineForeW: props.initValue ? (BOX_WIDTH * props.initValue / 197) : 0
        };
        var _this = this;

        this._panResponder = {};
        this._previousLeft = props.initValue ? (BOX_WIDTH * props.initValue / 197) : 0;
        this._previousTop = 0;
        this._circleStyles = {
            style: {
                left: _this._previousLeft,
                top: _this._previousTop,
                backgroundColor: props.initBg || "#ccc",    // 设置初始的按钮的颜色,默认#ccc
            }
        };
        // this.circle = (null: ?{ setNativeProps(props: Object): void });
        _this._highlight = _this._highlight.bind(this);
        _this._unHighlight = _this._unHighlight.bind(this);
        _this._updateNativeStyles = _this._updateNativeStyles.bind(this);
        _this._handleStartShouldSetPanResponder = _this._handleStartShouldSetPanResponder.bind(this);
        _this._handleMoveShouldSetPanResponder = _this._handleMoveShouldSetPanResponder.bind(this);
        _this._handlePanResponderGrant = _this._handlePanResponderGrant.bind(this);
        _this._handlePanResponderMove = _this._handlePanResponderMove.bind(this);
        _this._handlePanResponderEnd = _this._handlePanResponderEnd.bind(this);

    }

    componentWillMount() {
        this._updateNativeStyles();
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
            onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
            onPanResponderGrant: this._handlePanResponderGrant,
            onPanResponderMove: this._handlePanResponderMove,
            onPanResponderRelease: this._handlePanResponderEnd,
            onPanResponderTerminate: this._handlePanResponderEnd,
        });

    }

    // componentDidMount() {
    //     this._updateNativeStyles();
    //     console.log(this, 61)
    // }

    render() {
        return (
            <View
                style={[styles.container, {width: BOX_WIDTH + CIRCLE_SIZE}]}>
                <View
                    ref={(circle) => {
                        this.circle = circle;
                    }}
                    style={styles.circle}
                    {...this._panResponder.panHandlers}

                >
                </View>
                <View style={[styles.lineBg, {width: BOX_WIDTH, backgroundColor: this.props.lineBg || "#ddd"}]}>
                    <View style={[styles.lineFore, {
                        width: this.state.lineForeW,
                        backgroundColor: this.props.lineBg || COLOR.COLOR_4478F3
                    }]}>
                    </View>
                </View>


            </View>
        )
    }

    _highlight() {
        this._circleStyles.style.backgroundColor = this.props.pressBg || "#888";
        this._updateNativeStyles();
    }

    _unHighlight() {
        this._circleStyles.style.backgroundColor = this.props.initBg;
        this._updateNativeStyles();
    }

    _updateNativeStyles() {
        this.circle && this.circle.setNativeProps(this._circleStyles);
    }

    _handleStartShouldSetPanResponder(e: Object, gestureState: Object): boolean {
        // Should we become active when the user presses down on the circle?
        return true;
    }

    _handleMoveShouldSetPanResponder(e: Object, gestureState: Object): boolean {
        // Should we become active when the user moves a touch over the circle?
        return true;
    }

    _handlePanResponderGrant(e, gestureState) {
        this._highlight();
    }

    _handlePanResponderMove(e: Object, gestureState: Object) {
        this._circleStyles.style.left = this._previousLeft + gestureState.dx;
        if (this._circleStyles.style.left > BOX_WIDTH) {
            this._circleStyles.style.left = BOX_WIDTH;
        } else if (this._circleStyles.style.left < 0) {
            this._circleStyles.style.left = 0;
        }
        this.setState({
            lineForeW: this._circleStyles.style.left
        })
        this._updateNativeStyles();

        //滑动中刷新
        var percentNum = parseInt((this._circleStyles.style.left / BOX_WIDTH) * 197);
        this.props.getRangeValue(percentNum);

    }

    _handlePanResponderEnd(e: Object, gestureState: Object) {
        this._unHighlight();
        this._previousLeft += gestureState.dx;
        var percentNum = parseInt((this._circleStyles.style.left / BOX_WIDTH) * 197);
        this.props.getRangeValue(percentNum);
    }
}


var styles = StyleSheet.create({
    circle: {
        width: CIRCLE_SIZE,
        height: CIRCLE_SIZE,
        borderRadius: CIRCLE_SIZE / 2,
        position: 'absolute',
        zIndex: 10,
    },
    container: {
        marginTop: 20,
        height: CIRCLE_SIZE,
        position: 'relative',
        left: 0,
        top: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: "center",
    },
    lineBg: {
        height: 4,
        backgroundColor: '#666',
        position: "absolute",
        left: CIRCLE_SIZE / 2,
        zIndex: 2,
        borderRadius: 2,
    },
    lineFore: {
        height: 4,
        backgroundColor: 'blue',
        borderRadius: 2,
    }
});
