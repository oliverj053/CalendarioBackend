const { response } = require("express");
const Evento = require("../models/Evento");


const getEventos = async (req, res = response) => {
    const eventos = await Evento.find()
        .populate('user', 'name'); //se usa para mostrar datos de usuario 1er param hace referencia a 
    //objeto 2do param al campo que se va a mostrar (, 'name password') 2 campos o massi no se pasa 2do param muestra toda la data
    res.status(200).json({
        ok: true,
        eventos,
    });

}

const crearEvento = async (req, res = response) => {
    const evento = new Evento(req.body);

    try {
        evento.user = req.uid;//obteniendo el id del user

        const eventoGuardado = await evento.save(); //guardamos la data e la bd

        res.status(201).json({
            ok: true,
            evento: eventoGuardado,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador',
        });
    }


}

const actualizarEvento = async (req, res = response) => {
    const eventoId = req.params.id; //recuperando el id que viene de la URL
    const uid= req.uid; //recuperando el id del usuario que hace la peticion
    try {
        const evento = await Evento.findById(eventoId); //Buscar en la BD si hay un evento con ese id

        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un evento con ese Id',
            });
        }

        if (evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene autorizacion para editar este evento',
            });
        }

        const nuevoEvento = {
            ...req.body,
            user: uid,
        }

        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, { new: true }); //{new: true} para que retorne el nuevo json actualizado si no se pone regresa el anterior
       
        res.status(201).json({
            ok: true,
            eventoActualizado,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador',
        });
    }

}

const eliminarEvento = async (req, res = response) => {
    const eventoId = req.params.id; //recuperando el id que viene de la URL
    const uid= req.uid; //recuperando el id del usuario que hace la peticion
    try {
        const evento = await Evento.findById(eventoId); //Buscar en la BD si hay un evento con ese id

        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un evento con ese Id',
            });
        }

        if (evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene autorizacion para eliminar este evento',
            });
        }

        const eventoEliminado = await Evento.findByIdAndDelete(eventoId); //{new: true} para que retorne el nuevo json actualizado si no se pone regresa el anterior
       
        res.status(201).json({
            ok: true,
            eventoEliminado,
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador',
        });
    }


}

module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento,
}




