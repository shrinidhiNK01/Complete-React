# 09-API-Integration - Authentication & JWT Guide

Welcome to this comprehensive guide on **Authentication and JWT**. This module is designed to take you from a complete beginner to an industry-level expert.

---

## 1. Concept Introduction
Frontend authentication ensures that users sign in and get an access token (**JWT - JSON Web Token**) to authorize calls to protected backend APIs.

---

## 2. Why It Exists
HTTP is stateless. The backend server does not remember who you are from one request to another. Authentication mechanisms pass dynamic tokens in request headers to prove user identity.

---

## 3. Problem It Solves
It secures user accounts, regulates access controls, protects databases from unauthorized reads/writes, and manages user session lifecycles.

---

## 4. Internal Working
1.  **Login:** User submits username/password.
2.  **Verify:** Backend validates credentials and issues an Access Token (short life, e.g. 15m) and Refresh Token (long life, e.g. 7 days).
3.  **Storage:** Access token is kept in memory. Refresh token is stored in a secure, `HttpOnly` Cookie.
4.  **Headers:** React Axios/Fetch interceptor appends the Access Token inside the `Authorization: Bearer <token>` header for all calls.
5.  **Refresh:** If the access token expires (HTTP 401), the interceptor automatically calls a `/refresh` endpoint, gets a new access token, and retries the failed request silently.

---

## 5. Architecture Diagram
```
[ React App ] --( 1. Login Credentials )--> [ Auth Server ]
[ React App ] <--( 2. JWT Access Token )---- [ Auth Server ]
      |
( 3. Axios Interceptor Appends Bearer Header )
      |
      v
[ Protected API Server ]
```

---

## 6. Complete Syntax
```javascript
const headers = {
  'Authorization': `Bearer ${accessToken}`
};
```

---

## 7. Beginner Example (Private Router Guard)
```javascript
import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children, isAuthenticated }) {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
```

---

## 8. Intermediate Example (Auth Context Provider)
```javascript
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);

  const login = async (username, password) => {
    const res = await fetch('https://api.example.com/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    setToken(data.accessToken);
  };

  const logout = () => setToken(null);

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
```

---

## 9. Advanced Example (Axios Interceptor for Silent Refresh)
```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.example.com'
});

// Interceptor to add access token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token'); // Or in-memory variable
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor to catch 401 and refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const res = await axios.post('https://api.example.com/refresh', {}, { withCredentials: true });
        const { accessToken } = res.data;
        localStorage.setItem('access_token', accessToken);
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest); // Retry original request
      } catch (refreshError) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
```

---

## 10. Real World Example (Login Form with validation)
```javascript
import React, { useState } from 'react';
import { useAuth } from './AuthContext';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (err) {
      alert('Login Failed: ' + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
      <button type="submit">Sign In</button>
    </form>
  );
}
```

---

## 11. Production Example (Secure Context with JWT Decoding)
```javascript
import React from 'react';
import jwt_decode from 'jwt-decode';

export function parseToken(token) {
  try {
    const decoded = jwt_decode(token);
    const hasExpired = decoded.exp * 1000 < Date.now();
    return { decoded, hasExpired };
  } catch (err) {
    return { decoded: null, hasExpired: true };
  }
}
```

---

## 12. Folder Structure
```
src/
├── services/
│   └── api.js
└── context/
    └── AuthContext.js
```

---

## 13. Interview Questions
- **Q1:** Where should you store a JWT token on the client?\n  *Answer:* Store access tokens in memory (React state) and refresh tokens in secure, `HttpOnly` Cookies. Avoid saving JWT tokens in LocalStorage because they are vulnerable to XSS attacks.

---

## 14. Common Mistakes
- Storing access tokens in LocalStorage without rotation logic or XSS protection.

---

## 15. Best Practices
- Keep access token lifespan very short (e.g. 5-15 minutes).
- Make sure logout requests call the backend to invalidate the refresh token on the server side.
