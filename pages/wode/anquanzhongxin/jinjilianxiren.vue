<template>
	<view class="index">
		<image class="pic1" src="/static/img/pic1.png" mode=""></image>
		<view class="nav1">
			<view class="tit1">添加紧急联系人</view>
			<view class="tit2">
				通过如师傅平台拨打<text class="red">110报警</text>电话后，报警信息将以短信和电话 的方式帮您通知紧急联系人
			</view>
			<view class="tit3">
				<u-input v-model="value1" placeholder="输入紧急联系人电话" type="text" />
			</view>
			<view class="tit4">
				<u-input v-model="value2" placeholder="输入紧急联系人姓名" type="text" />
			</view>
		</view>
		<view @click="onSubmit" class="btn">确认添加</view>
	</view>
	
</template>

<script>
	export default{
		data(){
			return{
				value1:'',
				value2:'',
			}
		},
		methods:{
			onSubmit(){
				console.log(this.value1,this.value2)
			},
		}
	}
</script>


<style lang="scss">
	page {
		background: #F2F3F5;
	}
</style>
<style scoped lang="scss">
	.index {}
	
	.pic1 {
		width: 750rpx;
		height: 420rpx;
	}
	.nav1{
		margin: 0 44rpx;
		.tit1{
			margin-top: 30rpx;
			font-size: 48rpx;
			font-family: Segoe UI;
			font-weight: 400;
			line-height: 64rpx;
			color: #000000;
		}
		.tit2{
			margin-top: 20rpx;
			font-size: 24rpx;
			font-family: Segoe UI;
			font-weight: 400;
			line-height: 32rpx;
			color: #707070;
			.red{
				color: #FF0000;
			}
		}
		.tit3{
			margin-top: 64rpx;
			border-bottom: 1px solid #CCCCCC;;
		}
		.tit4{
			margin-top: 20rpx;
			border-bottom: 1px solid #CCCCCC;;
		}
	}
	.btn{
		margin-top: 104rpx;
		margin-left: 64rpx;
		width: 622rpx;
		height: 96rpx;
		background: #C5D9FD;
		border-radius: 48rpx;
		font-size: 48rpx;
		font-family: Segoe UI;
		font-weight: 400;
		line-height: 96rpx;
		text-align: center;
		color: #FFFFFF;
	}
</style>
<style>
</style>
