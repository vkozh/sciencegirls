import { Component, Inject, OnInit, Input } from '@angular/core';
import { Heroine } from '../heroine';
import { heroines } from '../heroines';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

export interface DialogData {
  heroine: Heroine;
  index: number
}

@Component({
  selector: 'app-photogallery',
  templateUrl: './photogallery.component.html',
  styleUrls: ['./photogallery.component.css']
})
export class PhotogalleryComponent implements OnInit {
  heroines = heroines;
  @Input() heroineFromApp = '';
  heroine?: Heroine;
  index?: number;
  //src=`./assets/images/${}/`

  constructor(public dialog: MatDialog,
    // public dialogRef: MatDialogRef<PhotogalleryComponent>,
    //  @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  condition(name: string) {
    //names for select
    return this.heroineFromApp.includes(name)
  }

  ngOnInit(): void {
  }

  openPhoto(heroine: Heroine, index: number): void {
    let dialogRef = this.dialog.open(PhotoComponent, {

      data: {
        heroine: heroine,
        index: index
      }
    });
  }
  // openDialog(heroine: Heroine): void {
  //   let dialogRef = this.dialog.open(PhotogalleryComponent, {
  //     height: '400px',
  //     width: '600px',
  //     data: {heroine: heroine}
  //   });
  // }
  // onNoClick(): void {
  //   this.dialogRef.close();
  // }
}

@Component({
  selector: 'app-photo',
  templateUrl: '../photo/photo.component.html',
})
export class PhotoComponent {
  constructor(public dialogRef: MatDialogRef<PhotoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }
}
