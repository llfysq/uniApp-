<template>
	<view class="container">
		<view class="top">
			<scroll-view class="scroll-view_H" scroll-x="true" scroll-left="0" v-for="(item,index) in cartList" :key="item.id">

				<view class="cartInfo" id="demo1">
					<!-- 购物车商品信息 -->
					<view class="cartInfochild">
						<!-- 选择框 -->
						<view class="cartInfo_switch common">
							<!-- 点击当前商品 -->
							<switch type="checkbox" :checked="item.checked==1?true:flase" @change="changeOne($event,index)" />
						</view>
						<!-- 图片 -->
						<view class="cartInfo_image common">
							<image :src="$imgUrl+item.img" mode=""></image>
						</view>

						<!-- 信息 -->
						<view class="cartInfo_info">
							<label for="" style="font-size: 26rpx;">{{item.goodsname}}</label>
							<label for="" style="font-size: 24rpx; color: #ccc;">规格：黑色</label>
							<label for="" style="color: red;">￥{{item.price}}</label>
						</view>
						<!-- 加减数量 -->
						<view class="cartInfo_num">
							<view class="cartInfo_num_child">
								<label for="" @click="minus(index)">-</label>
								<label for="">{{item.num}}</label>
								<label for="" @click="add(index)">+</label>
							</view>
						</view>
					</view>
				</view>
				<view class="cartDel" id="demo2"><label for="" @click="cartDel(item.id,index)">删除</label></view>

			</scroll-view>

		</view>

		<!-- 底部 -->
		<view class="foot">
			<view class="footd1">
				<switch type="checkbox" :checked="isAllCheck" @click="all" />
				<label>全选</label>
			</view>
			<view class="footd2">
				<view class="footd2sp1">
					总计：
					<label style="color: red;">{{ total }}</label>
				</view>
				<label class="footd2sp2">不含运费，已优惠￥0.00</label>
			</view>
			<!-- 跳到提交订单，结算页面 -->
			<view class="footd3" @click="toConfirm()">
				<!-- 被选中的商品的个数 -->
				<label>去结算({{num}}件)</label>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		cartList,
		cartUpdate,
		cartDelete,
		checktoken
	} from "../../utils/request.js"
	export default {
		data() {
			return {
				cartList: [], //购物车列表
				$imgUrl: this.$imgUrl, //图片路径
			}
		},
		async onShow() {
			// 从缓存里获取用户信息
			var users = uni.getStorageSync("users")
			if(users.token!=null){
			var token=await checktoken({authorization:users.token})
			// console.log(token,"checktoken")
			if(token.data.code==403){
				uni.navigateTo({
					url:"../send/send"
				})
			}else{
				// 获取购物车列表
				var result = await cartList({
					uid: users.uid
				}, {
					authorization: users.token
				})
				// 判断result.data.list是否为空，不为空赋值给this.cartList
				if (result.data.code == 200&&result.data.list!=null) {
					this.cartList = result.data.list
				}
					// 转换checked
					this.cartList.forEach(item => {
					item.checked = item.checked == 1 ? true : false;
				})
				// console.log(this.cartList)
			}
			}else{
				uni.navigateTo({
					url:"../send/send"
				})
			}
			
		},

		methods: {
			// 选择一个
			changeOne(e, index) {
				//页面checked改变
				var value = e.detail.value;
				this.cartList[index].checked = value;
				//同步数据
				this.Update(index)
			},
			// 全选
			all() {
				this.isAllCheck = !this.isAllCheck
			},
			// 点击减号
			async minus(e) {
				// 从缓存里获取用户信息
				if (this.cartList[e].num <= 1) {
					uni.showToast({
						title: "宝贝不能再少了",
					})
				} else {
					this.cartList[e].num -= 1
				}
				this.Update(e)
			},
			//点击加号
			async add(e) {
				//1.页面的num增加
				this.cartList[e].num += 1;
				this.Update(e)
			},
			//同步数据到数据库
			async Update(e) {
				let {
					id,
					num,
					checked
				} = this.cartList[e]
				checked = checked ? 1 : 0; //数据类型要和mysql数据库保持一致
				let {
					token
				} = uni.getStorageSync('users');
				await cartUpdate({
					id,
					num,
					checked
				}, {
					authorization: token
				})
			},
			// 删除
			async cartDel(e,index) {
				// 删除页面的
				this.cartList.splice(index, 1)
				var users = uni.getStorageSync("users")
				// 删除数据库的
				var del = await cartDelete({
					id: e
				}, {
					authorization: users.token
				})
				
				if (del.data.code == 200) {
					uni.showToast({
						title: del.data.msg
					})
				} else {
					uni.showToast({
						title: del.data.msg
					})
				}
			},

			//点击去结算 跳到提交订单，结算页面
			toConfirm() {
				// 将选中的商品存到缓存中
				var arr=[]
				// console.log(this.cartList)
				this.cartList.map(item=>{
					if(item.checked){
						return arr.push(item)
					}
				})
				// console.log(arr)
				uni.setStorageSync("cartList",arr)
				// 跳转页面
				uni.navigateTo({
					url: "../confirm/confirm"
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
			//全选
			isAllCheck: {
				get: function() {
					return this.cartList.every(item => {
						return item.checked == true;
					});
				},
				set: function(val) {
					//把每个商品的checked状态和全选保持一致
					this.cartList.forEach((item,index) => {
						item.checked = val;
						this.Update(index)
					})
				}
			},
			//计算总数
			num() {
				var num = 0;
				this.cartList.forEach(item => {
					num += item.num;
				});
				return num;
			}
			
		},
		

	};
</script>

<style>
	@import url('../../common/css/cart.css');

	.cartInfo_image_img {
		width: 120rpx;
		height: 120rpx;
	}
</style>
