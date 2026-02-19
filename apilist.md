# DevTinder API's

## authRouter
- POST /Signup
- POST /login
- POST /logout

## profileRouter
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

## connectionRequestRouter
- POST /request/send/:status/:userId
// instead of below two we can use above one
- POST /request/send/interested/:userId
- POST /request/send/ignored/:userId

- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId

## userRouter
- GET /user/requests/received
- GET /user/connections // get user conn who accepted
- GET /user/feed - gets u the profiles of other user on platform

status: ignored, interested, accepted, rejected