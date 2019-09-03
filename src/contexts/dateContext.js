import React, { useState, createContext } from "react";
import moment from "moment";

const DateContext = createContext();

const DateContextProvider = props => {
  const [date, setDate] = useState(moment());

  const changeDate = newDate => {
    setDate(newDate);
  };
};

export default DateContextProvider;
