<template>
  <div class="total-wrap" :style="{marginTop: isMainNode?'11px':'3px'}">
    <div class="node-container">
      <div class="node-container-left">
        <div class="tag-container">
          <img v-if="isMainNode" :src="nodeIconUrl" />
          <div v-else class="node-tag-container">
            <div class="node-tag"></div>
          </div>
        </div>
        <div
          class="line-container"
          :style="{height: isMainNode?'71px':'22px', paddingTop: isMainNode?'11px':'4px'}"
        >
          <div v-if="!isFirst" class="line" :style="{height: isMainNode?'60px':'40px'}"></div>
        </div>
      </div>
      <div class="node-container-right" :style="{paddingTop: isMainNode?'0':'4px'}">
        <div
          v-if="isMainNode"
          class="node-title"
          :style="{color: isNewest?'#222':'#999'}"
        >{{nodeData.statusName}}</div>
        <div
          class="node-desc"
          :style="{color: isNewest?'#4b4b4b':'#999', marginTop: isMainNode?'5px':'0'}"
        >{{acceptStationFixed}}</div>
        <div v-if="nodeData.phone" class="node-phone">{{nodeData.phone}}</div>
        <div class="node-time">{{nodeData.createTime}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import img1 from './images/ic-order-commit.png';
import img2 from './images/ic-order-commit-G.png';
import img3 from './images/ic-paied.png';
import img4 from './images/ic-paied-G.png';
import img5 from './images/ic-pacakaging.png';
import img6 from './images/ic-pacakaging-G.png';
import img7 from './images/ic-sending.png';
import img8 from './images/ic-sending-G.png';
import img9 from './images/ic-delivering.png';
import img10 from './images/ic-delivering-G.png';
export default {
  props: {
    isNewest: {
      type: Boolean,
      default: false
    },
    isFirst: {
      type: Boolean,
      default: false
    },
    isMainNode: {
      type: Boolean,
      default: false
    },
    nodeData: {
      type: Object,
      default() {
        return {
          status: "",
          statusName: "",
          createTime: "2019-01-01 00:00:00",
          acceptStation: "xxxxxx"
        };
      }
    }
  },
  computed: {
    nodeIconUrl() {
      if (this.nodeData.status === "WATTING_PAY") {
        // 待付款
        return this.isNewest
          ? img1
          : img2;
      } else if (this.nodeData.status === "PAYED") {
        // 待发货
        return this.isNewest
          ? img3
          : img4;
      } else if (this.nodeData.status === "WATTING_DELIVER") {
        // 已揽件
        return this.isNewest
          ? img5
          : img6;
      } else if (this.nodeData.status === "DELIVERING") {
        // 运输中
        return this.isNewest
          ? img7
          : img8;
      } else if (this.nodeData.status === "COMPLETE") {
        // 已完成
        return this.isNewest
          ? img9
          : img10;
      } else {
        return false;
      }
    },
    acceptStationFixed() {
      if (!this.nodeData.acceptStation) return "";
      return this.nodeData.acceptStation.replace(/(\d{3})\d{4}(\d{4})/, "");
    }
  }
};
</script>
<style lang="scss" scoped>
.total-wrap {
  margin-top: 22px;
  width: 100%;
  .node-container {
    width: 100%;
    height: auto;
    display: flex;
    &-left {
      width: 22px;
      height: auto;
      .tag-container {
        width: 22px;
        height: 22px;
        img {
          width: 22px;
          height: 22px;
        }
        .node-tag-container {
          width: 22px;
          height: 22px;
          display: flex;
          justify-content: center;
          align-items: center;
          .node-tag {
            width: 7px;
            height: 7px;
            background-color: #dcdcdc;
            border-radius: 50%;
          }
        }
      }
      .line-container {
        box-sizing: border-box;
        width: 22px;
        display: flex;
        align-items: center;
        justify-content: center;
        .line {
          width: 2px;
          background-color: #dcdcdc;
        }
      }
    }
    &-right {
      flex: 1;
      box-sizing: border-box;
      padding: 0 10px 0 24px;
      .node-title {
        width: 100%;
        height: 20px;
        line-height: 22px;
        color: #222;
        font-size: 14px;
        font-family: "PingFangSC-Medium";
      }
      .node-desc {
        margin-top: 8px;
        width: 100%;
        min-height: 15px;
        line-height: 15px;
        color: #222;
        font-size: 12px;
        font-family: "PingFangSC-Regular";
        word-wrap: break-word;
        word-break: normal;
      }
      .node-phone {
        margin-top: 4px;
        width: 100%;
        height: 26px;
        line-height: 13px;
        color: #fe4e2c;
        font-size: 13px;
        font-family: "Avenir-Medium";
      }
      .node-time {
        margin-top: 6px;
        width: 100%;
        height: 17px;
        line-height: 17px;
        color: #999;
        font-size: 12px;
        font-family: "Avenir-Book";
      }
    }
  }
}
</style>