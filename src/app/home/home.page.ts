import { Component } from '@angular/core';
import SwiperCore, { Pagination } from 'swiper';
import { IonicSlides } from '@ionic/angular';
SwiperCore.use([Pagination, IonicSlides]);

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private slides: any;

  constructor() { }

  setSwiperInstance(swiper: any) {
    this.slides = swiper;
  }
}
