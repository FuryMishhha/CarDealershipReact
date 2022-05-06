package com.example.backend.Service;

import com.example.backend.Entity.Order;
import com.example.backend.Entity.Product;
import com.example.backend.Entity.User;
import com.example.backend.Repository.ProductRepository;
import com.example.backend.Repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@Transactional
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    ProductService productService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    OrderService orderService;

//    public Product addProduct(Product product) {
//        if (product.getBrand().equals("") || product.getPrice() == null
//                || product.getBody().equals("")
//                || product.getModel().equals("") || product.getRelease_year() == null
//                || product.getColor().equals("") || product.getEngine().equals("")
//                || product.getDrive().equals("") || product.getWheel().equals("")
//                || product.getCategory().equals("") || product.getPicture().equals("")
//                || (product.getCategory().equals("support car") &&
//                (product.getMileage() == null || product.getNumber_of_owners() == null))) {
//            Product new_product = new Product(
//                    product.getMileage(),
//                    product.getNumber_of_owners(),
//                    product.getCategory(),
//                    product.getBrand(),
//                    product.getModel(),
//                    product.getRelease_year(),
//                    product.getBody(),
//                    product.getColor(),
//                    product.getEngine(),
//                    product.getDrive(),
//                    product.getWheel(),
//                    product.getPrice(),
//                    product.getPicture());
//            return productRepository.save(new_product);
//        }
//    }

    public List<Product> findAll() {
        List <Product> productList = productRepository.findAll();
        productList.sort(Comparator.comparingInt(Product::getId));
        return productList;
    }

    public void updateProduct(Product product){
        Product updatedProduct = productService.findProduct(product.getId());
        if (updatedProduct != null){
            if (!product.getBrand().equals("")) updatedProduct.setBrand(product.getBrand());
            if (!product.getModel().equals("")) updatedProduct.setModel(product.getModel());
            if (product.getPrice()!=null) updatedProduct.setPrice(product.getPrice());
            if (product.getRelease_year()!=null) updatedProduct.setRelease_year(product.getRelease_year());
            if (product.getMileage()!=null) updatedProduct.setMileage(product.getMileage());
            if (product.getNumber_of_owners()!=null) updatedProduct.setNumber_of_owners(product.getNumber_of_owners());
            if (!product.getColor().equals("")) updatedProduct.setColor(product.getColor());
            if (!product.getBody().equals("")) updatedProduct.setBody(product.getBody());
            if (!product.getEngine().equals("")) updatedProduct.setEngine(product.getEngine());
            if (!product.getDrive().equals("")) updatedProduct.setDrive(product.getEngine());
            if (!product.getWheel().equals("")) updatedProduct.setWheel(product.getWheel());
            if (!product.getCategory().equals("")) updatedProduct.setCategory(product.getCategory());
            if (!product.getPicture().equals("")) updatedProduct.setPicture(product.getPicture());
            productRepository.save(updatedProduct);
        }
    }

    public String bookProduct(Product product){
        User user = userRepository.findByEmail(String.valueOf(SecurityContextHolder.getContext().getAuthentication().getPrincipal()));
        String email = user.getEmail();

        Order order = new Order();
        order.setProduct_id(product.getId().intValue());
        order.setUser_id(user.getId().intValue());
        order.setStatus("Резерв");

        DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
        Date date = new Date();
        order.setCreation_date(dateFormat.format(date));

        orderService.addOrder(order);

        product.setOrder_id(order.getId());
        productRepository.save(product);

        StringBuilder message = new StringBuilder();
        message.append(product.toString());
        emailService.sendmail(message.toString(), email);

        return "redirect:/api/user/account";
    }

    public Product findProduct(Long id){
        return productRepository.findProductById(id.intValue());
    }

    public void deleteProduct(Long id){
        productRepository.deleteProductById(id.intValue());
    }
}
