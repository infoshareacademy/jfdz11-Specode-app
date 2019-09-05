import React, { createContext, useState } from "react";
import firebase from "firebase";

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
    user.isLoggedIn
      ? setUser(initialState)
      : setUser({ ...user, isLoggedIn: !user.isLoggedIn });
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

  const createNewUserInfoInFirebaseAndChangeState = (
    id,
    userFirstName,
    userEmail
  ) => {
    setUserEmail(userEmail);
    setUserFirstName(userFirstName);
    console.log(user.userFirstName);
    debugger;
    setUserId(id);
    changeIsLoggedIn();
    firebase
      .database()
      .ref("users/" + id)
      .set({
        userEmail,
        userImgUrl: "",
        userFirstName
      });
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
        setInitialStateAfterLogout,
        createNewUserInfoInFirebaseAndChangeState
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
