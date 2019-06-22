import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BusResponse, BusRoute, BusRouteComment, BusRouteUpdateResponse } from '../models/bus-route.model';

@Injectable({
  providedIn: 'root'
})
export class BusRouteService {

  constructor(private http: HttpClient) { }

  public getBusServicesData(): Observable<BusRoute[]>  {
    return this.http.get(`assets/bus-services-data.json`)
      .pipe(
        map( (busResponse: BusResponse) => {
          if (busResponse && busResponse.data) {
            return busResponse.data as BusRoute[];
          }
          return [] as BusRoute[];
        }),
        catchError(this.handleError<BusRoute[]>('getBusServicesData', []))
      );
  }

  public saveCommentsForBusRoute(bussRouteComment: BusRouteComment): Observable<BusRouteUpdateResponse> {
    return this.http.put<BusRouteUpdateResponse>(`/busReport/busRoute/${bussRouteComment.organisation}/comments`, bussRouteComment).pipe(
      catchError(this.handleError<BusRouteUpdateResponse>('saveCommentsForBusRoute', {} as BusRouteUpdateResponse))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
