"use client";
//import React from "react";
import dynamic from "next/dynamic";

const ThreeDObject = dynamic(() => import("./ThreeDObject"), { ssr: false });

export default ThreeDObject;
