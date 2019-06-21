import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusRouteComponent } from './bus-route.component';
import { HttpClientModule } from '@angular/common/http';
import { BusRouteService } from '../services/bus-route.service';

describe('BusRouteComponent', () => {
  let component: BusRouteComponent;
  let fixture: ComponentFixture<BusRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      declarations: [ BusRouteComponent ],
      providers: [
        BusRouteService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
