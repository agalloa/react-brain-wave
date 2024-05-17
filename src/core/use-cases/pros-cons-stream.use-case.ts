export const prosConsStreamUseCase = async (prompt: string) => {
    try {
        const resp = await fetch(`${import.meta.env.VITE_BRAINWAVE_API}/pros-cons-discusser-stream`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt }),
            //TODO: abortSignal
        });

        if (!resp.ok) throw new Error('No se pudo realizar la comparación');

        const reader = resp.body?.getReader();
        if (!reader) {
            console.log('no se pudo generar el reader');
            return null;
        }
        return reader;
        // const decoder = new TextDecoder();

        // let text = '';

        // while (true) {
        //     const { value, done } = await reader.read();
        //     if (done) {
        //         break;
        //     }

        //     const decoderChunk = decoder.decode(value, { stream: true});
        //     text += decoderChunk;
        //     console.log(text);
        // }


    } catch (error) {
        console.log(error);
        return null
    }
}