import React from 'react'
import { useState } from 'react';
import Classes from '../css/Home.module.css';
import {useNavigate } from 'react-router-dom';
import data from '../mockData.json';
import logo from '../tesodevLOGO.png';
import {AiOutlineArrowRight} from 'react-icons/ai';
import {MdEmail} from 'react-icons/md';
import {FaUser} from 'react-icons/fa'
import {ImLocation} from 'react-icons/im'
import {IoBusiness} from 'react-icons/io5'

export default function Home() {
    const [errorStyle,setErrorStyle] = useState(Classes.searchBar);
    const [filtered,setFiltered] = useState([]);
    const [value,setValue] = useState("");
    const nav = useNavigate();

// ------------------------------ Matching results -----------------------------------------------  
    function showResults(e){
       const flData = data.data.filter(item => (
        item[0].toLowerCase().startsWith(e.target.value.toLowerCase()) || item[0].toLowerCase().substring(item[0].indexOf(" ")+1).startsWith(e.target.value.toLowerCase()) || item[3].split("/")[2].startsWith(e.target.value)
        ))
        setValue(e.target.value)
        setFiltered(flData)
        setErrorStyle(Classes.searchBar)
            document.getElementById("errorText").style.display="none"
      }
// ------------------------------ on enter search -----------------------------------------------      
     function searchOnEnter(e){
        if(e.key === 'Enter' && e.target.value !== ""){
            nav("Results",{state:{word:value}})
            setErrorStyle(Classes.searchBar)
            document.getElementById("errorText").style.display="none"
          }else{
            setErrorStyle(Classes.searchBarError)
            document.getElementById("errorText").style.display="block"
          }
     }
// ------------------------------ Button search -----------------------------------------------     
     function searchBtn(){
      if(value !== ""){
        nav("Results",{state:{word:value}})
        setErrorStyle(Classes.searchBar)
        document.getElementById("errorText").style.display="none"
      }else{
        setErrorStyle(Classes.searchBarError)
        document.getElementById("errorText").style.display="block"
      }      
   }
   // ------------------------------ Main -----------------------------------------------
   if(filtered.length === 0 && value !== ""){
     return (
     <div className={Classes.main}>
      <img src={logo} alt='tesodevLogo'/>
        <div className={Classes.searchBlock}>
        <input type="text" className={errorStyle} id='searchBar' placeholder='Search Something ...' onChange={showResults} onKeyPress={searchOnEnter} ></input>
        <button className={Classes.searchBtn} id='searchBtn' onClick={searchBtn}>Search</button>
        </div>
        <span className={Classes.NotMatching}>
        <h3>No matches found starting with '{value}'</h3>
        <h4>Try to search like example: (<strong> name:"peter" </strong>,<strong> surname:"kline" </strong>&nbsp;or<strong>only search with year:"2021"</strong>)</h4>
        </span>
        <p id='errorText' className={Classes.errortext}>First write something to search ! You can search by name,surname or year </p>
        </div>
        )
   }else{
    if(filtered.length<=3){
      return (
        <div className={Classes.main}>
        <img src={logo} alt='tesodevLogo'/>
          <div className={Classes.searchBlock}>
          <input type="text" className={errorStyle} id='searchBar' placeholder='Search Something ...' onChange={showResults} onKeyPress={searchOnEnter} ></input>
          <button className={Classes.searchBtn} id='searchBtn' onClick={searchBtn}>Search</button>
          </div>
          <p id='errorText' className={Classes.errortext}>First write something to search ! You can search by name,surname or year </p>
          {filtered && filtered.length > 0 && value.length > 1 && <ul className={Classes.results}>
                {filtered.map((item) => {
                    return (
                    <li className={Classes.listItem}>
                         <p><span className={Classes.icons}><ImLocation/></span>&nbsp;{item[4] + " - " + item[5]}<p><span className={Classes.icons}><FaUser/></span>&nbsp;<strong>{item[0] + " - " + item[3]}</strong></p></p>
                            <p><span className={Classes.icons}><MdEmail/></span>&nbsp;<a href={`mailto:${item[2]}`} >{item[2]}</a><p><span className={Classes.icons}><IoBusiness/>&nbsp;</span>{item[1]}</p></p>
                    </li>
                    )
                })}
            </ul>}
      </div>
    )
     }else{
      return (
        
        <div className={Classes.main}>
        <img src={logo} alt='tesodevLogo'/>
          <div className={Classes.searchBlock}>
          <input type="text" className={errorStyle} id='searchBar' placeholder='Search Something ...' onChange={showResults} onKeyPress={searchOnEnter} ></input>
          <button className={Classes.searchBtn} id='searchBtn' onClick={searchBtn}>Search</button>
          </div>
          <p id='errorText' className={Classes.errortext}>First write something to search ! You can search by name,surname or year </p>
          {filtered && filtered.length > 0 && value.length > 1 && <ul className={Classes.results}>
                {filtered.slice(0,3).map((item) => {
                    return (
                    <li className={Classes.listItem}>
                         <p><span className={Classes.icons}><ImLocation/></span>&nbsp;{item[4] + " - " + item[5]}<p><span className={Classes.icons}><FaUser/></span>&nbsp;<strong>{item[0] + " - " + item[3]}</strong></p></p>
                            <p><span className={Classes.icons}><MdEmail/></span>&nbsp;<a href={`mailto:${item[2]}`} >{item[2]}</a><p><span className={Classes.icons}><IoBusiness/>&nbsp;</span>{item[1]}</p></p>
                    </li>
                    )
                })}
                <div className={Classes.showMoreDiv}>
                <label onClick={searchBtn} className={Classes.showMoreBtn}>Show more... &nbsp;<AiOutlineArrowRight/></label>
                </div>
            </ul>}
      </div>
      
    )
    
     }
   }
     
}

