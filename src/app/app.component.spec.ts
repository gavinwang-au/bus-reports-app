import { TestBed, async } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BusRouteComponent } from './components/bus-route.component';
import { BusRouteService } from './services/bus-route.service';
import {MatButtonModule, MatCardModule, MatExpansionModule, MatInputModule, MatTableModule} from '@angular/material';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        MatExpansionModule,
        MatCardModule,
        MatTableModule
      ],
      declarations: [
        AppComponent,
        BusRouteComponent
      ],
      providers: [
        BusRouteService
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });


});
