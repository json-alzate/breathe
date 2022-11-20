import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-breathe',
  templateUrl: './breathe.component.html',
  styleUrls: ['./breathe.component.scss'],
})
export class BreatheComponent implements OnInit {

  classSlide = 'slide-one-up';

  status = 'in' || 'out' || 'hold';
  text = 'Breathe In!';

  totalTime = 7500;
  breatheTime = (this.totalTime / 5) * 2;
  holdTime = this.totalTime / 5;
  constructor() { }

  ngOnInit() {

    setInterval(this.breathAnimation(), this.totalTime);
  }



  breathAnimation();

  breathAnimation() {
    this.text = 'Breathe In!';
    this.status = 'in';

    setTimeout(() => {
      this.text = 'Hold';

      setTimeout(() => {
        this.text = 'Breathe Out!';
        this.status = 'out';
      }, this.holdTime);
    }, this.breatheTime);
  }



}
