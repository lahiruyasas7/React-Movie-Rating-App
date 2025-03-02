import axios from "axios";
import React, { useEffect, useState } from "react";

function SaveMovies() {
  const [value, setValue] = useState(0);
  const [randomUser, setRandomUser] = useState<any>({});

  const valueHandler = () => {
    setValue(value + 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get("https://randomuser.me/api");

      setRandomUser(data);
    };
    fetchData();
  }, []);

  console.log("randomUser", randomUser);

  return (
    <>
      <button onClick={valueHandler}>Click for Sum</button>
      <div>value: {value}</div>
      <div>
        {randomUser?.data?.results[0]?.name?.title}{" "}
        {randomUser?.data?.results[0]?.name?.first}{" "}
        {randomUser?.data?.results[0]?.name?.last}
      </div>
      <div>
        <img src={randomUser?.data?.results[0]?.picture?.large} alt="user image" width="500" height="600"/>
      </div>
    </>
  );
}

export default SaveMovies;
