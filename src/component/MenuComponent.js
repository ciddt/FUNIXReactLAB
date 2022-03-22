import React from "react";
import { Card, CardImgOverlay, CardImg, CardTitle } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

function RenderMenuItem({dish, onClick}) {
    return (
        <Card 
            onClick={() => onClick(dish.id)}
        >
            <CardImg
                src={dish.image}
                alt={dish.name}
                width="100%"
            />
            <CardImgOverlay>
                <CardTitle>{dish.name}</CardTitle>
            </CardImgOverlay>
        </Card>
    )
}

const Menu = props => {
    const menu = props.dishes.map(dish => (
        <div 
            key={dish.id}
            className="col-12 col-md-5 m-1"
        >
            <RenderMenuItem
                dish={dish}
                onClick={props.onClick}
            />
        </div>
    ))
    return (
        <div className="container">
            <div className="row">
                {menu}
            </div>
        </div>
    )
}

export default Menu;