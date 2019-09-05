import React, { useState, useContext } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import BigCalendar from "react-big-calendar";
import moment from "moment";
import { Modal } from "@material-ui/core";
import { DayView } from "../../scenes";
import { MealsContext } from "../../contexts/mealsContext";
import { DateContext } from "../../contexts/dateContext";

const localizer = BigCalendar.momentLocalizer(moment);

const MyCalendar = props => {
  const {
    meals: { userScheduledMealsArray }
  } = useContext(MealsContext);
  const { changeDate, date } = useContext(DateContext);
  const [isModalOpen, setModalOpenState] = useState(false);

  const prepareScheduledMealsForCalendar = () => {
    const events = userScheduledMealsArray.map(scheduledMeal => {
      return {
        title: scheduledMeal.type,
        start: scheduledMeal.date,
        end: scheduledMeal.date,
        allDay: false
      };
    });

    return events;
  };

  return (
    <div>
      <BigCalendar
        onSelectEvent={date => {
          changeDate(moment(date.start));
          setModalOpenState(true);
        }}
        onDrillDown={date => {
          changeDate(moment(date));
          setModalOpenState(true);
        }}
        localizer={localizer}
        events={prepareScheduledMealsForCalendar()}
        startAccessor="start"
        endAccessor="end"
        views={{
          month: true
        }}
      />
      <Modal open={isModalOpen}>
        <DayView />
      </Modal>
    </div>
  );
};

export default MyCalendar;
