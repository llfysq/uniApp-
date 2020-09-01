<template>
	<view class="container">
		<!-- 详情图片 -->
		<view class="detailImage">
			<image :src="$imgUrl+detail.img">
		</view>
		<!-- 详情基本信息 -->
		<view class="detailInfo">
			<view class="detailInfoName">
				<label>{{detail.goodsname}}</label>
			</view>
			<view class="detailInfoPrice">
				<label style="color: red;">￥ {{detail.price}}</label>
				<label style="font-size: 24rpx;color: #ccc;">(此价格不与套装优惠同时享受)</label>
			</view>
		</view>

		<!-- 基本信息改变 -->
		<view class="changeInfo">
			<view class="youhui">
				<view>促销：<label class="manjian">满减</label><label class="dazhe">满2件9折；3件8折</label></view>
			</view>
			<!-- 数量加减 -->
			<view class="changeNum">
				<view class="num">购买数量</view>
				<view class="action">
					<label class="jian" @click="reduce">-</label>
					<label class="zhi">{{num}}</label>
					<label class="jia" @click="add">+</label>
				</view>
			</view>
			<!-- 商品属性 -->
			<view class="changeState">
				<view class="productStat">
					<label for="">商品属性</label>
				</view>
				<view class="productGuige">
					<label>规格</label>
					<view class="threed3i1">30g</view>
					<view class="threed3i2">5g</view>
				</view>
			</view>
		</view>
		<!-- 商品详情 -->
		<view class="productDetail">
			<view class="productDetailTitle">商品详情</view>
			<!-- 需要处理图片自适应问题 -->
			<view v-html="detail.description"></view>
			<!-- <image src="/static/detail/2.jpg" mode="aspectFill"/> -->
		</view>

		<view class="productEval">
			<view class="eval">商品评价</view>
			<view>
				<label class="evalUsername">小李白</label>
				<label class="evalUsertitle">效果很好，物流到位，下次继续来</label>
				<view class="evalImage">
					<image src="../../static/detail/pingjia1.jpg" />
					<image src="../../static/detail/pingjia2.jpg" />
					<image src="../../static/detail/pingjia3.jpg" />

				</view>
				<label class="evalTime">2020-01-13</label>
			</view>
		</view>
		<!-- 底部按钮 -->
		<view class="foot">
			<button class="footbtn1" @click="goShopping">加入购物车</button>
			<button class="footbtn2">立即购买</button>
		</view>
	</view>
</template>
<script>
	import {
		goodInfoRequest,
		cartadd
	} from "../../utils/request.js"
	export default {
		data() {
			return {
				detail: [],
				$imgUrl: this.$imgUrl,
				num: 1
			}
		},
		async onLoad(e) {
			//获取商品详情
			var detail = await goodInfoRequest({
				id: e.id
			})
			this.detail = detail.data.list[0]
			// console.log(this.detail)
		},
		methods: {
			//减少
			reduce() {
				if (this.num <= 1) {
					this.num = 1;
					return;
				}
				this.num -= 1
			},
			//增加
			add() {
				console.log("增加")
				this.num += 1
			},
			// 点击加入购物车
			async goShopping() {
				// 从缓存里获取用户信息
				var users = uni.getStorageSync("users")
				// console.log(users)
				// 添加购物车

				var result = await cartadd({
					uid: users.uid,
					goodsid: this.detail.id,
					num: this.num

				}, {
					authorization: users.token
				})
				// console.log(result)
					//提示用户添加成功
				if (result.data.code == 200) {
					uni.showToast({
						title:"宝贝添加成功"
					})
				} else {
					uni.showToast({
						title: result.data.msg
					})
				}
			}
		}
	}
</script>
<style>
	@import url("../../common/css/details.css");
</style>
