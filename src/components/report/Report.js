import React, { useEffect } from "react";
import hand from "../../assets/images/hand.png";
import * as echarts from "echarts";

function initChartsGauge(props) {
  let option = {
    tooltip: {
      formatter: "{a} <br/>{b} : {c}%",
    },

    series: [
      {
        axisLine: {
          // show :false,
          lineStyle: {
            color: [[1, "#65d4df"]],
            // opacity : 1,
            // width : 20,
            // shadowBlur: 20,
            // shadowColor: "#fff",
          },
        },
        name: "Pressure",
        type: "gauge",
        progress: {
          show: true,
          width: 60,
          itemStyle: {
            color: {
              x: 1,
              y: 0.8,
              x2: 0,
              y2: 0.3,
              colorStops: [
                {
                  offset: 0,
                  color: "rgba(0,0,233,0.2)", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "rgba(0,0,233,0.4)", // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
          },
        },
        pointer: {
          // 仪表盘指针。
          show: true, // 是否显示指针,默认 true。
          length: "20%", // 指针长度，可以是绝对数值，也可以是相对于半径的百分比,默认 80%。
          width: 5, // 指针宽度,默认 8。
          offsetCenter: [0, "-44%"],
        },
        detail: {
          valueAnimation: true,
          formatter: "{value}",
          color : "#eee",
          // show : false,
          offsetCenter: [0, 0],
        },
        title : {
          color : "#aaa",
        },
        data: [
          {
            value: 50,
            name: props.name
          },
        ],
      },

      {
        name: "Line",
        type: "pie", // 圆圈
        clockWise: false,
        radius: ["25%", "29%"],
        center: [
          // 圆心
          "50%",
          "50%",
        ],
        z: 11,
        tooltip: {
          show: false,
        },
        label: {
          show: false,
        },
        animation: false,
        data: [
          {
            value: 100,
            itemStyle: {
              color: "rgba(0,0,233,0.8)",
            },
          },
        ],
      },
      // {
      //   name: "Line",
      //   type: "pie", // 圆圈
      //   clockWise: false,
      //   radius: ["16%", "22%"],
      //   center: [
      //     // 圆心
      //     "50%",
      //     "50%",
      //   ],
      //   z: 11,
      //   tooltip: {
      //     show: false,
      //   },
      //   label: {
      //     show: false,
      //   },
      //   animation: false,

      //   data: [
      //     {
      //       value: 100,
      //       itemStyle: {
      //         color: {
      //           x: 1,
      //           y: 0.8,
      //           x2: 0,
      //           y2: 0.3,
      //           colorStops: [
      //             {
      //               offset: 0.8,
      //               color: "rgba(0,0,233,0.5)", // 0% 处的颜色
      //             },
      //             {
      //               offset: 1,
      //               color: "rgba(0,0,233,0.8)", // 100% 处的颜色
      //             },
      //           ],
      //           global: false, // 缺省为 false
      //         },
      //       },
      //     },
      //   ],
      // },
    ],
  };

  option && props.myChart.setOption(option);

  window.addEventListener("resize", function () {
    props.myChart.resize();
  });
}

function initChartsBar(props) {
  let option = {
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: "bar",
        showBackground: true,
        backgroundStyle: {
          color: "rgba(180, 180, 180, 0.2)",
        },
      },
    ],
  };

  option && props.myChart.setOption(option);

  window.addEventListener("resize", function () {
    props.myChart.resize();
  });
}

function initChartsProgress(props) {
  const gaugeData = [
    {
      value: 60,
      name: "Commonly",
      title: {
        offsetCenter: ["0%", "32%"],
      },
      detail: {
        valueAnimation: true,
        offsetCenter: ["0%", "40%"],
      },
    },
  ];
  let option = {
    series: [
      {
        type: "gauge",
        startAngle: 90,
        endAngle: -270,
        pointer: {
          show: false,
        },
        progress: {
          show: true,
          overlap: false,
          roundCap: true,
          clip: false,
          itemStyle: {
            borderWidth: 1,
            borderColor: "rgb(148, 210, 221)",
          },
        },
        axisLine: {
          lineStyle: {
            width: 30,
          },
        },
        splitLine: {
          show: false,
          distance: 0,
          length: 10,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false,
          distance: 50,
        },
        data: gaugeData,
        title: {
          fontSize: 14,
        },
        detail: {
          width: 50,
          height: 14,
          fontSize: 14,
          color: "inherit",
          borderColor: "inherit",
          borderRadius: 20,
          borderWidth: 1,
          formatter: "{value}%",
        },
      },
    ],
  };

  option && props.myChart.setOption(option);

  window.addEventListener("resize", function () {
    props.myChart.resize();
  });
}

function BarChair(props) {
  const colorArr = ["#dd6a2a", "#e8d551", "#65af68", "#80d0f2", "#94d2dd"];
  const handArr = ["拇指", "食指", "中指", "无名指", "小指"];
  return (
    <div style={{ display: "flex", flex: 1, height: "100%", padding: "0 10%" }}>
      {props.arr.map((a, index) => {
        return (
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <span style={{ color: "#aaa" }}>{handArr[index]}</span>
            <div
              style={{
                width: "30px",
                backgroundColor: "rgba(101 ,212 ,223,0.1)",
                height: "100%",
                borderRadius: "15px",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  width: "100%",
                  height: `${(a / 10) * 100}%`,
                  backgroundColor: `${colorArr[index]}`,
                  borderRadius: "15px",
                }}
              ></div>
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  width: "100%",
                  color: "#fff",
                  textAlign: "center",
                }}
              >
                {a}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function Report() {
  useEffect(() => {
    const myChart1 = echarts.init(document.getElementById(`myChart1`));
    const myChart2 = echarts.init(document.getElementById(`myChart2`));
    const myChart3 = echarts.init(document.getElementById(`myChart3`));
    // const myChart4 = echarts.init(document.getElementById(`myChart4`));
    const myChart5 = echarts.init(document.getElementById(`myChart5`));
    initChartsGauge({
      yData: [1, 2, 3, 4, 5],
      xData: [],
      index: 0 + 1,
      name: "反应速度",
      myChart: myChart1,
    });

    initChartsGauge({
      yData: [1, 2, 3, 4, 5],
      xData: [],
      index: 0 + 1,
      name: "综合压力",
      myChart: myChart2,
    });

    initChartsGauge({
      yData: [1, 2, 3, 4, 5],
      xData: [],
      index: 0 + 1,
      name: "稳定程度",
      myChart: myChart3,
    });
    // initChartsBar({
    //   yData: [1, 2, 3, 4, 5],
    //   xData: [],
    //   index: 0 + 1,
    //   name: "原始数据",
    //   myChart: myChart4,
    // });
    initChartsProgress({
      yData: [1, 2, 3, 4, 5],
      xData: [],
      index: 0 + 1,
      name: "原始数据",
      myChart: myChart5,
    });
  }, []);

  return (
    <div
      style={{
        display: "flex",
        background: 'linear-gradient(rgb(19, 25, 83) 80%, rgb(48, 60, 98))',
        padding: "2vh 5%",
        flex: 1,
        height: "96vh",
      }}
    >
      {/* <div style={{ flex: 1 }}></div> */}
      <div
        style={{
          flex: 2.5,
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img style={{ width: "100%" }} src={hand} alt="" />
      </div>
      <div
        style={{
          flex: 5,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          paddingLeft : '30px'
        }}
      >
        {/* 
"#65d4df"
                                    : "#468493" */}
        <div
          style={{
            flex: 1,
            display: "flex",
            color: "#65d4df",
            flexDirection: "column",
            position: "relative",
          }}
        >
          <span
            style={{
              color: "#65d4df",
              fontSize: "28px",
            }}
          >
            反应速度
          </span>
          <div
            style={{
              flex: 1,
              display: "flex",
              color: "#65d4df",
              alignItems: "center",
            }}
          >
            <div id="myChart1" style={{ width: 450, height: 450 }}></div>
            <div id="myChart2" style={{ width: 400, height: 400 }}></div>
            <div id="myChart3" style={{ width: 400, height: 400 }}></div>
          </div>
        </div>
        <div style={{ flex: 1, display: "flex", width: "100%" }}>
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              paddingBottom: "20px",
            }}
          >
            <div
              style={{
                color: "#65d4df",
                fontSize: "28px",
                marginBottom: "20px",
              }}
            >
              分类得分
            </div>
            {/* <div id="myChart4" style={{ width: "60%", height: 400 }}></div> */}

            <BarChair arr={[9, 9, 7, 8, 3]} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ color: "#65d4df", fontSize: "28px" }}>综合得分</div>
            <div id="myChart5" style={{ flex: 1, height: 400 }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
