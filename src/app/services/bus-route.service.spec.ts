import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { BusRouteService } from './bus-route.service';

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

  it('should be created', () => {
    const service: BusRouteService = busRouteService;
    expect(service).toBeTruthy();
  });

  describe('getBusServicesData()', () => {
    it('it should get bus service data', () => {
      busRouteService.getBusServicesData().subscribe();

      const req: TestRequest = httpTestingController.expectOne(`assets/bus-services-data.json`);
      expect(req.request.method).toEqual('GET');
    });

  });
});
