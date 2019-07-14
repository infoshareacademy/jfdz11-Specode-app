import React from 'react'
import { DayAndCaloriesNav, Button, MealForm } from '../../components'
import { Clear } from '@material-ui/icons'
import styles from './DayView.module.css'
import { makeStyles } from '@material-ui/core/styles'
import { PieChart } from '../../components'

const {
  buttonWrapper,
  dayViewWrapper,
  dayNav,
  closeButton,
  pieContainer,
  dayViewComponents
} = styles
const useStyles = makeStyles({
  closeButton: {
    color: 'white'
  }
})

function DayView(props) {
  const classes = useStyles()
  return (
    <div className={dayViewWrapper}>
      <span className={closeButton}>
        <Clear
          className={classes.closeButton}
          onClick={() => props.setModalOpenState(false)}
        />
      </span>
      <span className={dayNav}>
        <DayAndCaloriesNav
          setDate={props.setDate}
          dateProps={props.dateProps}
        />
      </span>
      <div className={dayViewComponents}>
        <div className={buttonWrapper}>
          <MealForm
            addMealToSchedule={props.addMealToSchedule}
            updateMealId={props.updateMealId}
            newMealId={props.newMealId}
            addToMealsArray={props.addToMealsArray}
            mealsArray={props.mealsArray}
          />
        </div>
        <div className={pieContainer}>
          <PieChart />
        </div>
      </div>
    </div>
  )
}
export default DayView
