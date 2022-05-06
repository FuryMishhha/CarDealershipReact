package com.example.backend.Repository;

import com.example.backend.Entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Integer> {
    Long deleteProductById(Integer id);
    Product findProductById(Integer id);
}