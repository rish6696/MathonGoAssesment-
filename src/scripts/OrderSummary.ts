import moment from "moment";
import ObjectsToCsv from "objects-to-csv";
import { adminEmail, mailUsername } from "../config";
import { SALE_SUMMARY_MAIL_INFO } from "../constants";
import { OrderModel } from "../models/model.index";
import mailTransporter from "../services/mailService";
import { generateError } from "../utilities/errorConstants";
import logger from "../utilities/logger";

const saleSummaryMailWorker = async () => {
  const startTime = moment().subtract(1,"days").startOf("day").toDate();
  const endTime = moment().subtract(1,"days").endOf("day").toDate();

  logger.info(`Mail Summary Script started for the Period from  ${startTime} to  ${endTime}`);
  try {
    const [response] = await OrderModel.aggregate([
      {
        $match: {
          createdAt: {
            $gt: startTime,
            $lt: endTime,
          },
        },
      },
      {
        $facet: {
          totalOrders: [
            {
              $count: "total",
            },
          ],
          successfulTransactions: [
            {
              $match: { paid: true },
            },
            {
              $lookup: {
                from: "items",
                localField: "item_id",
                foreignField: "_id",
                as: "itemInfo",
              },
            },
            {
              $addFields: {
                itemInfo: { $arrayElemAt: ["$itemInfo", 0] },
              },
            },
            {
              $group: {
                _id: null,
                count: { $sum: 1 },
                volume: { $sum: "$amount" },
                data: {
                  $push: {
                    order_id: "$order_id",
                    payment_id: "$payment_id",
                    createdAt: "$createdAt",
                    updatedAt: "$updatedAt",
                    item_id: "$item_id",
                    item_name: "$itemInfo.title",
                    coupon: "$coupon",
                    amount: "$amount",
                    paid_status: "$paid",
                    phone: "$phone",
                    email: "$email",
                    utm_params_source: "$utm_params.source",
                    utm_params_medium: "$utm_params.medium",
                    utm_params_campaign: "$utm_params.campaign",
                    utm_params_term: "$utm_params.term",
                  },
                },
              },
            },
            {
              $project: { count: 1, volume: 1, _id: 0, data: 1 },
            },
          ],
        },
      },
    ]);

    let totalOrders = 0;
    let successfulTransactions = 0;
    let totalCost = 0;
    let ordersSummary;

    if (response.totalOrders.length > 0) totalOrders = response.totalOrders[0].total;

    if (response.successfulTransactions.length > 0) {
      successfulTransactions = response.successfulTransactions[0].count;
      totalCost = response.successfulTransactions[0].volume;
      ordersSummary = response.successfulTransactions[0].data;
    }

    if (ordersSummary.length > 0) {
      const csv = new ObjectsToCsv(ordersSummary);

      const mailResponse = await mailTransporter().sendMail({
        from: mailUsername,
        to: [adminEmail],
        subject: SALE_SUMMARY_MAIL_INFO.SUBJECT,
        html: SALE_SUMMARY_MAIL_INFO.BODY({
          totalOrders: totalOrders,
          totalCost: totalCost,
          successfulOrders: successfulTransactions,
        }),
        attachments: [
          {
            filename: "Orders_Summary.csv",
            content: await csv.toString(),
          },
        ],
      });
      logger.info(
        `Mail Summary Script Completed Successfully. Mail response ${JSON.stringify(mailResponse)}`
      );
    }
  } catch (error) {
    logger.info(`Error in Sale Summary Script. Error ${generateError(error)}`);
  }
};

export default saleSummaryMailWorker