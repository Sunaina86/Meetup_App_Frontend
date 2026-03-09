import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import useFetch from '../useFetch';
const EventDetails = () => {
   const  {eventId}  = useParams();
  const {data,loading,error} = useFetch(`https://meetup-app-backend-hazel.vercel.app/events/${eventId}`)

  console.log(data?.speakers)
  if(!data) {
    return (
      <div
       style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
       }}
      >
      <div style={{ textAlign: "center" }}>
        <div className="spinner-border text-danger" role="status"></div>
        <p style={{ marginTop: "10px" }}>Loading event details...</p>
      </div>
      </div>
    );
  }

  const formattedDate = new Date(data?.date).toLocaleDateString("en-IN", {
                    weekday: "short",
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })

return (
  <div className="bg-light min-vh-100 pb-5">
    <nav className="navbar navbar-light bg-white border-bottom mb-4">
      <div className="container">
        <span className="navbar-brand text-danger fw-bold fs-3" style={{ fontStyle: 'italic' }}><Link className="nav-link fw-semibold" to="/">meetup</Link></span>         
      </div>
    </nav>
    <div className="container">
      <div className="row">
        <div className="col-lg-8">
            <h1 className="fw-bold mb-1">{data?.title}</h1>
            <img 
              src={data?.imageUrl} 
              className="img-fluid rounded shadow-sm mb-4 w-100" 
              alt="Event Cover"
              style={{ maxHeight: '400px', objectFit: 'cover' }}
            />
            <h4 className="fw-bold">Details:</h4>
            <p className="text-secondary lh-base" style={{ textAlign: 'justify' }}>{data?.description}</p>
            <h4 className="fw-bold mt-4">Additional Information:</h4>
            <p className="mb-1">{data?.additionalInfo}</p>  
            <h4 className="fw-bold mt-4">Event Tags:</h4>
            <div className="d-flex gap-2 mb-4">
              {data?.tags.map(tag => (
                <span key={tag} className="badge bg-danger px-3 py-2">{tag}</span>
              ))}
            </div>
        </div>
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm p-4 mb-4">
               <div className="d-flex align-items-center mb-3">
                 <div className="ms-2">
                   <div className="small fw-bold">🕐 {formattedDate}
                  {" , " }{data?.sessionTimings.split("-")[0]} to</div>
                  <div className="small fw-bold container">{formattedDate}
                  {" , " }{data?.sessionTimings.split("-")[1]}</div>
                 </div>
               </div>
              
               <div className="d-flex align-items-center mb-3">
                 <div className="ms-2">
                   <div className="fw-bold">📍{data?.venue}</div>
                   <div className="text-muted small">{data?.address}</div>
                 </div>
               </div>
              
               <div className="container fs-5 fw-bold text-dark mt-2">₹ {data?.price.toLocaleString('en-IN')}</div>
          </div>
          <h5 className="fw-bold mb-3">Speakers: ({data?.speakers.length})</h5>
          <div className="row g-3 mb-4">
               {data?.speakers.map((speaker) => (
                <div key={speaker} className="col-6">
                  <div className="card border-0 shadow-sm text-center p-3 h-100">
                    <img 
                      src={speaker.speakerImage} 
                      className="rounded-circle mx-auto mb-2" 
                      width="60" height="60" 
                      alt={speaker.name} 
                    />
                    <div className="fw-bold small">{speaker.name}</div>
                    <div className="text-muted" style={{ fontSize: '0.75rem' }}>{speaker.designation}</div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  </div>
)
};

export default EventDetails;