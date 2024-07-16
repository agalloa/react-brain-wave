import { SarcastiModeResponse } from "../../interfaces";

export const sarcasticModeUseCse = async ( prompt: string ) => {
    try {
        const resp = await fetch (`${import.meta.env.VITE_BRAINWAVE_API}/sarcastic`,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt })
        });

        if( !resp.ok) throw new Error(' No se pudo realizar la respuesta');

        const data = await resp.json() as SarcastiModeResponse;

        return {
            ok: true,
            ...data,
        }

    } catch (error) {
        return{
            ok: false,
            message: 'No se pudo relizar la respuesta'
        }
    }
}