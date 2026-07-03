# LABAS E-Commerce API Documentation

## Base URL
- **Production (Placeholder):** `https://your-backend.onrender.com/api`
- **Local:** `http://localhost:5000/api`

## Authentication
This API uses **JSON Web Tokens (JWT)** for authentication.
- **Obtaining a token:** Tokens are returned upon successful login (`/api/auth/login` or `/api/admin/login`) or registration (`/api/auth/register`, `/api/admin/setup`). The token is typically provided in a cookie and/or JSON response depending on the `sendTokenResponse` utility.
- **Sending the token:** Protected routes expect the token in the `Authorization` header as a Bearer token: 
  `Authorization: Bearer <your_jwt_token_here>`
- **Invalid/Expired Tokens:** Requests with missing, invalid, or expired tokens will receive a `401 Unauthorized` response. Accessing admin routes with a regular user token will return a `403 Forbidden` response.

## File Uploads
- Endpoints handling file uploads expect a `multipart/form-data` request.
- **Product Images:** `POST /api/admin/upload/product` accepts an array of files under the field name `images` (maximum 10 files).
- **Allowed Types:** JPG, PNG, WebP.
- **Size Limit:** 5MB per file.

---

## Health Check

### 1. Health Check
- **HTTP Method:** GET
- **Path:** `/api/health`
- **Description:** Checks if the API is running.
- **Authentication Required:** No
- **Success Response (200):**
  ```json
  {
    "success": true,
    "message": "LABAS API is running"
  }
  ```

---

## Authentication Routes

### 1. Register User
- **HTTP Method:** POST
- **Path:** `/api/auth/register`
- **Description:** Registers a new standard user.
- **Authentication Required:** No
- **Request Body:**
  - `name` (String, required)
  - `email` (String, required, must be valid email format)
  - `password` (String, required, min 6 characters)
- **Success Response (201):** *(Returns JWT token)*
  ```json
  {
    "success": true,
    "token": "eyJhbGci..."
  }
  ```
- **Error Responses:** 
  - `400 Bad Request` (Email already exists / Validation errors)

### 2. Login User
- **HTTP Method:** POST
- **Path:** `/api/auth/login`
- **Description:** Authenticates a user and returns a token.
- **Authentication Required:** No
- **Request Body:**
  - `email` (String, required, valid email format)
  - `password` (String, required)
- **Success Response (200):** *(Returns JWT token)*
  ```json
  {
    "success": true,
    "token": "eyJhbGci..."
  }
  ```
- **Error Responses:**
  - `401 Unauthorized` (Invalid credentials)

### 3. Forgot Password
- **HTTP Method:** POST
- **Path:** `/api/auth/forgot-password`
- **Description:** Sends a password reset link to the user's email.
- **Authentication Required:** No
- **Request Body:**
  - `email` (String, required, valid email format)
- **Success Response (200):**
  ```json
  {
    "success": true,
    "message": "Password reset email sent"
  }
  ```
- **Error Responses:**
  - `404 Not Found` (No account with that email)
  - `500 Internal Server Error` (Email could not be sent)

### 4. Reset Password
- **HTTP Method:** POST
- **Path:** `/api/auth/reset-password/:token`
- **Description:** Resets the password using a valid token.
- **Authentication Required:** No
- **Request Params:**
  - `token` (String) - Reset token received in email
- **Request Body:**
  - `password` (String, required, min 6 characters)
- **Success Response (200):** *(Returns new JWT token)*
  ```json
  {
    "success": true,
    "token": "eyJhbGci..."
  }
  ```
- **Error Responses:**
  - `400 Bad Request` (Invalid or expired reset token)

### 5. Get Current User (Me)
- **HTTP Method:** GET
- **Path:** `/api/auth/me`
- **Description:** Retrieves the logged-in user's details.
- **Authentication Required:** Yes (User or Admin)
- **Success Response (200):**
  ```json
  {
    "success": true,
    "user": {
      "_id": "60d5ec...",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    }
  }
  ```

---

## Product Routes

### 1. Get All Products
- **HTTP Method:** GET
- **Path:** `/api/products`
- **Description:** Retrieves a list of products with optional filtering.
- **Authentication Required:** No
- **Query Params:**
  - `category` (String)
  - `subCategory` (String)
  - `search` (String) - Searches name, category, subCategory, description, and productId.
  - `bestseller` (String: "true")
