import { useEffect } from "react";
import Header from "./Components/Header";
import Loader from "./Components/Loader";
import Error from "./Components/Error";
import Main from "./Components/Main";
import { useReducer } from "react";
import StartScreen from "./Components/StartScreen";
import Quesitions from "./Components/Quesitions";

const initialData = {
  quesitions: [],

  //loading, ready, error, active, finished
  status: "Loading",
  index: 0,
  answer: null,
  points: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataRecieved":
      return { ...state, status: "Ready", quesitions: action.payload };

    case "dataFailed":
      return { ...state, status: "Error" };

    case "start":
      return { ...state, status: "active" };

    case "newAnswer":
      const quesition = state.quesitions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          quesition.correctOption === action.payload
            ? state.points + quesition.points
            : state.points,
      };

    default:
      throw new Error("Unknown Error");
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialData);

  const { quesitions, status, index, answer } = state;

  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataRecieved", payload: data }))
      .catch(() => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <>
      <div className="app">
        <Header></Header>

        <Main>
          {status === "Loading" && <Loader />}
          {status === "Error" && <Error />}
          {status === "Ready" && (
            <StartScreen length={quesitions.length} dispatch={dispatch} />
          )}
          {status === "active" && (
            <Quesitions
              quesition={quesitions[index]}
              dispatch={dispatch}
              answer={answer}
            />
          )}
        </Main>
      </div>
    </>
  );
}

export default App;
