# 06. Projects, Roadmap, And Cheat Sheets

## 1. Complete Learning Roadmap

### Stage 1: Programming Basics

Learn:

- Values and types.
- Variables.
- Operators.
- Conditions.
- Functions.
- Arrays.
- Objects.
- Loops.

Build:

- Calculator.
- Number guessing game.
- Unit converter.
- Quiz app.

### Stage 2: Browser JavaScript

Learn:

- DOM selection.
- Events.
- Forms.
- Rendering lists.
- Local storage.
- Fetch.

Build:

- Todo app.
- Notes app.
- Weather app.
- Shopping cart.

### Stage 3: Modern JavaScript

Learn:

- Modules.
- Async/await.
- Error handling.
- Classes.
- Closures.
- Map and Set.
- Testing.

Build:

- Expense tracker.
- Product search page.
- GitHub profile finder.
- Small REST API.

### Stage 4: React Foundations

Learn:

- JSX.
- Components.
- Props.
- State.
- Events.
- Lists.
- Forms.
- Effects.
- Custom hooks.

Build:

- Counter collection.
- Chatbot UI.
- Todo app.
- Movie search app.

### Stage 5: React Applications

Learn:

- Routing.
- Data fetching.
- Mutations.
- Context.
- Reducers.
- Testing.
- Deployment.

Build:

- Ecommerce app.
- Admin dashboard.
- Blog app.
- Authentication UI.

### Stage 6: Advanced Frontend Engineering

Learn:

- TypeScript.
- Performance.
- Accessibility.
- Security.
- Design systems.
- State libraries.
- Server rendering.
- CI/CD.

Build:

- Full-stack ecommerce app.
- SaaS dashboard.
- Real-time chat.
- Portfolio with CMS.

## 2. JavaScript Cheat Sheet

Variables:

```js
const fixed = "cannot be reassigned";
let changeable = "can be reassigned";
```

Function:

```js
function add(a, b) {
  return a + b;
}
```

Arrow function:

```js
const add = (a, b) => a + b;
```

Array methods:

```js
numbers.map(number => number * 2);
numbers.filter(number => number > 10);
numbers.find(number => number === 5);
numbers.some(number => number > 10);
numbers.every(number => number > 0);
numbers.reduce((sum, number) => sum + number, 0);
```

Object copy:

```js
const updated = { ...user, name: "New name" };
```

Array copy:

```js
const updated = [...items, newItem];
```

Async:

```js
async function loadData() {
  try {
    const response = await fetch("/api/data");
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}
```

## 3. React Cheat Sheet

Component:

```jsx
function Welcome({ name }) {
  return <h1>Hello, {name}</h1>;
}
```

State:

```jsx
const [count, setCount] = useState(0);
```

Effect:

```jsx
useEffect(() => {
  document.title = "App";
}, []);
```

List:

```jsx
items.map(item => <Item key={item.id} item={item} />);
```

Form:

```jsx
function Form() {
  const [text, setText] = useState("");

  return (
    <form onSubmit={event => event.preventDefault()}>
      <input value={text} onChange={event => setText(event.target.value)} />
    </form>
  );
}
```

Context:

```jsx
const AppContext = createContext(null);
const value = useContext(AppContext);
```

Reducer:

```jsx
const [state, dispatch] = useReducer(reducer, initialState);
```

## 4. Full Project: Plain JavaScript Shopping Cart

File structure:

```txt
shopping-cart/
  index.html
  styles.css
  scripts/
    products.js
    cart.js
    app.js
```

`products.js`:

```js
export const products = [
  { id: "p1", name: "Keyboard", priceCents: 150000 },
  { id: "p2", name: "Mouse", priceCents: 80000 }
];
```

`cart.js`:

```js
export let cart = JSON.parse(localStorage.getItem("cart")) || [];

export function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(productId) {
  const item = cart.find(cartItem => cartItem.productId === productId);

  if (item) {
    item.quantity++;
  } else {
    cart.push({ productId, quantity: 1 });
  }

  saveCart();
}
```

`app.js`:

