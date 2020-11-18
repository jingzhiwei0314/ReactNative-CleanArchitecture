var React = require('react');
// 列表组件loading
var { View, ActivityIndicator, Platform } = require('react-native');
var createReactClass = require('create-react-class');
import PropTypes from 'prop-types';
var GiftedSpinner = createReactClass({
	_getSpinner() {
		return (
			<ActivityIndicator
				animating={true}
				size="small"
				color={Platform.OS == 'android' ? '#0191D7' : '#DCDCDC'}
				{...this.props}
			/>
		);
	},

	render() {
		return (
			<View>
				{this._getSpinner()}
			</View>
		);
	}
});

module.exports = GiftedSpinner;
