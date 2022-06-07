[![General Assembly Logo](https://camo.githubusercontent.com/1a91b05b8f4d44b5bbfb83abac2b0996d8e26c92/687474703a2f2f692e696d6775722e636f6d2f6b6538555354712e706e67)](https://generalassemb.ly/education/web-development-immersive)

# React useEffect()

So far, we've used react components to build simple applications. We've added state using the useState hook and passed down state to our children components as props. In order to do more complex things such as fetching data, we'll have to learn about React life cycle methods.

## Prerequisites

- React
- Components
- State and props

## Objectives

By the end of this, developers should be able to:

- Explain how to use React's useEffect
- Use asynchronous functions within React
- Retrieve data from an API inside of a component

## Introduction

How do we get data from an API in our React app? Well we could drop in an AJAX call to fetch some
data, but our component would likely render before the AJAX request finished.
Our component would see that our data is `undefined` and either render a
blank/empty component or throw an error.

This lesson will introduce the Component Life Cycle: hooks that are fired at
different states of a components "life" for solving the problems described
above, as well as many others.

So, what is the Component Life Cycle?

## The Component Life Cycle


### The Life Cycle Methods


When we create a React component we have a few events that happen over the course of its lifecycle. First -- it **mounts**, or it **renders** onto the page. Then, `state` and `props` can update, and the component **renders** again. Finally, the component **unmounts** from the DOM. Here is a good diagram of the [Lifecycle Methods](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/) for class components. We have been using functional components but it is good to get familiar with the life cycle methods.

`useEffect` runs when these lifecycle events occur.

Let's examine the syntax of a useEffect!

```js
import { useEffect } from "react";

useEffect(() => {
  doSomething();
}, [someState, anotherState, someProp]);
```

Let's break this down:

1. First, we import the useEffect hook from `react`.
2. We call the `useEffect` hook and pass it up to two arguments:
   1. The first argument (the **effect**) is an arrow function containing a block of code to run.
   2. The second (and optional) argument (the **dependency array**) holds an array of values: whenever any of these values change, the **effect** will run.

###

We will use the `useEffect` hook to perform "side effects".

### Performing Side Effects Using `useEffect()`

Side effects include performing tasks such as:

- Fetching data
- Using timers
- Manually updating the DOM
- Managing subscriptions

> Key Point: We will use the `useEffect` hook to perform actions when the component renders on the page, when its props or state update, or when it is removed from the page.

#### Adding the `useEffect()` Hook

Like `useState()` and other hooks, because they are functions, we invoke them from the top-level of the function component:

```js
import React, { useState, useEffect } from 'react';

function Counter() {
	const [count, setCount] = useState(0);

	useEffect(() => {
		// Update the document title using the browser API
		document.title = `Document title changed ${count} times!`;
	});

	return (
		<div>
			<p>You clicked {count} times!</p>
			<button onClick={() => setCount(count + 1)}>Click me</button>
		</div>
	);
}

export default Counter;
```

`useEffect()` takes a callback function as its first and only _required_ argument.

**By default, the effect's callback function is going be invoked after every render of the component.**

#### Preventing Side Effects from Running

In many cases, you will want to optimize the component so that side effects only run if:

- Certain data changes (typically a prop or state variable).
- After the initial render, but not after subsequent renders (as with `componentDidMount` in class components).

The `useEffect()` hook provides for these scenarios by accepting an array as a second argument.

The array is designed to hold a list of dependencies, that is, a list of variables and/or object properties that causes the side effect to run only if at least one of the dependencies change their value. If we forego the second argument entirely, the effect will run after every render.

Providing an empty array (`[]`), will result in the side effect only running after the **initial** render. Let's check this out:

```js
// Add the [] as a 2nd argument
useEffect(() => {
  document.title = `Document title changed ${count} times!`;
  console.log("useEffect has run");
}, []);
```

Clear the console and refresh. The "useEffect was called" message will be logged. However, unlike without the `[]` arg, clicking the button will no longer run the side effect aka we won't see the counter update But if we `console.log(count)` we will see that it is still changing behind the scenes!

What if we want something to run between our effects? We can add a **cleanup** function as the `return` value of the `useEffect`:

```js
// Add the [] as a 2nd argument
useEffect(() => {
  document.title = `Document title changed ${count} times!`;
  console.log("useEffect has run");
  return () => {
    console.log(`Document title changing from ${count} to ${count + 1}`);
  }
}, []);
```

Here's a summary of when side effects and their cleanup functions run according to what is passed as a second argument:

| Second Arg                   | When **Effect** and **Cleanup** Functions Run                                                                                                                                                                      |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| none                         | **Effect fn:** Runs after every render.<br>**Cleanup fn:** Runs just before then next render to cleanup the previous render's effects.                                                                             |
| `[]`                         | **Effect fn:** Runs once after initial render (mounting).<br>**Cleanup fn:** Runs once before unmounting.                                                                                                          |
| `[depVar, obj.depProp, ...]` | **Effect fn:** Runs once after initial render, then only when either `depVar`, `obj.depProp`, etc. changes.<br>**Cleanup fn:** Runs before next render if previous render ran the effect and also when unmounting. |


### Another way to think about how useEffect connects to lifecycle methods:

**Mounting:** called when a component is created and inserted into the DOM.

```js
  {/* This only gets fired when this component is mounted */}
  useEffect(() => {
    console.log('I only get logged when this component mounts')
  }, [])
```

**Updating:** usually triggered by changes in props or state.

```js
  {/* This will run upon component mounting and every change in state */}
  useEffect(() => {
    console.log('I get logged on mount and every time I hear state change')
  })
```

**Unmounting:** called when a component is being removed from the DOM.

```js

  useEffect(() => {

    {/* This return will fire when the component gets unmounted*/}
    return () => {
      console.log('I get logged when this component unmounts')
    }
  })
```

## APIs and `useEffect()`

We can make fetch requests to this API at `http://www.thecolorapi.com/id?rgb=255,255,255`. There are many parameters
we can use but for our purposes we will just be using the `rgb` parameter. It takes three values which are separated by commas.

When our page loads, we can call a function that makes a fetch call to the color API inside of our useEffect function:

```js
  import React, { useState, useEffect} from 'react'

  function App(){
    const [color, setColor] = useState()

    const fetchColor = () => {
        const r = Math.floor(Math.random() * 256)
        const g = Math.floor(Math.random() * 256)
        const b = Math.floor(Math.random() * 256)
        fetch(`http://www.thecolorapi.com/id?rgb=${r},${g},${b}`)
        .then(res => res.json())
        .then(res => {
            console.log(res)
            setColor(res)
        })
    }

    useEffect(() => {
        fetchColor()
    }, [])


    return(
      <div>
        {color ? <img src={color.image.bare}/> : null}
        <button onClick={fetchColor}>Get New Color</button>
      </div>
    )
  }

  export default App;

```

We can also make fetch calls directly inside our useEffect() function

```js
useEffect(() => {
    const r = Math.floor(Math.random() * 256)
    const g = Math.floor(Math.random() * 256)
    const b = Math.floor(Math.random() * 256)
    fetch(`http://www.thecolorapi.com/id?rgb=${r},${g},${b}`)
      .then(res => res.json())
      .then(res => {
        console.log(res)
        setColor(res)
      })
  }, [])


```

## Review Questions

- Where do we write side effects within React?
- What happens if we don't provide a second argument to `useEffect`?

## Learn More!

- [A complete guide to useEffect](https://overreacted.io/a-complete-guide-to-useeffect/)
- [How to fetch data with React Hooks](https://www.robinwieruch.de/react-hooks-fetch-data)
- [Official Documention On The Component Life Cycle](https://reactjs.org/docs/react-component.html#the-component-lifecycle).
- [Official Documentation On The useEffect Hook](https://reactjs.org/docs/hooks-effect.html)
