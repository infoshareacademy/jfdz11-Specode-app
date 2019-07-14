import React from 'react'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import './App.css'
import { DashBoard } from './scenes'
import moment from 'moment'
import styles from './App.css'
import MealsLocalStorage from './components/MealsLocalStorage/MealsLocalStorage'
const { appWrapper } = styles

class App extends React.Component {
  constructor(props) {
    super(props)
    this.initLocalstorage()
    this.state = {
      todayFullDate: moment(),
      newMealId: '',
      mealsArray: JSON.parse(localStorage.getItem('mealsList')) || [],
      scheduledMealsArray:
        JSON.parse(localStorage.getItem('scheduledMealsList')) || []
    }
  }

  componentDidMount() {
    this.setState(
      {
        mealsArray: JSON.parse(localStorage.getItem('mealsList'))
      },
      () => {
        let nextMealId = this.state.mealsArray.length + 1
        this.setState({ newMealId: nextMealId }, () => {})
      }
    )
  }

  initLocalstorage = () => {
    const mealsList = JSON.parse(localStorage.getItem('mealsList'))
    const scheduledMealsList = JSON.parse(
      localStorage.getItem('scheduledMealsList')
    )
    if (mealsList === null) {
      localStorage.setItem('mealsList', JSON.stringify([]))
    }
    if (scheduledMealsList === null) {
      localStorage.setItem('scheduledMealsList', JSON.stringify([]))
    }
  }

  setDate = date => {
    this.setState({ todayFullDate: date })
  }

  addToMealsArray = mealObject => {
    this.setState(
      { mealsArray: [...this.state.mealsArray, mealObject] },
      () => {
        localStorage.setItem('mealsList', JSON.stringify(this.state.mealsArray))
      }
    )
  }

  addMealToSchedule = mealObjectToSchedule => {
    console.log(mealObjectToSchedule)
    this.setState(
      {
        scheduledMealsArray: [
          ...this.state.scheduledMealsArray,
          mealObjectToSchedule
        ]
      },
      () => {
        localStorage.setItem(
          'scheduledMealsList',
          JSON.stringify(this.state.scheduledMealsArray)
        )
      }
    )
  }

  updateMealId = () => {
    this.setState({ newMealId: this.state.newMealId + 1 })
  }

  render() {
    return (
      <div className={appWrapper}>
        <MealsLocalStorage />
        <DashBoard
          mealsArray={this.state.mealsArray}
          scheduledMealsArray={this.state.scheduledMealsArray}
          updateMealId={this.updateMealId}
          newMealId={this.state.newMealId}
          addMealToSchedule={this.addMealToSchedule}
          addToMealsArray={this.addToMealsArray}
          setDate={this.setDate}
          dateProps={this.state.todayFullDate}
        />
      </div>
    )
  }
}

export default App
