import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { interval } from 'rxjs';

import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-breathe',
  templateUrl: './breathe.component.html',
  styleUrls: ['./breathe.component.scss'],
})
export class BreatheComponent implements OnInit {

  title = 'Respiración';
  timer = '00:00';
  timeRemaining = 0;

  // descripción del id para la rutina de respiración
  /*
  * 0: 4-6
  * */


  classBreathe = '';
  classBreatheBackground = '';
  status: 'exhale' | 'inhale' | 'hold' = 'inhale';
  cicleSeconds = 0;
  statusPlayer: 'play' | 'pause' = 'play';

  // se utiliza para saber cuanto tiempo le queda al estado actual de la respiración
  // util para cuando se pause por ejemplo
  counterInterval = 0;
  // el indice que indica el estado actual de la respiración en el ciclo
  cicleIndex = 0;
  cicle: number[] = [];
  cicleStatus: string[] = [];

  intervalObject: any;
  timerInterval: any;


  constructor(
    private activatedRoute: ActivatedRoute,
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private navController: NavController
  ) {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    const timer = this.activatedRoute.snapshot.paramMap.get('timer');
    // se calcula el tiempo restante en segundos
    this.timeRemaining = parseInt(timer, 10) * 60;
    this.timer = this.getTimer();

    // se inicia el timer
    this.startTimer();

    switch (id) {
      case '0':
        this.title = 'Relajación';
        this.classBreathe = 'breathe-4-6';
        this.classBreatheBackground = 'breathe-4-6-background';
        this.cicle = [4, 6];
        this.cicleStatus = ['inhale', 'exhale'];
        this.status = this.cicleStatus[this.cicleIndex] as any;
        this.startBreathe();
        break;
    }

  }

  ngOnInit() {
  }




  startBreathe(isResume?: boolean) {

    if (!isResume) {
      this.cicleSeconds = this.cicle[this.cicleIndex];
      // modifica la velocidad de la animación para que coincida con el tiempo del estado actual
      this.setTimingAnimation(this.cicleSeconds);
      this.counterInterval = this.cicleSeconds * 10;
    } else {
      this.resumeAnimation();
      this.counterInterval--;
    }

    this.intervalObject = setInterval(() => {
      this.counterInterval--;
      console.log(this.counterInterval);
      if (this.counterInterval <= 0) {
        this.nextStep();
      }
    }, 100);

  }


  // al reanudar
  onResume() {
    console.log('resume ', this.counterInterval);
    this.statusPlayer = 'play';
    this.startBreathe(true);
    this.startTimer();
  }



  // pasa al siguiente estado de la respiración
  nextStep() {
    // clear interval
    if (this.intervalObject) {
      clearInterval(this.intervalObject);
    }

    this.cicleIndex++;
    if (this.cicleIndex === this.cicle.length) {
      this.cicleIndex = 0;
    }
    this.status = this.cicleStatus[this.cicleIndex] as any;
    console.log('status', this.status);

    this.startBreathe();
  }

  // Cambia la velocidad de la animación
  setTimingAnimation(seconds: number) {
    const rootElement = this.elementRef.nativeElement;
    this.renderer.setAttribute(rootElement, 'style', '--timing: ' + seconds + 's;');
  }



  // timer
  // se calcula el tiempo restante en minutos y segundos
  getTimer() {
    const minutes = Math.floor(this.timeRemaining / 60);
    const seconds = this.timeRemaining - minutes * 60;
    return minutes + ':' + seconds;
  }

  // se construye el timer en base al tiempo restante
  startTimer() {
    this.timerInterval = setInterval(() => {
      this.timeRemaining--;
      this.timer = this.getTimer();

      if (this.timeRemaining === 0) {
        console.log('termino');
      }
    }, 1000);
  }

  // al pausar
  onPuase() {
    console.log('pause ', this.counterInterval);
    this.statusPlayer = 'pause';
    clearInterval(this.intervalObject);
    clearInterval(this.timerInterval);
    this.pauseAnimation();
  }



  pauseAnimation() {
    // se adiciona la clase para que se detenga la animación
    const element = this.elementRef.nativeElement.querySelector('.pointer-breathe-container');
    if (element) {
      element.style.animationPlayState = 'paused';
    }

    const element2 = this.elementRef.nativeElement.querySelector('.breathe-animation.breathe-in');
    if (element2) {
      element2.style.animationPlayState = 'paused';
    }
    const element3 = this.elementRef.nativeElement.querySelector('.breathe-animation.breathe-out');
    if (element3) {
      element3.style.animationPlayState = 'paused';
    }
  }



  resumeAnimation() {

    const element2 = this.elementRef.nativeElement.querySelector('.breathe-animation.breathe-in');
    if (element2) {
      element2.style.animationPlayState = 'running';
    }
    const element3 = this.elementRef.nativeElement.querySelector('.breathe-animation.breathe-out');
    if (element3) {
      element3.style.animationPlayState = 'running';
    }

    const element = this.elementRef.nativeElement.querySelector('.pointer-breathe-container');
    // this.renderer.removeClass(element, 'pause-animation');
    if (element) {
      element.style.animationPlayState = 'running';
    }

  }


  // cierra la rutina de respiración y cancela el intervalo
  close() {
    clearInterval(this.intervalObject);
    this.navController.navigateBack('/home');
  }


}
