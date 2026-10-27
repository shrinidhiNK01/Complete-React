# 01-JavaScript-Required - Async Await

Welcome to this comprehensive guide on **Async Await**. This module is designed to take you from a complete beginner to an industry-level expert.

---

## 1. Concept Introduction
Async/Await is ES8 syntax built on top of Promises to write asynchronous code looking like synchronous code.

---

## 2. Why It Exists
It dramatically simplifies parsing chains of nested promise callbacks.

---

## 3. Problem It Solves
Promise chains (.then().catch()) result in long vertical chains that are hard to read and debug.

---

## 4. Internal Working
Generators and yield syntax under the hood managed by the JS engine loop.

---

## 5. Architecture Diagram
```
[Call Async Function] ---> [Await Task] ---> [Pause Execution] ---> [Resume on Resolve]
```

---

## 6. Complete Syntax
```javascript
async function getData() {
  const res = await fetch(url);
  return res.json();
}
```

---

## 7. Beginner Example
```javascript
const fetchName = async () => {
  const res = await fetch('https://api.example.com/name');
  const data = await res.json();
  console.log(data);
};
```
**Explanation:**
Defines async function.
Awaits fetching and parsing JSON data.

---

## 8. Intermediate Example
```javascript
async function fetchUserPosts(userId) {
  try {
    const response = await fetch(`/users/${userId}/posts`);
    if (!response.ok) throw new Error('Network error');
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}
```
**Explanation:**
Implements try/catch blocks to capture HTTP errors.

---

## 9. Advanced Example
```javascript
export async function loadParallelData(userId) {
  try {
    const [userRes, postsRes] = await Promise.all([
      fetch(`/user/${userId}`),
      fetch(`/user/${userId}/posts`)
    ]);
    const user = await userRes.json();
    const posts = await postsRes.json();
    return { user, posts };
  } catch (err) {
    throw new Error('Async parallel fetch failed');
  }
}
```
**Explanation:**
Executes parallel HTTP requests utilizing Promise.all, preventing query waterfalls.

---

## 10. Real World Example
```javascript
const loadConfig = async () => {
  const config = await fetch('/config.json');
  return config.json();
};
```
**Explanation:**
Retrieves remote environment configs dynamically during app boot.

---

## 11. Production Example
```javascript
export const asyncWrapper = (fn) => (...args) => fn(...args).catch(console.error);
```
**Explanation:**
Helper wrapper catching promise errors globally.

---

## 12. Folder Structure
```
src/
└── utils/
    └── api.js
```

---

## 13. Interview Questions
- **Q1:** What happens if you forget 'await'?
  *Answer:* The function returns a pending Promise object instead of the actual data value.

---

## 14. Common Mistakes
- **Mistake:** Forgetting to handle errors with try/catch.

---

## 15. Best Practices
Always use try/catch to wrap awaited asynchronous tasks.

---

## 16. Performance Considerations
Prevents sync blocking, freeing up main thread execution.

---

## 17. Security Considerations
Enforce SSL connection on all await fetch request destinations.

---

## 18. Exercises
Write an async function retrieving user detail.

---

## 19. Solutions
Provide async-await function.

---

## 20. Summary
Async/await improves readability of promise configurations.
