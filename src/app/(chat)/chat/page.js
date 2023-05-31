"use client";
import { useSignIn, useUser } from "@clerk/nextjs";
import { Title } from "@/components/layout/title";
import { SubDescription } from "@/components/lab/subDescription";
import { ChatBubble, Textarea } from "react-daisyui";
import { handleChatTimeStamp } from "../../../../modules/utils";
import { useForm } from "react-hook-form";

export default function ChatPage() {
  const { signIn } = useSignIn();
  const { user } = useUser();
  const {
    setValue,
    getValues,
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      text: "",
    },
  });
  const bubble = (
    author,
    header,
    time,
    avatar,
    footer,
    side,
    message,
    seen
  ) => {
    return (
      <ChatBubble end={side === "end"}>
        {header && (
          <ChatBubble.Header>
            {author && <span className={`me-2`}>{author}</span>}
            {time && (
              <ChatBubble.Time>{handleChatTimeStamp(time)}</ChatBubble.Time>
            )}
          </ChatBubble.Header>
        )}
        {avatar && <ChatBubble.Avatar src={avatar} />}
        <ChatBubble.Message>{message}</ChatBubble.Message>
        {footer && (
          <ChatBubble.Footer>{seen ? "seen" : "to read"}</ChatBubble.Footer>
        )}
      </ChatBubble>
    );
  };

  const cleanForm = (e) => {
    e.preventDefault();
    reset();
  };

  return (
    <main
      className={`container mx-auto text-center w-100 p-2 animate__animated animate__fadeIn`}
    >
      <Title title={"OpenAi"} subTitle={"chat"} />
      <SubDescription
        description={"Here you can test the Text generation API"}
      />
      <div className={`chat-container p-20 rounded`}>
        <div className={` chat-container`}>
          {bubble(
            "OpenAi",
            true,
            new Date().getTime(),
            user?.profileImageUrl,
            true,
            "Hello, I'm OpenAi, how can I help you?",
            "start this it the first message",
            true
          )}
        </div>

        <form className={`w-full`}>
          <label className={`label`}>
            <span className={`label-text`}>Make it clear what you want...</span>
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
      </div>
    </main>
  );
}
