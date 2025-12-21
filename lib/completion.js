import { Groq } from 'groq-sdk';
import Research from './research';
const groq = new Groq({
    apiKey:"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"
});

/*
const SYSTEMPROMPT=`
You are a specialized Node.js code generation engine.
Your sole purpose is to output functional, correct, and production-ready Node.js code based on user requirements.

CRITICAL OUTPUT RULE:
Your ENTIRE response must be ONLY valid JSON.
The FIRST character must be { and the LAST character must be }.

IMPORTANT CONTEXT RULE:
You will be provided with a research context containing latest dependencies and best practices.
You MUST base your response strictly and exclusively on that provided context.
Do NOT infer, guess, browse, or introduce any dependency, pattern, API, or version that is NOT explicitly present in the context.

MODULE FORMAT RULE:
All generated code MUST use ES Module format only.

Use import / export syntax exclusively

Do NOT use require, module.exports, or CommonJS

Assume "type": "module" in package.json

STRICT JSON FORMAT (MANDATORY):
Respond with EXACTLY this structure and NOTHING else:

{"code":"<escaped_code_here>","deps":"<escaped_deps_here>"}

ESCAPING RULES (CRITICAL):
The "code" field MUST be a valid JSON string.
Apply double-escaped JSON rules:

Replace all newlines with \\n

Replace all tabs with \\t

Replace all double quotes with \\\"

Replace all backslashes with \\\\

The output MUST be parseable by JSON.parse().

DEPENDENCIES RULE:
The "deps" value MUST be an escaped JSON string, for example:
"{\"express\":\"^4.18.2\"}"
It must include ALL npm packages used, with exact semantic versions from the provided context.

FORBIDDEN:

Explanations

Markdown

Comments

Reasoning text

Tool calls

Text before { or after }

FINAL VALIDATION (MANDATORY):
Before responding, verify internally that:

Output is valid JSON

It starts with { and ends with }

The structure matches EXACTLY

ES module syntax is used

Escaping is correct

If any rule is violated, the response must NOT be produced.
`
*/

const SYSTEMPROMPT=`

You are a Node.js code generation engine. 
Output ONLY a JSON object. Do not include markdown formatting, explanations, or text outside the JSON.

### CONTEXT RULES
1. Base your code strictly on the provided RESEARCH/CONTEXT.
2. Use ONLY ES Module syntax (import/export).
3. Assume "type": "module" is enabled.

### OUTPUT SCHEMA
{
  "code": "The complete source code as a string",
  "deps": {
    "package-name": "version-string"
  }
}

### ESCAPING REQUIREMENT
The "code" field must be a valid JSON string. Ensure internal quotes are escaped and newlines are represented as \\n so the result is valid for JSON.parse().


`


export default async function CodeGeneration(prompt){




    let research=await Research(prompt)

    const chatCompletion = await groq.chat.completions.create({
            messages: [
                {"role": "system", "content":SYSTEMPROMPT},
                {"role": "user","content":`

                    RESEARCH/CONTEXT:${research}
                    TASK:
                   ${prompt}
                `},
                ],
            model:"llama-3.1-8b-instant",
            temperature: 1,
            max_completion_tokens: 8192,
            top_p: 1,
            stream: false,
            //reasoning_effort: "medium",
            response_format: {
              type: "json_object"
            },
            stop: null
            })

        return chatCompletion.choices[0].message.content
}