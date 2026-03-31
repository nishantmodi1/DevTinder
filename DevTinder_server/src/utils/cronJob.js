const cron = require('node-cron')
const {subDays, startOfDay, endOfDay} = require("date-fns")
const sendEmail = require('../utils/sendEmail')
const ConnectionRequestModal = require('../models/connectionRequest')


cron.schedule('38 7 * * *', async() => {
  // send email to all the people who got requests preious day
  console.log('running a task every minute', new Date())
  try{
    const yesterday = subDays(new Date(), 0)
    const yesterdayStart = startOfDay(yesterday)
    const yesterdayEnd = endOfDay(yesterday)


    const pendingReqeusts = await ConnectionRequestModal.find({
      status: "interested",
      createdAt: {
        $gte: yesterdayStart,
        $lt: yesterdayEnd
      }
    }).populate("fromUserId toUserId")

    const listOfEmails = [...new Set(pendingReqeusts.map(req => req.toUserId.emailId))]
    console.log('listOfEmails>>>', listOfEmails)

    for(const email of listOfEmails){
      //send emails
      try {
        const res = await sendEmail.run(
          "New Request pending for " + email,
          "There are so many request pending, Please login to devtinder.com and accept or reject the requests"
        )
        console.log('res>>>', res)
      } catch (error) {
        console.error('error>>>', error)
      }
    }

  }catch(error){
    console.error('error>>>', error)
  
  }

})