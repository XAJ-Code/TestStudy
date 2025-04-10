<template>
  <div class="GaoJingReport-container">
    <el-dialog v-model="dialogVisible" title="高" width="80%">
      <div class="report-container" id="printable">
        <template v-for="item in 8" :key="item">
          <div class="page-break" v-if="item >= 2"></div>
          <!-- 报告标题 -->
          <div class="report-header">
            <h2>検 反 結 果 報 告 書</h2>
          </div>

          <!-- 基本信息表格 -->
          <div class="basic-info">
            <div class="info-wrapper">
              <table>
                <tbody>
                  <tr>
                    <td>
                      <span>持意先：</span>
                      <span>申美（上海）贸易有限公</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>請求先：</span>
                      <span contenteditable>申美（上海）贸易有限公司</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>入荷先：</span>
                      <span>知稲</span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="company-info">
                <div>No：{{ reportNo }}</div>
                <div>日付：{{ reportDate }}</div>
                <div class="address">
                  太仓高井纺织品有限公司<br />
                  品质管理部 製品課<br />
                  TEL:(0512)5345-2116 FAX:(0512)5345-2262
                </div>
              </div>
            </div>
          </div>

          <!-- 在基本信息表格后添加品名信息 -->
          <div class="product-info">
            <table>
              <tbody>
                <tr>
                  <td class="label">仮品番</td>
                  <td>1</td>
                  <td class="label">品 番</td>
                  <td>CD-252/GA1992-2</td>
                </tr>
              </tbody>
            </table>
            <table>
              <tbody>
                <tr>
                  <td class="label">柄No.</td>
                  <td>TH08</td>
                  <td class="label">柄名</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- 修改检验数据区域 -->
          <div class="inspection-data" v-for="item in 5" :key="item">
            <!-- 带序号的标尺区域 -->
            <div class="ruler-area">
              <div class="sequence-column">
                <div class="seq-number">{{ item }}</div>
              </div>
              <div class="ruler-placeholder">
                <div class="data-row">
                  <div class="info-section">
                    <table>
                      <tbody>
                        <tr>
                          <td>反番</td>
                          <td>1</td>
                          <td>総長</td>
                          <td>64.2 m</td>
                          <td>高井総長</td>
                          <td>64.2 m</td>
                          <td>高井巾</td>
                          <td>0</td>
                          <td>点数</td>
                          <td>10</td>
                          <td rowspan="2" style="writing-mode: vertical-rl;width: 20px;">格付</td>
                          <td rowspan="2" style="width: 40px;">A品</td>
                        </tr>
                        <tr>
                          <td>有効巾</td>
                          <td>149 cm</td>
                          <td>純長</td>
                          <td>64.2 m</td>
                          <td>高井純長</td>
                          <td>60.2 m</td>
                          <td>補修箇所</td>
                          <td></td>
                          <td>S箇</td>
                          <td>4</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <!-- 下方区域 -->
                <div class="bottom-section">
                  <div class="content">内容</div>
                  <div class="ruler">
                    <!-- <trickMarks /> -->
                    <div class="ruler-container">
                      <!-- 主刻度线 -->
                      <div v-for="tick in ticks" :key="tick" class="tick"
                        :style="{ left: `${tick / props.rulerLength * 100}%` }">
                        <span class="tick-label">{{ tick }}</span>
                      </div>

                      <!-- 瑕疵标记线 -->
                      <div v-for="(defect, index) in defects" :key="defect.position" class="defect-marker"
                        :style="{ left: ((defect.position) / props.rulerLength * 100) + '%', height: (index % 2 === 0) ? '60px' : '40px' }">
                        <!-- <span class="defect-label">{{ defect.label }}</span> -->
                      </div>
                    </div>
                  </div>
                </div>
                <!-- 目付区域 -->
                <div class="comment-area">
                  <table class="weight-table">
                    <tbody>
                      <tr>
                        <td class="label" rowspan="1" height="18px">目付</td>
                        <td>0 g/m</td>
                        <td>62.2-64.2M/2Mスレカット済み</td>
                      </tr>
                      <tr>
                        <td class="label" rowspan="2">カードNo</td>
                        <td rowspan="2">&nbsp;</td>
                        <td>&nbsp;</td>
                      </tr>
                      <tr>
                        <td>&nbsp;</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

              </div>
            </div>
          </div>
        </template>
      </div>
      <template #footer>
        <el-button @click="close">关闭</el-button>
        <el-button type="primary" v-print="'#printable'">打印</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup name="GaoJingReport">
import { computed, ref } from 'vue';
const dialogVisible = ref(false);
const reportNo = ref('20250319I');
const reportDate = ref('2025年03月19日');

//打印插件
//vue-print-next

interface Defect {
  position: number;
  label: string;
}

const props = defineProps({
  // 瑕疵位置
  defects: {
    type: Array as any,
    default: () => [
      {
        position: 11.5,
        label: '瑕疵2'
      },
      {
        position: 15,
        label: '瑕疵3'
      },
      {
        position: 97,
        label: '色坯'
      }
    ]
  },
  // 标尺长度
  rulerLength: {
    type: Number,
    default: 200
  },
});

// 生成刻度线位置
const ticks = computed(() => {
  return Array.from({ length: (props.rulerLength / 10) + 1 }, (_, index) => index * 10);
});

const inspectionData = ref([
  {
    number: 1,
    width: 149,
    length1: 64.2,
    length2: 64.2,
    inspLength: 60.2,
    finalWidth: 60.2,
    o: 0,
    points: 14,
    pieces: 1,
    grade: 'A級',
    weight: 0
  },
  // 可以添加更多数据...
]);

