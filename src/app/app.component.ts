import { Component, Inject, Input } from '@angular/core';
import { Heroine } from './heroine';
import { heroines } from './heroines';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { Router, Scroll, NavigationEnd, Routes } from '@angular/router';
import { Location, ViewportScroller } from '@angular/common';
import { ScollprogressDirective } from './directives/scollprogress.directive';
import { PhotoComponent } from './photogallery/photogallery.component';
import { PersonalPageComponent } from './personal-page/personal-page.component';


export interface DialogData {
  heroine: Heroine;
  trusturl: SafeResourceUrl;
  /*srcdoc: SafeResourceUrl;*/
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'science-girls';
  heroines = heroines;
  heroine!: Heroine;
  src!: SafeResourceUrl;
  imgsrc!: SafeResourceUrl;
  tooltipElem!: HTMLElement;

  luda = 'Людмила Колупаева'
  irina = 'Ирина Титкова'
  margo = 'Маргарита Васильевна Александрова'
  dania = 'Дания Зинатулина'
  galina = 'Галина Анатольевна Карамышева'
  elena = 'Елена Кравченко'

  constructor(public dialog: MatDialog, public sanitizer: DomSanitizer) { }

  ngAfterViewInit() {

    convertTexts();

    //Подсказки
    let text = document.querySelectorAll('.tooltip-element');
    text.forEach((t) => {
      t.addEventListener('mouseover', this.setTooltip)
      t.addEventListener('mouseout', this.removeTooltip);
    });
  }

  public setTooltip(e: Event): void {
    let target = e.target as HTMLTextAreaElement;
    let tooltipHtml = target.dataset['tooltip'];
    if (!tooltipHtml) return;

    this.tooltipElem = document.createElement('div');
    this.tooltipElem.className = 'mytooltip';
    this.tooltipElem.setAttribute('style', `position: fixed;
    max-width: 300px;
    padding: 10px 20px;
    border: 1px solid #b3c9ce;
    border-radius: 4px;
    text-align: center;
    color: #333;
    font-size: 12px;
    background: #fff;
    box-shadow: 0 0 3px rgba(0, 0, 0, .3);`)
    this.tooltipElem.innerHTML = tooltipHtml;
    document.body.append(this.tooltipElem);

    // спозиционируем его сверху от аннотируемого элемента (top-center)
    let coords = target?.getBoundingClientRect();

    let left = coords.left + (target?.offsetWidth - this.tooltipElem.offsetWidth) / 2;
    if (left < 0) left = 0; // не заезжать за левый край окна

    let top = coords.top - this.tooltipElem.offsetHeight - 5;
    if (top < 0) { // если подсказка не помещается сверху, то отображать её снизу
      top = coords.top + target?.offsetHeight + 5;
    }

    this.tooltipElem.style.left = left + 'px';
    this.tooltipElem.style.top = top + 'px';
  }

  removeTooltip(e: Event): void {
    if (this.tooltipElem) {
      this.tooltipElem.remove();
      this.tooltipElem.textContent = '';
    }
  }

  scroll(el: string): void {
    const e = document.querySelector(`#${el}`);
    e?.scrollIntoView({
      behavior: "smooth",
      inline: "nearest"
    });
  }

  condition_theme_interestInScience(name: string) {
    //names for select
    let names = ['Дания Зинатулина',
      'Галина Анатольевна Карамышева']
    return names.includes(name)
  }

  condition_theme_familyAndWork(name: string) {
    //names for select
    let names = ['Галина Анатольевна Карамышева',
      'Дания Зинатулина',
      'Ирина Титкова']
    return names.includes(name)
  }

  condition_theme_karamysheva(name: string) {
    let names = ['Галина Анатольевна Карамышева']
    return names.includes(name)
  }

  condition_theme_kravchenko(name: string) {
    let names = ['Елена Кравченко']
    return names.includes(name)
  }

  onClick() {
    const content = document.querySelector('.lead__text_collapsed');
    const button = document.querySelector('.read-more__button');
    content?.classList.toggle('lead__text_opened');
    button?.classList.toggle('read-more__button_opened');
  }

  // openCreators() {
  //   const content = document.querySelector('app-creators');
  //   content?.classList.toggle('app-creators_opened');
  // }

  trustUrl(url: string, startTime: string) {
    let start = '';
    if(startTime)
      start = "start=" + startTime + "&";
    let fullurl = "https://www.youtube.com/embed/" + url + "?" + start + "autoplay=1>";
    return this.sanitizer.bypassSecurityTrustResourceUrl(fullurl);
  }

  trustImgUrl(url: string) {
    let fullurl = "https://img.youtube.com/vi/" + url + "/maxresdefault.jpg";
    return this.sanitizer.bypassSecurityTrustResourceUrl(fullurl);
  }

  openDialog(heroine: Heroine): void {
    let url = this.trustUrl(heroine.interview, '')
    let urlCollegues = this.trustUrl(heroine.collegues, '');
    /* let imgsrc = this.trustImgUrl(heroine.youtube)
     let srcdoc = `<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%;cursor: pointer;
     }img{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{position:absolute;
       top: 50%;left: 50%;height: 100px;width: 100px;border-radius: 50%;display: flex;
       justify-content: center;align-items: center;font: 48px/1.5 sans-serif;color: white;
       background-color: #DD5061;transform: translate(-50%, -50%);margin: 0;}</style>
       <a [href]=${url}><img [src]=${imgurl} alt='Main project video'><span>▶</span></a>`*/

    const dialogRef = this.dialog.open(PersonalPageComponent, {
      // width: '100%',
      // maxWidth: '100%',
      panelClass: 'personal-page-panel',
      height: '100vh',
      autoFocus: false,
      data: { heroine: heroine, trusturl: url, urlCollegues: urlCollegues/*, imgsrc: imgsrc*/ },
    });
  }

  openVideo(heroine: Heroine, startTime: string): void {
    let url = this.trustUrl(heroine.youtube, startTime)

    const dialogRef = this.dialog.open(VideoPage, {
        width: '1200px',
      // // maxWidth: '100%',
      // // height: '100vh',
      //  height: '100%',
      data: { heroine: heroine, trusturl: url },
    });

    this.heroine = heroine;
  }

  /* openMenu():void{
     const dialogRef = this.dialog.open(MenuComponent, {
       backdropClass: 'menu__backdrop',
       panelClass: 'menu__panel',
       position: {
         top: '0px',
         left: '0px'
       }
     });
   }*/
}

// @Component({
//   selector: 'personal-page',
//   templateUrl: 'personal-page/personal-page.html',
//   styleUrls: ['personal-page/personal-page.css']
// })
// export class PersonalPage {

//   constructor(
//     public dialogRef: MatDialogRef<PersonalPage>,
//     @Inject(MAT_DIALOG_DATA) public data: DialogData
//   ) { }

//   onNoClick(): void {
//     this.dialogRef.close();
//   }

//   ngAfterViewInit() {
//     convertTexts();
//   }
// }

@Component({
  selector: 'video-page',
  templateUrl: 'video-page/video-page.html',
  styleUrls: ['video-page/video-page.css']
})
export class VideoPage {
  constructor(
    public dialogRef: MatDialogRef<VideoPage>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

const convertTexts = () => {
      //конвертируем тексты Героинь в html
      let texts = Array.from(document.querySelectorAll('p'));
      texts.forEach(text => {
        if (text.classList.contains('textForConverting'))
          text.innerHTML = text.innerText
      })

      let spans = Array.from(document.querySelectorAll('span'));
      spans.forEach(text => {
        if (text.classList.contains('textForConverting'))
          text.innerHTML = text.innerText
      })
}
