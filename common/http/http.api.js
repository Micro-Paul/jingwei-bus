// 如果没有通过拦截器配置域名的话，可以在这里写上完整的URL(加上域名部分)
const loginUrl = '/app/member/postLogin'
const busLineUrl = '/busLine/getLineList'
const nowDateUrl = '/app/member/getNowDate'
const shiftInfoUrl = '/busLine/getShiftInfo'
const createOrderUrl = '/queueOne/createOrder'
const findTicketStatusUrl = '/busShitfInfo/findTicketStatus'
const orderListUrl = '/order/getOrderList'
const ticketListUrl = '/ticket/findListTicket'
const findOrderNoPayAndNoUseUrl = '/order/findOrderNoPayAndNoUse'




// 此处第二个参数vm，就是我们在页面使用的this，你可以通过vm获取vuex等操作，更多内容详见uView对拦截器的介绍部分：
// https://uviewui.com/js/http.html#%E4%BD%95%E8%B0%93%E8%AF%B7%E6%B1%82%E6%8B%A6%E6%88%AA%EF%BC%9F
const install = (Vue, vm) => {

	const login = (params = {}) => vm.$u.get(loginUrl, params);
	const getLineList = () => vm.$u.get(busLineUrl);
	const getNowDate = () => vm.$u.get(nowDateUrl);
	const getShiftInfo = (params = {}) => vm.$u.get(shiftInfoUrl, params);
	const createOrder = (params = {}) => vm.$u.get(createOrderUrl, params);
	const findTicketStatus = (params = {}) => vm.$u.get(findTicketStatusUrl, params);
	const getOrderList = () => vm.$u.get(orderListUrl);
	const findListTicket = () => vm.$u.get(ticketListUrl);
	const findOrderNoPayAndNoUse = () => vm.$u.get(findOrderNoPayAndNoUseUrl);



	// 将各个定义的接口名称，统一放进对象挂载到vm.$u.api(因为vm就是this，也即this.$u.api)下
	vm.$u.api = {
		login,
		getLineList,
		getNowDate,
		getShiftInfo,
		createOrder,
		findTicketStatus,
		getOrderList,
		findListTicket,
		findOrderNoPayAndNoUse

	};
}

export default {
	install
}
