<template>
	<view>
		<!-- 个人信息 -->
		<view class="userDetail">
			<view class="userContent">
				<view class="left" @tap="hasUserInfo">
					<view class="userImg">
						<image :src="user.avatarUrl" mode=""></image>
					</view>
					<view class="userInfo">
						<view class="userInfov">
							<view class="name">
								{{user.nickName ? user.nickName : ''}}
							</view>
							<view class="phone">
								134****1089
							</view>
						</view>
					</view>
				</view>
				<view class="right">
					>
				</view>
			</view>
		</view>
		
		<!-- 订单类型 -->
		<view class="orderType">
			<view class="orderItem" v-for="(item,index) in orderTypeList" :key="index">
				<image :src="item.img" mode=""></image>
				<text>{{item.text}}</text>
			</view>
		</view>
		
		<!-- 功能列表 -->
		<view class="toolBarList">
			<view class="toolContent">
				<view class="toolItem" v-for="(item,index) in toolBarList" :key="index" @tap="toFnPage(item.url)">
					<view class="left">
						<image :src="item.img" mode=""></image>
						<text>{{item.text}}</text>
					</view>
					<view class="right">
						>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>

	export default {
		data() {
			return {
				isfirst:true,
				headerPosition:"fixed",
				headerTop:null,
				statusTop:null,
				showHeader:true,
				//个人信息,
				user:{},
				// 订单类型
				orderTypeList:[
					{
						url:'',
						text:'全部',
						img:'/static/img/order1.png'
					},
					{
						url:'',
						text:'未接单',
						img:'/static/img/order2.png'
					},
					{
						url:'',
						text:'进行中',
						img:'/static/img/order3.png'
					},
					{
						url:'',
						text:'已完成',
						img:'/static/img/order4.png'
					}
				],
				// 功能列表
				toolBarList:[
					{
						url:'',
						text:'我的钱包',
						img:'/static/img/icon1.png'
					},
					{
						url:'',
						text:'我的签到',
						img:'/static/img/icon2.png'
					},
					{
						url:'',
						text:'积分管理',
						img:'/static/img/icon2.png'
					},
					{
						url:'',
						text:'大件回收',
						img:'/static/img/icon3.png'
					},
					{
						url:'../../user/address/address',
						text:'收货地址',
						img:'/static/img/icon4.png'
					},
					{
						url:'',
						text:'我的信息',
						img:'/static/img/icon5.png'
					},
					{
						url:'',
						text:'关于我们',
						img:'/static/img/icon6.png'
					}
				]
			}
		},
		//下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
		onPullDownRefresh() {
		    setTimeout(function () {
		        uni.stopPullDownRefresh();
		    }, 1000);
		},
		onPageScroll(e){
			//兼容iOS端下拉时顶部漂移
			this.headerPosition = e.scrollTop>=0?"fixed":"absolute";
			this.headerTop = e.scrollTop>=0?null:0;
			this.statusTop = e.scrollTop>=0?null:-this.statusHeight+'px';
		},
		onLoad() {
			this.statusHeight = 0;
			// #ifdef APP-PLUS
			this.showHeader = false;
			this.statusHeight = plus.navigator.getStatusbarHeight();
			// #endif
		},
		onReady(){
			//此处，演示,每次页面初次渲染都把登录状态重置
			// uni.setStorage({
			// 	key: 'UserInfo',
			// 	data: false,
			// 	success: function () {
			// 	},
			// 	fail:function(e){
			// 	}
			// });
		},
		onShow(){
			console.log('========')
			uni.getStorage({
				key: 'userInfo',
				success: (res)=>{
					console.log(res)
					if(!res.data){
						return ;
					}
					this.user = res.data;
				},
				fail:(e)=>{
					console.log(e)
				}
			});
		},
		methods: {
			//消息列表
			toMsg(){
				uni.navigateTo({
					url:'../../msg/msg'
				})
			},
			toOrderList(index){
				uni.setStorageSync('tbIndex',index);
				uni.navigateTo({url:'../../user/order_list/order_list?tbIndex='+index}) 
			},
			toSetting(){
				uni.navigateTo({
					url:'../../user/setting/setting'
				})
			},
			toMyQR(){
				uni.navigateTo({
					url:'../../user/myQR/myQR'
				})
			},
			toLogin(){
				uni.showToast({title: '请登录',icon:"none"});
				uni.navigateTo({
					url:'../../login/login'
				})
				this.isfirst = false;
			},
			isLogin(){
				//实际应用中,用户登录状态应该用token等方法去维持登录状态.
				const value = uni.getStorageSync('UserInfo');
				if (value) {
					return true;
				}
				return false
			},
			toDeposit(){
				uni.navigateTo({
					url:'../../user/deposit/deposit'
				})
			},
			toFnPage(url){
				if(!url){
					uni.showToast({title: '模板未包含此页面',icon:"none"});return;
				}
				uni.navigateTo({
					url:url
				})
			},
			// 微信授权
			hasUserInfo(){
				if(!this.user.nickName){
					uni.navigateTo({
						url:'../../login/getUserInfo'
					})
				}

			}
		}
	} 
