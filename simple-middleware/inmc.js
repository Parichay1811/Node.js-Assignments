const express = require('express');
const app = express();

app.use((req, res, next) => {
  const startTime = Date.now();
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);

  res.on('finish', () => {
    const duration = Date.now() - startTime;
    console.log(`Request processed in ${duration}ms`);
  });

  next();
});


app.get('/', (req, res) => {
  res.send('Hello, this is your Express app with logging middleware!');
});


app.get('/about', (req, res) => {
  res.send('This is the about page.');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
