<template>
	<view class="index">
		<u-toast ref="uToast" />
		<u-popup mode="center" closeable width='560' height='762' border-radius='24' v-model="quxiaoDDshow">
			<view class="pop">
				<view class="pop-tit">取消订单原因</view>
				<u-radio-group wrap font-size='32' v-model="quxxiaoDDRal" @change="radioGroupChange">
					<u-radio name="我不想买了">我不想买了</u-radio>
					<u-radio name="地址填写错误">地址填写错误</u-radio>
					<u-radio name="信息填写错误">信息填写错误</u-radio>
					<u-radio name="红包忘了用">红包忘了用</u-radio>
					<u-radio name="有更优惠的平台">有更优惠的平台</u-radio>
					<u-radio v-if="quxiaoStatus == 2" name="师傅服务态度差">师傅服务态度差</u-radio>
					<u-radio v-if="quxiaoStatus == 2" name="师傅不专业">师傅不专业</u-radio>
					<u-radio name="8">其他原因</u-radio>
				</u-radio-group>
				<view @click="quxiaoDDSubmit" class="pop-btn">确定</view>
			</view>
		</u-popup>
		<u-mask :show="maskshow" z-index='1' @click="onMask"></u-mask>
		<u-popup v-model="popupShow" width="650rpx" height="336rpx" mode="center" border-radius="16">
			<view class="txtt1">{{orderItemcode}}</view>
			<view class="txtt2">请勿提前将服务码</view>
			<view class="txtt2">提前告知师傅以免造成损失</view>
		</u-popup>
		<view class="nav1">
			<u-tag v-if="top1Value!=''" @close='closeTop1' @click="chooesTop(1)" :text="top1Value" mode="dark"
				shape="circle" closeable />
			<view v-if="top1Value==''" @click="chooesTop(1)" :class="{'tit1':true,'active':chooseTop1}">商城订单</view>
			<u-tag v-if="top2Value!=''" @close='closeTop2' @click="chooesTop(2)" :text="top2Value" mode="dark"
				shape="circle" closeable />
			<view v-if="top2Value==''" @click="chooesTop(2)" :class="{'tit1':true,'active':chooseTop2}">服务订单</view>
		</view>
		<view v-if="chooseTop1" class="nav2">
			<view @click="cTop1Btn1('全部订单')" :class="{'btn':true,'active':top1Value=='全部订单'}">全部订单</view>
			<view @click="cTop1Btn1('待付款')" :class="{'btn':true,'active':top1Value=='待付款'}">待付款</view>
			<view @click="cTop1Btn1('待发货')" :class="{'btn':true,'active':top1Value=='待发货'}">待发货</view>
			<view @click="cTop1Btn1('待收货')" :class="{'btn':true,'active':top1Value=='待收货'}">待收货</view>
			<!-- <view @click="cTop1Btn1('待评价')" :class="{'btn':true,'active':top1Value=='待评价'}">待评价</view> -->
			<view @click="cTop1Btn1('待评价')" :class="{'btn':true,'active':top1Value=='待评价'}">待评价</view>
			<!-- <view @click="cTop1Btn1('售后')" :class="{'btn':true,'active':top1Value=='售后'}">售后</view> -->
		</view>
		<view v-if="chooseTop2" class="nav2">
			<view @click="cTop2Btn1('全部订单')" :class="{'btn':true,'active':top2Value=='全部订单'}">全部订单</view>
			<!-- <view @click="cTop2Btn1('发布订单')" :class="{'btn':true,'active':top2Value=='发布订单'}">发布订单</view> -->
			<view @click="cTop2Btn1('未选择师傅')" :class="{'btn':true,'active':top2Value=='未选择师傅'}">未选择师傅</view>
			<view @click="cTop2Btn1('等待付款')" :class="{'btn':true,'active':top2Value=='等待付款'}">等待付款</view>
			<view @click="cTop2Btn1('等待上门')" :class="{'btn':true,'active':top2Value=='等待上门'}">等待上门</view>
			<view @click="cTop2Btn1('正在服务')" :class="{'btn':true,'active':top2Value=='正在服务'}">正在服务</view>
			<view @click="cTop2Btn1('已完成')" :class="{'btn':true,'active':top2Value=='已完成'}">已完成</view>
			<!-- <view @click="cTop2Btn1('售后')" :class="{'btn':true,'active':top2Value=='售后'}">售后</view> -->
		</view>
		<view v-if="current == 0" class="items">
			<view class="item">
				<!-- 待付款 -->
				<template>
					<view class="tit11">
						<view class="tit1">待付款</view>
					</view>
					<view class="titt">
						<view class="tit2">
							<view class="txt1">
								订单编号：<text class="black">{{item.order_num}}</text>
							</view>
							<view class="shu"></view>
							<view @click="fuzhi" class="txt2">复制</view>
						</view>
						<view @click="toXiangqin(1)" class="tit1-3">查看详情</view>
					</view>

					<view class="tit2">
						<view class="txt1">
							服务类目：<text class="black">{{item.item_name}}</text>
						</view>
					</view>
					<view class="tit2">
						<view class="txt1">
							下单时间：<text class="black">2021-07-22 14:39</text>
						</view>
					</view>
					<view class="heng"></view>
					<view class="tit5">
						<view class="txt1" @click="quxiaoDD('1')">取消订单</view>
						<view class="txt2">去支付</view>
					</view>
				</template>
				<!-- 待发货 -->
				<template>
					<view class="tit11">
						<view class="tit1">待发货</view>
					</view>
					<view class="titt">
						<view class="tit2">
							<view class="txt1">
								订单编号：<text class="black">{{item.order_num}}</text>
							</view>
							<view class="shu"></view>
							<view @click="fuzhi" class="txt2">复制</view>
						</view>
						<view @click="toXiangqin(1)" class="tit1-3">查看详情</view>
					</view>
					<view class="tit2">
						<view class="txt1">
							服务类目：<text class="black">{{item.item_name}}</text>
						</view>
					</view>
					<view class="tit2">
						<view class="txt1">
							下单时间：<text class="black">2021-07-22 14:39</text>
						</view>
					</view>
					<view class="heng"></view>
					<view class="tit5">
						<view class="txt1" @click="quxiaoDD('1')">取消订单</view>
						<view class="txt2">修改信息</view>
					</view>
				</template>
				<!-- 待收货 -->
				<template>
					<view class="tit11">
						<view class="tit1">待收货</view>
						<view class="tit1-1">
							商品正在配送中......
						</view>
					</view>
					<view class="titt">
						<view class="tit2">
							<view class="txt1">
								快递单号：<text class="black">{{item.order_num}}</text>
							</view>
							<view class="shu"></view>
							<view @click="fuzhi" class="txt2">复制</view>
						</view>
						<view @click="toXiangqin(1)" class="tit1-3">查看详情</view>
					</view>
					<view class="tit2">
						<view class="txt1">
							服务类目：<text class="black">{{item.item_name}}</text>
						</view>
					</view>
					<view class="tit2">
						<view class="txt1">
							下单时间：<text class="black">2021-07-22 14:39</text>
						</view>
					</view>
					<view class="heng"></view>
					<view class="tit5">
						<!-- <view class="txt1">删除订单</view> -->
						<view class="txt2">确认收货</view>
					</view>
				</template>
				<!-- 确认收货 -->
				<!-- <template>
					<view class="tit11">
						<view class="tit1">确认收货</view>
						<view class="tit1-2">已签收</view>
					</view>

					<view class="tit2">
						<view class="txt1">
							订单编号：<text class="black">{{item.order_num}}</text>
						</view>
						<view class="shu"></view>
						<view @click="fuzhi" class="txt2">复制</view>
					</view>
					<view class="tit2">
						<view class="txt1">
							服务类目：<text class="black">{{item.item_name}}</text>
						</view>
					</view>
					<view class="tit2">
						<view class="txt1">
							下单时间：<text class="black">2021-07-22 14:39</text>
						</view>
					</view>
					<view class="heng"></view>
					<view class="tit5">
						<view class="txt1 txt1-1">删除订单</view>
						<view class="txt4">售后</view>
						<view class="txt2">去评价</view>
					</view>
				</template> -->
				<!-- 售后 -->
				<template>
					<view class="tit11">
						<view class="tit1">售后</view>
						<view class="tit1-2">已退款</view>
					</view>

					<view class="tit2">
						<view class="txt1">
							订单编号：<text class="black">{{item.order_num}}</text>
						</view>
						<view class="shu"></view>
						<view @click="fuzhi" class="txt2">复制</view>
					</view>
					<view class="tit2">
						<view class="txt1">
							服务类目：<text class="black">{{item.item_name}}</text>
						</view>
					</view>
					<view class="tit2">
						<view class="txt1">
							下单时间：<text class="black">2021-07-22 14:39</text>
						</view>
					</view>
				</template>
				<!-- 待评价 -->
				<template>
					<view class="tit11">
						<view class="tit1">待评价</view>
						<view class="tit1-1" style="color:#D7373F ;">已签收</view>
					</view>

					<view class="titt">
						<view class="tit2">
							<view class="txt1">
								订单编号：<text class="black">{{item.order_num}}</text>
							</view>
							<view class="shu"></view>
							<view @click="fuzhi" class="txt2">复制</view>
						</view>
						<view @click="toXiangqin(1)" class="tit1-3">查看详情</view>
					</view>
					<view class="tit2">
						<view class="txt1">
							服务类目：<text class="black">{{item.item_name}}</text>
						</view>
					</view>
					<view class="tit2">
						<view class="txt1">
							下单时间：<text class="black">2021-07-22 14:39</text>
						</view>
					</view>
					<view class="heng"></view>
					<view class="tit5">
						<!-- <view class="img">
							<image class="pic1" src="/static/img/1229310763000_mthumb.png" mode=""></image>
							<view class="tit111">
								<view class="txt11-1">李师傅</view>
								<view class="txt11-2">￥200.00</view>
							</view>
						</view> -->
						<view class="txt1 txt1-2">删除订单</view>
						<view class="txt4">售后</view>
						<view @click="toPingjia" class="txt2">去评价</view>
					</view>
				</template>

			</view>
		</view>
		<view v-if="current == 1" class="items">
			<view class="item" v-for="item in list" :key='item.id'>
				<!-- 订单已取消 -->
				<template v-if="item.status == -1">
					<view class="tit11">
						<view class="tit1">订单已取消</view>
						<view @click="toXiangqin(2,item.id)" class="tit1-3">查看详情</view>
					</view>
					<view class="tit2">
						<view class="txt1">
							订单编号：<text class="black">{{item.order_num}}</text>
						</view>
						<view class="shu"></view>
						<view @click="fuzhi(item.order_num)" class="txt2">复制</view>
					</view>
					<view class="tit2">
						<view class="txt1">
							服务类目：<text class="black">{{item.item_name}}</text>
						</view>
					</view>
					<view class="tit2">
						<view class="txt1 yxq">
							下单时间：<text class="black">{{item.created_at}}</text>
						</view>
					</view>
					<view class="heng"></view>
				</template>
				<!-- 发布订单 -->
				<!-- <template>
					<view class="tit11">
						<view class="tit1">发布订单</view>
						<view class="tit1-3">查看详情</view>
					</view>
					<view class="tit2">
						<view class="txt1">
							订单编号：<text class="black">{{item.order_num}}</text>
						</view>
						<view class="shu"></view>
						<view @click="fuzhi" class="txt2">复制</view>
					</view>
					<view class="tit2">
						<view class="txt1">
							服务类目：<text class="black">{{item.item_name}}</text>
						</view>
					</view>
					<view class="tit2">
						<view class="txt1">
							下单时间：<text class="black">2021-07-22 14:39</text>
						</view>
					</view>
					<view class="tit3">
						<image class="pic1" src="/static/img/1229310763000_mthumb.png" mode=""></image>
						<view class="txt1">
							<view class="txt1-1">1位师傅已报价</view>
							<u-icon name="arrow-right" color="#707070" size="20"></u-icon>
						</view>
					</view>
					<view class="tit4">￥200.00</view>
					<view class="heng"></view>
					<view class="tit5">
						<view class="txt3">倒计时：23:59:59</view>
						<view class="txt1">删除订单</view>
						<view class="txt2">重新发布</view>
					</view>
				</template> -->
				<!-- 未选择师傅 -->
				<template v-if="item.status == 0 && !item.order">
					<view class="tit11">
						<view class="tit1">未选择师傅</view>
						<view @click="toXiangqin(2,item.id)" class="tit1-3">查看详情</view>
					</view>
					<view class="tit2">
						<view class="txt1">
							订单编号：<text class="black">{{item.order_num}}</text>
						</view>
						<view class="shu"></view>
						<view @click="fuzhi(item.order_num)" class="txt2">复制</view>
					</view>
					<view class="tit2">
						<view class="txt1">
							服务类目：<text class="black">{{item.item_name}}</text>
						</view>
					</view>
					<view class="tit2">
						<view class="txt1">
							下单时间：<text class="black">{{item.created_at}}</text>
						</view>
					</view>
					<view class="tit3">
						<image class="pic1" mode=""></image>
						<view class="txt1">
							<!-- <view v-if="!ischooseShifu" class="txt1-1">1位师傅已报价</view>
							<view v-else class="txt1-1">师傅已接单</view> -->
							<view v-if="item.quotes_count == 0" class="txt1-1">暂无师傅报价</view>
							<view v-else @click="toxuanzeshifu(item.id)" class="txt1-1">{{item.quotes_count}}位师傅已报价
							</view>
							<u-icon v-if="item.quotes_count != 0" @click="toxuanzeshifu(item.id)" name="arrow-right"
								color="#707070" size="20"></u-icon>
						</view>
					</view>
					<!-- <view class="tit4">￥200.00</view> -->
					<view class="heng"></view>
					<view class="tit5">
						<view v-if="!ischooseShifu" class="txt3">倒计时：23:59:59</view>
						<view class="txt1" @click="quxiaoDD('2',item)">取消订单</view>
						<view @click="toxuanzeshifu(item.id,item.quotes_count)"
							:class="{'txt2':true,'active':!ischooseShifu}">选择师傅</view>
					</view>
				</template>
				<!-- 等待付款 -->
				<template v-if="item.status == 1 && !item.order || item.order.status == 0">
					<view class="tit11">
						<view class="tit1">等待付款</view>
						<view @click="toXiangqin(2,item.id)" class="tit1-3">查看详情</view>
					</view>
					<view class="tit2">
						<view class="txt1">
							订单编号：<text class="black">{{item.order_num}}</text>
						</view>
						<view class="shu"></view>
						<view @click="fuzhi(item.order_num)" class="txt2">复制</view>
					</view>
					<view class="tit2">
						<view class="txt1">
							服务类目：<text class="black">{{item.item_name}}</text>
						</view>
					</view>
					<view class="tit2">
						<view class="txt1">
							下单时间：<text class="black">{{item.created_at}}</text>
						</view>
					</view>
					<view class="tit3">
						<image v-if="item.selected_quote.user_info.avatar" class="pic1"
							:src="item.selected_quote.user_info.avatar" mode=""></image>
						<image v-else class="pic1" src="/static/img/1229310763000_mthumb.png" mode=""></image>
						<view class="txt1" @click="toxuanzeshifu(item.id)">
							<!-- <view v-if="!ischooseShifu" class="txt1-1">1位师傅已报价</view> -->
							<!-- <view v-else class="txt1-1">师傅已接单</view>
							<u-icon name="arrow-right" color="#707070" size="20"></u-icon> -->
						</view>
					</view>
					<view class="tit4">￥{{item.selected_quote.price}}</view>
					<view class="heng"></view>
					<view class="tit5">
						<view v-if="!ischooseShifu" class="txt3">倒计时：23:59:59</view>
						<view class="txt1" @click="quxiaoDD('2',item)">取消订单</view>
						<view @click="toPay(item)" :class="{'txt2':true,'active':!ischooseShifu}">去支付</view>
					</view>
				</template>
				<!-- 确认收货 -->
				<!-- <template>
					<view class="tit11">
						<view class="tit1">确认收货</view>
						<view class="tit1-2" style="transform: translateX(180rpx);">已签收</view>
						<view class="tit1-3">查看详情</view>
					</view>

					<view class="tit2">
						<view class="txt1">
							订单编号：<text class="black">{{item.order_num}}</text>
						</view>
						<view class="shu"></view>
						<view @click="fuzhi" class="txt2">复制</view>
					</view>
					<view class="tit2">
						<view class="txt1">
							服务类目：<text class="black">{{item.item_name}}</text>
						</view>
					</view>
					<view class="tit2">
						<view class="txt1">
							下单时间：<text class="black">2021-07-22 14:39</text>
						</view>
					</view>
					<view class="tit3">
						<image class="pic1" src="/static/img/1229310763000_mthumb.png" mode=""></image>
					</view>
					<view class="tit4">￥200.00</view>
					<view class="heng"></view>
					<view class="tit5">
						<view class="txt1">删除订单</view>
						<view class="txt2">已收货</view>
					</view>
				</template> -->
				<!-- 等待上门 -->
				<template v-if="item.order.status == 1">
					<view class="tit11">
						<view class="tit1">等待上门</view>
						<view @click="toXiangqin(2,item.id)" class="tit1-3">查看详情</view>
					</view>
					<view class="tit2">
						<view class="txt1">
							订单编号：<text class="black">{{item.order_num}}</text>
						</view>
						<view class="shu"></view>
						<view @click="fuzhi(item.order_num)" class="txt2">复制</view>
					</view>
					<view class="tit2">
						<view class="txt1">
							服务类目：<text class="black">{{item.item_name}}</text>
						</view>
					</view>
					<view class="tit2">
						<view class="txt1">
							服务时间：<text class="black">{{item.expect_start_date}}</text>
						</view>
					</view>
					<view class="tit3">
						<view class="txt3-1">
							<image class="pic1" v-if="item.selected_quote.user_info.avatar" :src="item.selected_quote.user_info.avatar" mode=""></image>
							<image class="pic1" v-else src="/static/img/1229310763000_mthumb.png" mode=""></image>
							<view class="txt33">
								<view class="txt3-1-1">请尽快与{{item.selected_quote.user_info.nick_name}}师傅协商具体上门信息</view>
								<view class="txt3-1-2">￥{{item.order.actual_price}}</view>
							</view>
						</view>
						<image @click="callPhone(item.selected_quote.user.phone)" class="picc"
							src="/static/img/zu61.png" mode=""></image>
					</view>
					<view class="heng"></view>
					<view class="tit5">
						<view class="txt5">
							<view class="txt5-1">请勿提前将服务码</view>
							<view class="txt5-1">提前告知师傅以免造成损失</view>
						</view>
						<!-- <view class="txt1">删</view> -->
						<view @click="clickfwm(item.order.code)" class="fwm txt2">服务码</view>
					</view>
				</template>
				<!-- 正在服务 -->
				<template v-if="item.order.status == 3">
					<view class="tit11">
						<view class="tit1">正在服务</view>
						<view @click="toXiangqin(2,item.id)" class="tit1-3">查看详情</view>
					</view>
					<view class="tit2">
						<view class="txt1">
							订单编号：<text class="black">{{item.order_num}}</text>
						</view>
						<view class="shu"></view>
						<view @click="fuzhi(item.order_num)" class="txt2">复制</view>
					</view>
					<view class="tit2">
						<view class="txt1">
							服务类目：<text class="black">{{item.item_name}}</text>
						</view>
					</view>
					<view class="tit2">
						<view class="txt1">
							服务时间：<text class="black">{{item.expect_start_date}}</text>
						</view>
					</view>

					<view class="heng"></view>
					<view class="tit5">
						<view class="img">
							<image class="pic1" v-if="item.selected_quote.user_info.avatar" :src="item.selected_quote.user_info.avatar" mode=""></image>
							<image class="pic1" v-else src="/static/img/1229310763000_mthumb.png" mode=""></image>
							<view class="tit111">
								<view class="txt11-1">{{item.selected_quote.user_info.nick_name}}师傅</view>
								<view class="txt11-2">￥{{item.order.actual_price}}</view>
							</view>
						</view>
						<!-- <view class="txt1 txt1-2">删除订单</view> -->
						<!-- <view class="txt1 zzfw txt1-3">售后</view> -->
						<view class="txt2 zzfw">售后</view>
					</view>
				</template>
				<!-- 已完成 -->
				<template v-if="item.order.status == 4">
					<view class="tit11">
						<view class="tit1">已完成</view>
						<view @click="toXiangqin(2,item.id)" class="tit1-3">查看详情</view>
					</view>
					<view class="tit2">
						<view class="txt1">
							订单编号：<text class="black">{{item.order_num}}</text>
						</view>
						<view class="shu"></view>
						<view @click="fuzhi(item.order_num)" class="txt2">复制</view>
					</view>
					<view class="tit2">
						<view class="txt1">
							服务类目：<text class="black">{{item.item_name}}</text>
						</view>
					</view>
					<view class="tit2">
						<view class="txt1">
							服务时间：<text class="black">{{item.expect_start_date}}</text>
						</view>
					</view>

					<view class="heng"></view>
					<view class="tit5">
						<view class="img">
							<image class="pic1" v-if="item.selected_quote.user_info.avatar" :src="item.selected_quote.user_info.avatar" mode=""></image>
							<image class="pic1" v-else src="/static/img/1229310763000_mthumb.png" mode=""></image>
							<view class="tit111">
								<view class="txt11-1">{{item.selected_quote.user_info.nick_name}}师傅</view>
								<view class="txt11-2">￥{{item.order.actual_price}}</view>
							</view>
						</view>
						<!-- <view class="txt1 txt1-2">删除订单</view> -->
						<view v-if="(item.order.comments_count == 0)" @click="toPingjia(item.order.id,item.selected_quote.user_info.nick_name,item.selected_quote.user_info.avatar)" class="txt2 ywc">去评价</view>
						<view v-if="(item.order.comments_count == 1)" @click="seePingjia(item.order.id)" class="txt2 ywc">查看评价</view>
					</view>
				</template>
			</view>
			<u-loadmore :status="status" :icon-type="iconType" :load-text="loadText" />
		</view>
		<!-- 直接购买 -->
		<u-popup class='zjgmShow' z-index="9" v-model="zjgmShow" mode="bottom" border-radius="34">
			<view class="zjgmShow2">
				<view class="item" @click="changeMyRadio('wx')">
					<view class="tit1">
						<u-icon name="weixin-circle-fill" color="#41B035" size="24"></u-icon>
						<view class="txt1">微信支付</view>
					</view>
					<view v-if="isMyRadio == 'wx'" class="tit2">
						<view class="tit2-1"></view>
					</view>
					<view v-else class="tit3"></view>
				</view>
				<view class="item" @click="changeMyRadio('yue')">
					<view class="tit1">
						<u-icon name="rmb-circle-fill" color="#FF6F00" size="24"></u-icon>
						<view class="txt1">余额支付</view>
					</view>
					<view v-if="isMyRadio == 'yue'" class="tit2">
						<view class="tit2-1"></view>
					</view>
					<view v-else class="tit3"></view>
				</view>
				<view class="footer">
					<view class="right">
						<view class="tit1">
							￥{{Number(itemPrice)}}
						</view>
					</view>
					<view @click="pay" class="left">支付</view>
				</view>
			</view>

		</u-popup>
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex";
	export default {
		computed: {
			...mapState(["dingdanPage", "dingdanPageSize"]),
		},
		watch: {
			dingdanPage: function(page) {
				console.log('ddpage')
				this.$store.commit("dingdanPage", page);
				if (this.dingdanPage != 1) {
					this.getData();
				}
			},
		},
		data() {
			return {
				qxDDitem: null,
				orderItemcode: '', //服务码
				itemId: null,
				itemPrice: 0,
				isMyRadio: 'wx',
				zjgmShow: false,
				list: [],
				quxiaoStatus: '1',
				quxxiaoDDRal: '',
				quxiaoDDshow: false,
				ischooseShifu: true,
				popupShow: false,
				maskshow: false,
				chooseTop1: false,
				chooseTop2: false,
				top1Value: '',
				top2Value: '',
				current: 0,
				// 加载
				status: 'loadmore',
				iconType: 'flower',
				loadText: {
					loadmore: '上拉加载更多',
					loading: '正在加载...',
					nomore: '没有了更多了'
				},
			}
		},
		async onShow() {
			this.top1Value = '';
			this.top2Value = '';
			this.list = [];
			this.getData()
			this.$store.commit("dingdanPage", 1);
		},
		onReachBottom() {
			this.$store.commit("dingdanPage", this.dingdanPage + 1);
		},
		methods: {
			async getData() {
				this.status = 'loading';
				if (this.clock) {
					this.list = [];
					this.clock = false;
				}
				setTimeout(async () => {
					const res = await this.$api.getDemandQuotesList({
						page: this.dingdanPage,
						limit: this.dingdanPageSize,
					})
					console.log(res)
					if (res.data.data.length == 0) {
						this.status = 'nomore'
					} else {
						this.status = 'loadmore';
						console.log(this.list)
						this.list = this.list.concat(res.data.data)
					}
				}, 200)
				console.log(this.list)
			},
			callPhone(phone) {
				uni.makePhoneCall({
					phoneNumber: phone
				});
			},
			changeMyRadio(val) {
				this.isMyRadio = val;
			},
			clickfwm(code) {
				console.log(code)
				this.popupShow = true;
				this.orderItemcode = code;
			},
			async pay() {
				const res = await this.$api.pay({
					order_id: this.itemId,
					pay_type: this.isMyRadio == 'wx' ? 1 : 0,
				})
				console.log(res)
				if (res.code == 200) {
					this.$refs.uToast.show({
						title: '支付成功',
						type: 'success',
					})
					this.zjgmShow = false;
					this.list = [];
					this.$store.commit("dingdanPage", 1);
					this.getData()
				} else {
					this.$refs.uToast.show({
						title: res.msg,
						type: 'warning',
					})
				}
			},
			toPay(item) {
				if (item.order) {
					this.itemPrice = item.order.actual_price;
					this.zjgmShow = true;
					this.itemId = item.order.id
				} else {
					if (!this.ischooseShifu) {
						this.$refs.uToast.show({
							title: '请先选择师傅',
							type: 'warning',
						})
					} else {
						uni.navigateTo({
							url: `/pages/index/dingdantijiao/dingdantijiao?id=${item.id}`,
						})
					}
				}

			},
			toPingjia(id,name,img) {
				uni.navigateTo({
					url: `/pages/dingdan/pingjia/pingjia?id=${id}&name=${name}&img=${img}`
				})
			},
			seePingjia(id){
				uni.navigateTo({
					url: `/pages/dingdan/pingjia/pingjia?id=${id}`
				})
			},
			quxiaoDD(i, item) {
				this.quxiaoStatus = i;
				this.quxiaoDDshow = true;
				this.qxDDitem = item;
			},
			async quxiaoDDSubmit() {
				const res = await this.$api.demandQuotesIidCancel({
					id: this.qxDDitem.id,
					cancel_reason: this.quxxiaoDDRal
				});
				if (res.code == 200) {
					this.$refs.uToast.show({
						title: '取消订单成功',
						type: 'success',
						callback: () => {
							this.list = [];
							this.$store.commit("dingdanPage", 1);
							this.getData()
							this.quxiaoDDshow = false;
						},
					})
				}
			},
			radioGroupChange() {
				console.log(this.quxxiaoDDRal)
			},
			toXiangqin(val, id) {
				uni.navigateTo({
					url: `/pages/dingdan/chakanxiangqin/chakanxiangqin?status=${val}&id=${id}`
				})
			},
			toxuanzeshifu(id, val = 1) {
				if (val == 0) {
					this.$refs.uToast.show({
						title: '暂未有师傅接单',
						type: 'warning',
					})
				} else {
					uni.navigateTo({
						url: `/pages/dingdan/xuanzeshifu/xuanzeshifu?id=${id}`
					})
				}
			},
			chooesTop(val) {
				this.maskshow = true;
				if (val == 1) {
					this.chooseTop2 = false;
					this.chooseTop1 = true;
				} else {
					this.chooseTop1 = false;
					this.chooseTop2 = true;
				}
			},
			onMask() {
				this.maskshow = false;
				this.chooseTop1 = false;
				this.chooseTop2 = false;
			},
			cTop1Btn1(val) {
				this.current = 0;
				this.top1Value = val;
				this.top2Value = '';
				this.chooseTop1 = false;
				this.maskshow = false;
			},
			closeTop1() {
				this.top1Value = '';
			},
			cTop2Btn1(val) {
				this.current = 1;
				this.top2Value = val;
				this.top1Value = '';
				this.chooseTop2 = false;
				this.maskshow = false;
			},
			closeTop2() {
				this.top2Value = '';
			},
			fuzhi(e) {
				uni.setClipboardData({
					data: e,
				});
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: #F0F0F0;
	}
</style>
<style scoped lang="scss">
	.index {
		position: relative;
	}

	/deep/ .u-load-more-wrap {
		height: 80rpx !important;
	}

	.pop {
		height: 100%;
		width: 100%;
		padding: 0 42rpx;
		position: relative;

		.pop-tit {
			text-align: center;
			margin-bottom: 40rpx;
			margin-top: 20rpx;
			font-size: 36rpx;
			font-family: Segoe UI;
			font-weight: 400;
			line-height: 48rpx;
			color: #000000;
		}

		/deep/ .u-radio {
			margin-bottom: 6rpx;

			.u-radio__label {
				margin-left: 30rpx;
				color: #000000;
			}
		}

		.pop-btn {
			position: absolute;
			bottom: 64rpx;
			left: 128rpx;
			width: 304rpx;
			height: 76rpx;
			background: #1677FF;
			border-radius: 48rpx;
			text-align: center;
			line-height: 76rpx;
			font-size: 40rpx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #FFFFFF;
		}
	}

	.txtt1 {
		margin-top: 34rpx;
		text-align: center;
		font-size: 128rpx;
		font-family: SimHei;
		font-weight: 400;
		line-height: 172rpx;
		color: #4988FD;
	}

	.txtt2 {
		text-align: center;
		font-size: 20rpx;
		font-family: Segoe UI;
		font-weight: 400;
		line-height: 36rpx;
		color: #999999;
	}

	.nav1 {
		position: fixed;
		top: 0rpx;
		z-index: 2;
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 750rpx;
		height: 84rpx;
		background: #FFFFFF;
		opacity: 1;
		padding: 0 216rpx;

		.tit1 {
			font-size: 28rpx;
			font-family: Segoe UI;
			font-weight: 400;
			line-height: 38rpx;
			color: #000000;
		}

		.tit1.active {
			font-size: 32rpx;
			font-family: Segoe UI;
			font-weight: 400;
			line-height: 42rpx;
			color: #4988FD;
		}

		// /deep/ .u-tag{
		// 	transform: translateX(30rpx);
		// }
	}

	.nav2 {
		position: fixed;
		top: 80rpx;
		z-index: 2;
		width: 750rpx;
		height: 164rpx;
		background: #FFFFFF;
		padding-top: 20rpx;

		.btn {
			display: inline-block;
			width: 136rpx;
			height: 44rpx;
			background: #F0F0F0;
			border-radius: 30rpx;
			font-size: 24rpx;
			font-family: Segoe UI;
			font-weight: 400;
			line-height: 44rpx;
			text-align: center;
			color: #707070;
			margin-bottom: 20rpx;
			margin-left: 22rpx;
		}

		.btn.active {
			background: #4988FD;
			color: #FFFFFF;
		}
	}

	.items {
		padding-top: 90rpx;

		.item {
			margin-top: 20rpx;
			padding: 26rpx 22rpx 0 22rpx;
			background: #FFFFFF;

			.tit11 {
				display: flex;
				align-items: center;
				justify-content: space-between;
			}

			.tit1 {
				// padding-top: 26rpx;
				font-size: 32rpx;
				font-family: Segoe UI;
				font-weight: 400;
				line-height: 42rpx;
				color: #000000;
			}

			.tit1-1 {
				// padding-top: 26rpx;
				font-size: 24rpx;
				font-family: Segoe UI;
				font-weight: 400;
				color: #FF6F00;
			}

			.tit1-2 {
				// padding-top: 26rpx;
				font-size: 24rpx;
				font-family: Segoe UI;
				font-weight: 400;
				color: #D7373F;
			}

			.tit1-3 {
				// padding-top: 26rpx;
				font-size: 24rpx;
				font-family: Segoe UI;
			}

			.titt {
				align-items: center;
				display: flex;
				justify-content: space-between;
			}

			.tit2 {
				margin-top: 20rpx;
				display: flex;
				align-items: center;

				.txt1 {
					font-size: 20rpx;
					font-family: Segoe UI;
					font-weight: 400;
					line-height: 28rpx;
					color: #999999;
					
					.black {
						color: #000000;
					}
				}
				.txt1.yxq{
					margin-bottom: 10rpx;
				}

				.shu {
					height: 16rpx;
					border: 2rpx solid #E6E6E6;
					margin: 0 10rpx 0 20rpx;
				}

				.txt2 {
					font-size: 24rpx;
					font-family: Segoe UI;
					font-weight: 400;
					line-height: 32rpx;
					color: #4988FD;
				}
			}

			.tit3 {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-top: 24rpx;

				.txt3-1 {
					display: flex;
					align-items: center;

					.txt33 {
						margin-left: 20rpx;

						.txt3-1-1 {
							font-size: 24rpx;
							font-family: Segoe UI;
							font-weight: 400;
							line-height: 32rpx;
							color: #D7373F;
						}

						.txt3-1-2 {
							margin-top: 12rpx;
							font-size: 24rpx;
							font-family: Segoe UI;
							font-weight: 400;
							line-height: 32rpx;
							color: #4988FD;
						}
					}
				}

				.picc {
					width: 50rpx;
					height: 50rpx;
				}

				.pic1 {
					width: 76rpx;
					height: 76rpx;
					background: #FFFFFF;
					border-radius: 50%;
				}

				.txt1 {
					display: flex;
					align-items: center;

					.txt1-1 {
						font-size: 24rpx;
						font-family: Segoe UI;
						font-weight: 400;
						line-height: 32rpx;
						color: #000000;
						margin-right: 16rpx;
					}
				}
			}

			.tit4 {
				margin-top: 6rpx;
				font-size: 24rpx;
				font-family: Segoe UI;
				font-weight: 400;
				line-height: 32rpx;
				color: #4988FD;
			}

			.heng {
				margin-top: 16rpx;
				width: 750rpx;
				border: 2rpx solid #E6E6E6;
				transform: translateX(-22rpx);
			}

			.tit5 {
				position: relative;
				height: 114rpx;
				width: 750rpx;
				display: flex;
				align-items: center;
				// 正在服务
				.zzfw.txt2{
					position: absolute;
					top: 50%;
					transform: translateY(-50%);
					right: 44rpx;
				}
				// 已完成
				.ywc.txt2{
					position: absolute;
					top: 50%;
					transform: translateY(-50%);
					right: 44rpx;
				}
				.img {
					display: flex;
					align-items: center;

					.pic1 {
						width: 76rpx;
						height: 76rpx;
						background: #FFFFFF;
						border-radius: 50%;
					}

					.tit111 {
						margin-left: 20rpx;

						.txt11-1 {
							font-size: 24rpx;
							font-family: Segoe UI;
							font-weight: 400;
							line-height: 32rpx;
							color: #000000;
						}

						.txt11-2 {
							margin-top: 12rpx;
							font-size: 24rpx;
							font-family: Segoe UI;
							font-weight: 400;
							line-height: 32rpx;
							color: #4988FD;
						}
					}
				}

				.txt4 {
					font-size: 24rpx;
					font-family: Segoe UI;
					font-weight: 400;
					color: #707070;
					margin-right: 44rpx;
				}

				.txt1.txt1-3 {
					margin-left: 228rpx;
				}

				.txt1.txt1-1 {
					margin-left: 104rpx;
					margin-right: 42rpx;
				}

				.txt1.txt1-2 {
					margin-left: 296rpx;
					margin-right: 42rpx;
				}

				.txt1 {
					margin-left: 370rpx;
					margin-right: 62rpx;
					font-size: 24rpx;
					font-family: Segoe UI;
					font-weight: 400;
					color: #707070;
				}

				.fwm.txt2 {
					margin-left: 528rpx;
				}

				.txt2 {
					width: 176rpx;
					height: 56rpx;
					background: #4988FD;
					border-radius: 28rpx;
					font-size: 24rpx;
					font-family: Segoe UI;
					text-align: center;
					font-weight: 400;
					line-height: 56rpx;
					color: #FFFFFF;
				}
				.txt2.cxfb{
					margin-left: 528rpx;
				}
				.txt2.active {
					background: #cccccc;
				}

				.txt3 {
					position: absolute;
					font-size: 32rpx;
					font-family: Segoe UI;
					font-weight: 400;
					line-height: 42rpx;
					color: #D7373F;
				}

				.txt5 {
					position: absolute;

					.txt5-1 {
						font-size: 20rpx;
						font-family: Segoe UI;
						font-weight: 400;
						line-height: 28rpx;
						color: #FF6F00;
					}
				}
			}
		}
	}

	.zjgmShow2 {
		margin-top: 20rpx;
		background: #FFFFFF;

		.item {
			padding: 0 24rpx 0 44rpx;
			height: 66rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.tit1 {
				height: 66rpx;
				display: flex;
				align-items: center;

				.txt1 {
					margin-left: 18rpx;
					font-size: 24rpx;
					font-family: Segoe UI;
					font-weight: 400;
					line-height: 32rpx;
					color: #000000;
				}
			}

			.tit2 {
				width: 22rpx;
				height: 22rpx;
				border: 2rpx solid #4988FD;
				border-radius: 50%;
				display: flex;
				align-items: center;
				justify-content: center;

				.tit2-1 {
					width: 14rpx;
					height: 14rpx;
					background: #4988FD;
					border-radius: 50%;
				}
			}

			.tit3 {
				width: 22rpx;
				height: 22rpx;
				border: 2rpx solid #707070;
				border-radius: 50%;
			}
		}

		.footer {
			width: 750rpx;
			height: 104rpx;
			background: #FFFFFF;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.right {
				.tit1 {
					margin-left: 38rpx;
					font-size: 48rpx;
					font-family: Microsoft YaHei;
					font-weight: 400;
					line-height: 32rpx;
					color: #FF6F00;
					font-weight: 600;

					.small {
						font-weight: 400;
						font-size: 24rpx;
					}
				}
			}

			.left {
				width: 236rpx;
				height: 104rpx;
				background: #4988FD;
				border-radius: 24rpx 0px 0px 0px;
				font-size: 48rpx;
				font-family: Segoe UI;
				font-weight: 400;
				line-height: 104rpx;
				color: #FFFFFF;
				text-align: center;
			}
		}

	}
</style>
