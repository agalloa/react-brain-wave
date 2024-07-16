import { useState } from "react";
import { BrainWaveMessages, MyMessage, TypingLoader, TextMessageBox } from "../../components";
import { explainCodeUseCase } from "../../../core/use-cases";


interface Message {
  text: string;
  isBrainWave: boolean;
}

export const ExplainCodePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async (text: string) => {
    setIsLoading(true);
    setMessages((prev) => [...prev, { text: text, isBrainWave: false }]);

    const { ok, content } = await explainCodeUseCase(text);
    setIsLoading(false);

    if( !ok ) return;

    setMessages(( prev ) => [ ...prev,{ text: content, isBrainWave: true }]);
  };
  
  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          <BrainWaveMessages text="¡Hola! Soy BrainWave. Te ayudare a explicar un fragmento de codigo, del que tengas dudas." />
          {messages.map((message, index) =>
            message.isBrainWave ? (
              <BrainWaveMessages key={index} text= { message.text } />
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
}
