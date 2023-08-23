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
      // Ordenar los datos por hora en orden descendente
      this.datosFueraDeRango = datos.sort((a, b) => b.hora.localeCompare(a.hora));
      console.log('Datos fuera de rango:', this.datosFueraDeRango);
    });
  }

  formatTime(secondsAgo: number) {
    return secondsAgo.toString().replace(/^0+/, ''); // Eliminar ceros al principio
  }
  
}
