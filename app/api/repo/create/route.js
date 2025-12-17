import { provideClient } from "../../../../lib/dbconnection.js"
import { NextRequest, NextResponse } from 'next/server';
import { PinataSDK, uploadBase64 } from "pinata";

const client=provideClient()
const db = client.db("ihub_db");
const coll = db.collection("ihub_col");

const pinata = new PinataSDK({

    pinataJwt:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIxY2UxYThmMC1hMDQ3LTQ0YjEtYWU2Yy02MGUwMTMwYTMzODUiLCJlbWFpbCI6ImFydGljdmF1bHQwMEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJGUkExIn0seyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJOWUMxIn1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiNTBhMzQ2OGI1YWU2MDgwMWE2NjYiLCJzY29wZWRLZXlTZWNyZXQiOiJhOTQ3YzgwNDIwNjk4MzljYjM5M2M5OTZkZDI3M2MzNWVhNWZmMDY5Y2UwMGNiMmE3NzQwYWMwOTZmYTJiZmM1IiwiZXhwIjoxNzk2ODMyMDcxfQ.gGWPJph2vqrEKhTtJdSo5cg1Btix7TpRM2tt2jBYXlY",
    pinataGateway:"coral-petite-bandicoot-821.mypinata.cloud",
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