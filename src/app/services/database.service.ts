import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';
import { map } from 'rxjs/operators';
import { AngularFireList } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  ritmoCardiacoRef: AngularFireObject<number>;
  datosFueraDeRangoRef: AngularFireList<any>;

  constructor(private db: AngularFireDatabase) {
    this.ritmoCardiacoRef = this.db.object('ritmo_cardiaco');
    this.datosFueraDeRangoRef = this.db.list('/datosFueraDeRango', ref => ref.orderByChild('hora').limitToLast(10)); // Limit to last 10 records
  }

  getPulsacionesPorMinuto(): Observable<number> {
    console.log('Fetching pulsaciones por minuto from Firebase Realtime Database...');
    return this.ritmoCardiacoRef.valueChanges().pipe(
      map(pulsaciones => pulsaciones || 0) // Filtrar para eliminar los valores nulos
    );
  }
  
  getDatosFueraDeRango(): Observable<any[]> {
    return this.datosFueraDeRangoRef.valueChanges().pipe(
      map(datos => {
        return datos.map(dato => ({
          ...dato,
          tiempo_referencia: new Date(dato.tiempo_referencia) // Convertir tiempo_referencia a objeto Date
        }));
      })
    );
  }
  
  borrarRegistros(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const datosFueraDeRangoRef = this.db.list('/datosFueraDeRango');
      datosFueraDeRangoRef.remove()
        .then(() => {
          console.log('Registros borrados exitosamente');
          resolve();
        })
        .catch((error) => {
          console.error('Error al borrar registros:', error);
          reject(error);
        });
    });
  }

  
}
