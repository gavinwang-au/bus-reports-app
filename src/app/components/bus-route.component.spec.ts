import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatButtonModule, MatCardModule, MatExpansionModule, MatInputModule, MatTableModule } from '@angular/material';
import { BusRouteComponent } from './bus-route.component';
import { HttpClientModule } from '@angular/common/http';
import { BusRouteService } from '../services/bus-route.service';
import { MockBusRouteService } from '../services/bus-route.services.mock';
import { DebugElement} from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {BusStatus} from '../models/bus-route.model';


describe('BusRouteComponent', () => {
  let component: BusRouteComponent;
  let fixture: ComponentFixture<BusRouteComponent>;
  let nativeElement: HTMLElement;
  let debugElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        MatInputModule,
        MatButtonModule,
        MatExpansionModule,
        MatCardModule,
        MatTableModule
      ],
      declarations: [ BusRouteComponent ],
      providers: [
        {provide: BusRouteService, useClass: MockBusRouteService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusRouteComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    nativeElement = debugElement.nativeElement;

    fixture.detectChanges();
  });

  it('should bus route component be created', () => {
    expect(component).toBeDefined();
  });

  it('should display bus report title', () => {
    component.ngOnInit();
    fixture.detectChanges();

    const title: DebugElement = debugElement.query(By.css('mat-card-title'));
    expect(title.nativeElement.textContent).toContain('Bus Report');
  });

  it('should bus route accordions be loaded', () => {
    component.ngOnInit();
    fixture.detectChanges();

    const accordion: DebugElement = debugElement.query(By.css('#mat-accordion-0'));
    expect(accordion).toBeTruthy();
  });

  it('should bus route accordions be closed on page init', () => {
    component.ngOnInit();
    fixture.detectChanges();

    const accordionPanel: DebugElement = debugElement.query(By.css('#mat-accordion-0 mat-expansion-panel div.mat-expansion-panel-content'));
    expect(accordionPanel.nativeElement.style.visibility).toBe('');
  });

  it('should bus route accordions be open when user click it', () => {
    component.ngOnInit();
    fixture.detectChanges();

    const accordion: DebugElement = debugElement.query(By.css('#mat-accordion-0'));
    expect(accordion).toBeTruthy();

    accordion.nativeElement.click();
    fixture.detectChanges();

    const accordionPanel: DebugElement = debugElement.query(By.css('#mat-accordion-0 mat-expansion-panel div.mat-expansion-panel-content'));
    expect(accordionPanel.nativeElement.style.visibility).toBe('');

  });

  it('should bus route table be loaded', () => {
    component.ngOnInit();
    fixture.detectChanges();

    const accordion: DebugElement = debugElement.query(By.css('#mat-accordion-0'));
    expect(accordion).toBeTruthy();

    accordion.nativeElement.click();
    fixture.detectChanges();

    const matTable: DebugElement = debugElement.query(By.css('#mat-accordion-0 div.table-wrapper .mat-table'));
    expect(matTable).toBeTruthy();
  });

  it('should status color be green for ontime', () => {
    component.ngOnInit();
    fixture.detectChanges();

    const deviationFromTimetable1 = 0;
    const status1: BusStatus = component.getBusStatus(deviationFromTimetable1);
    expect(status1.text).toBe('ontime');
    expect(status1.color).toBe('green');

    const deviationFromTimetable2 = 10;
    const status2: BusStatus = component.getBusStatus(deviationFromTimetable2);
    expect(status2.text).toBe('ontime');
    expect(status2.color).toBe('green');
  });

  it('should status color be purple for late', () => {
    component.ngOnInit();
    fixture.detectChanges();

    const deviationFromTimetable = 177;
    const status: BusStatus = component.getBusStatus(deviationFromTimetable);
    expect(status.text).toBe('late');
    expect(status.color).toBe('purple');
  });

  it('should status color be red for unknown', () => {
    component.ngOnInit();
    fixture.detectChanges();

    const deviationFromTimetable1 = null;
    const status1: BusStatus = component.getBusStatus(deviationFromTimetable1);
    expect(status1.text).toBe('unknown');
    expect(status1.color).toBe('red');

    const deviationFromTimetable2 = undefined;
    const status2: BusStatus = component.getBusStatus(deviationFromTimetable2);
    expect(status2.text).toBe('unknown');
    expect(status2.color).toBe('red');
  });

  it('should status color be blue for early', () => {
    component.ngOnInit();
    fixture.detectChanges();

    const deviationFromTimetable = -98;
    const status: BusStatus = component.getBusStatus(deviationFromTimetable);
    expect(status.text).toBe('early');
    expect(status.color).toBe('blue');
  });

  it('should bus route comments input be created', () => {
    component.ngOnInit();
    fixture.detectChanges();

    const textarea: DebugElement = debugElement.query(By.css('#mat-accordion-0 textarea'));
    expect(textarea).toBeTruthy();
  });

  it('should bus save notes button be created', () => {
    component.ngOnInit();
    fixture.detectChanges();

    const button: DebugElement = debugElement.query(By.css('#mat-accordion-0 .mat-stroked-button'));
    expect(button).toBeTruthy();
  });

  it('should save notes button be disabled when comments input is empty', () => {
    component.ngOnInit();
    fixture.detectChanges();

    const button: DebugElement = debugElement.query(By.css('#mat-accordion-0 .mat-stroked-button'));
    expect(button).toBeTruthy();
    expect(button.nativeElement.disabled).toBeTruthy();
  });

  it('should save notes button be enabled when comments input is not empty', () => {
    component.ngOnInit();
    fixture.detectChanges();

    const formGroup = component.busRouteFormArray.controls[0] as FormGroup;
    formGroup.controls.comments.patchValue('test');
    fixture.detectChanges();

    const button: DebugElement = debugElement.query(By.css('#mat-accordion-0 .mat-stroked-button'));
    expect(button).toBeTruthy();
    expect(button.nativeElement.disabled).toBeFalsy();
  });

});
