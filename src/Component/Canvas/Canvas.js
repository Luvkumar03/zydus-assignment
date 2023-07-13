import './Canvas.css';
// import {useEffect, useRef, useState} from 'react';

// const Canvas = () => {
//     const canvasRef = useRef(null);
//     const contextRef = useRef(null);

//     const [isDrawing, setIsDrawing] = useState(false);

//     useEffect(() => {
//         const canvas = canvasRef.current;
//         canvas.width = 500;
//         canvas.height = 500;

//         const context = canvas.getContext("2d");
//         context.lineCap = "round";
//         context.strokeStyle = "black";
//         context.lineWidth = 5;
//         contextRef.current = context;
//     }, []);

//     const startDrawing = ({nativeEvent}) => {
//         const {offsetX, offsetY} = nativeEvent;
//         contextRef.current.beginPath();
//         contextRef.current.moveTo(offsetX, offsetY);
//         contextRef.current.lineTo(offsetX, offsetY);
//         contextRef.current.stroke();
//         setIsDrawing(true);
//         nativeEvent.preventDefault();
//     };

//     const draw = ({nativeEvent}) => {
//         if(!isDrawing) {
//             return;
//         }

//         const {offsetX, offsetY} = nativeEvent;
//         contextRef.current.lineTo(offsetX, offsetY);
//         contextRef.current.stroke();
//         nativeEvent.preventDefault();
//     };

//     const stopDrawing = () => {
//         contextRef.current.closePath();
//         setIsDrawing(false);
//     };

//     const setToDraw = () => {
//         contextRef.current.globalCompositeOperation = 'source-over';
//     };

//     const setToErase = () => {
//         contextRef.current.globalCompositeOperation = 'destination-out';
//     };

//     const Download = (event) => {
//         let link = event.currentTarget;
//         link.setAttribute('download', 'canvas.png');
//         let image = canvasRef.current.toDataURL('image/png');
//         link.setAttribute('href', image);
//     };

//     return (
//         <div>
//             <canvas className="canvas-container"
//                 ref={canvasRef}
//                 onMouseDown={startDrawing}
//                 onMouseMove={draw}
//                 onMouseUp={stopDrawing}
//                 onMouseLeave={stopDrawing}>
//             </canvas>
//             <div>
//                 <button onClick={setToDraw}>
//                     Draw
//                 </button>
//                 <button onClick={setToErase}>
//                     Erase
//                 </button>
//                 <a id="download_image_link" href="download_link" onClick={Download}>Download</a>
//             </div>
//         </div>
//     )
// }

// export default Canvas;

import React, { useRef } from 'react';

function CanvasDownload() {
    const canvasRef = useRef(null);

    const handleDownload = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const imageData = ctx.getImageData(0, 0, 16, 34);
        const pixelData = imageData.data;

        // Convert pixel data to hex format
        let hexData = '';
        for (let i = 0; i < pixelData.length; i += 4) {
            const r = pixelData[i];
            const g = pixelData[i + 1];
            const b = pixelData[i + 2];
            const hex = rgbToHex(r, g, b);
            hexData += hex;
        }

        // Create a file with the hex data
        const blob = new Blob([hexData], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'canvas_data.txt';
        link.click();
    };

    const rgbToHex = (r, g, b) => {
        const hex = ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0');
        return '#' + hex;
    };

    const drawCharacter = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Set font and color
        const font = '24px Arial'; // You can change the font family and size here
        const color = '#FF0000'; // You can change the font color here

        // Center alignment
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Calculate the center coordinates
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        // Draw the character
        ctx.font = font;
        ctx.fillStyle = color;
        ctx.fillText('A', centerX, centerY); // You can change the character here
    };

    // Call drawCharacter when the component is mounted
    React.useEffect(() => {
        drawCharacter();
    }, []);

    return (
        <div>
            <canvas className="canvas-container"
                ref={canvasRef} width={16} height={34}></canvas>
            <button onClick={handleDownload}>Download</button>
        </div>
    );
}

export default CanvasDownload;
