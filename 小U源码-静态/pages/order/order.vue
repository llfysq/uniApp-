]<template>
	<view>
		<uni-search-bar radius="100" bgColor="#ffff"></uni-search-bar>
		<view class="list">

			<view class="row" v-for="(item,index) in ordersList" :key="item.id">
				<view class="products" v-for="i in ordersList[index].child" :key="i.id">
					<view class="imagebox" v>
						<image :src="$imgUrl+i.img" mode="widthFix"></image>
						<text>{{i.goodsname}}</text>
					</view>
				</view>
				<view class="info">
					<text space="nbsp">总计{{item.countnumber}}商品 </text>
					<text>应付金额 ￥{{item.countmoney}}</text>
				</view>
			</view>


		</view>
		<view class="tishi" v-if="ordersList==null">
			没有数据亲！
		</view>
	</view>
</template>

<script>
	import {
		ordersList,
		checktoken
	} from "../../utils/request.js"
	export default {
		data() {
			return {
				ordersList: [],
				$imgUrl: this.$imgUrl, //图片路径
			}
		},
		async onLoad() {
			var user = uni.getStorageSync("users")
			// 先判断缓存里面有没有token，没有就跳到登录页面，有就验证是否过期
			if (user.token != null) {
				var token = await checktoken({
					authorization: user.token
				})
				// console.log(token, "checktoken")
				// 如果过期了就跳转到登录页面，没有过期就可以进入订单页面
				if (token.data.code == 403) {
					uni.navigateTo({
						url: "../send/send"
					})
				} else {
					var List = await ordersList({
						uid: user.uid
					}, {
						authorization: user.token
					})
					this.ordersList = List.data.list
					// console.log(List, "11")
				}
			} else {
				uni.navigateTo({
					url: "../send/send"
				})
			}





		}

	}
</script>
<style>
	.row {
		margin: 10rpx 20rpx;
		/* height: 240rpx; */
		border: 1rpx solid #AAAAAA;
		border-radius: 30rpx;
	}

	.imagebox {
		float: left;
		margin: 10rpx;
	}

	.products {
		overflow: hidden;
	}

	image {
		width: 160rpx;
		margin-left: 10rpx;
	}

	.info {
		/* position: absolute;
		top: 180rpx;
		right: 50rpx; */
		display: flex;
		justify-content: space-between;
		font-size: 25rpx;
		/* width: 340rpx; */
		padding: 20rpx;
		text-align: right;
	}

	.info text:nth-of-type(2) {
		color: red;
	}

	.info text:nth-of-type(3) {
		font-size: 20rpx;
		color: #AAAAAA;
	}

	.tishi {
		line-height: 200rpx;
		text-align: center;
		font-size: 40rpx;
		color: #006699;
	}
</style>
