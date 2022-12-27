import React from 'react'
import MyButton from "../button/MyButton";
import { AiOutlineHeart } from 'react-icons/ai';
import { IoMdNotificationsOutline } from 'react-icons/io';
import axiosClient from '../../api/axiosClient';
import { useQuery } from '@tanstack/react-query';

export default function ListButtonContact({id}) {
    const fetchLike = async() => {
        const res = await axiosClient.get(`/view/fetchLike/${id}`)
        return res.data
    }
    const {data,isLoading} = useQuery([id],fetchLike)
    const increaseLike = async() => {
        const res = await axiosClient.post(`/view/increaseLike/${id}`)
        console.log(res);
      }
  return (
    <div style={{display : 'flex' , gap : '20px' , padding: '20px 100px'}}>
    <MyButton onClick={increaseLike} style={{background : '#C4535E'}}>
       <span><AiOutlineHeart/> Thích ({isLoading ? "Loading..." : data.CountLike})</span>
     </MyButton>
     <MyButton style={{background : '#406F6A'}}>
       <span><IoMdNotificationsOutline/> Theo dõi </span>
     </MyButton>
    </div>
  )
}
