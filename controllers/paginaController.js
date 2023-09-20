import {Viaje} from '../models/Viaje.js'
import {Testimoniales} from '../models/Testimoniales.js';

const paginaInicio = async(req, res) =>{

    const promiseBD = [];

    promiseBD.push(Viaje.findAll({limit: 3}));
    promiseBD.push(Testimoniales.findAll({limit: 3}));

    try {
        const resultado = await Promise.all(promiseBD);

        res.render('inicio', {
            pagina: 'Inicio',
            clase: 'home',
            viajes: resultado[0],
            testimoniales: resultado[1]
        });
        
    } catch (error) {
        
    }



}

const paginaNosotros = (req, res) =>{

    
    res.render('nosotros', {
        pagina: 'nosotros'
       
    });
}

const paginaViajes = async (req, res) =>{
    //consultar base de datos
    const viajes = await Viaje.findAll()
    // console.log(viajes);
    res.render('viajes', {
        pagina: 'Proximos Viajes',
        viajes,
    });
}

const paginaDetalleViaje = async(req, res) =>{

    // console.log(req.params.viaje);
    const {slug} = req.params;

    try {
        const resultado = await Viaje.findOne({ where : {slug}});
        res.render('viaje', {
            pagina: 'Informacion viaje',
            resultado
        });
    } catch (error) {
        console.log(error);
    }

}

const paginaTestimoniales = async(req, res) =>{

    try {
        const testimoniales = await Testimoniales.findAll();
        // console.log(testimoniales);
        res.render('testimoniales', {
            pagina: 'Testimoniales',
            testimoniales
        });
    } catch (error) {
        console.log(error);
    }

}

export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViaje,
}