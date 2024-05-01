# Stock Manager API

This is a Stock Manager API built using TypeScript, Prisma, Node.js, and Express. It allows you to manage the inventory of products, including functionalities for adding, listing, updating, and deleting products, as well as managing categories.

## Design Principles
SOLID Principles: The codebase follows the principles of SOLID (Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion) to create a more maintainable and scalable application architecture.

MVC Architecture: The application architecture follows the Model-View-Controller (MVC) pattern, separating concerns into models for data handling, views for rendering, and controllers for business logic.

## Features

### Product Management:

Create new products,
List all products,
Get product by ID,
Update product details,
Delete a product,

### Category Management:

Create new categories,
List all categories,
Get category by ID,
Update category details,
Delete a category,

### Stock Management:

Record product stock in and out movements

## Usage

### Clone the repository
```bash
git clone https://github.com/RafaelCarvalhoxd/StockManager-API.git
```

### Install Dependencies

Install dependencies on the front-end and back-end

```bash
npm install
```

### Express Server

```bash
npm run dev
```

## REST Endpoints

### Products

| Endpoint       | Description    | Method | Body                    |
| -------------- | -------------- | ------ | ----------------------- |
| /products/     | Get all ideas  | GET    | None                    |
| /products/:id | Get product by id | GET    | None                    |
| /products/     | Add product      | POST   | { name, price, categoryId: { id: } }|
| /products/:id/stockin    | Stock in      | POST   | { amount} |
| /products/:id/stockout    | Stock out       | POST   | { amount } |
| /products/:id | Update product    | PUT    | { name, price, categoryId } |
| /products/:id | Delete product  | DELETE | None |

### Categories

| Endpoint       | Description    | Method | Body                    |
| -------------- | -------------- | ------ | ----------------------- |
| /categories/     | Get all categories | GET    | None                    |
| /categories/:id | Get categorie by id | GET    | None                    |
| /categories/     | Add product      | POST   | { name } |
| /categories/:id | Update categorie   | PUT    | { name }|
| /categories/:id | Delete categorie | DELETE | None |


