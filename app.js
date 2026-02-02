const express = require('express');

const app = express();

app.use(express.json());

// this will only handle to get call to /user
app.get('/user', (req, res) => {
  res.send({ first_name: 'Nishant', last_name: 'Modi'})
})

// params
// app.get('/a/:b?/c', (req, res) => {
//   res.send({ first_name: 'Nishant', last_name: 'Modi'})
// })

app.post('/user', (req, res) => {
  res.send('post data is successfully!');
});
app.delete('/user/:userId', (req, res) => {
  console.log(req.params)
  res.send('delete data is successfully!');
});

//this will match all the http method api
app.use('/test', (req, res) => {
  res.send('hellow from the server coming!!')
})

app.listen(8000, () => {
  console.log('server is listening in port 3000...')
})

