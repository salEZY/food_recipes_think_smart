import React from "react";
import axios from "axios";
import { Route, Switch } from "react-router-dom";

import Home from "../Home/Home";
import Categories from "../Categories/Categories";
import Search from "../SearchPage/Search";
import MyMeals from "../My Meals/MyMeals";
import Meal from "../Meal/Meal";

import "./Main.css";

const Main = () => {
  const [msg, setMsg] = React.useState("");

  React.useEffect(() => {
    axios.get("/api/").then((data) => {
      setMsg(data.data);
    });
  }, []);

  return (
    <main>
      {msg}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/categories" component={Categories} />
        <Route path="/search" component={Search} />
        <Route path="/meals/:userId" component={MyMeals} />
        <Route path="/meal/:mealId" component={Meal} />
      </Switch>
    </main>
  );
};

export default Main;
