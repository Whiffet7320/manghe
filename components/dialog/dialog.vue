<template>
	<view :class="'dialog_' + type">
	  <view class="mask"></view>
	  <view class="dialog">
	    <view class="dialog_hd">
	      <view class="dialog_title">{{title}}</view>
	    </view>
	    <view class="dialog_bd"><slot></slot></view>
	    <view class="dialog_ft">
			<view class="btn_dialog primary" @click="disClose('confirm')">{{confirmButton}}</view>
			<view v-if="type === 'confirm'" class="btn_dialog default" @click="disClose('cancel')">{{cancelButton}}</view>
	    </view>
	  </view>
	</view>
</template>

<script>
	export default {
	  props: {
	    /**
	     * 对话框类型
	     * alert: 提示框，只包含确定按钮（默认）
	     * confirm: 询问框，包含确定和取消按钮
	     */
	    type: {
	      type: String,
	      required: false,
	      default: 'confirm'
	    },
	    /**
	     * 对话框标题
	     */
	    title: {
	      type: String,
	      required: true,
		  default:"提示"
	    },
	    /**
	     * 确定按钮名称
	     */
	    confirmButton: {
	      type: String,
	      required: false,
	      default: '确定'
	    },
	    /**
	     * 取消按钮名称
	     */
	    cancelButton: {
	      type: String,
	      required: false,
	      default: '取消'
	    }
	  },
	  methods: {
	    disClose(event){
			this.$emit("close",event);
	    }
	  }
	}
</script>

<style lang="scss" scoped>
	.mask{
		width: 100%;
		height: 100vh;
		position: fixed;
		z-index: 1000;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		background: rgba(0,0,0,0.6);
	}
	.dialog{
		position: fixed;
		z-index: 2000;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		text-align: center;
		border-radius: 20rpx;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		width: 480rpx;
		min-height: 360rpx;
		background: #FFFFFF;
		box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.1);
		.dialog_hd{
			padding:50rpx 0 40rpx 0;
			.dialog_title{
				font-size: 36rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #000000;
			}
		}
		.dialog_bd{
			padding: 0 24rpx;
			font-size: 28rpx;
			font-family: PingFang SC;
			color: #000000;
		}
		.dialog_ft{
			padding:50rpx 0;
			display: flex;
			justify-content: center;
			.btn_dialog{
				width: 178rpx;
				height: 80rpx;
				line-height: 80rpx;
				text-align: center;
				border-radius: 44rpx;
				font-size: 28rpx;
				margin:0 14rpx;
				&.primary{
					background: #BD9E81;
					color:#FFFFFF;
				}
				&.default{
					background: #F7F8FA;
					color: #707070;
				}
			}
		}
	}
</style>
