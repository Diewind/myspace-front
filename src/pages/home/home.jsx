import React,{Component} from 'react';
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util,
} from 'bizcharts';

const { Line } = Guide;

class Home extends Component {
  render() {
    const data = [
      {
        month: 'Jan',
        city: 'China',
        revenue: 7,
      },
      {
        month: 'Jan',
        city: 'Oversea',
        revenue: 3.9,
      },
      {
        month: 'Feb',
        city: 'China',
        revenue: 6.9,
      },
      {
        month: 'Feb',
        city: 'Oversea',
        revenue: 4.2,
      },
      {
        month: 'Mar',
        city: 'China',
        revenue: 9.5,
      },
      {
        month: 'Mar',
        city: 'Oversea',
        revenue: 5.7,
      },
      {
        month: 'Apr',
        city: 'China',
        revenue: 14.5,
      },
      {
        month: 'Apr',
        city: 'Oversea',
        revenue: 8.5,
      },
      {
        month: 'May',
        city: 'China',
        revenue: 18.4,
      },
      {
        month: 'May',
        city: 'Oversea',
        revenue: 11.9,
      },
      {
        month: 'Jun',
        city: 'China',
        revenue: 21.5,
      },
      {
        month: 'Jun',
        city: 'Oversea',
        revenue: 15.2,
      },
      {
        month: 'Jul',
        city: 'China',
        revenue: 25.2,
      },
      {
        month: 'Jul',
        city: 'Oversea',
        revenue: 17,
      },
      {
        month: 'Aug',
        city: 'China',
        revenue: 26.5,
      },
      {
        month: 'Aug',
        city: 'Oversea',
        revenue: 16.6,
      },
      {
        month: 'Sep',
        city: 'China',
        revenue: 23.3,
      },
      {
        month: 'Sep',
        city: 'Oversea',
        revenue: 14.2,
      },
      {
        month: 'Oct',
        city: 'China',
        revenue: 18.3,
      },
      {
        month: 'Oct',
        city: 'Oversea',
        revenue: 10.3,
      },
      {
        month: 'Nov',
        city: 'China',
        revenue: 13.9,
      },
      {
        month: 'Nov',
        city: 'Oversea',
        revenue: 6.6,
      },
      {
        month: 'Dec',
        city: 'China',
        revenue: 9.6,
      },
      {
        month: 'Dec',
        city: 'Oversea',
        revenue: 4.8,
      },
    ];
    const cols = {
      month: {
        range: [0, 1],
      },
    };
    return (
      <div style={{marginTop:'10%'}}>
        <Chart height={400} data={data} scale={cols} forceFit>
          <Legend />
          <Axis name="month" />
          <Axis
            name="revenue"
            label={{
              formatter: val => `${val}亿`,
            }}
          />
          <Tooltip
            crosshairs={{
              type: 'y',
            }}
          />
          <Geom type="line" position="month*revenue" size={2} color={'city'} />
          <Geom
            type="point"
            position="month*revenue"
            size={4}
            shape={'circle'}
            color={'city'}
            style={{
              stroke: '#fff',
              lineWidth: 1,
            }}
          />
          <Guide>
            <Line
              top // {boolean} 指定 guide 是否绘制在 canvas 最上层，默认为 false, 即绘制在最下层
              start={{ month: 'Aug', revenue: 26.5 }} // {object} | {function} | {array} 辅助线结束位置，值为原始数据值，支持 callback
              end={{ month: 'Dec', revenue: 29 }} // 同 start
              lineStyle={{
                stroke: '#999', // 线的颜色
                lineDash: [0, 2, 2], // 虚线的设置
                lineWidth: 3, // 线的宽度
              }} // {object} 图形样式配置 https://bizcharts.net/products/bizCharts/api/graphic#线条样式
              text={{
                position: 'start', // 'start' | 'center' | 'end' | '39%' | 0.5 文本的显示位置
                autoRotate: true, // {boolean} 是否沿线的角度排布，默认为 true
                style: {
                  fill: 'red',
                }, // {object}文本图形样式配置,https://bizcharts.net/products/bizCharts/api/graphic#文本属性
                offsetX: 20, // {number} x 方向的偏移量
                offsetY: -10, // {number} y 方向的偏移量
                content: '预期收益趋势线', // {string} 文本的内容
              }}
            />
          </Guide>
        </Chart>
      </div>
    );
  }
}

export default Home;
