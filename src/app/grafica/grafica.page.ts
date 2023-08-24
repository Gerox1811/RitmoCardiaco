import { Component, OnInit, Input} from '@angular/core';
import { Observable } from 'rxjs';
import { DatabaseService  } from '../services/database.service';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.page.html',
  styleUrls: ['./grafica.page.scss'],
})
export class GraficaPage implements OnInit {
  pulsacionesPorMinuto: number = 0;
  valorCorazon: number = 150;
  maxPulsaciones: number = 150; 
  categoriaPulso: string = "";

  private readonly minPositionY = 100; // Posición vertical mínima
  private readonly maxPositionY = 300; // Posición vertical máxima

  pulsationState: 'low' | 'normal' | 'high' = 'normal';

  pulsosCategorias = [
    { nombre: 'Pulso Bajo', min: 30, max: 60 },
    { nombre: 'Pulso Normal', min: 61, max: 90 },
    { nombre: 'Pulso Alto', min: 91, max: 110 },
    { nombre: 'Pulso Muy Alto', min: 111, max: Infinity },
  ];

  pulsosContados: number[] = [0, 0, 0, 0];

  constructor(
    private databaseService: DatabaseService
  ) {}

  ngOnInit() {
   
  console.log('Initializing Tab1Page...');
    this.loadPulsacionesPorMinuto();
   

  }

  ngOnDestroy() {
    // Detener la animación al salir del componente
    
  }

  loadPulsacionesPorMinuto() {
    this.databaseService.getPulsacionesPorMinuto().subscribe((pulsaciones) => {
      this.pulsacionesPorMinuto = pulsaciones;
      this.contarPulsaciones();
    });
  }

  contarPulsaciones() {
    // No reiniciar los contadores aquí
    for (let i = 0; i < this.pulsosCategorias.length; i++) {
      const categoria = this.pulsosCategorias[i];
      if (this.pulsacionesPorMinuto >= categoria.min && this.pulsacionesPorMinuto <= categoria.max) {
        this.pulsosContados[i]++;
        break;
      }
    }
  }

  get totalPulsaciones(): number {
    return this.pulsacionesPorMinuto; // Aquí puedes poner la cantidad total de pulsaciones
  }
 
  
}
  
  
  
  


  
  
  
  
  
  
  






