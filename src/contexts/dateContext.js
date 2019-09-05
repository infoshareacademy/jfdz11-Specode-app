import React, { useState, createContext } from "react";
import moment from "moment";

export const DateContext = createContext();

const DateContextProvider = props => {
  const [date, setDate] = useState(moment());

  const changeDate = newDate => {
    setDate(newDate);
  };
  return (
    <DateContext.Provider value={{ date, changeDate }}>
      {props.children}
    </DateContext.Provider>
  );
};

export default DateContextProvider;
