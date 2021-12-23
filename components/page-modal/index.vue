<template>
	<view>
		<u-popup :zoom="zoom" mode="center" :popup="false" :z-index="uZIndex" v-model="value" :length="width"
		 :mask-close-able="maskCloseAble" :border-radius="borderRadius" @close="popupClose" :negative-top="negativeTop">
			<view class="model">
				<view v-if="showTitle" class="model__title u-line-1">{{ title }}</view>
				<view class="model__content">
					<view v-if="$slots.default  || $slots.$default">
						<slot />
					</view>
					<view v-else class="model__content__message">{{ content }}</view>
				</view>
				<view class="model__footer u-border-top" v-if="showCancelButton || showConfirmButton">
					<view v-if="showConfirmButton" class="footer_button hairline-left" @tap="confirm">
						<u-loading mode="circle" v-if="loading"></u-loading>
						<view :style="{'color':confirmColor}" v-else>
							{{confirmText}}
						</view>
					</view>
					<view v-if="showCancelButton" class="footer_button u-border-left" @tap="cancel">
						{{cancelText}}
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	/**
	 * modal 模态框
	 * @description 弹出模态框，常用于消息提示、消息确认、在当前页面内完成特定的交互操作
	 * @tutorial https://www.uviewui.com/components/modal.html
	 * @property {Boolean} value 是否显示模态框
	 * @property {String | Number} z-index 层级
	 * @property {String} title 模态框标题（默认"提示"）
	 * @property {String | Number} width 模态框宽度（默认600）
	 * @property {String} content 模态框内容（默认"内容"）
	 * @property {Boolean} show-title 是否显示标题（默认true）
	 * @property {Boolean} async-close 是否异步关闭，只对确定按钮有效（默认false）
	 * @property {Boolean} show-confirm-button 是否显示确认按钮（默认true）
	 * @property {Stringr | Number} negative-top modal往上偏移的值
	 * @property {Boolean} show-cancel-button 是否显示取消按钮（默认true）
	 * @property {Boolean} mask-close-able 是否允许点击遮罩关闭modal（默认false）
	 * @property {String} confirm-text 确认按钮的文字内容（默认"确认"）
	 * @property {String} cancel-text 取消按钮的文字内容（默认"取消"）
	 * @property {String} cancel-color 取消按钮的颜色（默认"#606266"）
	 * @property {String} confirm-color 确认按钮的文字内容（默认"#2979ff"）
	 * @property {String | Number} border-radius 模态框圆角值，单位rpx（默认16）
	 * @property {Boolean} zoom 是否开启缩放模式（默认true）
	 * @event {Function} confirm 确认按钮被点击
	 * @event {Function} cancel 取消按钮被点击
	 */
	export default {
		props: {
			// 是否显示Modal
			value: {
				type: Boolean,
				default: false
			},
			// 层级z-index
			zIndex: {
				type: [Number, String],
				default: ''
			},
			// 标题
			title: {
				type: [String],
				default: '提示'
			},
			// 弹窗宽度，可以是数值(rpx)，百分比，auto等
			width: {
				type: [Number, String],
				default: 600
			},
			// 弹窗内容
			content: {
				type: String,
				default: '内容'
			},
			// 是否显示标题
			showTitle: {
				type: Boolean,
				default: true
			},
			// 是否显示确认按钮
			showConfirmButton: {
				type: Boolean,
				default: true
			},
			// 是否显示取消按钮
			showCancelButton: {
				type: Boolean,
				default: true
			},
			// 确认文案
			confirmText: {
				type: String,
				default: '确认'
			},
			// 取消文案
			cancelText: {
				type: String,
				default: '取消'
			},
			// 确认按钮颜色
			confirmColor: {
				type: String,
				default: '#D61D1D'
			},
			// 圆角值
			borderRadius: {
				type: [Number, String],
				default: 16
			},
			// 是否开启缩放效果
			zoom: {
				type: Boolean,
				default: true
			},
			// 是否异步关闭，只对确定按钮有效
			asyncClose: {
				type: Boolean,
				default: false
			},
			// 是否允许点击遮罩关闭modal
			maskCloseAble: {
				type: Boolean,
				default: false
			},
			// 给一个负的margin-top，往上偏移，避免和键盘重合的情况
			negativeTop: {
				type: [String, Number],
				default: 0
			}
		},
		data() {
			return {
				loading: false, // 确认按钮是否正在加载中
			}
		},
		computed: {
			uZIndex() {
				return this.zIndex ? this.zIndex : this.$u.zIndex.popup;
			}
		},
		watch: {
			// 如果是异步关闭时，外部修改v-model的值为false时，重置内部的loading状态
			// 避免下次打开的时候，状态混乱
			value(n) {
				if (n === true) this.loading = false;
			}
		},
		methods: {
			confirm() {
				// 异步关闭
				if (this.asyncClose) {
					this.loading = true;
				} else {
					this.$emit('input', false);
				}
				this.$emit('confirm');
			},
			cancel() {
				this.$emit('cancel');
				this.$emit('input', false);
				// 目前popup弹窗关闭有一个延时操作，此处做一个延时
				// 避免确认按钮文字变成了"确定"字样，modal还没消失，造成视觉不好的效果
				setTimeout(() => {
					this.loading = false;
				}, 300);
			},
			// 点击遮罩关闭modal，设置v-model的值为false，否则无法第二次弹起modal
			popupClose() {
				this.$emit('input', false);
			},
			// 清除加载中的状态
			clearLoading() {
				this.loading = false;
			}
		}
	};
</script>

<style lang="scss" scoped>
	.model {
		height: auto;
		overflow: hidden;
		font-size: 28rpx;
		background-color: #fff;

		&__btn--hover {
			background-color: rgb(230, 230, 230);
		}

		&__title {
			padding-top: 32rpx;
			font-weight: 500;
			text-align: center;
			color: #141414;
		}

		&__content {
			&__message {
				padding: 24rpx 0 30rpx 0;
				font-size: 32rpx;
				text-align: center;
				color: #141414;
			}
		}

		&__footer {
			display: flex;

			.footer_button {
				flex: 1;
				height: 100rpx;
				line-height: 100rpx;
				font-size:24rpx;
				color: #141414;
				box-sizing: border-box;
				cursor: pointer;
				text-align: center;
				border-radius: 4rpx;
				-webkit-tap-highlight-color:rgba(0,0,0,0);
			}
		}
	}
</style>