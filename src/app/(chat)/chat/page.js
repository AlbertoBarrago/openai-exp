"use client";
import { useUser } from "@clerk/nextjs";
import { Title } from "@/components/layout/title";
import { SubDescription } from "@/components/lab/subDescription";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { ChatForm } from "@/components/chat/form";
import { LoaderComponent } from "@/components/layout/loader";
import {
  handleChatTimeStamp,
  handleNameByMongoId,
  scrollBottom,
} from "../../../../modules/utils";
import { BubbleComp } from "@/components/chat/bubble";

async function getTextData(pageSize = 150, filter = "") {
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
  const { user } = useUser(),
    { getValues, reset, register, handleSubmit } = useForm({
      defaultValues: {
        text: "",
      },
    }),
    [isLoading, setIsLoading] = useState(true),
    [messagesList, setMessagesList] = useState([]),
    [newMessage, setNewMessage] = useState(""),
    [previousMessage, setPreviousMessage] = useState(""),
    [botIsTyping, setBotIsTyping] = useState(false);

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

  const handleChatSubmit = async (data) => {
    if (!checkIfUserIsAdmin()) {
      console.error("User is not admin");
      return;
    }
    setPreviousMessage(data?.text);
    void getChatBotMessage(data?.text);
    scrollBottom(document.getElementById("chat-container"));
    reset();
  };

  const getChatBotMessage = async (text) => {
    setBotIsTyping(true);
    // const message = await chatBot("user", text);
    //call the route chat/route
    const response = await fetch(
      `${process.env.BASE_URL}/api/openai/chat/post`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ message: text, role: "user" }),
      }
    );
    const message = await response.json();
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
      void handleChatSubmit(getValues());
    }
  };

  const cleanForm = (e) => {
    e.preventDefault();
    reset();
  };

  const checkIfUserIsAdmin = () => {
    return user?.id === process.env.MONGO_ADMIN_ID;
  };

  useEffect(() => {
    void getTextData(null, "").then((data) => {
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
    setTimeout(() => {
      scrollBottom(document.getElementById("chat-container"));
    }, 100);
    void postOnMongo(previousMsg);
  }, [previousMessage]);

  useEffect(() => {
    if (!newMessage) return;
    let newMsg = {
      author: "bot",
      creationDate: handleChatTimeStamp(new Date().getTime()),
      message: newMessage,
      avatar: "pepe.png",
      header: true,
      footer: true,
      side: "end",
    };
    setMessagesList([...messagesList, newMsg]);
    setTimeout(() => {
      scrollBottom(document.getElementById("chat-container"));
    }, 100);
    void postOnMongo(newMsg);
  }, [newMessage]);

  return (
    <main
      className={`container mx-auto text-center w-100 p-0 md:p-1 animate__animated animate__fadeIn`}
    >
      <Title title={"OpenAi"} subTitle={"chat"} />
      <SubDescription description={"Here you can test the Chat"} />
      <div className={`h-auto`}>
        {isLoading && <LoaderComponent />}
        {!isLoading && (
          <>
            <div
              id={`chat-container`}
              className={`h-auto pe-20 ps-20 overflow-auto`}
            >
              {!messagesList.length && (
                <p className={`text-accent text-xl animate-bounce`}>
                  Start to talking...
                </p>
              )}
              {messagesList?.length > 0 &&
                messagesList.map((message, index) => {
                  return (
                    <BubbleComp
                      key={index}
                      author={message.author}
                      header={message.header}
                      time={message.creationDate}
                      side={message.side}
                      message={message.message}
                      avatar={message.avatar}
                    ></BubbleComp>
                  );
                })}
              {botIsTyping && (
                <span className="loading loading-dots loading-sm mt-10 float-right"></span>
              )}
            </div>

            <div className={`sticky top-[100vh] mt-10 pe-20 ps-20`}>
              <ChatForm
                cleanForm={cleanForm}
                onSubmit={handleSubmit(handleChatSubmit)}
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
