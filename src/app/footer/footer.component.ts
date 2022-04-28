import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {


    let btn = document.querySelector(".footer__to-top");
    let btnToCLick = document.querySelector(".footer__button-to-click");
    window.addEventListener('scroll', function () {
      if (scrollY > window.innerHeight / 2) {
        btn?.classList.add('d-flex');
      } else {
        btn?.classList.remove('d-flex');
      }
    });

    btnToCLick?.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      })
    });
  }
}
