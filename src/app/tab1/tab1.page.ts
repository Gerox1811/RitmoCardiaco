import { Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { DatabaseService  } from '../services/database.service';
import * as firebase from 'firebase/app';
import { AlertController } from '@ionic/angular';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page implements OnInit {
  pulsacionesPorMinuto: number = 0;
  pulsationState: 'low' | 'normal' | 'high' = 'normal';

  constructor(
    private databaseService: DatabaseService,
    private alertController: AlertController
  ) {}

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
      this.mostrarAlertaBajo(); // Mostrar alerta
    } else if (this.pulsacionesPorMinuto > 100) {
      this.pulsationState = 'high';
      this.mostrarAlertaAlto(); // Mostrar alerta
    } else {
      this.pulsationState = 'normal';
    }
  }

  async mostrarAlertaBajo() {
    const alert = await this.alertController.create({
      header: '¡Cuidado!',
      message: 'Tu pulso está demasiado bajo. Ten cuidado.',
      buttons: ['Aceptar'],
      cssClass: 'custom-alert'
    });
  
    await alert.present();
  }
  
  async mostrarAlertaAlto() {
    const alert = await this.alertController.create({
      header: '¡Cuidado!',
      message: 'Tu pulso está demasiado alto. Ten cuidado.',
      buttons: ['Aceptar'],
      cssClass: 'custom-alert'
    });
  
    await alert.present();
  }
  
}
