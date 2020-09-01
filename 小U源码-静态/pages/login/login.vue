<template>
	<view class="box">
		<view class="row">
			<text>手机号</text>
			<input type="text" v-model="phone" maxlength="12"/>
		</view>
		<view class="row">
			<view class="send">
				<text>密码</text>
			</view>
			<input type="text" v-model="password"/>
		</view>
		<view class="row">
			<text style="font-size: 30rpx;">没有账号，先 <text style="color:#00BB00;font-size: 30rpx;" @click="toRegister">注册</text></text>
			<!--   -->
			<button type="primary" style="width: 90%;border-radius: 80rpx;margin-top: 50rpx;" @click="login">登录</button>
		</view>
		<view class="row">
			<text style="color: #006699;text-align: center;" >通过微信授权登录</text>
		</view>
	</view>
</template>

<script>
	import {login} from "../../utils/request.js"
	export default{
		data(){
			return{
				phone:"",//手机号
				password:"",//密码
			}
		},
		methods:{
			// 点击注册
			toRegister(){
				// console.log("111")
				uni.reLaunch({
					url:"../register/register"
				})
				console.log("111")
			},
			
			// 点击登录
			async login(){
				var result=await login({phone:this.phone,password:this.password})
				// 登录成功，将用户信息存在本地缓存里
				if(result.data.code==200){
					uni.setStorageSync("users",result.data.list)
					uni.showToast({
						title:result.data.msg
					})
					uni.switchTab({
						url:"../index/index"
					})
				}else{
					uni.showToast({
						title:result.data.msg
					})
				}
					// console.log(result)
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
