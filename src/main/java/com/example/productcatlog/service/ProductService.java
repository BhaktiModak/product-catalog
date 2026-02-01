package com.example.productcatlog.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.example.productcatlog.dto.ProductRequest;
import com.example.productcatlog.entity.Product;

public interface ProductService {
    Page<Product> getAllProducts(Pageable pageable);
    Product createProduct(ProductRequest request);
    Product getProductById(Long id);
    Product updateProduct(Long id, Product product);
    void deleteProduct(Long id);
}

