
const express = require('express');
const morgan = require('morgan');
const app = express();

const requestLogger = (req, res, next) => {
  const timestamp = new Date().toISOString(); 
  const method = req.method;    
  const url = req.originalUrl; 
  const ip = req.ip;

  console.log(`[${timestamp}] ${method} ${url} - IP: ${ip}`);
  next();
}
const debugLogger = (req, res, next) => {
  console.debug(`DEBUG: ${req.method} ${req.originalUrl}`);
  next();
};

const infoLogger = (req, res, next) => {
  console.info(`INFO: ${req.method} request received`);
  next();
};


app.use(requestLogger);       
app.get('/', (req, res) => {
  res.send('Welcome to the Express App!');
});

app.get('/about', (req, res) => {
  res.send('About Page');
});

app.post('/submit', (req, res) => {
  res.send('Form Submitted');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
