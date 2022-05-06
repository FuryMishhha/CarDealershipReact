package com.example.backend.Controller;

import com.example.backend.Entity.Product;
import com.example.backend.Entity.User;
import com.example.backend.Service.ProductService;
import com.example.backend.Service.UserService;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    ProductService productService;

    @GetMapping("/profile")
    public User getUserInfo(){
        return userService.findByEmail(String.valueOf(SecurityContextHolder.getContext().getAuthentication().getPrincipal()));
    }

    @PostMapping("/profile")
    public void updateUserInfo(@RequestBody User user){
        userService.updateUser(user);
    }

    @PostMapping("/products/{id}")
    public String bookProduct(@RequestBody Product product){
        return productService.bookProduct(product);
    }
}
