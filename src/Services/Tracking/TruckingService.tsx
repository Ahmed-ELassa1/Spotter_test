import { AxiosResponse } from "axios";
import { HTTPBaseService } from "../HTTPBaseService";
import {
  IResponseList,
  IGetTruckingBody,
} from "../../Interfaces/GlobalInterfaces";
import truckingData from "../../utils/TruckingData"; // Adjust the path as needed
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

  public getTruckingList(
    body: IGetTruckingBody
  ): Promise<AxiosResponse<IResponseList>> {
    return this.instance.get<IResponseList>("Truckings", {
      params: body,
      ...this.getRequestConfig(),
    });
  }
}
