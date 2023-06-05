"use client";
import { useUser } from "@clerk/nextjs";
import { Title } from "@/components/layout/title";
import { SubDescription } from "@/components/lab/subDescription";
import { ChatBubble } from "react-daisyui";
import { useForm } from "react-hook-form";
import { chatBot } from "@/lib/openai-api";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChatForm } from "@/components/chat/form";
import { LoaderComponent } from "@/components/layout/loader";
import {
  handleChatTimeStamp,
  handleNameByMongoId,
  scrollBottom,
} from "../../../../modules/utils";

async function getTextData(pageSize, filter = "") {
  const pageNumber = 1;
  if (filter === "all") {
    filter = "";
    pageSize = 50;
  }

  console.log("FILTER ---> ", filter);

  const res = await fetch(
    `${process.env.BASE_URL}/api/mongo/chat/get/?pageSize=${pageSize}&pageNumber=${pageNumber}&q=${filter}`,
    {
      next: { revalidate: 10 }, // refresh every 10 second
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default function ChatPage() {
  const { user } = useUser();
  const { router } = useRouter();
  const { getValues, reset, register, handleSubmit } = useForm({
    defaultValues: {
      text: "",
    },
  });
  const [isLoading, setIsLoading] = useState(true);
  const [messagesList, setMessagesList] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [previousMessage, setPreviousMessage] = useState("");
  const [botIsTyping, setBotIsTyping] = useState(false);

  const getSideFromLastMessage = () => {
    if (messagesList.length === 0) {
      return "start";
    }
    return messagesList[messagesList.length - 1].side === "start"
      ? "end"
      : "start";
  };

  const postOnMongo = async (data) => {
    if (!data.message) {
      console.error("Message is empty");
      return;
    }
    let request = {
      userId: data.author,
      chatSession: user?.id,
      creationDate: new Date().getTime(),
      message: data?.message,
      avatar: data.avatar,
      header: true,
      footer: true,
      side: getSideFromLastMessage(),
    };
    const response = await fetch(
      `${process.env.BASE_URL}/api/mongo/chat/post`,
      {
        method: "POST",
        body: JSON.stringify(request),
      }
    );
    await response.json();
  };

  const onSubmit = async (data) => {
    if (!user) {
      router.push("/sign-in");
      return;
    }
    setPreviousMessage(data?.text);
    void getChatBotMessage(data?.text);
    scrollBottom(document.getElementById("chat-container"));
    reset();
  };

  const getChatBotMessage = async (text) => {
    setBotIsTyping(true);
    const message = await chatBot("user", text);
    if (!message.success) {
      new Error("Failed to fetch data");
      return;
    }
    setBotIsTyping(false);
    scrollBottom(document.getElementById("chat-container"));
    setNewMessage(message?.chatMsg?.content);
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      void onSubmit(getValues());
    }
  };

  function bubble(author, header, time, avatar, footer, side, message) {
    return (
      <div className={`mb-5`}>
        <ChatBubble end={side === "end"}>
          {header && (
            <ChatBubble.Header>
              {author && <span className={`me-2`}>{author}</span>}
              {time && (
                <ChatBubble.Time>
                  <span className={`text-xs text-secondary`}>{time}</span>
                </ChatBubble.Time>
              )}
            </ChatBubble.Header>
          )}
          {avatar && <ChatBubble.Avatar src={avatar} />}
          <ChatBubble.Message>{message}</ChatBubble.Message>
        </ChatBubble>
      </div>
    );
  }

  const cleanForm = (e) => {
    e.preventDefault();
    reset();
  };

  const checkIfUserIsAdmin = () => {
    return user?.id === process.env.MONGO_ADMIN_ID;
  };

  useEffect(() => {
    if (!checkIfUserIsAdmin()) {
      router.push("/");
      return;
    }
    void getTextData(10, "").then((data) => {
      setMessagesList(data?.responseChatList);
      setIsLoading(false);
      setTimeout(() => {
        scrollBottom(document.getElementById("chat-container"));
      }, 100);
    });
  }, []);

  useEffect(() => {
    if (!previousMessage) return;
    let previousMsg = {
      author: handleNameByMongoId(user?.id),
      creationDate: handleChatTimeStamp(new Date().getTime()),
      message: previousMessage,
      avatar: user?.profileImageUrl,
      header: true,
      footer: true,
      side: "start",
    };
    setMessagesList([...messagesList, previousMsg]);
    void postOnMongo(previousMsg);
  }, [previousMessage]);

  useEffect(() => {
    if (!newMessage) return;
    let newMsg = {
      author: "bot",
      creationDate: handleChatTimeStamp(new Date().getTime()),
      message: newMessage,
      avatar: "https://i.pravatar.cc/50",
      header: true,
      footer: true,
      side: "end",
    };
    setMessagesList([...messagesList, newMsg]);
    void postOnMongo(newMsg);
  }, [newMessage]);

  return (
    <main
      className={`container mx-auto text-center w-100 p-2 animate__animated animate__fadeIn`}
    >
      <Title title={"OpenAi"} subTitle={"chat"} />
      <SubDescription description={"Here you can test the Chat"} />
      <div className={`h-[70vh] p-10`}>
        {isLoading && <LoaderComponent />}
        {!isLoading && (
          <>
            <div
              id={`chat-container`}
              className={`h-[45vh] pe-20 ps-20 overflow-auto`}
            >
              {!messagesList.length && (
                <p className={`text-accent text-xl animate-bounce`}>
                  Start to talking...
                </p>
              )}
              {messagesList?.length > 0 &&
                messagesList.map((message, index) => {
                  return (
                    <div key={index}>
                      {bubble(
                        message.author,
                        message.header,
                        message.creationDate,
                        message.avatar,
                        message.footer,
                        message.side,
                        message.message
                      )}
                    </div>
                  );
                })}
              {botIsTyping && (
                <span className="loading loading-dots loading-sm mt-10 float-right"></span>
              )}
            </div>

            <div className={`sticky top-[100vh] mt-10 pe-20 ps-20`}>
              <ChatForm
                cleanForm={cleanForm}
                onSubmit={handleSubmit(onSubmit)}
                handleKeyDown={handleKeyDown}
                register={register}
              />
            </div>
          </>
        )}
      </div>
    </main>
  );
}
