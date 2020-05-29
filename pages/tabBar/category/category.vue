<template>
	<view>
		<!-- 状态栏 -->
		<view class="status" :style="{position:headerPosition}"></view>
        <view class="header" :style="{position:headerPosition}">
			<view class="input-box">
				<input placeholder="搜索垃圾查看对应分类" placeholder-class="inputplace" placeholder-style="color:#c0c0c0;"  @tap="toSearch()"/>
				<view class="icon search"></view>
			</view>
		</view>
		<!-- 占位 -->
		<view class="place"></view>
		<view class="category-list">
			<!-- 左侧分类导航 -->
			<scroll-view  scroll-y="true" class="left" >
				<view class="topBanner">
					<image src="../../../static/img/category1.png" mode="widthFix"></image>
				</view>
                <view class="row" v-for="(category,index) in categoryList" :key="category.id" :style="{background: index==showCategoryIndex? category.bgColor : ''}" :class="[index==showCategoryIndex?'on':'']" @tap="showCategory(index)">
					<view class="text" :style="{color: index==showCategoryIndex? '#fff' : ''}">
						<p>{{category.znName}}</p>
						<p>{{category.enName}}</p>
					</view>
					<view class="blockBox" :style="{background:category.bgColor}"></view>
				</view>
				
            </scroll-view>
			<!-- 右侧子导航 -->
			<scroll-view  scroll-y="true" class="right" >
			    <view class="category" v-for="(category,index) in categoryList" :key="category.id" v-show="index==showCategoryIndex" >
					<view class="banner">
						<image :src="category.banner" mode="widthFix"></image>
					</view>
					<view class="list">
						<view class="box" v-for="(box,i) in category.list" :key="i" @tap="toCategory(box,category.bgColor)">
							<view class="text">{{box.znName}} / {{box.enName}}</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- 弹窗 -->
		<Dialog class="dialog" v-if="show" @tap="show=!show">
			<template>
				<view class="dialogContent" :style="{background:dialogContenBg}">
					{{clickItemtext}}
				</view>
			</template>
		</Dialog>
	</view>
</template>
<script>
	//高德SDK
	import amap from '@/common/SDK/amap-wx.js';
	import Dialog from '@/components/dialog.vue'
	export default {
		components:{
			Dialog
		},
		data() {
			return {
				showCategoryIndex:0,
				headerPosition:"fixed",
				city:"北京",
				show:false,
				dialogContenBg:'',
				clickItemtext:'',
				//分类列表
				categoryList:[
					{id:1,znName:'可回收物',enName:'HOUSEHOLD FOOD WASTE',bgColor:'#033a70',
					banner:'/static/img/cateIcon1.png',list:[
						{znName:'KFC纸袋',enName:'KFC paper bag'},
						{znName:'PET塑料纸',enName:'PET plastic bottles'},
						{znName:'PS4',enName:'PS4'},
						{znName:'U盘',enName:'U disk'},
						{znName:'奥特曼玩具',enName:'ultraman'},
						{znName:'奥特曼卡片',enName:'Ultraman card'},
						{znName:'PS4',enName:'PS4'},
						{znName:'U盘',enName:'U disk'},
						{znName:'奥特曼玩具',enName:'ultraman'},
						{znName:'奥特曼卡片',enName:'Ultraman card'},
						{znName:'PS4',enName:'PS4'},
						{znName:'U盘',enName:'U disk'},
						{znName:'奥特曼玩具',enName:'ultraman'},
						{znName:'奥特曼卡片',enName:'Ultraman card'}	
					]},
					{id:2,znName:'有害垃圾',enName:'RESIDUAL WASTE',bgColor:'#fa4236',
					banner:'/static/img/cateIcon3.png',list:[
						{znName:'LED灯',enName:'LED lamp(mercury)'},
						{znName:'U盘',enName:'U disk'},
						{znName:'奥特曼玩具',enName:'ultraman'},
						{znName:'奥特曼卡片',enName:'Ultraman card'},
						{znName:'奥特曼玩具',enName:'ultraman'},
						{znName:'奥特曼卡片',enName:'Ultraman card'},
						{znName:'PS4',enName:'PS4'},
						{znName:'U盘',enName:'U disk'},
						{znName:'奥特曼玩具',enName:'ultraman'},
						{znName:'奥特曼卡片',enName:'Ultraman card'}	
					]},
					{id:3,znName:'湿垃圾',enName:'RECYCLABLE WASTE',bgColor:'#8e6e59',
					banner:'/static/img/cateIcon2.png',list:[
						{znName:'LED灯',enName:'LED lamp(mercury)'},
						{znName:'U盘',enName:'U disk'},
						{znName:'奥特曼玩具',enName:'ultraman'},
						{znName:'奥特曼卡片',enName:'Ultraman card'},
						{znName:'奥特曼玩具',enName:'ultraman'},
						{znName:'奥特曼卡片',enName:'Ultraman card'},
						{znName:'PS4',enName:'PS4'},
						{znName:'U盘',enName:'U disk'},
						{znName:'奥特曼玩具',enName:'ultraman'},
						{znName:'奥特曼卡片',enName:'Ultraman card'}	
					]},
					{id:4,znName:'干垃圾',enName:'HAZARDOUS WASTE',bgColor:'#2b2823',
					banner:'/static/img/cateIcon4.png',list:[
						{znName:'LED灯',enName:'LED lamp(mercury)'},
						{znName:'U盘',enName:'U disk'},
						{znName:'奥特曼玩具',enName:'ultraman'},
						{znName:'奥特曼卡片',enName:'Ultraman card'},
						{znName:'奥特曼玩具',enName:'ultraman'},
						{znName:'奥特曼卡片',enName:'Ultraman card'},
						{znName:'PS4',enName:'PS4'},
						{znName:'U盘',enName:'U disk'},
						{znName:'奥特曼玩具',enName:'ultraman'},
						{znName:'奥特曼卡片',enName:'Ultraman card'}	
					]}
				]
			}
		},
		onPageScroll(e){
			//兼容iOS端下拉时顶部漂移
			if(e.scrollTop>=0){
				this.headerPosition = "fixed";
			}else{
				this.headerPosition = "absolute";
			}
		},
		onLoad() {
			//高德地图KEY，随时失效，请务必替换为自己的KEY，参考：http://ask.dcloud.net.cn/article/35070
			// this.amapPlugin = new amap.AMapWX({  
			// 	key: '7c235a9ac4e25e482614c6b8eac6fd8e'  
			// });
			//定位地址 把"市"去掉
			// this.amapPlugin.getRegeo({  
			// 	success: (data) => {
			// 		this.city = data[0].regeocodeData.addressComponent.city.replace(/市/g,'');
			// 	}  
			// }); 
		},
		methods: {
			//消息列表
			toMsg(){
				uni.navigateTo({
					url:'../../msg/msg'
				})
			},
			//分类切换显示
			showCategory(index){
				this.showCategoryIndex = index;
			},
			toCategory(box , bgColor){
				this.show = !this.show;	
				this.dialogContenBg = bgColor;
				this.clickItemtext = `${box.znName} / ${box.enName}`;
			},
			//搜索跳转
			toSearch(){
				uni.showToast({title: "建议跳转到新页面做搜索功能"});
			}
		}
	}
