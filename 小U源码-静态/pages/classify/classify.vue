<template>
	<view class="container">
		<!-- left左侧列表 -->
		<view class="left">
			<!-- 循环遍历的 -->
			<view class="left_list" :class="isactive==index?'activeList':''" v-for="(item,index) in categoods" :key="item.id" @click="toSecond(index)">
				<label for="">{{item.catename}}</label>
			</view>
			
		</view>
		<!-- right右侧详细分类商品 -->
		<view class="right">
			<!-- 每一个小类 -->
			<view class="right_list">
				<!-- 商品 -->
				<view class="bottom">
					<view class="bottom_list" v-for="item in cateSecond[isactive].children" :key="item.id" @click="toDetail(item.id)">
						<!-- 每个最多显示6个 -->
						<view >
							<image :src="$imgUrl+item.img" alt="">
						</view>
						<view class="title">
							<span>{{item.catename}}</span>
						</view>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import {cateRequest,cateListRequest} from "../../utils/request.js"
	export default{
		data(){
			return{
				$imgUrl:this.$imgUrl,
				categoods:[],//一级分类
				cateSecond:[],//二级分类
				isactive:0
			}
		},
		
		async onLoad() {
			// 获取一级分类数据列表
			var result=await cateRequest()
			this.categoods=result[1].data.list
			// 获取二级分类
			var result=await cateListRequest()
			this.cateSecond=result[1].data.list
		},
		methods:{
			// 获取二级分类
			async toSecond(e){
				this.isactive=e
			},
			
			// 点击商品跳转到商品详情
			// toDetail(e){
			// 	console.log(e,"444")
			// 	uni.navigateTo({
			// 		url:"../details/details?id="+e
			// 	})
			// 	}
		}
	}
	
</script>

<style>
	/* 导入外部的样式文件 */
	@import url("../../common/css/classify.css");
	
	/* 点击左侧导航，显示动态样式 */
	.activeList{
		border-left: 6rpx solid #f26b11;
		color: #f26b11;
	}
</style>
