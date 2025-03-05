# Part 2 Questions

## 1. What is the difference between Component and PureComponent? give an example where it might break my app.

The main difference between Component and PureComponent is that PureComponent handles the `shouldComponentUpdate` 
with shallow comparison by default and Component will re-render if any prop or state change. For example, if we are passing an complex nested object as prop it cannot be able to detect the nested changes and it results to not re-rendering on valid changes.


## 2. Context + ShouldComponentUpdate might be dangerous. Can think of why is that?

Combination of context & ShouldComponentUpdate will lead to the problems because if the component using shouldComponentUpdate decides not to re-render, it can block the propagation of context updates to its children, causing inconsistencies in the component tree where components depending on the context data might not receive the latest value, even if the context has changed. 

## 3. Describe 3 ways to pass information from a component to its PARENT.

- Passing a callback function from parent to child. Whenever the callback executed in the child, will get the information in the parent where its defined. For example,

```javascript
function Parent() {
  const [dataFromChild, setDataFromChild] = useState("");

  function handleDataFromChild(data) {
    setDataFromChild(data);
  }

  return (
    <div>
      <h1>Data from Child: {dataFromChild}</h1>
      <Child sendDataToParent={handleDataFromChild} />
    </div>
  );
}

function Child({ sendDataToParent }) {
  const [data, setData] = useState("");

  function handleClick() {
    sendDataToParent(data);
  }

  return (
    <div>
      <input type="text" value={data} onChange={(e) => setData(e.target.value)} />
      <button onClick={handleClick}>Send Data to Parent</button>
    </div>
  );
}

```

- Updating the context from a child component through a setter function consumed from the context.

- Using external or global state management libraries like Redux, MobX where we can dispatch an action which can get the updated information in parent component.

## 4. Give 2 ways to prevent components from re-rendering

- First way is to use the memoization techniques. We can use React.memo as HOC & hooks like useMemo, useCallback to prevent unwanted re-renders.

- In the second way, we can prevent the re-rendering with composition. Like we can use render prop pattern.

## 5. What is a fragment and why do we need it? Give an example where it might break my app.

A fragment is a component in where it warp the children within it, but it won't create a DOM node. They come in handy when you need to structure JSX without adding an unnecessary container element. Basicaly, a react component should always return a single element.
For example, this code:

```javascript
function App() {

  // It cannot return a react element as it doesn't wrap in a one container.
  // This breaks your app
  return (
    <div>App content</div>
    <UserLayout />
  )
}
```

To correct this error we wrap the components in a fragment (<></> or <React.Fragment></React.Fragment> if any props need to use).
```html
return (
  <>
    <div>App content</div>
    <UserLayout />
  </>
)
```

## 6. Give 3 examples of the HOC pattern.

- React Router HOC:

We can have access to router props (`history`, `location` ...) using `withRouter` HOC:

```javascript
const NavbarWithRouter = withRouter(Navbar);
```

- React Memo HOC:

We can wrap our component within React Memo to avoid unwanted re- renders:

```javascript
export default React.memo(UserDetail);
```

- A custom HOC

Here is an example of a very simple HOC, which allows adding custom styles to the existing component

```javascript
 function withStyles(Component) {
  return props => {
    const style = { padding: '0.2rem', margin: '1rem' }
    return <Component style={style} {...props} />
  }
}

const Button = () = <button>Click me!</button>
const Text = () => <p>Hello World!</p>

const StyledButton = withStyles(Button)
const StyledText = withStyles(Text)
```


## 7. What is the difference in handling exceptions in promises, callbacks and async...await?

Handling exceptions in Promises, callbacks, and async-await differs in terms of syntax and approach

Promises: Errors in Promises are caught using .catch() or .then(null, rejectionHandler).
```javascript
handleOperation(args)
  .then(result => {
    // do something with result
  })
  .catch(error => {
    // handle the error in some way
  })
```
Callbacks: Errors in callbacks are typically checked by looking at the error argument.
```javascript
handleOperation(userId, (error, result) => {
  if (error) {
    // handle the error in some way
  } else {
    // do something with result
  }
})
```
Async/Await: When using async/await, you can use try/catch blocks to handle exceptions.

```javascript
try {
  const user = await getUserInfo(args)
  // do something with result
} catch (error) {
  // handle the error in some way
}
```

## 8. How many arguments does setState take and why is async

The setState method does takes 2 arguments:
- The new state value
- A callback, that will be executed when the state actually changes

It is an asynchronus in nature and so React updates all the states in one shot with Automatic batching mechanism.

## 9. List the steps needed to migrate a class to function component

- Change the class expression to a function either in a standard way or with arrow functions.
- Get rid of `this` references, since all the methods/attributes will be within the function scope
- The state initialized in the constructor, must be initialized with the `useState` hook
- All the logic within the lifecycle methods, should be handled by `useEffect` hooks.
  For example, for componentDidMount: `useEffect(() => { ... }, [])` (effect with no dependencies)
- The return JSX in `render` method should be returned by the functional component.

## 10. List a few ways styles can be used with components

### Inline styles

You can give a component inline styles through `style` prop:

```javascript
<div style={{ backgroundColor: '#ffff', padding: 5 }}>App content</div>
```

### Pure CSS

Define the styles in the css files through classname, id or any tag notation.

```javascript
import './styles.css';

...

<div className="appWrapper">content</div>
```

### CSS Processors / CSS in JS libraries (styled-components, Bootstarp).


```javascript
const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid #BF4F74;
  color: #BF4F74;
  margin: 0 1em;
  padding: 0.25em 1em;
`

<div className="mr-2">App content</div>

```

## 11. How to render an HTML string coming from the server

To render an HTML string coming from the server in React, you can use the dangerouslySetInnerHTML prop. However, you should be extremely cautious when doing this, as it can pose security risks if the HTML string contains malicious code

```javascript
function HTMLRenderer({ htmlString }) {
  // Sanitize and validate the HTML string on the server-side

  // Use the 'dangerouslySetInnerHTML' prop to render the HTML string.
  return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
}

export default HTMLRenderer;
```