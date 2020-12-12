import * as cron from 'node-cron'
import { saleSummaryMailTime } from '../config';
import saleSummaryMailWorker from '../scripts/OrderSummary';

const saleSummaryJob = cron.schedule(saleSummaryMailTime, saleSummaryMailWorker,{scheduled:false});

const jobScheduler=()=>{
    saleSummaryJob.start();
}

export default jobScheduler

