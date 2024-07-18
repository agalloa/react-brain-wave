import { useState } from "react";
import { BrainWaveMessages, MyMessage, TypingLoader, TextMessageBox, BrainWaveMessagesImage } from "../../components";
import { imageGenerationUseCase } from "../../../core/use-cases";


interface Message {
  text: string;
  isBrainWave: boolean;
  info?: {
    imageUrl: string;
    alt: string;
  }
}

export const ImageGenerationPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async (text: string) => {
    setIsLoading(true);
    setMessages((prev) => [...prev, { text: text, isBrainWave: false }]);

    const imageInfo = await imageGenerationUseCase(text);
    setIsLoading(false);

    if( !imageInfo ) {
      return setMessages((prev) => [...prev, { text: 'No se pudo generar la imagen', isBrainWave: false }]);
    }

   setMessages( prev => [
    ...prev,
    {
      text: text,
      isBrainWave: true,
      info: {
        imageUrl: imageInfo.url,
        alt: imageInfo.alt
      }
    }
   ])
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          <BrainWaveMessages text="¡Hola! Soy BrainWave. Describe la imagen que quieres generar" />
          {messages.map((message, index) =>
            message.isBrainWave ? (
              <BrainWaveMessagesImage
                 key={index} 
                 text={ message.text } 
                 imageUrl={ message.info?.imageUrl! }
                 alt={ message.info?.alt! }
                 />
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
