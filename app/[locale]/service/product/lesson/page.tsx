import GoogleSlideViewer from "@/components/google-slide-viewer";
import VoiceAgentPanel from "@/components/voice-agent-panel";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getUserOnboarding } from "@/actions/onboarding";

export default async function LessonPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const user = await currentUser();

  if (!user) {
    redirect(`/${locale}/service/auth`);
  }

  const { data, error } = await getUserOnboarding(user.id);

  const sampleLessonInfo = {
    title: "Michelangelo_Sample",
    description:
      "This presentation covers the life of Michelangelo, his early works, famous masterpieces (Pietà, David, The Last Judgment, Sistine Chapel Ceiling), his use of symbolism, his inspirations for art, his impact on art, and discussion questions about art and the future of AI.",
    category: "Art, History, Education",
    difficulty: "Medium",
    slides: [
      {
        slide_number: 1,
        title: "Michelangelo",
        content: "Slide 1 of 18.",
      },
      {
        slide_number: 2,
        title: "Michelangelo",
        content:
          "Michelangelo di Lodovico Buonarroti Simoni was born on March 6, 1475, in Caprese, Italy. He is one of the most famous artists in history, a sculptor, painter, and architect. He died on February 18, 1564, at the age of 88, but his art continues to inspire people around the world.",
      },
      {
        slide_number: 3,
        title: "Michelangelo's Early Life",
        content:
          "As a child, Michelangelo loved to draw, and his talent was recognized at a young age. He began working with famous artists when he was a teenager. Throughout his life, he created many famous works of art that people still admire today.",
      },
      {
        slide_number: 4,
        title: "Michelangelo's Famous Works of Art",
        content:
          "Michelangelo's art shows deep emotion, power, and beauty. He worked on sculptures, paintings, and architectural structures.",
      },
      {
        slide_number: 5,
        title: "Pietà (1498-1499) & David (1501-1504)",
        content:
          "Pietà: A marble sculpture depicting the Virgin Mary holding the body of Jesus after his crucifixion. David: An amazing marble sculpture of the biblical hero David, symbolizing strength and courage.",
      },
      {
        slide_number: 6,
        title: "The Last Judgment (1536-1541)",
        content:
          "A massive fresco covering the altar wall of the Sistine Chapel, showing the final judgment of souls. Fresco is a technique of painting on wet plaster, where the paint becomes part of the wall as it dries.",
      },
      {
        slide_number: 7,
        title: "Sistine Chapel Ceiling (1508-1512)",
        content:
          "A series of breathtaking frescoes painted on the ceiling of the Sistine Chapel in Vatican City. The Sistine Chapel ceiling, painted by Michelangelo, depicts scenes from the Book of Genesis.",
      },
      {
        slide_number: 8,
        title: "Creation of Adam & Creation of Eve",
        content:
          "Creation of Adam: An iconic image of God giving life to Adam. Creation of Eve: The story of Eve's creation from Adam's rib.",
      },
      {
        slide_number: 9,
        title: "The Fall of Man, The Great Flood, The Drunkenness of Noah",
        content:
          "The Fall of Man: The story of Adam and Eve's expulsion from Eden due to disobedience. The Great Flood: The story of Noah's Ark and saving lives during the flood. The Drunkenness of Noah: A lesser-known scene depicting Noah's intoxication after the flood.",
      },
      {
        slide_number: 10,
        title: "The Importance of Symbolism",
        content:
          "Michelangelo didn't just paint people; he used symbols! Muscles meant human strength, light meant divine power, and eyes looking up meant searching for truth or God. Symbols put bigger stories into small pictures.",
      },
      {
        slide_number: 11,
        title:
          "Michelangelo's Inspirations (Did Michelangelo Think He Made the Art?)",
        content:
          "Michelangelo was a very religious man. He believed his talent came from God, and that God gave him the gift to create art. In 'The Creation of Adam,' he painted God giving life to man, showing that humans are made in God's image. When making sculptures, Michelangelo said, 'Every block of stone has a statue inside it and it is the task of the sculptor to discover it! The art is already there, I just had to find it!'",
      },
      {
        slide_number: 12,
        title: "Tell me if you agree with Michelangelo's thoughts about art:",
        content:
          "Do you think artists are inspired by something bigger, like emotions, ideas, or even magic? Who truly creates art? Is it people, or something else?",
      },
      {
        slide_number: 13,
        title: "Michelangelo's Impact on Art",
        content:
          "Michelangelo's work changed the world in many ways. Culturally, his art became so famous that it inspired artists worldwide. Religiously, his paintings made people feel closer to God. Socially, people started thinking more deeply about beauty, strength, and humanity.",
      },
      {
        slide_number: 14,
        title: "Do you think art has power?",
        content:
          "Do you think art has power? Why do you think art can make people feel emotions or even change their minds?",
      },
      {
        slide_number: 15,
        title: "Discussion Question! 'Art will not survive in the age of AI.'",
        content:
          "❌ No: True art comes from human emotion, imagination, and personal stories, which AI cannot truly feel or express. ✅ Yes: AI can create artistic images, music, and stories faster and cheaper, so people might value human-made art less.",
      },
      {
        slide_number: 16,
        title: "What do you think?",
        content: "What do you think?",
      },
      {
        slide_number: 17,
        title: "Activity",
        content:
          "If you were an artist, what would you want to create? Create a human-made artwork! Present it!",
      },
      {
        slide_number: 18,
        title:
          "Copyright © 2024 une seule class. All rights reserved. une seule we dream together",
        content: "Copyright information.",
      },
    ],
  };

  const dynamicVariables = {
    userName: user.fullName || "",
    age: data?.age || 0,
    sex: data?.sex || "",
    learningLanguage: data?.learning_language || "",
    languageLevel: data?.language_level || "",
    learningGoals: data?.learning_goals || "",
    tutorStyle: data?.tutor_style || "",
    feedbackStyle: data?.feedback_style || "",
    interests: data?.interests.join(", ") || "",
    lessonTitle: sampleLessonInfo.title,
    lessonDescription: sampleLessonInfo.description,
    lessonCategory: sampleLessonInfo.category,
    lessonDifficulty: sampleLessonInfo.difficulty,
    lessonSlides: sampleLessonInfo.slides
      .map((slide) => slide.content)
      .join("\n"),
  };

  if (error) {
    redirect(`/${locale}/service/product/onboarding`);
  }

  return (
    <div className="w-full h-full flex">
      {/* 왼쪽: GoogleSlideViewer */}
      <div className="w-2/3 h-full">
        <GoogleSlideViewer presentationId="1aT0zwJ6pSPEcpdsPSiHqRlNavWzZlhtu0M7bVhQruIM" />
      </div>
      {/* 오른쪽: AI 음성 대화 영역 */}
      <div className="w-1/3 h-full border-l">
        <VoiceAgentPanel dynamicVariables={dynamicVariables} />
      </div>
    </div>
  );
}
