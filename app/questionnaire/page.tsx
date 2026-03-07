"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { track } from "@vercel/analytics";
import { questions } from "@/lib/questions";

export default function QuestionnairePage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selected, setSelected] = useState<string>("");

  // Filter questions based on showIf conditions
  const activeQuestions = questions.filter(
    (q) => !q.showIf || q.showIf(answers)
  );

  const currentQuestion = activeQuestions[currentIndex];
  const progress = (currentIndex / activeQuestions.length) * 100;
  const isLast = currentIndex === activeQuestions.length - 1;

  // Track start on first render (once)
  const [tracked, setTracked] = useState(false);
  if (!tracked) {
    track("questionnaire_started");
    setTracked(true);
  }

  function handleSelect(value: string) {
    setSelected(value);
  }

  function handleContinue() {
    if (!selected) return;

    const newAnswers = { ...answers, [currentQuestion.id]: selected };
    setAnswers(newAnswers);
    setSelected("");

    track("question_answered", { step: currentIndex + 1, questionId: currentQuestion.id, value: selected });

    if (isLast) {
      track("questionnaire_completed");
      const params = new URLSearchParams();
      Object.entries(newAnswers).forEach(([k, v]) => params.set(k, v));
      router.push(`/checklist?${params.toString()}`);
    } else {
      // If the next question would be hidden by showIf, we need to recalculate
      // active questions with the new answers
      const nextActive = questions.filter(
        (q) => !q.showIf || q.showIf(newAnswers)
      );
      const nextIndex = currentIndex + 1;
      if (nextIndex < nextActive.length) {
        setCurrentIndex(nextIndex);
      }
    }
  }

  function handleBack() {
    if (currentIndex === 0) {
      router.push("/");
      return;
    }
    const prevIndex = currentIndex - 1;
    setCurrentIndex(prevIndex);
    setSelected(answers[activeQuestions[prevIndex].id] || "");
  }

  if (!currentQuestion) return null;

  return (
    <main style={{ minHeight: "100vh", background: "#fff" }}>
      {/* Progress bar */}
      <div style={{ height: "3px", background: "#f0f0f0", position: "sticky", top: 0, zIndex: 10 }}>
        <div
          style={{
            height: "100%",
            background: "#2563eb",
            width: `${progress}%`,
            transition: "width 0.4s ease",
          }}
        />
      </div>

      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "64px 24px 96px" }}>

        {/* Step counter */}
        <div style={{
          fontSize: "12px",
          fontWeight: 600,
          color: "#aaa",
          letterSpacing: "0.05em",
          marginBottom: "40px",
        }}>
          {currentIndex + 1} of {activeQuestions.length}
        </div>

        {/* Question */}
        <h1 style={{
          fontSize: "clamp(22px, 4vw, 28px)",
          fontWeight: 700,
          color: "#111",
          lineHeight: 1.3,
          letterSpacing: "-0.01em",
          marginBottom: "12px",
        }}>
          {currentQuestion.text}
        </h1>

        {currentQuestion.subtext && (
          <p style={{
            fontSize: "15px",
            color: "#888",
            lineHeight: 1.6,
            marginBottom: "36px",
          }}>
            {currentQuestion.subtext}
          </p>
        )}

        {/* Options */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "40px" }}>
          {currentQuestion.options?.map((option) => (
            <button
              key={option.value}
              className={`radio-option${selected === option.value ? " selected" : ""}`}
              onClick={() => handleSelect(option.value)}
            >
              <div className="radio-dot" />
              <div>
                <div style={{
                  fontSize: "15px",
                  fontWeight: 500,
                  color: "#111",
                  lineHeight: 1.4,
                }}>
                  {option.label}
                </div>
                {option.description && (
                  <div style={{
                    fontSize: "13px",
                    color: "#888",
                    marginTop: "4px",
                    lineHeight: 1.5,
                  }}>
                    {option.description}
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Navigation */}
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <button
            onClick={handleBack}
            style={{
              padding: "12px 20px",
              border: "1.5px solid #e5e5e5",
              borderRadius: "8px",
              background: "transparent",
              fontSize: "14px",
              fontWeight: 500,
              color: "#555",
              cursor: "pointer",
              transition: "border-color 0.15s",
            }}
          >
            ← Back
          </button>
          <button
            onClick={handleContinue}
            disabled={!selected}
            style={{
              padding: "12px 28px",
              background: selected ? "#2563eb" : "#e5e5e5",
              color: selected ? "#fff" : "#aaa",
              border: "none",
              borderRadius: "8px",
              fontSize: "15px",
              fontWeight: 600,
              cursor: selected ? "pointer" : "default",
              transition: "background 0.15s, color 0.15s",
              letterSpacing: "-0.01em",
            }}
          >
            {isLast ? "Generate my checklist →" : "Continue →"}
          </button>
        </div>
      </div>
    </main>
  );
}
