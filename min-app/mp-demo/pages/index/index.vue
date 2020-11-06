<template>
	<view class="content">
		<image class="logo" style="height: 40px;width: 40px;" src="/static/logo.png"></image>
		<view>
			<image :src="imgfile" mode="widthFix"></image>
		</view>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
		<view style="width: 80%;padding: 10px 20px;">
			<button type="primary" @click="takePhoto">点我获取图片</button>
		</view>

		<view style="padding: 10px;">
			<text style="word-break: break-all;">{{bs64}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'think different',
				imgfile:'',
				bs64:''
			}
		},
		onLoad() {

		},
		methods: {
			takePhoto(){
				uni.chooseImage({
					count:1,
					success: (res) => {
						this.imgfile=res.tempFilePaths[0]
						this.readImage2Base64(this.imgfile)
					}
				})
			},
			readImage2Base64(path){
				console.log(path)
				// 如果是APP（iOS，Android）时，使用HTML5+来调用原生文件读取方法
				// #ifdef APP-PLUS
				plus.io.resolveLocalFileSystemURL(
					path,
					(entry) => {
						entry.file((file) => {
							let reader = new plus.io.FileReader();
							reader.onloadend = async (e) => {
								const base64 = e.target.result.substr(22);
								const result = await this.imageClassify(base64);
								
								this.parseResults(result.result);
							};
							reader.readAsDataURL(file);
						});
					}
				);
				// #endif
				// #ifdef MP-WEIXIN
				wx.getFileSystemManager().readFile({
					filePath:path,
					encoding:'base64',
					success:(res)=>{
						console.log(res);
						this.bs64=res.data
					}
				})
				//#endif
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
