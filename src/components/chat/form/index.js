import { Textarea } from "react-daisyui";

export const ChatForm = ({ handleKeyDown, cleanForm, onSubmit, register }) => {
  return (
    <form className={`w-full`} onSubmit={onSubmit} onKeyDown={handleKeyDown}>
      <label className={`label`}>
        <span className={`label-text`}>Be kind</span>
      </label>
      <Textarea
        placeholder={`Write something...`}
        className={`textarea w-full textarea-bordered border-primary`}
        {...register("text", { required: true })}
      />
      <div className={`flex justify-end`}>
        <button
          className={`btn btn-default btn-sm mt-2 me-2`}
          onClick={cleanForm}
        >
          Clean
        </button>
        <button className={`btn btn-primary btn-sm mt-2`} type={"submit"}>
          Send
        </button>
      </div>
    </form>
  );
};
