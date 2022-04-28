import { Target } from '@angular/compiler';
import { Directive, HostListener } from '@angular/core';
import { Scroll } from '@angular/router';

@Directive({
  selector: '[appScollprogress]'
})
export class ScollprogressDirective {

  constructor() { }

  @HostListener('window:scroll', ['$event'])
  scrolling(){
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;
    let progressBar = document.querySelector('.scrollBar__line');
    progressBar?.setAttribute('style',  'width:'+ scrolled + "%");
  }

}
