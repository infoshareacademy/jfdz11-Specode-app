import React, { createContext, useState } from "react";

export const UserContext = createContext();

const UserContextProvider = props => {
  let initialState = {
    userEmailValue: "",
    isLoggedIn: false,
    userId: "",
    userFirstName: "",
    userPicture: null
  };
  const [user, setUser] = useState(initialState);

  const setUserEmail = email => {
    setUser({ ...user, userEmailValue: email });
  };
  const changeIsLoggedIn = () => {
    setUser({ ...user, isLoggedIn: !isLoggedIn });
  };
  const setUserId = id => {
    setUser({ ...user, userId: id });
  };
  const setUserFirstName = userName => {
    setUser({ ...user, userFirstName: userName });
  };
  const setUserPicture = url => {
    setUser({ ...user, userPicture: url });
  };
  const setInitialStateAfterLogout = () => {
    setUser(initialState);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUserEmail,
        setUserFirstName,
        changeIsLoggedIn,
        setUserId,
        setUserPicture,
        setInitialStateAfterLogout
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
