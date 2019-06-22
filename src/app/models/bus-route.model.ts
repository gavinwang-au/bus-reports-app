export interface BusResponse {
  data: BusRoute[];
}

export interface BusRoute {
  organisation: string;
  date: string;
  busData: BusData[];
  comments?: string;
}

export interface BusData {
  busId: string;
  routeVariant: string;
  deviationFromTimetable: number;
}

export interface BusStatus {
  text: string;
  color: string;
}

export interface BusRouteComment {
  organisation: string;
  comments: string;
}

export interface BusRouteUpdateResponse {
  message: string;
  code: string;
}
