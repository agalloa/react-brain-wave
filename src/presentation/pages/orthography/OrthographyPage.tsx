import { useState } from "react";
import {
  BrainWaveMessages,
  BrainWaveOrthographyMessages,
  MyMessage,
  TextMessageBox,
  TypingLoader,
} from "../../components";
import { orthographyUseCase } from "../../../core/use-cases";

interface Message {
  text: string;
  isBrainWave: boolean;
  info?: {
    userScore: number;
    errors: string[];
    message: string;
  };
}

export const OrthographyPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async (text: string) => {
    setIsLoading(true);
    setMessages((prev) => [...prev, { text: text, isBrainWave: false }]);

    const { ok, errors, message, userScore } = await orthographyUseCase(text);

    if (!ok) {
      setMessages((prev) => [
        ...prev,
        { text: "No se pudo realizar la corrección", isBrainWave: true },
      ]);
    } else {
      setMessages((prev) => [
        ...prev,
        {
          text: message,
          isBrainWave: true,
          info: {
            errors,
            message,
            userScore,
          },
        },
      ]);
    }

    //todo: Add message of isBrainWave in true
    setIsLoading(false);
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          <BrainWaveMessages text="¡Hola! Soy BrainWave. ¿En qué puedo ayudarte hoy?" />
          {messages.map((message, index) =>
            message.isBrainWave ? (
              <BrainWaveOrthographyMessages key={index} errors={ message.info!.errors } message={ message.info!.message } userScore={ message.info!.userScore } />
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
        placeholder="Mensaje BrainWave..."
        disableCorrections
      />
    </div>
  );
};
