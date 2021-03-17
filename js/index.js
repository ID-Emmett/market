// 地图
const mapFn = (value) => {
  let map = echarts.init(document.getElementById("map"));
  let option = {
    geo: {
      map: "china",
      aspectScale: 0.75,
      layoutCenter: ["50%", "51.5%"], //地图位置
      layoutSize: "118%",
      roam: false, //禁止滚动放大与拖动
      itemStyle: {
        normal: {
          borderColor: "rgba(147, 235, 248, 1)", //底部地图边框色
          borderWidth: 0.5,
          color: {
            type: "linear-gradient",
            x: 0,
            y: 1500,
            x2: 2500,
            y2: 0,
            colorStops: [
              {
                //底部地图颜色
                offset: 0,
                color: "#009DA1", // 0% 处的颜色
              },
              {
                offset: 1,
                color: "#005B9E", // 50% 处的颜色
              },
            ],
            global: true, // 缺省为 false
          },
          opacity: 0.5,
        },
        emphasis: {
          areaColor: "#2a333d", //hover底部地图颜色
        },
      },
      regions: [
        {
          name: "南海诸岛",
          itemStyle: {
            // 隐藏地图
            normal: {
              opacity: 0, // 为 0 时不绘制该图形
            },
          },
          label: {
            show: false, // 隐藏文字
          },
        },
      ],
      z: 2,
    },
    series: [
      {
        type: "map",
        map: "china",
        tooltip: {
          show: false,
        },
        label: {
          show: true,
          color: "#1A6F73",
          fontSize: 14,
        },
        aspectScale: 0.75,
        layoutCenter: ["50%", "50%"], //地图位置
        layoutSize: "118%",
        roam: false,
        itemStyle: {
          normal: {
            borderColor: "rgba(0, 91, 97, 0.6)",
            borderWidth: 0.8,
            areaColor: {
              type: "linear-gradient",
              x: 0,
              y: 1200,
              x2: 1000,
              y2: 0,
              colorStops: [
                {
                  offset: 0,
                  color: "rgb(0, 196, 200)", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "rgb(0, 196, 200)", // 50% 处的颜色
                },
              ],
              global: true, // 缺省为 false
            },
          },
          emphasis: {
            //顶部选中区域颜色
            areaColor: "rgba(252, 25, 68, 0.7)",
            borderColor: "red",
            label: {
              // 在文本中，可以对部分文本采用 rich 中定义样式。
              // 这里需要在文本中使用标记符号：
              // `{styleName|text content text content}` 标记样式名。
              // 注意，换行仍是使用 '\n'。
              formatter: [
                "{b| }",
                "{a|{b}游客量月度预测}",
                "{x| {c}}", //显示数据
                "{d| 万人次}",
                // "{c|广西游客量月度预测}",
              ].join("\n"),
              // 这里是文本块的样式设置：
              color: "#333",
              fontSize: 14,
              fontFamily: "Arial",
              borderWidth: 3,
              // backgroundColor: "#984455",
              padding: [-40, -30, 20, 200],
              // margin:[50,20,5,10],
              lineHeight: 20,

              // rich 里是文本片段的样式设置：
              rich: {
                a: {
                  color: "#C95555",
                  lineHeight: 30,
                  padding: [100, 12, 30, 60],
                },
                b: {
                  backgroundColor: {
                    image: "./images/labelwind2.png",
                  },
                  height: 80,
                  lineHeight: 0,
                },
                x: {
                  fontSize: 32,
                  color: "#fff",
                  fontFamily: "Akrobat-Black",

                  padding: [94, 60, 30, 60],
                },
                d: {
                  fontSize: 14,
                  color: "#fff",
                  padding: [90, -140, -6, 0],
                },
              },
            },
          },
        },
        data: value,
        zlevel: 1,
      },
    ],
  };

  map.setOption(option);
};
// 虚拟地图数据
let mapList = [
  {
    name: "广西",
    value: "456789",
    // selected: true, //默认选中
  },
  {
    name: "广东",
    value: "122345",
    // selected: false, //默认不选中
  },
  {
    name: "内蒙古",
    value: "122345",
  },
  {
    name: "西藏",
    value: "122345",
  },
];
// 指定默认选择的城市
for (let i = 0; i < mapList.length; i++) {
  if (mapList[i].name === "广西") {
    mapList[i].selected = true;
  }
}
// 传递一个数组,需要的格式为 [{name:城市名称,value:值}] 参考mapList
mapFn(mapList);

