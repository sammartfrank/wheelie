# fe-interview-backend

This repository contains a local mock backend server for the brightwheel frontend coding challenge as well as an empty React app using `create-react-app`, which you should use as a starting point.

## Getting started

Install project dependencies

```
yarn install
```

Start the frontend and the mock backend together

```
yarn start:mock
```

Or start the backend by itself

```
yarn start:api
```

This will create a locally hosted backend that you can access at `http://localhost:3001`

### Data models

This database will create a random collection of Products, Animals, and Companies for you to connect your app to. The data is re-generated each time you start the server.

```typescript
interface Product {
    type: 'product';
    id: string;
    starred: boolean;
    name: string;
    productCategory: string;
    previewText: string;
    image?: string;
}

interface Address {
    address1: string;
    address2?: string;
    city: string;
    state: string;
    postalCode: string;
}

interface Company {
    type: 'company';
    id: string;
    starred: boolean;
    name: string;
    description: string;
    address: Address;
}

interface Taxonomy {
    family: string;
    scientificName: string;
}

interface Animal = {
    type: 'animal';
    id: string;
    starred: boolean;
    taxonomy: Taxonomy;
    name: string;
    image?: string;
}
```

### Supported routes

```
GET    /search
GET    /search/:id
POST   /search
PUT    /search/:id
PATCH  /search/:id
DELETE /search/:id
```

When doing requests, it's good to know that:

- If you make POST, PUT, PATCH or DELETE requests, changes will be automatically and safely saved to `db.json` using [lowdb](https://github.com/typicode/lowdb).
- Changes will persist so long as the server is running and will be overwritten next time the server is started
- Your request body JSON should be object enclosed, just like the GET output. (for example `{"name": "Foobar"}`)
- Id values are not mutable. Any `id` value in the body of your PUT or PATCH request will be ignored. Only a value set in a POST request will be respected, but only if not already taken.
- A POST, PUT or PATCH request should include a `Content-Type: application/json` header to use the JSON in the request body. Otherwise it will return a 2XX status code, but no changes will be made to the data.

### Search

Add `q` to search ALL the fields for a string

```
GET /search?q=fish
```

Search individual fields by field name. Use `.` to access deep properties

```
GET /search?id=animal.5
GET /search?name=snake
GET /search?taxonomy.family=dog
```

Add `_like` to filter (RegExp supported)

```
GET /search?name_like=cat
```

### Full-text search

### Paginate

Use `_page` and optionally `_limit` to paginate returned data.

In the `Link` header you'll get `first`, `prev`, `next` and `last` links.

```
GET /search?_page=7
GET /search?_page=7&_limit=20
```

By default ALL matching results are returned
