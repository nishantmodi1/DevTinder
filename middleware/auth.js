const adminAuth = (req, res, next) => {
  const token = "abc";
  const isAuthourized = token === 'abc'
  if(isAuthourized){
    // res.send("All data send")
    next()
  }else{
    res.status(401).send('UnAuthorized')
  }
}

const userAuth = (req, res, next) => {
  const token = "abc";
  const isAuthourized = token === 'abc'
  if(isAuthourized){
    // res.send("All data send")
    next()
  }else{
    res.status(401).send('UnAuthorized')
  }
}

module.exports = {adminAuth, userAuth}  