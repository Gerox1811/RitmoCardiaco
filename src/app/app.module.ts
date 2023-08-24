import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { CalendarModule, DateAdapter  } from 'angular-calendar';
import { CommonModule } from '@angular/common'; 
import { DateFnsModule } from 'ngx-date-fns';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';



@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    CommonModule,
    CalendarModule.forRoot({
      provide: DateAdapter, // Proporciona el adaptador de fecha
      useFactory: adapterFactory, // Utiliza el adaptador de fecha de Date-Fns
    }),
    DateFnsModule.forRoot(),
  
    

  ],
  providers: 
  [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },

  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
