import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Progress } from "./ui/progress";
import { useAuthStore } from "@/store/useAuthStore";
import axios from "@/lib/axios";
import { useNavigate } from "react-router-dom";

const LoadingScreen = () => {
  const navigate = useNavigate();
  const { progress } = useAuthStore();
  const animationRef = useRef(null);
  const spoonRef = useRef(null);
  const steamRef = useRef(null);
  const loadingRef = useRef(null);

  useEffect(() => {
    const handleGoogleAuth = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");

        if (code){
          await axios.post("/auth/google", { code });
          navigate("/", { replace: true });
        }
      } catch (err) {
        console.error("Google login failed", err);
        navigate("/", { replace: true });
      }
    };

    handleGoogleAuth();
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      animationRef.current,
      { opacity: 0, scale: 0 },
      { opacity: 1, scale: 1, duration: 0.8, ease: "bounce.out" }
    )
      .fromTo(spoonRef.current, 
        {
          rotate: -20,
          transformOrigin: "center bottom",
        },
        {
        rotate: 20,
        transformOrigin: "center bottom",
        yoyo: true,
        repeat: -1,
        duration: 0.6,
        ease: "power3.inOut",
      })
      .fromTo(
        steamRef.current,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: -20,
          repeat: -1,
          duration: 1.5,
          ease: "power3.inOut",
        }
      )
      .fromTo(
        loadingRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: "power3.inOut" },
        "<0.5"
      );
  }, []);
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <svg
        ref={animationRef}
        width="250"
        height="250"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Body */}
        <rect
          x="60"
          y="80"
          width="80"
          height="80"
          rx="15"
          className="fill-primary"
        />
        {/* Face */}
        <rect x="70" y="90" width="60" height="30" rx="8" fill="#000" />
        <circle cx="85" cy="100" r="3" fill="white" />
        <circle cx="115" cy="100" r="3" fill="white" />
        <path
          d="M85 110 Q100 115 115 110"
          stroke="white"
          strokeWidth="2"
          fill="none"
        />

        {/* Chef Hat */}
        <g transform="translate(70, 25) scale(0.12)">
          <path
            xmlns="http://www.w3.org/2000/svg"
            className="dark:fill-white fill-gray-400"
            stroke="none"
            d=" M205.838776,399.919250   C186.469757,403.624054 167.452347,406.839996 148.686096,411.149597   C137.050385,413.821716 125.828087,418.262390 114.348228,421.666382   C111.370483,422.549316 108.120361,422.849304 104.998672,422.831543   C100.458717,422.805756 97.575684,420.072876 96.327652,415.847656   C95.626587,413.474152 95.319267,410.955566 95.080643,408.478668   C92.419846,380.859131 89.859299,353.229889 87.161072,325.614044   C85.641739,310.063965 83.924728,294.533142 82.278198,278.995605   C81.908524,275.507172 83.090881,274.138458 86.840660,274.722839   C124.165298,280.539490 157.293930,268.901123 188.148682,249.332153   C201.301575,240.990234 213.476456,231.107025 226.103653,221.935043   C229.445175,219.507889 231.308701,216.587936 228.726410,212.624985   C226.642548,209.426926 222.368240,209.144928 218.577103,211.949799   C207.352798,220.254059 196.513824,229.123032 184.937607,236.897797   C166.415710,249.337418 146.376724,258.739410 124.155380,262.366577   C92.268097,267.571533 63.872528,260.029968 40.643517,237.006287   C15.494583,212.079712 15.998308,172.962555 40.711521,147.637466   C53.324272,134.712433 68.829926,129.787903 86.113434,129.064819   C107.580994,128.166702 128.422943,133.140732 149.470474,136.262283   C162.939774,138.259903 176.514099,139.595444 190.067429,140.970642   C216.685684,143.671478 243.573654,144.778122 269.480225,152.042816   C281.271637,155.349335 292.489014,160.681992 304.025848,164.935364   C306.238831,165.751266 308.911041,166.535843 311.028351,165.994064   C312.585999,165.595505 314.946564,162.502808 314.571686,161.496368   C313.519501,158.671860 311.790527,155.069794 309.343170,153.972931   C298.738647,149.220032 288.015686,144.450333 276.891663,141.212875   C264.640594,137.647461 251.902832,135.755341 239.379593,133.122482   C238.468018,132.930832 237.576660,132.643082 235.669159,132.128357   C237.895111,130.633987 239.269333,129.516647 240.806152,128.708511   C270.524841,113.080635 301.001007,99.373650 334.394623,93.646057   C369.953888,87.547005 404.528900,90.433220 436.845459,107.549706   C462.820984,121.307671 481.243988,142.197586 489.216095,170.722519   C495.933838,194.759216 491.902283,217.954987 478.992523,239.392242   C475.316071,245.497253 471.681335,251.816559 466.917999,257.022430   C462.520416,261.828613 456.754547,265.440002 451.385284,269.290344   C424.391205,288.648010 394.346832,292.814697 362.414215,286.559814   C339.658112,282.102417 319.245392,272.174286 300.414459,258.835388   C295.348114,255.246643 293.853119,255.332428 290.484406,260.572327   C288.187622,264.144836 290.140533,266.835541 293.142487,268.996918   C317.927155,286.841461 345.123749,298.595825 375.819916,301.028168   C384.220459,301.693817 392.721741,301.331390 401.167267,301.097351   C406.455780,300.950775 407.937866,301.819458 407.955078,307.024719   C408.015350,325.292755 408.200134,343.565918 407.827240,361.826721   C407.702972,367.913239 406.576843,374.112488 404.982788,380.009918   C400.840118,395.336151 390.087250,403.851959 374.354523,405.965057   C359.148438,408.007446 344.176117,406.075684 329.121460,404.569366   C312.257019,402.881958 295.380554,401.226196 278.474060,400.074249   C263.052002,399.023407 247.587051,398.327698 232.132751,398.133820   C223.529373,398.025879 214.909119,399.261993 205.838776,399.919250  z"
          />
        </g>

        {/* Spoon */}
        <rect
          ref={spoonRef}
          x="95"
          y="125"
          width="4"
          height="35"
          rx="2"
          fill="#a8703c"
        />

        {/* Pot */}
        <rect x="75" y="140" width="50" height="20" rx="5" fill="#333" />
        <rect x="70" y="138" width="60" height="5" rx="2" fill="#444" />

        {/* Steam */}
        <g ref={steamRef}>
          {/* Left steam */}
          <path
            d="M90 130 C85 125, 95 120, 90 115"
            stroke="#ccc"
            strokeWidth="2"
            fill="none"
          />
          {/* Middle steam */}
          <path
            d="M100 130 C95 125, 105 120, 100 105"
            stroke="#ccc"
            strokeWidth="2"
            fill="none"
          />
          {/* Right steam */}
          <path
            d="M110 130 C105 125, 115 120, 110 115"
            stroke="#ccc"
            strokeWidth="2"
            fill="none"
          />
        </g>
      </svg>
      <div ref={loadingRef} className="w-2xs">
        <Progress value={progress} />
      </div>
    </div>
  );
};

export default LoadingScreen;
