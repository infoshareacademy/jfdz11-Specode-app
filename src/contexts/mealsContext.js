import React, { createContext, useState } from "react";

export const MealsContext = createContext();

//useContext  z id uzytkownika
const MealsContextProvider = props => {
  const [meals, setMeals] = useState()({
    userCustomMealsArray: [],
    userScheduledMealsArray: [],
    commonMealsForAll: []
  });

  useEffect(
    userId => {
      firebase
        .database()
        .ref("scheduledMeals/" + userId)
        .set({
          userScheduledMealsArray
        });
    },
    [userScheduledMealsArray]
  );

  useEffect(
    userId => {
      firebase
        .database()
        .ref("customMeals/" + userId)
        .set({
          userCustomMealsArray
        });
    },
    [userCustomMealsArray]
  );

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

  const addMealToSchedule = mealObjectToSchedule => {
    let mealWithDate = {
      ...mealObjectToSchedule,
      date: mealObjectToSchedule.date.toDate().toISOString()
    };
    setMeals({
      ...meals,
      userScheduledMealsArray: [...userScheduledMealsArray, mealWithDate]
    });
  };

  const addMealToCustom = mealObjectToCustom => {
    setMeals({
      ...meals,
      userCustomMealsArray: [...userCustomMealsArray, mealObjectToCustom]
    });
  };

  const setCommonMealsFromFirebase = () => {
    firebase
      .database()
      .ref("mealsArray")
      .on("value", snapshot => {
        let commonMeals = snapshot.val();
        let commonMealsArr = Object.values(commonMeals).map(element => {
          return { ...element };
        });
        setMeals({ ...meals, commonMealsForAll: commonMealsArr });
      });
  };

  return (
    <MealsContext.Provider value={meals}>
      {props.children}
    </MealsContext.Provider>
  );
};

export default MealsContextProvider;
