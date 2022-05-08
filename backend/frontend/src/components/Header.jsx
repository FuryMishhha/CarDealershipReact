import {NavLink} from "react-router-dom";
import '../css/header.css';
import {Nav} from "react-bootstrap";

function Header(){
    return(
        <div className="section">
            <div className="container">
                <div className="row text-center">
                    <div className="col-xs-12">
                        <Nav.Link as={NavLink} className="navLink styleLogo" to="/" id="plate">Автосалон Credo</Nav.Link>
                    </div>
                </div>
            </div>
            <div className="container cont2">
                <div className="row text-center">
                    <div className="col-xs-3 colXs3border">
                        <Nav.Link as={NavLink} className="navLink word" to="/">Главная страница</Nav.Link>
                    </div>
                    <div className="col-xs-3 colXs3border">
                        <Nav.Link as={NavLink} className="navLink word" to="/products">Каталог</Nav.Link>
                    </div>
                    <div className="col-xs-3 colXs3border">
                        <Nav.Link as={NavLink} className="navLink word" to="/profile">Личный кабинет</Nav.Link>
                    </div>
                    <div className="col-xs-3">
                        <Nav.Link as={NavLink} className="navLink word" to="/logout">Выйти</Nav.Link>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row text-center">
                    <div className="col-xs-6 col-xs-offset-3 cont3" >
                        <Nav.Link as={NavLink} className="navLink word" to="/admin">Окно администратора</Nav.Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Header;
