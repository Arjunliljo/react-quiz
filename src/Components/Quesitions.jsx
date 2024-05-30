import Options from "./Options";

function Quesitions({ quesition, dispatch, answer }) {
  return (
    <div>
      <h4>{quesition.question}</h4>
      <Options quesition={quesition} dispatch={dispatch} answer={answer} />
    </div>
  );
}

export default Quesitions;
