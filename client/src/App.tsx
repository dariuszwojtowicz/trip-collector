import React, {useEffect, useState} from 'react';
import axios from 'axios'
import './App.css';

export const App = (): JSX.Element => {
  const [response, setResponse] = useState<{ body?: string }>({});

  useEffect(() => {
    axios.get('/api/v1/say-hello').then((res) => {
      const response = res.data;
      setResponse(response);
    });
  }, []);

  return (
    <div className="App">
      <h1>Hello from the frontend 3!</h1>
      <h1>{response.body}</h1>
    </div>
  );
}

export default App;
