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
import { Routes, Route, Navigate, useParams} from 'react-router-dom';

// Từ react router v6 thì không sử dụng match nữa mà dùng useParams
// Lúc này object {dishID} sẽ được match bằng hooks useParams()
//Theo đó không cần dùng đến parseInt(match.params...) nữa mà dùng Number(...)
function DishWithId({dishes, comments}) {
  const {dishId} = useParams();
  return (
    <DishDetail
      dish={dishes.filter((dish) => dish.id === Number(dishId))[0]}
      comment={comments.filter((comment) => comment.dishId === Number(dishId))}
    />
  )
}
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

    // const {id} = useParams();
    // const DishWithId = ({match}) => {
    //   return (
    //     <DishDetail
    //     dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
    //     comments={this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
    //     />
    //   )
    // }

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
            path="/menu" 
            element={<Menu dishes={this.state.dishes}/>}
          />
          <Route 
            path="/menu/:dishId" 
            element={
              <DishWithId 
                dishes={this.state.dishes}
                comments={this.state.comments}
              />
            }
          />
          <Route
            path="/contactus"
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