import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoriqueComponent } from './historique/historique.component';
import { ProduitComponent } from './produit/produit.component';
import { StockComponent } from './stock/stock.component';

const routes: Routes = [
  {path: 'produit', component: ProduitComponent},
  {path:'stock', component: StockComponent},
  {path:'historique', component: HistoriqueComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
