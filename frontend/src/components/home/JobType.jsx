import { FaSuitcase } from "react-icons/fa";
const JobType = () => {
  const details = [
    {
      id: 1,
      title: "1,23,442",
      subTitle: "Live Job",
      icon: <FaSuitcase color="red" />,
    },
    {
      id: 2,
      title: "2,34,555",
      subTitle: "Remote Job",
      icon: <FaSuitcase color="red" />,
    },
    {
      id: 3,
      title: "3,45,678",
      subTitle: "Onsite Job",
      icon: <FaSuitcase color="red" />,
    },
    {
      id: 4,
      title: "4,56,789",
      subTitle: "Contract Job",
      icon: <FaSuitcase />,
    },
    {
      id: 5,
      title: "5,67,890",
      subTitle: "Part-time Job",
      icon: <FaSuitcase />,
    },
  ];
  return (
    <>
      <div className="main2">
        <h1 className="h11">Current Job Listings by Type</h1>
        <div className="main">
          {details.map((element) => {
            return (
              <div key={element.id} className="jobtype">
                <span className="icon">{element.icon}</span>
                <div className="info">
                  <p>{element.title}</p>
                  <p>{element.subTitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default JobType;
