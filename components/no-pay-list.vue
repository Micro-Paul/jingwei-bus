<template>
	<view class="content">
		<view class="pay" v-for="(item,index) in list" :key="index">
			<text class="order">订单号:{{ item.order_num}}</text>
			<u-line border-style="dotted" color="#0d24ed"></u-line>
			<view class="info">
				<view class="bottom">
					<text class="time">发车时间:{{item.shift_day}} {{item.shift_time}}</text>
					<text class="line">线路:{{item.lineName}}</text>
				</view>
				<view class="btn" @click="goPay">去支付</view>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		name: "no-pay-list",
		props: {
			list: {
				type: Array,
				default () {
					return []
				}
			}
		},
		data() {
			return {

			};
		},
		methods: {
			goPay() {
				uni.showModal({
					title: '提示',
					content: '请到微信小程序进行支付！',
					showCancel: false
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		width: 100%;

		.pay {
			display: flex;
			flex-direction: column;
			justify-content: center;
			margin: 10rpx;
			padding: 0 14rpx;
			height: 200rpx;
			border: solid 2rpx #dfdfdf;
			box-shadow: 0 4px 8px -1rpx #d6d6d6;
			border-radius: 10rpx;

			.order {
				height: 80rpx;
				line-height: 80rpx;
			}

			.info {
				height: 128rpx;
				font-size: 30rpx;
				display: flex;
				justify-content: space-between;

				.bottom {
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					padding: 6rpx 0;
				}

				.btn {
					width: 160rpx;
					height: 60rpx;
					border-radius: 30rpx;
					border: solid 2rpx #5555ff;
					text-align: center;
					line-height: 50rpx;
					align-self: flex-end;
					margin-bottom: 10rpx;
					margin-right: 10rpx;
				}

			}
		}
	}
</style>
