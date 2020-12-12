import { MAIL_INFO_INTERFACE } from "./interfaces/constantInterfaces";

export const production = 0;
export const staging = 1;
export const local = 2;

export const TIME_FORMAT = "YYYY-MM-DD HH:mm:ss";


export const SALE_SUMMARY_MAIL_INFO = {
  SUBJECT: "Sale Summary",
  BODY: ({totalOrders,totalCost,successfulOrders}:MAIL_INFO_INTERFACE): string => {
    return `
      Total orders Placed : ${totalOrders}
      Successful Orders :${successfulOrders}
      Total Cost : ${totalCost}
    `;
  },
};


