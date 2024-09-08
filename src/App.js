// src/App.js
import React from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import ChatForm from './components/ChatForm';

function App() {
  return (
    <div className="App">
      <h1>BEAM: Bot Engine for Application Messaging UI</h1>
      <ChatForm />
    </div>
  );
}

export default App;