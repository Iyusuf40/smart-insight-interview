<template>
    <h1>Autobots, Posts, and Comments API Documentation</h1>

    <h2>Base URL</h2>
    <p><code>http://localhost:3000/</code></p>

    <h2>Endpoints Overview</h2>
    <ul>
        <li><strong>Autobots</strong>
            <ul>
                <li><code>GET /autobots</code>: Fetch a paginated list of Autobots.</li>
                <li><code>GET /autobots/:id</code>: Fetch a specific Autobot by ID.</li>
            </ul>
        </li>
        <li><strong>Posts</strong>
            <ul>
                <li><code>GET /posts</code>: Fetch a paginated list of posts, optionally filtered by Autobot ID.</li>
                <li><code>GET /posts/:id</code>: Fetch a specific post by ID.</li>
            </ul>
        </li>
        <li><strong>Comments</strong>
            <ul>
                <li><code>GET /comments?postId=&lt;postId&gt;</code>: Fetch all comments for a specific post.</li>
                <li><code>GET /comments/:id</code>: Fetch a specific comment by ID.</li>
            </ul>
        </li>
    </ul>

    <hr />

    <h2>Autobots API</h2>

    <h3>1. Get Autobots</h3>
    <p><span class="endpoint">GET /autobots</span></p>
    <p><strong>Description:</strong> Retrieves a paginated list of Autobots.</p>
    <p><strong>Query Parameters:</strong></p>
    <ul>
        <li><code>limit</code> (optional, integer): The number of Autobots to retrieve per page. Default is <code>10</code>.</li>
        <li><code>page</code> (optional, integer): The page number to retrieve. Default is <code>1</code>.</li>
    </ul>
    <p><strong>Response:</strong></p>
    <ul>
        <li><code>200 OK</code>: Returns an array of Autobots.</li>
        <li><code>500 Internal Server Error</code>: If there is an issue with fetching Autobots.</li>
    </ul>
    <p><strong>Response Body:</strong></p>
    <pre><code>[
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
]</code></pre>
    <p><strong>Example Request:</strong> <code>GET /autobots?limit=5&page=2</code></p>

    <h3>2. Get Autobot by ID</h3>
    <p><span class="endpoint">GET /autobots/:id</span></p>
    <p><strong>Description:</strong> Retrieves details of a specific Autobot by its ID.</p>
    <p><strong>Path Parameters:</strong></p>
    <ul>
        <li><code>id</code> (required, integer): The ID of the Autobot to retrieve.</li>
    </ul>
    <p><strong>Response:</strong></p>
    <ul>
        <li><code>200 OK</code>: Returns the Autobot object.</li>
        <li><code>404 Not Found</code>: If the Autobot with the specified ID does not exist.</li>
        <li><code>500 Internal Server Error</code>: If there is an issue with fetching the Autobot.</li>
    </ul>
    <p><strong>Response Body:</strong></p>
    <pre><code>{
  "id": 1,
  "name": "Optimus Prime",
  "username": "optimus",
  "email": "optimus@autobots.com"
}</code></pre>

    <h2>Posts API</h2>

    <h3>1. Get Posts</h3>
    <p><span class="endpoint">GET /posts</span></p>
    <p><strong>Description:</strong> Retrieves a paginated list of posts.</p>
    <p><strong>Query Parameters:</strong></p>
    <ul>
        <li><code>limit</code> (optional, integer): The number of posts to retrieve per page. Default is <code>10</code>.</li>
        <li><code>page</code> (optional, integer): The page number to retrieve. Default is <code>1</code>.</li>
        <li><code>autobotId</code> (optional, integer): The posts made by the Autobot with this ID.</li>
    </ul>
    <p><strong>Response:</strong></p>
    <ul>
        <li><code>200 OK</code>: Returns an array of posts.</li>
        <li><code>500 Internal Server Error</code>: If there is an issue with fetching posts.</li>
    </ul>
    <p><strong>Response Body:</strong></p>
    <pre><code>[
  {
    "id": 1,
    "title": "Optimus Prime",
    "body": "optimus",
    "autobotId": 1
  },
  {
    "id": 2,
    "title": "Bumblebee",
    "body": "bumblebee",
    "autobotId": 1
  }
  // More Posts...
]</code></pre>
    <p><strong>Example Request:</strong> <code>GET /posts?limit=5&page=2</code></p>

    <h3>2. Get Post by ID</h3>
    <p><span class="endpoint">GET /posts/:id</span></p>
    <p><strong>Description:</strong> Retrieves details of a specific post by its ID.</p>
    <p><strong>Path Parameters:</strong></p>
    <ul>
        <li><code>id</code> (required, integer): The ID of the post to retrieve.</li>
    </ul>
    <p><strong>Response:</strong></p>
    <ul>
        <li><code>200 OK</code>: Returns the post object.</li>
        <li><code>404 Not Found</code>: If the post with the specified ID does not exist.</li>
        <li><code>500 Internal Server Error</code>: If there is an issue with fetching the post.</li>
    </ul>
    <p><strong>Response Body:</strong></p>
    <pre><code>{
  "id": 1,
  "title": "Optimus Prime",
  "body": "optimus",
  "autobotId": 1
}</code></pre>

    <h2>Comments API</h2>

    <h3>1. Get Comments</h3>
    <p><span class="endpoint">GET /comments?postId=&lt;postId&gt;</span></p>
    <p><strong>Description:</strong> Retrieves a list of comments for a specific post.</p>
    <p><strong>Query Parameters:</strong></p>
    <ul>
        <li><code>postId</code> (required, integer): The ID of the post to fetch comments for.</li>
    </ul>
    <p><strong>Response:</strong></p>
    <ul>
        <li><code>200 OK</code>: Returns an array of comments.</li>
        <li><code>500 Internal Server Error</code>: If there is an issue with fetching comments.</li>
    </ul>
    <p><strong>Response Body:</strong></p>
    <pre><code>[
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
]</code></pre>
    <p><strong>Example Request:</strong> <code>GET /comments?postId=1</code></p>

    <h3>2. Get Comment by ID</h3>
    <p><span class="endpoint">GET /comments/:id</span></p>
    <p><strong>Description:</strong> Retrieves details of a specific comment by its ID.</p>
    <p><strong>Path Parameters:</strong></p>
    <ul>
        <li><code>id</code> (required, integer): The ID of the comment to retrieve.</li>
    </ul>
    <p><strong>Response:</strong></p>
    <ul>
        <li><code>200 OK</code>: Returns the comment object.</li>
        <li><code>404 Not Found</code>: If the comment with the specified ID does not exist.</li>
        <li><code>500 Internal Server Error</code>: If there is an issue with fetching the comment.</li>
    </ul>
    <p><strong>Response Body:</strong></p>
    <pre><code>{
  "id": 1,
  "name": "Optimus Prime",
  "body": "optimus",
  "email": "optimus@autobots.com"
}</code></pre>


</template>

<style>
        code {
            padding: 2px 4px;
            border-radius: 4px;
        }
        pre {
            padding: 10px;
            border-radius: 4px;
            overflow-x: auto;
        }
        .endpoint {
            padding: 4px 6px;
            border-radius: 4px;
            font-weight: bold;
        }
</style>
