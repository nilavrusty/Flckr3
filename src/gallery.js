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
        setLoad(true)
        axios.get(`https://api.flickr.com/services/rest/?method=flickr.groups.pools.getPhotos&api_key=75bab62db333c0838ccdcb3bcf8dd21c&group_id=${props.match.params.id}&per_page=20&format=json&nojsoncallback=1`)
        .then((res)=>{
            groupPhotos = res.data.photos;
            console.log("group photos",groupPhotos)
            return images();
        })
        .then((res)=>{
            final = res;
            setfarr(final);
            sessionStorage.setItem('photos',JSON.stringify(final) )
            setLoad(false)
        })
    },[])

        // onscrollbottom
    document.onscroll = function() {
        console.log("call handler")
        // console.log(window.innerWidth)
        if(document.documentElement.scrollTop + window.innerHeight == document.documentElement.scrollHeight)
        {
            console.log("bottom")
            if(final.length>0){
                handler();
            }
            else{
                return
            }
           
        }
    }

   const handler = () => {
   
        setLoad(true)
        axios.get(`https://api.flickr.com/services/rest/?method=flickr.groups.pools.getPhotos&api_key=75bab62db333c0838ccdcb3bcf8dd21c&group_id=${props.match.params.id}&per_page=20&format=json&nojsoncallback=1&page=${counter}`)
        .then((res)=>{
            groupPhotos = res.data.photos;
            return images();
        })
        .then((res)=>{
            final.push(res);
            final= final.flat()
            setfarr(final);
            setLoad(false)
        })
        counter++;
   }

    async function  images(){
        const p1 = await axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=75bab62db333c0838ccdcb3bcf8dd21c&photo_id=${groupPhotos.photo[0].id}&secret=${groupPhotos.photo[0].secret}&format=json&nojsoncallback=1`)
        const p2 = await axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=75bab62db333c0838ccdcb3bcf8dd21c&photo_id=${groupPhotos.photo[1].id}&secret=${groupPhotos.photo[1].secret}&format=json&nojsoncallback=1`)
        const p3 = await axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=75bab62db333c0838ccdcb3bcf8dd21c&photo_id=${groupPhotos.photo[2].id}&secret=${groupPhotos.photo[2].secret}&format=json&nojsoncallback=1`)
        const p4 = await axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=75bab62db333c0838ccdcb3bcf8dd21c&photo_id=${groupPhotos.photo[3].id}&secret=${groupPhotos.photo[3].secret}&format=json&nojsoncallback=1`)
        const p5 = await axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=75bab62db333c0838ccdcb3bcf8dd21c&photo_id=${groupPhotos.photo[4].id}&secret=${groupPhotos.photo[4].secret}&format=json&nojsoncallback=1`)
        const p6 = await axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=75bab62db333c0838ccdcb3bcf8dd21c&photo_id=${groupPhotos.photo[5].id}&secret=${groupPhotos.photo[5].secret}&format=json&nojsoncallback=1`)
        const p7 = await axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=75bab62db333c0838ccdcb3bcf8dd21c&photo_id=${groupPhotos.photo[6].id}&secret=${groupPhotos.photo[6].secret}&format=json&nojsoncallback=1`)
        const p8 = await axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=75bab62db333c0838ccdcb3bcf8dd21c&photo_id=${groupPhotos.photo[7].id}&secret=${groupPhotos.photo[7].secret}&format=json&nojsoncallback=1`)
        const p9 = await axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=75bab62db333c0838ccdcb3bcf8dd21c&photo_id=${groupPhotos.photo[8].id}&secret=${groupPhotos.photo[8].secret}&format=json&nojsoncallback=1`)
        const p10 = await axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=75bab62db333c0838ccdcb3bcf8dd21c&photo_id=${groupPhotos.photo[9].id}&secret=${groupPhotos.photo[9].secret}&format=json&nojsoncallback=1`)
        const p11 = await axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=75bab62db333c0838ccdcb3bcf8dd21c&photo_id=${groupPhotos.photo[10].id}&secret=${groupPhotos.photo[10].secret}&format=json&nojsoncallback=1`)
        const p12 = await axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=75bab62db333c0838ccdcb3bcf8dd21c&photo_id=${groupPhotos.photo[11].id}&secret=${groupPhotos.photo[11].secret}&format=json&nojsoncallback=1`)
        const p13 = await axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=75bab62db333c0838ccdcb3bcf8dd21c&photo_id=${groupPhotos.photo[12].id}&secret=${groupPhotos.photo[12].secret}&format=json&nojsoncallback=1`)
        const p14 = await axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=75bab62db333c0838ccdcb3bcf8dd21c&photo_id=${groupPhotos.photo[13].id}&secret=${groupPhotos.photo[13].secret}&format=json&nojsoncallback=1`)
        const p15 = await axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=75bab62db333c0838ccdcb3bcf8dd21c&photo_id=${groupPhotos.photo[14].id}&secret=${groupPhotos.photo[14].secret}&format=json&nojsoncallback=1`)
        const p16 = await axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=75bab62db333c0838ccdcb3bcf8dd21c&photo_id=${groupPhotos.photo[15].id}&secret=${groupPhotos.photo[15].secret}&format=json&nojsoncallback=1`)
        const p17 = await axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=75bab62db333c0838ccdcb3bcf8dd21c&photo_id=${groupPhotos.photo[16].id}&secret=${groupPhotos.photo[16].secret}&format=json&nojsoncallback=1`)
        const p18 = await axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=75bab62db333c0838ccdcb3bcf8dd21c&photo_id=${groupPhotos.photo[17].id}&secret=${groupPhotos.photo[17].secret}&format=json&nojsoncallback=1`)
        const p19 = await axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=75bab62db333c0838ccdcb3bcf8dd21c&photo_id=${groupPhotos.photo[18].id}&secret=${groupPhotos.photo[18].secret}&format=json&nojsoncallback=1`)
        const p20 = await axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=75bab62db333c0838ccdcb3bcf8dd21c&photo_id=${groupPhotos.photo[19].id}&secret=${groupPhotos.photo[19].secret}&format=json&nojsoncallback=1`)
        return Promise.all([p1.data,p2.data,p3.data,p4.data,p5.data,p6.data,p7.data,p8.data,p9.data,p10.data,p11.data,p12.data,p13.data,p14.data,p15.data,p16.data,p17.data,p18.data,p19.data,p20.data])
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

              
                                
                <div key={pic.photo.id} onClick= {()=>{props.history.push(`/overview/${props.match.params.id}_${pic.photo.id}`)}} style={{ background:'white',padding:'0px',maxHeight:'500px',height:'auto'}} >
                                        
                   
                    <div style={{width:'100%'}}>
                      <div  className="filler" >
                      <LazyLoad loaderImage={true} originalSrc={`https://farm${pic.photo.farm}.staticflickr.com/${pic.photo.server}/${pic.photo.id}_${pic.photo.secret}.jpg`} imageProps={{
                        src: require('../src/logo.svg') ,
                        ref: "image",
                        className: "filler",
                        width:"100%",
                        maxHeight:'500px'
                        }} />

                        <div style={{height:'auto',width:'100%',background:'white'}}>
                        <div style={{height:'50px',overflow:'auto',display:'flex',padding:'0 20px 0 20px'}}>
                        <div style={{margin:'auto'}}>Title:&nbsp;&nbsp;{pic.photo.title._content}</div>
                        </div>
                        <div style={{height:'50px',overflow:'auto',display:'flex',padding:'0 20px 0 20px'}}>
                        <div style={{margin:'auto'}}>
                        Owner:&nbsp;&nbsp;{pic.photo.owner.realname}
                        </div>
                        </div>
                        <div style={{height:'50px',overflow:'auto',display:'flex',padding:'0 20px 0 20px'}}>
                        <div style={{margin:'auto'}}>
                        Comments:&nbsp;&nbsp;{pic.photo.comments._content}</div>
                        </div>
                        <div style={{height:'50px',overflow:'auto',display:'flex',padding:'0 20px 0 20px'}}>
                        <div style={{margin:'auto'}}>
                        Views:&nbsp;&nbsp;{pic.photo.views}
                        </div>
                        </div>
                        <div style={{height:'50px',overflow:'auto',display:'flex',padding:'0 20px 0 20px'}}>
                        <div style={{margin:'auto'}}>
                        Taken on:&nbsp;&nbsp;{pic.photo.dates.taken.split(" ")[0]}</div>
                        </div>
                        <div style={{display:'flex'}}>
                        <div style={{margin:'auto'}}> Description
                        </div>
                        </div>
                        <div className="desc"  style={{height:'100px',overflow:'auto',display:'flex',padding:'0 20px 0 20px'}}>
                       
                        <div style={{margin:'auto'}}>
                        {pic.photo.description._content.length>0? pic.photo.description._content : "No Description"}</div>
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