import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent  {
  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<MenuComponent>) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  openMenu():void{
    const dialogRef = this.dialog.open(MenuComponent, {
      backdropClass: 'menu__backdrop',
      panelClass: 'menu__panel',
      position: {
        top: '0px',
        left: '0px'
      }
    });
  }

}
