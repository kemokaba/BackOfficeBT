import { Component, OnInit } from '@angular/core';
import { Product } from '../core/interfaces/product';
import { ProductsService } from '../core/services/product.service';
import { RaisonModif } from '../core/interfaces/raisonModif';
import { Transaction } from '../core/interfaces/transaction';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {

  listeProduits: Product[] = [];

  displayedDetailCol: string[] = ['name', 'price', 'price_on_sale', 'discount', 'quantity_stock', 'quantity_sold', 'comments','type', 'input', 'input2'];

  nombre: number[]= []

  promo: number [] = []

  selectedValue:string[]= []

  valeurModif: RaisonModif[] = [
    {value: 'ajout', viewValue: 'A'},
    {value: 'retrait-par-vente', viewValue: 'V'},
    {value: 'retrait-par-invendus', viewValue: 'I'},
  ];

  constructor(private productsService: ProductsService) { }

  getProducts(){
    this.productsService.getProductsFromJson().subscribe((res : Product[]) => {
      this.listeProduits = res;
      this.listeProduits.sort((a, b) => (a.tig_id < b.tig_id ? -1 : 1));
    },
    (err) => {
      alert('failed loading json data');
    });
  }

  triTableau(numCat: number){
    let tabTri = this.listeProduits.filter(produit => produit.category == numCat);
    return tabTri;
  }

  removePromo(id:number){
    this.productsService.removeSaleForStock(id).subscribe((res : Product[]) => {
      this.listeProduits = res
      this.listeProduits.sort((a, b) => (a.tig_id < b.tig_id ? -1 : 1));
    },
    (err) => {
      alert('failed loading json data');
    });
    
  }
  
  sendAlldata(tab:number[], tab2:string[]){
    for (let key in tab){
      if (tab[key] > 0 && tab2[key] == this.valeurModif[0].value){
        this.productsService.incrementForStock(Number(key),tab[key]).subscribe((res : Product[]) => {
          this.listeProduits = res
          this.listeProduits.sort((a, b) => (a.tig_id < b.tig_id ? -1 : 1));
        },
        (err) => {
          alert('failed loading json data');
        });

        let prod = this.listeProduits.filter(produit => produit.tig_id == Number(key));
        for (let produit of prod){
          this.productsService.addTransaction(tab2[key], produit.price*tab[key], produit.name, tab[key], produit.category, produit.tig_id).subscribe((res : Transaction) =>{
            let resultat = res
          })
        }
        continue;
      }

      if (tab[key] < 0 && tab2[key] == this.valeurModif[1].value){
        let valeur = Math.abs(tab[key])
        console.log(valeur)
        let vente = 1
        this.productsService.decrementForStock(Number(key),valeur,vente).subscribe((res : Product[]) => {
          this.listeProduits = res
          this.listeProduits.sort((a, b) => (a.tig_id < b.tig_id ? -1 : 1));
        },
        (err) => {
          alert('failed loading json data');
        });
        let prod = this.listeProduits.filter(produit => produit.tig_id == Number(key));
        for (let produit of prod){
          let prix = 0
          if(produit.sale){
            prix = produit.discount*valeur
          }
          else{
            prix = produit.price*valeur
          }
          this.productsService.addTransaction(tab2[key], prix, produit.name, valeur, produit.category, produit.tig_id).subscribe((res : Transaction) =>{
            let resultat = res
          })
        }
        continue;
      }

      if (tab[key] < 0 && tab2[key] == this.valeurModif[2].value){
        let valeur = Math.abs(tab[key])
        let vente = 0
        this.productsService.decrementForStock(Number(key),valeur,vente).subscribe((res : Product[]) => {
          this.listeProduits = res
          this.listeProduits.sort((a, b) => (a.tig_id < b.tig_id ? -1 : 1));
        },
        (err) => {
          alert('failed loading json data');
        });
        let prod = this.listeProduits.filter(produit => produit.tig_id == Number(key));
        for (let produit of prod){
          this.productsService.addTransaction(tab2[key], produit.price*valeur, produit.name, valeur, produit.category, produit.tig_id).subscribe((res : Transaction) =>{
            let resultat = res
          })
        }
        continue;
      }
    }
    this.nombre.length = 0
    this.selectedValue.length = 0
  }

  /*decrementAll(tab:number[]){
    for (let key in tab){
      this.productsService.decrementForStock(Number(key),tab[key]).subscribe((res : Product[]) => {
        this.listeProduits = res
        this.listeProduits.sort((a, b) => (a.tig_id < b.tig_id ? -1 : 1));
      },
      (err) => {
        alert('failed loading json data');
      });
    }
    this.nombre.length = 0
  }*/

  putonsaleAll(tab:number[]){
    for (let key in tab){
      this.productsService.putonsaleForStock(Number(key),tab[key]).subscribe((res : Product[]) => {
        this.listeProduits = res
        this.listeProduits.sort((a, b) => (a.tig_id < b.tig_id ? -1 : 1));
      },
      (err) => {
        alert('failed loading json data');
      });
    }
    this.promo.length = 0
  }

  test(tab:number[], tab2:string[]){
    console.log(tab);
    console.log(tab2);
    console.log(this.listeProduits[18])
  }

  ngOnInit(): void {
    this.getProducts();
  }

}
