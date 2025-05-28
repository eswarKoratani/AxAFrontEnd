import React, { useEffect, useState } from 'react';
import CreateTaskForm from "./components/CreateTaskForm";
import APIManager from "./apimanager/APIManager";

type Task = {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  startDate: string;
  status: string;
};

const App: React.FC = () => {
    const [data, setData] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        APIManager.getTasks()
            .then((json) => setData(json))
            .catch((err) => setError(err.message));
    }, []);
    // @ts-ignore

  return (
      <>
          <div style={{padding: '20px'}}>
              <h2>List of Items</h2>
              <h3><CreateTaskForm/></h3>
              {data.map((item: any) => (
              <div
                  key={item.id}
                  style={{
                      border: '1px solid #ccc',
                      padding: '10px',
                      marginBottom: '10px',
                      borderRadius: '5px',
                  }}
              >
                  {item.title}
              </div>
              ))}
          </div>
      </>
  );
};

export default App;


// export default App;

