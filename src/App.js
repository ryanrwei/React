import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import List from "./components/List/List";

const App = () => {
  let [listData, setListData] = useState({
    listName: "ryan",
    listEmail: "xxx@com",
    listPassword: "123",
  });

  let [isVisible, setvisibility] = useState(false);
  let [isSuccess, setIsSuccess] = useState(false);

  const updateListName = (newData) => {
    setListData((preState) => {
      return {
        ...preState,
        listName: newData,
      };
    });
  };
  const updateListEmail = (newData) => {
    setListData((preState) => {
      return {
        ...preState,
        listEmail: newData,
      };
    });
  };
  const updateListPassword = (newData) => {
    setListData((preState) => {
      return {
        ...preState,
        listPassword: newData,
      };
    });
  };

  return (
    <div className="wholePage">
      {isSuccess ? (
        <div>Success</div>
      ) : (
        <div className="app">
          <div className="header">
            <Header />
          </div>
          {isVisible && (
            <div className="passwordWrong">Details do not match!</div>
          )}

          <div className="list">
            <List
              listData={listData}
              updateListName={updateListName}
              updateListEmail={updateListEmail}
              updateListPassword={updateListPassword}
            />
          </div>

          <div>
            <button
              onClick={() => {
                // setvisibility(true)
                setIsSuccess(true);
              }}
            >
              Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
