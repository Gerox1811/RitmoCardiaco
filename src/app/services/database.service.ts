import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';



@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  ritmoCardiacoRef: AngularFireObject<number>;
  constructor(private db: AngularFireDatabase) {
    this.ritmoCardiacoRef = this.db.object('ritmo_cardiaco');
  }

  getPulsacionesPorMinuto(): Observable<number> {
    console.log('Fetching pulsaciones por minuto from Firebase Realtime Database...');
    return this.ritmoCardiacoRef.valueChanges().pipe(
      map(pulsaciones => pulsaciones || 0) // Filtrar para eliminar los valores nulos
    );
  }
  
  getDatosFueraDeRango(): Observable<any[]> {
    const datosFueraDeRangoRef = this.db.list('datosFueraDeRango');
    return datosFueraDeRangoRef.valueChanges();
  }
  

  
}
