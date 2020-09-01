<template>
	<view>
		<view class="search">
			<icon type="search" color="white" size="10"></icon>
			<input type="text" v-model="value" placeholder="搜索商品" placeholder-class="placeholder" @blur="toSearch" />
		</view>
		<view class="list" v-if="categoods!=null">
			<view class="row" v-for="item in categoods" :key="item.id" @click="toDetail(item.id)">
				<image :src="$imgUrl+item.img" mode="widthFix"></image>
				<view class="info">
					<text>{{item.goodsname}}</text>
					<text>￥{{item.price}}</text>
					<text>3565评论</text>
				</view>
			</view>


		</view>
		<view class="tishi" v-else>
			没有数据亲！
		</view>
	</view>
</template>

<script>
	import {
		categoodsRequest,
		searchRequest
	} from "../../utils/request.js"
	export default {
		data() {
			return {
				categoods: [], //一级分类下的商品
				$imgUrl: this.$imgUrl, //图片路径处理
				value: '', //输入框的内容
				searchList: [], //关键字搜索出来的商品列表
			}
		},
		// 获取数据列表
		async onLoad(e) {
			// console.log(e)
				var result = await categoodsRequest({
					fid: e.id
				})
				this.categoods = result.data.list
			},
		methods: {
			// 点击商品跳转到商品详情
			toDetail(e) {
				uni.navigateTo({
					url: "../details/details?id=" + e
				})
			},
			// 搜索
			async toSearch(e) {
				var searchList = await searchRequest({
					keywords: e.detail.value
				})
				this.categoods = searchList.data.list
				this.value = ""
				// console.log(searchList)
			}
		}
	}
</script>

<style>
	.search {
		margin: 50rpx;
		height: 80rpx;
		background-color: #f26b11;
		border-radius: 80rpx;
		color: white;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	icon {
		margin: 0 10rpx 0 250rpx;
	}

	.placeholder {
		color: white;
		font-size: 25rpx;
	}

	.row {
		position: relative;
		margin: 10rpx 20rpx;
		height: 330rpx;
		border-bottom: 1rpx solid #AAAAAA;
	}

	image {
		position: absolute;
		top: 0;
		left: 10rpx;
		width: 160rpx;
	}

	.info {
		height: 85%;
		width: 100%;
		position: absolute;
		top: 0;
		left: 200rpx;
		display: flex;
		justify-content: space-around;
		flex-direction: column;
		font-size: 25rpx;
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
