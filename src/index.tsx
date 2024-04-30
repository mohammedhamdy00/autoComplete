import React from "react";
import ReactDOM from "react-dom";
import "./style.css";
import Autocomplete from "./AutoComplete";
import suggestionList from "./suggestionList.json";

const rootElement = document.getElementById("root") as HTMLElement;

const renderApp = () => {
  ReactDOM.render(
    <React.StrictMode>
      <div className="container">
        {/* Passed props to Autocomplete component */}
        <Autocomplete
          apiUrl="" // Assuming apiUrl will be used later, left empty for now
          suggestions={suggestionList}
          onSelect={(selected: string) => {
          console.log(selected); // Log selected suggestion
          }}
        />
      </div>
    </React.StrictMode>,
    rootElement
  );
};

// Invoking the render function
renderApp();
