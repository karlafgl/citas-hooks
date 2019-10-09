import React, {useState, Fragment} from 'react';

function Formulario(props){

  const [cita, actualizarCita] = useState({
    mascota: '',
    propietario: '',
    fecha: '',
    hora: '',
    sintomas: ''
  })

  const actualizarState = (e) => {
    actualizarCita({
      ...cita,
      [e.target.name]: e.target.value
    })
  }

  const enviarCita = e => {
    e.preventDefault()
    console.log(cita)

    //pasar la cita hacia el componente principal
    props.crearCita(cita)

    //Reiniciar el state
    actualizarCita({
      mascota: '',
      propietario: '',
      fecha: '',
      hora: '',
      sintomas: ''
    })
  }

  return(
    <Fragment>
    <h2>Crear Cita</h2>
    <form onSubmit={enviarCita}>
            <label>Nombre Mascota</label>
            <input 
              type="text" 
              name="mascota"
              className="u-full-width" 
              placeholder="Nombre Mascota" 
              onChange={actualizarState}
              value={cita.mascota}
            />

            <label>Nombre Dueño</label>
            <input 
              type="text" 
              name="propietario"
              className="u-full-width"  
              placeholder="Nombre Dueño de la Mascota" 
              onChange={actualizarState}
              value={cita.propietario}
            />

            <label>Fecha</label>
            <input 
              type="date" 
              className="u-full-width"
              name="fecha"
              onChange={actualizarState}
              value={cita.fecha}
            />               

            <label>Hora</label>
            <input 
              type="time" 
              className="u-full-width"
              name="hora" 
              onChange={actualizarState}
              value={cita.hora}
            />

            <label>Sintomas</label>
            <textarea 
              className="u-full-width"
              name="sintomas"
              onChange={actualizarState}
              value={cita.sintomas}
            ></textarea>

            <button type="submit" className="button-primary u-full-width">Agregar</button>
        </form>
  </Fragment>

  )
}

function Cita({cita, index, eliminarCita}) {
  return(
    <div className="cita">
    <p>Mascota: <span>{cita.mascota}</span></p>
    <p>Dueño: <span>{cita.propietario}</span></p>
    <p>Fecha: <span>{cita.fecha}</span></p>
    <p>Hora: <span>{cita.hora}</span></p>
    <p>Sintomas: <span>{cita.sintomas}</span></p>
    <button type="button" className="button eliminar u-full-width" onClick={()=> eliminarCita(index)}>Eliminiar X</button>
  </div>
  )
}


function App(){

  const [citas, guardarCita] = useState([])

  //Agregar las nuevas citas al state
  const crearCita = cita => {
    const nuevasCitas = [...citas, cita]
    guardarCita(nuevasCitas)
  }

  //Elimina las citas del state
  const eliminarCita = (index) => {
    const nuevasCitas =[...citas]
    nuevasCitas.splice(index, 1)
    guardarCita(nuevasCitas)
  }

  return(
    <Fragment>
    <h1>Administrador de Pacientes</h1>
    <div className="container">
        <div className="row">
            <div className="one-half column">
                <Formulario 
                  crearCita={crearCita}
                />
            </div>
            <div className="one-half column">
              
              {citas.map((cita, index ) => (
                  <Cita 
                    key={index}
                    index={index}
                    cita={cita}
                    eliminarCita={eliminarCita}
                  />
              ))}
            </div>
        </div>
    </div>
  </Fragment>
  )
}

export default App