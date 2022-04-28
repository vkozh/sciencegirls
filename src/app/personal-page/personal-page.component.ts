import { Component, Input, OnInit, Inject } from '@angular/core';
import { heroines } from '../heroines';
import { Heroine } from '../heroine';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PhotoComponent } from '../photogallery/photogallery.component';
import { AppComponent } from '../app.component';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

export interface DialogData {
  heroine: Heroine;
  trusturl: SafeResourceUrl;
  urlCollegues: SafeResourceUrl;
}

@Component({
  selector: 'app-personal-page',
  templateUrl: './personal-page.component.html',
  styleUrls: ['./personal-page.component.css']
})
export class PersonalPageComponent implements OnInit {
  heroines = heroines;
  // @Input() data?: {heroine?: Heroine, index?: number}
 // @Input() heroine?: Heroine;
  //@Input() index?: number;
  src!: SafeResourceUrl;
  imgsrc!: SafeResourceUrl;

  constructor(public dialogRef: MatDialogRef<PersonalPageComponent>,
    public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngAfterViewInit() {
    convertTexts();
  }

  openPhoto(heroine: Heroine, index: number): void {
    let dialogRef = this.dialog.open(PhotoComponent,  {
      data: {
        heroine: heroine,
        index: index
      }
    });
  }



}

const convertTexts = () => {
  //конвертируем тексты Героинь в html
  let personalPage = document.querySelector(".personal-page") as HTMLElement;
  let texts = Array.from(personalPage.querySelectorAll('p'));
  texts.forEach(text => {
    if (text.classList.contains('textForConverting'))
      text.innerHTML = text.innerText
  })

  let spans = Array.from(personalPage.querySelectorAll('span'));
  spans.forEach(text => {
    if (text.classList.contains('textForConverting'))
      text.innerHTML = text.innerText
  })
}

