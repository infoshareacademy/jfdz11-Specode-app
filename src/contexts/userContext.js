import React, { createContext, useState } from "react";
import firebase from "firebase";

export const UserContext = createContext();

const UserContextProvider = props => {
  const [userEmailValue, setUserEmailValue] = useState("");
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);
  const [userId, setUserNewId] = useState("");
  const [userFirstName, setUserFirstNameValue] = useState("");
  const [userPicture, setUserPictureUrl] = useState(null);

  const setUserEmail = email => {
    setUserEmailValue(email);
  };
  const changeIsLoggedIn = () => {
    setUserIsLoggedIn(!userIsLoggedIn);
  };
  const setUserId = id => {
    setUserNewId(id);
  };
  const setUserFirstName = userName => {
    setUserFirstNameValue(userName);
  };
  const setUserPicture = url => {
    setUserPictureUrl(url);
  };
  const setInitialStateAfterLogout = () => {
    setUserEmail("");
    setUserFirstName("");
    setUserPicture("");
    setUserId("");
    setUserIsLoggedIn(false);
  };

  const createNewUserInfoInFirebaseAndChangeState = (
    id,
    userFirstName,
    userEmail
  ) => {
    setUserEmail(userEmail);
    setUserFirstName(userFirstName);
    setUserId(id);
    changeIsLoggedIn();
    firebase
      .database()
      .ref("users/" + id)
      .set({
        userEmail,
        userImgUrl: "",
        userFirstName
      })
      .then(() => {
        console.log("user data update successful");
      })
      .catch(() => {
        console.log("user data update failed");
      });
  };

  const updateDisplayName = name => {
    let user = firebase.auth().currentUser;
    user
      .updateProfile({
        displayName: name
      })
      .then(() => {
        console.log("name update successful");
      })
      .catch(() => {
        console.log("name update failed");
      });
  };

  return (
    <UserContext.Provider
      value={{
        userId,
        userFirstName,
        userEmailValue,
        userIsLoggedIn,
        setUserEmail,
        setUserFirstName,
        changeIsLoggedIn,
        setUserId,
        setUserPicture,
        setInitialStateAfterLogout,
        createNewUserInfoInFirebaseAndChangeState,
        updateDisplayName
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
