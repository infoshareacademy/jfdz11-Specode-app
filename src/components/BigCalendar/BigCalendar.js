import React from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import BigCalendar from "react-big-calendar";
import moment from "moment";
import { Modal } from "@material-ui/core";
import { DayView } from "../../scenes";
import { useState } from "react";

const localizer = BigCalendar.momentLocalizer(moment);
// console.log(localizer);
// var theBigDay = new Date("july 7, 2019");
// console.log(theBigDay);
//ustawic state i przekazac do modala ayb tam guzik go zamykal
const MyCalendar = props => {
  const [isModalOpen, setModalOpenState] = useState(false);
  return (
    <div>
      <BigCalendar
        onSelectEvent={date => {
          props.setDate(moment(date.start));
          setModalOpenState(true);
        }}
        onDrillDown={date => {
          props.setDate(moment(date));
          setModalOpenState(true);
        }}
        localizer={localizer}
        events={[
          {
            title: "Sniadanie",
            start: new Date(),
            end: new Date(),
            allDay: false
          },
          {
            title: "Sniadanie",
            start: new Date("july 7, 2019"),
            end: new Date("july 7, 2019"),
            allDay: false
          }
        ]}
        startAccessor="start"
        endAccessor="end"
        views={{
          month: true
        }}
      />
      <Modal open={isModalOpen}>
        <DayView
          mealsArray={props.mealsArray}
          updateMealId={props.updateMealId}
          newMealId={props.newMealId}
          addMealToSchedule={props.addMealToSchedule}
          addToMealsArray={props.addToMealsArray}
          setModalOpenState={setModalOpenState}
          setDate={props.setDate}
          dateProps={props.dateProps}
        />
      </Modal>
    </div>
  );
};

export default MyCalendar;
