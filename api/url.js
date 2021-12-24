export default {
	baseUrl: 'http://192.168.50.142:9007', // http://192.168.50.142:8098  //https://ceshi.xingmangkeji.cn
	userInfo: "/api/user_info", //用户信息
	loginWechat: '/api/mini_login',//微信登录
	updateUserInfo:"/api/update_user_info",//修改用户信息
	product:'/api/product_detail',//商品信息
	login:'/api/login',//账户密码登录
	saveAddress:"/api/save_address",//地址新增/编辑
	addressList:"/api/address_list",//收货地址
	delAddress:"/api/del_address",//删除收货地址
	orderPay:"/api/order_pay", //立即购买
	yzrealName:"/api/real_name",//实名验证
	send_sms:'/api/send_sms',//发送短信
	register:'/api/register',//账户注册
	captch_login:'/api/captch_login',//验证码登录
	forgetpwd:'/api/forgetpwd',//忘记密码
	updatepwd:"/api/update_password",//修改密码
	bindBank:"/api/bind_bank",//绑定银行卡
	userBanklist:"/api/user_bank_list",//银行卡列表
	delBank:"/api/del_bank",//银行卡删除
	orderList:"/api/order_list",//订单列表
	confirmOrder:"/api/confirm_order",//确认收货
	delOrder:"/api/del_order",//删除订单
	notice:"/api/notice",//首页滚动消息
	recharge:'/api/recharge',//用户充值
	integral_list:'/api/integral_list',//积分列表
	withdraw_list:'/api/withdraw_list',//提现列表
	set_pay_password:'/api/set_pay_password',//设置支付密码
	spread:'/api/spread',//分享
	walletlist:"/api/wallet_list" //我的钱包
}
