import { Component, OnInit, NgZone } from '@angular/core';
import { AnimationItem, LottiePlayer } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  animationPie?: AnimationItem;
  animationScale?: AnimationItem;
  constructor(public ngZone: NgZone) { }

  options: AnimationOptions = {
    path: './assets/video/scale.json',
  };

  options2: AnimationOptions = {
    path: './assets/video/pie.json',
  };



  animationCreatedPie(animationItem: AnimationItem): void {
    this.animationPie = animationItem;
  }
  animationCreatedScale(animationItem: AnimationItem): void {
    this.animationScale = animationItem;
  }
  public stopPieVideo = () => {
    this.ngZone.runOutsideAngular(() => {
      this.animationPie?.stop();
    });
  }

  stopScaleVideo = () => {
    this.ngZone.runOutsideAngular(() => {
      this.animationScale?.stop();
    });
  }

  ngOnInit(): void {

    const stopPieVideo = () => {
      this.ngZone.runOutsideAngular(() => {
        this.animationPie?.stop();
      });
    }

    const playPieVideo = () => {
      this.ngZone.runOutsideAngular(() => {
        this.animationPie?.play();
      });
    }

    const stopScaleVideo = () => {
      this.ngZone.runOutsideAngular(() => {
        this.animationScale?.stop();
      });
    }

    const playScaleVideo = () => {
      this.ngZone.runOutsideAngular(() => {
        this.animationScale?.play();
      });
    }

    const pieVideo = document.querySelector('.about__statistic-video_pie') as HTMLVideoElement;
    const scaleVideo = document.querySelector('.about__statistic-video_scale') as HTMLVideoElement;
    let topPieVideo: number
    let bottomPieVideo: number
    let topScaleVideo: number
    let bottomScaleVideo: number

    const checkPos = function () {
      let rectPie = pieVideo.getBoundingClientRect();
      let rectVideo = scaleVideo.getBoundingClientRect();
      topPieVideo = rectPie.top + window.pageYOffset;
      bottomPieVideo = rectPie.bottom + window.pageYOffset;
      topScaleVideo = rectVideo.top + window.pageYOffset;
      bottomScaleVideo = rectVideo.bottom + window.pageYOffset;
      requestAnimationFrame(checkPos)
    }

    checkPos();

    const scrollHandler = function () {
      let min = window.scrollY;
      let max = min + window.innerHeight;

      if (topPieVideo >= min && topPieVideo < max) { playPieVideo(); }
      if (bottomPieVideo <= min || topPieVideo >= max) { stopPieVideo(); }
      if (topScaleVideo >= min && topScaleVideo < max) { playScaleVideo(); }
      if (bottomScaleVideo <= min || topScaleVideo >= max) { stopScaleVideo(); }

    }



    window.addEventListener('scroll', scrollHandler, true);
    window.addEventListener('resize', checkPos);
  }

}
