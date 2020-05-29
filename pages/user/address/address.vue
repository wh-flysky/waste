<template>
	<view>
		<view class="content">
			<view class="list">
				<view class="item" v-for="(item,index) in addressList" :key="index">
					<view class="top">
						<view class="name">
							{{item.name}} {{item.tel}}
						</view>
						<view class="adress">
							{{item.address.detailed}}
						</view>
					</view>
					<view class="bottom">
						<view class="edit">
							<view class="icon bianji"></view>编辑
						</view>
						<view class="del">
							<view class="icon shanchu"></view>删除
						</view>
					</view>
				</view>
			</view>
			<!-- <view class="noList">
				<view class="text">
					暂无地址！
				</view>
			</view> -->
		</view>
		<view class="add">
			<view class="btn" @tap="add">
				<view class="icon tianjia"></view>新增地址
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				isSelect:false,
				addressList:[
					{id:1,name:"大黑哥",head:"大",tel:"18816881688",address:{region:{"label":"广东省-深圳市-福田区","value":[18,2,1],"cityCode":"440304"},detailed:'深南大道1111号无名摩登大厦6楼A2'},isDefault:true},
					{id:2,name:"大黑哥",head:"大",tel:"15812341234",address:{region:{"label":"广东省-深圳市-福田区","value":[18,2,1],"cityCode":"440304"},detailed:'深北小道2222号有名公寓502'},isDefault:false},
					{id:3,name:"老大哥",head:"老",tel:"18155467897",address:{region:{"label":"广东省-深圳市-福田区","value":[18,2,1],"cityCode":"440304"},detailed:'深南大道1111号无名摩登大厦6楼A2'},isDefault:false},
					{id:4,name:"王小妹",head:"王",tel:"13425654895",address:{region:{"label":"广东省-深圳市-福田区","value":[18,2,1],"cityCode":"440304"},detailed:'深南大道1111号无名摩登大厦6楼A2'},isDefault:false},
				]
			};
		},
		onShow() {
			
			uni.getStorage({
				key:'delAddress',
				success: (e) => {
					let len = this.addressList.length;
					if(e.data.hasOwnProperty('id')){
						for(let i=0;i<len;i++){
							if(this.addressList[i].id==e.data.id){
								this.addressList.splice(i,1);
								break;
							}
						}
					}
					uni.removeStorage({
						key:'delAddress'
					})
				}
			})
			uni.getStorage({
				key:'saveAddress',
				success: (e) => {
					let len = this.addressList.length;
					if(e.data.hasOwnProperty('id')){
						for(let i=0;i<len;i++){
							if(this.addressList[i].id==e.data.id){
								this.addressList.splice(i,1,e.data);
								break;
							}
						}
					}else{
						let lastid = this.addressList[len-1];
						lastid++;
						e.data.id = lastid;
						this.addressList.push(e.data);
					}
					uni.removeStorage({
						key:'saveAddress'
					})
				}
			})
		},
		onLoad(e) {
			if(e.type=='select'){
				this.isSelect = true;
			}
		},
		methods:{
			edit(row){
				uni.setStorage({
					key:'address',
					data:row,
					success() {
						uni.navigateTo({
							url:"edit/edit?type=edit"
						})
					}
				});
				
			},
			add(){
				uni.navigateTo({
					url:"edit/edit?type=add"
				})
			},
			select(row){
				//是否需要返回地址(从订单确认页跳过来选收货地址)
				if(!this.isSelect){
					return ;
				}
				uni.setStorage({
					key:'selectAddress',
					data:row,
					success() {
						uni.navigateBack();
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.icon {
		// &.bianji {
		// 	&:before{content:"\e61b";}
		// }
		// &.tianjia {
		// 	&:before{content:"\e81a";}
		// }
	}
	.add{
		position: fixed;
		bottom: 100upx;
		width: 100%;
		height: 120upx;
		justify-content: center;
		align-items: center;
		display: flex;
		.btn{
			box-shadow: 0upx 5upx 10upx rgba(0,0,0,0.4);
			width: 70%;
			height: 80upx;
			border-radius: 15upx;
			background-color: #fddc69;
			color: #000;
			justify-content: center;
			align-items: center;
			display: flex;
			flex-direction: row;
			.icon{
				height: 80upx;
				color: #000;
				font-size: 30upx;
				justify-content: center;
				align-items: center;
				display: flex;
			}
			font-size: 30upx;
		}
	}
	.list{
		display: flex;
		flex-direction: column;
		.item{
			display: flex;
			flex-direction: column;
			font-size: 24upx;
			font-weight: 400;
			color: #3C3C3C;
			.top{
				box-sizing: border-box;
				padding: 10upx 20upx;
				border-bottom: 1upx solid #eee;
				.adress{
					margin-top: 10upx;
				}
			}
			.bottom{
				display: flex;
				flex-direction: row;
				padding: 20upx 20upx;
				border-bottom: 8upx solid #eee;
				.edit{
					display: flex;
					flex-direction: row;
					justify-content: center;
					align-items: center;
					margin-right: 40upx;
				}
				.del{
					display: flex;
					flex-direction: row;
					justify-content: center;
					align-items: center;
				}
				.bianji,.shanchu{
					font-size: 30upx;
					color: #3C3C3C;
				}
			}
		}
		
	}
	.noList{
		width: 100%;
		height: calc(100vh/2);
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		.text{
			text-align: center;
		}
	}
</style>
