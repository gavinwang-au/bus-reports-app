import { Component, OnInit } from '@angular/core';
import { of, Subject} from 'rxjs';
import { catchError, map, takeUntil } from 'rxjs/operators';
import { BusRouteService } from '../services/bus-route.service';
import {BusData, BusRoute} from '../models/bus-route.model';


@Component({
  selector: 'app-bus-route',
  templateUrl: './bus-route.component.html',
  styleUrls: ['./bus-route.component.scss']
})
export class BusRouteComponent implements OnInit {

  private unsubscribe$ = new Subject();

  panelOpenState = false;
  busRoutes: BusRoute[] = [];

  displayedColumns: string[] = ['busId', 'routeVariant', 'deviationFromTimetable'];

  dataSource: BusData[] = [
    {busId: '42612', routeVariant: '891 2 1', deviationFromTimetable: 77},
    {busId: '42613', routeVariant: '891 2 1', deviationFromTimetable: 77},
  ];

  constructor(private busRouteService: BusRouteService) { }

  ngOnInit() {
    this.busRouteService.getBusServicesData().pipe(
      takeUntil(this.unsubscribe$),
      catchError(error => {
        return of(error);
      })
    ).subscribe((result: BusRoute[]) => {
       if (result && result.length > 0) {
        this.busRoutes = result;
       }
    });
  }

  getBusStatus(deviationFromTimetable): string {
    if (deviationFromTimetable) {
      if ( deviationFromTimetable > 0) {
        return 'early';
      } else {
        return 'early';
      }
    }

  }

}
