import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import {
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatExpansionModule,
  MatTableModule
} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { BusRouteComponent } from './components/bus-route.component';
import { BusRouteService } from './services/bus-route.service';

@NgModule({
  declarations: [
    AppComponent,
    BusRouteComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatExpansionModule,
    MatCardModule,
    MatTableModule
  ],
  providers: [
    BusRouteService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
