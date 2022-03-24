import { Component, OnInit } from '@angular/core';
 
import { Product } from '../core/interfaces/product';
import { ProductsService } from '../core/services/product.service';
import { Transaction } from '../core/interfaces/transaction';
import { Chart, registerables } from 'chart.js';
@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.css']
})
export class HistoriqueComponent implements OnInit {

  donneeHisto: Transaction[] = [];

 
  typeT: string[] = [];
  dateT: any;
  valeurT: number[] = [];
  quantityT: any;
  chart: any = [];

 
  
   
  constructor(private productsService: ProductsService){Chart.register(...registerables);}
  getDonneesHisto(){
    this.productsService.donneesHisto().subscribe((res : Transaction[]) => {
      this.donneeHisto = res;
      //console.log(this.donneeHisto)
       for (let donn of this.donneeHisto ) {

          this.chart = new Chart('canvas', {
            type: 'line',
            data: {
              labels: [donn.typeT],
              datasets: [
                {
                  data: [donn.valeurT], 
                  borderColor: '#3e95cd',
                  fill: false,
                  label: 'valeur',
                  backgroundColor: 'rgba(93, 175, 89, 0.1)',
                  borderWidth: 3,
                },
              ],
            },
          });

        


       
       }
      
       
    },
    (err) => {
      alert('failed loading json data');
    });

   
  };
  
  ngOnInit(): void {
    this.getDonneesHisto()
    


    
    
  }
   

}
 

