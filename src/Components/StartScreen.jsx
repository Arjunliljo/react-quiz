// eslint-disable-next-line react/prop-types
function StartScreen({ length, dispatch }) {
  return (
    <div className="start">
      <h2>Welcome to react Quiz</h2>
      <h3>{length} quesitions to test your react mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Lets Start
      </button>
    </div>
  );
}

export default StartScreen;
