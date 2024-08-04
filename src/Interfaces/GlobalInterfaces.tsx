export interface IGetTruckingBody {
  pageSize: string;
  // pageNumber: number;
  // minPrice: number;
  // maxPrice: number;
}
export interface IResponseList<T = any> {
  config?: [];
  data: T;
  headers?: [];
  status?: number;
  statusText?: string;
  request?: [];
  response?: any;
}
export interface IGetResponseData<T = any> {
  total: number;
  pageNumber: number;
  pageSize: number;
  data: T;
}
export interface ITruckingListData {
  created_dt: string;
  data_source_modified_dt: string;
  entity_type: string;
  operating_status: string;
  legal_name: string;
  dba_name: string;
  physical_address: string;
  p_street: string;
  p_city: string;
  p_state: string;
  p_zip_code: string;
  phone: string;
  mailing_address: string;
  m_street: string;
  m_city: string;
  m_state: string;
  m_zip_code: string;
  usdot_number: number;
  mc_mx_ff_number: string;
  power_units: number;
  mcs_150_form_date: string;
  out_of_service_date: string;
  state_carrier_id_number: number | null;
  duns_number: string;
  drivers: number;
  mcs_150_mileage_year: string | number;
  id: number;
  credit_score: string | null;
  record_status: string;
}
