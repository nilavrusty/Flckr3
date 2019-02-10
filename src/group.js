// i have use React HOOKS for this app no class components are being used
// NOTE:xxxxxxxxxxxxxxxxx--------------xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// I am not able to get the Image src for the group icon 
// as the mentioned method in the API documentation doesn't work for group icon images

import React,{useState,useEffect} from 'react'
import axios from 'axios'
import Loader from 'react-loader-spinner'
import { Header,  Table } from 'semantic-ui-react'
import  { withRouter }  from 'react-router-dom'
import LazyLoad from 'react-image-lazy-load';
import "./App.css"
import highcharts from 'highcharts'

const group = (props) => {
    var counter =1;
    const [grp,setGrp] = useState();
    const [grpArr,setGrpArr] = useState([]);
    const [grpPhoto,setGrpPhoto] = useState([]);
    const [dataArr,setList] = useState([]);
    const [ load ,setLoad] = useState(false)
    let nsid = []
    sessionStorage.removeItem('photos');
   const groupHandler = (e) => {
   
       e.preventDefault()
    // executionfun(1);   
    getRepos(1); 
    }

    useEffect(()=>{
        
       
        if( JSON.parse(sessionStorage.getItem("grpArr")) && JSON.parse(sessionStorage.getItem("grpPhoto")) && JSON.parse(sessionStorage.getItem("grpArr")).length>0 && JSON.parse(sessionStorage.getItem("grpPhoto")).length>0  )
        {
            setGrpArr(JSON.parse(sessionStorage.getItem("grpArr"))) 
            setGrpPhoto(JSON.parse(sessionStorage.getItem("grpPhoto"))) 
            let chartsR = JSON.parse(sessionStorage.getItem("grpArr"))

            chartsR =  chartsR.map((v)=>([v.name,Number(v.pool_count)]))
            highcharts.chart("charts", {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Groups and Photo count'
                },
                xAxis: {
                    type: 'category',
                    labels: {
                        rotation: -45,
                        style: {
                            fontSize: '13px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Photo Count'
                    }
                },
                legend: {
                    enabled: false
                },
                tooltip: {
                    pointFormat: 'Population in 2017: <b>{point.y:.1f} millions</b>'
                },
                series: [{
                    name: 'Population',
                    data: chartsR,
                    dataLabels: {
                        enabled: true,
                        rotation: -90,
                        color: '#FFFFFF',
                        align: 'right',
                        format: '{point.y:.1f}', // one decimal
                        y: 10, // 10 pixels down from the top
                        style: {
                            fontSize: '13px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }
                }]
            })
            
            return;
        }
      
        
    },[])

   async function getRepos(v) {
    setLoad(true);
        const ops = [];
        let photos =[]
        const numPages = await axios.get(`https://api.flickr.com/services/rest/?method=flickr.groups.search&api_key=75bab62db333c0838ccdcb3bcf8dd21c&text=${grp}&format=json&nojsoncallback=1&per_page=20&page=${v}`)
        sessionStorage.setItem("grpArr",JSON.stringify(numPages.data.groups.group))
      let chartsR =  numPages.data.groups.group.map((v)=>([v.name,Number(v.pool_count)]))
                    setGrpArr(numPages.data.groups.group); //group list
        for (let page = 0; page <numPages.data.groups.group.length; page ++) {
          let op = axios.get(`https://api.flickr.com/services/rest/?method=flickr.groups.pools.getPhotos&api_key=75bab62db333c0838ccdcb3bcf8dd21c&group_id=${numPages.data.groups.group[page].nsid}&per_page=8&format=json&nojsoncallback=1`)
          ops.push(op);
        }
        let res = await axios.all(ops);
        console.log('photos',res);
        res.forEach((v)=>{
            photos.push(v.data.photos)
        })
        sessionStorage.setItem("grpPhoto",JSON.stringify(photos))
        setGrpPhoto(photos)//photo list
        highcharts.chart("charts", {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Groups and Photo count'
            },
            xAxis: {
                type: 'category',
                labels: {
                    rotation: -45,
                    style: {
                        fontSize: '13px',
                        fontFamily: 'Verdana, sans-serif'
                    }
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Photo Count'
                }
            },
            legend: {
                enabled: false
            },
            tooltip: {
                pointFormat: 'Population in 2017: <b>{point.y:.1f} millions</b>'
            },
            series: [{
                name: 'Population',
                data: chartsR,
                dataLabels: {
                    enabled: true,
                    rotation: -90,
                    color: '#FFFFFF',
                    align: 'right',
                    format: '{point.y:.1f}', // one decimal
                    y: 10, // 10 pixels down from the top
                    style: {
                        fontSize: '13px',
                        fontFamily: 'Verdana, sans-serif'
                    }
                }
            }]
        })

        setLoad(false)
    }

    const handlePrev = (v) => {
       
        console.log('juygsad',v)
        getRepos(v)
    }
    const handleNext = (v) => {
        console.log("sdcuysdc",v)
        getRepos(v)
    }

return (
    <div  className = "container" >
  {console.log("results---",grpArr,grpPhoto)}
            <form onSubmit = {groupHandler}>
                <div className="form-group">
                    <label for="exampleInputEmail1">Flicker Group Search</label>
                    <input
                    onChange = {(e)=>{
                        setGrp(e.target.value)
                        // console.log(e.target.length,e.target.value)
                        if(e.target.value.length>=2){
                            axios.get(`https://api.flickr.com/services/rest/?method=flickr.groups.search&api_key=75bab62db333c0838ccdcb3bcf8dd21c&text=${e.target.value}&format=json&nojsoncallback=1&per_page=7`)
                            .then((res)=>{
                                let arr = res.data.groups.group;
                                arr = arr.map((v)=>{
                                 return(v.name)   
                                })
                            setList(arr);
                            })
                        }
                        if(e.target.value.length <2){
                            setList([]);
                        }
                    }}
                     type="text" 
                     className="form-control"
                      id="exampleInputEmail1"
                       placeholder="Group Name"
                       list = "datalist1" />
                       <datalist id = "datalist1">
                           {dataArr.map((v)=>(
                               <option style={{width:'100%'}} value={v} />
                           ))}
                       </datalist>
                </div>
              
                <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                {load ? <div style={{display:'flex'}}><div style={{margin:'auto'}}> <Loader 
                    type="Bars"
                    color="#00BFFF"
                    height="100"	
                    width="100"
                />  </div> </div> : null}
                <br />
                <br />

         <div id = "charts" ></div>  
          <br />
          <br />
           
            <div  className="row">
            { grpPhoto.length>0?   <div style={{display:'flex'}}>
                  <h1 style={{margin:'auto'}}> Cards</h1>
              </div> : null }
                { grpPhoto.length>0 && grpArr.map((group,i)=>(

                <div onClick ={()=>{props.history.push(`gallery/${group.nsid}`)}} style={{padding:'20px'}}className="col-xs-12 col-md-6 col-lg-6">
                                
                        <div onMouseEnter = {()=>{
                            console.log("idea")
                            document.body.style.cursor = 'pointer'
                        }}
                        onMouseLeave = {()=>{
                            console.log("no idea")
                            document.body.style.cursor = 'inherit'
                        }} id="div" style={{borderRadius:'8px',padding:'30px 30px 0 30px',height:'470px',background:'white'}}>
                        <span style={{display:'inline-block',height:'50px',width:'50px',borderRadius:'50%',background:'black'}}></span>
                        <br />
                       Group Name : {group.name} <br />
                       Total Members:{group.members}
                        <div className="row">

                        {grpPhoto[i]? grpPhoto[i].photo.map((val,itr)=>{
                            let src = `https://farm${val.farm}.staticflickr.com/${val.server}/${val.id}_${val.secret}.jpg`
                            return(
                                <div style={{padding:'5px'}}className="col-xs-3 col-md-3 col-lg-3" >
                              <div style={{width:"100%"}}>
                              <div className="holder" >
                              <LazyLoad loaderImage={true} originalSrc={src} imageProps={{
                        src: require('../src/805.svg') ,
                        ref: "image",
                        className: "holder",
                        width:"100%",
                       height:'150px'
                        }} />
                              </div>
                              </div>
                              </div>
                            )
                        }):null}
                        </div>
                        </div>
                   
                        </div>    
                ))}

            </div>
           { grpPhoto.length>0? <div style={{display:'flex',margin:'50px 0 50px 0' }}>
                  <div style={{margin:'auto'}}> 
                  <button onClick={()=>{
                      if(--counter<2)
                      {
                          counter =1
                          handlePrev(counter)

                      }
                      else {
                        handlePrev(--counter)
                      }
                     
                      }} className="btn btn-primary">Prev</button> &nbsp;&nbsp;
                  <button onClick={ ()=> handleNext(++counter)} className="btn btn-primary">Next</button>
                  </div>
                        </div> : null}
    </div>
)
}
export default withRouter(group);