# **E-Commerce-video-games.**

A online store where pepole can signup and purchase video games.

## Installation

1. Clone or Downolad the repository (to where you would like).
2. Create a `.env` file in the `/Backend` and the `/Frontend` folders.
   1. In the `/Backend` folder add the following key-value pairs:
      1. **PORT** - The port number on which you want the server to listen for incoming requests.
      2. **SALT_VALUE** - For Hashing iterations (bcryptjs).
      3. **MongodbUser** - A mongoDB user account name.
      4. **MongodbPassword** - Your mongoDB account password.
      5. **MongodbDataBaseName** - Your mongoDB database name.
      6. **MongodbCollectionName** - Your mongoDB database collection name.
      7. **JWT_SECRET** - String (private key stripe) - can be what ever works for you.
      8. **Stripe_Key** - Your Stripe account private key.
      9. **Stripe_EndPoint_Secret** - End point secret for stripe web hooks (for checkout). see - [Stripe Web Hooks](https://stripe.com/docs/webhooks)
      10. **SendGrid_API_KEY** - Your Send grid API key.
      11. **SendGrid_From_Email** - Email address you want to send email from.
   2. In the `/Frontend` folder add the following key-value pairs:
      - **Backend** - The address of the api you want to comunnicate with.
3. open new terminal at the `/Backend` folder and run `npm install` (wait for the download to complete).
4. open new terminal at the `/Frontend` folder and run `npm install` (wait for the download to complete).
5. run `npm start` in the two terminals you opend.

## Tech/Framework

- #### React
  - ##### Used:
    - **_Redux_** - For application wide state management.
    - **_axios_** - For sending http requests to the backend api and handling the responses.
    - **Bootstrap** - For UI.
- #### Nodejs/Express
  - ##### Used:
    - **_multer_** - For handling user uploads.
    - **_bcryptjs_** - For hashing and user passwords.
    - **_mongoose_** - For database communication (set and get data).
    - **_jsonwebtoken_** - For creating secure user toekns and authenticate them.
    * **_stripe_** - For secure payment sessions.
    * **_sendgrid_** - For user notifications.
    * **_express-validator_** - For validating requests data.
- #### Docker
  - For for faster deployment.
- #### CSS
  - For styling.
- #### MongoDb
  - For Storing Data.

## How to Use?

Set user as a "admin" type by inserting `true` manually in mongodb user document `admin` field.

## Images

![Login page image](/assets/images/login_page.png)
![Home page image](/assets/images/home_page.png)
![Cart page image](/assets/images/Cart_page.png)
