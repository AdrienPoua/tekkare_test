import { TChartData } from "../types/Charts";

export default class Charts {


  static formatData(data: TChartData[]) {
    return data.map((dataPoint) => {
      const currentTimeStamp = dataPoint[0];
      const currentPrice = dataPoint[1];
      const date = new Date(currentTimeStamp);
      const hours = date.getHours();
      const formattedDate = `${hours}H`;
      return {
        date: formattedDate,
        value: currentPrice,
      };
    });
  }
}
