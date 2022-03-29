// src\app\shared\components\sidenav\sidenav.component.ts

import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';



@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  themeColor: 'primary' | 'accent' | 'warn' = 'primary'; 
  isDark = false; 
  constructor(private overlay: OverlayContainer) {}

  ngOnInit(): void {}

  // ? notice below
  toggleTheme(): void {
    this.isDark = !this.isDark;
    if (this.isDark) {
      this.overlay.getContainerElement().classList.add('dark-theme');
    } else {
      this.overlay
        .getContainerElement()
        .classList.remove('dark-theme');
    }
  }
}
