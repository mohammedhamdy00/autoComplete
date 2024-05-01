1- What is the difference between Component and PureComponent?
Component and PureComponent are base classes that you can use to create reusable UI components. The main difference between them lies in how they handle updates to the component's state and props.
An example where using PureComponent might break your app is when you are dealing with complex data structures or nested objects/arrays within your props or state.

2-context + shouldComponentUpdate might be dangerous. Why is that?
Using context in conjunction with shouldComponentUpdate() can introduce potential issues due to the way React's reconciliation process works and the nature of context updates.

3-Describe 3 ways to pass information from a component to its PARENT.

- Callback Functions
- Context API
- State Management Libraries like Redux

4-Give 2 ways to prevent components from re-rendering.

- Using React.memo() for Functional Components
- Implementing shouldComponentUpdate() for Class Components

5-What is a fragment and why do we need it? Give an example where it might break my app.

- A fragment in React is a way to group multiple children elements under a single parent without adding unnecessary nodes to the DOM.
- Example where it might break your app:
  Consider a scenario where you're returning a list of elements from a component's render method, and you forget to wrap them in a fragment or a parent element. This can lead to unexpected behavior or errors because React requires a single parent element to be returned from the render method.

6-Give 3 examples of the HOC pattern

- withAuthentication HOC:
  This HOC can be used to protect certain routes or components in your application, ensuring that they are only accessible to authenticated users.
  It wraps the protected component and checks if the user is authenticated. If not, it can redirect them to the login page or display a message.
- withLoading HOC:
  This HOC can be used to display a loading indicator while data is being fetched from an API or while performing some asynchronous operation.
  It wraps the component and manages a loading state, rendering a loading indicator until the operation completes.
- withLogger HOC:
  This HOC can be used to log props and state changes of a component for debugging purposes.
  It wraps the component and adds logging functionality to its lifecycle methods.

7- What's the difference in handling exceptions in promises, callbacks and async…await?

- Handling exceptions in promises, callbacks, and async/await have some differences in syntax and behavior
  - Promises => To handle exceptions in promises, you typically use the .catch() method, which allows you to specify a callback function to handle any errors that occur during the promise chain.
    Inside the .catch() block, you can handle the error, log it, or perform any necessary cleanup.
  - Callbacks => Callbacks are functions passed as arguments to other functions, commonly used in asynchronous programming.
    When an error occurs in a callback-based function, you typically follow a convention where the first argument of the callback function represents an error object if an error occurs.
    It's up to the function's implementation to check for errors and call the callback with the error object if necessary.
  - Async/Await => Inside an async function, you can use try/catch blocks to handle exceptions in a synchronous style, making error handling more straightforward and intuitive.

8- How many arguments does setState take and why is it async ?

- In React, the setState function is used to update the state of a component. It typically takes two arguments: an object that represents the updated state, and an optional callback function that will be executed after the state has been updated. However, setState can also accept a function as the first argument, which receives the previous state and props as arguments and returns an object representing the new state
  ex:- setState(updater, [callback]);

9- List the steps needed to migrate a Class to Function Component ?

- Convert Class Component to Function Component:
  Replace the class component syntax with a functional component syntax. Remove the class keyword, the extends React.Component part, and the render() method.
  Define a function with the same name as the component to create the function component.
  State Conversion:
  Convert state declaration (this.state) to use the useState hook.
  Identify each state variable in the class component and use separate useState hooks to manage them in the function component.
  Lifecycle Methods:
  Review the lifecycle methods used in the class component (componentDidMount, componentDidUpdate, componentWillUnmount, etc.).
  For side effects and lifecycle events, use the useEffect hook.
  Convert each lifecycle method to a useEffect hook as needed, ensuring that the effect cleanup is handled correctly.
  Class Methods Conversion:
  Identify any class methods used in the class component (e.g., event handlers, custom methods).
  Convert these class methods to regular JavaScript functions within the function component, or consider using the useCallback hook for memoizing event handlers if they depend on props or state.
  Props Handling:
  Replace references to this.props with direct references to props in the function component.

10- List a few ways styles can be used with components.

- Inline Styles
- CSS Modules
- Styled Components

11- How to render an HTML string coming from the server.

- Rendering HTML strings received from the server in a React component requires caution to prevent potential security vulnerabilities like cross-site scripting (XSS) attacks you can use the dangerouslySetInnerHTML attribute
  ex- const MyComponent = ({ htmlString }) => {
  return (
  <div dangerouslySetInnerHTML={{ __html: htmlString }} />
  );
  };
