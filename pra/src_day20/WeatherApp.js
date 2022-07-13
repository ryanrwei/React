// import React from 'react';
import React, { useState, useEffect, useCallback } from 'react';
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
console.log('--- invoke func component ---')

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

  // STEP 2：使用 useCallback 並將回傳的函式取名為 fetchData
const fetchData = useCallback(() => {
    // STEP 3：把原本的 fetchData 改名為 fetchingData 放到 useCallback 的函式內
    const fetchingData = async () => {
        const [currentWeather, weatherForecast] = await Promise.all([
        fetchCurrentWeather(),
        fetchWeatherForecast(),
        ]);

        setWeatherElement({
        ...currentWeather,
        ...weatherForecast,
        });
    };
    // STEP 4：記得要呼叫 fetchingData 這個方法
    fetchingData()
    // STEP 5：因為 fetchingData 沒有相依到 React 組件中的資料狀態，所以 dependencies 陣列中不帶入元素
}, []);

// STEP 2：使用 useEffect Hook
useEffect( () => {
    console.log('execute func in useEffect')

    fetchData()
}, [fetchData])

const fetchCurrentWeather = () => {
    // STEP 3-1：加上 return 直接把 fetch API 回傳的 Promise 回傳出去
    return fetch('https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=CWB-8E11216C-F372-41B5-91D6-CA3DF29F11B2&locationName=臺北&format=JSON'
    )
    .then((response) => response.json())
    .then((data) => {
        const locationData = data.records.location[0]
        const weatherElements = locationData.weatherElement.reduce(
            (neededElements, item) => {
                if (['WDSD', 'TEMP', 'HUMD'].includes(item.elementName)) {
                    neededElements[item.elementName] = item.elementValue
                }
                return neededElements
            }, {} )
        // STEP 3-2：把取得的資料內容回傳出去，而不是在這裡 setWeatherElement
        return{
            observationTime: locationData.time.obsTime,
            locationName: locationData.locationName,
            description: '多雲時晴',
            temperature: weatherElements.TEMP,
            windSpeed: weatherElements.WDSD,
            humid: weatherElements.HUMD,
        }
    })
}

const fetchWeatherForecast = () => {
    // STEP 4-1：加上 return 直接把 fetch API 回傳的 Promise 回傳出去
    return fetch('https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-8E11216C-F372-41B5-91D6-CA3DF29F11B2&locationName=臺北市&format=JSON'
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
        // STEP 4-2：把取得的資料內容回傳出去，而不是在這裡 setWeatherElement
        return{
            description: weatherElements.Wx.parameterName,
            weatherCode: weatherElements.Wx.parameterValue,
            rainPossibility: weatherElements.PoP.parameterName,
            comfortability: weatherElements.CI.parameterName, 
        }
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
    <Redo onClick={fetchData}
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