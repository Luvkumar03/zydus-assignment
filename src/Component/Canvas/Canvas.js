import { useEffect,useRef,useState } from "react";
 const Canvas=()=>{
    const canvasRef=useRef(null);


    const [isDrawing,setIsDrawing]=useState(false)
    
    useEffect(()=>{
        const canvas = canvasRef.current;
        canvas.width = 320;
        canvas.height = 160;

        
    })

   function Download (){

   }
    return (
        <div>
            <canvas>
             
            </canvas>
    
            <div>
            <button onClick={Download}>Download</button>
            </div>
        </div>


    )
 }

 export default Canvas