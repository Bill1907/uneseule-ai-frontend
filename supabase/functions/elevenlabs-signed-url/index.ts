// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

// Declare Deno global for TypeScript
declare const Deno: {
  env: {
    get(key: string): string | undefined;
  };
  serve: (handler: (req: Request) => Promise<Response> | Response) => void;
};

console.log("ElevenLabs Signed URL Function loaded");

Deno.serve(async (req) => {
  // CORS headers
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type",
  };

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Get environment variables
    const agentId = "agent_01jzqqwk8qey2bfr490d0dfk9h";
    const elevenlabsApiKey = Deno.env.get("ELEVENLABS_API_KEY");

    if (!agentId || !elevenlabsApiKey) {
      return new Response(
        JSON.stringify({ error: "Missing required environment variables" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Optional: Add authentication check here
    // const authHeader = req.headers.get('Authorization')
    // if (!authHeader) {
    //   return new Response(
    //     JSON.stringify({ error: 'Authorization required' }),
    //     { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    //   )
    // }

    // Request signed URL from ElevenLabs
    const response = await fetch(
      `https://api.elevenlabs.io/v1/convai/conversation/get-signed-url?agent_id=${agentId}`,
      {
        headers: {
          // Requesting a signed url requires your ElevenLabs API key
          // Do NOT expose your API key to the client!
          "xi-api-key": elevenlabsApiKey,
        },
      }
    );

    if (!response.ok) {
      console.error(
        "ElevenLabs API error:",
        response.status,
        response.statusText
      );
      return new Response(
        JSON.stringify({ error: "Failed to get signed URL" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const body = await response.json();

    return new Response(JSON.stringify({ signed_url: body.signed_url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in elevenlabs-signed-url function:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/elevenlabs-signed-url' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json'

*/
