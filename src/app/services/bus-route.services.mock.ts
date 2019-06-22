import { Observable, of} from 'rxjs';
import { BusResponse, BusRoute, BusRouteComment, BusRouteUpdateResponse } from '../models/bus-route.model';

export class MockBusRouteService {

  public getBusServicesData(): Observable<BusRoute[]>  {
    const mockData: BusResponse = {
      data: [
        {
          organisation: 'Sydney Buses',
          date: '25/09/2015',
          busData: [
            {
              busId: '42612',
              routeVariant: '891 2 1',
              deviationFromTimetable: 77
            },
          ]
        }
      ]
    };
    const mockBusRoute = mockData.data as BusRoute[];
    return of(mockBusRoute);
  }

  public saveCommentsForBusRoute(bussRouteComment: BusRouteComment): Observable<BusRouteUpdateResponse> {
    const response: BusRouteUpdateResponse = {
      message : 'success',
      code: '404'
    };
    return of(response);
  }

}
