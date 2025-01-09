package com.example.gestionproduitsbackend.repositories;

import com.example.gestionproduitsbackend.entities.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
