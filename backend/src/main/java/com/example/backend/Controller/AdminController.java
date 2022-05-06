package com.example.backend.Controller;

import com.example.backend.Entity.Order;
import com.example.backend.Entity.Product;
import com.example.backend.Entity.User;
import com.example.backend.Repository.OrderRepository;
import com.example.backend.Service.OrderService;
import com.example.backend.Service.ProductService;
import com.example.backend.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    @Autowired
    private ProductService productService;

    @Autowired
    private UserService userService;

    @Autowired
    private OrderService orderService;

    @GetMapping("/products")
    List<Product> allProducts() {
        return productService.findAll();
    }

//    @PostMapping("/products")
//    Product addProduct(@RequestBody Product product) {
//        return productService.addProduct(product);
//    }

    @PutMapping("/products/{id}")
    public void updateProductInfo(@PathVariable long id, @RequestBody Product product) {
        productService.updateProduct(product);
    }

    @DeleteMapping("/products")
    void deleteProduct(@PathVariable long id) {
        productService.deleteProduct(id);
    }

    @GetMapping("/users")
    List<User> allUsers(){
        return userService.allUsers();
    }

//    @PostMapping("/users")
//    void updateUserInfo(@PathVariable long id, @RequestBody User user){
//        userService.updateUser(user);
//    }

    @DeleteMapping("/users")
    void deleteUser(@PathVariable long id){
        userService.deleteUser(id);
    }

    @GetMapping("/orders")
    List<Order> allOrders(){
        return orderService.allOrders();
    }

    @PostMapping("/orders")
    void updateOrderInfo(@PathVariable long id, @RequestBody Order order){
        orderService.updateOrder(order);
    }
}
