import { useState } from "react";
import {
  BrainWaveMessages,
  MyMessage,
  TypingLoader,
  TextMessageBoxSelect,
  BrainWaveMessagesAudio,
} from "../../components";
import { textToAudioUseCase } from "../../../core/use-cases";

const voices = [
  { id: "nova", text: "Nova" },
  { id: "alloy", text: "Alloy" },
  { id: "echo", text: "Echo" },
  { id: "fable", text: "Fable" },
  { id: "onyx", text: "Onyx" },
  { id: "shimmer", text: "Shimmer" },
];

interface TextMessage {
  text: string;
  isBrainWave: boolean;
  type: "text";
}

interface AudioMessage {
  text: string;
  isBrainWave: boolean;
  audio: string;
  type: "audio";
}

type Message = TextMessage | AudioMessage;

export const TextToAudioPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async (text: string, selectedVoice: string) => {
    setIsLoading(true);
    setMessages((prev) => [
      ...prev,
      { text: text, isBrainWave: false, type: "text" },
    ]);

    const { ok, message, audioUrl } = await textToAudioUseCase(
      text,
      selectedVoice
    );
    setIsLoading(false);

    if (!ok) return;

    setMessages((prev) => [
      ...prev,
      {
        text: `${selectedVoice} - ${message}`,
        isBrainWave: true,
        type: "audio",
        audio: audioUrl!,
      },
    ]);
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          <BrainWaveMessages text="¡Hola! Soy BrainWave. ¿Que audio deseas generar?" />
          {messages.map((message, index) =>
            message.isBrainWave ? (
              message.type === "audio" ? (
                <BrainWaveMessagesAudio
                  key={index}
                  text={message.text}
                  audio={message.audio}
                />
              ) : (
                <BrainWaveMessages key={index} text={message.text} />
              )
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
      <TextMessageBoxSelect
        onSendMessage={handlePost}
        placeholder="Mensage BrainWave..."
        options={voices}
      />
    </div>
  );
};
