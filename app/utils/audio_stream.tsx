import React, { useState } from "react";

interface VoiceSettings {
  stability: number;
  similarity_boost: number;
}

interface AudioStreamProps {
  voiceId: string;
  text: string;
  apiKey: string;
  voiceSettings: VoiceSettings;
}

const AudioStream: React.FC<AudioStreamProps> = ({
  voiceId,
  text,
  apiKey,
  voiceSettings,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const startStreaming = async () => {
    setLoading(true);
    setError("");

    const baseUrl = "https://api.elevenlabs.io/v1/text-to-speech";
    const headers = {
      "Content-Type": "application/json",
      "xi-api-key": apiKey,
    };

    const requestBody = {
      text,
      voice_settings: voiceSettings,
    };

    try {
      const response = await fetch(`${baseUrl}/${voiceId}`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        try {
          const blob = await response.blob();
          const audioUrl = URL.createObjectURL(blob);
          const audio = new Audio(audioUrl);
          
          await audio.play();
          
          audio.onended = () => {
            URL.revokeObjectURL(audioUrl);
          };

        } catch (audioError) {
          console.error("Audio playback error:", audioError);
          if (audioError instanceof Error) {
            setError(`Audio Playback Error: ${audioError.message}`);
          } else {
            setError("An unknown error occurred during audio playback.");
          }
        }
      } else {
        let errorDetails = "";
        try {
          const errorData = await response.json();
          if (errorData.detail && errorData.detail.message) {
            errorDetails = errorData.detail.message;
          }
        } catch (jsonParseError) {
          errorDetails = response.statusText;
        }
        
        setError(`API Error (${response.status}): ${errorDetails || 'Unable to stream audio.'}`);
      }
    } catch (networkError) {
      console.error("Network request failed:", networkError);
      if (networkError instanceof Error) {
        setError(`Network Request Failed: ${networkError.message}`);
      } else {
        setError("Network Request Failed: An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={startStreaming} disabled={loading}>
        {loading ? "Streaming..." : "Start Streaming"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default AudioStream;
