<template>
	<view class="content">
		<view class="use" v-for="(item,index) in list" :key="index" @click="toUse">
			<text class="time">{{ item.ticket_end_time}}</text>
			<u-line border-style="dotted" color="#0d24ed"></u-line>
			<view class="info">
				<text class="start">{{item.startName}}</text>
				<u-icon class="icon" name="car-fill" color="#ffb813" size="50"></u-icon>
				<text class="end">{{item.endName}}</text>

			</view>
		</view>
	</view>

</template>

<script>
	export default {
		name: "no-use-list",
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
			toUse() {
				uni.showModal({
					title: '提示',
					content: '请到微信小程序进行使用！',
					showCancel: false
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		width: 100%;

		.use {
			display: flex;
			flex-direction: column;
			justify-content: center;
			margin: 10rpx;
			height: 200rpx;
			border: solid 2rpx #dfdfdf;
			box-shadow: 0 4px 8px -1rpx #d6d6d6;

			.time {
				margin-left: 14rpx;
				height: 80rpx;
				line-height: 80rpx;
			}

			.info {
				height: 128rpx;
				line-height: 128rpx;
				font-size: 30rpx;
				display: flex;

				.start {
					flex: 1;
					text-align: end;
				}

				.icon {
					flex: 1;
					display: flex;
					justify-content: center;
				}

				.end {
					flex: 1;
					text-align: start;
				}
			}
		}
	}
</style>
