import * as React from "react";
import Paper from "@material-ui/core/Paper";
import {
  Chart,
  PieSeries,
  Title,
  AreaSeries,
  Legend
} from "@devexpress/dx-react-chart-material-ui";
import { Animation } from "@devexpress/dx-react-chart";

const data2 = [
  { name: "Jajecznica i pieczywo", kcal: 390, type: "śniadanie" },
  { name: "Wrap z jajkiem i bekonem", kcal: 421, type: "obiad" },
  { name: "Placki owsiane z cukinia", kcal: 327, type: "kolacja" }
];

let localArray = JSON.parse(localStorage.getItem("mealsList"));
let data = localArray.map(obj => {
  return {
    type: obj.type,
    kcal: obj.calories
  };
});

console.log(data);

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data
    };
  }

  render() {
    const { data: chartData } = this.state;

    return (
      <Paper>
        <Chart data={chartData}>
          <PieSeries valueField="kcal" argumentField="type" />
          <Title text="Daily calories" />
          <Animation />
        </Chart>
      </Paper>
    );
  }
}
