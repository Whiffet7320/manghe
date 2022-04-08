export default {
	baseUrl: 'http://test2.hezhiqiangaixuexi.asia', 
	doLogin:'/user/doLogin',//登录操作
	getAddressList:'/user/getAddressList',//获取地址
	updateAddress:'/user/updateAddress',//添加/修改地址
	deleteAddress:'/user/deleteAddress',//删除地址
	getOrderList:'/order/getOrderList',//获取我的收纳盒
	getFreeBox:'/box/getFreeBox',//试玩开箱
	getAllBoxShop:'/shop/getAllBoxShop',//获取抽奖商品
	getBoxPrice:'/box/getBoxPrice',//获取箱子价格
	buyBox:'/box/buyBox',//购买箱子
	getShopBySubstitution:'/shop/getShopBySubstitution',//置换商城商品
	getShopInfo:'/shop/getShopInfo',//获取商品详情
	substitutionOrder:'/order/substitutionOrder',//置换商品
	getMallTop:'/shop/getMallTop',//获取置换商品分类
	changeOrderToPick:'/order/changeOrderToPick',//提取物品
	getHomeMessage:'/home/getHomeMessage',//获取首页相关信息
	changeOrderToDecompose:'/order/changeOrderToDecompose',//分解物品
	completeOrder:'/order/completeOrder',//确认收货
	getSystemInfo:'/system/getSystemInfo',//获取说明文字
	queryLogistics:'/order/queryLogistics',//查看物流
	getCardInfoByOrder:'/getCardInfoByOrder',//获取卡号卡密
}
