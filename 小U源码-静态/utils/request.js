export const api = "http://localhost:3000"
//获取一级分类信息(首页快速分类导航)
export async function cateRequest() {
	return await uni.request({
		url: api + "/api/getcate",
		method: "get"
	})
}
// 获取商品全部分类信息(首页全部分类，数据呈递归树状)
export async function cateListRequest() {
	return await uni.request({
		url: api + "/api/getcates",
		method: "get"
	})
}

//获取轮播图信息(首页)
export async function slideshowRequest() {
	return await uni.request({
		url: api + "/api/getbanner",
		method: "get"
	})
}

//获取限时秒杀信息(首页)
export async function seckillRequest() {
	return await uni.request({
		url: api + "/api/getseckill",
		method: "get"
	})
}

//获取商品信息(首页)
export async function goodsRequest() {
	return new Promise((resolve, reject) => {
		uni.request({
			url: api + "/api/getindexgoods",
			method: "get",
			success: res => {
				resolve(res)
			},
			fail: err => {
				reject(err)
			}
		})

	})
}
//获取一个商品信息
export async function goodInfoRequest(data) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: api + "/api/getgoodsinfo",
			method: "get",
			data: data,
			success: res => {
				resolve(res)
			},
			fail: err => {
				reject(err)
			}
		})

	})
}

//获取一级分类下的所有商品
export async function categoodsRequest(data) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: api + "/api/getcategoods",
			method: "get",
			data: data,
			success: res => {
				resolve(res)
			},
			fail: err => {
				reject(err)
			}
		})

	})
}

//搜索（like模糊搜索）
export async function searchRequest(data) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: api + "/api/search",
			method: "get",
			data: data,
			success: res => {
				resolve(res)
			},
			fail: err => {
				reject(err)
			}
		})

	})
}
// 会员注册
export async function register(data){
	return new Promise((resolve, reject) => {
		uni.request({
			url: api + "/api/register",
			method: "POST",
			data: data,
			success: res => {
				resolve(res)
			},
			fail: err => {
				reject(err)
			}
		})
	})
}

// 会员登录
export async function login(data){
	return new Promise((resolve, reject) => {
		uni.request({
			url: api + "/api/login",
			method: "POST",
			data: data,
			success: res => {
				resolve(res)
			},
			fail: err => {
				reject(err)
			}
		})
	})
}

// 购物车添加
export async function cartadd(data,header){
	return new Promise((resolve, reject) => {
		uni.request({
			url: api + "/api/cartadd",
			method: "GET",
			data: data,
			header:header,
			success: res => {
				resolve(res)
			},
			fail: err => {
				reject(err)
			}
		})
	})
}
// 购物车列表
export async function cartList(data,header){
	return new Promise((resolve, reject) => {
		uni.request({
			url: api + "/api/cartlist",
			method: "GET",
			data: data,
			header:header,
			success: res => {
				resolve(res)
			},
			fail: err => {
				reject(err)
			}
		})
	})
}

// 购物车修改
export async function cartUpdate(data,header){
	return new Promise((resolve, reject) => {
		uni.request({
			url: api + "/api/cartedit",
			method: "GET",
			data: data,
			header:header,
			success: res => {
				resolve(res)
			},
			fail: err => {
				reject(err)
			}
		})
	})
}

// 购物车删除
export async function cartDelete(data,header){
	return new Promise((resolve, reject) => {
		uni.request({
			url: api + "/api/cartdelete",
			method: "GET",
			data: data,
			header:header,
			success: res => {
				resolve(res)
			},
			fail: err => {
				reject(err)
			}
		})
	})
}
// 订单添加
export async function addOrders(data, header = {}){
	return new Promise((resolve, reject) => {
		uni.request({
			url: api + "/api/orderadd",
			method: "GET",
			data:data,
			header: header,
			success: res => {
				resolve(res)
			},
			fail: err => {
				reject(err)
			}
		})
	})
}
// 订单查询
export async function ordersList(data,header){
	return new Promise((resolve, reject) => {
		uni.request({
			url: api + "/api/orders",
			method: "GET",
			data: data,
			header:header,
			success: res => {
				resolve(res)
			},
			fail: err => {
				reject(err)
			}
		})
	})
}
//发送短信验证码
export async function getSms(data){
	return new Promise((resolve, reject) => {
		uni.request({
			url: api + "/api/sms",
			method: "GET",
			data: data,
			success: res => {
				resolve(res)
			},
			fail: err => {
				reject(err)
			}
		})
	})
}
// 微信小程序登录注册（注册即登录  新用户登录	即注册，老用户即登录）
export async function wxlogin(data,header){
	return new Promise((resolve, reject) => {
		uni.request({
			url: api + "/api/wxlogin",
			method: "GET",
			data: data,
			header:header,
			success: res => {
				resolve(res)
			},
			fail: err => {
				reject(err)
			}
		})
	})
}
// 微信小程序登录注册（注册即登录  新用户登录	即注册，老用户即登录）
export async function checktoken(header){
	return new Promise((resolve, reject) => {
		uni.request({
			url: api + "/api/checktoken",
			method: "GET",
			header:header,
			success: res => {
				resolve(res)
			},
			fail: err => {
				reject(err)
			}
		})
	})
}