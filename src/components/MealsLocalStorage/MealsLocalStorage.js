import React from 'react'


const MealsLocalStorage = () => {
  const mealsArray = []
  function createNewMeal(name, calories, type, id) {
    mealsArray.push({
      name,
      calories,
      type,
      id
    })
  }

  function createMealsArray() {
    createNewMeal('Jajecznica i pieczywo', 390, 'śniadanie', 1)
    createNewMeal('Wrap z jajkiem i bekonem', 421, 'śniadanie', 2)
    createNewMeal('Placki owsiane z cukinia', 327, 'kolacja', 3)
    createNewMeal('Pasta borkułowa z feta i pieczywo', 250, 'kolacja', 4)
    createNewMeal('Sałatka z pomidorami i rukolą', 326, 'kolacja', 5)
    createNewMeal('Koktajl szpinakowo-bananowy', 248, 'śniadanie', 6)
    createNewMeal('Koktajl bananowo-gruszkowy', 198, 'śniadanie', 7)
    createNewMeal('Budyń kakaowy z orzechami', 227, 'śniadanie', 8)
    createNewMeal('Sałatka z brokułami, serem i jajkiem', 373, 'kolacja', 9)
    createNewMeal('Makaron z kurczakiem w sosie śmietanowym', 587, 'obiad', 10)
    createNewMeal('Zapiekanka ziemniaczana z mięsem mielonym', 642, 'obiad', 11)
    createNewMeal('Kurczak po chińsku z ryżem', 492, 'obiad', 12)
    createNewMeal('Curry z ciecierzycą i ryżem', 521, 'obiad', 13)
    createNewMeal('Kotlety po lwowsku z ziemniakami', 612, 'obiad', 14)
    createNewMeal('Spaghetti z pieczonymi klopsami', 716, 'obiad', 15)
    createNewMeal('Pasta z makreli, twarogu i pieczywo', 241, 'kolacja', 16)
    createNewMeal('Sałatka meksykańska z ryżem', 383, 'kolacja', 17)
    createNewMeal('Kurczak pieczony z ziemniakami', 700, 'obiad', 18)
    createNewMeal(
      'Zapiekanka makaronowa z kurczakiem i pieczarkami',
      562,
      'obiad',
      19
    )
    createNewMeal('Naleśniki z dżemem', 319, 'śniadanie', 20)
    createNewMeal('Wafle ryżowe z masłem orzechwym', 450, 'śniadanie', 21)
    createNewMeal('Owsianka z owocami', 315, 'śniadanie', 22)
    createNewMeal('Pieczywo z awokado i bazylią', 289, 'kolacja', 23)
    createNewMeal('Wrap z tuńczykiem i kukurydzą', 315, 'kolacja', 24)
  }

  function createLocalStorageDishList() {
    createMealsArray()
    const mealsString = JSON.stringify(mealsArray)
    JSON.parse(localStorage.getItem('mealsList'))
      localStorage.setItem('mealsList', mealsString)
  }
  return <span>{createLocalStorageDishList()}</span>
}

export default MealsLocalStorage
