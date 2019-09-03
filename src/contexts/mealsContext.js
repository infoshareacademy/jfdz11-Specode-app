import React, { createContext, useState, useContext } from "react";
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
  const [meals, setMeals] = useState()({
    userCustomMealsArray: [],
    userScheduledMealsArray: [],
    commonMealsForAll: [],
    concatedCommonAndCustom: [...userCustomMeals, ...commonMealsForAll]
  });

  useEffect(() => {
    firebase
      .database()
      .ref("scheduledMeals/" + userId)
      .set({
        userScheduledMealsArray
      });
  }, [userScheduledMealsArray]);

  useEffect(() => {
    firebase
      .database()
      .ref("customMeals/" + userId)
      .set({
        userCustomMealsArray
      });
  }, [userCustomMealsArray]);

  const setUserCustomMeals = () => {
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
    <MealsContext.Provider
      value={{
        meals,
        setCommonMealsFromFirebase,
        addMealToCustom,
        addMealToSchedule,
        setUserCustomMeals,
        setUserScheduledMealsArray
      }}
    >
      {props.children}
    </MealsContext.Provider>
  );
};

export default MealsContextProvider;
