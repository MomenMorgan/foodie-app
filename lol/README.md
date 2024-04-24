# Foodie API

## Table of Contents

1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
3. [API Endpoints](#api-endpoints)
   - [Authentication](#authentication)
     - [Signup](#signup)
     - [Login](#login)
   - [User Endpoints](#user-endpoints)
     - [Get User](#get-user)
   - [Category Endpoints](#category-endpoints)
     - [Get All Categories](#get-all-categories)
     - [Get Category](#get-category)
     - [Create Category](#create-category)
     - [Update Category](#update-category)
     - [Delete Category](#delete-category)
   - [Subcategory Endpoints](#subcategory-endpoints)
     - [Get All Subcategories](#get-all-subcategories)
     - [Get Subcategory](#get-subcategory)
     - [Create Subcategory](#create-subcategory)
     - [Update Subcategory](#update-subcategory)
     - [Delete Subcategory](#delete-subcategory)
     - [Get All Subcategories of a Category](#get-all-subcategories-of-a-category)
   - [Recipe Endpoints](#recipe-endpoints)
     - [Get All Recipes](#get-all-recipes)
     - [Get Recipe](#get-recipe)
     - [Create Recipe](#create-recipe)
     - [Update Recipe](#update-recipe)
     - [Delete Recipe](#delete-recipe)
     - [Get All Recipes of a Category](#get-all-recipes-of-a-category)
     - [Get All Recipes of a Subcategory](#get-all-recipes-of-a-subcategory)
   - [Collection Endpoints](#collection-endpoints)
     - [Get Collection](#get-collection)
     - [Create Collection](#create-collection)
     - [Update Collection](#update-collection)
     - [Delete Collection](#delete-collection)
     - [Add Recipe to Collection](#add-recipe-to-collection)
     - [Delete Recipe from Collection](#delete-recipe-from-collection)
   - [Review Endpoints](#review-endpoints)
     - [Get All Reviews](#get-all-reviews)
     - [Get Review](#get-review)
     - [Create Review](#create-review)
     - [Update Review](#update-review)
     - [Delete Review](#delete-review)
   - [Search Endpoints](#search-endpoints)
4. [Contributors](#contributors)

---

## Introduction

This is the API for the Fooide application. It is built using Node.js, Express.js, and MongoDB.  
Foodie api is a RESTful API that allows users to create, read, update, and delete recipes, categories, subcategories, collections of his favorite recipes, reviews on recipes. It also allows users to signup and login using JWT authentication, and authorize them to perform certain actions restricted to users with admin privileges.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/)

### Installation

1. Clone the repository
   `git clone https://github/Fadyy22/foodie_node_api.git`
2. Navigate to the project directory
   `cd foodie_node_api`
3. Install dependencies
   `npm install`
4. Create a config.env file in the root directory and add the following:
   `Contact for the config.env file or create your own and add the following:`

   ```env
    PORT=
    DB_URI=
    JWT_KEY=
    JWT_EXPIRE_TIME=
   ```

5. Start the server
   `npm start`

---

## API Endpoints

### Authentication

#### Signup

- **URL:** `/signup`
- **Method:** `POST`
- **Description:** Creates a new user.
- **Request Body:**
  - `name`: String
  - `email`: String
  - `password`: String
- **Response Body:**
  - `message`: String
  - `userId`: String
  - `token`: String

#### Login

- **URL:** `/login`
- **Method:** `POST`
- **Description:** Logs in a user.
- **Request Body:**
  - `name`: String
  - `email`: String
- **Response Body:**
  - `userId`: String
  - `token`: String

### User Endpoints

#### Get User

- **URL:** `/users`
- **Method:** `GET`
- **Description:** Gets a user.
- **Request Headers:**
  - `Authorization`: Bearer {jwt token}
- **Response Body:**
  - `document`: Array with one user object
    - `id`: String
    - `name`: String
    - `email`: String
    - `collections`: Array of collection objects
      - `id`: String
      - `name`: String
      - `recipes`: Array of recipe objects
    - `reviews`: Array of review objects
      - `id`: String
      - `title`: String
      - `rating`: Number
      - `recipe`: Recipe object
        - `id`: String
        - `name`: String
      - `user`: User object
        - `id`: String
        - `name`: String

### Category Endpoints

#### Get All Categories

- **URL:** `/categories`
- **Method:** `GET`
- **Description:** Gets all categories.
- **Response Body:**
  - `documents`: Array of category objects
    - `id`: String
    - `name`: String
    - `description`: String
    - `image`: String
    - `subcategories`: Array of subcategory objects

#### Get Category

- **URL:** `/categories/{id}`
- **Method:** `GET`
- **Description:** Gets a category by id.
- **Response Body:**
  - `document`: Array with one category object
    - `id`: String
    - `name`: String
    - `description`: String
    - `image`: String

#### Create Category

- **URL:** `/categories`
- **Method:** `POST`
- **Description:** Creates a new category.
- **Request Headers:**
  - `Authorization`: Bearer {jwt token}
- **Request Body:**
  - `name`: String
  - `description`: String
  - `image`: Image file
- **Response Body:**
  - `message`: String
  - `document`: Object
    - `id`: String
    - `name`: String
    - `description`: String
    - `image`: String

#### Update Category

- **URL:** `/categories/{id}`
- **Method:** `PUT`
- **Description:** Updates a category by id.
- **Request Headers:**
  - `Authorization`: Bearer {jwt token}
- **Request Body:**
  - `name`: String
  - `description`: String
  - `image`: Image
- **Response Body:**
  - `message`: String
  - `document`: Object
    - `id`: String
    - `name`: String
    - `description`: String
    - `image`: String

#### Delete Category

- **URL:** `/categories/{id}`
- **Method:** `DELETE`
- **Description:** Deletes a category by id.
- **Request Headers**
  - `Authorization`: Bearer {jwt token}
- **Response Body:**
  - `message`: String
  - `document`: Object
    - `id`: String
    - `name`: String
    - `description`: String
    - `image`: String

### Subcategory Endpoints

#### Get All Subcategories

- **URL:** `/subcategories`
- **Method:** `GET`
- **Description:** Gets all subcategories.
- **Response Body:**
  - `documents`: Array of subcategory objects
    - `id`: String
    - `name`: String
    - `description`: String
    - `category`: String

#### Get Subcategory

- **URL:** `/subcategories/{id}`
- **Method:** `GET`
- **Description:** Gets a subcategory by id.
- **Response Body:**
  - `document`: Array with one subcategory object
    - `id`: String
    - `name`: String
    - `description`: String
    - `category`: String

#### Create Subcategory

- **URL:** `/subcategories`
- **Method:** `POST`
- **Description:** Creates a new subcategory.
- **Request Body:**
  - `name`: String
  - `description`: String
  - `category`: String
- **Response Body:**
  - `message`: String
  - `document`: Object
    - `id`: String
    - `name`: String
    - `description`: String
    - `category`: String

#### Update Subcategory

- **URL:** `/subcategories/{id}`
- **Method:** `PUT`
- **Description:** Updates a subcategory by id.
- **Request Body:**
  - `name`: String
  - `description`: String
  - `category`: String
- **Response Body:**
  - `message`: String
  - `document`: Object
    - `id`: String
    - `name`: String
    - `description`: String
    - `category`: String

#### Delete Subcategory

- **URL:** `/subcategories/{id}`
- **Method:** `DELETE`
- **Description:** Deletes a subcategory by id.
- **Response Body:**
  - `message`: String
  - `document`: Object
    - `id`: String
    - `name`: String
    - `description`: String
    - `category`: String

#### Get All Subcategories of a Category

- **URL:** `/categories/{id}/subcategories`
- **Method:** `GET`
- **Description:** Gets all subcategories of a category.
- **Response Body:**
  - `documents`: Array of subcategory objects
    - `id`: String
    - `name`: String
    - `description`: String
    - `category`: String

### Recipe Endpoints

#### Get All Recipes

- **URL:** `/recipes`
- **Method:** `GET`
- **Description:** Gets all recipes.
- **Response Body:**
  - `documents`: Array of recipe objects
    - `id`: String
    - `name`: String
    - `description`: String
    - `image`: String
    - `ingredients`: Array of ingredients
    - `prep_time`: Number
    - `calories`: Number
    - `vegetarian`: Boolean
    - `diet`: String
    - `ratingsAverage`: Number
    - `ratingsQuantity`: Number
    - `category`: Category object
      - `id`: String
      - `name`: String
    - `subcategory`: Subcategory object
      - `id`: String
      - `name`: String

#### Get Recipe

- **URL:** `/recipes/{id}`
- **Method:** `GET`
- **Description:** Gets a recipe by id.
- **Response Body:**
  - `document`: Array with one recipe object
    - `id`: String
    - `name`: String
    - `description`: String
    - `image`: String
    - `ingredients`: Array of ingredients
    - `prep_time`: Number
    - `calories`: Number
    - `vegetarian`: Boolean
    - `diet`: String
    - `ratingsAverage`: Number
    - `ratingsQuantity`: Number
    - `category`: Category object
      - `id`: String
      - `name`: String
    - `subcategory`: Subcategory object
      - `id`: String
      - `name`: String
    - `reviews`: Array of review objects
      - `id`: String
      - `title`: String
      - `rating`: Number
      - `recipe`: Recipe object
        - `id`: String
        - `name`: String
      - `user`: User object
        - `id`: String
        - `name`: String

#### Create Recipe

- **URL:** `/recipes`
- **Method:** `POST`
- **Description:** Creates a new recipe.
- **Request Body:**
  - `name`: String
  - `description`: String
  - `image`: Image file
  - `ingredients`: Array of ingredients
  - `prep_time`: Number
  - `calories`: Number
  - `vegetarian`: Boolean
  - `diet`: String
  - `category`: String
  - `subcategory`: String
- **Response Body:**
  - `message`: String
  - `document`: Object
    - `id`: String
    - `name`: String
    - `description`: String
    - `image`: String
    - `ingredients`: Array of ingredients
    - `prep_time`: Number
    - `calories`: Number
    - `vegetarian`: Boolean
    - `diet`: String
    - `ratingsAverage`: Number
    - `ratingsQuantity`: Number
    - `category`: Category object
      - `id`: String
      - `name`: String
    - `subcategory`: Subcategory object
      - `id`: String
      - `name`: String

#### Update Recipe

- **URL:** `/recipes/{id}`
- **Method:** `PUT`
- **Description:** Updates a recipe by id.
- **Request Body:**
  - `name`: String
  - `description`: String
  - `image`: Image file
  - `ingredients`: Array of ingredients
  - `prep_time`: Number
  - `calories`: Number
  - `vegetarian`: Boolean
  - `diet`: String
  - `category`: String
  - `subcategory`: String
- **Response Body:**
  - `message`: String
  - `document`: Object
    - `id`: String
    - `name`: String
    - `description`: String
    - `image`: String
    - `ingredients`: Array of ingredients
    - `prep_time`: Number
    - `calories`: Number
    - `vegetarian`: Boolean
    - `diet`: String
    - `ratingsAverage`: Number
    - `ratingsQuantity`: Number
    - `category`: Category object
      - `id`: String
      - `name`: String
    - `subcategory`: Subcategory object
      - `id`: String
      - `name`: String

#### Delete Recipe

- **URL:** `/recipes/{id}`
- **Method:** `DELETE`
- **Description:** Deletes a recipe by id.
- **Response Body:**
  - `message`: String
  - `document`: Object
    - `id`: String
    - `name`: String
    - `description`: String
    - `image`: String
    - `ingredients`: Array of ingredients
    - `prep_time`: Number
    - `calories`: Number
    - `vegetarian`: Boolean
    - `diet`: String
    - `ratingsAverage`: Number
    - `ratingsQuantity`: Number
    - `category`: Category object
      - `id`: String
      - `name`: String
    - `subcategory`: Subcategory object
      - `id`: String
      - `name`: String

#### Get All Recipes of a Category

- **URL:** `/categories/{id}/recipes`
- **Method:** `GET`
- **Description:** Gets all recipes of a category.
- **Response Body:**
  - `documents`: Array of recipe objects
    - `id`: String
    - `name`: String
    - `description`: String
    - `image`: String
    - `ingredients`: Array of ingredients
    - `prep_time`: Number
    - `calories`: Number
    - `vegetarian`: Boolean
    - `diet`: String
    - `ratingsAverage`: Number
    - `ratingsQuantity`: Number
    - `category`: Category object
      - `id`: String
      - `name`: String
    - `subcategory`: Subcategory object
      - `id`: String
      - `name`: String

#### Get All Recipes of a Subcategory

- **URL:** `/subcategories/{id}/recipes`
- **Method:** `GET`
- **Description:** Gets all recipes of a subcategory.
- **Response Body:**
  - `documents`: Array of recipe objects
    - `id`: String
    - `name`: String
    - `description`: String
    - `image`: String
    - `ingredients`: Array of ingredients
    - `prep_time`: Number
    - `calories`: Number
    - `vegetarian`: Boolean
    - `diet`: String
    - `ratingsAverage`: Number
    - `ratingsQuantity`: Number
    - `category`: Category object
      - `id`: String
      - `name`: String
    - `subcategory`: Subcategory object
      - `id`: String
      - `name`: String

### Collection Endpoints

#### Get Collection

- **URL:** `/collections/{id}`
- **Method:** `GET`
- **Description:** Gets a collection from a user.
- **Request Headers:**
  - `Authorization`: Bearer {jwt token}
- **Response Body:**
  - `collection`: collection object
    - `id`: String
    - `name`: String
    - `recipes`: Array of recipe objects

#### Create Collection

- **URL:** `/collections`
- **Method:** `POST`
- **Description:** Adds a collection to a user.
- **Request Headers:**
  - `Authorization`: Bearer {jwt token}
- **Request Body:**
  - `name`: String
- **Response Body:**
  - `message`: String
  - `document`: User object
    - `id`: String
    - `name`: String
    - `email`: String
    - `collections`: Array of collection objects
      - `id`: String
      - `name`: String
      - `recipes`: Array of recipe objects

#### Update Collection

- **URL:** `/collections/{id}`
- **Method:** `PUT`
- **Description:** Updates a user's collection.
- **Request Headers:**
  - `Authorization`: Bearer {jwt token}
- **Request Body:**
  - `name`: String
- **Response Body:**
  - `message`: String
  - `document`: User object
    - `id`: String
    - `name`: String
    - `email`: String
    - `collections`: Array of collection objects
      - `id`: String
      - `name`: String
      - `recipes`: Array of recipe objects

#### Delete Collection

- **URL:** `/collections/{id}`
- **Method:** `DELETE`
- **Description:** Deletes a collection from a user.
- **Request Headers:**
  - `Authorization`: Bearer {jwt token}
- **Response Body:**
  - `message`: String
  - `document`: User object
    - `id`: String
    - `name`: String
    - `email`: String
    - `collections`: Array of collection objects
      - `id`: String
      - `name`: String
      - `recipes`: Array of recipe objects

#### Add Recipe to Collection

- **URL:** `/collections/{id}/recipes`
- **Method:** `PUT`
- **Description:** Adds a recipe to a user's collection.
- **Request Headers:**
  - `Authorization`: Bearer {jwt token}
- **Request Body:**
  - `recipe`: String
- **Response Body:**
  - `message`: String
  - `document`: User object
    - `id`: String
    - `name`: String
    - `email`: String
    - `collections`: Array of collection objects
      - `id`: String
      - `name`: String
      - `recipes`: Array of recipe objects

#### Delete Recipe from Collection

- **URL:** `/collections/{id}/recipes`
- **Method:** `DELETE`
- **Description:** Deletes a recipe from a user's collection.
- **Request Headers:**
  - `Authorization`: Bearer {jwt token}
- **Request Body:**
  - `recipe`: String
- **Response Body:**
  - `message`: String
  - `document`: User object
    - `id`: String
    - `name`: String
    - `email`: String
    - `collections`: Array of collection objects
      - `id`: String
      - `name`: String
      - `recipes`: Array of recipe objects

### Review Endpoints

#### Get All Reviews

- **URL:** `/reviews`
- **Method:** `GET`
- **Description:** Gets all reviews.
- **Response Body:**
  - `documents`: Array of review objects
    - `id`: String
    - `title`: String
    - `rating`: Number
    - `recipe`: Recipe object
      - `id`: String
      - `name`: String
    - `user`: User object
      - `id`: String
      - `name`: String

#### Get Review

- **URL:** `/reviews/{id}`
- **Method:** `GET`
- **Description:** Gets a review by id.
- **Response Body:**
  - `document`: Array with one review object
    - `id`: String
    - `title`: String
    - `rating`: Number
    - `recipe`: Recipe object
      - `id`: String
      - `name`: String
    - `user`: User object
      - `id`: String
      - `name`: String

#### Create Review

- **URL:** `/reviews`
- **Method:** `POST`
- **Description:** Creates a new review.
- **Headers:**
  - `Authorization`: Bearer {jwt token}
- **Request Body:**
  - `title`: String
  - `rating`: Number
  - `recipe`: String
- **Response Body:**
  - `message`: String
  - `document`: Object
    - `id`: String
    - `title`: String
    - `rating`: Number
    - `recipe`: String
    - `user`: String

#### Update Review

- **URL:** `/reviews/{id}`
- **Method:** `PUT`
- **Description:** Updates a review by id.
- **Headers:**
  - `Authorization`: Bearer {jwt token}
- **Request Body:**
  - `title`: String
  - `rating`: Number
  - `recipe`: String
- **Response Body:**
  - `message`: String
  - `document`: Object
    - `id`: String
    - `title`: String
    - `rating`: Number
    - `recipe`: Recipe object
      - `id`: String
      - `name`: String
    - `user`: User object
      - `id`: String
      - `name`: String

#### Delete Review

- **URL:** `/reviews/{id}`
- **Method:** `DELETE`
- **Description:** Deletes a review by id.
- **Headers:**
  - `Authorization`: Bearer {jwt token}
- **Response Body:**
  - `message`: String
  - `document`: Object
    - `id`: String
    - `title`: String
    - `rating`: Number
    - `recipe`: String
    - `user`: String

### Search Endpoints

#### Search Recipes

- **URL:** `/recipes?search={query}`
- **Method:** `GET`
- **Description:** Searches for recipes by keyword.
- **Response Body:**
  - `documents`: Array of recipe objects
    - `id`: String
    - `name`: String
    - `description`: String
    - `image`: String
    - `ingredients`: Array of ingredients
    - `prep_time`: Number
    - `calories`: Number
    - `vegetarian`: Boolean
    - `diet`: String
    - `ratingsAverage`: Number
    - `ratingsQuantity`: Number
    - `category`: Array of category objects
      - `id`: String
      - `name`: String
    - `subcategory`: Array of subcategory objects
      - `id`: String
      - `name`: String

---

## Contributors

- [Fady Alaa](https://www.linkedin.com/in/fady-alaa/) - Software Engineer
