<template>
	<view class="index">
		<view class="userFi">
			<view class="Usins">
				<view class="userName">收货人</view>
				<view class="Puin">
					<u-input type="text" :clearable='false' v-model="infoName" input-align="right"
						placeholder="请输入收货人姓名" placeholder-style="color:#999" />
				</view>
			</view>
			<view class="UserPhoes">
				<view class="userName">手机号码</view>
				<view class="Puin">
					<u-input type="number" :clearable='false' v-model="Phone" input-align="right"
						placeholder="请输入收货人手机号" maxlength="11" placeholder-style="color:#999" />
				</view>
			</view>
		</view>
		<view class="Ress">
			<view class="Location">
				<view class="LocaTes">所在地区</view>
				<view class="AddStat" @click="show=true">
					<view class="Puin">
						<view class="picker" v-if="address">{{address}}</view>
						<view style="color:#999" v-else>请选择地区</view>
					</view>
					<view class="icon">
						<u-icon name="arrow-right" color="#CCCCCC" size="28"></u-icon>
					</view>
				</view>
			</view>
			<view class="DetaRess">
				<view class="LocaTes">详细地址</view>
				<view class="AddStat">
					<u-input type="text" :clearable='false' v-model="DateAddrs" input-align="right"
						placeholder="请输入详细地址信息" placeholder-style="color:#999" />
				</view>
			</view>
		</view>
		<view class="ExidAdd">
			<view class="ExTies">
				<view class="Tes">设置为默认地址</view>
				<view class="Caref">注：每次下单会默认使用该地址</view>
			</view>
			<view class="Switch" v-if="Switch" @click="SwitchOpen">
				<view class="redio"></view>
				<view class="SwTie">关</view>
			</view>
			<view class="opSwitch" v-if="!Switch" @click="SwitchOpen">
				<view class="SwTie">开</view>
				<view class="redio"></view>
			</view>
		</view>
		<u-gap height="136"></u-gap>
		<view class="footer">
			<view @click="PresInfo" v-if="infoName!='' && Phone!='' && region.length!=0 && DateAddrs!=''" class="btn">保存
			</view>
			<view v-else class="btn noactive">保存</view>
		</view>
		<u-picker mode="region" v-model="show" confirm-color="#D61D1D" @confirm="confirm"></u-picker>
		<u-popup mode='center' border-radius="10" v-model="popShow1" width="360rpx" height="360rpx">
			<view class="pop2">
				<view class="txt1">提示</view>
				<view class="txt2">保存成功</view>
				<view class="btn" @click="queding">确定</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapState
	} from "vuex";
	export default {
		data() {
			return {
				opType: '',
				show: false,
				popShow1: false,
				infoName: '', //收货人
				Phone: '', //手机号码
				province: "",
				city: "",
				district: '',
				address: "",
				DateAddrs: '', //详情地址
				Switch: true, //是否默认
				id: 0
			}
		},
		computed: {
			...mapGetters(['isLogin']),
			...mapState(['addressInfo'])
		},
		onLoad(options) {
			if (options.type) {
				this.opType = options.type
			}
			if (this.isLogin) {
				this.id = options.id || 0;
				uni.setNavigationBarTitle({
					title: options.id ? '修改收货地址' : '新建收货地址'
				})
				this.getUserAddress();
			}
		},
		methods: {
			getUserAddress() {
				this.infoName = this.addressInfo.real_name;
				this.Phone = this.addressInfo.phone;
				this.Switch = this.addressInfo.is_default == 1 ? true : false;
				this.province = this.addressInfo.province;
				this.city = this.addressInfo.city;
				this.district = this.addressInfo.district;
				this.address = this.province + this.city + this.district;
				this.DateAddrs = this.addressInfo.detail;
			},
			confirm(val) {
				this.province = val.province.label;
				this.city = val.city.label;
				this.district = val.area.label;
				this.address = `${val.province.label}${val.city.label}${val.area.label}`;
			},
			queding() {
				this.popShow1 = false;
				// if (this.opType == 'order') {
				// 	this.$store.commit("setAddress", {
				// 		id: this.id,
				// 		real_name: this.infoName,
				// 		phone: this.Phone,
				// 		province: this.province,
				// 		city: this.city,
				// 		district: this.district,
				// 		detail: this.DateAddrs,
				// 	});
				// }
				uni.navigateBack({
					delta: 1
				})
			},
			//防止穿透
			moveHandle() {
				return
			},
			//设置默认地址
			SwitchOpen() {
				this.Switch = !this.Switch
			},
			//保存
			async PresInfo() {
				var myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
				if (!myreg.test(this.Phone)) {
					this.$u.toast("请填写正确的手机号码");
					return;
				}
				if (this.address === '') {
					this.$u.toast("请选择所在地区");
					return;
				}
				if (!this.DateAddrs) {
					this.$u.toast("请填写详细地址");
					return;
				}
				const res = await this.$api.saveAddress({
					id: this.id,
					real_name: this.infoName,
					phone: this.Phone,
					province: this.province,
					city: this.city,
					district: this.district,
					detail: this.DateAddrs,
					is_default: this.Switch ? 0 : 1
				})
				if (res.code == 200) {
					this.popShow1 = true;
				} else {
					this.$u.toast(res.message);
				}
			}
		}
	}
