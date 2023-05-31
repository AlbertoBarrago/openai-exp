export const GoToLab = ({ goTo }) => {
  return (
    <>
      <div className={`flex gap-4 justify-center mb-10`}>
        <div>
          <button
            onClick={() => {
              goTo("/image");
            }}
            className={`btn btn-btn-secondary`}
          >
            Go to Image{" "}
            <i className="bi bi-caret-right-fill transition duration-200 hover:translate-x-0.5"></i>
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              goTo("/image");
            }}
            className={`btn btn-btn-secondary`}
          >
            Go to Text{" "}
            <i className="bi bi-caret-right-fill transition duration-200 hover:translate-x-0.5"></i>
          </button>
        </div>
      </div>
    </>
  );
};
