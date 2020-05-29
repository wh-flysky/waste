<template>
	<view class="getUserInfo">
		<view class="logo">
			<image src="../../static/img/logo.png" mode="widthFix"></image>
		</view>
		<view class="permissions">
			<view class="top">
				登录后该应用将获取以下权限
			</view>
			<view class="bottom">
				获取你的公开信息（昵称、头像等）
			</view>
		</view>
		<view class="getBtn">
			<button class="btn" open-type="getUserInfo" @getuserinfo="bindgetuserinfo">获取头像昵称</button>
		</view>
		<view class="cancelBtn">
			取消登录
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		onshow() {

		},
		onLoad() {

		},
		methods: {
			bindgetuserinfo() {
				let _self = this;
				// #ifdef MP-WEIXIN
				// uni.login({
				// 	success: res_login => {
				// 		console.log('-------获取code-------')
				// 		      console.log(res_login.code);
				// 		uni.getUserInfo({
				// 			success: info => {

				// 				console.log('-------获取sessionKey、openid(unionid)-------')
				// 				console.log(info);
				// 			}
				// 		});

				// 	}
				// })

				uni.getProvider({
					service: 'oauth',
					success: function(res) {
						if (~res.provider.indexOf('weixin')) {
							uni.login({
								provider: 'weixin',
								success: (res) => {
									_self.authorization = res.code;
									uni.getUserInfo({
										provider: 'weixin',
										success: (info) => { //这里请求接口
											console.log(res);
											console.log(info);
											_self.userInfo = info.userInfo;
											uni.setStorage({
												key:'userInfo',
												data:info.userInfo,
												success:function(res){
													uni.navigateBack();
												}
											})
											
										},
										fail: () => {
											uni.showToast({
												title: "微信登录授权失败",
												icon: "none"
											});
										}
									})

								},
								fail: () => {
									uni.showToast({
										title: "微信登录授权失败",
										icon: "none"
									});
								}
							})

						} else {
							uni.showToast({
								title: '请先安装微信或升级版本',
								icon: "none"
							});
						}
					}
				});
				//#endif
			}
		}

	}
</script>

<style lang="scss" scoped>
	.getUserInfo {
		width: 100%;
		height: 100%;

		.logo {
			width: 100%;
			padding: 100upx 0;
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;

			image {
				width: 200upx;
				height: 200upx;
			}
		}

		.permissions {
			width: 80%;
			padding-left: 10%;
			display: flex;
			flex-direction: column;
			font-size: 28upx;

			.top {
				color: #333333;
			}

			.bottom {
				color: #A7A7A7;
			}
		}

		.getBtn {
			display: flex;
			flex-direction: row;
			justify-content: center;
			width: 100%;
			margin-top: 100upx;

			.btn {
				width: 80%;
				background-color: #2ca347;
				height: 80upx;
				color: #fff;
				font-size: 28upx;
				text-align: center;
				line-height: 80upx;
				border-radius: 15upx;
			}
		}

		.cancelBtn {
			width: 100%;
			text-align: right;
			padding: 0 10%;
			box-sizing: border-box;
			color: #979797;
			margin-top: 20upx;
		}
	}
</style>
