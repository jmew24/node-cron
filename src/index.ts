import * as cron from 'node-cron';

// Run at 08:59 PM every day.
cron.schedule('59 08 * * *', function () {
  console.log('---------------------');
  console.log('Running Cron Job');
});
