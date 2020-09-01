<template>
	<view class="">
		<!-- 顶部信息 -->

		<view class="HomeTop">
			<view class="logoView">
				<!-- logo -->
				<img class="logo" src="/static/index/logo.jpg" alt="" />
			</view>
			<view class="inputView">
				<input class="textinput" style="center" type="text" v-model="value" placeholder="寻找商品" @blur="toSearch" />
			</view>
		</view>

		<!-- 顶部导航  scroll-view -->
		<view class="tabs">
			<scroll-view id="tab-bar" class="scroll-h" :scroll-x="true" :show-scrollbar="false">

				<view class="uni-tab-item" data-current="0">
					<text class="uni-tab-item-title uni-tab-item-title-active">
						推荐
					</text>
				</view>
				<view class="uni-tab-item" data-current="0" v-for="item in cate" :key="item.id" @click="toSecond(item.id)">
					<text class="uni-tab-item-title">
						{{item.catename}}
					</text>
				</view>
			</scroll-view>
		</view>
		<!-- 推荐轮播图 -->
		<view class="">
			<swiper :indicator-dots="true" :autoplay="true" :interval="2000" :duration="1000">
				<swiper-item v-for="item in slideshowList" :key="item.id">
					<view class="swiper-item">
						<image :src="$imgUrl+item.img" mode=""></image>
					</view>
				</swiper-item>
				<!-- <swiper-item >
					<view class="swiper-item">
						<image src="../../static/index/swiper.jpg" mode=""></image>
					</view>
				</swiper-item>
				<swiper-item >
					<view class="swiper-item">
						<image src="../../static/index/swiper.jpg" mode=""></image>
					</view>
				</swiper-item> -->

			</swiper>
		</view>

		<!-- 功能导航开始 -->
		<!-- 功能导航 -->
		<view class="FunctNavCon">
			<view class="FunctNavLi">
				<image src="../../static/index/xiaohuoban.png" alt class="FunImg" />
				<p>限时抢购</p>
			</view>
			<view class="FunctNavLi">
				<image src="../../static/index/jifentixicopy.png" alt class="FunImg" />
				<p>积分商城</p>
			</view>
			<view class="FunctNavLi">
				<image src="../../static/index/lianxiwomen.png" alt class="FunImg" />
				<p>联系我们</p>
			</view>
			<view class="FunctNavLi" @click="toClassify">
				<image src="../../static/index/-shangpinfenlei-gai.png" alt class="FunImg" />
				<p>商品分类</p>
			</view>
		</view>

		<!-- 推荐部分 未写 -->
		<view class="HotGoods">
			<!-- 热推左侧 -->
			<view class="HotLeft">
				<view class="LimitedContent">
					<image class="LimitedImg" src="../../static/index/xianshi.jpg" alt />
					<label class="Limited">限时秒杀</label>
				</view>
				<p class="LimitedTitle">每天零点场，好货秒不停</p>
				<!-- 倒计时 -->
				<view class="LimitTimeAll">
					<label class="LimitTime">{{hour}}</label>
					<view class="maohao">:</view>
					<label class="LimitTime">{{minute}}</label>
					<view class="maohao">:</view>
					<label class="LimitTime">{{second}}</label>
					<label class="Seckill">秒杀</label>
				</view>
				<image :src="$imgUrl+seckill[0].img" class="LimitedgoodsImg" alt="">
			</view>

			<!-- 热推右侧 -->
			<view class="HotRight">
				<!-- 右侧顶部部分 -->
				<view class="HotTop">
					<view class="HomeTopInfo">
						<view class="HomeTopInfoOne">
							<label class="BrandNew">品牌上新</label>
							<label class="Discount">折</label>
						</view>
						<view class="HomeTopRobbig">
							<label>每日九点，抢大牌</label>
						</view>
					</view>
					<!-- <div> -->
					<view class="Cloth">
						<image src="../../static/index/goods1.jpg" alt="">
					</view>

					<!-- </div> -->
				</view>
				<!-- 右侧底部 -->
				<view class="HotBottom">
					<view class="HotBottomLeft">
						<view class="HotBottomLeftInfo">
							<label class="HotBottomLeftInfoTitle">每日十件</label>
							<label class="HotBottomLeftInfoDetail">只为你选好货</label>
						</view>
						<view class="HotBottomLeftImage">
							<image src="../../static/index/goods1.jpg" mode=""></image>
						</view>
					</view>
					<view class="HotBottomRight">
						<view class="HotBottomRightInfo">
							<label class="HotBottomRightInfoTitle">每日十件</label>
							<label class="HotBottomRightInfoDetail">只为你选好货</label>
						</view>
						<view class="HotBottomRightImage">
							<image src="../../static/index/goods1.jpg" mode=""></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 轮播图2 -->
		<div class="Swiper2">
			<image class="Swiper2Img" src="../../static/index/swiper1.jpg" alt />
		</div>

		<!-- 底部商品列表 -->
		<view class="products">
			<!-- 商品标签 -->
			<view class="tags">
				<view class="tag_list" :class="i==index?'active_tag_list':''" v-for="(item,index) in navList" :key="item" @click="changeList(index)">
					<label for="">{{item}}</label>
				</view>

			</view>
			<!-- 标签对应的商品 -->
			<view class="tags_product">
				<view class="product" v-for="item in goodsList[i].content" :key="item.id" @click="toDetail(item.id)">
					<view class="GoodsLeft">
						<image class="GoodsImg" :src="$imgUrl+item.img" alt />
					</view>
					<view class="GoodsCont">
						<view class="GoodConTit">{{item.goodsname}}</view>
						<view class="GoodsPrice">￥{{item.price}}</view>
						<view class="yimai">已售8000件</view>
						<view class="Immed">立即抢购</view>
					</view>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	import {
		slideshowRequest,
		api,
		cateRequest,
		seckillRequest,
		goodsRequest,
		goodInfoRequest
	} from "@/utils/request.js";
	export default {
		data() {
			return {
				$imgUrl: this.$imgUrl,
				slideshowList: [], //轮播图
				cate: [], //一级分类信息(首页快速分类导航)
				seckill: [], //秒杀
				hour: 0, //倒计时
				minute: 0,
				second: 0,
				img: "",
				goodsList: [], //商品列表
				navList: ["热门推荐", "发现好货", "只看专场"],
				i: 0, //用于判断商品列表选中的是哪一个
				value: "", //用于清空搜索框
			}
		},
		async onLoad() {
			//底部商品列表 获取商品信息(首页)
			var goods = await goodsRequest()
			this.goodsList = goods.data.list
			// console.log(this.goodsList,"this.goodsList")
			//获取一级分类信息(首页快速分类导航)
			var cate = await cateRequest()
			this.cate = cate[1].data.list

			//获取轮播图信息(首页)
			var result = await slideshowRequest()
			this.slideshowList = result[1].data.list

			// 获取限时秒杀信息(首页)
			var seckill = await seckillRequest()
			console.log(seckill,"seckill")
			if(seckill[1].data.list!=null){
			this.seckill = seckill[1].data.list
			// 倒计时
			var endtime = this.seckill[0].endtime
			setInterval(() => {
				var nowtime = new Date().getTime()
				var distance = endtime - nowtime
				distance = Math.floor(distance / 1000)
				var hour = Math.floor(distance / 3600)
				var minute = Math.floor(distance % 3600 / 60)
				var second = distance % 3600 % 60
				this.hour = hour < 10 ? "0" + hour : hour,
					this.minute = minute < 10 ? "0" + minute : minute,
					this.second = second < 10 ? "0" + second : second
				// console.log(hour+":"+minute+":"+second)	
			}, 1000)
			}else{
				this.seckill = []
			}

		},
		methods: {
			// 搜索商品
			async toSearch(e) {
				uni.navigateTo({
					url: "../search/search?keywords=" + e.detail.value
				})
				this.value = ""
				// console.log(searchList)
			},
			//底部商品列表 点击获取对应的商品列表
			changeList(e) {
				this.i = e //点击谁的下标	
			},
			//点击首页快速分类导航，跳转到对应的页面
			toSecond(e) {
				uni.navigateTo({
					url: "../product/product?id=" + e
				})
			},
			// 点击商品跳转到商品详情
			toDetail(e) {
				uni.navigateTo({
					url: "../details/details?id=" + e
				})
			},
			// 跳转到商品分类页面
			toClassify() {
				uni.navigateTo({
					url: "../classify/classify"
				})
			}


		}


	}
</script>

<style>
	/* 导入外部的样式文件 */
	@import url("../../common/css/index.css");
</style>
