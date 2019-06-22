import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatExpansionModule, MatInputModule, MatTableModule } from '@angular/material';
import { BusRouteComponent } from './bus-route.component';
import { HttpClientModule } from '@angular/common/http';
import { BusRouteService } from '../services/bus-route.service';

describe('BusRouteComponent', () => {
  let component: BusRouteComponent;
  let fixture: ComponentFixture<BusRouteComponent>;

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

  it('should bus route component be created', () => {
    expect(component).toBeTruthy();
  });

  it('should bus route accordions be loaded', () => {
    component.ngOnInit();
    fixture.detectChanges();

  });

  it('should bus route accordions be closed on page init', () => {
    component.ngOnInit();
    fixture.detectChanges();

  });

  it('should bus route table be loaded', () => {
    component.ngOnInit();
    fixture.detectChanges();

  });

  it('should bus route comments input be created', () => {
    component.ngOnInit();
    fixture.detectChanges();

  });

  it('should save notes button be disabled when comments input is empty', () => {
    component.ngOnInit();
    fixture.detectChanges();

  });

  it('should save notes button be enabled when comments input is not empty', () => {
    component.ngOnInit();
    fixture.detectChanges();

  });

});
