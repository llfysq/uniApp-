<template>
	<view class="box">
		<view class="row">
			<text>手机号</text>
			<input type="text" v-model="phone" maxlength="12"/>
		</view>	
		<view class="row">
			<text>昵称</text>
			<input type="text" v-model="nickname"/>
		</view>
		<view class="row">
			<view class="send">
				<text>密码</text>
			</view>
			<input type="text" v-model="password"/>
		</view>
		<view class="row">
			<!--   -->
			<button type="primary" style="width: 90%;border-radius: 80rpx;margin-top: 50rpx;" @click="register">注册</button>
		</view>
	<!-- 	<view class="row">
			<text style="color: #006699;text-align: center;" >通过微信授权登录</text>
		</view> -->
	</view>
</template>

<script>
	import {register} from "../../utils/request.js"
	export default{
		data(){
			return{
				phone:"",//手机号
				nickname:"",//昵称
				password:"",//密码
			}
		},
		methods:{
			async register(){
				var result=await register({phone:this.phone,nickname:this.nickname,password:this.password})
				if(result.data.code==200){
					// 清空输入框的内容
					this.phone=""
					this.nickname=""
					this.password=""
					//提示框
					uni.showToast({
						title:result.data.msg
					})
					// 跳转到登录页面
					uni.navigateTo({
						url:"../send/send"
					})
				}else if(result.data.code==500){
					uni.showToast({
						title:result.data.msg
					})
				}
					console.log(result)
			}
		}
	}
</script>

<style>
	/* 导入外部的样式文件 */
	/* @import url("../../common/css/index.css"); */
	.box{
		position: relative;
	}

	.row{
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		margin: 40rpx;
	}
	.send{
		display: flex;
		justify-content: space-between;
	}
	.send text:nth-of-type(2){
		color: #00BB00;
	}
	text{
		font-size: 27rpx;
		margin-bottom: 10rpx;
	}
	input{
		border-bottom: 1rpx solid gray;
		height: 65rpx;
	}
	
</style>
