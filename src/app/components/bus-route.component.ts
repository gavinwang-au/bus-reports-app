import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { of, Subject} from 'rxjs';
import { catchError, map, takeUntil } from 'rxjs/operators';
import { BusRouteService } from '../services/bus-route.service';
import { BusData, BusRoute } from '../models/bus-route.model';

@Component({
  selector: 'app-bus-route',
  templateUrl: './bus-route.component.html',
  styleUrls: ['./bus-route.component.scss']
})
export class BusRouteComponent implements OnInit, OnDestroy {

  busRouteFormArray: FormArray = this.fb.array([]);
  displayedColumns: string[] = ['busId', 'routeVariant', 'deviationFromTimetable'];
  private unsubscribe$ = new Subject();

  constructor(private fb: FormBuilder, private busRouteService: BusRouteService) { }

  ngOnInit() {
     this.busRouteService.getBusServicesData().pipe(
      takeUntil(this.unsubscribe$),
      catchError(error => {
        return of(error);
      })
    ).subscribe((result: BusRoute[]) => {
       if (result && result.length > 0) {
        // this.busRoutes = result;
         for (const busRoute of result) {
           this.busRouteFormArray.push(this.createBusRouteFormGroup(busRoute));
         }
       }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getBusStatus(deviationFromTimetable: number): string {
    if (deviationFromTimetable == null) {
       return 'unknown';
    } else {
      if ( deviationFromTimetable > 0 && deviationFromTimetable < 100) {
        return 'ontime';
      } else if (deviationFromTimetable > 100) {
        return 'late';
      } else if (deviationFromTimetable < 0) {
        return 'early';
      }
    }
  }

  getBusDataFromBusRouteFormGroup(busRouteFormGroup: FormGroup): BusData[] {
    if (busRouteFormGroup) {
      const busDataFormArray = busRouteFormGroup.get('busData') as FormArray;
      if (busDataFormArray) {
        return busDataFormArray.getRawValue() as BusData[];
      }
    }
    return [] as BusData[];
  }

  private createBusRouteFormGroup(busRoute: BusRoute): FormGroup {
    let busRouteFormGroup: FormGroup = null;
    if (busRoute) {
      busRouteFormGroup = this.fb.group({
        organisation: [busRoute.organisation || ''],
        date: [busRoute.date || ''],
        busData: this.fb.array([]),
        comments: [busRoute.comments || '']
      });

      if (busRoute.busData && busRoute.busData.length > 0) {
        busRoute.busData.forEach((busData: BusData) => {
          const busDataFormArray = busRouteFormGroup.get('busData') as FormArray;
          busDataFormArray.push(this.createBusDataFormGroup(busData));
        });
      }
    }
    return busRouteFormGroup;
  }

  private createBusDataFormGroup(busData: BusData) {
    let busDataFormGroup: FormGroup = null;
    if (busData) {
      busDataFormGroup = this.fb.group({
        busId: [busData.busId || ''],
        routeVariant: [busData.routeVariant || ''],
        deviationFromTimetable: [busData.deviationFromTimetable]
      });
    }
    return busDataFormGroup;
  }
}
