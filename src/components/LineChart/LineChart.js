import React from "react";
import {
  Chart,
  Series,
  ArgumentAxis,
  CommonSeriesSettings,
  Export,
  Legend,
  Margin,
  Title,
  Tooltip,
  Grid
} from "devextreme-react/chart";
import { lineChartContainer } from "./LineChart.module.css";

const data = [
  { name: "Jajecznica i pieczywo", kcal: 390, type: "śniadanie" },
  { name: "Wrap z jajkiem i bekonem", kcal: 421, type: "obiad" },
  { name: "Placki owsiane z cukinia", kcal: 327, type: "kolacja" }
];

class LineChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "line"
    };
    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    return (
      <div className={lineChartContainer}>
        <Chart palette={"Violet"} dataSource={data}>
          <CommonSeriesSettings argumentField={"type"} type={this.state.type} />
          {data.map(function(item) {
            return <Series valueField={item.kcal} name={item.type} />;
          })}
          <Margin bottom={20} />
          <ArgumentAxis
            valueMarginsEnabled={false}
            discreteAxisDivisionMode={"crossLabels"}
          >
            <Grid visible={true} />
          </ArgumentAxis>
          <Legend
            verticalAlignment={"bottom"}
            horizontalAlignment={"center"}
            itemTextPosition={"bottom"}
          />
          <Export enabled={true} />
          <Title text={"Daily sum of calories"} />
          <Tooltip enabled={true} customizeTooltip={this.customizeTooltip} />
        </Chart>
      </div>
    );
  }

  customizeTooltip(arg) {
    return { text: arg.valueText };
  }

  handleChange(e) {
    this.setState({ type: e.value });
  }
}

export default LineChart;