- **Success Response (200):**
  ```json
  {
    "success": true,
    "count": 1,
    "products": [
      {
        "_id": "60d5ec...",
        "name": "Classic T-Shirt",
        "price": 999,
        "category": "Men"
      }
    ]
  }
  ```

### 2. Get Product By ID
- **HTTP Method:** GET
- **Path:** `/api/products/:id`
- **Description:** Retrieves a single product by its database ID.
- **Authentication Required:** No
- **Request Params:**
  - `id` (String) - Product ID
- **Success Response (200):**
  ```json
  {
    "success": true,
    "product": { ... }
  }
  ```
- **Error Responses:**
  - `404 Not Found` (Product not found)

### 3. Create Product
- **HTTP Method:** POST
- **Path:** `/api/products`
- **Description:** Creates a new product.
- **Authentication Required:** Yes (Admin)
- **Request Body:** Standard product fields (e.g., name, description, price, stock, category, subCategory, sizes, careInstructions, image array, bestseller).
- **Success Response (201):**
  ```json
  {
    "success": true,
    "product": { ... }
  }
  ```

### 4. Update Product
- **HTTP Method:** PUT
- **Path:** `/api/products/:id`
- **Description:** Updates an existing product.
- **Authentication Required:** Yes (Admin)
- **Request Params:**
  - `id` (String)
- **Request Body:** Fields to update.
- **Success Response (200):**
  ```json
  {
    "success": true,
    "product": { ... }
  }
  ```
- **Error Responses:**
  - `404 Not Found` (Product not found)

### 5. Delete Product
- **HTTP Method:** DELETE
- **Path:** `/api/products/:id`
- **Description:** Deletes a product.
- **Authentication Required:** Yes (Admin)
- **Request Params:**
  - `id` (String)
- **Success Response (200):**
  ```json
  {
    "success": true,
    "message": "Product deleted"
  }
  ```
- **Error Responses:**
  - `404 Not Found` (Product not found)

---

## Order Routes

### 1. Create Order
- **HTTP Method:** POST
- **Path:** `/api/orders`
- **Description:** Creates a new order for the authenticated user.
- **Authentication Required:** Yes (User)
- **Request Body:**
  - `items` (Array of Objects, required) - e.g., `[{ "productId": "...", "quantity": 1, "size": "M" }]`
  - `shippingAddress` (Object, required)
  - `paymentMethod` (String, required)
- **Success Response (201):**
  ```json
  {
    "success": true,
    "order": {
      "user": "60d5ec...",
      "items": [...],
      "totalPrice": 1198,
      "status": "Processing"
    }
  }
  ```
- **Error Responses:**
  - `400 Bad Request` (No order items / Missing shipping or payment)
  - `404 Not Found` (A product in the order was not found)

### 2. Get My Orders
- **HTTP Method:** GET
- **Path:** `/api/orders`
- **Description:** Retrieves all orders placed by the logged-in user.
- **Authentication Required:** Yes (User)
- **Success Response (200):**
  ```json
  {
    "success": true,
    "count": 2,
    "orders": [...]
  }
  ```

### 3. Get Order By ID
- **HTTP Method:** GET
- **Path:** `/api/orders/:id`
- **Description:** Retrieves a specific order (if it belongs to the logged-in user).
- **Authentication Required:** Yes (User)
- **Request Params:**
  - `id` (String) - Order ID
- **Success Response (200):**
  ```json
  {
    "success": true,
    "order": { ... }
  }
  ```
- **Error Responses:**
  - `403 Forbidden` (Not authorized to view this order)
  - `404 Not Found` (Order not found)

---

## Wishlist Routes

### 1. Get Wishlist
- **HTTP Method:** GET
- **Path:** `/api/wishlist`
- **Description:** Retrieves the logged-in user's wishlist.
- **Authentication Required:** Yes (User)
- **Success Response (200):**
  ```json
  {
    "success": true,
    "products": [...]
  }
  ```

### 2. Add to Wishlist
- **HTTP Method:** POST
- **Path:** `/api/wishlist`
- **Description:** Adds a product to the user's wishlist.
- **Authentication Required:** Yes (User)
- **Request Body:**
  - `productId` (String, required)
- **Success Response (200):**
  ```json
  {
    "success": true,
    "products": ["60d5ec..."]
  }
  ```
- **Error Responses:**
  - `400 Bad Request` (Product ID is required)
  - `404 Not Found` (Product not found)