</script>
<style lang="scss" scoped>
	page{
		background-color: #f2f6f9;
	}
	.status {
		width: 100%;
		height: 0;
		position: fixed;
		z-index: 10;
		background-color: #fff;
		top: 0;
		/*  #ifdef  APP-PLUS  */
		height: var(--status-bar-height);//覆盖样式
		/*  #endif  */
		
	}
	
	.dialogContent{
		width: calc(100vw / 2);
		height: calc(100vw / 2);
		color: #fff;
		border-radius: 15upx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	
	
	
	.inputplace{
		font-size: 24upx;
	}
	
	.header{
		width: 86%;
		padding: 0 7%;
		height: 120upx;
		display: flex;
		align-items: center;
		position: fixed;
		top: 0;
		z-index: 10;
		background: linear-gradient(to right, #fcea7c 0%,#f2d450 105%);
		/*  #ifdef  APP-PLUS  */
		top: var(--status-bar-height);
		/*  #endif  */
		
		.addr{
			width: 120upx;
			height: 60upx;
			flex-shrink: 0;
			display: flex;
			align-items: center;
			font-size: 28upx;
			.icon{
				height: 60upx; 
				margin-right: 5upx;
				display: flex;
				align-items: center;
				font-size: 42upx;
				color: #ffc50a;
			}
		}
		.input-box{
			width: 100%;
			height: 60upx;
			background-color: #f9eeae;
			border-radius: 30upx;
			position: relative;
			display: flex;
			align-items: center;
			input{
				width: 100%;
			}
			.icon{
				display: flex;
				align-items: center;
				position: absolute;
				top:0;
				left: 30upx;
				width: 60upx;
				height: 60upx;
				font-size: 34upx;
				color: #c0c0c0;
			}
			input{
				padding-left: 80upx;
				height: 28upx;
				font-size: 28upx;
			}
		}
		.icon-btn{
			width: 60upx;
			height: 60upx;
			flex-shrink: 0;
			display: flex;
			.icon{
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
		
		background-color: #ffffff;
		height: 100upx;
		/*  #ifdef  APP-PLUS  */
		margin-top: var(--status-bar-height);
		/*  #endif  */
	}
	.category-list{
		width: 100%;
		background-color: #f2f6f9;
		display: flex;
		.left,.right{
			position: absolute;
			top: 140upx;
			height: 83%;
			box-sizing: border-box;
			/*  #ifdef  APP-PLUS  */
			top: calc(100upx + var(--status-bar-height));
			/*  #endif  */
			// bottom: 0upx;
		}
		.left{
			width: 30%;
			left: 0upx;
			background-color: #fff;
			border-radius: 15upx;
			overflow: hidden;
			display: flex;
			flex-direction: column;
			.topBanner{
				image{
					width: 100%;
				}
			}
			.row{
				width: 100%;
				height: 90upx;
				display: flex;
				align-items: center;
				padding: 20upx 0;
				margin-bottom: 10upx;
				position: relative;
				.text{
					width: 100%;
					font-size: 24upx;
					display: flex;
					justify-content: center;
					flex-direction: column;
					color: #3c3c3c;
					text-align: center;
				}
				.blockBox{
					position: absolute;
					width: 4upx;
					height: 100%;
					left: 0;
					top: 0;
				}
			}
		}
		.right{
		   width: 64%;
			left: 33%;
			background-color: #fff;
			border-radius: 15upx;
			overflow: hidden;
			.category{
				width: 100%;
				.banner{
					width: 100%;
					image{
						width: 100%;
					}
				}
				.list{
					width: 100%;
					display: flex;
					flex-direction: column;
					.box{
						width: 100%;
						display: flex;
						justify-content: center;
						align-items: center;
						padding: 20upx 0;
						.text{
							margin-top: 5upx;
							width: 100%;
							display: flex;
							font-size: 26upx;
							padding-left: 20upx;
						}
						&:nth-child(2n+1){
							border-bottom: 4upx solid #d2ca82;
							background-color: #fef9e6;
						}
					}
				}
			}
		}
	}

</style>
