import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./HomeComponent";
import Header from "./HeaderComponent";
import Contact from "./ContactComponent";
import Footer from "./FooterComponent";
import Menu from "./MenuComponent";
import DishDetail from "./DishdetailComponent";
import { Routes, Route, Navigate, useParams, useNavigate} from 'react-router-dom';
import { connect } from 'react-redux';



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

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders,
  }
}

const mapDispatchToProps = {};
class Main1 extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const HomePage = () => {
      return (
        <Home
          dish={this.props.dishes.filter((dish) => dish.featured)[0]}
          promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
          leader={this.props.leaders.filter((leader) => leader.featured)[0]}
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
            element={<Menu dishes={this.props.dishes}/>}
          />
          <Route 
            path="/menu/:dishId" 
            element={
              <DishWithId 
                dishes={this.props.dishes}
                comments={this.props.comments}
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

// Tạo function Component Main sử dụng useNavigate và trả lại component class Main1 
function Main(props) {
  let navigate = useNavigate();
  return <Main1 {...props} navigate={navigate}/>
}

// Không sử dụng được withRouter nên vì v6 hỗ trợ hook nên phải chuyển về dạng function
export default connect(mapStateToProps, mapDispatchToProps)(Main);