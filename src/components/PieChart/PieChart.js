import React from "react";
import PieChart, {
  Series,
  Label,
  Connector,
  Size,
  Export
} from "devextreme-react/pie-chart";
import moment from "moment"

/*const data = [
  { name: "Jajecznica i pieczywo", kcal: 390, type: "śniadanie" },
  { name: "Wrap z jajkiem i bekonem", kcal: 421, type: "obiad" },
  { name: "Placki owsiane z cukinia", kcal: 327, type: "kolacja" }
];*/



class App extends React.Component {
  constructor(props) {
    super(props);

    this.pointClickHandler = this.pointClickHandler.bind(this);
    this.legendClickHandler = this.legendClickHandler.bind(this);
  }

  state = {
    data: []
  }

  componentDidMount() {
    const localArray = JSON.parse(localStorage.getItem("scheduledMealsList"));
    //filter zrobic jak w DayView scene przed mapem
    const data = localArray.filter((meal) => {
      return moment(meal.date).format('YYYY-MM-DD') === moment(this.props.dateProps).format('YYYY-MM-DD')
    }).map(obj => {
      return {
        type: obj.type,
        kcal: obj.calories
      };
    });

    this.setState({
      data
    })
  }

  render() {
    return (
      <PieChart
        id={"pie"}
        dataSource={this.state.data}
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
