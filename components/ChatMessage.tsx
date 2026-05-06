import React from 'react';

interface ChatMessageProps {
  text: string;
}

export default function ChatMessage({ text }: ChatMessageProps) {
  // Regex to detect markdown images: ![alt](url)
  const parts = text.split(/(!\[.*?\]\(.*?\))/g);
  
  return (
    <div className="space-y-2">
      {parts.map((part, i) => {
        const match = part.match(/!\[(.*?)\]\((.*?)\)/);
        if (match) {
          return (
            <img 
              key={i} 
              src={match[2]} 
              alt={match[1] || 'Sri Lanka Tourism'} 
              className="rounded-xl max-w-full h-auto shadow-md border border-white/20 my-2" 
              loading="lazy"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          );
        }
        // Handle basic bold/italic if needed, or just plain text with newlines
        return (
          <span key={i} className="whitespace-pre-wrap leading-relaxed">
            {part}
          </span>
        );
      })}
    </div>
  );
}
