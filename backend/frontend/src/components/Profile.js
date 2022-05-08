import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import "../css/profile.css";
import axios from "axios";
import {Button, Table} from "react-bootstrap";
function MyVerticallyCenteredModalUser(props) {
    let navigate = useNavigate();
    const [user, setUser] = useState("");
    const [id, setId] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const getUser = async () => {
        try {
            let token = JSON.parse(localStorage.getItem("user"));
            await axios.get("http://localhost:8080/api/user/profile",{
                headers: {
                    'Authorization': `Bearer ${token}`
                }}).then((response) => {
                setUser(response.data);
                setId(response.data.id)
                setUserName(response.data.username);
                setEmail(response.data.email);
            })
        } catch (err) {
            console.error(err.message);
        }
    };
}

const Profile = () => {
    const [user, setUser] = useState([]);
    const [email, setEmail] = useState("");
    const getUser = async () => {
        try {
            let token = JSON.parse(localStorage.getItem("user"));
            await axios.get("http://localhost:8080/api/user/info",{
                headers: {
                    'Authorization': `Bearer ${token}`
                }}).then((response) => {
                setUser(response.data);
            })
        } catch (err) {
            console.error(err.message);
        }
    };
    useEffect(() => {
        getUser();
    }, []);
    return(
        <div className="section">
            <div className="row text-center">
                <div className="container">
                    <div className="col-xs-6 marg2">
                        <h4 className="under1">Данные аккаунта</h4>
                        <Table className="marg2">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Логин</th>
                                <th>Почта</th>
                                <th>Статус</th>
                            </tr>
                            </thead>
                            <tbody>
                            <td value = {user.id}/>
                            <td value = {user.username}/>
                            <td value = {user.email}/>
                            <td />
                            </tbody>
                        </Table>
                    </div>
                    <div className="col-xs-6 marg2">
                        <h4 className="under1">Ваши активные заказы</h4>
                        <Table className="marg2">
                            <thead>
                            <tr>
                                <th>Автомобиль</th>
                                <th>Статус заказа</th>
                            </tr>
                            </thead>
                            <tbody>
                            <td value = ""/>
                            <td value = ""/>
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;