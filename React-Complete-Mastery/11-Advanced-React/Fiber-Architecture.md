# 11-Advanced-React - Fiber Architecture

Welcome to this comprehensive guide on the **React Fiber Architecture**. This module is designed to take you from a complete beginner to an industry-level expert.

---

## 1. Concept Introduction
**React Fiber** is the internal reconciliation engine rewritten from scratch for React 16. Its primary goal is to enable **incremental rendering**: the ability to split rendering work into chunks and spread it over multiple frames.

---

## 2. Why It Exists
Before React 16, the reconciliation algorithm (Stack Reconciler) processed updates synchronously. Once React started rendering components, it could not be interrupted. If an application had a large DOM structure, this caused frame drops (jank) and laggy input responses.

---

## 3. Problem It Solves
It solves layout freezing during heavy computation rendering. By splitting rendering into small steps, Fiber allows React to pause rendering to handle a high-priority event (like user text typing) and resume rendering afterwards.

---

## 4. Internal Working
Fiber changes the tree structure from a call stack to a **virtual stack frame**. Each component element maps to a **Fiber Node** containing references to:
*   `child`: points to the first child.
*   `sibling`: points to the sibling element.
*   `return`: points to parent node (allowing call stack return).
React processes these nodes in two phases:
1.  **Render Phase:** Asynchronous, reconstructs Fiber tree, schedules priority. Can be paused.
2.  **Commit Phase:** Synchronous, paints the final reconciled results to the actual DOM. Cannot be paused.

---

## 5. Architecture Diagram
```
                     +---------------------------------+
                     |    Fiber Node Tree Structure    |
                     +---------------------------------+
                                      |
                               ( child node )
                                      v
       +------------+ ( sibling ) +------------+ ( return ) +------------+
       |   Node A   | ----------> |   Node B   | ---------> |   Parent   |
       +------------+             +------------+            +------------+
```

---

## 6. Complete Syntax
Fiber works completely internally. You do not write Fiber nodes manually. However, you configure scheduling priorities using APIs like:
```javascript
import { useTransition } from 'react';
const [isPending, startTransition] = useTransition();
```

---

## 7. Beginner Example (Visualizing render priority)
```javascript
import React, { useState, useTransition } from 'react';

export default function PriorityTest() {
  const [isPending, startTransition] = useTransition();
  const [input, setInput] = useState('');
  const [list, setList] = useState([]);

  const handleChange = (e) => {
    // 1. High priority update (UI Text)
    setInput(e.target.value);

    // 2. Low priority update (Large list calculation)
    startTransition(() => {
      const items = Array.from({ length: 10000 }).map((_, i) => `${e.target.value} item ${i}`);
      setList(items);
    });
  };

  return (
    <div>
      <input value={input} onChange={handleChange} />
      {isPending ? <p>Calculating...</p> : <ul>{list.slice(0, 10).map((l, idx) => <li key={idx}>{l}</li>)}</ul>}
    </div>
  );
}
```
**Explanation:**
*   **Line 13-16:** `startTransition` marks the list calculation as low priority. React Fiber pauses calculating this list if the user keeps typing keys.

---

## 8. Intermediate Example (Scheduler Priority Mapping)
```javascript
// Internal concepts simulated
const priorities = {
  ImmediatePriority: 1,
  UserBlockingPriority: 2,
  NormalPriority: 3,
  LowPriority: 4,
  IdlePriority: 5,
};
```

---

## 9. Advanced Example (Understanding Double Buffering)
React Fiber uses a technique called **Double Buffering** to manage UI frames. It maintains two fiber trees:
1.  **current:** represents the fiber tree currently visible on the screen.
2.  **workInProgress:** represents the tree being built in the background during render phase.
Once the `workInProgress` tree is fully calculated, React swaps the pointers in the commit phase, updating the screen instantly.

---

## 13. Interview Questions
- **Q1:** What is the difference between Render phase and Commit phase?\n  *Answer:* The Render phase is asynchronous and computes changes (can be interrupted). The Commit phase is synchronous and writes the changes to the real DOM (cannot be interrupted).
- **Q2:** How does Fiber manage tree traversal without recursion?\n  *Answer:* It uses a singly linked list tree structure with child, sibling, and return pointers, traversing the tree using loops rather than a recursive call stack.

---

## 20. Summary
React Fiber is a virtual stack frame engine that enables incremental rendering, schedules priorities, separates render/commit phases, and runs concurrent React.
