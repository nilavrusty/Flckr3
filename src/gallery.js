// with the specific group id hitting the api to get the group photos
// with return an object containing the ids required to get the photos which
// i am hitting with respective ids
// as you scroll to the bottom again same api's will be hit and furthur data will be appended
// with the array as the infinite photo grid works 

import React,{useState,useEffect} from 'react'
import axios from 'axios'
import Loader from 'react-loader-spinner'
import { Grid, Image, Segment } from 'semantic-ui-react'
import StackGrid from "react-stack-grid";
import {Redirect,Link} from 'react-router-dom'
import LazyLoad from 'react-image-lazy-load';


var final=[];
let groupPhotos ;

let counter = 2;
const Gallery = (props) => {
  
const [fArr,setfarr] = useState([]); 
const [ load ,setLoad] = useState(false);


    useEffect(()=>{
        if( JSON.parse(sessionStorage.getItem('photos')) && JSON.parse(sessionStorage.getItem('photos')).length>0 ){
            setfarr(JSON.parse(sessionStorage.getItem('photos')))
            final = JSON.parse(sessionStorage.getItem('photos'))
            return;
        }
        getRepos();
    },[])

    async function getRepos() {

        setLoad(true);
            const ops = [];
            let photos =[]
            const numPages = await axios.get(`https://api.flickr.com/services/rest/?method=flickr.groups.pools.getPhotos&api_key=75bab62db333c0838ccdcb3bcf8dd21c&group_id=${props.match.params.id}&per_page=20&format=json&nojsoncallback=1`)
            for (let page = 0; page <numPages.data.photos.photo.length; page ++) {
              let op = axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=75bab62db333c0838ccdcb3bcf8dd21c&photo_id=${numPages.data.photos.photo[page].id}&secret=${numPages.data.photos.photo[page].secret}&format=json&nojsoncallback=1`)
              ops.push(op);
            }
            let res = await axios.all(ops);
            console.log('photos',res);
            res.forEach((v)=>{
                photos.push(v.data.photo)
            })
            final = photos;
            setfarr(final);
            sessionStorage.setItem('photos',JSON.stringify(final) )
            setLoad(false)
        }

        async function update() {
        
            setLoad(true);
                const ops = [];
                let photos =[]
                const numPages = await axios.get(`https://api.flickr.com/services/rest/?method=flickr.groups.pools.getPhotos&api_key=75bab62db333c0838ccdcb3bcf8dd21c&group_id=${props.match.params.id}&per_page=20&format=json&nojsoncallback=1&page=${counter}`)
                for (let page = 0; page <numPages.data.photos.photo.length; page ++) {
                  let op = axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=75bab62db333c0838ccdcb3bcf8dd21c&photo_id=${numPages.data.photos.photo[page].id}&secret=${numPages.data.photos.photo[page].secret}&format=json&nojsoncallback=1`)
                  ops.push(op);
                }
                let res = await axios.all(ops);
                console.log('photos',res);
                res.forEach((v)=>{
                    photos.push(v.data.photo)
                })
                final.push(photos);
            final= final.flat()
            setfarr(final);
            setLoad(false)
                counter++;   
            }
        // onscrollbottom
    document.onscroll = function() {
        console.log("call handler")
        // console.log(window.innerWidth)
        if(document.documentElement.scrollTop + window.innerHeight == document.documentElement.scrollHeight)
        {
            console.log("bottom")
            if(final.length>0){
              update();
            }
            else{
                return
            }
           
        }
    }
return (
    <div>
     
        
    <div className = "container">
        { console.log("datas",fArr)}
        <div>
              <div style={{display:'flex'}}>
                  <h1 style={{margin:'auto'}}> Infinite Photo Grid</h1>
              </div>
              <div style={{display:'flex'}}>
              <div style={{margin:'auto'}}>lazy loading didnt sync with the staggered grid if images didnt load up properly try Reloading or scrolling down the scrollbar till the end then the above cards would stack properly</div>

              </div>
        </div>
        <StackGrid
        columnWidth={
            window.innerWidth < 700? "100%" : "50%"
        }
        gutterWidth={100}
        gutterHeight={100}
        >
                {fArr && fArr.length > 0 ? fArr.map((pic)=>(

              
                                
                <div 
                onMouseEnter = {()=>{
                    console.log("idea")
                    document.body.style.cursor = 'pointer'
                }}
                onMouseLeave = {()=>{
                    console.log("no idea")
                    document.body.style.cursor = 'inherit'
                }}
                key={pic.id} onClick= {()=>{props.history.push(`/overview/${props.match.params.id}_${pic.id}`)}} style={{ background:'white',padding:'0px',minHeight:'400px',maxHeight:'600'}} >
                                        
                   
                    <div style={{width:'100%'}}>
                      <div  className="filler" >
                      <LazyLoad loaderImage={true} originalSrc={`https://farm${pic.farm}.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}.jpg`} imageProps={{
                        src: require('../src/logo.svg') ,
                        ref: "image",
                        className: "filler",
                        width:"100%",
                        maxHeight:'400px',
                        minHeight:'300px'
                        }} />

                        <div style={{height:'auto',width:'100%',background:'white'}}>
                        <div style={{height:'50px',overflow:'auto',display:'flex',padding:'0 20px 0 20px'}}>
                        <div style={{margin:'auto'}}>Title:&nbsp;&nbsp;{pic.title._content}</div>
                        </div>
                        <div style={{height:'50px',overflow:'auto',display:'flex',padding:'0 20px 0 20px'}}>
                        <div style={{margin:'auto'}}>
                        Owner:&nbsp;&nbsp;{pic.owner.realname}
                        </div>
                        </div>
                        <div style={{height:'50px',overflow:'auto',display:'flex',padding:'0 20px 0 20px'}}>
                        <div style={{margin:'auto'}}>
                        Comments:&nbsp;&nbsp;{pic.comments._content}</div>
                        </div>
                        <div style={{height:'50px',overflow:'auto',display:'flex',padding:'0 20px 0 20px'}}>
                        <div style={{margin:'auto'}}>
                        Views:&nbsp;&nbsp;{pic.views}
                        </div>
                        </div>
                        <div style={{height:'50px',overflow:'auto',display:'flex',padding:'0 20px 0 20px'}}>
                        <div style={{margin:'auto'}}>
                        Taken on:&nbsp;&nbsp;{pic.dates.taken.split(" ")[0]}</div>
                        </div>
                        <div style={{display:'flex'}}>
                        <div style={{margin:'auto'}}> Description
                        </div>
                        </div>
                        <div className="desc"  style={{height:'100px',overflow:'auto',display:'flex',padding:'0 20px 0 20px'}}>
                       
                        <div style={{margin:'auto'}}>
                        {pic.description._content.length>0? pic.description._content : "No Description"}</div>
                        </div>
                    </div>
                      </div>
                     
                       
                    </div>
                   
                </div>
               
                
        )) :  load == false? <div style={{display:'flex'}}>
        <h1 style={{marginRight:'auto'}}> No Photos</h1>
    </div> : null
        
   }
            
            </StackGrid>
        {load ? <div style={{display:'flex'}}><div style={{margin:'auto'}}> <Loader 
         type="Bars"
         color="#00BFFF"
         height="100"	
         width="100"
      />  </div> </div> : null}
                      
    </div>
   
    </div>
    
)
}
export default Gallery;