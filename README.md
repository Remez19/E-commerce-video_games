# **E-Commerce-video-games.**

A online store where pepole can signup and purchase video games.
Rate video games and, favorite games.

## Installation

### Using NPM Install.

1. Clone or Downolad the repository (to where you would like).
2. Create a `.env` file in the `/Backend` and `/Frontend` folders.
   1. In the `/Backend` folder add the following key-value pairs:
      1. **PORT_BACKEND** - The port number on which you want the server to listen for incoming requests.
      2. **SALT_VALUE** - For Hashing iterations (bcryptjs).
      3. **MONGODB_CONNSTRING** - Mongodb connection string see - [Connection String URI Format](https://www.mongodb.com/docs/manual/reference/connection-string/)
      4. **JWT_SECRET** - String - can be what ever works for you see - [JSON Web Tokens](https://jwt.io/introduction).
      5. **Stripe_Key** - Your Stripe account private key see - [API keys](https://stripe.com/docs/keys). (This is needed for orders).
      6. **Stripe_EndPoint_Secret** - End point secret for stripe web hooks (for checkout). see - [Get started with the Stripe CLI](https://stripe.com/docs/stripe-cli) and [Stripe Web Hooks](https://stripe.com/docs/webhooks)
      7. **SendGrid_API_KEY** - Your Send grid API see - [SendGrid Documentation](https://docs.sendgrid.com/).
      8. **SendGrid_From_Email** - Email address you want to send email from.
      9. **CLIENT_URL** - The address of the client side you want to send data to.
   2. In the `/Frontend` folder add the following key-value pairs:
      1. **REACT_APP_Backend** - The address of the api (Backend) you want to comunnicate with.
      2. **REACT_APP_Stripe_Key** - Your Stripe account public key see - [API keys](https://stripe.com/docs/keys).
3. open new terminal at the `/Backend` folder and run `npm install` (wait for the download to complete).
4. open new terminal at the `/Frontend` folder and run `npm install` (wait for the download to complete).
5. run `npm start` in the two terminals you opend.

### Using Docker.

1. Clone or Downolad the repository (to where you would like).
2. Create a `.env` file in the `/env` folder and add the following key value pairs as metioned above.
3. Navigate to `/Frontend` and open new teminal. Run `docker build -t client-video-games .`.
4. Navigate to `/Backend` and open new teminal. Run `docker build -t server-video-games . `.
5. open new terimal and run `docker-compose up`.

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

Create an account. Login with the user you created an play around.

## Images

![Login page image](/assets/images/login_page.png)
![Home page image](/assets/images/home_page.png)
![Cart page image](/assets/images/Cart_page.png)
