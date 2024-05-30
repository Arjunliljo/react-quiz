import { useEffect, useReducer } from "react";
import Header from "./Components/Header";
import Loader from "./Components/Loader";
import Error from "./Components/Error";
import Main from "./Components/Main";
import StartScreen from "./Components/StartScreen";
import Quesitions from "./Components/Quesitions";
import NextQuestion from "./Components/NextQuestion";
import Progress from "./Components/Progress";
import FinishedScreen from "./Components/FinishedScreen";
import Footer from "./Components/Footer";
import Timer from "./Components/Timer";

const ques = [
  {
    question: "Which is the most popular JavaScript framework?",
    options: ["Angular", "React", "Svelte", "Vue"],
    correctOption: 1,
    points: 10,
  },
  {
    question: "Which company invented React?",
    options: ["Google", "Apple", "Netflix", "Facebook"],
    correctOption: 3,
    points: 10,
  },
  {
    question: "What's the fundamental building block of React apps?",
    options: ["Components", "Blocks", "Elements", "Effects"],
    correctOption: 0,
    points: 10,
  },
  {
    question:
      "What's the name of the syntax we use to describe the UI in React components?",
    options: ["FBJ", "Babel", "JSX", "ES2015"],
    correctOption: 2,
    points: 10,
  },
  {
    question: "How does data flow naturally in React apps?",
    options: [
      "From parents to children",
      "From children to parents",
      "Both ways",
      "The developers decides",
    ],
    correctOption: 0,
    points: 10,
  },
  {
    question: "How to pass data into a child component?",
    options: ["State", "Props", "PropTypes", "Parameters"],
    correctOption: 1,
    points: 10,
  },
  {
    question: "When to use derived state?",
    options: [
      "Whenever the state should not trigger a re-render",
      "Whenever the state can be synchronized with an effect",
      "Whenever the state should be accessible to all components",
      "Whenever the state can be computed from another state variable",
    ],
    correctOption: 3,
    points: 30,
  },
  {
    question: "What triggers a UI re-render in React?",
    options: [
      "Running an effect",
      "Passing props",
      "Updating state",
      "Adding event listeners to DOM elements",
    ],
    correctOption: 2,
    points: 20,
  },
  {
    question: 'When do we directly "touch" the DOM in React?',
    options: [
      "When we need to listen to an event",
      "When we need to change the UI",
      "When we need to add styles",
      "Almost never",
    ],
    correctOption: 3,
    points: 20,
  },
  {
    question: "In what situation do we use a callback to update state?",
    options: [
      "When updating the state will be slow",
      "When the updated state is very data-intensive",
      "When the state update should happen faster",
      "When the new state depends on the previous state",
    ],
    correctOption: 3,
    points: 30,
  },
  {
    question:
      "If we pass a function to useState, when will that function be called?",
    options: [
      "On each re-render",
      "Each time we update the state",
      "Only on the initial render",
      "The first time we update the state",
    ],
    correctOption: 2,
    points: 30,
  },
  {
    question:
      "Which hook to use for an API request on the component's initial render?",
    options: ["useState", "useEffect", "useRef", "useReducer"],
    correctOption: 1,
    points: 10,
  },
  {
    question: "Which variables should go into the useEffect dependency array?",
    options: [
      "Usually none",
      "All our state variables",
      "All state and props referenced in the effect",
      "All variables needed for clean up",
    ],
    correctOption: 2,
    points: 30,
  },
  {
    question: "An effect will always run on the initial render.",
    options: [
      "True",
      "It depends on the dependency array",
      "False",
      "In depends on the code in the effect",
    ],
    correctOption: 0,
    points: 30,
  },
  {
    question: "When will an effect run if it doesn't have a dependency array?",
    options: [
      "Only when the component mounts",
      "Only when the component unmounts",
      "The first time the component re-renders",
      "Each time the component is re-rendered",
    ],
    correctOption: 3,
    points: 20,
  },
];

const SECS_PER_QUESTION = 30;

const initialData = {
  quesitions: ques,

  //loading, ready, error, active, finished
  status: "Loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secondsRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataRecieved":
      return { ...state, status: "Ready" };

    case "dataFailed":
      return { ...state, status: "Ready" };

    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: SECS_PER_QUESTION * state.quesitions.length,
      };

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

    case "nextQuestion":
      return {
        ...state,
        answer: null,
        index: state.index + 1,
      };
    case "finish":
      return {
        ...state,
        status: "finished",
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };

    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };

    case "reset":
      return {
        ...initialData,
        status: "active",
        quesitions: state.quesitions,
        secondsRemaining: state.quesitions.length * SECS_PER_QUESTION,
      };

    default:
      throw new Error("Unknown Action");
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialData);

  const {
    quesitions,
    status,
    index,
    answer,
    points,
    highScore,
    secondsRemaining,
  } = state;

  const totalPoints = quesitions.reduce((acc, ques) => acc + ques.points, 0);

  useEffect(() => {
    // fetch("http://localhost:8000/questions")
    //   .then((res) => res.json())
    //   .then((data) => dispatch({ type: "dataRecieved", payload: data }))
    //   .catch(() => dispatch({ type: "dataFailed" }));

    // for hosting porpose
    dispatch({ type: "dataRecieved" });
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
            <>
              <Progress
                length={quesitions.length}
                index={index}
                points={points}
                totalPoints={totalPoints}
              />
              <Quesitions
                quesition={quesitions[index]}
                dispatch={dispatch}
                answer={answer}
              />
              <Footer>
                <Timer
                  dispatch={dispatch}
                  secondsRemaining={secondsRemaining}
                />
                <NextQuestion
                  dispatch={dispatch}
                  index={index}
                  answer={answer}
                  length={quesitions.length}
                />
              </Footer>
            </>
          )}
          {status === "finished" && (
            <FinishedScreen
              points={points}
              totalPoints={totalPoints}
              dispatch={dispatch}
              highScore={highScore}
            />
          )}
        </Main>
      </div>
    </>
  );
}

export default App;
