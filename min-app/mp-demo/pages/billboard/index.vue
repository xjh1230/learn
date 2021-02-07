<template>
<view class="content">
    <button type="primary" @click="btnGoPoster">生成海报</button>
    <button type="primary" @click="btnGoBS64">获取图片bs64</button>
    <button type="primary" @click="btnTestSubscribeMsg" style="margin-top:5px;">订阅消息</button>
    <button type="primary" @click="btnSendSubscribeMsg" style="margin-top:5px;">发送订阅消息</button>
    <button type="primary" @click="btnWechatPay" style="margin-top:5px;">微信支付</button>
    <button type="primary" @click="btnShowVideoAd" style="margin-top:5px;">激励视频广告</button>
</view>
</template>

<script>
export default {
    data() {
        return {
            title: 'think different',
            imgfile: '',
            bs64: ''
        }
    },
    onLoad() {

    },
    methods: {
        btnGoPoster() {
            wx.navigateTo({
                url: '/pages/testposter/index',
            })
        },
		btnGoBS64(){
			wx.navigateTo({
			    url: '/pages/index/index',
			})
		}
    }
}
</script>
