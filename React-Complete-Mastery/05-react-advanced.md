# 05. Advanced React

## 1. Component Design

Good React components are:

- Small enough to understand.
- Named by purpose.
- Controlled by props and state.
- Easy to test.
- Not overloaded with unrelated work.

Example split:

```jsx
function ProductPage() {
  return (
    <main>
      <ProductGallery />
      <ProductInfo />
      <ProductReviews />
    </main>
  );
}
```

Each component owns one area of the UI.

## 2. Lifting State Up

When two components need the same state, move the state to their nearest common parent.

```jsx
function TemperatureApp() {
  const [celsius, setCelsius] = useState(0);

  return (
    <>
      <TemperatureInput value={celsius} onChange={setCelsius} />
      <BoilingMessage celsius={celsius} />
    </>
  );
}

function TemperatureInput({ value, onChange }) {
  return (
    <input
      value={value}
      onChange={event => onChange(Number(event.target.value))}
    />
  );
}

function BoilingMessage({ celsius }) {
  return <p>{celsius >= 100 ? "Water boils" : "Water does not boil"}</p>;
}
```

The parent owns the data. Children receive data and callbacks.

## 3. Derived State

If a value can be calculated from props or state, do not store it separately.

```jsx
function CartSummary({ items }) {
  const total = items.reduce((sum, item) => sum + item.price, 0);

  return <p>Total: Rs {total}</p>;
}
```

Avoid:

```jsx
const [total, setTotal] = useState(0);
```

Storing derived state can create bugs when the original data changes but derived state is not updated.

## 4. React Router

Install:

```bash
npm install react-router-dom
```

Basic routes:

```jsx
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:productId" element={<ProductDetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
}
```

Read route params:

```jsx
import { useParams } from "react-router-dom";

function ProductDetailsPage() {
  const { productId } = useParams();

  return <h1>Product {productId}</h1>;
}
```

Navigate in code:

```jsx
import { useNavigate } from "react-router-dom";

function CheckoutButton() {
  const navigate = useNavigate();

  return <button onClick={() => navigate("/checkout")}>Checkout</button>;
}
```

## 5. Data Fetching In React

Basic pattern:

```jsx
import { useEffect, useState } from "react";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        setStatus("loading");
        const response = await fetch("/api/products");

        if (!response.ok) {
          throw new Error("Failed to load products");
        }

        const data = await response.json();
        setProducts(data);
        setStatus("success");
      } catch (error) {
        setError(error);
        setStatus("error");
      }
    }

    loadProducts();
  }, []);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "error") {
    return <p>{error.message}</p>;
  }

  return (
    <ul>
      {products.map(product => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
}
```

Production apps often use TanStack Query, SWR, Remix, Next.js, or React Router data APIs to handle caching, revalidation, and request state.

## 6. Data Mutation

Mutation means creating, updating, or deleting data.

```jsx
async function updateTodo(todoId, updates) {
  const response = await fetch(`/api/todos/${todoId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(updates)
  });

  if (!response.ok) {
    throw new Error("Failed to update todo");
  }

  return response.json();
}
```

React UI pattern:

```jsx
async function handleToggle(todo) {
  const updatedTodo = await updateTodo(todo.id, { done: !todo.done });

  setTodos(currentTodos =>
    currentTodos.map(currentTodo =>
      currentTodo.id === updatedTodo.id ? updatedTodo : currentTodo
    )
  );
}
```

For a better user experience, show pending state and handle failure.

## 7. Context

Context passes data deeply without manually passing props through every level.

```jsx
import { createContext, useContext, useState } from "react";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }

  return context;
}
```

Use:

```jsx
function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      {theme}
    </button>
  );
}
```

Use context for app-level data like auth, theme, locale, and feature flags. Do not put every state variable in context.

## 8. useReducer

`useReducer` is useful when state has many related updates.

```jsx
import { useReducer } from "react";

const initialState = {
  items: []
};

function cartReducer(state, action) {
  switch (action.type) {
    case "itemAdded":
      return {
        ...state,
        items: [...state.items, action.payload]
      };

    case "itemRemoved":
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.id)
      };

    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

