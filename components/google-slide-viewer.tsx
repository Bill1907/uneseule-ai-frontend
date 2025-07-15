import React from "react";

const GoogleSlideViewer = ({
  presentationId,
  slideId,
}: {
  presentationId: string;
  slideId?: string;
}) => {
  // 기본 Embed URL. 필요에 따라 매개변수를 추가/수정합니다.
  // start=false: 자동 재생 안함
  // loop=false: 반복 재생 안함
  // delayms=3000: 각 슬라이드 3초 전환 (자동 재생 시 유효)
  let embedUrl = `https://docs.google.com/presentation/d/${presentationId}/embed?start=false&loop=false&delayms=3000`;

  // 특정 슬라이드부터 시작하고 싶다면 URL에 추가합니다.
  if (slideId) {
    embedUrl += `&slide=${slideId}`;
  }

  // iframe 스타일 (선택 사항): 필요에 따라 너비, 높이, 테두리 등을 조절합니다.
  const iframeStyle = {
    width: "100%", // 부모 컨테이너에 맞게 너비 조절
    height: "600px", // 원하는 높이 설정
    border: "none", // 테두리 없음
    allowFullScreen: true, // 전체 화면 모드 허용
    mozallowfullscreen: true, // Firefox용
    webkitallowfullscreen: true, // Chrome/Safari용
  };

  return (
    <div
      style={
        {
          /* 여기에 부모 컨테이너 스타일을 추가할 수 있습니다 */
        }
      }
    >
      <iframe
        src={embedUrl}
        style={iframeStyle}
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default GoogleSlideViewer;
