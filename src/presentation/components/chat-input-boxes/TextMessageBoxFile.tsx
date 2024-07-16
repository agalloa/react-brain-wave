import { FormEvent, useRef, useState } from "react";

interface Props {
  onSendMessage: (message: string, file: File) => void;
  placeholder: string;
  disableCorrections?: boolean;
  accept?: string;
}

export const TextMessageBoxFile = ({
  onSendMessage,
  placeholder,
  disableCorrections = false,
  accept,
}: Props) => {
  const [message, setMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>();

  const inputFileRef = useRef<HTMLInputElement>(null);

  const handleSendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    // if (message.trim().length === 0) return;
    if(!selectedFile) return;

    onSendMessage(message, selectedFile);
    setMessage("");
    setSelectedFile(null);

    console.log("handleSendMessage");
  };

  return (
    <form
      onSubmit={handleSendMessage}
      className="flex flex-row items-center h-16 rounded-xl bg-gray-800 bg-opacity-20 w-full px-4"
    >
      <div className="mr-3">
        <button
          type="button"
          className="flex items-center justify-center text-gray-400 hover:text-indigo-500"
          onClick={() => inputFileRef.current?.click()}
        >
          <i className="fa-solid fa-paperclip text-xl"></i>
        </button>

        <input
          type="file"
          ref={inputFileRef}
          accept={accept}
          onChange={(event) => setSelectedFile(event.target.files?.item(0))}
          hidden
        />
      </div>

      <div className="flex-grow">
        <div className="relative w-full">
          <input
            type="text"
            name="message"
            autoFocus
            className="flex w-full border rounded-xl text-white bg-transparent	focus:outline-none focus: border-indigo-300 p-4 h-10 "
            placeholder={placeholder}
            autoComplete={disableCorrections ? "on" : "off"}
            autoCorrect={disableCorrections ? "on" : "off"}
            spellCheck={disableCorrections ? "true" : "false"}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
        </div>
      </div>

      <div className="ml-4">
        <button className="btn-primary" disabled={!selectedFile}>
          {!selectedFile ? (
            <span className="mr-2">Enviar</span>
          ) : (
            <span className="mr-2">
              {selectedFile.name.substring(0, 10) + "..."}
            </span>
          )}
          <i className="fa-regular fa-paper-plane"></i>
        </button>
      </div>
    </form>
  );
};
