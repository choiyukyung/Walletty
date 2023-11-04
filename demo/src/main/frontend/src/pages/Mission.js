import { useEffect, useState } from "react";
import MissionList from "../components/MissionList";
import MyHeader from "../components/MyHeader";
import { useNavigate } from "react-router-dom";

const Mission = () => {
  const navigate = useNavigate();
  const id = localStorage.getItem("memberId");
  const [data, setData] = useState([]);
  const [allMissionList, setAllMissionList] = useState([]);
  const dummyData = [
    {
      id: 1,
      startdate: "2023-09-01",
      enddate: "2023-10-01",
      missionEntry: "간식비",
      missionMoney: "20000",
      missionSen: "간식비를 2만원 절약해봐요!!",
      now: "false",
      feedbackSen: "간식비를 지나치게 많이 썼어용",
      accDeposit: "DONE",
      successed: "true",
    },

    {
      id: 2,
      startdate: "2023-09-01",
      enddate: "2023-10-02",
      missionEntry: "쇼핑비",
      missionMoney: "25000",
      missionSen: "쇼핑비를 2만5천원 절약해봐!",
      now: "true",
      feedbackSen: "쇼핑비를 지나치게 많이 썼어",
      accDeposit: "DONE",
      successed: "false",
    },
    {
      id: 3,
      startdate: "2023-09-02",
      enddate: "2023-10-01",
      missionEntry: "간식비",
      missionMoney: "15000",
      missionSen: "간식비를 1만5천원 절약해봐!",
      now: "true",
      feedbackSen: "간식비를 지나치게 많이 썼어",
      accDeposit: "DONE",
      successed: "true",
    },
    {
      id: 4,
      startdate: "2023-10-01",
      enddate: "2023-11-01",
      missionEntry: "택시비",
      missionMoney: "10000",
      missionSen: "택시비를 1만원 절약해봐!",
      now: "true",
      feedbackSen: "택시비를 지나치게 많이 썼어",
      accDeposit: "DONE",
      successed: "doing",
    },
  ];
  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "true") {
      fetch("/chat-gpt/mission", {
        method: "POST",
        body: JSON.stringify({
          memberId: id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((result) => result.json())
        .then((result) => {
          setAllMissionList(result);
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
      console.log(allMissionList);
      const newList = allMissionList.map(
        ({ missionEntry, missionMoney, now, ...rest }) => rest
      );
      setData(newList);
      console.log(data);
    } else {
      navigate("/login");
    }
  }, []);

  //   useEffect(
  //     () =>
  //       fetch("https://my-json-server.typicode.com/seungalee/jsontest/missions")
  //         .then((response) => response.json())
  //         .then((result) => {
  //           setAllMissionList(result);
  //         }),
  //     []
  //   );
  return (
    <div className="Mission">
      <MyHeader nowpage={"mission"} />
      <MissionList missionList={data} />
    </div>
  );
};

export default Mission;
