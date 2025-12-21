import { provideClient } from "../../../../lib/dbconnection.js"
import { NextRequest, NextResponse } from 'next/server';
import { PinataSDK, uploadBase64 } from "pinata";

const client=provideClient()
const db = client.db("ihub_db");
const coll = db.collection("ihub_col");

const pinata = new PinataSDK(
    {
    pinataJwt:process.env.NEXT_PUBLIC_PJWT,
    pinataGateway:process.env.NEXT_PUBLIC_PGATE
});



const CORS_HEADERS={
  
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,OPTIONS',
    'Access-Control-Allow-Headers': '*', 
    'Access-Control-Allow-Credentials': 'false', 
};


export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: CORS_HEADERS
  });
}



export async function  POST(request) {

    let body=await request.json()
    let wallet=body.wallet
    let foldername=body.foldername

    let uploads=[]

    let blob = new Blob([`### Repository:${foldername}`], { type: "text/plain" });
    let file = new File([blob], "README.md", { type: "text/plain" });
    
    const upload=await pinata.upload.public.file(file)
    uploads.push(upload)
    
    let meta={"id":wallet,"folder":foldername,"uploads":uploads,"is_latest":true}

    try {

    await coll.findOneAndUpdate(
            {"owner":"system"},
            {
            $push: {
            manifests: meta
            }})

    return NextResponse.json(
        {"status_":true},
        {headers:CORS_HEADERS}
    )

    }catch(e){
         return NextResponse.json(
        {"status_":false},
        {headers:CORS_HEADERS}
        )


    }



}