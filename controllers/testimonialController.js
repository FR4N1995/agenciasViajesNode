import {Testimoniales} from '../models/Testimoniales.js';

const guardarTestimonial = async(req, res) =>{
    //validar
    const {nombre, correo, mensaje} = req.body;

    const errores = [];

    if(nombre.trim() === ''){
       errores.push({mensaje: 'El nombre es Obligatorio'});
    }
    if(correo.trim() === ''){
        errores.push({mensaje: 'El correo es Obligatorio'});
    }
    if(mensaje.trim() === ''){
        errores.push({mensaje: 'El mensaje es Obligatorio'});
    }

    if (errores.length > 0) {

        // Consultar testimoniales existentes
        const testimoniales = await Testimoniales.findAll();

        //mostrar la vista en errores
        res.render('testimoniales', {
            pagina: 'Testimoniales',
            errores,
            nombre,
            correo,
            mensaje,
            testimoniales
        })
    }else{
        //almacenar en la base de datos
        try {
            await Testimoniales.create({
                nombre,
                correo,
                mensaje
            });
            res.redirect('/testimoniales');
        } catch (error) {
            console.log(error);
            
        }
      

    }



    // console.log(errores);
}

export {
    guardarTestimonial
}