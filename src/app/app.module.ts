import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ProduitComponent } from './produit/produit.component';
import { StockComponent } from './stock/stock.component';
import { HistoriqueComponent } from './historique/historique.component';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';


import { HttpClientModule } from '@angular/common/http';
import { ProductsService } from './core/services/product.service';

import { SharedModule } from './shared/shared.module'; //All material modules here
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    ProduitComponent,
    StockComponent,
    HistoriqueComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatTabsModule,
    MatCardModule,
    MatDividerModule,
    HttpClientModule,
    SharedModule,
    MatGridListModule,
    RouterModule,
  ],
  providers: [HttpClientModule, ProductsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
