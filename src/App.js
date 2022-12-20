import React, { useEffect, useState } from 'react';
import './App.css';


function App() {
  const [count, setCount] = useState(0)

  // Will run every time the count state changes as well as on the initial component mount
  //   useEffect(() => {
  //     console.log('hello')
  //     document.title = `Count: ${count}`
  //   }, [count])

  // // Will only run once when this component mounts
  //   useEffect(() => {
  //     console.log("world")
  //   }, [])

  useEffect(() => {
    document.title = `Document title changed ${count} times!`
    console.log('useEffect has run');
    // The clean up funciton runs BEFORE the lines above
    return () => {
      console.log(`Document title changing from ${count} to ${count + 1}`)
    }
  })

  return (
    <div className="App">
      <p>You cicked the button {count} times!</p>
      <button onClick={() => setCount(count + 1)}>Click Me</button>
    </div>
  );
}

export default App;
