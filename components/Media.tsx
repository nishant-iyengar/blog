'use client';

interface MediaProps {
  src: string;
  width?: string | number; // e.g., "80%", "600px", or 600
  height?: string | number; // e.g., "400px" or 400 (used to calculate aspect ratio)
  alt?: string;
  caption?: string;
}

export default function Media({ src, width = '100%', height, alt, caption }: MediaProps) {
  // Check if src is a URL (external or blob storage)
  const isUrl = src.startsWith('http://') || src.startsWith('https://') || src.startsWith('//');
  
  // Determine media type from file extension
  const extension = src.split('.').pop()?.toLowerCase();
  const isGif = extension === 'gif';
  const isVideo = ['mp4', 'webm', 'ogg', 'mov'].includes(extension || '');

  // Calculate aspect ratio if both width and height are provided
  let aspectRatio: number | null = null;
  if (width && height) {
    const widthNum = typeof width === 'string' 
      ? parseFloat(width.replace(/[^0-9.]/g, '')) 
      : width;
    const heightNum = typeof height === 'string' 
      ? parseFloat(height.replace(/[^0-9.]/g, '')) 
      : height;
    
    if (widthNum > 0 && heightNum > 0) {
      aspectRatio = widthNum / heightNum;
    }
  }

  // Convert width to CSS value
  const widthValue = typeof width === 'number' ? `${width}px` : width;

  // Container style with aspect ratio preservation
  const containerStyle: React.CSSProperties = {
    width: widthValue,
    maxWidth: '100%',
    margin: '1.5rem auto',
    ...(aspectRatio && { aspectRatio: aspectRatio.toString() }),
  };

  // Media style - object-fit: contain prevents distortion
  const mediaStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    borderRadius: '0.5rem',
    display: 'block',
  };

  // Render based on media type
  const renderMedia = () => {
    if (isVideo) {
      return (
        <video
          src={src}
          controls
          style={mediaStyle}
          className="bg-gray-100"
        >
          Your browser does not support the video tag.
        </video>
      );
    }

    // For all images (URLs, GIFs, local), use regular img tag
    // This works with Vercel Blob Storage URLs and any external URLs
    return (
      <img
        src={src}
        alt={alt || caption || 'Media'}
        style={mediaStyle}
        loading="lazy"
        crossOrigin={isUrl ? 'anonymous' : undefined}
      />
    );
  };

  return (
    <figure style={containerStyle} className="my-6">
      <div style={{ ...containerStyle, position: 'relative' }}>
        {renderMedia()}
      </div>
      {caption && (
        <figcaption className="text-sm text-[#718096] text-center mt-2 italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
