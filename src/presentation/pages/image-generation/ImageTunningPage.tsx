import { useState } from "react";
import { imageGenerationUseCase, imageVariationUseCase } from "../../../core/use-cases";
import { BrainWaveMessages, BrainWaveMessagesImage, MyMessage, TypingLoader, TextMessageBox, BrainWaveMessagesSelectableImage } from "../../components";

interface Message {
  text: string;
  isBrainWave: boolean;
  info?: {
    imageUrl: string;
    alt: string;
  }
}

export const ImageTunningPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      isBrainWave: true,
      text:'Image base',
      info: {
        alt: 'Imagen base',
        imageUrl: 'http://localhost:3000/brain-wave/image-generation/1721173879356.png'
      }
    }
  ]);

  const [ originalImageAndMask, setOriginalImageAndMask ] = useState({
    original: undefined as string | undefined,
    mask: undefined as string | undefined
  });


  const handleVariation = async() => {

    setIsLoading(true);
    const resp = await imageVariationUseCase( originalImageAndMask.original! );
    setIsLoading(false);

    if( !resp ) return; 

    setMessages(( prev ) => [
      ...prev,
      {
        text: 'Variacion',
        isBrainWave: true,
        info: {
          imageUrl: resp.url,
          alt: resp.alt
        }
      }
    ])

  }


  const handlePost = async (text: string) => {
    setIsLoading(true);
    setMessages((prev) => [...prev, { text: text, isBrainWave: false }]);

    const { original, mask } = originalImageAndMask;

    const imageInfo = await imageGenerationUseCase(text, original, mask);
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
   <>
   {
    originalImageAndMask.original && (
      <div className="fixed flex flex-col items-center top-10 right-10 z-10 fade-in">
        <span>Editando</span>
        <img 
          className="border rounded-xl w-36 h-36 object-contain"
          src={ originalImageAndMask.mask ?? originalImageAndMask.original}
          alt="Imagen original"
        />
        <button  onClick={ handleVariation } className="btn-primary mt-2">Generar Variación</button>
      </div>
    )
   }
   <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          <BrainWaveMessages text="¡Hola! Soy BrainWave. Describe la imagen que quieres generar" />
          {messages.map((message, index) =>
            message.isBrainWave ? (
              <BrainWaveMessagesSelectableImage
                 key={index} 
                 text={ message.text } 
                 imageUrl={ message.info?.imageUrl! }
                 alt={ message.info?.alt! }
                 onImageSelected={ (maskImageUrl) => setOriginalImageAndMask({
                  original: message.info?.imageUrl!,
                  mask: maskImageUrl
                 })}
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
   </>
  );
}
