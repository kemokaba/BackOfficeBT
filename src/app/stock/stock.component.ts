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
        this.productsService.addTransaction(tab2[key], prod[0].price*tab[key], prod[0].name, tab[key], prod[0].category, prod[0].tig_id).subscribe((res : Transaction) =>{
          let resultat = res
        })
        continue;
      }

      if (tab[key] < 0 && tab2[key] == this.valeurModif[1].value){
        let valeur = Math.abs(tab[key])
        let vente = 1
        this.productsService.decrementForStock(Number(key),valeur,vente).subscribe((res : Product[]) => {
          this.listeProduits = res
          this.listeProduits.sort((a, b) => (a.tig_id < b.tig_id ? -1 : 1));
        },
        (err) => {
          alert('failed loading json data');
        });
        let prod = this.listeProduits.filter(produit => produit.tig_id == Number(key));
        if(prod[0].quantityInStock==0 && tab[key] < 0 ) {
          alert("La quantité en stock du produit "+prod[0].name+" est de "+prod[0].quantityInStock+" on ne peut pas réduire son stock");
          continue;
        }
        else{
          let prix = 0
          if(prod[0].sale){
            prix = prod[0].discount*valeur
          }
          else{
            prix = prod[0].price*valeur
          }
          this.productsService.addTransaction(tab2[key], prix, prod[0].name, valeur, prod[0].category, prod[0].tig_id).subscribe((res : Transaction) =>{
            let resultat = res
          })

          continue;
        }
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
        if(prod[0].quantityInStock==0 && tab[key] < 0 ) {
          alert("La quantité en stock du produit "+prod[0].name+" est de "+prod[0].quantityInStock+" on ne peut pas réduire son stock");
          continue;
        }
        else{ 
          this.productsService.addTransaction(tab2[key], prod[0].price*valeur, prod[0].name, valeur, prod[0].category, prod[0].tig_id).subscribe((res : Transaction) =>{
            let resultat = res
          })
          }
          continue;
        }
        
      }
    this.nombre.length = 0
    this.selectedValue.length = 0
  }
    
  

  putonsaleAll(tab:number[]){
    for (let key in tab){
      if(tab[key] > 0){
        this.productsService.putonsaleForStock(Number(key),tab[key]).subscribe((res : Product[]) => {
          this.listeProduits = res
          this.listeProduits.sort((a, b) => (a.tig_id < b.tig_id ? -1 : 1));
        },
        (err) => {
          alert('failed loading json data');
        });
        continue;
      }
      
      if(tab[key] !== null && tab[key] == 0){
        this.productsService.removeSaleForStock(Number(key)).subscribe((res : Product[]) => {
          this.listeProduits = res
          this.listeProduits.sort((a, b) => (a.tig_id < b.tig_id ? -1 : 1));
        },
        (err) => {
          alert('failed loading json data');
        });
      }
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
