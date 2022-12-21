<template>
  <div class="chart">
    <div class="chart__header">
      <ul>
        <li>近一年的借书量</li>
      </ul>
    </div>

    <div class="chart__container">
      <v-chart :option="chartOption" autoresize />
    </div>
  </div>
</template>

<script lang="ts">
import * as echarts from 'echarts'
import { GetBookData } from '@/api'

export default defineComponent({
  setup() {
    const chartOption = ref<any>()

    GetBookData().then((data) => {
      console.log(data)
      chartOption.value = {
        grid: {
          top: '20px',
          bottom: '30px',
          right: '5%',
          left: '5%',
          containLabel: true,
        },
        tooltip: {
          trigger: 'axis',
          position: function (pt) {
            return [pt[0], '10%']
          },
        },
        toolbox: {
          feature: {
            dataZoom: {
              yAxisIndex: 'none',
            },
            // restore: {},
            // saveAsImage: {},
          },
          top: '-5px',
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: data.date,
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '100%'],
        },
        dataZoom: [
          {
            type: 'inside',
          },
        ],
        series: [
          {
            name: '借书量',
            type: 'line',
            symbol: 'none',
            sampling: 'lttb',
            itemStyle: {
              color: 'rgb(66, 52, 255)',
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgb(70, 184, 255)',
                },
                {
                  offset: 1,
                  color: 'rgb(68, 84, 255)',
                },
              ]),
            },
            data: data.num,
          },
        ],
      }
    })

    return {
      chartOption,
    }
  },
})
</script>

<style lang="scss" scoped>
.chart {
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 50px;
    padding: 0 20px;

    ul {
      padding: 0;
      li {
        list-style: none;
        float: left;
        margin-right: 20px;
        font-size: 15px;
        color: #000;
        font-weight: bold;
        cursor: pointer;
      }
    }
  }

  &__container {
    height: 300px;
    padding: 0 15px;

    .echarts {
      height: 100%;
      width: 100%;
    }
  }
}
</style>
