const express = require('express');

const app = express();

app.use('/hello', (req, res) => {
  res.send('hellow from the server coming!!')
})

app.listen(8000, () => {
  console.log('server is listening in port 3000...')
})

