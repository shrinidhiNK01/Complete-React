# 03-React-Core - JSX

Welcome to this comprehensive guide on **JSX**. This module is designed to take you from a complete beginner to an industry-level expert.

---

## 1. Concept Introduction
JSX stands for JavaScript XML. It is a syntax extension for JavaScript that lets you write HTML-like structures directly inside your JavaScript files.

---

## 2. Why It Exists
It keeps your component structure and visual layout close to the JavaScript logic that controls it.

---

## 3. Problem It Solves
Before JSX, writing React components involved using long, nested chains of React.createElement() statements.

---

## 4. Internal Working
Transpilers like Babel compile JSX code down to standard React.createElement() JavaScript calls.

---

## 5. Architecture Diagram
```
[JSX: <div>Hello</div>] ---> [Babel Compiler] ---> [JS: React.createElement('div', null, 'Hello')]
```

---

## 6. Complete Syntax
```javascript
const element = <div className="title">Hello World</div>;
```

---

## 7. Beginner Example
```javascript
function Welcome() {
  return <h1>Welcome to React!</h1>;
}
```
**Explanation:**
Defines a React component function returning a JSX h1 tag.

---

## 8. Intermediate Example
```javascript
function UserList({ users }) {
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```
**Explanation:**
Embeds dynamic JavaScript mapping arrays inside JSX tags using curly braces.

---

## 9. Advanced Example
```javascript
const DynamicTag = ({ tag: Tag, children, ...props }) => {
  return <Tag className="dynamic-elem" {...props}>{children}</Tag>;
};
```
**Explanation:**
Demonstrates rendering dynamic HTML tags by mapping dynamic string parameters to capitalized tag variables.

---

## 10. Real World Example
```javascript
const Card = ({ title, showDetails }) => {
  return (
    <div className="card">
      <h2>{title}</h2>
      {showDetails && <p>Detailed text metadata</p>}
    </div>
  );
};
```
**Explanation:**
Implements logical short-circuit rendering expressions within JSX layouts.

---

## 11. Production Example
```javascript
export const LayoutElement = React.memo(({ items }) => {
  return (
    <div data-testid="layout-box">
      {items.length === 0 ? <p>No items</p> : <div>Item count: {items.length}</div>}
    </div>
  );
});
```
**Explanation:**
Optimized JSX wrapping testing hook annotations.

---

## 12. Folder Structure
```
src/
└── components/
    └── Layout.jsx
```

---

## 13. Interview Questions
- **Q1:** Why do we import React when using JSX?
  *Answer:* Because JSX compiles to React.createElement() calls, which requires the React object in scope.

---

## 14. Common Mistakes
- **Mistake:** Returning multiple root elements without a wrapping fragment.
  *Solution:* Wrap elements in a Fragment (<></>).

---

## 15. Best Practices
Keep JSX blocks simple, refactoring nested loops to sub-components.

---

## 16. Performance Considerations
Babel transpiles JSX to highly optimized static object shapes.

---

## 17. Security Considerations
React automatically cleans and sanitizes JSX values before rendering to screen.

---

## 18. Exercises
Write a JSX layout showing a profile picture and username.

---

## 19. Solutions
Create user profile JSX card structure.

---

## 20. Summary
JSX makes writing UI clean and simple.
