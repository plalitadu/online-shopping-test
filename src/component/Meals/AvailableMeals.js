import { useState, useCallback, useEffect } from "react";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import useHttp from "../../hooks/use-https";

const DUMMY_MEALS = [
  {
    id: "m1",
    name: "Sushi",
    description: "Finest fish and veggies",
    price: 22.99,
  },
  {
    id: "m2",
    name: "Schnitzel",
    description: "A german specialty!",
    price: 16.5,
  },
  {
    id: "m3",
    name: "Barbecue Burger",
    description: "American, raw, meaty",
    price: 12.99,
  },
  {
    id: "m4",
    name: "Green Bowl",
    description: "Healthy...and green...",
    price: 18.99,
  },
];

const AvailableMeals = () => {
  const [mealList, setMealList] = useState([]);
  const [error, setError] = useState(null);

  const fetchMealHanlder = useCallback(async () => {
    try {
      const response = await fetch(
        // "https://react-http-food-88161-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json"
        "https://online-shopping-ec42f-default-rtdb.asia-southeast1.firebasedatabase.app/products.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();
      const loadedMeal = [];

      for (const key in data) {
       
        loadedMeal.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }

      setMealList(loadedMeal);
    } catch (error) {
      setError(error.message);
    }
  }, []);
  

  useEffect(() => {
    fetchMealHanlder();
  }, [fetchMealHanlder]);

  const mealsList = mealList.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
        
      </Card>
    </section>
  );
};

export default AvailableMeals;
