import express from 'express';


import dotenv from 'dotenv'
dotenv.config()

export const fetchGoogleClientId=(req,res)=>{
    const client={
        id:process.env.GOOGLE_CLIENT_ID,
    }
    console.log(client.id)
    res.json(client)
}