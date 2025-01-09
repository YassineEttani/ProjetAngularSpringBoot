package com.example.gestionproduitsbackend.controllers;

import java.util.List;
import java.util.Optional;

import com.example.gestionproduitsbackend.entities.Product;
import com.example.gestionproduitsbackend.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping({"/api/products"})
@CrossOrigin(
        origins = {"http://localhost:4200"}
)
public class ProductController {
    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public List<Product> getAllProducts() {
        return this.productService.getAllProducts();
    }

    @GetMapping({"/{id}"})
    public Optional<Product> getProductById(@PathVariable Long id) {
        return this.productService.getProductById(id);
    }

    @GetMapping({"/category/{categoryId}"})
    public List<Product> getProductsByCategory(@PathVariable Long categoryId) {
        return this.productService.getProductsByCategory(categoryId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Product createProduct(@RequestBody Product product) {
        return this.productService.createProduct(product);
    }

    @DeleteMapping({"/{id}"})
    public void deleteProduct(@PathVariable Long id) {
        this.productService.deleteProduct(id);
    }
}