function Cart() {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <button
      onClick={() =>
        dispatch({
          type: "itemAdded",
          payload: { id: 1, name: "Keyboard" }
        })
      }
    >
      Add
    </button>
  );
}
```

Reducer rule: same input state plus same action should produce the same next state.

## 9. Refs

Refs store values that do not trigger re-render, or point to DOM elements.

Focus input:

```jsx
import { useRef } from "react";

function Search() {
  const inputRef = useRef(null);

  return (
    <>
      <input ref={inputRef} />
      <button onClick={() => inputRef.current.focus()}>Focus</button>
    </>
  );
}
```

Store previous value:

```jsx
const renderCount = useRef(0);
renderCount.current++;
```

Changing a ref does not re-render the component.

## 10. Performance

Most React apps do not need advanced optimization at first. Start with clear code.

Useful tools:

- React DevTools Profiler.
- `memo` for skipping child renders when props do not change.
- `useMemo` for expensive calculations.
- `useCallback` for stable function references.
- Code splitting with `lazy` and `Suspense`.
- Virtualization for very long lists.

Example:

```jsx
import { useMemo } from "react";

function ProductList({ products, query }) {
  const filteredProducts = useMemo(() => {
    return products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [products, query]);

  return filteredProducts.map(product => (
    <ProductCard key={product.id} product={product} />
  ));
}
```

Use `useMemo` when the calculation is expensive or when stable identity matters.

## 11. Error Boundaries

Error boundaries catch render errors in child components. They are class components in stable React APIs.

```jsx
import { Component } from "react";

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error(error, info);
  }

  render() {
    if (this.state.hasError) {
      return <p>Something went wrong.</p>;
    }

    return this.props.children;
  }
}
```

Use error boundaries around routes, dashboards, widgets, or risky third-party UI.

## 12. Testing React With Vitest And Testing Library

Install:

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
```

Component:

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increase</button>
    </>
  );
}
```

Test:

```jsx
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Counter from "./Counter.jsx";

describe("Counter", () => {
  it("increases the count", () => {
    render(<Counter />);

    fireEvent.click(screen.getByRole("button", { name: /increase/i }));

    expect(screen.getByText("Count: 1")).toBeInTheDocument();
  });
});
```

Testing principle: test behavior visible to the user, not internal implementation details.

## 13. TypeScript With React

Props type:

```tsx
type ProductCardProps = {
  name: string;
  price: number;
  onAddToCart: () => void;
};

function ProductCard({ name, price, onAddToCart }: ProductCardProps) {
  return (
    <article>
      <h2>{name}</h2>
      <p>Rs {price}</p>
      <button onClick={onAddToCart}>Add</button>
    </article>
  );
}
```

State type:

```tsx
type User = {
  id: number;
  name: string;
};

const [user, setUser] = useState<User | null>(null);
```

Event type:

```tsx
function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();
}
```

## 14. React 19 And Modern Ideas

React has been moving toward better async UI and form handling. Depending on your setup, modern React apps may use:

- Actions for form submissions and mutations.
- `useActionState` for form action state.
- `useOptimistic` for optimistic UI.
- `use` for reading promises or context in supported environments.
- Server Components in frameworks that support them.

Conceptual example:

```jsx
function MessageForm({ sendMessage }) {
  async function action(formData) {
    await sendMessage(formData.get("message"));
  }

  return (
    <form action={action}>
      <input name="message" />
      <button>Send</button>
    </form>
  );
}
```

Always check your React version and framework support before using newest APIs.

## 15. Deployment

Build:

```bash
npm run build
```

Preview:

```bash
npm run preview
```

Common hosting:

- Vercel.
- Netlify.
- Cloudflare Pages.
- GitHub Pages.
- AWS S3 plus CloudFront.

Deployment checklist:

- Environment variables configured.
- API URLs correct.
- Build passes.
- Tests pass.
- Routes work after refresh.
- Loading and error states work.
- SEO metadata added if needed.
- Accessibility checked.

## 16. App Architecture

One useful structure:

```txt
src/
  app/
    App.jsx
    routes.jsx
  components/
    Button.jsx
    Modal.jsx
  features/
    cart/
      CartPage.jsx
      cartReducer.js
      cartApi.js
    products/
      ProductsPage.jsx
      ProductCard.jsx
      productsApi.js
  hooks/
    useLocalStorage.js
  lib/
    formatPrice.js
    http.js
```

Keep code close to the feature that uses it. Move code to shared folders only when multiple features truly need it.

