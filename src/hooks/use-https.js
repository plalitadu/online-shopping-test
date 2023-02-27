import { useState, useCallback } from "react";

const useHttp = async () => {
    const [mealList,setMealList] = useState([]);
    const [error,setError] = useState(null);
    try {
        const response = await fetch('https://react-http-food-88161-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json');
  
        if (!response.ok) {
            throw new Error("Something went wrong!");
        }

        const data = await response.json();
        const loadedMeal = [];

        for(const key in data){
            loadedMeal.push({
            id : key,
            name: data[key].name,
            description: data[key].description,
            price: data[key].price
            })
        }

        setMealList(loadedMeal);
        
    } catch (error) {
        setError(error.message);
    }
  

  
};

export default useHttp;
