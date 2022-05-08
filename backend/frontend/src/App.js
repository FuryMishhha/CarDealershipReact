import './App.css';
import './css/bootstrap.css';
import Registration from "./components/Registration";
import Header from "./components/Header";
import Profile from "./components/Profile";
import Login from "./components/Login";
import CarDetails from "./components/CarDetails";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Footer from "./components/Footer";
import Products from "./components/Products";
function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <div className="App">
                    <Header/>
                    <Routes>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/registration" element={<Registration/>}/>
                    {/*    <Route path="/" element={<CarFilter/>}/>*/}
                        <Route path="/profile" element={<Profile/>}/>
                        <Route path="/products" element={<Products/>}/>
                    {/*    <Route path="/admin" element={<Admin/>}/>*/}
                        <Route path="/products/:id" element={<CarDetails/>}/>
                    </Routes>
                    <Footer/>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;