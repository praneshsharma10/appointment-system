
//setting routes
const express = require('express');
const authRoutes = require('./routes/auth');
const availabilityRoutes = require('./routes/availability');
const appointmentRoutes = require('./routes/appointments');

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/availability', availabilityRoutes);
app.use('/appointments', appointmentRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;


