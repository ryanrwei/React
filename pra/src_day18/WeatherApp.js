// import React from 'react';
import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';

import { ReactComponent as CloudyIcon } from './images/day-cloudy.svg';
import { ReactComponent as AirFlowIcon } from './images/airFlow.svg';
import { ReactComponent as RainIcon } from './images/rain.svg';
import { ReactComponent as RedoIcon } from './images/day-fog.svg';

const Container = styled.div`
background-color: #ededed;
height: 100%;
display: flex;
align-items: center;
justify-content: center;
`;
const WeatherCard = styled.div`
position: relative;
min-width: 360px;
box-shadow: 0 1px 3px 0 #999999;
background-color: #f9f9f9;
box-sizing: border-box;
padding: 30px 15px;
`;
const Location = styled.div`
font-size: 28px;
color: ${ (props) =>  props.theme === 'dark' ? '#dadada' : '212121' };
margin-bottom: 20px;
`;
const Description = styled.div`
font-size: 16px;
color: #828282;
margin-bottom: 30px;
`;
const CurrentWeather = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
margin-bottom: 30px;
`;
const Temperature = styled.div`
color: #757575;
font-size: 96px;
font-weight: 300;
display: flex;
`;
const Celsius = styled.div`
font-weight: normal;
font-size: 42px;
`;
const AirFlow = styled.div`
display: flex;
align-items: center;
font-size: 16x;
font-weight: 300;
color: #828282;
margin-bottom: 20px;

svg {
    width: 25px;
    height: auto;
    margin-right: 30px;
}
`;
const Rain = styled.div`
display: flex;
align-items: center;
font-size: 16x;
font-weight: 300;
color: #828282;

svg {
    width: 25px;
    height: auto;
    margin-right: 30px;
}
`;
const Cloudy = styled(CloudyIcon)`
  /* 在這裡寫入 CSS 樣式 */
flex-basis: 30%;
`;
const Redo = styled.div`
position: absolute;
right: 15px;
bottom: 15px;
font-size: 12px;
display: inline-flex;
align-items: flex-end;
color: #828282;

svg {
    margin-left: 10px;
    width: 15px;
    height: 15px;
    cursor: pointer;
}
`;

const WeatherApp = () => {
console.log('---invoke func component')

const [weatherElement, setWeatherElement] = useState({
    observationTime: new Date(),
    locationName: '',
    description: '',
    temperature: 0,
    windSpeed: 0,
    humid: 0,
    weatherCode: 0,
    rainPossibility: 0,
    comfortability: '',
});

// STEP 2：使用 useEffect Hook
useEffect( () => {
    console.log('execute func in useEffect')
    fetchCurrentWeather()
    fetchWeatherForecast()
}, [])

const fetchCurrentWeather = () => {
    fetch('https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=CWB-8E11216C-F372-41B5-91D6-CA3DF29F11B2&locationName=臺北&format=JSON'
    )
    .then((response) => response.json())
    .then((data) => {
        // STEP 1：定義 `locationData` 把回傳的資料中會用到的部分取出來
        const locationData = data.records.location[0]
        // STEP 2：將風速（WDSD）、氣溫（TEMP）和濕度（HUMD）的資料取出
        const weatherElements = locationData.weatherElement.reduce(
            (neededElements, item) => {
                if (['WDSD', 'TEMP', 'HUMD'].includes(item.elementName)) {
                    neededElements[item.elementName] = item.elementValue
                }
                return neededElements
            }, {} )
        // console.log(weatherElements)
        
          // STEP 3：要使用到 React 組件中的資料
        setWeatherElement((preState) => {
            return{
                ...preState,
                observationTime: locationData.time.obsTime,
                locationName: locationData.locationName,
                description: '多雲時晴',
                temperature: weatherElements.TEMP,
                windSpeed: weatherElements.WDSD,
                humid: weatherElements.HUMD,
            }
        })
    })
}

const fetchWeatherForecast = () => {
    fetch(
    'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-8E11216C-F372-41B5-91D6-CA3DF29F11B2&locationName=臺北市&format=JSON'
    )
    .then((response) => response.json())
    .then((data) => {
    const locationData = data.records.location[0];
    const weatherElements = locationData.weatherElement.reduce(
        (neededElements, item) => {
        if (['Wx', 'PoP', 'CI'].includes(item.elementName)) {
            neededElements[item.elementName] = item.time[0].parameter;
        }
        return neededElements;
        }, {})
    // console.log(weatherElements)

    setWeatherElement((preState) => {
        return{
            ...preState,
            description: weatherElements.Wx.parameterName,
            weatherCode: weatherElements.Wx.parameterValue,
            rainPossibility: weatherElements.PoP.parameterName,
            comfortability: weatherElements.CI.parameterName, 
        }
    })
    
    })
}


return (
<Container>
    {console.log('render')}
    <WeatherCard>
    <Location >{weatherElement.locationName}</Location>
    <Description>
        {/* {new Intl.DateTimeFormat('zh-TW', {
            hour: 'numeric',
            minute: 'numeric',
        }).format(new Date(weatherElement.observationTime))}
        {' '} */}
        {weatherElement.description}{weatherElement.comfortability}
    </Description>
    <CurrentWeather>
        <Temperature>
            {Math.round(weatherElement.temperature)}<Celsius>°C</Celsius>
        </Temperature>
        <Cloudy/>
    </CurrentWeather>
    <AirFlow>
        <AirFlowIcon/>
        {weatherElement.windSpeed} m/h
    </AirFlow>
    <Rain>
        <RainIcon/>
        {Math.round(weatherElement.rainPossibility)} %
    </Rain>
    <Redo onClick={ () => {
        fetchCurrentWeather()
        fetchWeatherForecast()
    }}
    >
        最後觀測時間：
        {new Intl.DateTimeFormat('zh-TW', {
        hour: 'numeric',
        minute: 'numeric',
        }).format(new Date(weatherElement.observationTime))}{' '}
        <RedoIcon />
    </Redo>
    </WeatherCard>
</Container>
);
};

export default WeatherApp;