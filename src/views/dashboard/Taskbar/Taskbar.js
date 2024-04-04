



import React, { useEffect } from "react";
// import "./Marquee.css"; // Import your CSS file with styles

const Taskbar = () => {
  useEffect(() => {
    const marqueeList = document.getElementById("marquee-list");

    let animationTimeout;

    function startMarquee() {
      const marqueeHeight = marqueeList.scrollHeight;

      const animationDuration = marqueeHeight / 50 + "s"; // Adjust the speed as needed

      marqueeList.style.animationDuration = animationDuration;
    }

    function pauseMarquee() {
      clearTimeout(animationTimeout);
      marqueeList.style.animationPlayState = "paused";
    }

    function resumeMarquee() {
      animationTimeout = setTimeout(() => {
        marqueeList.style.animationPlayState = "running";
      }, 1000); // Resume after a delay (adjust as needed)
    }

    startMarquee();

    // Pause the marquee on hover
    marqueeList.addEventListener("mouseenter", pauseMarquee);

    // Resume the marquee when hover is removed
    marqueeList.addEventListener("mouseleave", resumeMarquee);

    // Clean up event listeners when the component unmounts
    return () => {
      marqueeList.removeEventListener("mouseenter", pauseMarquee);
      marqueeList.removeEventListener("mouseleave", resumeMarquee);
    };
  }, []);

  return (
    <div className="card h-100" style={{ width: "18rem", height:"15rem" }}>
      <div className="card-header" style={{background:"#edf0f4"}}>Task Bar</div>
      <div className="marquee-container">
        <ul className="list-group list-group-flush" id="marquee-list">
          <li className="list-group-item"> Get Ready for a call with Ayush at 12:10PM.</li>
          <li className="list-group-item text-success"> Get Ready for a call with Ayush at 01:00PM.</li>
          <li className="list-group-item " > Get Ready for a call with Ayush at 01:30PM.</li>
          <li className="list-group-item text-danger"> Get Ready for a call with Ravi at 03:00PM.</li>
          <li className="list-group-item text-success"> Get Ready for a call with  at 04:00PM.</li>
          <li className="list-group-item text-success"> Get Ready for a call with Ritik at 6:00PM.</li>
        </ul>
      </div>
    </div>
  );
};

export default Taskbar;

