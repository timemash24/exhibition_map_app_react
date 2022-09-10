import React, { useEffect, useState } from 'react';

const { kakao } = window;
const LOC_LATITUDE = 37.5666805;
const LOC_LONGITUDE = 126.9784147;

function Map({ data }) {
  const [selectedLoc, setSelectedLoc] = useState([]);
  const [exhibitInfo, setExhibitInfo] = useState([...data]);

  const positions = [
    {
      content: '<div>서울시립미술관</div>',
      latlng: new kakao.maps.LatLng(37.564446262374, 126.97369337082),
    },
    {
      content: '<div>한가람미술관</div>',
      latlng: new kakao.maps.LatLng(37.4810702, 127.015221),
    },
  ];

  const test = () => {
    console.log(data);
    setExhibitInfo(data);
  };

  useEffect(() => {
    const container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
    const options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(LOC_LATITUDE, LOC_LONGITUDE), //지도의 중심좌표.
      level: 8, //지도의 레벨(확대, 축소 정도)
    };

    const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
    createMarkers(map);
  }, []);

  const createMarkers = (map) => {
    for (let i = 0; i < positions.length; i++) {
      const marker = new kakao.maps.Marker({
        map: map,
        position: positions[i].latlng,
      });

      const infowindow = new kakao.maps.InfoWindow({
        content: positions[i].content,
      });
      kakao.maps.event.addListener(
        marker,
        'mouseover',
        onMouseOver(map, marker, infowindow)
      );
      kakao.maps.event.addListener(marker, 'mouseout', onMouseOut(infowindow));
      kakao.maps.event.addListener(marker, 'click', () =>
        onClick(positions[i].content)
      );
    }
  };

  function onMouseOver(map, marker, infowindow) {
    return function () {
      infowindow.open(map, marker);
    };
  }

  function onMouseOut(infowindow) {
    return function () {
      infowindow.close();
    };
  }

  function onClick(loc) {
    console.log(exhibitInfo);
    if (loc) {
      const venue = loc.substring(5, loc.length - 6);
      console.log(venue);
      const selected = exhibitInfo.filter((item) => item.venue.includes(venue));
      setSelectedLoc(selected);
    }
  }

  return (
    <div>
      <div id="map"></div>
      <ul>
        {selectedLoc.map((loc, i) => (
          <li key={i}>{`${loc.title}[${loc.period}]`}</li>
        ))}
      </ul>
    </div>
  );
}

export default Map;
