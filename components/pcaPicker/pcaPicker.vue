<template>		
	<view class="pcaPicker" @touchmove.stop.prevent="preventTouchMove">
	  <view :class="popFlag?'popMask':''" @click="hide"></view>
	  <view class="popBottom" :class="popFlag?'popRound':''">
	    <view class="head">
	      <text class="t1" @click="hide">关闭</text>
	      <text class="t2" @click="confirm">确认</text>
	    </view>
	    <picker-view :value="pcaIndex" @change="pcaChange">
	      <picker-view-column>
	        <block v-for="(item,index) in pcaArr" :key="index">
	          <view>{{item.name}}</view>
	        </block>
	      </picker-view-column>
	      <picker-view-column>
	        <block v-for="(item,index) in pcaArr[pcaIndex[0]].children" :key="index">
	          <view>{{item.name}}</view>
	        </block>
	      </picker-view-column>
	      <picker-view-column>
	        <block v-for="(item,index) in pcaArr[pcaIndex[0]].children[pcaIndex[1]].children" :key="index">
	          <view>{{item.name}}</view>
	        </block>
	      </picker-view-column>
	    </picker-view>
	  </view>
	</view>
</template>

<script>
	let pcaData=require('./pcaData.js').pca;
	export default {
		data() {
			return {
				popFlag:false,
				pcaArr:pcaData,
				pcaIndex:[0,0,0],
			}
		},
		methods: {
			// 防穿透
			preventTouchMove(){},
			// 滚动切换
			pcaChange(e){
			  let currentIndex=e.detail.value;
			  if(currentIndex[0]!=this.pcaIndex[0]){
			    this.pcaIndex.splice(0,3,currentIndex[0],0,0);
			    return;
			  }
			  if(currentIndex[1]!=this.pcaIndex[1]){
			    this.pcaIndex.splice(1,2,currentIndex[1],0);
			    return;
			  }
			  if(currentIndex[2]!=this.pcaIndex[2]){
			    this.pcaIndex.splice(2,1,currentIndex[2]);       
			    return;
			  }      
			},
			// 显示
			show(e){
			  this.popFlag=true;
			},
			// 隐藏
			hide(e){
			  this.popFlag=false;
			},
			// 确认
			confirm(e){
			  let current=this.pcaArr[this.pcaIndex[0]].name+''+this.pcaArr[this.pcaIndex[0]].children[this.pcaIndex[1]].name+''+this.pcaArr[this.pcaIndex[0]].children[this.pcaIndex[1]].children[this.pcaIndex[2]].name;
				this.$emit('confirm',current)
			  this.hide();
			}
		}

	}
</script>

<style>
	.pcaPicker>.popMask {
	  position: fixed;
	  top: 0;
	  right: 0;
	  left: 0;
	  bottom: 0;
	  background: rgba(0, 0, 0, 0.6);
	  z-index: 10000;
	}
	.pcaPicker>.popBottom{
	  width: 100vw;
		background-color: #ffffff;
		font-size: 32rpx;
	  position: fixed;
	  bottom:0;
	  left:0;
	  transition: all 0.3s ease;
	  transform: translateY(100%);
	  opacity: 0;
	  z-index: 20000;
	}
	.pcaPicker>.popRound{
	  transition: all 0.3s ease;
	  transform: translateX(0);
	  opacity: 1;
	}
	.pcaPicker>.popBottom>.head{
	  width: 100%;
	  height: 80rpx;
	  display: flex;
	  align-items: center;
	  justify-content: space-between;
	  box-sizing: border-box;
	  padding: 0 30rpx 0 30rpx;
	  border-bottom: 1px solid #f0f0f0;
	}
	.pcaPicker>.popBottom>.head>text{
	  display: block;
	  width: 100rpx;
	  height: 100%;
	  text-align: center;
	  line-height: 80rpx;
	  font-weight: bold;
	}
	.pcaPicker>.popBottom>.head>.t1{  
	  color: #888888;
	}
	.pcaPicker>.popBottom>.head>.t2{
	  color: #8DDBE6;
	}
	.pcaPicker>.popBottom>picker-view{
		height: 500rpx;
	}
	.pcaPicker>.popBottom>picker-view view{
		text-align: center;
		line-height: 68rpx;
	}
</style>
