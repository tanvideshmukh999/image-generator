import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {

  const [inputText,setInputText]=useState("");
  const [imagelink,setImageLink]=useState("");
  const API_TOKEN="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";

  const fetchData=async()=>{
    try{
      const response =await axios.post(
          'https://api-inference.huggingface.co/models/prompthero/openjourney-v4',
          {
            inputs: inputText,
          },
          {
            headers: {
              Authorization: `Bearer ${API_TOKEN}`,
            },
            responseType: 'blob', 
          }
        )
        console.log(response.data);
        const imageUrl = URL.createObjectURL(response.data);
        console.log(imageUrl);
        setImageLink(imageUrl);
    
    }
    catch(e){
      console.log("error occurs");
    }
  }


  useEffect(()=>{
    fetchData();
  },[inputText])
  return (
    <div className="App">
      <h1>Image Generator</h1>
      
     <input type="text"  value={inputText} onChange={(e)=>{
      setInputText(e.target.value);

     }}/>
   <button>Generate</button>

     <br/>
     <img src={imagelink} alt=""/>
    </div>
  );
}

export default App;