</script>

<style>
	page {
		background-color: #F7F8FA;
	}
</style>
<style lang="scss" scoped>
	.acea-row {
		display: flex;
		flex-direction: column;
	}

	.picker {
		text-align: right;
		font-size: 28rpx;
		font-weight: 400;
		color: #707070;
	}

	.pop2 {
		display: flex;
		flex-direction: column;
		align-items: center;

		.txt1 {
			margin-top: 32rpx;
			font-size: 32rpx;
			font-weight: 700;
			text-align: center;
			color: #000000;
			margin: 42rpx;
		}

		.txt2 {
			font-size: 28rpx;
			font-weight: 400;
			text-align: center;
			color: #000000;
		}

		.btn {
			margin-top: 60rpx;
			width: 240rpx;
			height: 80rpx;
			background: #D61D1D;
			border-radius: 40rpx;
			font-size: 28rpx;
			font-weight: 500;
			text-align: center;
			color: #ffffff;
			line-height: 80rpx;
		}
	}

	.index {
		width: 100%;
		position: relative;

		.userFi {
			width: 100%;
			height: 218rpx;
			margin: 28rpx 0;
			background-color: #fff;
			display: flex;
			flex-direction: column;
			justify-content: space-evenly;

			.Usins {
				margin: 0 40rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.userName {
					font-size: 28rpx;
					font-weight: 700;
					color: #000000;
				}

				.Puin {
					text-align: right;
					font-size: 28rpx;
					font-weight: 400;
					color: #999999;

					/deep/.u-input__input {
						color: #707070;
					}
				}
			}

			.UserPhoes {
				margin: 0 40rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.userName {
					font-size: 28rpx;
					font-weight: 700;
					color: #000000;
				}

				.Puin {
					text-align: right;
					font-size: 28rpx;
					font-weight: 400;
					color: #999999;

					/deep/.u-input__input {
						color: #707070;
					}
				}
			}
		}

		.Ress {
			width: 100%;
			height: 218rpx;
			margin-bottom: 12rpx;
			background-color: #fff;
			display: flex;
			flex-direction: column;
			justify-content: space-evenly;

			.Location {
				margin: 0 39rpx 0 40rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.LocaTes {
					font-size: 28rpx;
					font-weight: 700;
					color: #000000;
				}

				.AddStat {
					flex: 1;
					display: flex;
					align-items: center;
					text-align: right;

					.Puin {
						width: 100%;
						font-size: 28rpx;
						font-weight: 400;
						color: #999999;
					}

					.icon {
						display: flex;
						align-items: center;

						image {
							width: 24rpx;
							height: 24rpx;
						}
					}
				}
			}

			.DetaRess {
				margin: 0 39rpx 0 40rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.LocaTes {
					font-size: 28rpx;
					font-weight: 700;
					color: #000000;
				}

				.AddStat {
					text-align: right;
					font-size: 28rpx;
					font-weight: 400;
					color: #999999;

					/deep/.u-input__input {
						color: #707070;
					}
				}
			}
		}

		.ExidAdd {
			width: 100%;
			height: 174rpx;
			background-color: #fff;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.ExTies {
				margin-left: 40rpx;
				display: flex;
				flex-direction: column;

				.Tes {
					font-size: 28rpx;
					font-weight: 400;
					color: #000000;
				}

				.Caref {
					margin-top: 10rpx;
					font-size: 28rpx;
					font-weight: 400;
					color: #D61D1D;
				}
			}

			.Switch {
				width: 118rpx;
				height: 58rpx;
				margin-right: 40rpx;
				background: #ffffff;
				border-radius: 30rpx;
				box-shadow: 0rpx 0rpx 10rpx 0rpx rgba(0, 0, 0, 0.16);
				display: flex;
				align-items: center;
				justify-content: space-between;

				.redio {
					margin-left: 12rpx;
					width: 30rpx;
					height: 30rpx;
					background: #cccccc;
					border-radius: 50%;
				}

				.SwTie {
					margin-right: 26rpx;
					font-size: 24rpx;
					font-weight: 700;
					color: #000000;
				}
			}

			.opSwitch {
				width: 118rpx;
				height: 58rpx;
				margin-right: 40rpx;
				background: #ffffff;
				border-radius: 30rpx;
				box-shadow: 0rpx 0rpx 10rpx 0rpx rgba(0, 0, 0, 0.16);
				display: flex;
				align-items: center;
				justify-content: space-between;

				.SwTie {
					margin-left: 26rpx;
					font-size: 24rpx;
					color: #000000;
				}

				.redio {
					margin-right: 12rpx;
					width: 30rpx;
					height: 30rpx;
					background: #D61D1D;
					border-radius: 50%;
				}

			}
		}

		.btnDDress {
			width: 612rpx;
			height: 80rpx;
			border-radius: 10rpx;
			margin: 136rpx auto 0;
			background-color: #F5F5F5;
			border-radius: 10rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 28rpx;
			font-weight: 700;
			color: #cccccc;
		}

		.btnState {
			width: 612rpx;
			height: 80rpx;
			background: #D61D1D;
			border-radius: 10rpx;
			margin: 136rpx auto 0;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 28rpx;
			font-weight: 700;
			color: #FFFFFF;
		}

		.Mask {
			position: fixed;
			z-index: 2;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			height: 100%;
			width: 100%;
		}

		.Tips {
			position: fixed;
			z-index: 3;
			top: 0;
			left: 0;
			right: 0;
			margin: 614rpx auto 0;
			width: 360rpx;
			height: 360rpx;
			background: #ffffff;
			border-radius: 20rpx;
			box-shadow: 0rpx 0rpx 20rpx 0rpx rgba(0, 0, 0, 0.10);
			display: flex;
			align-items: center;
			flex-direction: column;
			justify-content: space-between;
			text-align: center;

			.Tes {
				margin-top: 40rpx;
				font-size: 36rpx;
				font-weight: 700;
				color: #000000;
			}

			.Cont {
				width: 208rpx;
				height: 80rpx;
				font-size: 28rpx;
				font-weight: 400;
				color: #000000;
			}

			.YesChak {
				width: 240rpx;
				height: 80rpx;
				background: #D61D1D;
				border-radius: 40rpx;
				margin-bottom: 28rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 28rpx;
				font-weight: 500;
				color: #ffffff;
			}
		}
	}

	.footer {
		width: 612rpx;
		height: 140rpx;
		margin: 0 auto;

		.btn {
			width: 100%;
			height: 84rpx;
			background: #D61D1D;
			border-radius: 10rpx;
			font-size: 28rpx;
			font-weight: bold;
			line-height: 84rpx;
			text-align: center;
			color: #FFFFFF;
		}

		.btn.noactive {
			background: #F2F2F2;
			color: #848484;
		}
	}
</style>
