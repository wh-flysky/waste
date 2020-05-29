<script>
	export default {
		onLaunch: function () {
			console.log('App Launch')
		},
		onShow: function () {
			console.log('App Show')
		},
		onHide: function () {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "/static/iconfont/font.scss";
	
	.dialog{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba($color: #000000, $alpha: 0.6);
		z-index: 1000;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		
	}
</style>
