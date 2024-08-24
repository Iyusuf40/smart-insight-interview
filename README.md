# smart-insight-interview

## setup
**Using docker - RECOMMENDED**

RUN

`docker pull iyusuf40/smart-insight-ai:latest`

`docker run -d -p 8081:8081 -p 3000:3000 --name smart-ai-cont iyusuf40/smart-insight-ai:latest`

you can then view the frontend at `http://localhost:8081/`
and the api can be reached at `http://localhost:3000/`

**Using Local system**
- ensure you have node, redis and mysql installed
- in project root run `<shell> startApp.sh`
- where shell is your default shell e.g `bash startApp.sh`
- api is at `http://localhost:3000/`
- while frontend app is at `http://localhost:8081/`

# API Documentation - Autobots, Posts, and Comments

## Base URL
`http://localhost:3000/`


## Endpoints Overview

- **Autobots**
  - `GET /autobots`: Fetch a paginated list of Autobots.
  - `GET /autobots/:id`: Fetch a specific Autobot by ID.

- **Posts**
  - `GET /posts`: Fetch a paginated list of posts, optionally filtered by Autobot ID.
  - `GET /posts/:id`: Fetch a specific post by ID.

- **Comments**
  - `GET /comments?postId=<postId>`: Fetch all comments for a specific post.
  - `GET /comments/:id`: Fetch a specific comment by ID.

---

## Autobots API

### 1. Get Autobots

**Endpoint**: `GET /autobots`

**Description**: Retrieves a paginated list of Autobots.

**Query Parameters**:
- `limit` (optional, integer): The number of Autobots to retrieve per page. Default is `10`.
- `page` (optional, integer): The page number to retrieve. Default is `1`.

**Response**:
- `200 OK`: Returns an array of Autobots.
- `500 Internal Server Error`: If there is an issue with fetching Autobots.

**Response Body**:
```json
[
  {
    "id": 1,
    "name": "Optimus Prime",
    "username": "optimus",
    "email": "optimus@autobots.com"
  },
  {
    "id": 2,
    "name": "Bumblebee",
    "username": "bumblebee",
    "email": "bumblebee@autobots.com"
  }
  // More Autobots...
]
```

**Example Request**

`GET /autobots?limit=5&page=2`


### 2. Get Autobot by ID

**Endpoint**: `GET /autobots/:id`

**Description**: Retrieves details of a specific Autobot by its ID.

**Path Parameters**:

- `id` (required, integer): The ID of the Autobot to retrieve.

**Response**:

- `200 OK`: Returns the Autobot object.
- `404 Not Found`: If the Autobot with the specified ID does not exist.
- `500 Internal Server Error`: If there is an issue with fetching the Autobot.

**Response Body**:

```json
{
  "id": 1,
  "name": "Optimus Prime",
  "username": "optimus",
  "email": "optimus@autobots.com"
}
```

## Autobots API

### 1. Get Autobots

**Endpoint**: `GET /autobots`

**Description**: Retrieves a paginated list of Autobots.

**Query Parameters**:
- `limit` (optional, integer): The number of Autobots to retrieve per page. Default is `10`.
- `page` (optional, integer): The page number to retrieve. Default is `1`.

**Response**:
- `200 OK`: Returns an array of Autobots.
- `500 Internal Server Error`: If there is an issue with fetching Autobots.

**Response Body**:
```json
[
  {
    "id": 1,
    "name": "Optimus Prime",
    "username": "optimus",
    "email": "optimus@autobots.com"
  },
  {
    "id": 2,
    "name": "Bumblebee",
    "username": "bumblebee",
    "email": "bumblebee@autobots.com"
  }
  // More Autobots...
]
```

**Example Request**

`GET /autobots?limit=5&page=2`


### 2. Get Autobot by ID

**Endpoint**: `GET /autobots/:id`

**Description**: Retrieves details of a specific Autobot by its ID.

**Path Parameters**:

- `id` (required, integer): The ID of the Autobot to retrieve.

**Response**:

- `200 OK`: Returns the Autobot object.
- `404 Not Found`: If the Autobot with the specified ID does not exist.
- `500 Internal Server Error`: If there is an issue with fetching the Autobot.

**Response Body**:

```json
{
  "id": 1,
  "name": "Optimus Prime",
  "username": "optimus",
  "email": "optimus@autobots.com"
}
```

## Posts API

### 1. Get Posts

**Endpoint**: `GET /posts`

**Description**: Retrieves a paginated list of posts.

**Query Parameters**:
- `limit` (optional, integer): The number of Autobots to retrieve per page. Default is `10`.
- `page` (optional, integer): The page number to retrieve. Default is `1`.
- `autobotId` (optional, integer): The posts made by autobot with id autobotId to retrieve. Default is `1`.

**Response**:
- `200 OK`: Returns an array of Posts.
- `500 Internal Server Error`: If there is an issue with fetching Posts.

**Response Body**:
```json
[
  {
    "id": 1,
    "title": "Optimus Prime",
    "body": "optimus",
    "autoBotId": 1
  },
  {
    "id": 2,
    "title": "Bumblebee",
    "body": "bumblebee",
    "autoBotId": 1
  }
  // More Posts...
]
```

**Example Request**

`GET /posts?limit=5&page=2`


### 2. Get Posts by ID

**Endpoint**: `GET /posts/:id`

**Description**: Retrieves details of a specific Post by its ID.

**Path Parameters**:

- `id` (required, integer): The ID of the Autobot to retrieve.

**Response**:

- `200 OK`: Returns the Autobot object.
- `404 Not Found`: If the Autobot with the specified ID does not exist.
- `500 Internal Server Error`: If there is an issue with fetching the Autobot.

**Response Body**:

```json
 {
    "id": 1,
    "title": "Optimus Prime",
    "body": "optimus",
    "autoBotId": 1
  }
```

## Comments API

### 1. Get Comments

**Endpoint**: `GET /comments?postId=<postId>`

**Description**: Retrieves a paginated list of posts.

**Query Parameters**:
- `postId` (required): The comments made for post with id postId.

**Response**:
- `200 OK`: Returns an array of Comments.
- `500 Internal Server Error`: If there is an issue with fetching Comments.

**Response Body**:
```json
[
  {
    "id": 1,
    "name": "Optimus Prime",
    "body": "optimus",
    "email": "optimus@autobots.com"
  },
  {
    "id": 2,
    "name": "Bumblebee",
    "body": "bumblebee",
    "email": "bumblebee@autobots.com"
  }
  // More Comments...
]
```

**Example Request**

`GET /comments?postId=<postId>`


### 2. Get Comments by ID

**Endpoint**: `GET /comments/:id`

**Description**: Retrieves details of a specific Comment by its ID.

**Path Parameters**:

- `id` (required, integer): The ID of the Autobot to retrieve.

**Response**:

- `200 OK`: Returns the Comment object.
- `404 Not Found`: If the Comment with the specified ID does not exist.
- `500 Internal Server Error`: If there is an issue with fetching the Autobot.

**Response Body**:

```json
 {
    "id": 1,
    "name": "Optimus Prime",
    "body": "optimus",
    "email": "optimus@autobots.com"
  }
```