import { useState } from "react";
import { BrainWaveMessages, MyMessage, TextMessageBoxSelect, TypingLoader } from "../../components";
import { translateUseCase } from "../../../core/use-cases";

interface Message {
  text: string;
  isBrainWave: boolean;
}

const languages = [
  { id: "inglés", text: "Inglés" },
  { id: "español", text: "Español" },
  { id: "alemán", text: "Alemán" },
  { id: "árabe", text: "Árabe" },
  { id: "bengalí", text: "Bengalí" },
  { id: "francés", text: "Francés" },
  { id: "hindi", text: "Hindi" },
  { id: "japonés", text: "Japonés" },
  { id: "mandarín", text: "Mandarín" },
  { id: "portugués", text: "Portugués" },
  { id: "ruso", text: "Ruso" },
];


export const TranslatePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async (text: string, selectedOption: string) => {
    setIsLoading(true);

    const newMessage = `Traduce: "${ text }" al idioma ${ selectedOption }`
    setMessages((prev) => [...prev, { text: newMessage, isBrainWave: false }]);

    const { ok, message } = await translateUseCase( text, selectedOption);
    setIsLoading(false);

    if( !ok ){
      return alert(message);
    }

    setMessages(( prev ) => [ ...prev, { text: message, isBrainWave:true }]);

    //todo: Add message of isBrainWave in true
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          <BrainWaveMessages text="¡Hola! Soy BrainWave. ¿Que deseas traducir?" />
          {messages.map((message, index) =>
            message.isBrainWave ? (
              <BrainWaveMessages key={index} text={ message.text } />
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
        options={ languages }
      />
    </div>
  );
}
