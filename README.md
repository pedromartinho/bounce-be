# Solution for the Bounce fullstack challenge

## 📜 Context 

The goal is to create a simple checkout experience that delivers on user expectations. To accomplish this, I've divided the project into two separate repositories: one for the front-end (bounce-fe) and one for the back-end (bounce-be).

For the BE, I've decided to use Node.js with Typescript. I've been using it in the past couple of years and I believe it is strong tool for web development. This simple REST API features two endpoints:

* ```GET api/stores/<storeId>```

* ```POST api/orders```

⚠️ To have the complete project running, it's important to also clone our **bounce-fe** repository and follow the setup instructions.

## 🏗️ Initial set-up

First things first, make sure you have docker installed on your machine. If you do, run the following command to set the Node version:

```
make build
```

Once you've done that, you're ready to get the project up and running! Here's the command you need to run:

```
make local-run
```

After that, you should have the project running http://localhost:3050 🚀

If you want to run the tests or the linter, run the command:

```
make test
make lint
```

To test both the endpoints, you can consider the following request:

```
curl --location 'localhost:3050/api/orders' \
--header 'Content-Type: application/json' \
--data-raw '{
    "numberOfBags": 1,
    "unitPrice": 5.90,
    "creditCardNumber": "4242 4242 4242 4242",
    "email": "pedro@bounce.dev",
    "name": "Pedro Martinho"
}'
```

```
curl --location 'localhost:3050/api/stores/1'
```


## 💭 Structure and approach

My aim was to create a modular and organized structure that would enhance the readability and maintainability of the codebase.

The "config" folder contains essential environment variables required to configure the API. In the "api" folder, I have organized the logic required to make the API operational. Here's a brief summary of the various folders and their responsibilities:

* **Controllers:** This folder contains the logic associated with each endpoint, including route definitions and middleware calls.

* **Middlewares:** The middlewares are responsible for error handling and payload validation, ensuring robustness and reliability.

* **Routes:** The routes folder defines all the API routes based on the controllers.

* **Schemas:** This folder contains schemas for request body validations, providing a robust input validation mechanism. Chose to use Joi schemas for object validations.

* **Services:** This folder houses the business logic, in this case, only payments.

* **Tests:** The tests folder includes unit tests for the controllers, middlewares, and services, which are essential to ensuring code quality and robustness. Jest used as the testing library.

Since the endpoints were mainly dummy, I've not considered the usage of a database. If tha was the case, I would use a PostgreSQL database and interact with it using the typeORM.

The design philosophy centers on modularization and organization, which makes the codebase cleaner, more readable, and easier to test. I find of unit testing essential to have a robust codebase.

Looking forward to discussing the project with you and welcome any feedback or questions you may have. Thank you!

