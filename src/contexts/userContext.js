import React, { createContext, useState } from "react";

export const UserContext = createContext();

const UserContextProvider = props => {
  const [user, setUser] = useState()({
    userEmailValue: "",
    isLoggedIn: false,
    userId: "",
    userFirstName: "",
    userPicture: null,
    userCustomMealsArray: [],
    userScheduledMealsArray: []
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
  const setUserCustomMeals = userId => {
    firebase
      .database()
      .ref("customMeals/" + userId)
      .on("value", snapshot => {
        const mealsListObject = snapshot.val() || [];
        let customMealsFirebase = Object.values(mealsListObject).map(entry => {
          return { ...entry };
        });
        setUser({ ...user, userCustomMealsArray: customMealsFirebase });
      });
  };
  const setUserScheduledMealsArray = userId => {
    firebase
      .database()
      .ref("scheduledMeals/" + userId)
      .on("value", snapshot => {
        const scheduledMealsSnapshot = snapshot.val() || [];
        let scheduledUserMealsFirebase = Object.entries(
          scheduledMealsSnapshot
        ).map(entry => {
          const [id, meal] = entry;
          return {
            ...meal,
            id
          };
        });
        setUser({
          ...user,
          userScheduledMealsArray: scheduledUserMealsFirebase
        });
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
        setUserScheduledMealsArray,
        setUserCustomMeals
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
