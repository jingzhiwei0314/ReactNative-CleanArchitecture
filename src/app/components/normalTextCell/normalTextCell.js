import React, {Component} from 'react'
import {Text, StyleSheet, View, TouchableOpacity, Image, Platform} from 'react-native'
import PropTypes from 'prop-types'
import {PX2DP_H, PX2DP_W} from "../../utils";
import {observer} from "mobx-react";
@observer
export default class NormalTextCell extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        content: PropTypes.string,
        marginTop: PropTypes.number,
        marginLeft: PropTypes.number,
        marginRight: PropTypes.number,
        titleMarginLeft: PropTypes.number,
        height: PropTypes.number,
        onClick: PropTypes.func,
        contentColor: PropTypes.string,
        titleColor: PropTypes.string,
        titleSize: PropTypes.number,
        showNotice: PropTypes.bool,
    }
    static defaultProps = {
        showEntryIcon: false,
        onClick: null,
        marginTop: 0,
        marginLeft: 0,
        marginRight: 0,
        titleMarginLeft: 0,
        height: 48,
        content: '',
        needBorder: false,
        titleColor: COLOR.COLOR_333333,
        titleSize: 15,
        contentColor: '#333',
        backgroundColor: '#FFFFFF',
        leftIcon: null,
        showNotice: false,
        rightIcon: null,
    }

    render() {
        const Container = this.props.onClick ? TouchableOpacity : View;
        return (
            <Container
                onPress={this.props.onClick}
                style={[styles.container,
                    {
                        marginTop: this.props.marginTop,
                        height: this.props.height
                    }, this.props.needBorder ? {
                        borderBottomWidth: PX2DP_W(0.5),
                        borderBottomColor: COLOR.COLOR_D3D9E0,
                    } : {},
                    {backgroundColor: this.props.backgroundColor}]}
            >
                <View style={styles.rowView}>
                    <View style={[styles.titleView, {
                        marginLeft: this.props.marginLeft,
                        marginRight: this.props.marginRight
                    }]}>
                        {this.props.leftIcon && this.props.leftIcon()}
                        <Text style={[styles.titleText, {
                            fontSize: this.props.titleSize,
                            color: this.props.titleColor,
                            marginLeft: this.props.titleMarginLeft,
                        }]}>{this.props.title}</Text>
                        {this.props.showNotice &&
                        <View style={styles.noticeIcon}/>}

                    </View>
                    <View style={styles.contentView}>
                        <Text style={{color: this.props.contentColor, marginRight: 15}}>{this.props.content}</Text>
                        {this.props.rightIcon && this.props.rightIcon()}
                        {this.props.showEntryIcon ? <Image source={require('../asset/icon/entry.png')}
                                                           style={{width: 9, height: 15, marginLeft: 5}}/> : null}
                    </View>
                </View>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
        marginRight: 15,
    },
    rowView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    titleView: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    noticeIcon: {
        width: PX2DP_W(10),
        height: PX2DP_H(10),
        backgroundColor: 'red',
        borderRadius: PX2DP_W(20),
        marginLeft: PX2DP_W(10),
    },
    contentView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    titleText: {
        fontSize: 14,
        color: '#030303',
    }
})
