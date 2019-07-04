import React from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import BigCalendar from "react-big-calendar";
import moment from "moment";
import { Modal } from "@material-ui/core";
import { DayView } from "../../scenes";
import { useState } from "react";

const localizer = BigCalendar.momentLocalizer(moment);
//ustawic state i przekazac do modala ayb tam guzik go zamykal
const MyCalendar = props => {
  console.log(props);
  const [isModalOpen, setModalOpenState] = useState(false);
  return (
    <div>
      <BigCalendar
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
          setModalOpenState={setModalOpenState}
          setDate={props.setDate}
          dateProps={props.dateProps}
        />
      </Modal>
    </div>
  );
};

export default MyCalendar;
