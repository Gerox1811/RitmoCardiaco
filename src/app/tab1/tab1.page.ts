import { Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { DatabaseService  } from '../services/database.service';
import * as firebase from 'firebase/app';
import 'firebase/database';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page implements OnInit {
  pulsacionesPorMinuto: number = 0;
  isPulsationLow: boolean = false;
  isPulsationHigh: boolean = false;

  constructor(private databaseService: DatabaseService) {}

  ngOnInit() {
   
  console.log('Initializing Tab1Page...');
    this.loadPulsacionesPorMinuto();

  }


  loadPulsacionesPorMinuto() {
    this.databaseService.getPulsacionesPorMinuto().subscribe((pulsaciones) => {
      this.pulsacionesPorMinuto = pulsaciones;
      console.log('Pulsaciones por minuto recibidas:', this.pulsacionesPorMinuto);
      this.checkPulsation();
  
    });
  }

  checkPulsation() {
    if (this.pulsacionesPorMinuto < 55) {
      this.isPulsationLow = true;
      this.isPulsationHigh = false;
    } else if (this.pulsacionesPorMinuto > 105) {
      this.isPulsationLow = false;
      this.isPulsationHigh = true;
    } else {
      this.isPulsationLow = false;
      this.isPulsationHigh = false;
    }
  }
  
  
}
