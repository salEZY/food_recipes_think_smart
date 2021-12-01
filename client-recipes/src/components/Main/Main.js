import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "../Home/Home";
import Categories from "../Categories/Categories";
import Search from "../SearchPage/Search";
import MyMeals from "../My Meals/MyMeals";
import Meal from "../Meal/Meal";
import Auth from "../Auth/Auth";

import "./Main.css";

const Main = () => {


  return (
    <main>

      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/categories" component={Categories} />
        <Route path="/search" component={Search} />
        <Route path="/meals/:userId" component={MyMeals} />
        <Route path="/meal/:mealId" component={Meal} />
        <Route path="/authorize" component={Auth} />
      </Switch>
    </main>
  );
};

export default Main;
