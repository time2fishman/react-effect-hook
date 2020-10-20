[![General Assembly Logo](https://camo.githubusercontent.com/1a91b05b8f4d44b5bbfb83abac2b0996d8e26c92/687474703a2f2f692e696d6775722e636f6d2f6b6538555354712e706e67)](https://generalassemb.ly/education/web-development-immersive)

# React useEffect()

So far, we've used react components to build simple applications. We've added state using the useState hook and passed down state to our children components as props. In order to do more complex things, we'll have to use life cycle methods.

## Prerequisites

- React
- Components
- State and props

## Objectives

By the end of this, developers should be able to:

- Explain how to use useEffect()
- Retrieve data from an API inside of a component

## Introduction

How do we get data from an API? Well we could drop in an AJAX call to fetch some
data, but our component would likely render before the AJAX request finished.
Our component would see that our data is `undefined` and either render a
blank/empty component or throw an error.

How do we incorporate third party libraries like `fetch` or `axios` with React?
It sounds complicated... Do we put that in render?

This lesson will introduce the Component Life Cycle: hooks that are fired at
different states of a components "life" for solving the problems described
above, as well as many others.

So, what is the Component Life Cycle?




## The Component Life Cycle



### The Life Cycle Methods (10 min / 0:20)


When we create a react component we get a couple of lifecycle methods included
that we can use to add functionality to our components. These methods are
invoked at specific periods during the "life" of a component, like when it
mounts to the DOM or unmounts from the DOM. While there are a lot of lifecycle
methods, there are only a few that you will use regularly.

Here is a good diagram of the [Lifecycle Methods](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/) for class components.
We have been using functional components but it is good to get familiar with both.

There are three types of component lifecycle methods:

**the useEffect() hook gets called inside of the functional component**

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

# Making Fetch Requests to third party APIs

## The Color API

We can make fetch requests to this API at `http://www.thecolorapi.com/id?rgb=255,255,255`. There are many parameters
we can use but for our purposes we will just be using the `rgb` parameter. It takes three values which are separated by commas.

When our page loads, we can make a fetch request inside of the useEffect() hook:

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

We can also make fetch call directly inside out useEffect() hook

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



Review the documentation on
[The Component Life Cycle](https://reactjs.org/docs/react-component.html#the-component-lifecycle).
[The useEffect Hook](https://reactjs.org/docs/hooks-effect.html)
