import "./styles.css";
import React, { useState } from "react";

export default function App() {
  function addComponentFromText(compFunc) {
    window.React = React;
    eval(compFunc);
    const NewComp = window.NewComp;
    console.log(NewComp);
  }

  const [update, setUpdate] = useState(false);

  return (
    <div className="App">
      <h1>Hello Imran Farooq</h1>
      <h2>Start editing to see some magic happen!</h2>
      {window.NewComp && <NewComp />}
      <button
        onClick={() => {
          addComponentFromText(
            //text này có thể load từ server
            "function NewComp(props) { return React.createElement('h2', {},'New component')}"
          );
          setUpdate(!update);
        }}
      >
        Add Component
      </button>
    </div>
  );
}
