import { Component, OnInit } from '@angular/core';
import { Product } from '../core/interfaces/product';
import { ProductsService } from '../core/services/product.service';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { RaisonModif } from '../core/interfaces/raisonModif';
import { Transaction } from '../core/interfaces/transaction';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent implements OnInit {

  listeProduits: Product[] = [];

  produit: Product = {
    comments: '',
    category: 0,
    availability: false,
    id: 0,
    price: 0,
    discount: 0,
    sale: false,
    owner: '',
    unit: '',
    name: '',
    quantityInStock: 0,
    quantitySold: 0,
    percentage_reduc: 0,
    tig_id: 0
  }

  displayedColumns: string[] = ['name', 'détail'];

  selected = new FormControl(0);

  nombre: number[] = [];

  promo: number[] = [];

  valeurModif: RaisonModif[] = [
    {value: 'ajout', viewValue: 'Ajout'},
    {value: 'retrait-par-vente', viewValue: 'Vente'},
    {value: 'retrait-par-invendus', viewValue: 'Invendu'},
  ];

  selectedValue: string= "";

  constructor(private productsService: ProductsService, public dialog: MatDialog) { }

  getProducts(){
    this.productsService.getProductsFromJson().subscribe((res : Product[]) => {
      this.listeProduits = res;
      this.listeProduits.sort((a, b) => (a.tig_id < b.tig_id ? -1 : 1));
    },
    (err) => {
      alert('failed loading json data');
    });
  }
  
  allerVersDetail(prod: Product): void{
    this.selected.setValue(this.displayedColumns.length-1);
    this.produit = prod;
  }

  getProduit(){
    let leproduit = this.produit;
    return leproduit;
  }
  
  modifStock(produit: Product, num:number){
    produit.quantityInStock += num
    this.productsService.incrementStock(produit.tig_id,produit.quantityInStock).subscribe((res : Product) => {
      this.produit = res
    },
    (err) => {
      alert('failed loading json data');
    });
    let prix = produit.price*num
    this.productsService.addTransaction(this.selectedValue, prix, produit.name, num, produit.category, produit.tig_id).subscribe((res : Transaction) =>{
      let resultat = res
    })
    
    this.nombre.length = 0;
    console.log(this.produit);
  }

  reduireStock(produit: Product, num:number){
    let prix = 0
    if(produit.quantityInStock==0 && produit.quantityInStock-num < 0 ) {
      alert("La quantité en stock du produit "+produit.name+" est de "+produit.quantityInStock+" on ne peut pas réduire son stock");
    }
    else {
      if(this.selectedValue == this.valeurModif[1].value){
        if (produit.sale){
          prix = produit.discount * num
        }
        else {
          prix = produit.price*num
        }
        produit.quantityInStock -= num
        produit.quantitySold += num
        this.productsService.decrementForVente(produit.tig_id,produit.quantityInStock,produit.quantitySold).subscribe((res : Product) => {
          this.produit = res
        },
        (err) => {
          alert('failed loading json data');
        });
    
        this.productsService.addTransaction(this.selectedValue, prix, produit.name, num, produit.category, produit.tig_id).subscribe((res : Transaction) =>{
          let resultat = res
        })
        
        this.nombre.length = 0;
      }
      else if (this.selectedValue == this.valeurModif[2].value){
        prix = produit.price*num
        produit.quantityInStock -= num
        this.productsService.decrementStock(produit.tig_id,produit.quantityInStock).subscribe((res : Product) => {
            this.produit = res
          },
          (err) => {
            alert('failed loading json data');
          });
      
        this.productsService.addTransaction(this.selectedValue, prix, produit.name, num, produit.category, produit.tig_id).subscribe((res : Transaction) =>{
            let resultat = res
          })
      }
      
    }  
    
  }

  mettrePromo(produit:Product, num:number){
    if(num > 0){
      produit.percentage_reduc = num
      produit.sale = true
      produit.discount = Math.round((produit.price * (1 - produit.percentage_reduc / 100)) * 100) / 100
      this.productsService.putOnSale(produit.tig_id,produit.sale,produit.discount,produit.percentage_reduc).subscribe((res : Product) => {
        this.produit = res
      },
      (err) => {
        alert('failed loading json data');
      });
    }
    else{
      produit.sale = false
      this.productsService.removeSale(produit.tig_id,produit.sale).subscribe((res : Product) => {
        this.produit = res
      },
      (err) => {
        alert('failed loading json data');
      });
    }

    this.promo.length = 0;
  }

  enleverPromo(produit:Product){
    produit.sale = false
    this.productsService.removeSale(produit.tig_id, produit.sale).subscribe((res : Product) => {
      this.produit = res
    },
    (err) => {
      alert('failed loading json data');
    });
  }

  ngOnInit(): void {
    this.getProducts();
  }
}

