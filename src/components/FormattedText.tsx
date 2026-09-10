export default function FormattedText({ text, className = "" }: { text?: string, className?: string }) {
  if (!text) return null;

  const lines = text.split('\n');

  return (
    <div className={className}>
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        
        if (trimmed.startsWith('•')) {
          return (
            <div key={idx} className="flex items-start">
              <span className="mr-2 flex-shrink-0">•</span>
              <span>{trimmed.substring(1).trim()}</span>
            </div>
          );
        }
        if (trimmed.startsWith('- ')) {
          return (
            <div key={idx} className="flex items-start">
              <span className="mr-2 flex-shrink-0">-</span>
              <span>{trimmed.substring(2).trim()}</span>
            </div>
          );
        }
        if (trimmed.startsWith('* ')) {
          return (
            <div key={idx} className="flex items-start">
              <span className="mr-2 flex-shrink-0">*</span>
              <span>{trimmed.substring(2).trim()}</span>
            </div>
          );
        }

        if (trimmed === '') {
          return <br key={idx} />;
        }

        return (
          <div key={idx}>
            {line}
          </div>
        );
      })}
    </div>
  );
}