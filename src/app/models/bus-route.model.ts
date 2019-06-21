export interface BusResponse {
  data: BusRoute[];
}

export interface BusRoute {
  organisation: string;
  date: string;
  busData: BusData[];
}

export interface BusData {
  busId: string;
  routeVariant: string;
  deviationFromTimetable: number;
}