### 3. Remove from Wishlist
- **HTTP Method:** DELETE
- **Path:** `/api/wishlist/:productId`
- **Description:** Removes a product from the user's wishlist.
- **Authentication Required:** Yes (User)
- **Request Params:**
  - `productId` (String)
- **Success Response (200):**
  ```json
  {
    "success": true,
    "products": []
  }
  ```
- **Error Responses:**
  - `404 Not Found` (Wishlist not found)

---

## Contact Routes

### 1. Submit Contact Form
- **HTTP Method:** POST
- **Path:** `/api/contact`
- **Description:** Submits a message via the contact form and sends an email notification.
- **Authentication Required:** No
- **Request Body:**
  - `name` (String, required)
  - `email` (String, required, valid email format)
  - `message` (String, required, max 1000 characters)
- **Success Response (201):**
  ```json
  {
    "success": true,
    "message": "Your message has been sent successfully",
    "data": { ... }
  }
  ```

---

## Admin Routes

### 1. Check Admin Exists
- **HTTP Method:** GET
- **Path:** `/api/admin/setup-check`
- **Description:** Checks if any admin account exists (used for initial setup flow).
- **Authentication Required:** No
- **Success Response (200):**
  ```json
  {
    "success": true,
    "exists": false
  }
  ```

### 2. Admin Setup
- **HTTP Method:** POST
- **Path:** `/api/admin/setup`
- **Description:** Creates the first admin account. Fails if an admin already exists.
- **Authentication Required:** No
- **Rate Limiting:** Max 10 requests per 15 minutes.
- **Request Body:**
  - `name` (String, required)
  - `email` (String, required, valid email format)
  - `password` (String, required, min 6 characters)
- **Success Response (201):** *(Returns JWT token)*
  ```json
  {
    "success": true,
    "token": "eyJhbGci..."
  }
  ```
- **Error Responses:**
  - `400 Bad Request` (Admin already exists. Setup blocked.)

### 3. Admin Login
- **HTTP Method:** POST
- **Path:** `/api/admin/login`
- **Description:** Authenticates an admin.
- **Authentication Required:** No
- **Rate Limiting:** Max 10 requests per 15 minutes.
- **Request Body:**
  - `email` (String, required, valid email format)
  - `password` (String, required)
- **Success Response (200):** *(Returns JWT token)*
  ```json
  {
    "success": true,
    "token": "eyJhbGci..."
  }
  ```
- **Error Responses:**
  - `401 Unauthorized` (Invalid credentials)
  - `403 Forbidden` (Access denied. Admin only.)

### 4. Get Dashboard Stats
- **HTTP Method:** GET
- **Path:** `/api/admin/dashboard`
- **Description:** Retrieves aggregate statistics for the admin dashboard.
- **Authentication Required:** Yes (Admin)
- **Success Response (200):**
  ```json
  {
    "success": true,
    "stats": {
      "totalUsers": 15,
      "totalOrders": 120,
      "revenue": 50000,
      "totalProducts": 45
    },
    "recentOrders": [...]
  }
  ```

### 5. Get All Users
- **HTTP Method:** GET
- **Path:** `/api/admin/users`
- **Description:** Retrieves all users with optional search.
- **Authentication Required:** Yes (Admin)
- **Query Params:**
  - `search` (String) - Searches name and email
- **Success Response (200):**
  ```json
  {
    "success": true,
    "users": [...]
  }
  ```

### 6. Delete User
- **HTTP Method:** DELETE
- **Path:** `/api/admin/users/:id`
- **Description:** Deletes a specific user.
- **Authentication Required:** Yes (Admin)
- **Request Params:**
  - `id` (String) - User ID
- **Success Response (200):**
  ```json
  {
    "success": true,
    "message": "User deleted"
  }
  ```
- **Error Responses:**
  - `404 Not Found` (User not found)

### 7. Get All Orders
- **HTTP Method:** GET
- **Path:** `/api/admin/orders`
- **Description:** Retrieves all orders with optional filtering.
- **Authentication Required:** Yes (Admin)
- **Query Params:**
  - `search` (String)
  - `status` (String) - Filter by order status
- **Success Response (200):**
  ```json
  {
    "success": true,
    "orders": [...]
  }
  ```

### 8. Update Order Status
- **HTTP Method:** PUT
- **Path:** `/api/admin/orders/:id/status`
- **Description:** Updates the status of an order.
- **Authentication Required:** Yes (Admin)
- **Request Params:**
  - `id` (String) - Order ID
