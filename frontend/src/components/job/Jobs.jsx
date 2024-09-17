import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../store/UserContext";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const { isAuthorized } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
    try {
      axios
        .get("http://localhost:4000/api/job/getAllJob", {
          withCredentials: true,
        })
        .then((res) => {
          const { jobs } = res.data;
          setJobs(jobs);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  useEffect(() => {
    if (!isAuthorized) {
      navigate("/");
    }
  }, [isAuthorized, navigate]);

  return (
    <section className="all-jobs">
      <div className="container">
        <h1>Explore the available Jobs!</h1>
        <div className="banner">
          {jobs &&
            jobs.map((element) => {
              return (
                <div className="job-card" key={element._id}>
                  <div className="title">
                    <h2 className="job-cat">{element.company}</h2>
                    <h3>{element.title}</h3>
                  </div>
                  <div>
                    <span>Location : </span>
                    {element.location}
                  </div>
                  <div>
                    <span>Job Type :</span>{" "}
                    <span>
                      <ul style={{ marginLeft: "27px", fontWeight: 400 }}>
                        {element.jobType &&
                          element.jobType.map((job) => {
                            return <li key={job}>{job}</li>;
                          })}
                      </ul>
                    </span>
                  </div>
                  <div>
                    <span>Posted on : </span>
                    {element.jobPostedOn.split("T")[0]}
                    {/* 2024-07-18T11:39:29.274Z */}
                  </div>
                  <Link to={`/job/${element._id}`} className="a-job">
                    <button className="btn-job">View Job Details</button>
                  </Link>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default Jobs;
