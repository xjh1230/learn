<template>
	<view>
		<canvas type="2d" id="myCanvas" style="height: 300px;width: 300px;"></canvas>
		
		<button type="primary" @click="btnSavePoster">保存海报</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				canvas:null
			}
		},
		methods: {
			btnSavePoster(){//talk is cheap
				wx.canvasToTempFilePath({
				      canvas: this.canvas,
				      success:(res)=>{
				        console.log(res);
				        wx.saveImageToPhotosAlbum({
				          filePath: res.tempFilePath,
				        })
				      }
				    })
			}
		},
	   onReady: function () {
		 wx.cloud.init();
		 console.log(1234)
		 const query = wx.createSelectorQuery()
		 query.select('#myCanvas')
		   .fields({ node: true, size: true })
		   .exec((res) => {
			 this.canvas = res[0].node
			let	 ctx = this.canvas.getContext('2d')
	 
			 const dpr = wx.getSystemInfoSync().pixelRatio
			 this.canvas.width = res[0].width * dpr
			 this.canvas.height = res[0].height * dpr
			 ctx.scale(dpr, dpr)
	 
			 ctx.fillStyle='white'
			 ctx.fillRect(0, 0, 300, 300)
	 
			 
			 wx.cloud.callFunction({
			   name:"getmpcode",
			   data:{
				 scene:"a=1"
			   },
			   success:(res)=>{
				 console.log(res);
	 
				 let image=this.canvas.createImage();
				 image.src="data:image/jpg;base64,"+ wx.arrayBufferToBase64(res.result.buffer);
	 
				 image.onload=(res)=>{
				   console.log(res);
	 
				   ctx.drawImage(image, 0, 0,100,100);
				 }
			   }
			 });
	 
			 
		   })
	   }  
			  
		}
	
</script>

<style>

</style>
