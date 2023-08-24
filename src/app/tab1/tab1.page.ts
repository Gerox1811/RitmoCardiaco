import { Component, OnInit, Input} from '@angular/core';
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
  @Input() valorCorazon: number = 80;
  pulsationState: 'low' | 'normal' | 'high' = 'normal';

  constructor(
    private databaseService: DatabaseService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
   
  console.log('Initializing Tab1Page...');
    this.loadPulsacionesPorMinuto();

    const welcomeMessageShown = localStorage.getItem('welcomeMessageShown');

    
  if (!welcomeMessageShown) {
    this.mostrarMensajeBienvenida();
    localStorage.setItem('welcomeMessageShown', 'true');
  }
  }

  loadPulsacionesPorMinuto() {
    this.databaseService.getPulsacionesPorMinuto().subscribe((pulsaciones) => {
      this.pulsacionesPorMinuto = pulsaciones;
      
      console.log('Pulsaciones por minuto recibidas:', this.pulsacionesPorMinuto);
      this.checkPulsation();
      this.updateValorCorazon();
    });
  }

  updateValorCorazon() {
    const minPulsaciones = 40; // Mínimo valor de pulsaciones
    const maxPulsaciones = 120; // Máximo valor de pulsaciones
    const minPosition = 10; // Posición vertical mínima
    const maxPosition = 200; // Posición vertical máxima
    const positionRange = maxPosition - minPosition;
    
    // Calcula la posición vertical del corazón en función de las pulsaciones
    const position = minPosition + ((this.pulsacionesPorMinuto - minPulsaciones) / (maxPulsaciones - minPulsaciones)) * positionRange;
  
    // Limita la posición para asegurarte de que esté dentro de los límites
    this.valorCorazon = Math.max(minPosition, Math.min(maxPosition, position));
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
  async mostrarMensajeBienvenida() {
    const alert = await this.alertController.create({
      header: '¡Bienvenido!',
      message: 'Bienvenido a RicarDio, una aplicación para medir el ritmo cardiaco de manera rápida. Solo colócate nuestra camisa medidora y estarás viendo tu Ritmo Cardiaco en pantalla. ¿Deseas conocer más detalles? Presiona el botón (?)',
      buttons: [
        {
          text: 'Siguiente',
          handler: () => {
            this.mostrarMensajePantallaPrincipal();
          }
        }
      ]
    });
  
    await alert.present();
  }
  
  async mostrarMensajePantallaPrincipal() {
    const alert = await this.alertController.create({
      header: 'Pantalla Principal',
      message: 'En la pantalla principal, podrás ver el ritmo cardiaco en tiempo real. 1.El valor del Ritmo Cardiaco cambiará conforme lo detecte nuestro sensor. 2.Además, contarás con una imagen que se ajustará según tu Ritmo Cardiaco, siendo la imagen de la cama la representación del ritmo más bajo y la imagen de ejercicio la más alta. 3.También tendrás un mensaje que te indicará si tus latidos están normales o sufren un cambio repentino. Finalmente, cuando alcances el Ritmo Cardiaco mínimo o máximo, aparecerán alertas en pantalla para que puedas tomar un respiro.',
      buttons: ['Entendido']
    });
  
    await alert.present();
  }

}
