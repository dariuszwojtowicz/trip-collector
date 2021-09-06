import React, {useEffect, useState} from 'react';
import axios from 'axios'
import './App.css';

export const App = (): JSX.Element => {
  const [response, setResponse] = useState<{ name: string }[]>();

  useEffect(() => {
    axios.get('/api/v1/trips').then((res) => {
      const response = res.data;
      setResponse(response);
    });
  }, []);

  return (
    <div className="App">
      <h1>Hello from the frontend 5!</h1>
      <h1>{response ? response.map(trip => trip.name).join(', ') : 'No trips defined'}</h1>
    </div>
  );
}

export default App;
