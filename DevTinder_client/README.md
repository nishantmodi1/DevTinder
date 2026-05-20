## DEVTINDER client

 - create a vite + react project
 - add navbar in app.jsx
 - Install react-router-dom
 - create browser react-router-dom
 - add pagelayout outlet 
 - add footer 
 - add login page
 - install axios
 - CORS - Install cors in backend => add middleware to with configurations: origin, credencials: true
 - whenever making api call so pass { withCredentials: true}
 - install redux and toolkit
 - install react-redus + toolkit => configureStore => add provider in app.js => create a slice and and reducer to store
 - add redux dev tools in chrome
 - show data in store
 - navbar should be update as soon as user login
 - refactor our code to add constants file + add a components file 
 - you shpuld not be able to access other without login 
 - if login is not present, redirect to login page
 - profile page
 - if token not present redirect user to login page
 - logout feature
 - get the feed and add te feed in the store
 - build the user card on feed
 - edit profile feature
 - show toast on save edit profile
 - see all my connections in new page 
 - see all my connetion reqeusts in new page 
 - feature - accept/reject connection request
 - feature - send/ignore the user card feed 
 - add signup
 - testing

 ## Deployment
 - sign up in AWS
 - Launch Instance
 - create secret key pair
 - wait for status check from initializing to complete
 - Modify/change the permissions: chmod 400 <secret>.pem
 - in local terminal: Nishanth@VENW-010 MINGW64 ~/Downloads 
    $ chmod 400 dev-secret.pem
 - connect to the machine through ssh: ssh -i "dev-secret.pem" ubuntu@ec2-13-53-206-149.eu-north-1.compute.amazonaws.com
 - install node version (similar of local node version)  
 - git clone in aws server engine
    ## Frontend
    - cd frontend _client
    - npm install then npm run build (for bundling the project)
    - sudo apt update
    - sudo apt install nginx
    - sudo systemctl start nginx
    - sudo systemctl enable nginx
    - copy code from dist folder(build files) to http nginx: /var/www/html/  :  index.nginx-debian.html
    - ubuntu@ip-172-31-34-123:~/DevTinder/DevTinder_client$ sudo scp -r dist/* /var/www/html/
    - Enable port 80 on my Instance

   ## Backend
    - cd Devclient_server
    - npm run start
    - open aws instance and copy ipv4 ip:13.53.206.149
    - now go to mongo db atlas: network; create new ip access list address add 13.53.206.149:ip 
    - allowed ec2 instance public ip on mongodb server
    - backend run start correctly,
    - install pm2 for running backend in detached mode/when local system is off: npm install pm2 -g
    - run start: ubuntu@ip-172-31-34-123:~/DevTinder/DevTinder_server$ pm2 start npm -- start
    - ┌────┬────────────────────┬──────────┬──────┬───────────┬──────────┬──────────┐
      │ id │ name               │ mode     │ ↺    │ status    │ cpu      │ memory   │
      ├────┼────────────────────┼──────────┼──────┼───────────┼──────────┼──────────-┤
      │ 0  │ npm                │ fork     │ 0    │ online    │ 0%       │ 32.3mb    │
      └────┴────────────────────┴──────────┴──────┴───────────┴───────------┴────────┘
    - to check logs for checking any issues: pm2 logs
    - pm2 flush npm 
    - also we can change name of that npm: pm2 list
    - to stop pm2:  pm2 stop <name> (name: npm)
    - to delete npm: pm2 delete npm
    - to add new name of the process of backend in the background: 
    - pm2: ubuntu@ip-172-31-34-123:~/DevTinder/DevTinder_server$ pm2 start npm --name "detinderserver" -- start

    - sudo systemctl restart nginx

   frontend: http://13.53.206.149/
   backend: http://13.53.206.149:8000/

   Domain name: devtinder.com => 13.53.206.149/

   frontend: devtinder.com
   backend: devtinder.com:8000 => devtinder.com/api
   nginx proxy pass
   config nginx: /etc/nginx/sites-available/default
   server_name 13.53.206.149;
   - location /api/ {
        proxy_pass http://localhost:8000/;

        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
    - Restart nginx server: sudo systemctl restart nginx
    - Modify the frontend BASE_URL to /api

   ## Domain name:
   - godaddy.com: purchase a Domain name
   - visit claudflare : help to add domain
   - edit nameserver in godaddy : change the namserver on godaddy and point it to claudeflare
   - wait for sometime till your nameserver updated: around 15min
   - go to my order and open dns management: update doamin proxy from server_name 13.53.206.149 to devtinder.com
   - dns record: A record in devtinder.com in server_name 13.53.206.149
   - to secure domain name server: open ssl/tls certificate in claudeflare

   ## sending email via aws ses
    - create iam user
    - give access to amazonSesFullAccess
    - create an identity in Amazon Sess
    - Verify Your domain name
    - Verify an email address
    - install AWS sdk - v3
    - code example: https://github.com/awsdocs/aws-doc-sdk-examples/tree/main/javascriptv3/example_code/ses#code-examples
    - setup ses client:
    - Access credentials should be created on IAM under securitycredencials Tab
    - add the createclient to env file
    - write code for sesClient
    - write code for sending email: make email dynamic by passing more parameters to the run function

    ## schedule node-cron job in NodeJs 
    - To schedule task like on a particular tome send email let on 8oclock in the mongodb-connection-string-url
    - install npm i node-cron, add file for cron job
    - visit cronitor for more explore
    - schedule a job
    - npm date fns 
    - find all the unique email id woh have got connection request in previous day
    - send email
    - visit bee-queue/npm-bull/aws-ses for bulk email for more than 10k user sending cron job email
    - make sendEmail function dynamic

   ## Real time chat using websockets(socket.io):
    - Build chat window UI on chat/:targetUserId
    - setup socket.io in backend
    - npm i socket.io
    - setup frontend socket.io-client
    - initialise the chat
    - createsocketconnection
    - Listen to events
    - Homework: improve UI
    - HW: fix security bug: auth in  web socket
    - HW; fix bug: i am not your friend then i should not be able to send message
    - HW: show green symbolwhen online??? - [last seen 2hrs ago]
    - HW: Limit messages when fetching from db, 20 messages for the first timea