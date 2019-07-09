import React, { Component } from "react";
import "./Form.module.css";

class Form extends Component {
  minDate = new Date().toISOString().slice(0, 10);

  state = {
    text: "",
    kcal: "",
    type: "",
    date: this.minDate
  };

  handleDate = e => {
    this.setState({
      date: e.target.value
    });
  };

  handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = props => {
    props.preventDefault();
    const { text, kcal, type, date } = this.state;
    const add = this.props.addToMealsArray(text, kcal, type, date);

    if (add) {
      this.setState({
        text: "",
        kcal: "",
        type: "",
        date: this.minDate
      });
    }
  };

  render() {
    let maxDate = this.minDate.slice(0, 4) * 1 + 1;
    maxDate = maxDate + "-12-31";
    return (
      <form className="form">
        <label htmlFor="meal">Wpisz posiłek</label>
        <input
          name="text"
          type="text"
          placeholder="Wpisz posiłek"
          value={this.state.text}
          onChange={this.handleChange}
        />
        <br />
        <label htmlFor="meal">Wpisz ilość kalorii</label>
        <input
          name="kcal"
          type="text"
          placeholder="Wpisz ilość kalorii"
          value={this.state.kcal}
          onChange={this.handleChange}
        />
        <br />
        <label htmlFor="meal">Wpisz typ posiłku</label>
        <input
          name="type"
          type="text"
          placeholder="Wpisz typ posiłku"
          value={this.state.type}
          onChange={this.handleChange}
        />
        <br />
        <label htmlFor="date">Do kiedy zrobić</label>
        <input
          name="date"
          type="date"
          value={this.state.date}
          min={this.minDate}
          max={maxDate}
          onChange={this.handleDate}
        />
        <br />
        <button onClick={this.handleSubmit}>DODAJ</button>
      </form>
    );
  }
}

export default Form;
