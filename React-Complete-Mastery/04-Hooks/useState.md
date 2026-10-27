# 04-Hooks - useState Hook

Welcome to this comprehensive guide on the **useState Hook**. This module is designed to take you from a complete beginner to an industry-level expert.

---

## 1. Concept Introduction
`useState` is a built-in React Hook that lets you add state variables to functional components. It returns an array containing two items: the current state value, and a dispatcher function to update that state value.

---

## 2. Why It Exists
Before React 16.8, state could only be used inside Class Components. If you wrote a functional component and realized you needed state, you had to refactor it into a class. `useState` allows functional components to maintain state.

---

## 3. Problem It Solves
It eliminates class component boilerplate (constructors, manual `this` binding, lifecycle methods) and allows cleaner, functional programming styles.

---

## 4. Internal Working
React remembers the order in which hooks are called. Under the hood, React maintains a linked list of hook states for each component. When a functional component runs, React reads from this list sequentially.

---

## 5. Architecture Diagram
```
[First Render] ---> [Create Slot in State Linked List] ---> [Return [initialValue, dispatcher]]
[State Update] ---> [Dispatch Action] ---> [Schedule Render] ---> [Return [newValue, dispatcher]]
```

---

## 6. Complete Syntax
```javascript
const [state, setState] = useState(() => {
  // Optional lazy initialization
  return initialValue;
});
```

---

## 7. Beginner Example
```javascript
import React, { useState } from 'react';

export default function LightSwitch() {
  const [isOn, setIsOn] = useState(false);

  return (
    <button onClick={() => setIsOn(!isOn)}>
      {isOn ? 'ON' : 'OFF'}
    </button>
  );
}
```
**Explanation:**
*   **Line 4:** Initializes a boolean state `isOn` with default `false`.
*   **Line 7:** Updates the toggle state on click.

---

## 8. Intermediate Example (Lazy State Initializer)
```javascript
import React, { useState } from 'react';

export default function StorageCounter() {
  // Lazy initialization runs only ONCE on initial mount
  const [count, setCount] = useState(() => {
    const val = localStorage.getItem('count');
    return val ? parseInt(val, 10) : 0;
  });

  const increment = () => {
    setCount(prev => {
      const next = prev + 1;
      localStorage.setItem('count', next.toString());
      return next;
    });
  };

  return <button onClick={increment}>Count: {count}</button>;
}
```
**Explanation:**
*   **Line 5-8:** Passing a function to `useState` ensures the heavy `localStorage` lookup runs only during initial mount, rather than on every re-render.

---

## 9. Advanced Example (Object Merging / Nested updates)
```javascript
import React, { useState } from 'react';

export default function UserProfile() {
  const [profile, setProfile] = useState({
    name: 'Alice',
    details: { age: 25, role: 'Developer' }
  });

  const happyBirthday = () => {
    setProfile(prev => ({
      ...prev,
      details: {
        ...prev.details,
        age: prev.details.age + 1
      }
    }));
  };

  return (
    <div>
      <p>{profile.name} is {profile.details.age} years old.</p>
      <button onClick={happyBirthday}>Birthday</button>
    </div>
  );
}
```
**Explanation:**
*   **Line 11-14:** Shows how to update nested properties by spreading both the outer object and the inner nested objects to avoid losing properties.

---

## 10. Real World Example (Accordion Toggle Manager)
```javascript
import React, { useState } from 'react';

export default function Accordion() {
  const [activeId, setActiveId] = useState(null);

  const toggle = (id) => {
    setActiveId(prevId => prevId === id ? null : id);
  };

  return (
    <div>
      {[1, 2, 3].map(id => (
        <div key={id}>
          <h3 onClick={() => toggle(id)}>Header {id}</h3>
          {activeId === id && <p>Content for section {id}</p>}
        </div>
      ))}
    </div>
  );
}
```

---

## 11. Production Example (Custom Hook Wrapper for Form Fields)
```javascript
import React, { useState } from 'react';

function useFormField(initialValue) {
  const [value, setValue] = useState(initialValue);
  const onChange = (e) => setValue(e.target.value);
  return { value, onChange, reset: () => setValue('') };
}

export default function ContactForm() {
  const emailInput = useFormField('');
  const messageInput = useFormField('');

  return (
    <form onSubmit={e => { e.preventDefault(); console.log(emailInput.value); }}>
      <input type="email" {...emailInput} />
      <textarea {...messageInput} />
      <button type="submit">Submit</button>
    </form>
  );
}
```

---

## 12. Folder Structure
```
src/
└── hooks/
    └── useFormField.js
```

---

## 13. Interview Questions
- **Q1:** What is the Rules of Hooks?\n  *Answer:* 1. Only call Hooks at the top level (not inside loops or conditions). 2. Only call Hooks from React Functions.
- **Q2:** Why shouldn't you call `useState` conditionally?\n  *Answer:* React maps hooks to the linked list index. Conditionally calling hooks shifts the indexes, leading to state misalignment.

---

## 14. Common Mistakes
- **Mistake:** `const [value, setValue] = useState(0); value = 5;`.
- **Solution:** Never reassign state directly. Always use `setValue(5)`.

---

## 15. Best Practices
- Use lazy initializers for reading from storage or parsing cookies.
- Avoid tracking state variables that can be computed directly from props or existing state.

---

## 16. Performance Considerations
If your update function returns the exact same value as current state (`Object.is(prev, next)` is true), React skips rendering the children entirely.

---

## 17. Security Considerations
Sanitize text inputs before saving them to state to avoid storage-based HTML injection.

---

## 18. Exercises
- Build a search field state manager that displays results from a local array matching the query.

---

## 19. Solutions
- Create functional search filters matching input value.

---

## 20. Summary
`useState` adds state dynamically, preserves state between renders, is governed by execution order rules, and optimizes performance via state skip checks.
