# DELI EGGS - Django REST API Backend

Production-ready Django REST Framework backend for the DELI EGGS e-commerce application.

## Tech Stack

- Python / Django
- Django REST Framework
- SimpleJWT (JWT Authentication)
- PostgreSQL (Supabase)
- CORS (django-cors-headers)
- WhiteNoise (static files)
- Gunicorn (production WSGI)

## Project Structure

```
backend/
├── manage.py
├── requirements.txt
├── .env
├── .env.example
├── .gitignore
├── config/
│   ├── settings.py
│   ├── urls.py
│   ├── wsgi.py
│   ├── asgi.py
│   └── utils.py
├── accounts/
│   ├── models.py
│   ├── serializers.py
│   ├── views.py
│   ├── urls.py
│   ├── admin.py
│   └── permissions.py
├── products/
│   ├── models.py
│   ├── serializers.py
│   ├── views.py
│   ├── urls.py
│   └── admin.py
├── orders/
│   ├── models.py
│   ├── serializers.py
│   ├── views.py
│   ├── urls.py
│   └── admin.py
├── customers/
│   ├── models.py
│   ├── serializers.py
│   ├── views.py
│   ├── urls.py
│   └── admin.py
└── dashboard/
    ├── models.py
    ├── serializers.py
    ├── views.py
    ├── urls.py
    └── admin.py
```

## Local Setup

### 1. Clone and enter the backend directory

```bash
cd backend
```

### 2. Create a virtual environment

```bash
python -m venv venv
# Windows
venv\Scripts\activate
# Mac/Linux
source venv/bin/activate
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Configure environment variables

Copy `.env.example` to `.env` and update values:

```bash
cp .env.example .env
```

For local development, you can use SQLite:

```env
DJANGO_SECRET_KEY=your-secret-key-here
DJANGO_DEBUG=True
DJANGO_ALLOWED_HOSTS=localhost,127.0.0.1
DATABASE_URL=sqlite:///db.sqlite3
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
```

For Supabase production, use the Supabase connection string:

```env
DATABASE_URL=postgres://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres
```

### 5. Run migrations

```bash
python manage.py migrate
```

### 6. Create a superuser

```bash
python manage.py createsuperuser
```

### 7. Run the server

```bash
python manage.py runserver
```

The API will be available at `http://localhost:8000/`.

## Supabase Connection

1. Go to your Supabase project dashboard.
2. Navigate to **Project Settings** -> **Database**.
3. Copy the **Connection string** (URI format).
4. Set it as `DATABASE_URL` in your `.env` file.
5. Ensure `psycopg2-binary` is installed (it is in `requirements.txt`).

## API Endpoints

### Authentication (`/api/auth/`)

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/auth/login/` | POST | No | Login (returns JWT) |
| `/api/auth/refresh/` | POST | No | Refresh access token |
| `/api/auth/logout/` | POST | Yes | Logout (blacklists refresh token) |
| `/api/auth/me/` | GET | Yes | Get current admin profile |
| `/api/auth/change-password/` | POST | Yes | Change password |

### Products (`/api/products/`)

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/products/` | GET | No | List products |
| `/api/products/<slug>/` | GET | No | Get product by slug |
| `/api/admin/products/` | POST | Admin | Create product |
| `/api/admin/products/<id>/` | PUT/PATCH | Admin | Update product |
| `/api/admin/products/<id>/` | DELETE | Admin | Delete product |

### Orders (`/api/orders/`)

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/orders/` | POST | No | Create order (customer-facing) |
| `/api/orders/<order_number>/` | GET | No | Get order by order number |
| `/api/admin/orders/` | GET | Admin | List orders |
| `/api/admin/orders/<id>/` | PATCH | Admin | Update order |
| `/api/admin/orders/<id>/` | DELETE | Admin | Delete order |

### Customers (`/api/admin/customers/`)

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/admin/customers/` | GET | Admin | List customers |
| `/api/admin/customers/<id>/` | GET | Admin | Get customer details |

