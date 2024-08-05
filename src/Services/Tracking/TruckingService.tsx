import { AxiosResponse } from "axios";
import { HTTPBaseService } from "../HTTPBaseService";
import {
  IResponseList,
  IGetTruckingBody,
} from "../../Interfaces/GlobalInterfaces";

// survice used to handle all trucking cruds like getAll , getById , delete and Update
export class TruckingService extends HTTPBaseService {
  private static classInstance?: TruckingService;
  constructor() {
    super(process.env.REACT_API_BASE_URL || "./utils/TruckingData.ts");
  }
  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new TruckingService();
    }
    return this.classInstance;
  }
  // get All trucking data from endpoint
  public getTruckingList(
    body: IGetTruckingBody
  ): Promise<AxiosResponse<IResponseList>> {
    return this.instance.get<IResponseList>("Truckings", {
      params: body,
      ...this.getRequestConfig(),
    });
  }
}
