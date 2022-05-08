import {Button, Table} from "react-bootstrap";
import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import "../css/products.css"

function ProductsPage(){
    let navigate = useNavigate();
    const [allProducts, setAllProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [body, setBody] = useState("");
    const [release_year, setRelease_year] = useState(null);
    let filterBrandNew = '';
    let filterBodyNew = '';
    let filterModelNew = '';
    let filterBrandSup = '';
    let filterBodySup = '';
    let filterModelSup = '';
    let filterReleaseYearSup = null;
    let categories = null;

    const getProducts = async () => {
        await axios
            .get("http://localhost:8080/api/user/products")
            .then(response => {
                this.info = response.data
                this.products = this.info.products
                this.categories = this.info.categories
            })
    }

    // const showProduct = async (product) => {
    //     location.href = "/products/{product.id}";
    // }

    function findProductsNew(brand, model, body){
        if (brand.equals("") && !model.equals("") && !body.equals("")){
            setProducts(allProducts.filter(product=>product.body === body && product.model === model))
        }
        if (!brand.equals("") && model.equals("") && !body.equals("")){
            setProducts(allProducts.filter(product=>product.brand === brand && product.body === body))
        }
        if (!brand.equals("") && !model.equals("") && body.equals("")){
            setProducts(allProducts.filter(product=>product.brand === brand && product.model === model))
        }

        if (!brand.equals("") && model.equals("") && body.equals("")){
            setProducts(allProducts.filter(product=>product.brand === brand))
        }
        if (brand.equals("") && !model.equals("") && body.equals("")){
            setProducts(allProducts.filter(product=>product.model === model))
        }
        if (brand.equals("") && model.equals("") && !body.equals("")){
            setProducts(allProducts.filter(product=>product.body === body))
        }

        if (!brand.equals("") && !model.equals("") && !body.equals("")){
            setProducts(allProducts.filter(product=>product.brand === brand && product.model === model && product.body === body))
        }
    }

    function findProductsSup(brand, model, body, release_year){
        if (brand.equals("") && !model.equals("") && !body.equals("") && release_year != null){
            setProducts(allProducts.filter(product=>product.body === body && product.model === model && product.release_year === release_year))
        }
        if (!brand.equals("") && model.equals("") && !body.equals("") && release_year != null){
            setProducts(allProducts.filter(product=>product.body === body && product.brand === brand && product.release_year === release_year))
        }
        if (!brand.equals("") && !model.equals("") && body.equals("") && release_year != null){
            setProducts(allProducts.filter(product=>product.brand === brand && product.model === model && product.release_year === release_year))
        }
        if (!brand.equals("") && !model.equals("") && !body.equals("") && release_year == null){
            setProducts(allProducts.filter(product=>product.body === body && product.model === model && product.brand === brand))
        }

        if (brand.equals("") && model.equals("") && !body.equals("") && release_year != null){
            setProducts(allProducts.filter(product=>product.body === body && product.release_year === release_year))
        }
        if (brand.equals("") && !model.equals("") && body.equals("") && release_year != null){
            setProducts(allProducts.filter(product=>product.model === model && product.release_year === release_year))
        }
        if (brand.equals("") && !model.equals("") && !body.equals("") && release_year == null){
            setProducts(allProducts.filter(product=>product.body === body && product.model === model))
        }
        if (!brand.equals("") && model.equals("") && body.equals("") && release_year != null){
            setProducts(allProducts.filter(product=>product.release_year === release_year && product.brand === brand))
        }
        if (!brand.equals("") && model.equals("") && !body.equals("") && release_year == null){
            setProducts(allProducts.filter(product=>product.body === body && product.brand === brand))
        }
        if (!brand.equals("") && !model.equals("") && body.equals("") && release_year == null){
            setProducts(allProducts.filter(product=>product.model === model && product.brand === brand))
        }

        if (!brand.equals("") && model.equals("") && body.equals("") && release_year == null){
            setProducts(allProducts.filter(product=>product.brand === brand))
        }
        if (brand.equals("") && !model.equals("") && !body.equals("") && release_year == null){
            setProducts(allProducts.filter(product=>product.model === model))
        }
        if (brand.equals("") && model.equals("") && !body.equals("") && release_year == null){
            setProducts(allProducts.filter(product=>product.body === body))
        }
        if (brand.equals("") && model.equals("") && body.equals("") && release_year != null){
            setProducts(allProducts.filter(product=>product.release_year === release_year))
        }

        if (!brand.equals("") && !model.equals("") && !body.equals("") && release_year != null){
            setProducts(allProducts.filter(product=>product.body === body && product.model === model && product.release_year === release_year && product.brand === brand))
        }
    }

    const breakProductsSup = async () => {
        filterBrandSup = ''
        filterModelSup = ''
        filterBodySup = ''
        filterReleaseYearSup = null
        await findProductsSup()
    }

    const breakProductsNew = async () => {
        filterBrandNew = ''
        filterModelNew = ''
        filterBodyNew = ''
        await findProductsNew()
    }
}



const Products = (props) => {
    let navigate = useNavigate();
    return(

        <div className="container">
            <div className="row text-center">
                <div className="marg3">

                </div>
                <Table className="marg3">
                    <thead>
                    <tr>
                        <th>Бренд</th>
                        <th>Модель</th>
                        <th>Кузов</th>
                        <th>Цена</th>
                        <th>Детали</th>
                    </tr>
                    </thead>
                    <tbody>
                    {props.products?.map(product => (
                        <tr key={product.id}>
                            <td>{product.brand}</td>
                            <td>{product.model}</td>
                            <td>{product.body}</td>
                            <td>{product.price}</td>
                            <td>
                                <Button className="btn btn-success" onClick={() => navigate("/products/"+product.id,{product})}>Подробнее</Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
                <div className="marg3">

                </div>
                <Table className="marg3">
                    <thead>
                    <tr>
                        <th>Бренд</th>
                        <th>Модель</th>
                        <th>Кузов</th>
                        <th>Год выпуска</th>
                        <th>Цена</th>
                        <th>Детали</th>
                    </tr>
                    </thead>
                    <tbody>
                    {props.products?.map(product => (
                        <tr key={product.id}>
                            <td>{product.brand}</td>
                            <td>{product.model}</td>
                            <td>{product.body}</td>
                            <td>{product.release_year}</td>
                            <td>{product.price}</td>
                            <td>
                                <Button className="btn btn-success" onClick={() => navigate("/products/"+product.id,{product})}>Подробнее</Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}
export default Products;