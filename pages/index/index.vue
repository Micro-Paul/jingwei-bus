<template>
	<view class="content">
		<mescroll-body style="width: 100%;" ref="mescrollRef" @init="mescrollInit" @down="downCallback" :up="upOption"
			:down="downOption">
			<view class="box">
				<view class="station">
					<view class="info">
						<text class="place">{{start.label}}</text>
						<text class="zhan">始发张</text>
					</view>
					<view class="info" @tap="exchage">
						<u-icon class="icon" name="arrow-rightward" color="#FFFFFF" size="22"></u-icon>
						<u-icon class="icon" name="arrow-leftward" color="#FFFFFF" size="22"></u-icon>
					</view>
					<view class="info">
						<text class="place">{{end.label}}</text>
						<text class="zhan">终点站</text>
					</view>
				</view>

				<view class="line">
					<view class="num" @tap="openLine">
						{{lineName}}
						<u-icon class="icon" name="arrow-down-fill" color="#FFFFFF" size="22"></u-icon>
					</view>
				</view>
			</view>
			<view class="date" @tap="openDate">
				<text>出发日期：</text><text>{{leaveDateShow}}</text>
				<u-icon class="icon" name="arrow-down-fill" color="#FFFFFF" size="22"></u-icon>
			</view>
			<view class="piao-box">
				<view class="ticket"
					:style="[{color:(item.shiftSp != 0 ? 'blue':'#c8c8c8')}, {background:(item.shiftSp != 0 ? '#f4f4f4':'#e5e5e5')}]"
					v-for="(item, index) in ticketList" :key="index" @click="robTicket(item)">
					<view>{{item.shiftTime}}</view>
					<view>余{{item.shiftSp}}张</view>

				</view>
			</view>
			<view class="btn" v-if="flag" @click="closeRob">关闭抢票</view>
			<u-select v-model="lineShow" mode="mutil-column-auto" :list="lineList" @confirm="confirmLine"></u-select>
			<u-select v-model="dateShow" mode="single-column" :list="dateList" @confirm="confirmDate"></u-select>
		</mescroll-body>
	</view>
</template>

