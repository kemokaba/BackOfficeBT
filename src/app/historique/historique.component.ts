import { AfterContentInit, AfterViewInit, Component, OnInit, ViewChild, ElementRef } from '@angular/core';

declare let $: any

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.css']
})
export class HistoriqueComponent implements AfterContentInit {
  title ="historique-dashbord-demo";
  @ViewChild('revealView') el! : ElementRef;
  private revealView: any
  ngAfterContentInit(): void {
    $.ig.RevealSdkSettings.setBaseUrl("http://51.255.166.155:1352/tig/products/");
    $.ig.RevealSdkSettings.ensureFontsLoadedAsync().then(() => {
        //$.ig.RVDashboard.loadDashboard('Sales', (dashboard: any) => {
        this.revealView = new $.ig.RevealView(this.el.nativeElement);
        //this.revealView.dashboard = dashboard;
    });
  
  }
  

   
   


}
