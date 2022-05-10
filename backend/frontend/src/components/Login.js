import React, { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import {Button} from 'react-bootstrap';
import '../css/login.css';
import {login} from '../actions/Auth';
const Login = () => {
    let navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const onSubmitLogin = async e => {
        e.preventDefault();
        const body = { email: email, password: password };
        login(body);
        navigate("/products");
    };
    return (
        <div className="section">
            <div className="container">
                <div className="row text-center">
                    <div className="login col-xs-12">
                        <div className="text-center under marg1">Вход в систему</div>
                        <form className="marg" onSubmit={onSubmitLogin}>
                            <div className="col-xs-6 col-xs-offset-3">
                                <input
                                    type="email"
                                    className="form-control marg"
                                    value={email}
                                    placeholder="Почта"
                                    required
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="col-xs-6 col-xs-offset-3">
                                <input
                                    type="password"
                                    className="form-control marg"
                                    value={password}
                                    placeholder="Пароль"
                                    required
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="col-xs-6 col-xs-offset-3">
                                <Button className="btn btn-success marg" type="submit">Войти</Button>
                            </div>
                        </form>
                        <div className="col-xs-6 col-xs-offset-3">
                            <div className="marg">
                                <Link to="/registration">Зарегистрироваться</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