<script>
	import {
		timeStamp
	} from '../../common/utils/date.js'
	import timer from 'xbc-timer'
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin],
		data() {
			return {
				upOption: {
					use: false
				},
				downOption: {
					auto: false
				},
				lineShow: false,
				dateShow: false,
				flag: false,
				lineList: [{
						value: 0,
						label: '一号线',
						list: []
					},
					{
						value: 1,
						label: '二号线',
						list: []
					},
					{
						value: 2,
						label: '三号线',
						list: []
					}
				],
				start: {},
				end: {},
				lineId: '',
				dateList: [],
				lineName: '一号线',
				lineNum: 0,
				lineDate: [],
				leaveDateShow: '',
				leaveDate: '',
				ticketList: []
			}
		},
		async onLoad() {
			try {
				const lineData = await this.$u.api.getLineList()
				uni.setStorageSync("lineData", lineData)
				this.initData(lineData)
				
			} catch (err) {
				console.log(err)
				const lineData = uni.getStorageSync("lineData")
				this.initData(lineData)
			}

		},
		methods: {
			async initData(lineData) {
				for (let line of lineData) {
					if (line.lineName.includes('一号线')) {
						this.lineList[0].list.push({
							value: line.id,
							label: line.lineName.substring(4, 8)
						})
					} else if (line.lineName.includes('二号线')) {
						this.lineList[1].list.push({
							value: line.id,
							label: line.lineName.substring(4, 8)
						})
					} else if (line.lineName.includes('三号线')) {
						this.lineList[2].list.push({
							value: line.id,
							label: line.lineName.substring(4, 8)
						})
					}
				}
				this.start = {
					value: this.lineList[0].list[0].value,
					label: this.lineList[0].list[0].label
				}
				this.end = {
					value: this.lineList[0].list[1].value,
					label: this.lineList[0].list[1].label
				}
				this.lineId = this.lineList[0].list[0].value
				const now = await this.$u.api.getNowDate()
				this.setDateList(now)
				this.ticketList = await this.$u.api.getShiftInfo({
					lineId: this.lineId,
					date: this.leaveDate
				})
			},
			setDateList(now) {
				let timestamp = now
				for (let i = 0; i < 4; i++) {
					let dateTime = timeStamp(timestamp)
					if (i == 0) {
						this.leaveDateShow = dateTime.date + ' (' + dateTime.day + ')'
						this.leaveDate = dateTime.date
					}
					this.dateList.push({
						value: dateTime.date,
						label: dateTime.date + ' (' + dateTime.day + ')'
					})
					timestamp = timestamp + 24 * 60 * 60 * 1000
				}
			},
			downCallback() {
				this.$u.api.getShiftInfo({
					lineId: this.lineId,
					date: this.leaveDate
				}).then(res => {
					this.ticketList = []
					this.ticketList = res
					this.mescroll.endSuccess(this.ticketList.length, false)
				}).catch(error => {
					this.mescroll.endErr()
				})
			},
			openLine() {
				this.lineShow = true
			},
			openDate() {
				this.dateShow = true
			},
			confirmLine(e) {
				console.log(e);
				this.lineName = e[0].label
				this.start = {
					value: this.lineList[e[0].value].list[0].value,
					label: this.lineList[e[0].value].list[0].label
				}
				this.end = {
					value: this.lineList[e[0].value].list[1].value,
					label: this.lineList[e[0].value].list[1].label
				}
				this.lineId = this.lineList[0].list[0].value
				this.$u.api.getShiftInfo({
					lineId: this.lineId,
					date: this.leaveDate
				}).then(res => {
					this.ticketList = []
					this.ticketList = res
				})
			},
			confirmDate(e) {
				this.leaveDateShow = e[0].label
				this.leaveDate = e[0].value
				this.$u.api.getShiftInfo({
					lineId: this.lineId,
					date: this.leaveDate
				}).then(res => {
					this.ticketList = []
					this.ticketList = res
				})
			},
			exchage() {
				const temp = this.start
				this.start = this.end
				this.end = temp
				this.lineId = this.start.value
				this.$u.api.getShiftInfo({
					lineId: this.lineId,
					date: this.leaveDate
				}).then(res => {
					this.ticketList = []
					this.ticketList = res
				})
			},
			robTicket(item) {
				uni.showModal({
					title: '提示',
					content: '抢的票是 ' + item.shiftDay + ' ' + item.shiftTime + ' 的票',
					success: res => {
						if (res.confirm) {
							timer.chain([{
								id: 'taskFunc',
								func: this.taskFunc,
								interval: 500,
								param: item
							}])
							timer.start()
							this.flag = true
						} else if (res.cancel) {

						}
					}
				});

			},
			async taskFunc(item) {
				try {
					uni.hideLoading()
					const order = await this.$u.api.createOrder({
						shift_id: item.id,
						order_pay_info: item.shiftDay
					})
					const status = await this.$u.api.findTicketStatus({
						token_num: order
					})
					timer.clear()
					this.flag = false
					uni.showModal({
						title: '提示',
						content: '抢票成功！！！',
						showCancel: false,
						success: res => {
							if (res.confirm) {
								console.log('用户点击确定');
								this.$u.api.getShiftInfo({
									lineId: this.lineId,
									date: this.leaveDate
								}).then(data => {
									this.ticketList = []
									this.ticketList = data
								})
							}
						}
					});
				} catch (err) {
					uni.showLoading({
						title: '正在抢票中'
					});
					console.log(err)
				}
			},
			closeRob() {
				uni.hideLoading()
				this.flag = false
				timer.clear()
			}
		}
	}
</script>

<style lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;

		.box {
			// width: 100%;
			background: #0754D8;

			.station {
				display: flex;
				flex-direction: row;
				align-items: center;
				height: 160rpx;
				justify-content: space-between;
				padding: 0rpx 100rpx;

				.info {
					display: flex;
					flex-direction: column;
					align-items: center;
					flex: 1;

					.place {
						font-size: 40rpx;
						color: white;
						padding: 2rpx;
					}

					.zhan {
						font-size: 20rpx;
						color: #dcdcdc;
						padding: 2rpx;
					}
				}
			}

			.line {
				display: flex;
				justify-content: center;
				align-items: center;
				height: 100rpx;

				.num {
					background: #e5e5e570;
					padding: 10rpx;
					color: white;
					border-radius: 40rpx;
				}
			}
		}

		.date {
			width: 100%;
			height: 100rpx;
			line-height: 100rpx;
			color: white;
			background: #5555ff;
			text-align: center;
		}

		.piao-box {
			padding: 16rpx;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;

			.ticket {
				padding: 10rpx;
				background: #e5e5e570;
				width: 170rpx;
				height: 90rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				margin-bottom: 16rpx;
				border-radius: 10rpx;
				font-size: 24rpx;
			}
		}

		.btn {
			height: 86upx;
			border-radius: 10upx;
			line-height: 86upx;
			text-align: center;
			font-size: 32upx;
			font-weight: bold;
			color: #fff;
			margin: 80upx 40rpx;
			background: #5a73ff;
		}
	}
</style>
