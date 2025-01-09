import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service'; // Assurez-vous que le service est bien importé
import { Category } from './model/category.model'; // Assurez-vous que votre modèle est bien importé

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  categories: Category[] = [];
  selectedCategory: Category = { id: 0, name: '' };
  newCategory: Category = { id: 0, name: '' };
  showAddCategoryForm: boolean = false;  



  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe((data: Category[]) => {
      this.categories = data;
    });
  }

  onEdit(category: Category): void {
    this.selectedCategory = { ...category }; // Remplir l'objet sélectionné pour l'édition
  }

  onSubmit(): void {
    if (this.selectedCategory.id) {
      this.categoryService.updateCategory(this.selectedCategory.id, this.selectedCategory).subscribe(() => {
        this.loadCategories(); // Recharge la liste des catégories après la mise à jour
        this.selectedCategory = { id: 0, name: '' }; // Réinitialise la sélection pour masquer le formulaire
      });
    }
  }
  
  onAddCategory(): void {
    this.showAddCategoryForm = true;
  }

  onSubmitNewCategory(): void {
    if (this.newCategory.name.trim()) {
      // Créer une nouvelle catégorie sans `id`
      const categoryToCreate: Category = { name: this.newCategory.name };
  
      this.categoryService.createCategory(categoryToCreate).subscribe(
        () => {
          this.loadCategories();
          this.showAddCategoryForm = false;
          this.newCategory = { id: 0, name: '' }; // Réinitialiser après l'ajout
        },
        (error) => {
          console.error('Erreur lors de l\'ajout de la catégorie :', error); // Gérer les erreurs d'ajout
        }
      );
    }
  }
  
  
  

  // Annuler l'ajout et fermer le formulaire
  onCancelAddCategory(): void {
    this.showAddCategoryForm = false;
    this.newCategory = { id: 0, name: '' };
  }
  
  

  onDelete(id: number | undefined): void {
    if (id !== undefined && confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) {
      this.categoryService.deleteCategory(id).subscribe(() => {
        this.loadCategories(); // Recharge la liste après la suppression
      });
    } else {
      console.warn('L\'ID de la catégorie est indéfini');
    }
  }
  

  

  
  onCancel(): void {
    // Réinitialiser la catégorie sélectionnée
    this.selectedCategory = { id: 0, name: '' };
  }
  
}
