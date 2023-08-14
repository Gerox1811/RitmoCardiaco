import { Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { DatabaseService  } from '../services/database.service';
import * as firebase from 'firebase/app';
import 'firebase/database';
import { Chart } from 'chart.js/auto';
import { CalendarService } from '../services/calendar.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page implements OnInit {
  pulsacionesPorMinuto: number = 0;
  chart: any;

  constructor(private databaseService: DatabaseService,private calendarService: CalendarService) {}

  ngOnInit() {
   
  console.log('Initializing Tab1Page...');
    this.loadPulsacionesPorMinuto();
    this.createChart();

  }


  loadPulsacionesPorMinuto() {
    this.databaseService.getPulsacionesPorMinuto().subscribe((pulsaciones) => {
      this.pulsacionesPorMinuto = pulsaciones;
      console.log('Pulsaciones por minuto recibidas:', this.pulsacionesPorMinuto);
      const newEvent = {
        title: 'Ritmo Cardíaco',
        date: new Date(),
        description: `Pulsaciones: ${this.pulsacionesPorMinuto}`
      };
      this.calendarService.addEvent(newEvent);
    });
  }



createChart() {
    this.chart = new Chart('heartRateChart', {
      type: 'doughnut', // Puedes ajustar el tipo de gráfico
      data: {
        labels: ['Latidos'],
        datasets: [
          {
            data: [this.pulsacionesPorMinuto],
            backgroundColor: ['rgba(255, 99, 132, 0.6)'], // Color del medidor
            borderWidth: 0
          }
        ]
      },

      options: {
        cutout: 85, // Espacio en blanco en el centro del medidor
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }

   /* console.log('Fetching items from Firebase Realtime Database...');
    const limitToLast = 1; // Puedes ajustar este valor según tus necesidades
    //this.items = this.databaseService.getItems(limitToLast);
    this.databaseService.getItems(limitToLast).subscribe((items) => {
      console.log('Items received:', items);
      this.items = items;
      console.log('Pulsaciones por minuto recibidas:', this.items);
      this.updatePulsacionesPorMinuto();
    });
    }
  
    updatePulsacionesPorMinuto() {
      if (this.items.length > 0) {
        this.pulsacionesPorMinuto = this.items[0]?.pulsacionesPorMinuto || 0;
      }
      console.log('Valor de pulsacionesPorMinuto:', this.pulsacionesPorMinuto);
    }*/

  
/*export class Tab1Page implements OnInit {
  items$: Observable<any[]> | null = null;

  constructor(private firebaseService: DatabaseService) {}
   // this.items$ = this.db.list('ritmo_cardiaco').valueChanges();

   ngOnInit() {
    this.getItems();
   }

   getItems() {
    const limitToLast = 10; // Obtener los últimos 10 valores
    this.items$ = this.firebaseService.getItems(limitToLast);
  }

  formatTime(timestamp: any): string {
    const date = new Date(timestamp);
    return date.toLocaleString(); 
  }
*/
  //leerMediciones(){
  //  const path = 'ritmo_cardiaco/';
  //  this.database.list(path).valueChanges().subscribe( res =>{
  //    console.log('Ritmo Crdiaco->', res);
  //  })
  //

}
