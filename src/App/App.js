import React, { Component } from 'react';
import './App.css';
import EmailForm from "./components/EmailForm";

class App extends Component {
  render() {
    return (
      <div className="App">
        <EmailForm />
      </div>
    );
  }
}

export default App;
