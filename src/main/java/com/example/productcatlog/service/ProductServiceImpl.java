package com.example.productcatlog.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.productcatlog.dto.ProductRequest;
import com.example.productcatlog.entity.Category;
import com.example.productcatlog.entity.Product;
import com.example.productcatlog.exception.ResourceNotFoundException;
import com.example.productcatlog.repository.CategoryRepository;
import com.example.productcatlog.repository.ProductRepository;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    public ProductServiceImpl(ProductRepository productRepository,
                              CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    @Override
    public Page<Product> getAllProducts(Pageable pageable) {
        return productRepository.findAllWithCategory(pageable);
    }

    @Override
    public Product createProduct(ProductRequest request) {

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Category not found with id " + request.getCategoryId()));

        Product product = new Product();
        product.setName(request.getName());
        product.setPrice(request.getPrice());
        product.setQuantity(request.getQuantity());
        product.setCategory(category);

        return productRepository.save(product);
    }

    @Override
    public Product getProductById(Long id) {
        return productRepository.findByIdWithCategory(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Product not found with id " + id));
    }

    @Override
    public Product updateProduct(Long id, Product product) {

        Product existing = productRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Product not found with id " + id));

        existing.setName(product.getName());
        existing.setPrice(product.getPrice());
        existing.setQuantity(product.getQuantity());

        productRepository.save(existing);

        // 🔥 FETCH WITH CATEGORY BEFORE RETURN
        return productRepository.findByIdWithCategory(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Product not found with id " + id));
    }


    @Override
    public void deleteProduct(Long id) {
        productRepository.delete(
                productRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException("Product not found with id " + id))
        );
    }
}
