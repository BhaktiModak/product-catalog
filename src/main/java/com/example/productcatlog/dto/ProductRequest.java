package com.example.productcatlog.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductRequest {

    private String name;
    private double price;
    private int quantity;
    private Long categoryId;
}

