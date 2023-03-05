# **E-Commerce-video-games.**

A online store where pepole can signup and purchase video games.

## Installation

1. Clone or Downolad the repository (to where you would like).
2. Create a `.env` file in the `/Backend` and the `/Frontend` folders.
   1. In the `Backend` folder add the following key-value pairs:
      1. **PORT** - The port number on which you want the server to listen for incoming requests.
      2. **SALT_VALUE** - For Hashing iterations (bcryptjs).
      3. **MongodbUser** - A mongoDB user name.
      4. `**MongodbPassword**` - Your mongoDB

```

```

## Tech/Framework

- #### React
  - ##### Used:
    - **_Redux_** - For manging application wide state management.
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
