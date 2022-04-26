export interface Duration {
  start_date: string;
  end_date: string;
}

export interface Room {
  id: number;
  key: number;
  name: string;
  status: string;
}

export interface Tenant {
  id: string;
  name: string;
  email: string;
  contact_no: string;
}

export interface Rental {
  duration: Duration;
  room: Room;
  tenant: Tenant;
}

export interface RentalResponse {
  errcode: number;
  errmsg: string;
  data: Rental;
}
