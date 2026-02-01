# Product Catalog REST API

This project is a Spring Boot REST API for managing Categories and Products.

## Tech Stack
- Java 21
- Spring Boot
- Spring Data JPA
- Hibernate
- MySQL
- Maven

## Features
- Category CRUD operations
- Product CRUD operations
- One-to-Many relationship (Category → Products)
- Server-side pagination
- Product API returns category details

## API Endpoints

### Categories
- POST /api/categories
- GET /api/categories?page=0&size=5
- GET /api/categories/{id}
- PUT /api/categories/{id}
- DELETE /api/categories/{id}

### Products
- POST /api/products
- GET /api/products?page=0&size=5
- GET /api/products/{id}
- PUT /api/products/{id}
- DELETE /api/products/{id}

## Database
MySQL is used as the relational database.

Update database credentials in `application.properties` before running.

## Run Application
```bash
mvn spring-boot:run