// 地图模块下的柱状图

const distribution = (bartu, linetu, citytu) => {
  const distributed = echarts.init(document.getElementById("distributed"));
  // Math.max方法需要传递一个展开数组 或者多个值 不能直接放数组 优化方案
  const valueMax = Math.max(...bartu);
  const maxIndex = bartu.indexOf(valueMax);
  //获取最大值--bartu柱状图列表的最大值下标  原始方案
  // let getMaxIndex = (arr) => {
  //   var max = arr[0];
  //   //声明了个变量 保存下标值
  //   var index = 0;
  //   for (var i = 0; i < arr.length; i++) {
  //     if (max < arr[i]) {
  //       max = arr[i];
  //       index = i;
  //     }
  //   }
  //   return index;
  // };
  //替换下标内容--换成对象形式,实现图表最大值颜色变化
  let maxrep = {
    value: bartu[maxIndex],
    itemStyle: { color: "#D76F56" },
  };
  bartu.splice(maxIndex, 1, maxrep);
  //替换下标内容--换成对象形式,实现折线图最大值颜色变化
  const linevalueMax = Math.max(...linetu); //获取最大值
  const linemaxIndex = linetu.indexOf(linevalueMax); //获取最大值下标
  let maxlinerep = {
    value: linetu[linemaxIndex],
    itemStyle: {
      borderColor: "#D76F56",
      // color: "yellow",
      borderWidth: 4,
    },
  };
  linetu.splice(linemaxIndex, 1, maxlinerep);

  let distributedOption = {
    grid: {
      top: "10%",
      left: "2%",
      right: "2%",
      bottom: "10%",
      containLabel: true,
    },
    tooltip: {
      trigger: "axis",
    },
    xAxis: {
      type: "category",
      data: citytu,
      //x轴线配置
      axisLine: {
        lineStyle: {
          width: 1, //x轴颜色宽度
          color: "#1D4559",
        },
      },
      //刻度相关配置
      axisTick: {
        show: false,
        length: 14,
      },
      axisLabel: {
        interval: 0,

        show: true,
        rotate: 0, //倾斜幅度
        textStyle: {
          //x轴文本颜色
          color: "#42C1C6",
          fontSize: "16px",
        },
      },
      //分割线
      splitLine: {
        show: false,
      },
    },
    yAxis: {
      type: "value",
      scale: true,
      min: 0,
      interval: 50,
      nameGap: 20,
      axisLabel: {
        show: true,
        textStyle: {
          color: "#5788A2",
          fontSize: 16,
        },
      },
      //刻度相关配置
      axisTick: {
        show: false,
        length: 12,
      },
      //轴线配置
      axisLine: {
        show: false,
        lineStyle: {
          width: 1,
          color: "#ccc",
        },
      },
      //分割线
      splitLine: {
        show: false,
      },
    },
    series: [
      //蓝色柱形图
      {
        name: "区内游客量(万人天)",
        data: bartu,
        type: "bar",
        barWidth: 16, //柱形图宽度
        showBackground: false,
        itemStyle: {
          color: "#42C1C6",
        },
        // markPoint: {
        //   //自定义最大值效果
        //   symbol: "rect", //标注为矩形
        //   symbolSize: 20, //标注的大小
        //   symbolOffset: [0, -10], //隐藏标注背景
        //   symbolBackgroundColor:'red',
        //   data: [{ type: "max", itemStyle:{color:'red'},symbol:'roundRect' }],
        // },
      },

      {
        name: "日游客量(万人天)",
        data: linetu,
        emphasis: {
          focus: "series",
        },
        // symbol: "none",
        type: "line",
        itemStyle: {
          //折线图
          normal: { label: { show: false, fontSize: 16 }, color: "#42C1C6" },
        },
        markPoint: {
          //自定义最大值效果
          symbol: "circle", //标注为矩形
          symbolSize: 0.1, //标注的大小
          symbolOffset: [0, -14], //隐藏标注背景
          data: [{ type: "max", label: { color: "#D76F56", fontSize: 16 } }],
        },
      },
    ],
  };
  distributed.setOption(distributedOption); //设置option
};
//广西各地市游客量分布预测柱状图模拟数据
let bartu = [
  170,
  154,
  146,
  119,
  70,
  110,
  110,
  110,
  200,
  130,
  123,
  160,
  144,
  152,
];
//广西各地市游客量分布预测折线图模拟数据
let linetu = [
  260,
  254,
  246,
  219,
  220,
  210,
  210,
  210,
  290,
  230,
  223,
  260,
  244,
  252,
];
//广西各地市游客量分布预测x轴模拟数据
let citytu = [
  "南宁",
  "桂林",
  "柳州",
  "防城港",
  "北海",
  "玉林",
  "钦州",
  "玉林",
  "玉林",
  "玉林",
  "玉林",
  "贵港",
  "玉林",
  "贺州",
];
// 这是柱状图函数 需要传递三个数组  bartu:柱状图数据,linetu:折线图数据,citytu:x轴数据
distribution(bartu, linetu, citytu);

