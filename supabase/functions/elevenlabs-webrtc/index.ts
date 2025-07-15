// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

// CORS 헤더 설정
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
};

console.log("ElevenLabs WebRTC Token Function started!");

Deno.serve(async (req) => {
  // CORS preflight 요청 처리
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  // GET 요청으로 환경 변수 상태 확인 (테스트용)
  if (req.method === "GET") {
    // @ts-ignore Deno는 Edge Runtime에서 사용 가능
    const apiKey = Deno.env.get("ELEVENLABS_API_KEY");

    console.log(`[DEBUG] API Key exists: ${!!apiKey}`);

    return new Response(
      JSON.stringify({
        success: true,
        hasApiKey: !!apiKey,
        apiKeyLength: apiKey?.length || 0,
        apiKeyPrefix: apiKey?.substring(0, 3) || "none",
        timestamp: new Date().toISOString(),
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }

  try {
    // POST 요청만 허용
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 요청 본문 파싱
    let body: any = {};
    try {
      body = await req.json();
    } catch (error) {
      return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { agent_id } = body;
    const defaultAgentId = agent_id || "agent_01jzqqwk8qey2bfr490d0dfk9h";

    // ElevenLabs API 키 확인
    // @ts-ignore Deno는 Edge Runtime에서 사용 가능
    const apiKey = Deno.env.get("ELEVENLABS_API_KEY");

    console.log(`[DEBUG] API Key exists: ${!!apiKey}`);
    console.log(`[DEBUG] API Key length: ${apiKey?.length || 0}`);
    console.log(`[DEBUG] Agent ID: ${defaultAgentId}`);

    if (!apiKey) {
      console.error(
        "[ERROR] ELEVENLABS_API_KEY environment variable is not set"
      );
      throw new Error(
        "ELEVENLABS_API_KEY environment variable is not set. Please check your Supabase environment variables."
      );
    }

    // ElevenLabs WebRTC 토큰 받아오기
    const url = `https://api.elevenlabs.io/v1/convai/conversation/token?agent_id=${defaultAgentId}`;
    console.log(`[DEBUG] Requesting URL: ${url}`);

    const response = await fetch(url, {
      headers: {
        "xi-api-key": apiKey,
        "Content-Type": "application/json",
      },
    });

    console.log(`[DEBUG] Response status: ${response.status}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `[ERROR] ElevenLabs API error: ${response.status} ${response.statusText}`
      );
      console.error(`[ERROR] Error response body: ${errorText}`);

      // 401 에러의 경우 더 명확한 메시지 제공
      if (response.status === 401) {
        throw new Error(
          `Authentication failed: Invalid ElevenLabs API key. Please check your API key in Supabase environment variables. Error: ${errorText}`
        );
      }

      throw new Error(
        `ElevenLabs API error: ${response.status} ${response.statusText}. Details: ${errorText}`
      );
    }

    const responseData = await response.json();
    console.log(
      `[DEBUG] Success! Got token of length: ${responseData.token?.length || 0}`
    );

    // 성공 응답
    return new Response(
      JSON.stringify({
        success: true,
        token: responseData.token,
        agent_id: defaultAgentId,
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("[ERROR] Function error:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Internal server error";

    return new Response(
      JSON.stringify({
        success: false,
        error: errorMessage,
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});
