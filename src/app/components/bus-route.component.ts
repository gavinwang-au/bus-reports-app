import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { of, Subject} from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
import { BusRouteService } from '../services/bus-route.service';
import { BusData, BusRoute, BusRouteComment, BusStatus } from '../models/bus-route.model';

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

  getBusStatus(deviationFromTimetable: number): BusStatus {
    if (deviationFromTimetable === null) {
       return {text: 'unknown', color: 'red'} as BusStatus;
    } else {
      if ( deviationFromTimetable > 0 && deviationFromTimetable < 100) {
        return {text: 'ontime', color: 'green'} as BusStatus;
      } else if (deviationFromTimetable > 100) {
        return {text: 'late', color: 'purple'} as BusStatus;
      } else if (deviationFromTimetable < 0) {
        return {text: 'early', color: 'blue'} as BusStatus;
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

  saveNotes(busRouteFormGroup: FormGroup) {
    if (busRouteFormGroup.valid) {
      const bussRouteComment: BusRouteComment = this.prepareBusRouteComment(busRouteFormGroup);
      this.busRouteService.saveCommentsForBusRoute(bussRouteComment).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe();
    }
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

  private prepareBusRouteComment(busRouteFormGroup: FormGroup): BusRouteComment {
    const busRoute = busRouteFormGroup.getRawValue() as BusRoute;
    return {
      organisation: busRoute.organisation,
      comments: busRoute.comments
    } as BusRouteComment;
  }
}