const cirleFn = (id, text, value, color) => {
  let option = {
    title: {
      text: value + "%",
      textStyle: {
        color: "#fff",
        fontSize: 30,
        // fontStyle: "oblique",
        fontWeight: "normal",
        fontFamily: "Akrobat-Bold",
      },
      subtext: text,
      subtextStyle: {
        color: "#fff",
        fontSize: 24,
      },
      itemGap: 50,
      left: "center",
      top: "42%",
    },
    tooltip: {
      formatter: function (params) {
        return '<span style="color: #fff;">' + text + "：" + value + "%</span>";
      },
    },
    angleAxis: {
      max: 100,
      clockwise: false, // 逆时针
      // 隐藏刻度线
      show: false,
    },
    radiusAxis: {
      type: "category",
      show: true,
      axisLabel: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
    },
    polar: {
      center: ["50%", "50%"],
      radius: "150%", //图形大小
    },
    series: [
      {
        type: "bar",
        data: value,
        showBackground: true,
        backgroundStyle: {
          color: "#033844",
        },
        coordinateSystem: "polar",
        roundCap: true,
        barWidth: 6,
        itemStyle: {
          normal: {
            opacity: 1,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: color,
              },
              {
                offset: 1,
                color: color, //渐变色
              },
            ]),
            shadowBlur: 5,
            shadowColor: color,
          },
        },
      },
    ],
  };
  let circle = echarts.init(document.getElementById(id));
  circle.setOption(option);
};
/* 
#06B9D0 汽车颜色
#C95555 飞机颜色
#D76F56 火车颜色
传递四个值,分别是需要渲染的元素id,名称,值和颜色
注意:值需要放到数组中---------↓ []
*/
cirleFn("circle1", "汽车", [36], "#06B9D0");
cirleFn("circle2", "飞机", [21], "#D76F56");
cirleFn("circle3", "火车", [90], "#C95555");

// 内双环线图 月度-------------------------------------------------------
const doubleRing = (men, women) => {
  var getvalue4 = [
    { value: women, itemStyle: { color: "#CA6B68" } },
    { value: men, itemStyle: { color: "#06B9D0" } },
  ];
  let monthlyOption = {
    graphic: [
      {
        // z:0,
        type: "image",
        id: "logo",
        left: "34%",
        top: "34%",
        // z: -10,
        bounding: "raw",
        rotation: 0, //旋转
        origin: [64.5, 32.5], //中心点
        scale: [1.0, 1.0], //缩放
        style: {
          image: "./images/user.png",
          // width: 129,
          // height: 65,
          opacity: 1,
        },
      },
    ],
    angleAxis: {
      max: 100,
      clockwise: true, // 逆时针
      // 隐藏刻度线
      show: false,
    },
    radiusAxis: {
      type: "category",
      show: true,
      axisLabel: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
    },
    polar: {
      center: ["50%", "50%"],
      radius: [40, 75], //图形大小
    },

    series: [
      {
        type: "bar",
        data: getvalue4,
        showBackground: true,
        backgroundStyle: {
          color: "#033844",
        },
        coordinateSystem: "polar",
        roundCap: true,
        barWidth: 6,
      },
    ],
  };
  let monthlyOption2 = {
    backgroundColor: "black",
    angleAxis: {
      type: "value",
      min: 0,
      max: 100,
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
    },
    radiusAxis: {
      type: "category",
      z: 100,
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        show: true,
        margin: 6,
        fontSize: 10,
        formatter: function (value, index) {
          var list = [12, 25];
          return list[index] + "%";
        },
        textStyle: {
          color: "#96F5F6",
        },
        interval: 0,
      },
    },
    polar: {
      center: ["51%", "40%"],
      radius: [40, 75], //图形大小
    },
    tooltip: {
      show: true,
    },
    series: [
      {
        type: "bar",
        data: [getvalue4[0], 0],
        coordinateSystem: "polar",
        name: "女性游客占",
        stack: "a",
        roundCap: true,
        itemStyle: {
          color: "#1FB4A7",
          barBorderRadius: 5,
        },
        showBackground: true,
        backgroundStyle: {
          color: "#27333F",
        },
      },
      {
        type: "bar",
        data: [0, getvalue4[1]],
        coordinateSystem: "polar",
        name: "男性游客占",
        stack: "a",
        roundCap: true,
        itemStyle: {
          color: "#424CB9",
          barBorderRadius: 5,
        },
        showBackground: true,
        backgroundStyle: {
          color: "#27333F",
        },
      },
    ],
    legend: {
      bottom: 6,
      icon: "circle",
      itemHeight: 10,
      show: true,
      data: ["男性游客占", "女性游客占"], //底部显示文本
      selectedMode: false,
      textStyle: {
        color: "#96F5F6",
        fontSize: 8,
      },
    },
  };
  let monthly = echarts.init(document.getElementById("monthly"));
  monthly.setOption(monthlyOption);
};
//执行双环图函数  传递两个值,分别是men男性游客与women女性游客
//另:双环图下面的百分比显示需要手动去html上更改,与echarts图表是分离的
doubleRing(90, 30);

