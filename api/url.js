export default {
	baseUrl: 'http://192.168.50.96:8001',
	// baseUrl:'https://hii7mo3m.dnat.tech',
	// baseUrl:'https://fenxiao.5laoye.com',
	loginWechat: '/api/login/wechat',
	categories: '/api/categories', //分类页面
	cities: '/api/cities', //城市列表
	home: '/api/home', //首页接口
	items:'/api/items',//获取商品详情
	uploadToken:'/api/upload/token',//上传测试
	demandQuotes:'/api/demand-quotes',//生成报价需求单
	address:'/api/address',//地址列表
	addressAdd:'/api/address',//新增地址
	addressEdit:'/api/address',//修改地址
	addressXq:'/api/address',//地址详情
	config:'/api/config',//全局设置
	userInfo:'/api/user-info',//修改用户信息
	getDemandQuotes:'/api/demand-quotes',//用户需要报价单详情
	getDemandQuotesList:'/api/demand-quotes',//用户服务订单列表
	getDemandQuotesListXq:'/api/demand-quotes',//用户需要报价单详情
	selectDemandQuotes:'/api/demand-quotes',//选择师傅
}
