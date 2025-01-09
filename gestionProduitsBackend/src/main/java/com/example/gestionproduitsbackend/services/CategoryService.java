package com.example.gestionproduitsbackend.services;



import java.util.List;
import java.util.Optional;

import com.example.gestionproduitsbackend.entities.Category;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.gestionproduitsbackend.repositories.CategoryRepository;

@Service
public class CategoryService {
    private final CategoryRepository categoryRepository;

    @Autowired
    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<Category> getAllCategories() {
        return this.categoryRepository.findAll();
    }

    public Optional<Category> getCategoryById(Long id) {
        return this.categoryRepository.findById(id);
    }

    public Category createCategory(Category category) {
        return (Category)this.categoryRepository.save(category);
    }

    public Category updateCategory(Long id, Category category) {
        Category existingCategory = (Category)this.categoryRepository.findById(id).orElseThrow(() -> {
            return new RuntimeException("Category not found with id " + id);
        });
        existingCategory.setName(category.getName());
        return (Category)this.categoryRepository.save(existingCategory);
    }

    public void deleteCategory(Long id) {
        this.categoryRepository.deleteById(id);
    }
}