import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { BusRouteService } from './bus-route.service';
import {BusData, BusResponse, BusRouteComment} from '../models/bus-route.model';

describe('BusRouteService', () => {

  let httpTestingController: HttpTestingController;
  let busRouteService: BusRouteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ BusRouteService ],
    });
    httpTestingController = TestBed.get(HttpTestingController);
    busRouteService = TestBed.get(BusRouteService);
  });

  it('should  bus route service be created', () => {
    const service: BusRouteService = busRouteService;
    expect(service).toBeTruthy();
  });

  it('it should get bus service data', () => {
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

    busRouteService.getBusServicesData().subscribe();
    const req: TestRequest = httpTestingController.expectOne(`assets/bus-services-data.json`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockData);
    httpTestingController.verify();
  });

  it('it should save bus route comments', () => {
    const mockBusRouteComments = {
      organisation: 'test',
      comments: 'test comments'
    } as BusRouteComment;
    busRouteService.saveCommentsForBusRoute(mockBusRouteComments).subscribe();

    const req: TestRequest = httpTestingController.expectOne(`/busReport/busRoute/test/comments`);
    expect(req.request.method).toEqual('PUT');
  });

});
