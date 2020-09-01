<template>
	<view class="container">
		<!-- s收货地址 -->
		<view class="address">
			<view class="address_info">
				<label for="">收件人:{{username}}</label>
				<label for="">{{userphone}}</label>
			</view>
			<view class="address_res">
				收货地址：<label for="">{{address}}</label>
			</view>
		</view>

		<!-- 商品信息 -->
		<view class="carts">

			<view class="cartsInfo" v-for="(item,index) in cartList" :key="item.id">
				<!-- 70px -->
				<view class="carts_detail">
					<view class="carts_image">
						<image :src="$imgUrl+item.img" mode=""></image>
					</view>
					<view class="carts_name">
						<view for="" style="font-size: 30rpx;">{{item.goodsname}}</view>
						<view for="" style="font-size: 26rpx; color: #C0C0C0;">规格:300</view>
					</view>
					<view class="carts_price">
						<label for="">￥{{item.price}}</label>
					</view>
				</view>
				<!-- 50px -->
				<view class="cart_num">
					<view class="">
						购买数量：
					</view>
					<view class="">
						<label for="" class="jian" @click="minus(index)">-</label>
						<label for="" class="num">{{item.num}}</label>
						<label for="" class="jia" @click="add(index)">+</label>
					</view>
				</view>
				<!-- 横线 -->
				<view class="xian"></view>
			</view>

			<!-- 50px -->
			<view class="kuaidi">
				<label for="">配送方式</label>
				<label for="">XX快递</label>
			</view>
		</view>

		<!-- 优惠券 -->
		<view class="yhquan">
			<label for="">优惠券</label>
			<label for="" style="margin-right: 40rpx;">无可用</label>
		</view>
		<!-- jifen积分 -->
		<view class="jifen">
			<view class="use">
				<label for="">使用积分</label>
			</view>
			<view class="input" style="margin-right: 40rpx;">
				<input type="text" value="" placeholder="输入积分" />
				<label for="" class="input_use">使用</label>
				<label for="" class="input_keyi">可使用50积分</label>
			</view>
		</view>

		<!-- 具体详细 -->
		<view class="resDetail">
			<view class="">
				<label for="">商品金额</label>
				<label for="" style="margin-right:40rpx;color:red">￥{{total}}</label>
			</view>
			<view class="">
				<label for="">运费</label>
				<label for="" style="margin-right:40rpx;color:red">+￥0.00</label>
			</view>
			<view class="">
				<label for="">优惠券</label>
				<label for="" style="margin-right:40rpx;color:red">-￥0.00</label>
			</view>
			<view class="">
				<label for="">会员优惠</label>
				<label for="" style="margin-right:40rpx;color:red">-￥0.00</label>
			</view>
			<view class="">
				<label for="">积分抵扣</label>
				<label for="" style="margin-right:40rpx;color:red">-￥0.00</label>
			</view>
		</view>
		<!-- 实付金额 -->
		<view class="sfje">
			实付金额：<label for="" style="color:red">￥{{ total }}</label>
		</view>

		<!-- 确认订单按钮 -->
		<view class="btn">
			<!-- 点击提交订单按钮，发起支付请求 -->
			<button type="primary" @click="pay">提交订单</button>
		</view>
	</view>
</template>

<script>
	import {
		addOrders,checktoken
	} from "../../utils/request.js"
	export default {
		data() {
			return {
				cartList: [],
				$imgUrl: this.$imgUrl, //图片路径
				username: "伊拾柒",
				userphone: 18007761231,
				address: "花果山水帘洞27号",
			}
		},
		async onLoad() {
			this.cartList = uni.getStorageSync("cartList")
			// console.log(this.cartList, "00")
			
			// 先判断缓存里面有没有token，没有就跳到登录页面，有就验证是否过期
			var user = uni.getStorageSync("users")
			if(user.token!=null){
			var token=await checktoken({authorization:user.token})
			// console.log(token,"checktoken")
			// 如果过期了就跳转到登录页面，没有过期就加入订单
			if(token.data.code==403){
				uni.showToast({
					title:"登录已过期或访问权限受限,请重新登录",
					icon:'none'
				})
				uni.navigateTo({
					url:"../send/send"
				})
			}else{
				uni.navigateTo({
					url:"../cart/cart"
				})
			}
			}else{
				uni.showToast({
					title:"登录已过期或访问权限受限,请重新登录",
					icon:'none'
				})
				uni.navigateTo({
					url:"../send/send"
				})
			}
		},
		methods: {
			// 点击减号
			async minus(e) {
				// 从缓存里获取用户信息
				if (this.cartList[e].num <= 1) {
					uni.showToast({
						title: "宝贝不能再少了",
					})
				} else {
					this.cartList[e].num -= 1
					uni.setStorageSync("cartList",this.cartList)
				}
			},
			//点击加号
			async add(e) {
				//1.页面的num增加
				this.cartList[e].num += 1;
				uni.setStorageSync("cartList",this.cartList)
			},
			// 跳转到订单页
			async pay() {
				var user = uni.getStorageSync("users")
				var str = this.cartList.map(item => {
					return item.id
				});
				var idstr = str.join()
				// console.log(idstr,"idstr")
				var data = {
					uid: user.uid,
					username: this.username,
					userphone: this.userphone,
					address: this.address,
					countmoney: this.total,
					countnumber: this.num,
					addtime: new Date().getTime()
				}
				var ordersList = await addOrders({
					params: JSON.stringify(data),
					idstr: idstr,
				}, {
					authorization: user.token
				})
				// console.log(ordersList, "77")
				// 跳转到订单页面
				uni.navigateTo({
					url: "../order/order"
				})
				
				
				
			}
		},
		computed: {
			//计算总价
			total() {
				var sum = 0;
				this.cartList.forEach(item => {
					if (item.checked) {
						sum += item.price * item.num;
					}
				});
				return sum;
			},
			//计算总数
			num() {
				var num = 0;
				this.cartList.forEach(item => {
					num += item.num;
				});
				return num;
			},

		},



	}
</script>
<style>
	@import url("../../common/css/confirm.css");
</style>
