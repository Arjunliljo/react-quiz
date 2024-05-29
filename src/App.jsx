import { useEffect } from "react";
import Header from "./Components/Header";
import Main from "./Components/Main";
import { useReducer } from "react";

const initialData = {
  quesitions: [],

  //loading, ready, error
  status: "Loading",
};

function reducer(state, action) {
  switch (action.type) {
    case "dataRecieved":
      return { ...state, status: "Ready", quesitions: action.payload };

    case "dataFailed":
      return { ...state, status: "Error" };

    default:
      throw new Error("Unknown Error");
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialData);

  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataRecieved", payload: data }))
      .catch(() => dispatch({ type: "dataFailed" }));
  }, []);

  console.log(state);

  return (
    <>
      <div className="app">
        <Header></Header>

        <Main>
          <p>1/15</p>
          <p>Quesition ?</p>
        </Main>
      </div>
    </>
  );
}

export default App;
