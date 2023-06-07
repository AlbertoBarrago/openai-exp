"use client";
import { ChatBubble } from "react-daisyui";
import ReactMarkdown from "react-markdown";

export const BubbleComp = ({ author, header, time, avatar, side, message }) => {
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
        <ChatBubble.Message className={`text-left`}>
          <ReactMarkdown>{message}</ReactMarkdown>
        </ChatBubble.Message>
      </ChatBubble>
    </div>
  );
};
