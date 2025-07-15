"use client";

import { useState } from "react";
import { useVoiceAgent } from "@/hooks/use-voice-agent";
import { Button } from "@/components/ui/button";
import { LessonDynamicVariables } from "@/types";

interface VoiceAgentPanelProps {
  dynamicVariables: LessonDynamicVariables;
}

export default function VoiceAgentPanel({
  dynamicVariables,
}: VoiceAgentPanelProps) {
  const {
    status,
    isSpeaking,
    isConnecting,
    error,
    conversationId,
    connect,
    disconnect,
    setVolume,
  } = useVoiceAgent();

  const [volume, setVolumeState] = useState(0.5);

  const handleConnect = async () => {
    try {
      await connect("agent_01jzqqwk8qey2bfr490d0dfk9h", {
        userName: dynamicVariables.userName,
        age: dynamicVariables.age,
        sex: dynamicVariables.sex,
        learningLanguage: dynamicVariables.learningLanguage,
        languageLevel: dynamicVariables.languageLevel,
        learningGoals: dynamicVariables.learningGoals,
        tutorStyle: dynamicVariables.tutorStyle,
        feedbackStyle: dynamicVariables.feedbackStyle,
        interests: dynamicVariables.interests,
        lessonTitle: dynamicVariables.lessonTitle,
        lessonDescription: dynamicVariables.lessonDescription,
        lessonCategory: dynamicVariables.lessonCategory,
        lessonDifficulty: dynamicVariables.lessonDifficulty,
        lessonSlides: dynamicVariables.lessonSlides,
      });
    } catch (err) {
      console.error("Failed to connect:", err);
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnect();
    } catch (err) {
      console.error("Failed to disconnect:", err);
    }
  };

  const handleVolumeChange = async (newVolume: number) => {
    setVolumeState(newVolume);
    try {
      await setVolume(newVolume);
    } catch (err) {
      console.error("Failed to set volume:", err);
    }
  };

  const isConnected = status === "connected";

  return (
    <div className="p-4 h-full flex flex-col">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">AI 음성 어시스턴트</h3>

        {/* 연결 상태 */}
        <div className="mb-3">
          <div className="flex items-center gap-2 mb-1">
            <div
              className={`w-2 h-2 rounded-full ${
                isConnected
                  ? "bg-green-500"
                  : isConnecting
                    ? "bg-yellow-500"
                    : "bg-gray-400"
              }`}
            />
            <span className="text-sm font-medium">
              {isConnecting
                ? "연결 중..."
                : isConnected
                  ? "연결됨"
                  : "연결 안됨"}
            </span>
          </div>

          {conversationId && (
            <p className="text-xs text-gray-500">
              대화 ID: {conversationId.slice(-8)}
            </p>
          )}
        </div>

        {/* 에러 메시지 */}
        {error && (
          <div className="mb-3 p-2 bg-red-100 border border-red-200 rounded text-sm text-red-700">
            {error}
          </div>
        )}

        {/* 연결/연결 해제 버튼 */}
        <div className="mb-4">
          {!isConnected ? (
            <Button
              onClick={handleConnect}
              disabled={isConnecting}
              className="w-full"
            >
              {isConnecting ? "연결 중..." : "AI와 대화 시작"}
            </Button>
          ) : (
            <Button
              onClick={handleDisconnect}
              variant="destructive"
              className="w-full"
            >
              대화 종료
            </Button>
          )}
        </div>

        {/* 볼륨 조절 */}
        {isConnected && (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              음성 볼륨: {Math.round(volume * 100)}%
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
        )}

        {/* 말하고 있는 상태 표시 */}
        {isConnected && (
          <div className="mb-4">
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  isSpeaking ? "bg-blue-500 animate-pulse" : "bg-gray-300"
                }`}
              />
              <span className="text-sm">
                {isSpeaking ? "AI가 말하고 있습니다..." : "듣고 있습니다"}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* 사용법 안내 */}
      <div className="flex-1 flex flex-col justify-center text-center text-gray-600">
        {!isConnected ? (
          <div>
            <p className="text-sm mb-2">
              AI 어시스턴트와 음성으로 대화할 수 있습니다.
            </p>
            <p className="text-xs text-gray-500">마이크 권한이 필요합니다.</p>
          </div>
        ) : (
          <div>
            <p className="text-sm mb-2">이제 AI와 대화해보세요!</p>
            <p className="text-xs text-gray-500">
              자유롭게 말씀하시면 AI가 응답합니다.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
