import { Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { DatabaseService  } from '../services/database.service';
import * as firebase from 'firebase/app';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page implements OnInit {
  pulsacionesPorMinuto: number = 0;
  pulsationState: 'low' | 'normal' | 'high' = 'normal';

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
    
    if (this.pulsacionesPorMinuto < 60) {
      this.pulsationState = 'low';
      console.log('Pulsación baja');
    } else if (this.pulsacionesPorMinuto > 100) {
      this.pulsationState = 'high';
      console.log('Pulsación alta');
    } else {
      this.pulsationState = 'normal';
      console.log('Pulsación normal');
    }
  }

  
  
}
