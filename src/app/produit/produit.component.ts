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

  tabs= ['Poissons', 'Détail']

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
    this.selected.setValue(this.tabs.length-1);
    this.produit = prod;
  }

  getProduit(){
    let leproduit = this.produit;
    return leproduit;
  }
  
  modifStock(produit: Product, num:number){
    this.productsService.incrementStock(produit.tig_id,num).subscribe((res : Product) => {
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
  }

  reduireStock(produit: Product, num:number){
    let prix = 0
    let vente = 0
    if (this.selectedValue == this.valeurModif[1].value && produit.sale){
      prix = produit.discount * num
      vente = 1
    }
    else {
      prix = produit.price*num
    }
    
    this.productsService.decrementStock(produit.tig_id,num,vente).subscribe((res : Product) => {
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

  mettrePromo(id:number, num:number){
    this.productsService.putOnSale(id,num).subscribe((res : Product) => {
      this.produit = res
    },
    (err) => {
      alert('failed loading json data');
    });

    this.promo.length = 0;
  }

  enleverPromo(id:number){
    this.productsService.removeSale(id).subscribe((res : Product) => {
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

