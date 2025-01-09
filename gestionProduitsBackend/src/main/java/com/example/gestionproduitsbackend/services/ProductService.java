package com.example.gestionproduitsbackend.services;

import java.util.List;
import java.util.Optional;

import com.example.gestionproduitsbackend.entities.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.example.gestionproduitsbackend.repositories.ProductRepository;

@Repository
public class ProductService {
    private final ProductRepository productRepository;

    @Autowired
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getAllProducts() {
        return this.productRepository.findAll();
    }

    public Optional<Product> getProductById(Long id) {
        return this.productRepository.findById(id);
    }

    public List<Product> getProductsByCategory(Long categoryId) {
        return this.productRepository.findByCategoryId(categoryId);
    }

    public Product createProduct(Product product) {
        return (Product)this.productRepository.save(product);
    }

    public void deleteProduct(Long id) {
        this.productRepository.deleteById(id);
    }
}

