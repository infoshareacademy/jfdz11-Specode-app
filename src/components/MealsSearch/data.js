let localStorageMeals = JSON.parse(localStorage.getItem("mealsList"));
console.log(localStorageMeals);

let mapWithLabelAtt = localStorageMeals.map(obj => {
  obj.label = obj.name;
  return obj;
});

export const groupedOptions = [
  {
    label: "Śniadania",
    options: mapWithLabelAtt.filter(obj => obj.type === "śniadanie")
  },
  {
    label: "Obiady",
    options: mapWithLabelAtt.filter(obj => obj.type === "obiad")
  },
  {
    label: "Kolacje",
    options: mapWithLabelAtt.filter(obj => obj.type === "kolacja")
  }
];
