import React, { useEffect, useState } from "react";
import useHttp from "../../hooks/use-http";
import Card from "../UI/Card/Card";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);

  const { error, isLoading, fetchData } = useHttp();

  useEffect(() => {
    const applyMeals = (data) => {
      let loadedMeals = [];
      for (const key in data) {
        loadedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
        setMeals(loadedMeals);
      }
    };
    fetchData(
      {
        url: "https://react-http-81dd2-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json",
      },
      applyMeals
    );
  }, [fetchData]);

  const mealsList = meals.map((meal) => <MealItem key={meal.id} meal={meal} />);

  return (
    <section>
      {isLoading && <p>Loading ....</p>}
      {error && <p> {error}</p>}
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
