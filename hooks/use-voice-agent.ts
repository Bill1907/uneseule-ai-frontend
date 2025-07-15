"use client";

import { useConversation } from "@elevenlabs/react";
import { supabase } from "@/lib/supabase"; // 기본 클라이언트 직접 import
import { useCallback, useState } from "react";
import { LessonDynamicVariables } from "@/types";

interface UseVoiceAgentReturn {
  // 상태
  status: string;
  isSpeaking: boolean;
  isConnecting: boolean;
  error: string | null;
  conversationId: string | null;

  // 제어 함수
  connect: (
    agentId?: string,
    dynamicVariables?: LessonDynamicVariables
  ) => Promise<void>;
  disconnect: () => Promise<void>;
  setVolume: (volume: number) => Promise<void>;
}

export const useVoiceAgent = (): UseVoiceAgentReturn => {
  // 기본 Supabase client 사용 (Clerk 인증 없음)
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [conversationId, setConversationId] = useState<string | null>(null);

  // ElevenLabs 공식 SDK 사용
  const conversation = useConversation({
    onConnect: () => {
      console.log("[VoiceAgent] Connected to ElevenLabs");
      setIsConnecting(false);
      setError(null);
    },
    onDisconnect: () => {
      console.log("[VoiceAgent] Disconnected from ElevenLabs");
      setConversationId(null);
    },
    onMessage: (message) => {
      console.log("[VoiceAgent] Message:", message);
    },
    onError: (error: any) => {
      console.error("[VoiceAgent] Error:", error);
      setError(error?.message || "Connection error");
      setIsConnecting(false);
    },
  });

  // signed url 받아오기
  const getSignedUrl = useCallback(async (agentId: string): Promise<string> => {
    try {
      const { data, error } = await supabase.functions.invoke(
        "elevenlabs-signed-url"
      );

      if (error) {
        console.error("[VoiceAgent] Supabase error:", error);
        throw new Error(error.message);
      }
      return data.signed_url;
    } catch (err) {
      console.error("[VoiceAgent] Failed to get signed url:", err);
      throw err;
    }
  }, []);

  // 연결 시작
  const connect = useCallback(
    async (
      agentId?: string,
      dynamicVariables?: LessonDynamicVariables
    ): Promise<void> => {
      try {
        setIsConnecting(true);
        setError(null);

        const defaultAgentId = agentId || "agent_01jzqqwk8qey2bfr490d0dfk9h";

        await navigator.mediaDevices.getUserMedia({ audio: true });

        // Conversation token 받아오기
        const signedUrl = await getSignedUrl(defaultAgentId);

        const newConversationId = await conversation.startSession({
          signedUrl,
          connectionType: "websocket",
          dynamicVariables: dynamicVariables || ({} as LessonDynamicVariables),
        });

        setConversationId(newConversationId);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Connection failed");
        setIsConnecting(false);
      }
    },
    [conversation, getSignedUrl]
  );

  // 연결 종료
  const disconnect = useCallback(async (): Promise<void> => {
    try {
      await conversation.endSession();
      setConversationId(null);
      setError(null);
    } catch (err) {
      console.error("[VoiceAgent] Failed to end session:", err);
    }
  }, [conversation]);

  // 볼륨 설정
  const setVolume = useCallback(
    async (volume: number): Promise<void> => {
      try {
        await conversation.setVolume({ volume });
      } catch (err) {
        console.error("[VoiceAgent] Failed to set volume:", err);
      }
    },
    [conversation]
  );

  return {
    // 상태
    status: conversation.status,
    isSpeaking: conversation.isSpeaking,
    isConnecting,
    error,
    conversationId,

    // 제어 함수
    connect,
    disconnect,
    setVolume,
  };
};
