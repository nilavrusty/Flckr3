// PIE chart for comments might not contain 11 sections as some photos have 0 comments



import React,{useEffect,useState} from 'react'
import highcharts from 'highcharts'

const Overview = (props) => {
    const [load,setLoad] = useState(false)
    let groupPhotos = [];
    let viewPie =[];
    let commentPie = [];

    useEffect(()=>{
        console.log('photos',JSON.parse(sessionStorage.getItem('photos')))
            let photos = JSON.parse(sessionStorage.getItem('photos'))
                let n =0
                let view =0
                photos.forEach((v)=>{
                n+=Number(v.photo.comments._content) 
                view+=Number(v.photo.views) 
            })
            console.log(n,view)
            let n10 =0;
            let view10 =0;
            for(let i =0;i<10;i++){
                n10+=Number(photos[i].photo.comments._content) 
                view10+=Number(photos[i].photo.views) 
            }
           
            let commentsArr = [{name:"first 10 cummulative comments",y:n10}];
            let viewsArr = [{name:"first 10 cummulative views",y:view10}];
            for(let i=10;i<photos.length;i++){
                commentsArr.push({
                    name:photos[i].photo.title._content,
                    y:Number(photos[i].photo.comments._content)
                })
                viewsArr.push({
                    name:photos[i].photo.title._content,
                    y:Number(photos[i].photo.views)
                })
            }
           
            console.log('sdgyusidgsudgy',commentsArr,viewsArr)


            
            const colors = ["red","blue","yellow","violet"]

            highcharts.chart("views", {
                chart: {
                  type: "pie",
                  borderColor:  "",
                },
                title: {
                  text:"Views"
                },
          
                subtitle: {
                  text:"All labels are image title"
                },
          
                tooltip: {
                  valueSuffix: " millions",
                  pointFormat: "{series.name}:<b>{point.percentage:.1f}%</b>"
                },
                colors:colors,
                credits: {
                  enabled: false
                },
                plotOptions: {
                  series: {
                    dataLabels: {
                      enabled: true,
                      format: "<b>{point.name}</b>: {point.y}"
                    }
                }},
                series:
                [{
                    name: 'Views',
                    colorByPoint: true,
                    data: viewsArr
                }] 
            }  
        )

        highcharts.chart("comments", {
            chart: {
              type: "pie",
              borderColor:  "",
            },
            title: {
              text:"Comments"
            },
      
            subtitle: {
              text:"All labels are image title"
            },
      
            tooltip: {
              valueSuffix: " millions",
              pointFormat: "{series.name}:<b>{point.percentage:.1f}%</b>"
            },
            colors:colors,
            credits: {
              enabled: false
            },
            plotOptions: {
              series: {
                dataLabels: {
                  enabled: true,
                  format: "<b>{point.name}</b>: {point.y}"
                }
            }},
            series:
            [{
                name: 'Comments',
                colorByPoint: true,
                data: commentsArr
            }]  
        }
    )
    },[])
   
return (
    <div style={{display:'flex'}}>
     <div style={{margin:'auto'}}>
    <div id="views" ></div>
    <br/>
    <div id="comments"></div>
     </div>
    </div>
)
}
export default Overview;