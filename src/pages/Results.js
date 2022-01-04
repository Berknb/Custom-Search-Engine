import React, { useState,useRef } from 'react'
import Classes from '../css/Results.module.css'
import Result from '../components/Result'
import {useNavigate} from 'react-router-dom';
import {useLocation} from 'react-router-dom';



export default function Results() {
    const inputRef = useRef();
    const location = useLocation();
    const[newWord,setNewWord]=useState(location.state.word);
    const [errorStle,setErrorStyle] = useState(Classes.searchBar)
  
    const nav = useNavigate();

    function searchOnEnter(e){
        if(e.key === 'Enter' && e.target.value !== ""){
            setNewWord(e.target.value)
            setErrorStyle(Classes.searchBar)
          }else if(e.key === 'Enter' && e.target.value === ""){
            setErrorStyle(Classes.searchBarError)
          }
     }
     function onClick(){
      if(inputRef.current.value !== ""){
        setNewWord(inputRef.current.value)
        setErrorStyle(Classes.searchBar)
      }else{
        setErrorStyle(Classes.searchBarError)
      }
   }
  
    return (
        <section>
            <div className={Classes.main}>
        <img src='https://tesodev.github.io/jqueryLite/img/tesodevVector.png' alt='tesodevLogo' height="90" onClick={() => (nav("/"))}/>
        <div className={Classes.searchBlock}>
          <input type="text" id='searchBar' className={errorStle} defaultValue={location.state.word} onKeyPress={searchOnEnter} ref={inputRef}></input>
<button id='searchBtn' className={Classes.searchBtn} onClick={onClick}>Search</button>
          </div>
          </div>
          <Result value={newWord} word={newWord}/>
        </section>
    )
}
