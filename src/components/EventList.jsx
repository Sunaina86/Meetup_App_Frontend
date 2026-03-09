import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../useFetch"

const EventList = () => {
    //  const [loading, setLoading] = useState(true);
   const [selectedType, setSelectedType] = useState("All");
   const [searchTerm, setSearchTerm] = useState("");

  const {data,loading,error} = useFetch("https://meetup-app-backend-hazel.vercel.app/events")
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
        <p style={{ marginTop: "10px" }}>Loading events...</p>
      </div>
      </div>
    );
  }

  const filterByType = (data) => {
   if (selectedType === "All") return data;

   return data.filter((event) =>
    event.type.toLowerCase() === selectedType.toLowerCase()
    )
  };


 const filterBySearch = (data) => {
  if (!searchTerm.trim()) return data;
  const lowerSearch = searchTerm.toLowerCase();

  return data.filter((event) => {
    const matchesTitle = event.title?.toLowerCase().includes(lowerSearch);
    const matchesTags = event.tags?.some((tag) =>
      tag.toLowerCase().includes(lowerSearch)
    );
    return matchesTitle || matchesTags;
  });
}  

 let filteredEvents = filterBySearch(filterByType(data));
  
  const displayEvents = filteredEvents?.map((event) => (
        <div className="col-12 col-md-6 col-lg-4" key={event._id}>
            <div className="card h-100 border-0 shadow-sm position-relative overflow-hidden">
              
              <div className="position-relative">
                <img
                  src={event.imageUrl}
                  className="card-img-top img-fluid"
                  alt={event.title}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <span className="badge bg-white text-dark position-absolute top-0 start-0 m-2 shadow-sm">
                   {event.type} Event
                </span>
              </div>

              <div className="card-body">
                <p className="text-muted small mb-1">
                  {new Date(event.date).toLocaleDateString("en-IN", {
                    weekday: "short",
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                  {" , " }{event.sessionTimings.split("-")[0]} IST
                </p>
                
                <h5 className="card-title fw-bold mb-3">{event.title}</h5>
                <Link
                  to={`/events/${event._id}`}
                  className="stretched-link"
                ></Link>
              </div>
              </div>
              </div>
          
  ))
  return (
    <div className="container-fluid">
    <nav class="navbar navbar-light bg-white py-3">
     <div class="container d-flex justify-content-between align-items-center">
       <Link className="navbar-brand fw-bold text-danger" style={{ fontFamily: "'Potta One', cursive", fontSize: "2.0rem"}} to="/">
        meetup
      </Link>
      <div class="w-25">
      <span class="bg-white border-0">
        <i class="bi bi-search text-muted"></i>
      </span>
      <input
          className="form-control border-start-0"
          type="search"
          placeholder="Search by title and tags"
           value={searchTerm}
           onChange={(e) => setSearchTerm(e.target.value)}
      />
      </div>
     </div>
     </nav>
     <hr/>
    
     <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
      <h2 className="fw-bold">Meetup Events</h2>
     {/* <div className="col md-6 d-flex flex-column flex-lg-row align-items-stretch align-items-center gap-3 mt-3 mt-lg-0 w-100 w-lg-auto"> */}
      <select
          className="form-select w-auto text-muted"
          style={{ width: "180px" }}
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
        <option value="All">Both</option>
        <option value="online">Online</option>
        <option value="offline">Offline</option>
      </select>
      {/* </div> */}
      </div>
      <div className="row g-4 justify-content-center">
      {displayEvents}
      </div>
     </div>
    </div>
  );

};
   

export default EventList;