```js
import { products } from "./products.js";
import { addToCart } from "./cart.js";

const productsElement = document.querySelector("#products");

productsElement.innerHTML = products
  .map(product => {
    return `
      <article>
        <h2>${product.name}</h2>
        <p>Rs ${(product.priceCents / 100).toFixed(2)}</p>
        <button data-product-id="${product.id}">Add to cart</button>
      </article>
    `;
  })
  .join("");

productsElement.addEventListener("click", event => {
  const button = event.target.closest("button");

  if (!button) {
    return;
  }

  addToCart(button.dataset.productId);
});
```

Line by line idea:

- `products` is the source data.
- `cart` is user state.
- `localStorage` keeps the cart after refresh.
- `map` creates HTML for each product.
- Event delegation handles all buttons from one listener.

## 5. Full Project: React Ecommerce Skeleton

File structure:

```txt
src/
  main.jsx
  App.jsx
  features/
    products/
      ProductsPage.jsx
      ProductCard.jsx
    cart/
      CartPage.jsx
      CartContext.jsx
  lib/
    formatPrice.js
```

`CartContext.jsx`:

```jsx
import { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  function addItem(product) {
    setItems(currentItems => {
      const existingItem = currentItems.find(item => item.id === product.id);

      if (existingItem) {
        return currentItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentItems, { ...product, quantity: 1 }];
    });
  }

  const value = useMemo(() => {
    return { items, addItem };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const value = useContext(CartContext);

  if (!value) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return value;
}
```

`ProductCard.jsx`:

```jsx
import { useCart } from "../cart/CartContext.jsx";

function ProductCard({ product }) {
  const { addItem } = useCart();

  return (
    <article>
      <h2>{product.name}</h2>
      <p>Rs {product.price}</p>
      <button onClick={() => addItem(product)}>Add to cart</button>
    </article>
  );
}

export default ProductCard;
```

Key ideas:

- Context shares cart state across pages.
- `setItems(currentItems => ...)` avoids stale state.
- Existing items update immutably.
- New items are appended with quantity `1`.

## 6. Debugging React

Ask these questions:

1. Is the component rendering?
2. Are props correct?
3. Is state correct before and after the event?
4. Is the event handler running?
5. Is an effect running too often?
6. Is a dependency missing from the effect array?
7. Are keys stable in lists?
8. Did I mutate state instead of copying it?
9. Is the request succeeding in the Network tab?
10. Is an error hidden in the Console?

## 7. Common Mistakes

JavaScript:

- Using `=` instead of `===` in conditions.
- Forgetting `return` inside functions.
- Mutating objects accidentally.
- Not handling `null` or `undefined`.
- Forgetting `await`.
- Trusting user input.

React:

- Mutating state directly.
- Using array index as key for dynamic lists.
- Putting derived data in state.
- Overusing `useEffect`.
- Missing loading and error states.
- Passing new objects/functions unnecessarily to memoized children.
- Storing global app state too early.

## 8. Accessibility Basics

Accessible UI is usable by more people and usually easier for everyone.

Checklist:

- Use real buttons for actions.
- Use real links for navigation.
- Connect labels to inputs.
- Keep keyboard navigation working.
- Provide visible focus styles.
- Use semantic headings.
- Add alt text for meaningful images.
- Do not rely only on color to show meaning.

Example:

```jsx
function EmailInput({ email, setEmail }) {
  return (
    <label>
      Email
      <input
        type="email"
        value={email}
        onChange={event => setEmail(event.target.value)}
      />
    </label>
  );
}
```

## 9. Interview And Revision Topics

JavaScript:

- Event loop.
- Closures.
- Scope and hoisting.
- `this`.
- Prototypes.
- Promises.
- Async/await.
- Debounce and throttle.
- Deep copy vs shallow copy.
- Array methods.
- Error handling.

React:

- Virtual DOM idea.
- Reconciliation.
- Props vs state.
- Controlled components.
- Hooks rules.
- `useEffect` dependencies.
- Context tradeoffs.
- Reducers.
- Keys.
- Memoization.
- Testing.
- Server rendering basics.

## 10. Final Advice

Do not wait until you feel ready to build. Learn a topic, build a tiny version, break it, fix it, then build a bigger version.

The order is:

```txt
Understand -> Type -> Run -> Break -> Debug -> Rebuild -> Explain
```

If you can explain a concept in simple words and build something with it, you know it.

