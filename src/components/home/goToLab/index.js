export const GoToLab = ({ goToDashboard, goToImage }) => {
  return (
    <>
      <div className={`flex gap-4 justify-center mb-10`}>
        <div>
          <button onClick={goToDashboard} className={`btn btn-btn-secondary`}>
            Go to Image{" "}
            <i className="bi bi-caret-right-fill transition duration-200 hover:translate-x-0.5"></i>
          </button>
        </div>
        <div>
          <button onClick={goToImage} className={`btn btn-btn-secondary`}>
            Go to Text{" "}
            <i className="bi bi-caret-right-fill transition duration-200 hover:translate-x-0.5"></i>
          </button>
        </div>
      </div>
    </>
  );
};
