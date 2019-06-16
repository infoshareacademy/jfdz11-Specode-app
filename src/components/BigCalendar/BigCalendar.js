import React from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import BigCalendar from "react-big-calendar";
import moment from "moment";

const localizer = BigCalendar.momentLocalizer(moment);

const MyCalendar = props => (
  <div>
    <BigCalendar
      onDrillDown={() => console.log("ff")}
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
  </div>
);

export default MyCalendar;
