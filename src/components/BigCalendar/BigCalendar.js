import React from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import BigCalendar from "react-big-calendar";
import moment from "moment";
import { Modal } from "@material-ui/core";
import { DayView } from "../../scenes";

const localizer = BigCalendar.momentLocalizer(moment);

const MyCalendar = props => {
  console.log(props);
  return (
    <div>
      <BigCalendar
        onDrillDown={date => props.setDate(moment(date))}
        localizer={localizer}
        events={[
          {
            title: "Sniadanie",
            start: new Date(),
            end: new Date(),
            allDay: false
          }
        ]}
        startAccessor="start"
        endAccessor="end"
        views={{
          month: true
        }}
      />
      <Modal open={true}>
        <DayView setDate={props.setDate} dateProps={props.dateProps} />
      </Modal>
    </div>
  );
};

export default MyCalendar;
