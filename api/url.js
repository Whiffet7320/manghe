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
	zhuanjia:'/api/zhuanjia',//专家列表
	xiufu:'/api/xiufu',//修复专区
	orderComputed:'/api/order/computed',//计算订单金额
	productHot:'/api/product/hot',//首页商品
	searchKeyword:'/api/search/keyword',//热搜词
	position:'/api/position',//首页城市列表
	banner:'/api/banner',//首页轮播图
	store_integralList:'/api/store_integral/list',//积分商品
	yanxuan_index:'/api/yanxuan_index',//严选商城首页-促销商品和团购商品
	combinationDetail:'/api/combination/detail',//拼团产品详情
	replyList:'/api/reply/list',//获取商品评论
	orderAgain:'/api/order/again',//再次购买
	orderTake:'/api/order/take',//订单收货
}
