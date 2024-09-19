import React from "react";

const EmployerCard = ({ element, openModal }) => {
  // // Check if element and element.jobId are valid
  // if (!element || !element.jobId) {

  //   return <div>Loading...</div>; // You can return a fallback UI like "Loading..." or nothing.
  // }

  return (
    <>
      <section className="application-detail">
        <div className="container">
          <div className="title" style={{ textAlign: "center" }}>
            <h2 className="job-cat">{element.jobId.company}</h2>
            <h3>{element.jobId.title}</h3>
          </div>
          <div className="banner">
            <div className="banner-detail">
              <h4>Applicant's Details</h4>
              <div>
                <span>Name:</span> {element.name}
              </div>
              <div>
                <span>Email:</span> {element.email}
              </div>
              <div>
                <span>Contact:</span> {element.phone}
              </div>
              <div>
                <span>Address:</span> {element.address}
              </div>
              <div className="coverletter">
                <span>Cover Letter:</span> <div>{element.coverLetter}</div>
              </div>
            </div>
            <div className="banner-detail">
              <h4>Job Detail</h4>
              <div>
                <span>Job Type :</span>
                <span className="list-jobtype">
                  <ul style={{ marginLeft: "27px" }}>
                    {element.jobId.jobType &&
                      element.jobId.jobType.map((job) => {
                        return <li key={job}>{job}</li>;
                      })}
                  </ul>
                </span>
              </div>
              <div>
                <span>Job Location :</span>{" "}
                <span>{element.jobId.location}</span>
              </div>
            </div>
          </div>
          <div style={{ margin: "30px auto -20px" }} className="btn-wrapper">
            {element.resume && (
              <button onClick={() => openModal(element.resume)}>
                View Resume
              </button>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default EmployerCard;