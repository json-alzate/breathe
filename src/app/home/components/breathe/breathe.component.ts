import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';

@Component({
  selector: 'app-breathe',
  templateUrl: './breathe.component.html',
  styleUrls: ['./breathe.component.scss'],
})
export class BreatheComponent implements OnInit {

  // descripción del id para la rutina de respiración
  /*
  * 0: 4-6
  * */


  classBreathe = '';
  classBreatheBackground = '';
  status: 'exhale' | 'inhale' | 'hold' = 'inhale';

  // se utiliza para saber cuanto tiempo le queda al estado actual de la respiración
  // util para cuando se pause por ejemplo
  counterInterval = 0;
  // el indice que indica el estado actual de la respiración en el ciclo
  cicleIndex = 0;
  cicle: number[] = [];
  cicleStatus: string[] = [];

  intervalObject: any;


  constructor(
    private activatedRoute: ActivatedRoute,
  ) {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    switch (id) {
      case '0':
        this.classBreathe = 'breathe-4-6';
        this.classBreatheBackground = 'breathe-4-6-background';
        this.cicle = [4, 6];
        this.cicleStatus = ['inhale', 'exhale'];
        this.startBreathe();
        break;
    }

  }

  ngOnInit() {

  }


  startBreathe() {
    const cicleSeconds = this.cicle[this.cicleIndex];
    this.counterInterval = cicleSeconds;
    this.status = this.cicleStatus[this.cicleIndex] as any;

    this.intervalObject = setInterval(() => {
      this.counterInterval--;
      console.log(this.counterInterval);

      if (this.counterInterval === 0) {
        this.nextStep();
      }
    }
      , 1000);

  }


  nextStep() {

    // clear interval
    clearInterval(this.intervalObject);

    this.cicleIndex++;
    if (this.cicleIndex === this.cicle.length) {
      this.cicleIndex = 0;
    }

    this.startBreathe();
  }






}
