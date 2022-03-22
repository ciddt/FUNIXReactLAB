import React, { Component } from "react";
import { Navbar, NavbarBrand } from "reactstrap";

class Header extends Component {
    render() {
        return (
            <>
                <Navbar dark color="primary">
                    <div className="container">
                        <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
                    </div>
                </Navbar>
                <div className="container-fluid p-5 jumbotron mb-1">
                    <div className="container">
                        <div className="row row-header">
                            <div className="col-12 col-sm-6">
                                <h1>Ristorante Con Fusion</h1>
                                <p>
                                    We take inspiration from the World's best
                                    cuisines, and create a unique fusion experience.
                                    Our lipscmaking creations will tickle your culinary sense!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Header;