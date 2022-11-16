import { Component } from '@angular/core';

import { IonicSlides, NavController } from '@ionic/angular';

import SwiperCore, { Pagination } from 'swiper';
SwiperCore.use([Pagination, IonicSlides]);

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private slides: any;

  constructor(
    private navCtrl: NavController,
  ) { }

  setSwiperInstance(swiper: any) {
    this.slides = swiper;
  }

  openSelectTimer() {

  }

  goToBreathe() {
    this.navCtrl.navigateForward('/home/breathe');
  }

}
