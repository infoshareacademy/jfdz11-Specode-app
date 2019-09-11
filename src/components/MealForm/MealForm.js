import React, { useContext, useState } from "react";
import MealsSearch from "../MealsSearch/MealsSearch";
import { MealsContext } from "../../contexts/mealsContext";
import { DateContext } from "../../contexts/dateContext";
import uuid from "uuid";
import {
  formContainer,
  chooseMealType,
  chooseMealName,
  chooseMealCalories,
  submit
} from "./MealForm.module.css";

const MealForm = () => {
  const { addMealToSchedule, addMealToCustom } = useContext(MealsContext);
  const { date } = useContext(DateContext);
  const [mealName, setMealName] = useState("");
  const [mealKcal, setMealKcal] = useState("");
  const [mealType, setMealType] = useState("śniadanie");

  const createMeal = event => {
    const meal = {
      name: mealName,
      calories: mealKcal,
      type: mealType,
      id: uuid(),
      date
    };
    event.preventDefault();
    addMealToSchedule(meal);
    addMealToCustom(meal);
    setMealType("");
    setMealKcal("");
    setMealName("");
  };
  return (
    <form className={formContainer} onSubmit={createMeal}>
      <select
        className={chooseMealType}
        value={mealType}
        onChange={event => setMealType(event.target.value)}
      >
        <option value="śniadanie">Śniadanie</option>
        <option value="obiad">Obiad</option>
        <option value="kolacja">Kolacja</option>
      </select>
      <input
        className={chooseMealName}
        type="ext"
        placeholder="nazwa posiłku"
        value={mealName}
        onChange={event => setMealName(event.target.value)}
      />
      <input
        className={chooseMealCalories}
        type="number"
        placeholder="ilość kalorii"
        value={mealKcal}
        onChange={event => setMealKcal(event.target.value)}
      />
      <button type="submit" className={submit}>
        Stworz wlasny posilek
      </button>
      <MealsSearch />
    </form>
  );
};

export default MealForm;
