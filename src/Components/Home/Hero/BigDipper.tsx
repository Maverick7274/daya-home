"use client";

import React, { useRef, useEffect, useState } from "react";
import starsData from "@/Data/starData"; // Import the star data JSON

interface BigDipperProps {
  onStarHover: (star: {
    x: number;
    y: number;
    name: string;
    image: string;
    heading: string;
    description: string;
    url: string;
  }) => void;
}

const BigDipper: React.FC<BigDipperProps> = ({ onStarHover }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHoveringStar, setIsHoveringStar] = useState(false); // To toggle cursor pointer

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const scale = 0.6; // Scale down the Big Dipper
    const canvasWidth = canvas.offsetWidth * scale;
    const canvasHeight = canvas.offsetHeight * scale;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Line connections for Big Dipper
    const lineConnections = [
      [0, 1], // Dubhe ↔ Merak
      [1, 2], // Merak ↔ Phecda
      [2, 3], // Phecda ↔ Megrez
      [0, 3], // Dubhe ↔ Megrez (Fixing visibility issue)
      [3, 4], // Megrez ↔ Alioth
      [4, 5], // Alioth ↔ Mizar
      [5, 6], // Mizar ↔ Alkaid
    ];

    let hoveredStarIndex = -1;

    const drawBigDipper = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connecting lines
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 2;
      ctx.beginPath();
      lineConnections.forEach(([startIndex, endIndex]) => {
        const startX = starsData[startIndex].x * canvasWidth + canvasWidth / 4;
        const startY = starsData[startIndex].y * canvasHeight + canvasHeight / 4;
        const endX = starsData[endIndex].x * canvasWidth + canvasWidth / 4;
        const endY = starsData[endIndex].y * canvasHeight + canvasHeight / 4;

        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
      });
      ctx.stroke();

      // Draw stars
      starsData.forEach((star, index) => {
        const starX = star.x * canvasWidth + canvasWidth / 4;
        const starY = star.y * canvasHeight + canvasHeight / 4;
        ctx.beginPath();
        ctx.arc(starX, starY, 8, 0, Math.PI * 2);

        // Glow effect
        ctx.shadowColor = index === hoveredStarIndex ? "#ffcc00" : "#ffffff";
        ctx.shadowBlur = index === hoveredStarIndex ? 20 : 10;

        ctx.fillStyle = "#ffffff";
        ctx.fill();
        ctx.shadowBlur = 0; // Reset shadow
      });
    };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      let hoveredStar = null;

      starsData.forEach((star, index) => {
        const starX = star.x * canvasWidth + canvasWidth / 4;
        const starY = star.y * canvasHeight + canvasHeight / 4;
        const distance = Math.sqrt((mouseX - starX) ** 2 + (mouseY - starY) ** 2);

        if (distance < 10) {
          hoveredStar = star;
          hoveredStarIndex = index;
        }
      });

      if (hoveredStar) {
        onStarHover(hoveredStar);
        setIsHoveringStar(true); // Enable pointer cursor
      } else {
        hoveredStarIndex = -1;
        setIsHoveringStar(false); // Disable pointer cursor
      }

      drawBigDipper();
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    drawBigDipper();

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, [onStarHover]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute top-0 left-0 w-full h-full ${
        isHoveringStar ? "cursor-pointer" : "cursor-default"
      }`}
    ></canvas>
  );
};

export default BigDipper;
