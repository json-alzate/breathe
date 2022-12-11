import { Component } from '@angular/core';

import { IonicSlides, NavController, ActionSheetController } from '@ionic/angular';

import SwiperCore, { Pagination } from 'swiper';
SwiperCore.use([Pagination, IonicSlides]);

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  timer = 2;
  private slides: any;

  constructor(
    private navCtrl: NavController,
    private actionSheetController: ActionSheetController
  ) { }

  setSwiperInstance(swiper: any) {
    this.slides = swiper;
  }



  /**
   * Permite seleccionar el tiempo de la rutina de respiración 2 minutos, 5 minutos, 10 minutos
   * y al seleccionar un tiempo, navega a la rutina de respiración
   */
  async selectTimer() {
    const actionSheet = await this.actionSheetController.create({
      mode: 'ios',
      cssClass: 'action-sheet-timer',
      buttons: [
        {
          text: '2 minutos',
          handler: () => {
            this.timer = 2;
          }
        },
        {
          text: '5 minutos',
          handler: () => {
            this.timer = 5;
          }
        },
        {
          text: '10 minutos',
          handler: () => {
            this.timer = 10;
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    await actionSheet.present();
  }




  goToBreathe() {
    this.navCtrl.navigateForward('/home/breathe/0' + '/' + this.timer);
  }

}
