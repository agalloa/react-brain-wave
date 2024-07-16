import { useState } from 'react'
import { BrainWaveMessages, MyMessage, TextMessageBox, TypingLoader } from '../../components';
import { sarcasticModeUseCse } from '../../../core/use-cases';

interface Message {
  text: string;
  isBrainWave: boolean;
}


export const SarcasticModePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async (text: string) => {
    setIsLoading(true);
   
    setMessages((prev) => [...prev, { text: text, isBrainWave: false }]);

    const { ok, content } = await sarcasticModeUseCse(text);
    setIsLoading(false);

    if( !ok ) return;

    setMessages((prev) => [...prev, { text: content, isBrainWave: true }]);
    // setIsLoading(false);

    //todo: Add message of isBrainWave in true
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          <BrainWaveMessages text="¡Hola! Soy BrainWave. ¿En qué puedo ayudarte hoy? Recuerda que te respondere con sarcasmo pero te dare la respuesta que necesitas" />
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
      <TextMessageBox
        onSendMessage={handlePost}
        placeholder="Mensage BrainWave..."
        disableCorrections
      />
    </div>
  );
}
