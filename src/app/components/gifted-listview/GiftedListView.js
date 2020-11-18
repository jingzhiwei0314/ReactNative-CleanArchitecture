const React = require('react');

const { ListView, View, Text, RefreshControl } = require('react-native');
import PropTypes from 'prop-types';
// small helper function which merged two objects into one
function MergeRecursive(obj1, obj2) {
	for (let p in obj2) {
		try {
			if (obj2[p].constructor == Object) {
				obj1[p] = MergeRecursive(obj1[p], obj2[p]);
			} else {
				obj1[p] = obj2[p];
			}
		} catch (e) {
			obj1[p] = obj2[p];
		}
	}
	return obj1;
}
var createReactClass = require('create-react-class');
const GiftedSpinner = require('./GiftedSpinner');
const GiftedListView = createReactClass({
	getDefaultProps() {
		return {
			customStyles: {},
			initialListSize: 10,
			firstLoader: true,
			pagination: true, // 分页功能 上拉加载更多
			refreshable: true, // 下拉刷新
			refreshableColors: ['#41A3FF'], // android 至少一种颜色用来绘制刷新指示器
			refreshableProgressBackgroundColor: undefined, // android 指定刷新指示器的背景色
			refreshableSize: undefined,
			refreshableTitle: undefined, // ios 刷新指示器下显示的文字
			refreshableTintColor: '#DCDCDC', // ios 下拉刷新菊花颜色
			renderRefreshControl: null,
			headerView: null,
			sectionHeaderView: null,
			scrollEnabled: true,
			withSections: false, // 分区模式
			paginationFetchingView: null,
			paginationAllLoadedView: null,
			paginationWaitingView: null,
			emptyView: null, // 无数据时的提示View
			renderSeparator: null,
			renderFooterView: null, // 没有上拉加载更多时渲染Footer
			noDataText: '没有相关数据',
			/**
             * @param page      从0开始
             * @param callback  处理拿到的数组:callback(data, {allLoaded: false});
             * @param options   是否是第一次加载
             *
             * 只有拿到过数据,但是又拿到空数据,才是allLoaded 全部加载完毕
             * 首次就是空数据,表明是没有数据
             * const allLoaded = (page !== 0 && data.length === 0);
             * callback(data, {allLoaded});
             */
			onFetch(page, callback, options) {
				callback([]);
			}
		};
	},

	propTypes: {
		rowView: PropTypes.func,
		customStyles: PropTypes.object,
		initialListSize: PropTypes.number,
		firstLoader: PropTypes.bool,
		pagination: PropTypes.bool,
		refreshable: PropTypes.bool,
		refreshableColors: PropTypes.array,
		refreshableProgressBackgroundColor: PropTypes.string,
		refreshableSize: PropTypes.string,
		refreshableTitle: PropTypes.string,
		refreshableTintColor: PropTypes.string,
		renderRefreshControl: PropTypes.func,
		headerView: PropTypes.func,
		sectionHeaderView: PropTypes.func,
		scrollEnabled: PropTypes.bool,
		withSections: PropTypes.bool,
		onFetch: PropTypes.func,

		paginationFetchingView: PropTypes.func,
		paginationAllLoadedView: PropTypes.func,
		paginationWaitingView: PropTypes.func,
		emptyView: PropTypes.func,
		renderSeparator: PropTypes.func,
		renderFooterView: PropTypes.func // 当没有分页加载更多时可以渲染footer
	},

	getInitialState() {
		this._setPage(0);
		this._setRows([]);
		this.isLoadingMore = false; // 是否正在请求加载下一页数据
		this.height = 0; // ListView组件 布局高度

		let ds = null;
		if (this.props.withSections === true) {
			ds = new ListView.DataSource({
				rowHasChanged: (row1, row2) => row1 !== row2,
				sectionHeaderHasChanged: (section1, section2) => section1 !== section2
			});
			return {
				dataSource: ds.cloneWithRowsAndSections(this._getRows()),
				isRefreshing: false,
				paginationStatus: 'firstLoad'
			};
		} else {
			ds = new ListView.DataSource({
				rowHasChanged: (row1, row2) => row1 !== row2
			});
			return {
				dataSource: ds.cloneWithRows(this._getRows()),
				isRefreshing: false,
				paginationStatus: 'firstLoad'
			};
		}
	},

	componentDidMount() {
		this.props.onFetch(this._getPage(), this._postRefresh, {
			firstLoad: true
		});
	},

	_setPage(page) {
		this._page = page;
	},
	_getPage() {
		return this._page;
	},
	_setRows(rows) {
		this._rows = rows;
	},
	_getRows() {
		return this._rows;
	},

	/**
     * 尾部的正在加载更多
     * 当首次出现时会在页面最上方 因为最上方就是尾部
     *
     */
	paginationFetchingView() {
		if (this.props.paginationFetchingView) {
			return this.props.paginationFetchingView();
		}

		return (
			<View
				style={[this.defaultStyles.paginationView, this.props.customStyles.paginationView]}
			>
				<GiftedSpinner />
			</View>
		);
	},
	/**
     * 没有更多数据
     * @returns {*}
     */
	paginationAllLoadedView() {
		if (this.props.paginationAllLoadedView) {
			return this.props.paginationAllLoadedView();
		}

		return (
			<View
				style={[this.defaultStyles.paginationView, this.props.customStyles.paginationView]}
			>
				<Text
					style={[this.defaultStyles.actionsLabel, this.props.customStyles.actionsLabel]}
				>
					没有更多数据
				</Text>
			</View>
		);
	},
	/**
     * 加载更多
     * @param paginateCallback
     * @returns {*}
     */
	paginationWaitingView(paginateCallback) {
		if (this.props.paginationWaitingView) {
			return this.props.paginationWaitingView(paginateCallback);
		}

		/**
         * 默认小菊花转
         */
		return (
			<View
				style={[this.defaultStyles.paginationView, this.props.customStyles.paginationView]}
			>
				<GiftedSpinner />
			</View>
		);
	},
	headerView() {
		if (this.state.paginationStatus === 'firstLoad' || !this.props.headerView) {
			return null;
		}
		return this.props.headerView();
	},

	/**
     * 首次加载就没有数据时的提示View
     * @param refreshCallback
     * @returns {*}
     */
	emptyView(refreshCallback) {
		if (this.props.emptyView) {
			return this.props.emptyView(refreshCallback);
		}
		// console.log(this.height)
		return (
			<View
				style={[
					this.defaultStyles.defaultView,
					this.props.customStyles.defaultView,
					// { height: this.height }
					// { backgroundColor: '#091f3e' }
				]}
			>
				<Image source={require('./pic_empty_service.png')} />
				<Text style={this.defaultStyles.tips}>{this.props.noDataText}</Text>
			</View>
		);
	},
	renderSeparator() {
		if (this.props.renderSeparator) {
			return this.props.renderSeparator();
		}

		return <View style={[this.defaultStyles.separator, this.props.customStyles.separator]} />;
	},

	setNativeProps(props) {
		this.refs.listview.setNativeProps(props);
	},

	_refresh() {
		this._onRefresh({ external: true });
	},

	_onRefresh(options = {}) {
		if (this.isMounted()) {
			this.setState({
				isRefreshing: true
			});
			this._setPage(0);
			this.props.onFetch(this._getPage(), this._postRefresh, options);
		}
	},

	_postRefresh(rows = [], options = {}) {
		if (this.isMounted()) {
			this._updateRows(rows, options);
			this.isLoadingMore = false;
		}
	},

	_onPaginate() {
		if (this.state.paginationStatus === 'allLoaded') {
			return null;
		} else {
			this.setState({
				paginationStatus: 'fetching'
			});
			this.props.onFetch(this._getPage() + 1, this._postPaginate, {});
		}
	},

	_postPaginate(rows = [], options = {}) {
		this.isLoadingMore = false;
		this._setPage(this._getPage() + 1);
		let mergedRows = null;
		if (this.props.withSections === true) {
			mergedRows = MergeRecursive(this._getRows(), rows);
		} else {
			mergedRows = this._getRows().concat(rows);
		}
		this._updateRows(mergedRows, options);
	},

	_updateRows(rows = [], options = {}) {
		if (rows !== null) {
			this._setRows(rows);
			if (this.props.withSections === true) {
				this.setState({
					dataSource: this.state.dataSource.cloneWithRowsAndSections(rows),
					isRefreshing: false,
					paginationStatus: options.allLoaded === true ? 'allLoaded' : 'waiting'
				});
			} else {
				this.setState({
					dataSource: this.state.dataSource.cloneWithRows(rows),
					isRefreshing: false,
					paginationStatus: options.allLoaded === true ? 'allLoaded' : 'waiting'
				});
			}
		} else {
			this.setState({
				isRefreshing: false,
				paginationStatus: options.allLoaded === true ? 'allLoaded' : 'waiting'
			});
		}
	},

	_renderPaginationView() {
		if (this.props.pagination === false) {
			if (this.props.renderFooterView) {
				return this.props.renderFooterView();
			}
		}

		if (
			(this.state.paginationStatus === 'fetching' && this.props.pagination === true) ||
			(this.state.paginationStatus === 'firstLoad' && this.props.firstLoader === true)
		) {
			return this.paginationFetchingView();
		} else if (
			this.state.paginationStatus === 'waiting' &&
			this.props.pagination === true &&
			(this.props.withSections === true || this._getRows().length > 0)
		) {
			return this.paginationWaitingView(this._onPaginate);
		} else if (this.state.paginationStatus === 'allLoaded' && this.props.pagination === true) {
			return this.paginationAllLoadedView();
		} else if (this._getRows().length === 0) {
			return this.emptyView(this._onRefresh);
		} else {
			return null;
		}
	},

	/**
     * 滚动式动态计算当前显示内容距离底部的距离 小于60就开始请求下一页数据
     * @param event
     * @private
     */
	_onScroll(event) {
		this.props.onScroll && this.props.onScroll(event);

		const { contentSize, contentInset, contentOffset, layoutMeasurement } = event.nativeEvent;

		let contentLength;
		let trailingInset;
		let scrollOffset;
		let viewportLength;
		if (this.props.horizontal) {
			contentLength = contentSize.width;
			trailingInset = contentInset.right;
			scrollOffset = contentOffset.x;
			viewportLength = layoutMeasurement.width;
		} else {
			contentLength = contentSize.height;
			trailingInset = contentInset.bottom;
			scrollOffset = contentOffset.y;
			viewportLength = layoutMeasurement.height;
		}

		let distance = contentLength + trailingInset - scrollOffset - viewportLength;
		// 距底部小于60时开始加载下一页
		if (
			this.props.pagination &&
			distance < 60 &&
			!this.isLoadingMore &&
			this.state.paginationStatus !== 'allLoaded' &&
			this._getRows().length > 0
		) {
			this.isLoadingMore = true;
			this._onPaginate();
		}
	},

	_onLayout(event) {
		this.props.onLayout && this.props.onLayout(event);

		this.height = event.nativeEvent.layout.height;
	},

	/**
     * 下拉刷新控件
     * @returns
     */
	renderRefreshControl() {
		if (this.props.renderRefreshControl) {
			return this.props.renderRefreshControl({
				onRefresh: this._onRefresh
			});
		}

		return (
			<RefreshControl
				onRefresh={this._onRefresh}
				refreshing={this.state.isRefreshing}
				colors={this.props.refreshableColors}
				progressBackgroundColor={this.props.refreshableProgressBackgroundColor}
				size={this.props.refreshableSize}
				tintColor={this.props.refreshableTintColor}
				title={this.props.refreshableTitle}
				style={{ backgroundColor: 'transparent' }}
			/>
		);
	},

	render() {
		return (
			<ListView
				ref="listview"
				removeClippedSubviews={false}
				enableEmptySections={true}
				dataSource={this.state.dataSource}
				renderRow={this.props.rowView}
				renderSectionHeader={this.props.sectionHeaderView}
				renderHeader={this.headerView}
				renderFooter={this._renderPaginationView}
				renderSeparator={this.renderSeparator}
				automaticallyAdjustContentInsets={false}
				scrollEnabled={this.props.scrollEnabled}
				canCancelContentTouches={true}
				refreshControl={this.props.refreshable ? this.renderRefreshControl() : null}
				{...this.props}
				onScroll={this._onScroll}
				onLayout={this._onLayout}
				style={this.props.style}
				contentContainerStyle={this._getRows().length === 0 ? this.defaultStyles.emptyContent : {}}
			/>
		);
	},

	defaultStyles: {
		separator: {
			height: 1,
			backgroundColor: '#EEE'
		},
		actionsLabel: {
			fontSize: 14,
			color: 'gray'
		},
		paginationView: {
			height: 60,
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: 'transparent'
		},
		defaultView: {
			justifyContent: 'center',
			alignItems: 'center'
		},
		defaultViewTitle: {
			fontSize: 16,
			color: 'gray'
		},
		tips: {
			color: '#333',
			fontSize: 14,
			marginTop: 30
		},
		emptyContent: {
			flex: 1,
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
			// backgroundColor: '#fae753'
			// 	contentContainerStyle={
			// }
		}
	}
});

module.exports = GiftedListView;
