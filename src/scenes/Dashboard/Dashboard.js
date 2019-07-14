import React, { Fragment } from 'react'
import { MyCalendar, LineChart, Title, Footer } from '../../components'

function DashBoard(props) {
  return (
    <Fragment>
      <Title>Planer żywieniowy</Title>
      <MyCalendar
        mealsArray={props.mealsArray}
        updateMealId={props.updateMealId}
        newMealId={props.newMealId}
        addMealToSchedule={props.addMealToSchedule}
        addToMealsArray={props.addToMealsArray}
        setDate={props.setDate}
        dateProps={props.dateProps}
        scheduledMealsArray={props.scheduledMealsArray}
      />
      <LineChart />
      <Footer />
    </Fragment>
  )
}

export default DashBoard
