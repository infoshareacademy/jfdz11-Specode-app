import React from "react";
import PieChart, {
  Series,
  Label,
  Connector,
  Size,
  Export
} from "devextreme-react/pie-chart";

const data = [
  { name: "Jajecznica i pieczywo", kcal: 390, type: "śniadanie" },
  { name: "Wrap z jajkiem i bekonem", kcal: 421, type: "obiad" },
  { name: "Placki owsiane z cukinia", kcal: 327, type: "kolacja" }
];

/*let localArray = [];
localArray = JSON.parse(localStorage.getItem("mealsList"));
let data = localArray.map(obj => {
  return {
    type: obj.type,
    kcal: obj.calories
  };
});
*/
class App extends React.Component {
  constructor(props) {
    super(props);

    this.pointClickHandler = this.pointClickHandler.bind(this);
    this.legendClickHandler = this.legendClickHandler.bind(this);
  }

  render() {
    return (
      <PieChart
        id={"pie"}
        dataSource={data}
        palette={"Bright"}
        title={"Daily calories"}
        onPointClick={this.pointClickHandler}
        onLegendClick={this.legendClickHandler}
      >
        <Series argumentField={"type"} valueField={"kcal"}>
          <Label visible={true}>
            <Connector visible={true} width={1} />
          </Label>
        </Series>

        <Size width={500} />
        <Export enabled={true} />
      </PieChart>
    );
  }

  pointClickHandler(e) {
    this.toggleVisibility(e.target);
  }

  legendClickHandler(e) {
    let arg = e.target;
    let item = e.component.getAllSeries()[0].getPointsByArg(arg)[0];

    this.toggleVisibility(item);
  }

  toggleVisibility(item) {
    item.isVisible() ? item.hide() : item.show();
  }
}

export default App;
