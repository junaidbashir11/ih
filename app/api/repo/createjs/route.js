import { provideClient } from "../../../../lib/dbconnection.js";
import CodeGeneration from "../../../../lib/completion.js";
import { NextResponse } from 'next/server';
import { PinataSDK } from "pinata";


const pinata = new PinataSDK({
   
    pinataJwt:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIxY2UxYThmMC1hMDQ3LTQ0YjEtYWU2Yy02MGUwMTMwYTMzODUiLCJlbWFpbCI6ImFydGljdmF1bHQwMEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJGUkExIn0seyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJOWUMxIn1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiNTBhMzQ2OGI1YWU2MDgwMWE2NjYiLCJzY29wZWRLZXlTZWNyZXQiOiJhOTQ3YzgwNDIwNjk4MzljYjM5M2M5OTZkZDI3M2MzNWVhNWZmMDY5Y2UwMGNiMmE3NzQwYWMwOTZmYTJiZmM1IiwiZXhwIjoxNzk2ODMyMDcxfQ.gGWPJph2vqrEKhTtJdSo5cg1Btix7TpRM2tt2jBYXlY",
    pinataGateway:"coral-petite-bandicoot-821.mypinata.cloud",
});



function parseAIResponse(codeobj) {
  try {
    // First attempt: direct parse
    return JSON.parse(codeobj);
  } catch (e) {
    console.error('Initial parse failed:', e.message);
    
    // Second attempt: extract JSON from response
    try {
      // Find first { and last }
      const firstBrace = codeobj.indexOf('{');
      const lastBrace = codeobj.lastIndexOf('}');
      
      if (firstBrace === -1 || lastBrace === -1) {
        throw new Error('No JSON object found in response');
      }
      
      const jsonStr = codeobj.substring(firstBrace, lastBrace + 1);
      //console.log(jsonStr)
      return JSON.parse(jsonStr);
      
      
    } catch (e2) {
      console.error('Extraction failed:', e2.message);
      console.error('Raw response:', codeobj);
      
      throw new Error('Could not parse AI response as JSON');
    }
  }
}



const CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
    return new Response(null, { status: 200, headers: CORS_HEADERS });
}





export async function POST(request) {
    try {
        const body = await request.json();
        const { wallet, foldername ,prompt } = body;
        console.log(wallet,foldername,prompt)
        
        if (!wallet || !foldername || !prompt) {
            return NextResponse.json(
                { error: "Missing wallet or foldername" }, 
                { status: 400, headers: CORS_HEADERS }
            );
        }
        const readmeContent = `### Repository: ${foldername}`;

        let codeobj=await CodeGeneration(prompt)
      
       
        let codeJSON=parseAIResponse(codeobj);
        console.log(codeJSON)

        
        const pkgJsonContent = JSON.stringify({
            name: foldername.toLowerCase().replace(/\s+/g, '-'),
            version: "1.0.0",
            type: "module",
            scripts: { test: "echo \"No test specified\"" },
            dependencies:codeJSON.deps
        }, null, 2);

        const indexJsContent =codeJSON.code
       

        const files = [
            new File([readmeContent], "README.md", { type: "text/plain" }),
            new File([pkgJsonContent], "package.json", { type: "application/json" }),
            new File([indexJsContent], "index.js", { type: "text/javascript" })
        ];

      
        const uploadPromises = files.map(file => pinata.upload.public.file(file));
        const uploadResults = await Promise.all(uploadPromises);

        const client = provideClient();
        const db = client.db("ihub_db");
        const coll = db.collection("ihub_col");

        const meta = {
            id: wallet,
            folder: foldername,
            uploads: uploadResults,
            is_latest: true,
            createdAt: new Date(),

        };

        const dbResult = await coll.findOneAndUpdate(
            { "owner": "system" },
            { $push: { manifests: meta } },
            //{ returnDocument: 'after' }
        );

        return NextResponse.json(
            { success: true},
            { status: 200, headers: CORS_HEADERS }
        );

    } catch (error) {
        console.error("Upload Error:", error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500, headers: CORS_HEADERS }
        );
    }
}