const cron = require('node-cron');
const Field = require('../models/Field');
const Alert = require('../models/Alert');

// Auto-irrigation logic
const startAutoIrrigation = () => {
  // Run every 1 minute
  cron.schedule('* * * * *', async () => {
    try {
      const fields = await Field.find();

      fields.forEach(async (field) => {
        // If moisture < 20 and not already irrigating
        if (field.moisture < 20 && !field.irrigating) {
          field.irrigating = true;
          field.irrigationStartTime = new Date();
          await field.save();
          
          // Create alert
          await Alert.create({
            fieldId: field._id,
            message: `Auto irrigation started for ${field.name}`,
            severity: 'info'
          });
          
          console.log(`Started irrigation for field: ${field.name}`);

          // Stop irrigation after 2 minutes
          setTimeout(async () => {
            const fieldToStop = await Field.findById(field._id);
            if (fieldToStop) {
              fieldToStop.irrigating = false;
              fieldToStop.lastWatered = new Date();
              await fieldToStop.save();
              
              // Create alert
              await Alert.create({
                fieldId: field._id,
                message: `Irrigation stopped for ${field.name}`,
                severity: 'info'
              });
              
              console.log(`Stopped irrigation for field: ${field.name}`);
            }
          }, 2 * 60 * 1000);
        }
      });
    } catch (error) {
      console.error('Cron job error:', error);
    }
  });

  console.log('Auto-irrigation cron job started');
};

module.exports = { startAutoIrrigation };
