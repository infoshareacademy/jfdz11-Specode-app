import React from "react";

class MealForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectValue: "śniadanie"
    };
  }
  handleChangeOne = event => {
    this.setState({ inputValueOne: event.target.value });
  };
  handleChangeTwo = event => {
    this.setState({ inputValueTwo: event.target.value });
  };
  handleChangeSelect = event => {
    this.setState({ selectValue: event.target.value });
  };

  handleSubmit = event => {
    this.props.addToMealsArray({
      name: this.state.inputValueOne,
      calories: this.state.inputValueTwo,
      type: this.state.selectValue
    });

    event.preventDefault();
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Wybierz porę posiłku
          <select
            value={this.state.selectValue}
            onChange={this.handleChangeSelect}
          >
            <option value="śniadanie">Śniadanie</option>
            <option value="obiad">Obiad</option>
            <option value="kolacja">Kolacja</option>
          </select>
        </label>
        <label>
          <input
            type="text"
            placeholder="nazwa posiłku"
            value={this.state.inputValueOne}
            onChange={this.handleChangeOne}
          />
        </label>
        <label>
          <input
            type="number"
            placeholder="ilość kalorii"
            value={this.state.inputValueTwo}
            onChange={this.handleChangeTwo}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default MealForm;
