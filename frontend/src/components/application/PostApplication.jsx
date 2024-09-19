import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../store/UserContext";

const PostApplication = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const { isAuthorized, user } = useContext(UserContext);
  const navigateTo = useNavigate();

  // Handle file input changes
  const handleFileChange = (event) => {
    const resumeFile = event.target.files[0];

    if (resumeFile && resumeFile.size > 5 * 1024 * 1024) {
      toast.error("Resume file size should be less than 5MB.");
      return;
    }

    if (!resumeFile.type.includes("pdf")) {
      toast.error("Only PDF files are accepted for resume.");
      return;
    }
    setResume(resumeFile);
  };

  const handleApplication = async (e) => {
    e.preventDefault();

    if (!/^\d{10}$/.test(phone)) {
      toast.error("Please enter a valid 10-digit phone number.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("coverLetter", coverLetter);
    formData.append("resume", resume);
    formData.append("jobId", id);
    console.log("Form Data:", formData); // Check FormData before sending
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }
    console.log(`Resume File Name: ${formData.get("resume").name}`);

    try {
      setLoading(true); // Set loading to true before sending request
      console.log(id);
      const { data } = await axios.post(
        `http://localhost:4000/api/application/post/${id}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setName("");
      setEmail("");
      setCoverLetter("");
      setPhone("");
      setAddress("");
      setResume(null);
      setLoading(false);
      toast.success(data.message);
      navigateTo("/job/getall");
    } catch (error) {
      setLoading(false); // Stop loading on error
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
  };

  useEffect(() => {
    if (!isAuthorized || (user && user.role === "Employer")) {
      navigateTo("/");
    }
  }, [isAuthorized, user, navigateTo]);

  return (
    <section className="application">
      <div className="container">
        <h3>Application Form</h3>
        <form onSubmit={handleApplication}>
          <div className="wrapper">
            <div className="form-control">
              <label>Name: </label>
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="wrapper">
            <div className="form-control">
              <label>Email: </label>
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="wrapper">
            <div className="form-control">
              <label>Phone Number: </label>
              <input
                type="text"
                placeholder="Your Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="wrapper">
            <div className="form-control">
              <label>Address: </label>
              <textarea
                placeholder="Address..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              ></textarea>
            </div>
          </div>
          <div className="wrapper">
            <div className="form-control">
              <label>Cover Letter: </label>
              <textarea
                placeholder="Cover Letter..."
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="wrapper">
            <div>
              <label style={{ color: "black" }}>Select Resume: </label>
              <input
                type="file"
                accept="application/pdf"
                name="resume"
                onChange={handleFileChange}
                style={{ width: "100%", marginTop: "10px" }}
                required
              />
            </div>
          </div>
          <button type="submit" className="btn-sendapp" disabled={loading}>
            {loading ? "Submitting..." : "Send Application"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default PostApplication;