### Dashboard (`/api/admin/dashboard/`)

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/admin/dashboard/` | GET | Admin | Dashboard stats |

### Analytics (`/api/admin/analytics/`)

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/admin/analytics/` | GET | Admin | Analytics data |

**Query Parameters:** `period` (today, 7_days, 30_days, 3_months, 12_months)

### Settings (`/api/admin/settings/`)

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/admin/settings/` | GET | Admin | Get business settings |
| `/api/admin/settings/` | PUT | Admin | Update business settings |

## Response Format

All API responses follow this consistent format:

**Success:**
```json
{
  "success": true,
  "data": {}
}
```

**Error:**
```json
{
  "success": false,
  "message": "Unable to create order."
}
```

## React Frontend Integration

### Authentication Flow

1. **Login:**
   ```javascript
   const response = await fetch('http://localhost:8000/api/auth/login/', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({ username: 'admin', password: 'password' }),
   });
   const data = await response.json();
   const { access, refresh } = data.data;
   // Store refresh token in httpOnly cookie or secure storage
   // Store access token in memory or secure storage
   ```

2. **Authenticated Requests:**
   ```javascript
   const response = await fetch('http://localhost:8000/api/admin/products/', {
     headers: {
       'Content-Type': 'application/json',
       'Authorization': `Bearer ${accessToken}`,
     },
   });
   ```

3. **Refresh Token:**
   ```javascript
   const response = await fetch('http://localhost:8000/api/auth/refresh/', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({ refresh: refreshToken }),
   });
   ```

### Creating an Order

```javascript
const response = await fetch('http://localhost:8000/api/orders/', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    customer_first_name: 'John',
    customer_last_name: 'Doe',
    customer_email: 'john@example.com',
    customer_phone: '0712345678',
    order_type: 'DELIVERY',
    delivery_address: '123 Main St, Cape Town',
    delivery_distance: 12.5,
    items: [
      {
        product_id: 1,
        product_name: 'Large Eggs',
        quantity: 2,
        unit_price: 95.00,
      }
    ],
    notes: 'Leave at gate',
  }),
});
```

## Deployment to Render

### 1. Push to GitHub

Push the `backend/` folder to a GitHub repository.

### 2. Create a Render Web Service

- Go to [Render](https://dashboard.render.com/)
- Click **New** -> **Web Service**
- Connect your GitHub repository
- Select the backend folder

### 3. Environment Variables

Set these in the Render dashboard:

| Variable | Value |
|----------|-------|
| `DJANGO_SECRET_KEY` | Generate a strong random key |
| `DJANGO_DEBUG` | False |
| `DJANGO_ALLOWED_HOSTS` | your-app.onrender.com |
| `DATABASE_URL` | Supabase connection string |
| `CORS_ALLOWED_ORIGINS` | https://your-frontend.vercel.app,https://your-react-app.com |

### 4. Build Command

```bash
pip install -r requirements.txt && python manage.py migrate
```

### 5. Start Command

```bash
gunicorn config.wsgi:application --bind 0.0.0.0:$PORT
```

### 6. Deploy

Render will build and deploy your application automatically.

## Django Admin

Access the Django admin at `http://localhost:8000/admin/` using your superuser credentials.

The admin interface allows management of:
- Products
- Customers
- Orders
- Order Items
- Business Settings

## Default Business Settings

These can be edited via the admin interface or the API:

- **Business Name:** DELI EGGS
- **Delivery Rate:** R1.20 per km
- **Minimum Delivery Fee:** R0

## Order Statuses

- PENDING
- CONFIRMED
- PREPARING
- OUT_FOR_DELIVERY
- COMPLETED
- CANCELLED

## Payment Statuses

- PENDING
- PAID
- FAILED
- REFUNDED

## License

Private - DELI EGGS
