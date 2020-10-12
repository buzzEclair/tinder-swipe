import React, { useState, useRef, useEffect } from "react";
import "./Test.scss";
import faker from "faker";
import {
  IoMdRefresh,
  IoMdClose,
  IoMdStar,
  IoIosHeart,
  IoIosFlash
} from "react-icons/io";
import data from "./Data";

const Test = () => {
  const handleRef = useRef(null);
  const [dragStartLeft, setDragStartLeft] = useState();
  const [dragStartX, setDragStartX] = useState();
  const [initialValue, setInitialValue] = useState();
  const [url, setUrl] = useState();
  const [profileInfos, setProfileInfos] = useState([]);
  const urls = data;

  const getNewProfile = () => {
    const randomElement = Math.floor(Math.random() * Math.floor(9));
    setUrl(urls[randomElement].url);
    setProfileInfos([
      {
        name: faker.name.firstName(),
        age: faker.random.number({ min: 19, max: 32 }),
        job: faker.name.jobType(),
        company: faker.company.companyName(),
        friends: faker.random.number({ min: 0, max: 5 })
      }
    ]);
  };

  const handleClose = () => {
    document.getElementsByClassName("swipe-result-close")[0].style =
      "display: block";

    setTimeout(() => {
      getNewProfile();
      document.getElementsByClassName("swipe-result-close")[0].style =
        "display: none";
    }, 1000);
  };

  const handleHeart = () => {
    document.getElementsByClassName("swipe-result-heart")[0].style =
      "display: block";

    setTimeout(() => {
      getNewProfile();
      document.getElementsByClassName("swipe-result-heart")[0].style =
        "display: none";
    }, 1000);
  };

  const handleStar = () => {
    document.getElementsByClassName("swipe-result-star")[0].style =
      "display: block";

    setTimeout(() => {
      getNewProfile();
      document.getElementsByClassName("swipe-result-star")[0].style =
        "display: none";
    }, 1000);
  };

  const handelFlash = () => {
    document.getElementsByClassName("swipe-result-flash")[0].style =
      "display: block";

    setTimeout(() => {
      getNewProfile();
      document.getElementsByClassName("swipe-result-flash")[0].style =
        "display: none";
    }, 1000);
  };

  const setUp = () => {
    const content = document.getElementById("content");
    const card = document.getElementsByClassName("card-1");
    const calc =
      content.offsetWidth / 2 - handleRef.current.offsetWidth / 2 - 10;
    handleRef.current.style.transform = "translate(" + calc + "px, 0)";
    handleRef.current.style.left = "0";
    setInitialValue(calc);
    setDragStartLeft(
      card[0].getBoundingClientRect().left -
        card[0].offsetLeft -
        content.offsetLeft
    );
    setDragStartX(
      card[0].getBoundingClientRect().left + card[0].offsetWidth / 2
    );
  };

  const handleDrag = (event) => {
    const content = document.getElementById("content");
    const { target, clientX } = event;
    const { offsetLeft } = target;
    const { left } = handleRef.current.getBoundingClientRect();
    const calc =
      content.offsetWidth / 2 - handleRef.current.offsetWidth / 2 - 10;
    setInitialValue(calc);
    setDragStartLeft(left - offsetLeft - content.offsetLeft);
    setDragStartX(clientX);
    window.addEventListener("mousemove", startDragging, false);
    window.addEventListener("mouseup", stopDragging, false);
  };

  const startDragging = ({ clientX }) => {
    var rotate = 0;
    if (Math.sign(clientX - dragStartX) === -1) {
      rotate = "rotate(-10deg)";
    } else {
      rotate = "rotate(10deg)";
    }
    handleRef.current.style.transform = `translate(${
      dragStartLeft + clientX - dragStartX
    }px, 0px) ${rotate}`;
    if (clientX - dragStartX > 120) {
      handleRef.current.style.transform =
        "translate(" + initialValue + "px, 0)";
      handleRef.current.style.left = "0";

      setTimeout(() => {
        handleHeart();
      }, 100);
    } else if (clientX - dragStartX < -120) {
      handleRef.current.style.transform =
        "translate(" + initialValue + "px, 0)";
      handleRef.current.style.left = "0";
      setTimeout(() => {
        handleClose();
      }, 100);
    }
  };

  const stopDragging = () => {
    handleRef.current.style.transform = "translate(" + initialValue + "px, 0)";
    handleRef.current.style.left = "0";
    window.removeEventListener("mousemove", startDragging, false);
    window.removeEventListener("mouseup", stopDragging, false);
  };

  useEffect(() => {
    setUp();
  }, []);
  useEffect(() => {
    getNewProfile();
  }, []);

  return (
    <>
      <div className="content" id="content">
        <div className="background-top"></div>
        <h2 className="title">Discover</h2>
        <div className="card card-1" onMouseDown={handleDrag} ref={handleRef}>
          <div className="img-user">
            <div className="swipe-result-close">
              <div className="action-close">
                <IoMdClose />
              </div>
            </div>
            <div className="swipe-result-heart">
              <div className="action-heart">
                <IoIosHeart />
              </div>
            </div>
            <div className="swipe-result-flash">
              <div className="action-flash">
                <IoIosFlash />
              </div>
            </div>
            <img src={url} alt="" />
          </div>
          {profileInfos.map((item, index) => (
            <div className="info" key={index}>
              <p>
                {item.name}, {item.age}
              </p>
              <p>
                {item.job} @{item.company}
              </p>
              <p>{item.friends} mutual friends</p>
              <div className="swipe-result-star">
                <div className="action-star">
                  <IoMdStar />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="card card-2">
          <div className="img-user"></div>
        </div>
        <div className="actions">
          <div className="action action-fresh" onClick={getNewProfile}>
            <IoMdRefresh />
          </div>
          <div className="action action-close" onClick={handleClose}>
            <IoMdClose />
          </div>
          <div className="action action-star" onClick={handleStar}>
            <IoMdStar />
          </div>
          <div className="action action-heart" onClick={handleHeart}>
            <IoIosHeart />
          </div>
          <div className="action action-flash" onClick={handelFlash}>
            <IoIosFlash />
          </div>
        </div>
      </div>
    </>
  );
};

export default Test;
