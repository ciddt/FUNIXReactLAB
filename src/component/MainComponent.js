import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./HomeComponent";
import Header from "./HeaderComponent";
import Contact from "./ContactComponent";
import Footer from "./FooterComponent";
import Menu from "./MenuComponent";
import DishDetail from "./DishdetailComponent";
import { DISHES } from "../shared/dishes";
import { COMMENTS } from "../shared/comments";
import { PROMOTIONS } from "../shared/promotions";
import { LEADERS } from "../shared/leaders";
import { Routes, Route, Navigate} from 'react-router-dom';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
      comments: COMMENTS,
      promotions: PROMOTIONS,
      leaders: LEADERS
    };
  }

  render() {
    const HomePage = () => {
      return (
        <Home
          dish={this.state.dishes.filter((dish) => dish.featured)[0]}
          promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
          leader={this.state.leaders.filter((leader) => leader.featured)[0]}
        />
      )
    }
    return (
      <div>
        <Header/>
        {/** Từ react v6, Switch thay bằng Routes, syntax rout thay component
         * bằng element và trong {} phải là component syntax {<ComponentName/>}
         */}
        <Routes>
          <Route path="/home" element={<HomePage/>} />
          {/**Trong react v6, element không chấp nhận tham số là function mà
           * bắt buộc phải là component nên cú pháp () => <Menu .../> không được
           * chấp nhận
           */}
          <Route 
            exact path="/menu" 
            element={<Menu dishes={this.state.dishes}/>}
          />
          <Route
            exact path="/contactus"
            element={<Contact/>}
          />
          {/** Từ react v6, redirect thay thế bằng navigate và có syntax
           * thay bằng <Route/>
           */}
          <Route
            path="*"
            element={ <Navigate to="/home" />}
          />
        </Routes>
        <Footer/>
      </div>
    );
  }
}

export default Main;