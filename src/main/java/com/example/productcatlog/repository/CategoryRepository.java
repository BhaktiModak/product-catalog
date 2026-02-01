package com.example.productcatlog.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.productcatlog.entity.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}

