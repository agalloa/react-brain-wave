import { useState } from "react";
import {
  MyMessage,
  TypingLoader,
  TextMessageBox,
  BrainWaveMessages,
} from "../components";

interface Message {
  text: string;
  isBrainWave: boolean;
}

export const C = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async (text: string) => {
    setIsLoading(true);
    setMessages((prev) => [...prev, { text: text, isBrainWave: false }]);

    // todo: UseCase

    setIsLoading(false);

    //todo: Add message of isBrainWave in true
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          <BrainWaveMessages text="¡Hola! Soy BrainWave. ¿En qué puedo ayudarte hoy?" />
          {messages.map((message, index) =>
            message.isBrainWave ? (
              <BrainWaveMessages key={index} text="Mensaje de BrainWave" />
            ) : (
              <MyMessage key={index} text={message.text} />
            )
          )}
          {isLoading && (
            <div className="col-start-1 col-end-12 fade-in">
              <TypingLoader />
            </div>
          )}
        </div>
      </div>
      <TextMessageBox
        onSendMessage={handlePost}
        placeholder="Mensage BrainWave..."
        disableCorrections
      />
    </div>
  );
};
