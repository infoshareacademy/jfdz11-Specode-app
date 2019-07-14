import React from 'react'
import MealsSearch from '../MealsSearch/MealsSearch'
import {
  formContainer,
  chooseMealTitle,
  chooseMealType,
  chooseMealName,
  chooseMealCalories,
  submit
} from './MealForm.module.css'

class MealForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectValue: 'śniadanie',
      inputValueOne: '',
      inputValueTwo: '',
      selectedMeal: null
    }
  }
  handleChangeOne = event => {
    this.setState({ inputValueOne: event.target.value })
  }
  handleChangeTwo = event => {
    this.setState({ inputValueTwo: event.target.value })
  }
  handleChangeSelect = event => {
    this.setState({ selectValue: event.target.value })
  }

  createMeal = event => {
    const meal = {
      name: this.state.inputValueOne,
      calories: this.state.inputValueTwo,
      type: this.state.selectValue,
      id: this.props.newMealId
    }
    event.preventDefault()
    this.props.addToMealsArray(meal)
    this.props.addMealToSchedule(meal)
    this.props.updateMealId()
  }

  selectMeal = event => {
    event.preventDefault()
    if (this.state.selectedMeal !== null) {
      this.props.addMealToSchedule(this.state.selectedMeal)
      this.props.updateMealId()
    }
  }

  handleMealSelectChange = meal => {
    this.setState({
      selectedMeal: meal
    })
  }

  render() {
    return (
      <form className={formContainer} onSubmit={this.handleSubmit}>
        <label>
          <h3>Wybierz posiłek</h3>
        </label>
        <span>stworz wlasny posilek</span>
        <select
          className={chooseMealType}
          value={this.state.selectValue}
          onChange={this.handleChangeSelect}
        >
          <option value='śniadanie'>Śniadanie</option>
          <option value='obiad'>Obiad</option>
          <option value='kolacja'>Kolacja</option>
        </select>
        <input
          className={chooseMealName}
          type='ext'
          placeholder='nazwa posiłku'
          value={this.state.inputValueOne}
          onChange={this.handleChangeOne}
        />
        <input
          className={chooseMealCalories}
          type='number'
          placeholder='ilość kalorii'
          value={this.state.inputValueTwo}
          onChange={this.handleChangeTwo}
        />
        <button type='button' className={submit} onClick={this.createMeal}>
          Stworz wlasny posilek
        </button>
        <span>albo wybierz z istniejacej listy posilkow</span>
        <MealsSearch
          mealsArray={this.props.mealsArray}
          onChange={this.handleMealSelectChange}
        />
        <button type='button' className={submit} onClick={this.selectMeal}>
          Wybierz posilek
        </button>
      </form>
    )
  }
}

export default MealForm