</script>
<style lang="scss">
	page{position: relative;background-color: #f2f6f9;}
	.status {
		width: 100%;
		height: 0;
		position: fixed;
		z-index: 10;
		background-color: #f06c7a;
		top: 0;
		/*  #ifdef  APP-PLUS  */
		height: var(--status-bar-height);//覆盖样式
		/*  #endif  */
		
	}
	
	.header{
		width: 92%;
		padding: 0 4%;
		height: 100upx;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		position: fixed;
		top: 0;
		z-index: 10;
		background-color: #f06c7a;
		/*  #ifdef  APP-PLUS  */
		top: var(--status-bar-height);
		/*  #endif  */
		.icon-btn{
			width: 120upx;
			height: 60upx;
			flex-shrink: 0;
			display: flex;
			.icon{
				color: #fff;
				width: 60upx;
				height: 60upx;
				display: flex;
				justify-content: flex-end;
				align-items: center;
				font-size: 42upx;
			}
		}
	}
	.place{
		background-color: #f06c7a;
		height: 100upx;
		/*  #ifdef  APP-PLUS  */
		margin-top: var(--status-bar-height);
		/*  #endif  */
	}
	.place-bottom{
		height: 300upx;
	}
	
	// orerType
	.orderType{
		width: 92%;
		margin: -100upx auto 20upx auto;
		padding: 30upx 0;
		background-color: #fff;
		// box-shadow: 0upx 0upx 25upx rgba(0,0,0,0.2);
		border-radius: 15upx;
		display: flex;
		align-items: center;
		flex-direction: row;
		justify-content: space-between;
		box-sizing: border-box;
		.orderItem{
			width: 25%;
			height: 128upx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: center;
			font-size: 26upx;
			position: relative;
			image{
				width: 60upx;
				height: 60upx;
			}
			&::before{
				width: 4upx;
				height: 70upx;
				content: '';
				background-color: #eee;
				position: absolute;
				left: 0;
				top: 29upx;
			}
			&:first-child::before{
				width: 0;
			}
		}
		
	}
	
	// toolBarList
	.toolBarList{
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		padding-bottom: 30upx;
		.toolContent{
			width: 92%;
			height: auto;
			background-color: #fff;
			border-radius: 15upx;
			.toolItem{
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				box-sizing: border-box;
				padding: 30upx;
				font-size: 26upx;
				border-bottom: 1upx solid #eee;
				.left{
					display: flex;
					flex-direction: row;
					justify-content: center;
					image{
						width: 40upx;
						height: 40upx;
						padding-right: 30upx;
					}
				}
				.right{
					
				}
			}
		}
	}
	
	.userDetail{
		//用户信息
		height: 290upx;
		width: 100%;
		background-color: #fddc69;
		border-bottom-left-radius: 50upx;
		border-bottom-right-radius: 50upx;
		padding-top: 35upx;
		box-sizing: border-box;
		display: flex;
		flex-direction: row;
		justify-content: center;
		.userContent{
			height: 130upx;
			width: 92%;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			.left{
				display: flex;
				flex-direction: row;
				.userImg{
					width: 130upx;
					height: 130upx;
					border-radius: 50%;
					background-color: #eee;
					overflow: hidden;
					image{
						width: 100%;
						height: 100%;
					}
				}
				.userInfo{
					display: flex;
					flex-direction: row;
					padding-left: 20upx;
					align-items: center;
					.userInfov{
						display: flex;
						flex-direction: column;
						.name{
							font-size: 30upx;
							font-weight: 500;
						}
						.phone{
							font-size: 26upx;
							width: 100%;
							height: 26upx;
						}
					}
				}
			}
			.right{
				padding-right: 10upx;
				color: #bea85f;
			}
		}
	}
	.user{
		width: 92%;
		padding: 0 4%;
		display: flex;
		align-items: center;
		// position: relative;
		background-color: #f06c7a;
		padding-bottom: 120upx;
		.left{
			width: 20vw;
			height: 20vw;
			flex-shrink: 0;
			margin-right: 20upx;
			border: solid 1upx #fff;
			border-radius: 100%;
			image{
				width: 20vw;
				height: 20vw;
				border-radius: 100%;
			}
			
		}
		.right{
			width: 100%;
			.username{
				font-size: 36upx;
				color: #fff;
			}
			.signature{
				color: #eee;
				font-size: 28upx;
			}
		}
		.erweima{
			flex-shrink: 0;
			width: 10vw;
			height: 10vw;
			margin-left: 5vw;
			border-radius: 100%;
		
			display: flex;
			justify-content: center;
			align-items: center;
			background: linear-gradient(to left, #fbbb37 0%,#fcf0d0 105%);
			.icon{
				color: #7b6335;
				font-size: 42upx;
			}
		}
	}
	.order{
		width: 84%;
		margin: 30upx 4% 30upx 4%;
		padding: 30upx 4% 20upx 4%;
		background-color: #fff;
		box-shadow: 0upx 0upx 25upx rgba(0,0,0,0.1);
		border-radius: 15upx;
		.list{
			display: flex;
			border-bottom: solid 1upx #17e6a1;
			padding-bottom: 10upx;
			.box{
				width: 20%;
				.img{
					width: 100%;
					display: flex;
					justify-content: center;
					.icon{
						font-size: 50upx;
						color: #464646;
					}
				}
				.text{
					width: 100%;
					display: flex;
					justify-content: center;
					font-size: 28upx;
					color: #3d3d3d;
				}
			}
		}
		.balance-info{
			display: flex;
			padding: 10upx 0;
			.left{
				width: 75%;
				display: flex;
				.box{
					width: 50%;
					font-size: 28upx;
					
					.num{
						width: 100%;
						height: 50upx;
						display: flex;
						justify-content: center;
						align-items: flex-end;
						color: #f9a453;
					}
					.text{
						width: 100%;
						display: flex;
						justify-content: center;
						color: #3d3d3d;
						font-size: 28upx;
					}
				}
			}
			.right{
				border-left: solid 1upx #17e6a1;
				width: 25%;
				.box{
					
					.img{
						width: 100%;
						height: 50upx;
						display: flex;
						justify-content: center;
						align-items: flex-end;
						.icon{
							font-size: 45upx;
							color: #e78901;
						}
					}
					.text{
						width: 100%;
						display: flex;
						justify-content: center;
						font-size: 28upx;
						color: #3d3d3d;
					}
				}
			}
		}
	}
	.VIP{
		width: 84%;
		margin: -65upx auto 20upx auto;
		padding: 30upx 4%;
		background: linear-gradient(to left, #dea96d 0%,#f6d59b 100%);
		box-shadow: 0upx 0upx 25upx rgba(0,0,0,0.2);
		border-radius: 15upx;
		display: flex;
		align-items: center;
		.img{
			flex-shrink: 0;
			width: 60upx;
			height: 60upx;
			image{
				width: 60upx;
				height: 60upx;
			}
		}
		.title{
			width: 100%;
			color: #796335;
			font-size: 30upx;
		}
		.tis{
			width: 100%;
			display: flex;
			justify-content: flex-end;
			color: #fcf0d0;
			font-size: 26upx;
		}
	}
	.toolbar{
		width: 92%;
		margin: 0 4% 0 4%;
		padding: 0 0 20upx 0;
		background-color: #fff;
		box-shadow: 0upx 0upx 25upx rgba(0,0,0,0.1);
		border-radius: 15upx;
		.title{
			padding-top: 10upx;
			margin: 0 0 10upx 3%;
			font-size: 30upx;
			height: 80upx;
			display: flex;
			align-items: center;
		}
		.list{
			display: flex;
			flex-wrap: wrap;
			.box{
				width: 25%;
				margin-bottom: 30upx;
				.img{
					width: 23vw;
					height: 10.5vw;
					display: flex;
					justify-content: center;
					
					image{
						width: 9vw;
						height: 9vw;
					}
				}
				.text{
					width: 100%;
					display: flex;
					justify-content: center;
					font-size: 26upx;
					color: #3d3d3d;
				}
			}
		}
	}
</style>
