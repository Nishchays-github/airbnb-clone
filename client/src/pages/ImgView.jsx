import React from 'react'

const ImgView = ({place,index=0,className=null}) => {
    if(!place.photos?.length){
        return '';
    }
if(className) className ='object-cover';
  return ( 
    <img className={className} src= {`http://localhost:4000/uploads/${place.photos}`} alt="none"/>
    
  )
}

export default ImgView
