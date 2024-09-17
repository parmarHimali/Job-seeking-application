const JobSeekerCard = ({ element, deleteApplication, openModal }) => {
  return (
    <div className="detail-card">
      <div className="detail">
        <table border={1}>
          <tbody>
            <tr>
              <td>Name:</td>
              <td>{element.name}</td>
            </tr>
            <tr>
              <td>Email:</td>
              <td>{element.email}</td>
            </tr>
            <tr>
              <td>Phone:</td>
              <td>{element.phone}</td>
            </tr>
            <tr>
              <td>Address:</td>
              <td>{element.address}</td>
            </tr>
            <tr>
              <td>Cover Letter:</td>
              <td>{element.coverLetter}</td>
            </tr>
          </tbody>
        </table>
        {/* <p>
            <span>Name:</span> {element.name}
          </p>
          <p>
            <span>Email:</span> {element.email}
          </p>
          <p>
            <span>Phone:</span> {element.Phone}
          </p>
          <p>
            <span>Address:</span> {element.address}
          </p>
          <p>
            <span>Cover Letter:</span> {element.coverLetter}
          </p> */}
      </div>
      <div className="app-btn-wrapper">
        {user && user.role == "Job Seeker" ? (
          <button
            className="btn-dltapp"
            onClick={() => deleteApplication(element._id)}
          >
            Delete Application
          </button>
        ) : (
          ""
        )}
        <button
          className="btn-yellow"
          onClick={() => openModal(element.resume)}
        >
          View Resume
        </button>
      </div>
    </div>
  );
};
