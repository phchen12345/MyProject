import React, { useState, useEffect } from "react";
import Search from "../components/Search";
import axios from "axios";
import Pictures from "../components/Pictures";

const Homepage = () => {
  let [input, setInput] = useState("");
  let [data, setData] = useState([]);
  let [page, setPage] = useState(1);
  let [currentSearch, setCurrentSearch] = useState("");
  const auth = "FO0oUVfpsT6fmhAN0lPJl5Ks1SNhNTw4jnWQ0Y8MTeUPXT8dvyglT4GN";
  const initalURL = "https://api.pexels.com/v1/curated?page=1&per_page=15";
  let searchURL = `https://api.pexels.com/v1/search?query=${input}&per_page=15`;

  const search = async (url) => {
    let result = await axios.get(url, {
      headers: { Authorization: auth },
    });
    setData(result.data.photos);
    setCurrentSearch(input);
  };

  //Closure
  const morePicture = async () => {
    let newURL;
    setPage(page + 1);
    if (currentSearch === "") {
      newURL = `https://api.pexels.com/v1/curated?page=${page + 1}&per_page=15`;
    } else {
      newURL = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=${
        page + 1
      }`;
    }
    let result = await axios.get(newURL, {
      headers: { Authorization: auth },
    });
    setData(data.concat(result.data.photos));
  };

  useEffect(() => {
    search(initalURL);
  }, []); //剛開始到網頁會自動執行一次

  return (
    <div style={{ minHeight: "100vh" }}>
      <Search
        search={() => {
          if (input == "") {
            return;
          } else {
            search(searchURL);
          }
        }}
        setInput={setInput}
      />
      <div className="pictures">
        {data &&
          data.map((d) => {
            return <Pictures data={d} />;
          })}
      </div>
      <div className="morePicture">
        <button onClick={morePicture}>更多圖片</button>
      </div>
    </div>
  );
};

export default Homepage;
