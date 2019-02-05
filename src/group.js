// i have use React HOOKS for this app no class components are being used
// NOTE:xxxxxxxxxxxxxxxxx--------------xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// I am not able to get the Image src for the group icon 
// as the mentioned method in the API documentation doesn't work for group icon images

import React,{useState,useEffect} from 'react'
import axios from 'axios'
import Loader from 'react-loader-spinner'
import { Header,  Table } from 'semantic-ui-react'
import  { withRouter }  from 'react-router-dom'

const group = (props) => {
    var counter =1;
    const [grp,setGrp] = useState();
    const [grpArr,setGrpArr] = useState([]);
    const [grpPhoto,setGrpPhoto] = useState([]);
    const [ load ,setLoad] = useState(false)
    let nsid = []
    sessionStorage.removeItem('photos');
   const groupHandler = (e) => {
   
       e.preventDefault()
    executionfun(1);    
    }

    useEffect(()=>{

        if( JSON.parse(sessionStorage.getItem("grpArr")) && JSON.parse(sessionStorage.getItem("grpPhoto")) && JSON.parse(sessionStorage.getItem("grpArr")).length>0 && JSON.parse(sessionStorage.getItem("grpPhoto")).length>0  )
        {
            setGrpArr(JSON.parse(sessionStorage.getItem("grpArr"))) 
            setGrpPhoto(JSON.parse(sessionStorage.getItem("grpPhoto"))) 
            
            return;
        }
    },[])
//API call for receiving the group id
    const executionfun = (v) => {
        setLoad(true);
        setGrpPhoto([])
        axios.get(`https://api.flickr.com/services/rest/?method=flickr.groups.search&api_key=75bab62db333c0838ccdcb3bcf8dd21c&text=${grp}&format=json&nojsoncallback=1&per_page=20&page=${v}`)
        .then(
            (res)=>{

                    sessionStorage.setItem("grpArr",JSON.stringify(res.data.groups.group))
                    setGrpArr(res.data.groups.group); //group list
                    for(let i = 0;i<res.data.groups.group.length;i++){
                        nsid.push(res.data.groups.group[i].nsid);
                    }
                    return images()
                }
        )
        .then((res)=>{
                        sessionStorage.setItem("grpPhoto",JSON.stringify(res))
                        setGrpPhoto(res)//photo list
                        setLoad(false)
        })
 //with each group id i am hitting the API to get the photos associated with each group to be displayed    
        async function images() {
         const p1  = await axios.get(`https://api.flickr.com/services/rest/?method=flickr.groups.pools.getPhotos&api_key=75bab62db333c0838ccdcb3bcf8dd21c&group_id=${nsid[0]}&per_page=8&format=json&nojsoncallback=1`)
         const p2  = await axios.get(`https://api.flickr.com/services/rest/?method=flickr.groups.pools.getPhotos&api_key=75bab62db333c0838ccdcb3bcf8dd21c&group_id=${nsid[1]}&per_page=8&format=json&nojsoncallback=1`)
         const p3  = await axios.get(`https://api.flickr.com/services/rest/?method=flickr.groups.pools.getPhotos&api_key=75bab62db333c0838ccdcb3bcf8dd21c&group_id=${nsid[2]}&per_page=8&format=json&nojsoncallback=1`)
         const p4  = await axios.get(`https://api.flickr.com/services/rest/?method=flickr.groups.pools.getPhotos&api_key=75bab62db333c0838ccdcb3bcf8dd21c&group_id=${nsid[3]}&per_page=8&format=json&nojsoncallback=1`)
         const p5  = await axios.get(`https://api.flickr.com/services/rest/?method=flickr.groups.pools.getPhotos&api_key=75bab62db333c0838ccdcb3bcf8dd21c&group_id=${nsid[4]}&per_page=8&format=json&nojsoncallback=1`)
         const p6  = await axios.get(`https://api.flickr.com/services/rest/?method=flickr.groups.pools.getPhotos&api_key=75bab62db333c0838ccdcb3bcf8dd21c&group_id=${nsid[5]}&per_page=8&format=json&nojsoncallback=1`)
         const p7  = await axios.get(`https://api.flickr.com/services/rest/?method=flickr.groups.pools.getPhotos&api_key=75bab62db333c0838ccdcb3bcf8dd21c&group_id=${nsid[6]}&per_page=8&format=json&nojsoncallback=1`)
         const p8  = await axios.get(`https://api.flickr.com/services/rest/?method=flickr.groups.pools.getPhotos&api_key=75bab62db333c0838ccdcb3bcf8dd21c&group_id=${nsid[7]}&per_page=8&format=json&nojsoncallback=1`)
         const p9  = await axios.get(`https://api.flickr.com/services/rest/?method=flickr.groups.pools.getPhotos&api_key=75bab62db333c0838ccdcb3bcf8dd21c&group_id=${nsid[8]}&per_page=8&format=json&nojsoncallback=1`)
         const p10  = await axios.get(`https://api.flickr.com/services/rest/?method=flickr.groups.pools.getPhotos&api_key=75bab62db333c0838ccdcb3bcf8dd21c&group_id=${nsid[9]}&per_page=8&format=json&nojsoncallback=1`)
         const p11  = await axios.get(`https://api.flickr.com/services/rest/?method=flickr.groups.pools.getPhotos&api_key=75bab62db333c0838ccdcb3bcf8dd21c&group_id=${nsid[10]}&per_page=8&format=json&nojsoncallback=1`)
         const p12  = await axios.get(`https://api.flickr.com/services/rest/?method=flickr.groups.pools.getPhotos&api_key=75bab62db333c0838ccdcb3bcf8dd21c&group_id=${nsid[11]}&per_page=8&format=json&nojsoncallback=1`)
         const p13  = await axios.get(`https://api.flickr.com/services/rest/?method=flickr.groups.pools.getPhotos&api_key=75bab62db333c0838ccdcb3bcf8dd21c&group_id=${nsid[12]}&per_page=8&format=json&nojsoncallback=1`)
         const p14  = await axios.get(`https://api.flickr.com/services/rest/?method=flickr.groups.pools.getPhotos&api_key=75bab62db333c0838ccdcb3bcf8dd21c&group_id=${nsid[13]}&per_page=8&format=json&nojsoncallback=1`)
         const p15  = await axios.get(`https://api.flickr.com/services/rest/?method=flickr.groups.pools.getPhotos&api_key=75bab62db333c0838ccdcb3bcf8dd21c&group_id=${nsid[14]}&per_page=8&format=json&nojsoncallback=1`)
         const p16  = await axios.get(`https://api.flickr.com/services/rest/?method=flickr.groups.pools.getPhotos&api_key=75bab62db333c0838ccdcb3bcf8dd21c&group_id=${nsid[15]}&per_page=8&format=json&nojsoncallback=1`)
         const p17  = await axios.get(`https://api.flickr.com/services/rest/?method=flickr.groups.pools.getPhotos&api_key=75bab62db333c0838ccdcb3bcf8dd21c&group_id=${nsid[16]}&per_page=8&format=json&nojsoncallback=1`)
         const p18  = await axios.get(`https://api.flickr.com/services/rest/?method=flickr.groups.pools.getPhotos&api_key=75bab62db333c0838ccdcb3bcf8dd21c&group_id=${nsid[17]}&per_page=8&format=json&nojsoncallback=1`)
         const p19  = await axios.get(`https://api.flickr.com/services/rest/?method=flickr.groups.pools.getPhotos&api_key=75bab62db333c0838ccdcb3bcf8dd21c&group_id=${nsid[18]}&per_page=8&format=json&nojsoncallback=1`)
         const p20  = await axios.get(`https://api.flickr.com/services/rest/?method=flickr.groups.pools.getPhotos&api_key=75bab62db333c0838ccdcb3bcf8dd21c&group_id=${nsid[19]}&per_page=8&format=json&nojsoncallback=1`)

         return Promise.all([p1.data,p2.data,p3.data,p4.data,p5.data,p6.data,p7.data,p8.data,p9.data,p10.data,p11.data,p12.data,p13.data,p14.data,p15.data,p16.data,p17.data,p18.data,p19.data,p20.data])
        }

    }
    const handlePrev = (v) => {
       
        console.log('juygsad',v)
        executionfun(v);
    }
    const handleNext = (v) => {
        console.log("sdcuysdc",v)
        executionfun(v);
    }

return (
    <div  className = "container" >
  
            <form onSubmit = {groupHandler}>
                <div className="form-group">
                    <label for="exampleInputEmail1">Flicker Group Search</label>
                    <input
                    onChange = {(e)=>{setGrp(e.target.value)}}
                     type="text" 
                     className="form-control"
                      id="exampleInputEmail1"
                       placeholder="Group Name" />
                </div>
              
                <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                {load ? <div style={{display:'flex'}}><div style={{margin:'auto'}}> <Loader 
                    type="Bars"
                    color="#00BFFF"
                    height="100"	
                    width="100"
                />  </div> </div> : null}
          
          {grpPhoto.length > 0 ?
          <div>
              <div style={{display:'flex'}}>
                  <h1 style={{margin:'auto'}}> Chart</h1>
              </div>
             <Table basic='very' celled collapsing>
                    <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Groups</Table.HeaderCell>
                        <Table.HeaderCell>Photo Count</Table.HeaderCell>
                    </Table.Row>
                    </Table.Header>

                <Table.Body>
                
                            {grpArr.map((v)=>(
                                <Table.Row>
                                <Table.Cell>
                                <Header as='h4' >
                                
                                    <Header.Content>
                                    {v.name}
                                    </Header.Content>
                                </Header>
                                </Table.Cell>
                                <Table.Cell>{v.pool_count}</Table.Cell>
                            </Table.Row>
                                ))}

             </Table.Body>
            </Table> </div> : null}

            <div  className="row">
            { grpPhoto.length>0?   <div style={{display:'flex'}}>
                  <h1 style={{margin:'auto'}}> Cards</h1>
              </div> : null }
                { grpPhoto.length>0 && grpArr.map((group,i)=>(

                <div  onClick ={()=>{props.history.push(`gallery/${group.nsid}`)}} style={{padding:'20px'}}className="col-xs-12 col-md-6 col-lg-4">
                                
                        <div id="div" style={{borderRadius:'8px',padding:'30px',height:'500px',background:'white'}}>
                        <span style={{display:'inline-block',height:'50px',width:'50px',borderRadius:'50%',background:'black'}}></span>
                        <br />
                       Group Name : {group.name} <br />
                       Total Members:{group.members}
                        <div className="row">

                        {grpPhoto[i].photos? grpPhoto[i].photos.photo.map((val,itr)=>{
                            let src = `https://farm${val.farm}.staticflickr.com/${val.server}/${val.id}_${val.secret}.jpg`
                            return(
                                <div style={{padding:'5px'}}className="col-xs-3 col-md-3 col-lg-3" >
                              <div style={{borderRadius:'8px',padding:'10px',
                                backgroundImage:`url(${src})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                height:'150px'
                                }}>
                              
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