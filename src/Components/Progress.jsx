function Progress({ index, length, points, totalPoints }) {
  return (
    <header className="progress">
      <progress value={index} max={length}></progress>
      <p>
        Question{" "}
        <strong>
          {index + 1} / {length}{" "}
        </strong>
      </p>
      <p>
        <strong>
          {points} / {totalPoints}{" "}
        </strong>
      </p>
    </header>
  );
}

export default Progress;
