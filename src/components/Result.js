import React from 'react'
import Select from 'react-select'
import Classes from './Result.module.css'
import { useState,useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import data from '../mockData.json';
import {MdEmail} from 'react-icons/md';
import {FaUser} from 'react-icons/fa';
import {ImLocation} from 'react-icons/im';
import {IoBusiness} from 'react-icons/io5';
import { CgArrowsExchangeAltV } from "react-icons/cg";

export default function Result(props) {

    const [order,setOrder] = useState();
    const [word,setWord] = useState(props.value);
    const [filtered,setFiltered] = useState([]);
    const [results,setResults] = useState([])
    const newSearch = props.word
  
    const orderOnchange = (order) => {
        switch (order) {
          case "nameASC": {
            return setFiltered(filtered.sort());
          }
          case "nameDESC": {
            return setFiltered(filtered.sort().reverse());
          }
          case "yearASC": {
          return setFiltered(filtered
            .map((item) => item).sort((a, b) => b[3].split("/")[2] - a[3].split("/")[2]).reverse());
          }
          case "yearDESC": {
            return setFiltered(filtered
                .map((item) => item).sort((a, b) => b[3].split("/")[2] - a[3].split("/")[2]));
          }
          default:
            return { ...filtered };
        }
      };

      const options = [
        { value:"nameASC",
          text: 'Name Ascending',
          icon:<i class="fa fa-sort-alpha-asc" ></i>},
        { value:"nameDESC",
          text: 'Name Descending',
          icon:<i class="fa fa-sort-alpha-desc" ></i>},
        { value:"yearASC", 
          text: 'Year Ascending',
          icon:<i class="fa fa-sort-numeric-asc" ></i>},
        { value:"yearDESC",
          text: 'Year Descending',
          icon:<i class="fa fa-sort-numeric-desc" ></i>}
      ];

    useEffect(()=>{
        setResults(filtered)
    },[filtered])
        
// ------------------------------ Results page search -----------------------------------------------            
    useEffect(()=>{
        setWord(newSearch)
    },[newSearch])

    useEffect(() => {
        const flData = data.data.filter(item => (
            item[0].toLowerCase().startsWith(word.toLowerCase()) || item[0].toLowerCase().substring(item[0].indexOf(" ")+1).startsWith(word.toLowerCase()) || item[3].split("/")[2].startsWith(word)
            ))
            setFiltered(flData)
    
    },[word])
    

    
   // ------------------------------ Pagination -----------------------------------------------
    const [pageNumber,setPageNumber] = useState(0)
    const resultsPerPage = 5
    const pagesVisited = pageNumber * resultsPerPage
    const pageCount = Math.ceil(results.length / resultsPerPage)
    const changePage = ({selected}) => {
        setPageNumber(selected)
    }

   
    const displayResults = results.slice(pagesVisited,pagesVisited + resultsPerPage).map(item => {
        return (
               <ul style={{padding:"0",margin:"0"}}>
                        <li className={Classes.paginatelistItem}>
                        <p><span className={Classes.icons}><ImLocation/></span>&nbsp;{item[4] + " - " + item[5]}<p><span className={Classes.icons}><FaUser/></span>&nbsp;<strong>{item[0] + " - " + item[3]}</strong></p></p>
                            <p><span className={Classes.icons}><MdEmail/></span>&nbsp;<a href={`mailto:${item[2]}`} >{item[2]}</a><p><span className={Classes.icons}><IoBusiness/>&nbsp;</span>{item[1]}</p></p>
                        </li>
                </ul>
                
        )
    })
    
    // ------------------------------ Main -----------------------------------------------
    if(filtered.length === 0){
     
return (
  <div className={Classes.NotMatching}>
        <h3>No matches found with starting with '{word}'</h3>
        <h4>Try to search with like example: (<strong> name:"peter" </strong>,<strong> surname:"kline" </strong>&nbsp;or<strong> only search with year:"2021"</strong>)</h4>
        </div>
)
    }else{
      if(filtered.length<=3){
        
        return (
            <div>
                <div className={Classes.dropdown}>
            <CgArrowsExchangeAltV size={30}/>
            <div className={Classes.Select}>
                        <Select value={order} options={options} placeholder="Order By" onChange={(e) => {
            setOrder(e.value);
            orderOnchange(e.value);
          }}
          getOptionLabel={e => (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {e.icon}
              <p style={{ marginLeft: 5,fontSize:"13px" }}>{e.text}</p>
            </div>
          )}
           > 
              </Select>
              </div>
                </div>
            <div className={Classes.main}>
                {filtered && filtered.length > 0 && word.length > 1 && <ul className={Classes.list}>
                {word.length > 1 && <div style={{display:"flex",justifyContent:"flex-start",width:"65%",fontWeight:"bold",paddingLeft:"10px"}}><p>{filtered.length} results found;</p></div>}
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
            </div>
        )
    }else{
      
        return(
            <div>
                <div className={Classes.dropdown}>
            <CgArrowsExchangeAltV size={30}/>
            <div className={Classes.Select}>
                        <Select value={order} options={options} placeholder="Order By" onChange={(e) => {
            setOrder(e.value);
            orderOnchange(e.value);
          }}
          getOptionLabel={e => (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {e.icon}
              <p style={{ marginLeft: 5,fontSize:"13px" }}>{e.text}</p>
            </div>
          )}
           > 
              </Select>
              </div>
                </div>
            <div className={Classes.main}>
            <div className={Classes.PaginateList}>
            {<div style={{display:"flex",justifyContent:"flex-start",width:"65%",fontWeight:"bold",paddingLeft:"10px"}}><p>{filtered.length} results found;</p></div>}
            {displayResults}
            <div className={Classes.paginateMain}>
            <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={Classes.paginationBttns}
            previousLinkClassName={Classes.previousBttn}
            nextLinkClassName={Classes.nextBttn}
            disabledClassName={Classes.paginationDisabled}
            activeClassName={Classes.paginationActive}
            />
            </div>
            </div>
            </div>
            </div>
        )
    }
    }
    
    
    
}
