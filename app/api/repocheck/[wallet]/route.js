import { provideClient } from "../../../../lib/dbconnection.js"
import { NextRequest, NextResponse } from 'next/server';


const client=provideClient()
const db = client.db("ihub_db");
const coll = db.collection("ihub_col");




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



export async function  GET(request,{params}) {

    let wallet=await params.wallet



    try {

    
    let presence=false
    let doc=await coll.findOne(
            {"owner":"system"})

    
    if(doc){
         let manifests=doc.manifests
         for(let obj of  manifests){
        

          if(obj.id==wallet){
            presence=true
              
           }
        }
    
    }

    return NextResponse.json(
        {"data":true},
        {headers:CORS_HEADERS}
    )

    }catch(e){
         return NextResponse.json(
        {"data":false},
        {headers:CORS_HEADERS}
        )


    }



}