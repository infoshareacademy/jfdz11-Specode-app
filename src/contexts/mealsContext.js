import React, { createContext, useState, useContext, useEffect } from "react";
import { UserContext } from "./userContext";
import * as firebase from "firebase";
//install uuid and manage meals id in firebase etc
// updateMealId = () => {
//     this.setState({ newMealId: this.state.newMealId + 1 });
//   };
export const MealsContext = createContext();

const MealsContextProvider = props => {
  const {
    user: { userId }
  } = useContext(UserContext);
  const [meals, setMeals] = useState({
    userCustomMealsArray: [],
    userScheduledMealsArray: [],
    commonMealsForAll: [],
    concatedCommonAndCustom: []
  });

  useEffect(
    userId => {
      let userScheduledMealsArray = meals.userScheduledMealsArray;

      firebase
        .database()
        .ref("scheduledMeals/" + userId)
        .set({
          userScheduledMealsArray
        });
    },
    [meals.userScheduledMealsArray]
  );

  useEffect(
    userId => {
      let userCustomMealsArray = meals.userCustomMealsArray;
      firebase
        .database()
        .ref("customMeals/" + userId)
        .set({
          userCustomMealsArray
        });
    },
    [meals.userCustomMealsArray]
  );

  const setUserCustomMeals = () => {
    firebase
      .database()
      .ref("customMeals/" + userId)
      .on("value", snapshot => {
        const mealsListObject = snapshot.val() || [];
        let customMealsFirebase = Object.values(mealsListObject).map(entry => {
          return { ...entry };
        });
        setMeals({ ...meals, userCustomMealsArray: customMealsFirebase });
      });
  };
  const setUserScheduledMealsArray = () => {
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
        setMeals({
          ...meals,
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
      userScheduledMealsArray: [...meals.userScheduledMealsArray, mealWithDate]
    });
  };

  const addMealToCustom = mealObjectToCustom => {
    setMeals({
      ...meals,
      userCustomMealsArray: [...meals.userCustomMealsArray, mealObjectToCustom]
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

  const setConcatedArray = () => {
    setMeals({
      ...meals,
      concatedCommonAndCustom: [
        ...meals.commonMealsArr,
        ...meals.userCustomMealsArray
      ]
    });
  };

  return (
    <MealsContext.Provider
      value={{
        meals,
        setCommonMealsFromFirebase,
        addMealToCustom,
        addMealToSchedule,
        setUserCustomMeals,
        setUserScheduledMealsArray,
        setConcatedArray
      }}
    >
      {props.children}
    </MealsContext.Provider>
  );
};

export default MealsContextProvider;
