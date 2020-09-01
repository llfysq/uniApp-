<template>
	<view class="box">
		<view class="row">
			<text>手机号</text>
			<input type="text" v-model="phone" maxlength="12" @blur="setPhone"/>
		</view>
		<view class="row">
			<view class="send">
				<text>验证码</text>
				<text @click="send" v-if="isShow">发送</text>
				<text v-else>{{time}}</text>
			</view>
			<input type="text" v-model="code" placeholder="- - - -" maxlength="4" />
		</view>
		<view class="row">
			<text style="font-size: 23rpx;">收不到验证码？试试 <text style="color:#00BB00;font-size: 23rpx;"> 语音验证</text></text>
			<!--   -->
			<button type="primary" style="width: 90%;border-radius: 80rpx;margin-top: 50rpx;" @click="doLogin" :disabled="disabled">登录</button>
		</view>
		<view class="row">
			<text style="color: #006699;text-align: center;">通过微信授权登录</text>
		</view>
	</view>
</template>

<script>
	import {
		getSms,
		wxlogin
	} from '../../utils/request.js'
	export default {
		data() {
			return {
				phone: "", //手机号
				code: '', //验证码
				isShow: true,//是否显示获取验证码
				time: 60,//验证码倒计时
				disabled:false,//登录按钮的禁用
				
			}
		},
		methods: {
			// 点击登录
			async doLogin() {
				
				// 用户输入的验证码
				var code = this.code
				var codeStorage = uni.getStorageSync("code")
				if (code == codeStorage) {
					// 验证码正确，进行登录
					var result = await wxlogin({
						phone: this.phone
					})
					if (result.data.code == 200) {
						clearTimeout(this.time)
						var users = result.data.list
						// 将用户信息存到缓存中
						uni.setStorageSync("users", users)
						//跳转到首页
						wx.switchTab({
							url: '../index/index'
						});
					}
				} else {
					uni.showToast({
						title: "验证码不正确",
						icon: 'none'
					})
				}
			
			},
			
			
			
			
			
			// 正则验证手机号
			setPhone(){
				if(!(/^1[3456789]\d{9}$/.test(this.phone))){
					uni.showToast({
						title: "请输入正确的手机号",
						icon: 'none'
					})
					this.phone=""
				}
			},
			//获取验证码
			async send() {
				// 先判断手机号是否为空
				if(this.phone==""){
					uni.showToast({
						title: "请输入手机号",
						icon: 'none'
					})
					return
				}
				var sms = await getSms({
					phone: this.phone
				})
				//把验证码存入到缓存
				var code = sms.data.list.code;
				uni.setStorageSync('code', code);
				// console.log(sms)
				// 验证码倒计时
				this.timedown(60)
			},
			// 验证码倒计时
			timedown(num) {
				if (num == 0) {
					this.isShow = true; // 是否显示获取验证码
					return clearTimeout(time);//清除定时器
				} else {
					this.isShow = false; // 是否显示获取验证码
					var time=setTimeout(()=>{
						this.time = num-1
						this.timedown(num-1);
						// console.log(this.time)
					}, 1000); //定时每秒减一  
				}
			},
		

		}
	}
</script>

<style>
	/* 导入外部的样式文件 */
	/* @import url("../../common/css/index.css"); */
	.box {
		position: relative;
	}

	.row {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		margin: 40rpx;
	}

	.send {
		display: flex;
		justify-content: space-between;
	}

	.send text:nth-of-type(2) {
		color: #00BB00;
	}

	text {
		font-size: 27rpx;
		margin-bottom: 10rpx;
	}

	input {
		border-bottom: 1rpx solid gray;
		height: 65rpx;
	}
</style>
