import { useState } from "react";
import { BrainWaveMessages, MyMessage, TypingLoader,  TextMessageBoxFile } from "../../components";
import { audioToTextUseCase } from "../../../core/use-cases";


interface Message {
  text: string;
  isBrainWave: boolean;
}

export const AudioToTextPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async (text: string, audioFile: File) => {
    setIsLoading(true);
    setMessages((prev) => [...prev, { text: text, isBrainWave: false }]);

    // todo: UseCase
    const resp =  await audioToTextUseCase(audioFile, text); 
    setIsLoading(false);

    if( !resp ) return;
   
    const brainWaveMessage = `
## Transcripción:
__Duración:__ ${ Math.round(resp.duration) } segundos
## El texto es:
${ resp.text } 
`

    setMessages(( prev ) => [
      ...prev,
      { text: brainWaveMessage, isBrainWave: true },
    ]);

    for( const segment of resp.segments ){
      const segmentMessage = `
__De ${ Math.round(segment.start)} a ${ Math.round(segment.end )} segundos:__      
${ segment.text }   
`
    setMessages(( prev ) => [
      ...prev,
      { text: segmentMessage, isBrainWave: true },
    ]);
    }

  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          <BrainWaveMessages text="¡Hola! Soy BrainWave. ¿Qué audio quieres convertir?" />
          {messages.map((message, index) =>
            message.isBrainWave ? (
              <BrainWaveMessages key={index} text={ message.text}/>
            ) : (
              <MyMessage key={index} text={ (message.text === '') ? 'Transcribe el audio para ver el texto.' : message.text } />
            )
          )}
          {isLoading && (
            <div className="col-start-1 col-end-12 fade-in">
              <TypingLoader />
            </div>
          )}
        </div>
      </div>
      <TextMessageBoxFile
        onSendMessage={handlePost}
        placeholder="Mensage BrainWave..."
        disableCorrections
        accept="audio/*"
      />
    </div>
  );
}
