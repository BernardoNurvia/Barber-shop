import React, { useState, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom'; // Importar el hook useNavigate.
import { Context } from '../store/appContext'; // Ruta corregida del appContext

const professionals = [
  { id: 1, name: 'James Mitchell', available: true, hours: 'Available' },
  { id: 2, name: 'Ethan Carter', available: true, hours: 'Available' },
  { id: 3, name: 'Emily Anderson', available: true, hours: 'Available' },
  { id: 4, name: 'Olivia Parker', available: true, hours: 'Available' },
  { id: 5, name: 'William Bennett', available: true, hours: 'Holiday' },
  { id: 6, name: 'Sophia Harris', available: false, hours: 'Day Off' }
];

const BookAppointment_Proffesional = () => {
  const [selectedProfessional, setSelectedProfessional] = useState(null);
  const navigate = useNavigate(); // Usamos el hook useNavigate
  const { store, actions } = useContext(Context); // Uso del contexto

  const selectedColor = '#FFD700'; // Dorado menos intenso

  const getBadgeStyle = (status) => {
    switch (status) {
      case 'Available':
        return { backgroundColor: '#d4edda', color: '#155724' }; // Verde suave
      case 'Day Off':
        return { backgroundColor: '#f8d7da', color: '#721c24' }; // Rojo suave
      case 'Holiday':
        return { backgroundColor: '#e2e3e5', color: '#6c757d' }; // Gris
      default:
        return {};
    }
  };

  const handleContinue = () => {
    if (selectedProfessional) {
      // Guardar el profesional seleccionado en el contexto
      actions.selectProfessional(professionals.find(pro => pro.id === selectedProfessional));
      navigate('/book-appointment-services'); // Navega a la siguiente página si se selecciona un profesional
    } else {
      alert("Please select a professional before continuing.");
    }
  };

  return (
    <div className="container mt-5" style={{ paddingBottom: '80px' }}>
      <div className="row">
        {/* Profesionales */}
        <div className="col-md-8">
          <h3>Step 1 of 3</h3>
          <h2>Select Professional</h2>
          <ul className="list-group">
            {professionals.map(pro => (
              <li
                key={pro.id}
                className="list-group-item d-flex justify-content-between align-items-center"
                style={{
                  cursor: pro.hours === 'Available' ? 'pointer' : 'not-allowed',
                  backgroundColor: selectedProfessional === pro.id ? '#fff9e6' : '',
                  border: selectedProfessional === pro.id ? '1px solid #FFD700' : '',
                  fontSize: '1.2rem',
                  opacity: pro.hours === 'Available' ? 1 : 0.6
                }}
                onClick={() => pro.hours === 'Available' && setSelectedProfessional(pro.id)}
              >
                <div className="d-flex align-items-center">
                  {selectedProfessional === pro.id && (
                    <i className="fa-solid fa-circle-check me-2" style={{ color: '#FFD700', fontSize: '1.5rem' }}></i>
                  )}
                  {pro.name}
                </div>
                <span className="badge" style={getBadgeStyle(pro.hours)}>
                  {pro.hours}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Resumen */}
        <div className="col-md-4">
          <div className="card" style={{ backgroundColor: '#F0F0F0' }}>
            <div
              style={{
                backgroundColor: '#E0E0E0',
                padding: '20px',
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="card-img-top"
                alt="Location"
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                  objectPosition: 'center'
                }}
              />
            </div>
            <div className="card-body">
              {/* El nombre del salón es estático */}
              <h5 className="card-title">Vurve - Bangalore</h5>
              <p className="card-text">MG Road, Bangalore</p>
              {selectedProfessional && (
                <div>
                  <p><strong>{professionals.find(pro => pro.id === selectedProfessional).name}</strong></p>
                  <p>{professionals.find(pro => pro.id === selectedProfessional).hours}</p>
                </div>
              )}
              <p><strong>Total:</strong> EUR 0,00</p>
              <button className="btn btn-warning w-100 mb-2" onClick={handleContinue}>Continue</button> {/* Actualizar onClick */}
              <button className="btn btn-secondary w-100" onClick={() => navigate('/book-appointment')}>Back</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookAppointment_Proffesional;
