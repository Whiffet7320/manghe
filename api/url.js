export default {
	baseUrl: 'http://192.168.50.142:8098', // http://192.168.50.142:8098
	silence_auth: "/api/v2/wechat/silence_auth_login",
	user: "/api/user",
	user_update: "/api/v2/user/user_update",
	updatePhone:"/api/user/updatePhone",
	verifyCode:"/api/verify_code",
	registerVerify:"/api/register/verify",
	addressList: "/api/address/list",
	editAddress: "/api/address/edit",
	delAddress: "api/address/del",
	city_list: "/api/city_list",
	addressDetail: "/api/address/detail",
	cartlist:"/api/cart/list",
	// 
	loginWechat: '/api/login/wechat',
	category: '/api/category', //商品分类
	products: '/api/products', //商品列表
	detail: '/api/product/detail', //商品详情
	cartAdd: '/api/cart/add', //添加到购物车
	orderConfirm:'/api/order/confirm',//订单确认
	orderCreate:'/api/order/create',//订单创建
	orderList:'/api/order/list',//订单列表
	orderPay:'/api/order/pay',//订单支付
}
