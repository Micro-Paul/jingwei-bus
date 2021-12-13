<template>
	<view class="content">
		<view class="box">
			<view class="info" @click="selectChange(0)">
				<text class="num">{{ticketInfo.noUseOrderNum}}张</text>
				<text class="tip">未使用车票</text>
			</view>
			<view class="info">
				<text class="num">{{ticketInfo.exchargeNum}}张</text>
				<text class="tip">兑换劵</text>
			</view>
			<view class="info" @click="selectChange(1)">
				<text class="num">{{ticketInfo.noPayOrderNum}}项</text>
				<text class="tip">未支付订单</text>
			</view>
		</view>
		<view class="swiper">
			<u-tabs-swiper ref="tabs" :list="list" :current="current" @change="change" :is-scroll="false"></u-tabs-swiper>
			<swiper :style="{height: height}" :current="swiperCurrent" @transition="transition"
				@animationfinish="animationfinish">
				<swiper-item v-for="(item, index) in list" :key="index">
					<mescroll-item ref="mescrollItem" :i="index" :index="current" :tabs="list" :height="height">
					</mescroll-item>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import storage from "@/common/utils/storage.js"
	import MescrollItem from "@/components/mescroll-swiper-item.vue"
	export default {
		components: {
			MescrollItem
		},
		data() {
			return {
				ticketInfo: '',
				height: "", // 需要固定swiper的高度
				list: [{
					name: '未使用'
				}, {
					name: '未支付'
				}],
				current: 0,
				swiperCurrent: 0,
			}
		},
		onLoad() {
			this.height = uni.getSystemInfoSync().windowHeight - uni.upx2px(190) + 'px'
		},
		onShow() {
			this.$u.api.findOrderNoPayAndNoUse().then(res => {
				this.ticketInfo = res
			})
		},
		onNavigationBarButtonTap() {
			uni.showModal({
				title: '提示',
				content: '您确定退出登录吗？',
				success: res => {
					if (res.confirm) {
						storage.remove('token')
						this.$u.route({
							type: 'reLaunch',
							url: 'pages/login/login'
						})
					} else if (res.cancel) {
			
					}
				}
			});
			
		},
		methods: {
			selectChange(index) {
				this.current = index
				this.swiperCurrent = index
			},
			change(index) {
				this.swiperCurrent = index;
			},
			transition({
				detail: {
					dx
				}
			}) {
				this.$refs.tabs.setDx(dx);
			},
			animationfinish({
				detail: {
					current
				}
			}) {
				this.$refs.tabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;

		.box {
			width: 100%;
			height: 200rpx;
			padding: 30rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			flex: 1;

			.info {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;

				.num {
					font-weight: bold;
					font-size: 32rpx;
					padding: 2rpx;
				}

				.tip {
					font-size: 10rpx;
					color: #dcdcdc;
					padding: 2rpx;
				}
			}
		}
		
		.swiper {
			width: 100%;
		}
	}
</style>
