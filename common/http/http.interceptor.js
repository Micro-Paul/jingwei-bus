
import storage from "../utils/storage.js"
// 这里的vm，就是我们在vue文件里面的this，所以我们能在这里获取vuex的变量，比如存放在里面的token变量

const install = (Vue, vm) => {
	// 此为自定义配置参数，具体参数见上方说明
	Vue.prototype.$u.http.setConfig({
		baseUrl: 'https://wxxcx.jingweibus.com',
		showLoading: true,
		loadingText: '努力加载中~',
		loadingTime: 800,
		loadingMask: true,
		originalData: true,
		// 配置请求头信息
		header: {
			'content-type': 'application/json;charset=UTF-8'
		},
	});

	// 请求拦截，配置Token等参数
	Vue.prototype.$u.http.interceptor.request = (config) => {
		const token = storage.get("token")
		config.header.token = token
		return config;
		
	}

	// 响应拦截，判断状态码是否通过
	Vue.prototype.$u.http.interceptor.response = (res) => {
		if (res.statusCode == 200) {
			//将会在this.$u.post(url).then(res => {})的then回调中的res的到
			if(res.data.code === '0') {
				return res.data.data
			} else if(res.data.code === '3'){
				vm.$u.toast(res.data.msg);
				vm.$u.route({
					url: 'pages/login/login',
					type: 'reLaunch'
				})
				return false
			} else {
				// vm.$u.toast(res.data.msg);
				return false
			}
		} else if (res.statusCode == 500) {
			vm.$u.toast(res.data.msg);
			return false
		}else if (res.errMsg == 'request:fail timeout') {
			vm.$u.toast('请求超时。。。');
			return false;
		} else {
			vm.$u.toast('网络错误，请检查网络设置');
			// 如果返回false，则会调用Promise的reject回调，
			// 并将进入this.$u.post(url).then().catch(res=>{})的catch回调中，res为服务端的返回值
			return false;
		}
	}
}

export default {
	install
}
