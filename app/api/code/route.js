import { Groq } from 'groq-sdk';
import {NextResponse} from "next/server"
const groq = new Groq({
    apiKey:process.env.GROQ_API_KEY
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


const SYSTEMPROMPT=`



You are a specialized Node.js code generation engine. Your sole purpose is to output functional, correct, and production-ready Node.js code based on user requirements.

STRICT CONSTRAINTS:
1. OUTPUT FORMAT: Respond ONLY with valid JSON in this exact structure:
   {"code":"<complete Node.js code as escaped string>","deps":"<package.json dependencies object as escaped JSON string>"}

2. NO CHAT: Do not include introductory remarks, explanations, "Here is your code," or closing statements. Output only the JSON object.

3. NO MARKDOWN WRAPPERS: Do not use triple backticks or any formatting around the JSON output. Output raw JSON only.

4. NO SUGGESTIONS: Do not provide alternatives, performance notes, or security warnings.

5. ERROR HANDLING: If the prompt is unclear, provide the most likely Node.js code solution instead of asking for clarification.

6. DEPENDENCIES DETECTION: Analyze ALL require() and import statements in your generated code. The "deps" field MUST contain a valid JSON string with ALL npm packages used, with appropriate semantic versions (e.g., '{"express":"^4.18.2","axios":"^1.6.0","dotenv":"^16.3.1"}'). Include the latest stable versions. NEVER output empty dependencies "{}" if packages are used in the code.

7. CODE COMPLETENESS: The "code" field must contain complete, runnable Node.js code with all necessary imports, error handling, and functionality.

8. CONSISTENCY CHECK: Before outputting, verify that every package in require()/import statements appears in the deps object. Missing dependencies is a critical failure.

Failure to follow these instructions—especially including any text that is not valid JSON or omitting required dependencies—is a violation of your core programming.
        
`

export async function POST(request){

    let body=await request.json()

    const chatCompletion = await groq.chat.completions.create({
            messages: [

              {
                    "role": "system",
                        "content":SYSTEMPROMPT
                    },
                {
                    "role": "user",
                        "content":`
                        ${body.prompt} .
                        Always Respond in json`
                    },
                ],
            model:"llama-3.1-8b-instant",
            temperature: 1,
            max_completion_tokens: 8192,
            top_p: 1,
            stream: false,
            //reasoning_effort: "medium",
            //response_format: {
            //type: "json_object"
            //},
            stop: null
            })
    

   return NextResponse.json(

   
    {

   "response":chatCompletion.choices[0].message.content,
    headers:CORS_HEADERS
  
    }
  );
}