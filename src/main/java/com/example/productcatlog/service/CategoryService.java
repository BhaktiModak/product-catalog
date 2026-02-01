package com.example.productcatlog.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.example.productcatlog.entity.Category;

public interface CategoryService {

    Page<Category> getAllCategories(Pageable pageable);

    Category createCategory(Category category);

    Category getCategoryById(Long id);

    Category updateCategory(Long id, Category category);

    void deleteCategory(Long id);
}
