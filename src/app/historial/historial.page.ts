import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {
  datosFueraDeRango: any[] = [];


  constructor(private databaseService: DatabaseService) { }


  ngOnInit() {
    this.loadDatosFueraDeRango();
  }

  loadDatosFueraDeRango() {
    this.databaseService.getDatosFueraDeRango().subscribe((datos) => {
      this.datosFueraDeRango = datos;
      console.log('Datos fuera de rango:', this.datosFueraDeRango);
    });
  }

  calculateTimeDifference(timestamp: any) {
    if (timestamp instanceof Date) {
      const currentTime = new Date();
      const differenceInSeconds = Math.floor((currentTime.getTime() - timestamp.getTime()) / 1000);
  
      if (differenceInSeconds < 60) {
        return `Actualizado hace ${differenceInSeconds} segundos`;
      } else if (differenceInSeconds < 3600) {
        const minutes = Math.floor(differenceInSeconds / 60);
        return `Actualizado hace ${minutes} minutos`;
      } else {
        const hours = Math.floor(differenceInSeconds / 3600);
        return `Actualizado hace ${hours} horas`;
      }
    } else {
      return "Marca de tiempo no válida";
    }
  }
}
