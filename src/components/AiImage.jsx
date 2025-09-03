import { useState } from 'react';

const fallbackImage = '/no-image.png';

const AiImage = ({ title }) => {
  const [hasError, setHasError] = useState(false);

  const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(title)}`;

  return (
    <img
      src={hasError ? fallbackImage : imageUrl}
      alt={hasError ? "No image awailable" : title}
      onError={() => setHasError(true)}
      style={{ width: '100%', borderRadius: '8px' }}
    />
  );
};

export default AiImage;