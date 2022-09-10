import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './App.css';
import Loading from './components/Loading';
import Map from './components/Map';

function App() {
  const [exhibitData, setExhibitData] = useState({});
  const [loading, setLoading] = useState(true);

  const API_END_POINT_URL =
    'http://api.kcisa.kr/openapi/service/rest/convergence/conver6';
  const API_KEY = process.env.REACT_APP_EXHIBITION_API_KEY;
  const SIGN_REGEX = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;

  const getExhibitInfo = async () => {
    try {
      const api_url = `https://exhibition-map-app-react.herokuapp.com/${API_END_POINT_URL}`;
      const res = await axios({
        method: 'GET',
        url: API_END_POINT_URL,
        withCredentials: true,
        params: {
          serviceKey: API_KEY,
          numOfRows: 200,
          keyword: '서울',
        },
      });
      // const data = await res.data.response.body.items;
      const data = await res.data.response.body.items.item;
      setData(data);
      setLoading(false);
    } catch (error) {
      console.log(`${error}`);
    }
  };

  const setData = (data) => {
    const exhibitArr = [];
    data?.forEach((item) => {
      if (item.venue && item.period) {
        exhibitArr.push(item);
      }
    });
    console.log(exhibitArr);
    setExhibitData([...exhibitArr]);
  };

  useEffect(() => {
    getExhibitInfo();
  }, []);

  return (
    <div className="App">
      {loading ? <Loading isLoading /> : null}
      <Map data={exhibitData} />
    </div>
  );
}

export default App;
