# 11-Advanced-React - Error Boundaries

Welcome to this comprehensive guide on **Error Boundaries**. This module is designed to take you from a complete beginner to an industry-level expert.

---

## 1. Concept Introduction
Error Boundaries are React components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of the component tree that crashed.

---

## 2. Why It Exists
A JavaScript error in a part of the UI shouldn't break the whole app. Error boundaries catch these errors gracefully.

---

## 3. Problem It Solves
Before Error Boundaries, any component crash would unmount the entire application screen, leaving a blank white page.

---

## 4. Internal Working
Error boundaries act like a JavaScript catch {} block, but for components. They use the static lifecycle getDerivedStateFromError() and componentDidCatch().

---

## 5. Architecture Diagram
```
[Component Crash] ---> [getDerivedStateFromError] ---> [Update State: hasError: true] ---> [Paint Fallback UI]
```

---

## 6. Complete Syntax
```javascript
class ErrorBoundary extends React.Component {
  state = { hasError: false };
  static getDerivedStateFromError(error) { return { hasError: true }; }
  componentDidCatch(error, info) { logError(error, info); }
  render() {
    if (this.state.hasError) return <h1>Fallback UI</h1>;
    return this.props.children;
  }
}
```

---

## 7. Beginner Example
```javascript
class SimpleBoundary extends React.Component {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) return <p>Something went wrong.</p>;
    return this.props.children;
  }
}
```
**Explanation:**
Line 2 initializes local error state to false.
Line 3 handles error catch and returns updated state.
Line 5 displays fallback if error occurred.

---

## 8. Intermediate Example
```javascript
class CustomBoundary extends React.Component {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error, errorInfo) {
    console.error('Caught error:', error, errorInfo);
  }
  render() {
    if (this.state.hasError) return <div><h2>Widget Error</h2><button onClick={() => this.setState({ hasError: false })}>Retry</button></div>;
    return this.props.children;
  }
}
```
**Explanation:**
Prints full call stacks to logs and displays an interactive retry button.

---

## 9. Advanced Example
```javascript
export default class ProductionErrorBoundary extends React.Component {
  state = { hasError: false, error: null };
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  componentDidCatch(error, errorInfo) {
    sendToLoggingProvider(error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="error-container">
          <h1>System Error</h1>
          <pre>{this.state.error?.message}</pre>
          <button onClick={() => window.location.reload()}>Reload Page</button>
        </div>
      );
    }
    return this.props.children;
  }
}
```
**Explanation:**
Production integration sending data directly to Sentry and presenting user fallback actions.

---

## 10. Real World Example
```javascript
<ErrorBoundary fallback={<NavbarError />}>
  <Navbar />
</ErrorBoundary>
```
**Explanation:**
Wraps UI modules separately so a navbar crash doesn't break body content.

---

## 11. Production Example
```javascript
const withErrorBoundary = (Component, Fallback) => (props) => (
  <ErrorBoundary fallback={<Fallback />}>
    <Component {...props} />
  </ErrorBoundary>
);
```
**Explanation:**
HOC utility wrapper wrapping components dynamically in boundaries.

---

## 12. Folder Structure
```
src/
└── components/
    └── ErrorBoundary.js
```

---

## 13. Interview Questions
- **Q1:** Do Error Boundaries catch errors in event handlers?
  *Answer:* No, they do not. Use standard try/catch inside event handlers.

---

## 14. Common Mistakes
- **Mistake:** Attempting to build error boundary as a functional component.
  *Solution:* React error boundaries MUST be class components as hook equivalents do not exist yet.

---

## 15. Best Practices
- Wrap critical parts of your layout separately.

---

## 16. Performance Considerations
No overhead. Error boundary logic only triggers on runtime exceptions.

---

## 17. Security Considerations
Clean display of error messages prevents exposing backend trace logs.

---

## 18. Exercises
Create a division widget that throws an error if division is by zero.

---

## 19. Solutions
Throws error in JSX causing error boundary fallback.

---

## 20. Summary
Error Boundaries prevent entire UI crashes by rendering custom fallbacks.