// 春节游客出游迁徙趋势预测
const chunleftFn = (lineData, dateData) => {
  let chunleftOption = {
    // backgroundColor: "#fff",
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(0,0,0,0.5)",
      axisPointer: {
        lineStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "red",
              },
              {
                offset: 0.5,
                color: "#48b3FF",
              },
              {
                offset: 1,
                color: "#d9efff",
              },
            ],
            global: false,
          },
        },
      },
    },
    grid: {
      top: "10%",
      left: "7%",
      right: "7%",
      bottom: "10%",
      // containLabel: true
    },
    xAxis: [
      {
        boundaryGap: false,
        type: "category",
        color: "#59588D",
        axisLine: {
          show: true,
          lineStyle: {
            width: 2,
            color: "#023748",
            // opacity:0.2
          },
        },
        axisLabel: {
          color: "#367D89",
          fontSize: 14,
          interval: 0,
        },
        splitLine: {
          // show: true
          // color:'#367D89'
        },

        axisTick: {
          show: false,
        },
        // boundaryGap: true,
        data: dateData,
      },
    ],

    yAxis: [
      {
        type: "value",
        min: 0,
        splitNumber: 4,
        splitLine: {
          show: true,
          lineStyle: {
            color: "#092F3C",
            // opacity:0.2
          },
        },
        axisLine: {
          show: false,
        },
        axisLabel: {
          show: false,
          // margin: 20,
          textStyle: {
            color: "#42C1C6",
          },
        },
        axisTick: {
          show: false,
        },
        // 	splitLine: {//背景横线
        // 		lineStyle: {
        // 			color: 'rgba(131,101,101,0.2)',
        // 			type: 'solid',
        // 		}
        // 	}
      },
    ],
    series: [
      {
        name: "",
        type: "line",
        // smooth: true, //是否平滑
        showAllSymbol: true,
        symbol: "none", //显示折线顶部小点
        symbolSize: 10,
        lineStyle: {
          normal: {
            color: "#48B3FF",
          },
        },
        label: {
          show: false,
          position: "top",
          textStyle: {
            color: "#48B3FF",
          },
        },

        itemStyle: {
          color: "#FFF",
          borderColor: "#48B3FF",
          borderWidth: 2,
        },
        tooltip: {
          show: true,
        },
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: "rgba(6,181,205,1)",
                },
                {
                  offset: 1,
                  color: "rgba(0,45,57,0.1)",
                },
              ],
              false
            ),
            shadowColor: "rgba(0,100,100,0.1)",
            shadowBlur: 20,
          },
        },
        data: lineData,
      },
    ],
  };
  let chunleft = echarts.init(document.getElementById("chunleft"));
  chunleft.setOption(chunleftOption);
};
// 折线模拟数据
let lineData = [55, 35, 62, 55, 97, 64, 66];
// X轴模拟数据
let dateData = ["2.11", "2.12", "2.13", "2.14", "2.15", "2.16", "2.17"];
//传递两个参数,分别是 x轴数据与折线数据
chunleftFn(lineData, dateData);
