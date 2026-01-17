const snsClient = require('../config/snsConfig');
const { PublishCommand } = require ('@aws-sdk/client-sns');

async function enviarMensaje(mensaje, nroTelefono) {
    
    const regexGSM = /^[\x20-\x7E\x0A\x0D€]+$/;
    const regexASCII = /^[\x00-\x7F]*$/;
    const regexTelefono = /^\+?[1-9]\d{1,14}$/;

    //longitud del mensaje, para ser uno solo, depende del tipo de codificación usada
    const limite = regexGSM.test(mensaje) ? 160 : (regexASCII.test(mensaje) ? 140 : 70);
    if(mensaje.length > limite) {
        console.error("El mensaje supera el límite de caracteres por mensaje");
        return;
    }

    if(!regexTelefono.test(nroTelefono)) {
        console.error("Número de teléfono inválido");
        return;
    }

    const params = {
        Message: mensaje,
        PhoneNumber: nroTelefono,
    };

    try {
        const data = await snsClient.send(new PublishCommand(params));
        return data;
    } catch (error) {
        console.error(error);
    }
}

module.exports = {enviarMensaje}; 
