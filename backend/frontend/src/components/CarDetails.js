import "../css/carDetails.css"
import {
    Button,
    Card,
    CardImg,
    Form,
    Col,
    Container, FormControl,
    InputGroup,
    ListGroup,
    ListGroupItem,
    Modal,
    Row,
    Stack, Table
} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import React from 'react';
import axios from "axios";
function MyVerticallyCenteredModal(props) {
    let navigate = useNavigate();
    const [user, setUser] = useState([]);
    const getUser = async () => {
        try {
            let token = JSON.parse(localStorage.getItem("user"));
            await axios.get("http://localhost:8080/api/user/info", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then((response) => {
                setUser(response.data);
            })
        } catch (err) {
            console.error(err.message);
        }
    };

    // const getProduct = async () =>{
    //     await axios.get("http://localhost:8080/api/user/info",{
    //
    //     }
    // }

    // const bookTour = async () => {
    //     try {
    //         let token = JSON.parse(localStorage.getItem("user"));
    //         await axios.post("http://localhost:8080/api/user/booking",
    //             {
    //                 "id": props.tour.id,
    //                 "start": props.tour.start,
    //                 "finish": props.tour.finish,
    //                 "price": props.tour.price,
    //                 "date": props.tour.date,
    //                 "count": props.tour.count,
    //                 "description": {
    //                     "id": props.tour.description.id,
    //                     "img": props.tour.description.img,
    //                     "text": props.tour.description.text
    //                 },
    //                 "users": props.tour.users
    //             },
    //             {
    //                 headers: {
    //                     'Authorization': `Bearer ${token}`
    //                 }}
    //         ).then((response) => {
    //             navigate("/profile")
    //         })
    //     } catch (err) {
    //         console.error(err.message);
    //     }
    // };
    useEffect(() => {
        getUser();
    }, []);
}

function CarDetails(){
    return(
        <div className="container marg4">
            <div className="row text-center">
                <div className="col-xs-4">
                    <Table className="marg4">
                        <thead>
                        <tr>
                            <th>Характеристика</th>
                            <th>Описание</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th scope="col">Бренд</th>
                            <td></td>
                        </tr>
                        <tr>
                            <th scope="col">Модель</th>
                            <td></td>
                        </tr>
                        <tr>
                            <th scope="col">Пробег</th>
                            <td></td>
                        </tr>
                        <tr>
                            <th scope="col">Год выпуска</th>
                            <td></td>
                        </tr>
                        <tr>
                            <th scope="col">Кузов</th>
                            <td></td>
                        </tr>
                        <tr>
                            <th scope="col">Цвет</th>
                            <td></td>
                        </tr>
                        <tr>
                            <th scope="col">Двигатель</th>
                            <td></td>
                        </tr>
                        <tr>
                            <th scope="col">Коробка</th>
                            <td></td>
                        </tr>
                        <tr>
                            <th scope="col">Руль</th>
                            <td></td>
                        </tr>
                        <tr>
                            <th scope="col">Количество владельцев</th>
                            <td></td>
                        </tr>
                        <tr>
                            <th scope="col">Цена</th>
                            <td></td>
                        </tr>
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    )
}

export default CarDetails;