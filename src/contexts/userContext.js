import React, { createContext, useState } from "react";

export const UserContext = createContext();

const UserContextProvider = props => {
  const [user, setUser] = useState()({
    userEmailValue: "",
    isLoggedIn: false,
    userId: "",
    userFirstName: "",
    userPicture: null
  });

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

  return (
    <UserContext.Provider
      value={{
        user,
        setUserEmail,
        setUserFirstName,
        changeIsLoggedIn,
        setUserId,
        setUserPicture
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
