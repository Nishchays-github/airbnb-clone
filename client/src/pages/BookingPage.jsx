import React, { useEffect, useState } from 'react'
import AccountNav from './AccountNav'
import axios from 'axios'
import ImgView from './ImgView';
const BookingPage = () => {
    const [bookings, setbookings] = useState();
    useEffect(()=>{
        axios.get('http://localhost:4000/bookings').then(res=>{
            setbookings(res.data);
        })
    },[bookings])
  return (
    <div>
        <AccountNav/>
    <div>
    </div>
    {
        bookings?.length>0 && bookings.map(booking=>(
            <div className='flex gap-4 bg-gray-200 rounded-2xl overflow-hidden'>
                <div className="w-48">
                    <ImgView place={booking.place}/>
                </div>
                    <div>
                        <h2 className='text-2xl'>{booking.place.title}</h2>
                    </div>
            </div>
        ))
    }
    </div>
  )
}

export default BookingPage
