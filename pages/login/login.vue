<template>
	<view class="container">
		<view class="title">
			<view class="title_top">账号登录</view>
		</view>
		<view class="row">
			<input class="uni-input" v-model="loginName" placeholder-class='placeSty' type="text"
				placeholder="请输入账号" @input="userInput" />
		</view>
		<view class="row">

			<input class="uni-input" v-model="password" :password="pwdType" placeholder-class='placeSty'
				maxlength='12' type="text" placeholder="请输入密码" @input="userInput" />
			<view class="imgbox" @click="showbtn">
				<image class="img" :src=imgSrc mode=""></image>
			</view>
		</view>
		<view class="remember">
			<checkbox-group @change="change">
				<label>
					<checkbox :checked="rememberMe" />
				</label>
			</checkbox-group>
		</view>
		<view class="btn" :style="bg" @click="submit">登录</view>

	</view>
</template>

<script>
	import storage from "@/common/utils/storage.js"
	export default {
		data() {
			return {
				loginName: "",
				password: "",
				rememberMe: false,
				pwdType: true,
				imgSrc: '/static/icon/pwd.png',
				bg: {
					backgroundColor: '#ccc'
				}
						
			};
		},
		onLoad() {
			let num = storage.get('num')
			if(num){
				this.loginName = num.loginName
				this.password = num.password
				this.rememberMe = true
				this.userInput()
			}
		},
		methods: {
			showbtn() {
				this.pwdType = !this.pwdType
				if (this.pwdType) {
					this.imgSrc = '/static/icon/pwd.png'
				} else {
					this.imgSrc = '/static/icon/pwd1.png'
				}
			},
			change() {
				this.rememberMe = !this.rememberMe
			},
			submit() {

				let params = {
					loginName: this.loginName,
					password: this.password
				}

				this.$u.api.login(params).then(res => {
					storage.set('token', res)
					if(this.rememberMe){
						storage.set('num', params)
					}else{
						let num = storage.get('num')
						if(num){
							storage.remove('num')
						}
					}
					uni.switchTab({
						url: '/pages/index/index'
					});

				})
			},
			userInput(){
				if(this.loginName && this.password){
					this.bg.backgroundColor = "#0752D7"
				}else{
					this.bg.backgroundColor = "#ccc"
				}
			}
		}
	}
</script>

<style lang="scss">
	.container {
		padding: 0 80upx;
		overflow: hidden;

		.title {
			font-family: PingFang SC;
			margin-top: 320upx;

			.title_top {
				font-size: 52upx;
				font-weight: 800;
			}
		}

		.row {
			width: 100%;
			height: 150upx;
			display: flex;
			align-items: center;

			.uni-input {
				width: 90%;
			}

			.imgbox {
				// width: 100%;

				.img {
					width: 30upx;
					height: 30upx;
				}
			}


		}

		.placeSty {
			font-size: 29upx;
			font-family: PingFang SC;
			color: #999999;
			font-weight: bold;
		}

		.remember {
			width: 100%;
			height: 50upx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.rem {
				font-size: 24upx;
				font-family: PingFang SC;
				font-weight: bold;
				line-height: 14px;
				color: #0752D7;
			}
		}

		.btn {
			width: 100%;
			height: 86upx;
			border-radius: 10upx;
			line-height: 86upx;
			text-align: center;
			font-size: 32upx;
			font-weight: bold;
			color: #fff;
			margin-top: 80upx;
		}

	}
</style>
