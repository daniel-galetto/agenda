import React from 'react'
import { useState ,useEffect } from 'react'
import { store } from '../firebaseconfig'

import Swal from 'sweetalert2'



const Agenda = () => {

    const [idUsuario, setIdUsuario] = useState('')
    const [nombre,setNombre] = useState('')
    const [numero,setNumero] = useState('')
    const [error,setError] = useState('')
    const [listados,setListados] = useState([])
    const [editarBoton,setEditarBoton] = useState(null)

    useEffect(() => {
        const obtenerUsuarios = async()=>{
            const { docs } = await store.collection('agenda').get()
            const nuevoListado = docs.map(item => ({id: item.id,...item.data()}))
            setListados(nuevoListado)
        }
        obtenerUsuarios()
    },[])

    const agregar = async (evento) =>{
        evento.preventDefault();
        if (!nombre.trim()) {
            setError ("El Campo nombre esta vacio")
        }
        if (!numero.trim()) {
            setError ("El Campo Numero esta vacio")
        } 

        const usuario = {
            nombre: nombre,
            telefono: numero
        }

        try {
            await store.collection('agenda').add(usuario)
            const { docs } = await store.collection('agenda').get()
            const nuevoListado = docs.map(item => ({id: item.id,...item.data()}))
            setListados(nuevoListado)
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Contacto agregado Exitosamente',
                showConfirmButton: false,
                timer: 1500
              })

        }catch(e) {
            console.log(e.code)
        }
        setNombre('')
        setNumero('')


    }

    const borrar = async (id) => {
        try {
            await store.collection('agenda').doc(id).delete()
            const { docs } = await store.collection('agenda').get()
            const nuevoListado = docs.map(item => ({id: item.id,...item.data()}))
            setListados(nuevoListado)
        }catch(e) {
            console.log(e);
        }

    }

    const editar = async (id) =>{
        try {
            const data = await store.collection('agenda').doc(id).get()
            const {nombre , telefono} = data.data()
            setNombre(nombre)
            setNumero(telefono)
            setIdUsuario(id)
            setEditarBoton(true)
        }catch(e) {
            console.log(e);
        }
    }

    const actualizar = async(e)=>{
        e.preventDefault()
        if (!nombre.trim()) {
            setError ("El Campo nombre esta vacio")
        }
        if (!numero.trim()) {
            setError ("El Campo Numero esta vacio")
        } 
        const actulizaContacto = {
            nombre: nombre,
            telefono: numero
        }
        try {
            await store.collection('agenda').doc(idUsuario).set(actulizaContacto)
            const { docs } = await store.collection('agenda').get()
            const nuevoListado = docs.map(item => ({id: item.id,...item.data()}))
            setListados(nuevoListado)
        }catch (e) {
            console.log(e);
        }
        setNombre('')
        setNumero('')
        setIdUsuario ('')
        setEditarBoton(null)
    }

    return (
        <div className="container text-center">
            
            <h1>AGENDA</h1>

            <div className="row">
                
                <div className="col mt-3">
                    <h2>AGREGAR CONTACTOS</h2>
                    <form onSubmit={editarBoton? actualizar : agregar} className="form-group mt-3">

                        <input 
                            onChange={(evento)=>{setNombre(evento.target.value)}}
                            type="text" 
                            className="form-control mt-3" 
                            placeholder="Ingresa Nombre"
                            value={nombre}
                            required/>
                            
                        <input 
                            onChange={(evento)=>{setNumero(evento.target.value)}}
                            type="text" 
                            className="form-control mt-3" 
                            placeholder="Ingresa Numero"
                            value={numero}
                            required />

                        {
                            editarBoton ? 
                            (<input type="submit" value='Editar' className="btn btn-dark btn-block mt-3"/>)
                            :
                            (<input type="submit" value='Agregar' className="btn btn-primary btn block mt-3"/>)
                            
                        }
                        
                        {
                            error? <div><p>{error}</p></div> : <p></p>
                        }
                    </form>

                   
                </div>
                
                <div className="col">
                    <h2>LISTADO DE CONTACTOS</h2> 
                    <ul className="list-group">
                        {
                            listados.length !==0 ? ( 
                                listados.map(item =>(
                                    <li key={item.id} className="list-group-item m-1 text-start">{item.nombre} - {item.telefono}
                                        <button onClick={(id)=>{borrar(item.id)}}  className="btn btn-danger float-end"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
  <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
</svg></button>
                                        <button onClick={(id)=>{editar(item.id)}} className="btn btn-warning float-end"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
</svg></button>
                                    </li>
                                ))
                            
                            ): (<div> <h1 className="text-warning text-center">No hay contactos cargados  </h1>  </div>)  
                        }
                    </ul>
                   
                </div>  
    
            </div>

        </div>
    )
}

export default Agenda
