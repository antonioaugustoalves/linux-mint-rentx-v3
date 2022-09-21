import dayjs from "dayjs";

import { IDateProvider } from "../IDateProvider";

class DayjsDateProvider implements IDateProvider {
  compare(start_date: Date, end_date: Date): Promise<any> {
    throw new Error("Method not implemented.");
  }
}
