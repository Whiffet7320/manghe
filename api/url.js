export default {
	baseUrl: 'http://192.168.50.142:9007', // http://192.168.50.142:8098  //https://ceshi.xingmangkeji.cn
	userInfo: "/api/user_info", //用户信息
	loginWechat: '/api/mini_login',//微信登录
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
	recharge:'/api/recharge',//用户充值
	integral_list:'/api/integral_list',//积分列表
	withdraw_list:'/api/withdraw_list',//提现列表
}