- **Request Body:**
  - `status` (String)
- **Success Response (200):**
  ```json
  {
    "success": true,
    "order": { ... }
  }
  ```
- **Error Responses:**
  - `404 Not Found` (Order not found)

### 9. Update Payment Status
- **HTTP Method:** PUT
- **Path:** `/api/admin/orders/:id/payment`
- **Description:** Updates the payment status of an order.
- **Authentication Required:** Yes (Admin)
- **Request Params:**
  - `id` (String) - Order ID
- **Request Body:**
  - `paymentStatus` (String)
- **Success Response (200):**
  ```json
  {
    "success": true,
    "order": { ... }
  }
  ```
- **Error Responses:**
  - `404 Not Found` (Order not found)

### 10. Upload Product Image
- **HTTP Method:** POST
- **Path:** `/api/admin/upload/product`
- **Description:** Uploads up to 10 product images to ImageKit.
- **Authentication Required:** Yes (Admin)
- **Request Form-Data:**
  - `images` (File Array) - Max 10 files, 5MB each, allowed: JPG/PNG/WebP.
- **Success Response (200):**
  ```json
  {
    "success": true,
    "urls": ["https://ik.imagekit.io/..."]
  }
  ```
- **Error Responses:**
  - `400 Bad Request` (Please upload at least one image / Invalid file type)

### 11. Get Settings
- **HTTP Method:** GET
- **Path:** `/api/admin/settings`
- **Description:** Retrieves application settings from `data/settings.json`.
- **Authentication Required:** Yes (Admin)
- **Success Response (200):**
  ```json
  {
    "success": true,
    "settings": { ... }
  }
  ```

### 12. Get Admin Profile
- **HTTP Method:** GET
- **Path:** `/api/admin/profile`
- **Description:** Retrieves the logged-in admin's profile.
- **Authentication Required:** Yes (Admin)
- **Success Response (200):**
  ```json
  {
    "success": true,
    "user": { ... }
  }
  ```

### 13. Update Admin Profile
- **HTTP Method:** PUT
- **Path:** `/api/admin/profile`
- **Description:** Updates the logged-in admin's name and email.
- **Authentication Required:** Yes (Admin)
- **Request Body:**
  - `name` (String)
  - `email` (String)
- **Success Response (200):**
  ```json
  {
    "success": true,
    "user": { ... }
  }
  ```

### 14. Change Admin Password
- **HTTP Method:** PUT
- **Path:** `/api/admin/password`
- **Description:** Changes the logged-in admin's password.
- **Authentication Required:** Yes (Admin)
- **Request Body:**
  - `currentPassword` (String, required)
  - `newPassword` (String, required, min 6 characters)
- **Success Response (200):**
  ```json
  {
    "success": true,
    "message": "Password updated"
  }
  ```
- **Error Responses:**
  - `400 Bad Request` (Current password is incorrect)

### 15. Add New Admin
- **HTTP Method:** POST
- **Path:** `/api/admin/add-admin`
- **Description:** Creates a new administrator account.
- **Authentication Required:** Yes (Admin)
- **Request Body:**
  - `name` (String, required)
  - `email` (String, required, valid email format)
  - `password` (String, required, min 6 characters)
- **Success Response (201):**
  ```json
  {
    "success": true,
    "user": {
      "name": "Admin 2",
      "email": "admin2@example.com",
      "role": "admin"
    }
  }
  ```
- **Error Responses:**
  - `400 Bad Request` (A user with this email already exists)

---

## Notes on Review

1. **Unused or Inconsistent Routes:**
   - The `/api/admin/settings` endpoint looks for a file `data/settings.json`, but there is no corresponding `PUT /api/admin/settings` to ever update this file. It is currently read-only.
   - The `/api/auth/me` endpoint returns `{ success: true, user }` but uses `protect` middleware which sets `req.user`. It is slightly redundant if the frontend just decodes the JWT, but it's a standard pattern.
   - For `/api/admin/orders/:id/status` and `/api/admin/orders/:id/payment`, there are no `express-validator` rules defined in `adminRoutes.js` checking that the status/paymentStatus are valid enums. This relies strictly on Mongoose's `runValidators: true` inside the controller.
   - For `/api/orders` (Create Order), there is no express validation middleware in `orderRoutes.js` for the complex nested object (items, shippingAddress, paymentMethod); it relies solely on the controller logic.
