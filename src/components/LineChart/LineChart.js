import React from "react";
import {
  Chart,
  Series,
  CommonSeriesSettings,
  Legend,
  ValueAxis,
  Title,
  Export,
  Tooltip,
  Font
} from "devextreme-react/chart";
import {
  container,
  chartContainer,
  chartArea,
  chartTitle
} from "./LineChart.module.css";

const dataSource = [
  {
    date: 1,
    name: "Jajecznica i pieczywo",
    kcal: 390,
    type: "śniadanie"
  },
  {
    date: 2,
    name: "Wrap z jajkiem i bekonem",
    kcal: 421,
    type: "obiad"
  },
  {
    date: 3,
    name: "Placki owsiane z cukinia",
    kcal: 327,
    type: "kolacja"
  }
];

class LineChart extends React.Component {
  customizeTooltip(arg) {
    return {
      text: `${arg.seriesName} years: ${arg.valueText}`
    };
  }
  render() {
    return (
      <div className={chartContainer}>
        <div className={chartTitle}>
          <h1 style={{ color: "white" }}>Dzienna suma kalorii</h1>
        </div>
        <div className={chartArea}>
          <Chart className={container} dataSource={dataSource}>
            <CommonSeriesSettings
              argumentField={"date"}
              type={"stackedBar"}
              color="lightgreen"
            />
            <Series valueField={"kcal"} name={"Kcal"} />
            <ValueAxis position={"right"}>
              <Title text={"[kcal]"}>
                <Font color="white" />
              </Title>
            </ValueAxis>
            <Legend
              verticalAlignment={"bottom"}
              horizontalAlignment={"center"}
              itemTextPosition={"top"}
            />
            <Export enabled={true} />
            <Tooltip
              enabled={true}
              location={"edge"}
              customizeTooltip={this.customizeTooltip}
            />
          </Chart>
        </div>
      </div>
    );
  }
}

export default LineChart;
