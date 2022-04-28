import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { OverlayModule } from '@angular/cdk/overlay';
import { VideoComponent } from './video/video.component';
import { VideoPage } from './app.component';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { FooterComponent } from './footer/footer.component';
import { MatMenuModule } from '@angular/material/menu';
import { MenuComponent } from './menu/menu.component';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CreatorsComponent } from './creators/creators.component';
import { PhotogalleryComponent } from './photogallery/photogallery.component';
import { PhotoComponent } from './photo/photo.component';
import { ScollprogressDirective } from './directives/scollprogress.directive';
import { PersonalPageComponent } from './personal-page/personal-page.component';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web/build/player/lottie_light';

const routes: Routes = [
  // { path: 'about', component: AboutComponent },
  // { path: 'footer', component: FooterComponent },
]

export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [
    AppComponent,
    VideoComponent,
    VideoPage,
    FooterComponent,
    MenuComponent,
    AboutComponent,
    CreatorsComponent,
    PhotogalleryComponent,
    PhotoComponent,
    ScollprogressDirective,
    PersonalPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatDialogModule,
    MatNativeDateModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    OverlayModule,
    IvyCarouselModule,
    MatMenuModule,
    MatToolbarModule,
    MatTooltipModule,
    LottieModule.forRoot({ player: playerFactory }),
    RouterModule.forRoot(routes, {
      // useHash: true,
      anchorScrolling: 'enabled',
      //  scrollPositionRestoration: 'top',
      onSameUrlNavigation: 'reload',
      scrollOffset: [0, 80] // [x, y]
    }),
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
