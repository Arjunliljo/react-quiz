function FinishedScreen({ points, totalPoints, dispatch, highScore }) {
  const percentage = (points / totalPoints) * 100;
  return (
    <>
      {" "}
      <p className="result">
        You Scored {points} out of {totalPoints}({Math.ceil(percentage)}%)
      </p>
      <p className="highscore">( Highscore : {highScore} points )</p>
      <button
        className="btn btn-retry"
        onClick={() => dispatch({ type: "reset" })}
      >
        Retry
      </button>
    </>
  );
}

export default FinishedScreen;
