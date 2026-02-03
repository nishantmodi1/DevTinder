const express = require('express');

const app = express();

// app.use("/route", rH1, rH2, rH3, ...)
// app.use("/route", [rH1, rH2, rH3])
// app.use("/route", [rH1, rH2], rH3)

// we can also send array of function
app.use("/user", 
  [(req, res, next) => {
    console.log('kfdsj')
    res.send("route handler 1")
    next()
  },
  (req, res) => {
    console.log('kfdsj')
    res.send("route handler 2")
  }],
);

// this will only handle to get call to /user
// app.get('/user', (req, res) => {
//   res.send({ first_name: 'Nishant', last_name: 'Modi'})
// })

// /ac, /abc this is come in express version 4
// params
// app.get('/a/:b?/c', (req, res) => {
//   res.send({ first_name: 'Nishant', last_name: 'Modi'})
// })

// app.post('/user', (req, res) => {
//   res.send('post data is successfully!');
// });
// app.delete('/user/:userId', (req, res) => {
//   console.log(req.params)
//   res.send('delete data is successfully!');
// });

//this will match all the http method api
// app.use('/test', (req, res) => {
//   res.send('hellow from the server coming!!')
// })

app.listen(8000, () => {
  console.log('server is listening in port 3000...')
})

