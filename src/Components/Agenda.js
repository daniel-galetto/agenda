import React from 'react'
import { useState ,useEffect } from 'react'

const Agenda = () => {

    const [nombre,setNombre] = useState('')
    const [numero,setNumero] = useState('')
    const [listado,setListado] = useState([])


    return (
        <div class="container text-center">
            
            <h1>AGENDA</h1>

            <div class="row">
                
                <div class="col">
                    <h2>AGREGAR CONTACTOS</h2>
                    <form className="form-group">

                        <input 
                            
                            type="text" 
                            className="form-control" 
                            placeholder="Ingresa Nombre" />
                        
                        <input type="text" className="form-control" placeholder="Ingresa Numero" />

                        <button type="submit" className="btn btn-primary">AGREGAR</button>

                    </form>
                </div>
                
                <div class="col">
                    <h2>LISTADO DE CONTACTOS</h2> 
                </div>
    
            </div>

        </div>
    )
}

export default Agenda
