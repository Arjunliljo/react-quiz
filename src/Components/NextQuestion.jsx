function NextQuestion({ dispatch, index, length, answer }) {
  if (answer === null) return null;

  const isLastQuestion = index >= length - 1;

  return (
    <button
      className="btn btn-ui"
      onClick={() =>
        dispatch({ type: isLastQuestion ? "finish" : "nextQuestion" })
      }
    >
      {isLastQuestion ? "Finish" : "Next"}
    </button>
  );
}

export default NextQuestion;
