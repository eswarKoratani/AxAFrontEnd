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
  const [data, setData] = useState<Task>();
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
              {/*{data.map(item => ( */}
              <div
                  key={data?.id}
                  style={{
                      border: '1px solid #ccc',
                      padding: '10px',
                      marginBottom: '10px',
                      borderRadius: '5px',
                  }}
              >
                  {data?.title}
              </div>
              {/*))}*/}
          </div>
          {/*<button onClick={() => CreateTaskForm.setShowForm(true)}>Add Task</button>*/}
          <div>
              <CreateTaskForm />
          </div>
      </>
  );
};

export default App;


// export default App;

