import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { CategoryService } from '../services/category.service';
import { Product } from './model/product.model';
import { Category } from '../category/model/category.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: Category[] = [];
  selectedCategoryId = 0;
  productForm: FormGroup;
  isEditMode = false;
  showAddProductForm = false;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private fb: FormBuilder
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }

  initForm(): void {
    this.productForm = this.fb.group({
      id: [0],
      name: ['', [Validators.required, Validators.minLength(2)]],
      price: [0, [Validators.required, Validators.min(0)]],
      categoryId: [0, [Validators.required, Validators.min(1)]]
    });
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data: Product[]) => {
        this.products = data;
        this.filteredProducts = data;
      },
      error: (error) => {
        console.error('Error loading products', error);
      }
    });
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (data: Category[]) => {
        this.categories = data;
      },
      error: (error) => {
        console.error('Error loading categories', error);
      }
    });
  }

  getCategoryName(categoryId: number): string {
    const category = this.categories.find(c => c.id === categoryId);
    return category ? category.name : 'Uncategorized';
  }

  onCategoryChange(): void {
    if (this.selectedCategoryId === 0) {
      this.filteredProducts = this.products;
    } else {
      this.productService.getProductsByCategory(this.selectedCategoryId)
        .subscribe({
          next: (products: Product[]) => {
            this.filteredProducts = products;
          },
          error: (error) => {
            console.error('Error fetching products by category', error);
          }
        });
    }
  }

  onEdit(product: Product): void {
    this.isEditMode = true;
    this.showAddProductForm = true;
    this.productForm.patchValue(product);
  }


  onSubmit(): void {
    if (this.productForm.valid) {
      const productData = this.productForm.value;
      
      // Assurez-vous d'envoyer un objet category avec l'ID
      const productToSend = {
        ...productData,
        category: { id: productData.categoryId } // Ajouter un objet catégorie avec l'ID
      };
  
      if (this.isEditMode) {
        this.productService.updateProduct(productData.id, productToSend)
          .subscribe({
            next: () => {
              console.log('Produit mis à jour avec succès');
              this.loadProducts();
              this.resetForm();
            },
            error: (error) => {
              console.error('Erreur lors de la mise à jour du produit', error);
            }
          });
      } else {
        const { id, ...productToCreate } = productToSend;
        this.productService.createProduct(productToCreate)
          .subscribe({
            next: () => {
              console.log('Produit créé avec succès');
              this.loadProducts();
              this.resetForm();
            },
            error: (error) => {
              console.error('Erreur lors de la création du produit', error);
            }
          });
      }
    } else {
      console.warn('Le formulaire est invalide');
    }
  }
  

  resetForm(): void {
    this.productForm.reset({
      id: 0,
      name: '',
      price: 0,
      categoryId: 0
    });
    this.isEditMode = false;
    this.showAddProductForm = false;
  }

  onDelete(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id)
        .subscribe({
          next: () => {
            console.log('Produit supprimé avec succès');
            this.loadProducts();
          },
          error: (error) => {
            console.error('Erreur lors de la suppression du produit', error);
          }
        });
    }
  }
}
