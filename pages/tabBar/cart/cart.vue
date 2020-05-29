<template>
	<view>
		<view class="category-list">
			<!-- 左侧分类导航 -->
			<scroll-view scroll-y="true" class="left">
				<view class="row" v-for="(category,index) in categoryList" :key="category.id" :class="[index==showCategoryIndex?'on':'']"
				 @tap="showCategory(index)">
					<view class="cateView">
						<image :src="index==showCategoryIndex ? category.active : category.iconImg" mode=""></image>
						<view class="text">
							{{category.title}}
						</view>
					</view>
				</view>

			</scroll-view>
			<!-- 右侧子导航 -->
			<scroll-view scroll-y="true" class="right">
				<view class="category" v-for="(category,index) in categoryList" :key="category.id" v-show="index==showCategoryIndex">
					<view class="list">
						<view class="box" v-for="(box,i) in category.list" :key="i">
							<image class="cateImg" mode="widthFix" :src="box.img" @tap="showDialg(1 , box)"></image>
							<view class="text">{{box.name}}</view>
							<image class="addIcon" v-if="box.isDel != box.name" src="/static/img/add.png" mode="widthFix" @tap="showDialg(2 , box)"></image>
							<image class="delIcon" v-if="box.isDel == box.name" src="/static/img/del.png" mode="widthFix" @tap="deleteBox(box)"></image>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- 弹窗 -->
		<Dialog class="dialog" v-if="show" @tap="close">
			<template>
				<view class="dialogContentImg" v-if="type == 1">
					<view class="img">
						<image :src="boxDetail.img" mode="widthFix"></image>
					</view>
					<view class="text">
						{{boxDetail.name}}
					</view>
				</view>
				<view class="dialogContentAdd" v-if="type == 2">
					<view class="title">
						<text>选择重量</text>
						<text>请预估您需要回收的重量</text>
					</view>
					<view class="weightList">
						<view class="item" @tap.stop="chooseType(weightItem)" v-for="(weightItem,index) in weightlist" :key="index">
							{{weightItem}}
						</view>
					</view>
				</view>
			</template>
		</Dialog>

		<!-- 下单 -->
		<view class="cartRow">
			<view class="left" @tap="toCart">
				<image src="../../../static/img/cart.png"></image>
				<view class="iconNumber" v-if="iconNumber > 0">
					{{iconNumber}}
				</view>
			</view>
			<view class="right">
				<text @tap="placeOrder">一键下单</text>
				<text>周期下单</text>
			</view>
		</view>

		<!-- 购物车 -->
		<view class="cartContainer" v-if="cartShow" @tap="closeCart">
			<scroll-view scroll-y="true" class="cartList">
				<view class="cartItem" v-for="(item,index) in orderList" :key="index">
					<image :src="item.img" mode="" class="left"></image>
					<view class="text">
						{{item.name}}
					</view>
					<image src="/static/img/del.png" mode="" class="right" @tap.stop="deleteBox(item)"></image>
				</view>
			</scroll-view>
		</view>

		<!-- 下单选择时间 -->
		<view class="palceView" v-if="timeShow" @tap="timeShow = false">
			<view class="placeOrder">
				<view class="title">
					请选择上门回收时间段
				</view>
				<view class="timeType">
					<view class="item" v-for="(item,index) in timeTypeList" :key="index">
						<view class="box" :style="{background:item.color}"></view>
						<view class="text">
							{{item.text}}
						</view>
					</view>
				</view>
				<view class="weekRow">
					<scroll-view scroll-x="true" class="top">
						<view class="weekItem" :class="{ 'active' : (w.date == chooseDate)}" v-for="(w , index) in pickuplist" :key="index"
						 @tap.stop="chooseWeek(w.date)">
							<view class="weekItemview">
								<view class="weektext">
									{{w.week}}
								</view>
								<view class="datetext">
									{{w.date}}
								</view>
							</view>
						</view>
					</scroll-view>
					<scroll-view scroll-x="true" class="bottom">
						<view class="timeItem" @tap.stop="chooseTime(t)" :style="{background:t.timeType == 1 ? (choosetime == t.sort ? '#ffd53f':'#fff') : '#d3d3d3'}"
						 v-for="(t , i) in timelist" :key="i">
							{{t.time}}
						</view>
					</scroll-view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	//高德SDK
	import amap from '@/common/SDK/amap-wx.js';
	import Dialog from '@/components/dialog.vue';
	export default {
		components: {
			Dialog
		},
		data() {
			return {
				showCategoryIndex: 0,
				headerPosition: "fixed",
				city: "北京",
				// 显示隐藏选择时间段
				timeShow:false,
				// 显示弹窗 
				show: false,
				// 显示购物车
				cartShow: false,
				// 显示选择重量还是详情 1 代表详情 2代表选重量
				type: '',
				// 当前选择重量后对象
				boxDetail: {},
				// 购物车列表
				orderList: [],
				//重量列表
				weightlist: [
					'小于30公斤',
					'30-50公斤',
					'50-100公斤',
					'100-200公斤',
					'200-300公斤',
					'300-500公斤',
					'500-1000公斤',
					'1000公斤以上'
				],
				//分类列表
				categoryList: [{
						id: 1,
						isDel: '',
						title: '纸类',
						iconImg: '/static/img/paper.png',
						active: '/static/img/paperon.png',
						list: [{
								name: '黄纸版',
								img: '/static/img/goodsimg1.png'
							},
							{
								name: '黄纸版1',
								img: '/static/img/goodsimg1.png'
							},
							{
								name: '黄纸版2',
								img: '/static/img/goodsimg1.png'
							},
							{
								name: '黄纸版3',
								img: '/static/img/goodsimg1.png'
							},
							{
								name: '黄纸版4',
								img: '/static/img/goodsimg1.png'
							},
							{
								name: '黄纸版5',
								img: '/static/img/goodsimg1.png'
							},
							{
								name: '黄纸版6',
								img: '/static/img/goodsimg1.png'
							}
						]
					},
					{
						id: 2,
						isDel: '',
						title: '金属类',
						iconImg: '/static/img/metal.png',
						active: '/static/img/metalon.png',
						list: [{
								name: '黄纸版7',
								img: '/static/img/goodsimg1.png'
							},
							{
								name: '黄纸版8',
								img: '/static/img/goodsimg1.png'
							},
							{
								name: '黄纸版9',
								img: '/static/img/goodsimg1.png'
							},
							{
								name: '黄纸版10',
								img: '/static/img/goodsimg1.png'
							},
							{
								name: '黄纸版11',
								img: '/static/img/goodsimg1.png'
							},
							{
								name: '黄纸版12',
								img: '/static/img/goodsimg1.png'
							},
							{
								name: '黄纸版13',
								img: '/static/img/goodsimg1.png'
							}
						]
					},
					{
						id: 3,
						isDel: '',
						title: '塑料类',
						iconImg: '/static/img/bottle.png',
						active: '/static/img/bottleon.png',
						list: [{
								name: '黄纸版14',
								img: '/static/img/goodsimg1.png'
							},
							{
								name: '黄纸版15',
								img: '/static/img/goodsimg1.png'
							},
							{
								name: '黄纸版16',
								img: '/static/img/goodsimg1.png'
							},
							{
								name: '黄纸版17',
								img: '/static/img/goodsimg1.png'
							},
							{
								name: '黄纸版18',
								img: '/static/img/goodsimg1.png'
							},
							{
								name: '黄纸版19',
								img: '/static/img/goodsimg1.png'
							},
							{
								name: '黄纸版20',
								img: '/static/img/goodsimg1.png'
							}
						]
					},
					{
						id: 4,
						isDel: '',
						title: '衣服类',
						iconImg: '/static/img/clothes.png',
						active: '/static/img/clotheson.png',
						list: [{
								name: '黄纸版21',
								img: '/static/img/goodsimg1.png'
							},
							{
								name: '黄纸版22',
								img: '/static/img/goodsimg1.png'
							},
							{
								name: '黄纸版23',
								img: '/static/img/goodsimg1.png'
							},
							{
								name: '黄纸版24',
								img: '/static/img/goodsimg1.png'
							},
							{
								name: '黄纸版25',
								img: '/static/img/goodsimg1.png'
							},
							{
								name: '黄纸版26',
								img: '/static/img/goodsimg1.png'
							},
							{
								name: '黄纸版27',
								img: '/static/img/goodsimg1.png'
							}
						]
					},
				],
				// 时间段列表
				pickuplist: [],
				// 时间选择类型
				timeTypeList: [{
						color: '#eee',
						text: '约满'
					},
					{
						color: '#fff',
						text: '可约'
					},
					{
						color: '#ffd13e',
						text: '已选'
					}
				],
				// 时间段列表
				timelist: [],
				// 选择日期
				chooseDate: '',
				// 选择时间
				choosetime: ''

			}
		},
		computed: {
			iconNumber() {
				return this.orderList.length;
			}
		},
		onPageScroll(e) {
			//兼容iOS端下拉时顶部漂移
			if (e.scrollTop >= 0) {
				this.headerPosition = "fixed";
			} else {
				this.headerPosition = "absolute";
			}
		},
		onLoad() {
			this.amapPlugin = new amap.AMapWX({
				//高德地图KEY，随时失效，请务必替换为自己的KEY，参考：http://ask.dcloud.net.cn/article/35070
				key: '7c235a9ac4e25e482614c6b8eac6fd8e'
			});
			//定位地址
			this.amapPlugin.getRegeo({
				success: (data) => {
					this.city = data[0].regeocodeData.addressComponent.province;
				}
			});

		},
		onShow() {
			console.log(this.getDateRange(new Date(), 1, false))
			this.pickuplist = this.getDateRange(new Date(), 1, false);
			this.chooseDate = this.formateDate(new Date()).date;
			let nowTime = new Date().getHours();
			let timelist = [{
					time: '9:00-12:00',
					timeType: nowTime < 12 ? 1 : 0,
					sort: 12
				},
				{
					time: '12:00-15:00',
					timeType: nowTime < 15 ? 1 : 0,
					sort: 15
				},
				{
					time: '15:00-18:00',
					timeType: nowTime < 18 ? 1 : 0,
					sort: 18
				},
				{
					time: '18:00-20:00',
					timeType: nowTime < 20 ? 1 : 0,
					sort: 20
				},
				{
					time: '20:00-23:59',
					timeType: nowTime < 24 ? 1 : 0,
					sort: 24
				}
			];
			this.timelist = timelist;
		},
		methods: {
			//消息列表
			toMsg() {
				uni.navigateTo({
					url: '../../msg/msg'
				})
			},
			//分类切换显示
			showCategory(index) {
				this.showCategoryIndex = index;
			},
			toCategory(e) {
				uni.setStorageSync('catName', e.name);
				uni.navigateTo({
					url: '../../goods/goods-list/goods-list?cid=' + e.id + '&name=' + e.name
				});
			},
			//搜索跳转
			toSearch() {
				uni.showToast({
					title: "建议跳转到新页面做搜索功能"
				});
			},
			// 弹窗
			showDialg(type, box) {
				this.type = type;
				let {
					name,
					img
				} = box;
				this.boxDetail = {
					name,
					img
				};
				this.show = !this.show;
			},
			// 关闭弹窗
			close(e) {
				this.show = !this.show;
				this.boxDetail = {};
			},
			//  选择公斤
			chooseType(e) {
				this.boxDetail.text = e;
				this.orderList.push(this.boxDetail)
				this.categoryList.map((item, index) => {
					let name = this.boxDetail.name;
					item.list.map((box, i) => {
						if (box.name == name) {
							return box.isDel = box.name;
						}
					})
				})
				this.show = false;
			},
			// 删除购物车
			deleteBox(e) {
				let _this = this;
				let delname = e.name;
				uni.showModal({
					title: '提示',
					content: '确定要删除吗？',
					success: function(res) {
						if (res.confirm) {
							_this.categoryList.map((item, index) => {
								item.list.map((box, i) => {
									if (box.name == delname) {
										return box.isDel = '';
									}
								})
							})
							_this.orderList.map((item, index) => {
								if (item.name == delname) {
									_this.orderList.splice(index, 1)
								}
							})

							console.log(_this.orderList)
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			},
			// 显示购物车页面
			toCart() {
				if (!this.orderList.length) {
					return false
				}
				this.cartShow = !this.cartShow;

			},
			closeCart() {
				this.cartShow = !this.cartShow;
			},
			// 一键下单 选择时间组件
			placeOrder() {
				this.timeShow = true;
			},
			// 计算时间范围
			getDateRange(dateNow, intervalDays, bolPastTime) {
				/**
				 * dateNow 当天时间 
				 * intervalDays 间隔
				 * bolPastTime 向前还是向后
				 * timeType 时间段状态 0 约满 1 可约 2 已选
				 */
				let oneDayTime = 24 * 60 * 60 * 1000;
				let list = [];
				let lastDay;
				if (bolPastTime == true) {
					for (let i = 0; i < 7; i++) {
						let day = new Date(dateNow.getTime() - i * oneDayTime);
						let obj = this.formateDate(day);
						list.push(obj);
					}
				} else {
					for (let i = 0; i < 7; i++) {
						let day = new Date(dateNow.getTime() + i * oneDayTime);
						let obj = this.formateDate(day);
						list.push(obj);
					}
				}
				return list;
			},
			formateDate(time) {
				let year = time.getFullYear()
				let month = time.getMonth() + 1
				let day = time.getDate()
				let week = time.getDay();
				let str = '周';
				if (month < 10) {
					month = '0' + month
				}

				if (day < 10) {
					day = '0' + day
				}

				switch (week) {
					case 0:
						str += "日";
						break;
					case 1:
						str += "一";
						break;
					case 2:
						str += "二";
						break;
					case 3:
						str += "三";
						break;
					case 4:
						str += "四";
						break;
					case 5:
						str += "五";
						break;
					case 6:
						str += "六";
						break;
				}

				return {
					date: month + '-' + day + '',
					week: str
				}
			},
			// 选中日期
			chooseWeek(e) {
				this.chooseDate = e;
				if (e == this.formateDate(new Date()).date) {
					this.timelist.map((item, indxe) => {
						item.timeType = new Date().getHours() < item.sort ? 1 : 0
					})
				} else {
					this.timelist.map((item, indxe) => {
						item.timeType = 1
					})
				}
			},
			// 选中时间
			chooseTime(t){
				console.log(t)
				if(t.timeType == 0){
					return false
				}
				this.choosetime = t.sort;
			}


		}
	}
</script>
<style lang="scss" scoped>
	.status {
		width: 100%;
		height: 0;
		position: fixed;
		z-index: 10;
		background-color: #fff;
		top: 0;
		/*  #ifdef  APP-PLUS  */
		height: var(--status-bar-height); //覆盖样式
		/*  #endif  */

	}

	.palceView {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background-color: rgba(0, 0, 0, .6);
		z-index: 1001;

		.placeOrder {
			width: 100%;
			min-height: 400upx;
			background-color: #fff;
			position: absolute;
			bottom: 0;
			display: flex;
			flex-direction: column;

			.title {
				width: 100%;
				text-align: center;
				padding: 20upx 0;
			}

			.timeType {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				box-sizing: border-box;
				padding: 10upx 50upx;

				.item {
					display: flex;
					flex-direction: row;
					justify-content: center;
					align-items: center;

					.box {
						width: 20upx;
						height: 20upx;
						border: 1upx solid #F3F3F3;
						margin-right: 10upx;
					}

					.text {
						font-size: 26upx;
					}
				}
			}

			.weekRow {
				width: 100%;
				display: flex;
				flex-direction: column;

				.top {
					width: 100%;
					white-space: nowrap;
					margin: 0 auto;
					border-bottom: 1upx solid #eee;

					.weekItem {
						display: inline-block;
						padding: 30upx 30upx 0;

						.weekItemview {
							display: flex;
							flex-direction: column;
							font-size: 26upx;

							.weektext {
								text-align: center;
							}

							.datetext {
								padding-bottom: 10upx;
							}
						}

						&.active {
							.weekItemview {
								color: #ffd53f;

								.datetext {
									border-bottom: 2upx solid #ffd53f;
								}
							}

						}
					}
				}

				.bottom {
					width: 100%;
					height: 80upx;
					white-space: nowrap;
					margin: 0 auto;
					border-bottom: 1upx solid #eee;
					margin-top: 20upx;
					padding: 0 20upx;

					.timeItem {
						display: inline-block;
						font-size: 22upx;
						padding: 10upx 15upx;
						border-radius: 10upx;
						border: 1upx solid #eee;
						margin-right: 20upx;
					}
				}
			}
		}
	}

	.cartContainer {
		position: fixed;
		width: 100%;
		height: 100%;
		top: -100upx;
		left: 0;
		background-color: rgba(0, 0, 0, .6);
		z-index: 400;

		.cartList {
			position: absolute;
			bottom: 0;
			left: 0;
			max-height: 600upx;
			display: flex;
			flex-direction: column;
			background-color: #fff;

			.cartItem {
				width: 100%;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				box-sizing: border-box;
				padding: 20upx;

				.left {
					width: 100upx;
					height: 100upx;
				}

				.text {}

				.right {
					width: 40upx;
					height: 40upx;
				}
			}
		}
	}

	.cartRow {
		width: calc(100vw);
		position: fixed;
		bottom: 0;
		height: 100upx;
		border-top: 2upx solid #eee;
		background-color: #fff;
		z-index: 500;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 0 20upx;
		box-sizing: border-box;
		align-items: center;

		.left {
			position: relative;

			image {
				width: 70upx;
				height: 70upx;
			}

			.iconNumber {
				position: absolute;
				right: -10upx;
				top: -5upx;
				z-index: 501;
				width: 30upx;
				height: 30upx;
				border-radius: 50%;
				background-color: red;
				color: #fff;
				text-align: center;
				line-height: 30upx;
				font-size: 22upx;
			}
		}

		.right {
			text {
				width: 140upx;
				height: 55upx;
				display: inline-block;
				background-color: #ffd53f;
				text-align: center;
				line-height: 55upx;
				border-radius: 10upx;
				font-size: 24upx;

				&:nth-child(1) {
					margin-right: 40upx;
				}
			}
		}
	}

	.dialogContentAdd {
		width: calc(100vw - 150upx);
		height: 700upx;
		background-color: #fff;
		display: flex;
		flex-direction: column;
		align-items: center;

		.weightList {
			width: 100%;
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			flex: 1;
			box-sizing: border-box;
			padding: 30upx 50upx 50upx;
			justify-content: space-between;

			.item {
				width: 220upx;
				height: 60upx;
				border: 1upx solid #eee;
				border-radius: 15upx;
				text-align: center;
				line-height: 60upx;
			}
		}

		.title {
			width: 100%;
			border-bottom: 1upx solid #eee;
			padding: 20upx 0;

			text {
				display: inline-block;
				width: 100%;
				text-align: center;

				&:nth-child(1) {
					font-size: 32upx;
					font-weight: 500;
				}

				&:nth-child(2) {
					font-size: 26upx;
				}
			}

		}
	}

	.dialogContentImg {
		width: calc(100vw / 3 * 2);
		height: 500upx;
		background-color: #fff;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		.img {
			width: 50%;

			image {
				width: 100%;
			}
		}

		.text {
			color: #000;
		}
	}

	.category-list {
		width: 100%;
		background-color: #fff;
		display: flex;

		.left,
		.right {
			position: absolute;
			top: 0;
			/*  #ifdef  APP-PLUS  */
			top: calc(100upx + var(--status-bar-height));
			/*  #endif  */
			bottom: 0upx;
		}

		.left {
			width: 24%;
			left: 0upx;

			.row {
				width: 100%;
				display: flex;
				background-color: #f7f6fb;
				margin-bottom: 10upx;
				box-sizing: border-box;
				padding: 20upx 0;

				.cateView {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					width: 100%;
					position: relative;

					image {
						width: 60upx;
						height: 60upx;
						margin-bottom: 5upx;
					}

					.text {
						width: 100%;
						position: relative;
						font-size: 28upx;
						display: flex;
						justify-content: center;
						color: #3c3c3c;

						.block {
							position: absolute;
							width: 0upx;
							left: 0;
						}
					}
				}

				&.on {
					background-color: #fff;
				}

				&.on .cateView::before {
					width: 8upx;
					height: 100%;
					background-color: #ffd642;
					position: absolute;
					content: '';
					left: 4upx;
					top: 0;
				}

			}
		}

		.right {
			width: 72%;
			left: 26%;

			.category {
				width: 94%;
				padding: 20upx 3%;

				.banner {
					width: 100%;
					height: 24.262vw;
					border-radius: 10upx;
					overflow: hidden;
					box-shadow: 0upx 5upx 20upx rgba(0, 0, 0, 0.3);

					image {
						width: 100%;
						height: 24.262vw;
					}
				}

				.list {
					width: 100%;
					display: flex;
					flex-direction: column;

					.box {
						width: 100%;
						margin-bottom: 30upx;
						display: flex;
						flex-direction: row;
						justify-content: space-between;
						align-items: center;

						.cateImg {
							width: 100upx;
							height: 100upx;
						}

						.addIcon {
							width: 40upx;
							height: 40upx;
						}

						.delIcon {
							width: 40upx;
							height: 40upx;
						}

						.text {
							font-size: 26upx;
						}
					}
				}
			}
		}
	}
</style>
