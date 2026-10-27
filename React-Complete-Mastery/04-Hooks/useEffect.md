# 04-Hooks - useEffect Hook

Welcome to this comprehensive guide on the **useEffect Hook**. This module is designed to take you from a complete beginner to an industry-level expert.

---

## 1. Concept Introduction
`useEffect` lets you perform **side effects** in functional components. Examples of side effects include: fetching data from an API, subscribing to websockets, manual DOM manipulation, and setting timers.

---

## 2. Why It Exists
Functional components should ideally be "pure" functions (input props, output JSX). Side effects must be handled outside the render execution path. `useEffect` organizes this behavior.

---

## 3. Problem It Solves
It replaces class lifecycle methods (`componentDidMount`, `componentDidUpdate`, and `componentWillUnmount`) with a single unified API.

---

## 4. Internal Working
React runs effects after the paint phase is complete, ensuring they do not block the browser layout rendering. If dependencies array is provided, React compares each item from the previous render using `Object.is`.

---

## 5. Architecture Diagram
```
[Render Component] ---> [Paint Screen] ---> [Run useEffect Callback]
                                                  |
[Next Render / Unmount] <--- [Run Cleanup Function] <--- [Dependency Check Changed?]
```

---

## 6. Complete Syntax
```javascript
useEffect(() => {
  // Effect logic
  return () => {
    // Optional Cleanup logic
  };
}, [dependency1, dependency2]);
```

---

## 7. Beginner Example (Document Title updater)
```javascript
import React, { useState, useEffect } from 'react';

export default function DocumentTitle() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Clicked ${count} times`;
  }, [count]); // Runs only when count changes

  return <button onClick={() => setCount(count + 1)}>Increment</button>;
}
```
**Explanation:**
*   **Line 6:** The effect runs when the component mounts and whenever `count` updates.

---

## 8. Intermediate Example (Interval Timer Setup)
```javascript
import React, { useState, useEffect } from 'react';

export default function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval); // Cleanup prevents memory leak
  }, []); // Empty array: runs ONLY on mount and cleanup on unmount

  return <p>Timer: {seconds}s</p>;
}
```

---

## 9. Advanced Example (API Fetching with AbortController)
```javascript
import React, { useState, useEffect } from 'react';

export default function SearchResults({ query }) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchSearch() {
      try {
        const response = await fetch(`https://api.example.com/search?q=${query}`, { signal: controller.signal });
        const data = await response.json();
        setResults(data);
      } catch (err) {
        if (err.name !== 'AbortError') console.error(err);
      }
    }

    if (query) fetchSearch();
    
    return () => controller.abort(); // Cancel request if query changes before execution ends
  }, [query]);

  return <ul>{results.map(r => <li key={r.id}>{r.name}</li>)}</ul>;
}
```

---

## 10. Real World Example (Window Resize Listener)
```javascript
import React, { useState, useEffect } from 'react';

export default function WindowSize() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <p>Width: {width}px</p>;
}
```

---

## 11. Production Example (Websocket Chat connection manager)
```javascript
import React, { useState, useEffect } from 'react';

export default function ChatRoom({ roomId }) {
  const [status, setStatus] = useState('disconnected');

  useEffect(() => {
    const ws = new WebSocket(`wss://chat.example.com/room/${roomId}`);

    ws.onopen = () => setStatus('connected');
    ws.onclose = () => setStatus('disconnected');

    return () => {
      ws.close(); // Correctly shuts down active socket on room change or unmount
    };
  }, [roomId]);

  return <p>Room {roomId} is {status}</p>;
}
```

---

## 12. Folder Structure
```
src/
└── components/
    └── ChatRoom.jsx
```

---

## 13. Interview Questions
- **Q1:** What happens if you run useEffect without a dependencies array?\n  *Answer:* It executes after every single render of the component.
- **Q2:** When does the cleanup function execute?\n  *Answer:* Right before the effect runs again with new dependencies, and when the component unmounts.

---

## 14. Common Mistakes
- **Mistake:** Running an infinite loop: updating state inside `useEffect` without adding a dependency array.
- **Solution:** Always pass a dependency array if you call state setters.

---

## 15. Best Practices
- Declare functions used only inside the effect within the effect itself.
- Always perform cleanups for intervals, sockets, listeners, and timeouts.
