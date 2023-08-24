import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {
  datosFueraDeRango: any[] = [];
  pageLoadTime: number = new Date().getTime();
  showWelcomeMessage = true;

  constructor(private databaseService: DatabaseService) { }

  ngOnInit() {
    this.loadDatosFueraDeRango();
  }

  loadDatosFueraDeRango() {
    this.databaseService.getDatosFueraDeRango().subscribe((datos) => {
      // Ordenar los datos por hora en orden descendente
      this.datosFueraDeRango = datos.sort((a, b) => b.tiempo_referencia - a.tiempo_referencia);
      console.log('Datos fuera de rango ordenados:', this.datosFueraDeRango);
    });
  }

  calculateTimeDifference(timestamp: number) {
    const currentTime = new Date().getTime();
    const deltaTime = currentTime - timestamp;
  
    if (deltaTime < 10000) { // Menos de 10 segundos
      return "Se actualizó hace unos segundos";
    } else if (deltaTime < 60000) { // Menos de 1 minuto
      const seconds = Math.floor(deltaTime / 1000);
      return `Se actualizó hace ${seconds} segundos`;
    } else if (deltaTime < 3600000) { // Menos de 1 hora
      const minutes = Math.floor(deltaTime / 60000);
      return `Se actualizó hace ${minutes} minuto${minutes !== 1 ? 's' : ''}`;
    } else {
      // Implementa el cálculo para otros rangos de tiempo si lo deseas
      return "";
    }
  }


  

  borrarRegistros() {
    // Llamar al servicio para eliminar los registros
    this.databaseService.borrarRegistros().then(() => {
      // Actualizar la lista de datos
      this.loadDatosFueraDeRango();
    }).catch((error) => {
      console.error('Error al borrar registros:', error);
    });
  }

  closeWelcomeMessage() {
    this.showWelcomeMessage = false;
  }
}

