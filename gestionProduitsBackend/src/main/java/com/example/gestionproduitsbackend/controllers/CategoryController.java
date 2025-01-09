package com.example.gestionproduitsbackend.controllers;

import java.util.List;
import java.util.Optional;

import com.example.gestionproduitsbackend.entities.Category;
import com.example.gestionproduitsbackend.services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping({"/api/categories"})
@CrossOrigin(
        origins = {"http://localhost:4200"}
)
public class CategoryController {
    private final CategoryService categoryService;

    @Autowired
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    public List<Category> getAllCategories() {
        return this.categoryService.getAllCategories();
    }

    @GetMapping({"/{id}"})
    public Optional<Category> getCategoryById(@PathVariable Long id) {
        return this.categoryService.getCategoryById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Category createCategory(@RequestBody Category category) {
        return this.categoryService.createCategory(category);
    }

    @PutMapping({"/{id}"})
    public Category updateCategory(@PathVariable Long id, @RequestBody Category category) {
        return this.categoryService.updateCategory(id, category);
    }

    @DeleteMapping({"/{id}"})
    public void deleteCategory(@PathVariable Long id) {
        this.categoryService.deleteCategory(id);
    }
}