const open = () => {
  dialogVisible.value = true;
};

const close = () => {
  dialogVisible.value = false;
};

defineExpose({
  open
});
</script>

<style lang="scss" scoped>
.GaoJingReport-container {
  :deep(.el-dialog__body) {
    padding: 0;
    height: calc(100vh - 200px);
    overflow-y: auto;
  }
}

.report-container {
  padding: 10px;
  background: #fff !important;
  height: 100%;
}

.report-header {
  text-align: center;
  margin-bottom: 5px;

  h2 {
    font-size: 24px;
    font-weight: bold;
  }
}

// 基本信息表格
.basic-info {
  .info-wrapper {
    display: flex;
    justify-content: space-between;

    table {
      width: 60%;
      border-collapse: collapse;

      td {
        padding: 8px;
        border: 2px solid #000;

        //第一个span
        span:first-child {
          font-weight: bold;
        }
      }

      // 最后一个td
      td:last-child {
        border-bottom: none;
      }
    }

    .company-info {
      width: 300px;
      padding-left: 20px;
      text-align: right;

      .address {
        margin-top: 10px;
        font-size: 14px;
        line-height: 1.5;
      }
    }
  }
}

.product-info {
  display: flex;

  table {
    border-collapse: collapse;

    tr {
      width: 100%;
    }

    td {
      padding: 0 5px;
      border: 2px solid #000;
      font-size: 12px;
      text-align: center;

      &.label {
        background-color: #f5f5f5;
        font-weight: normal;
        text-align: center;
      }

      &:nth-child(odd) {
        width: 70px !important;
        letter-spacing: 1px;
      }

      &:nth-child(even) {
        min-width: 56px;
      }
    }
  }

  //第一个table
  table:first-child {
    width: 60%;

    td {
      &:nth-child(odd) {
        width: 80px !important;
      }
    }
  }

  //第二个table
  table:last-child {
    width: 40%;

    //第一个td
    td:first-child {
      border-left: none;
    }
  }
}

//检验数据区域
.inspection-data {

  .ruler-area {
    display: flex;
    width: 100%;

    //前面的序号
    .sequence-column {
      width: 20px;
      border: 2px solid #000;
      border-right: none;
      border-top: none;
      background-color: #f5f5f5;
      display: flex;
      align-items: center;
      justify-content: center;

      .seq-number {
        font-weight: bold;
        font-size: 12px;
      }
    }

    .ruler-placeholder {
      // height: 150px;
      flex: 1;
      display: flex;
      flex-direction: column;

      .data-row {
        display: flex;

        //标尺上方信息区域
        .info-section {
          width: 100%;

          table {
            width: 100%;
            border-collapse: collapse;

            td {
              border: 2px solid #000;
              border-top: none;
              letter-spacing: 1px;
              text-align: center;
              font-size: 12px;
              white-space: nowrap;

              &:nth-child(odd) {
                background-color: #f5f5f5;
                width: 60px;
                padding: 0 5px;
              }

              //偶数
              &:nth-child(even) {
                min-width: 53px;
              }
            }
          }
        }
      }

      //标尺区域
      .bottom-section {
        display: flex;

        .content {
          border: 2px solid #000;
          border-right: none;
          border-top: none;
          writing-mode: vertical-rl;
          text-align: center;
        }

        .ruler {
          flex: 1;
          border: 2px solid #000;
          border-top: none;
          height: 80px;

          .ruler-container {
            position: relative;
            height: 100%;
            width: 90%;
            margin: 0;
            margin-left: 1%;
            // border-bottom: 2px solid #333;
            // margin: 20px 0;
          }

          .tick {
            position: absolute;
            top: 1.5pt;
            width: 2px;
            height: 5px;
            background: #666;
            transform: translateX(-50%);
          }

          .tick-label {
            position: absolute;
            top: 15px;
            left: 50%;
            transform: translateX(-50%);
            transform: translateY(280%);
            font-size: 12px;
            color: #333;
          }

          .defect-marker {
            position: absolute;
            margin-bottom: 5px;
            top: 0;
            width: 2px;
            height: 40px;
            background: #ff4444;
            transform: translateX(-50%);
          }

          .defect-label {
            position: absolute;
            top: -20px;
            left: 50%;
            transform: translateX(-50%);
            color: #ff4444;
            font-size: 12px;
            white-space: nowrap;
          }
        }
      }

      //目付区域
      .comment-area {
        // margin-top: -2px;

        .weight-table {
          width: 100%;
          border-collapse: collapse;

          td {
            border: 2px solid #000;
            border-top: none;
            padding: 0 5px;
            font-size: 12px;

            &.label {
              background-color: #f5f5f5;
              font-weight: normal;
              width: 80px;
              text-align: center;
            }

            &:nth-child(2) {
              width: 120px;
              text-align: center;
            }
          }
        }
      }
    }
  }
}
</style>

<style lang="scss">

@media print {
  @page {
    size: A4;
    margin: 0.5cm;
  }

  body {
    margin: 0 !important;
    padding: 0 !important;
    height: auto !important;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }

  html, body, #app {
    background-color: white !important;
  }

  * {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
    background-image: none !important;
    color: black !important;
  }

  .page-break {
    page-break-after: always !important;
  }

  .report-header {
    //避免分页
    page-break-before: avoid !important;
    page-break-after: avoid !important;
  }
}
</style>
