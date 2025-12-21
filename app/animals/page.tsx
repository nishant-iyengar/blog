import Sidebar from '@/components/Sidebar';
import { getAllAnimalPhotos } from '@/lib/animals';
import Image from 'next/image';
import PhotoLink from '@/components/PhotoLink';

// Force dynamic rendering to ensure blob storage API calls work at runtime
export const dynamic = 'force-dynamic';

function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return dateString;
  }
}

export default async function AnimalsPage() {
  const photos = await getAllAnimalPhotos();

  return (
    <div className="min-h-screen bg-[#F7FAFC]">
      <Sidebar />
      <div className="flex flex-col md:flex-row pt-[60px] md:pt-0">
        <Sidebar />
        
        {/* Main Content */}
        <main className="flex-1 max-w-6xl mx-auto px-4 md:px-8 py-8 w-full">
          <header className="mb-8 flex justify-end">
            <div className="text-right">
              <div className="text-base text-[#4A5568]">Nishant Iyengar</div>
              <div className="text-sm text-[#718096] mt-1">iyengar.nish@gmail.com</div>
            </div>
          </header>

          {/* Simple Gallery Grid - No Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {photos.map((photo, index) => {
              // Create a safe ID from filename (remove extension, replace special chars)
              const photoId = `animals-${photo.filename.replace(/\.[^/.]+$/, '').replace(/[^a-z0-9]/gi, '-').toLowerCase()}`;
              return (
                <PhotoLink
                  key={index}
                  id={photoId}
                  className="group relative overflow-hidden rounded-lg bg-white cursor-pointer transition-transform duration-300 hover:scale-105 shadow-sm"
                >
                  <div className="relative aspect-square w-full">
                    <Image
                      src={photo.src}
                      alt={photo.alt || photo.caption || 'Animal photo'}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  </div>
                  {(photo.date || photo.caption) && (
                    <div className="p-3 bg-white">
                      <p className="text-sm text-[#718096]">
                        {photo.date && (
                          <span className="font-medium">{formatDate(photo.date)}</span>
                        )}
                        {photo.caption && (
                          <span className={photo.date ? "ml-2" : ""}>{photo.caption}</span>
                        )}
                      </p>
                    </div>
                  )}
                </PhotoLink>
              );
            })}
          </div>

          {photos.length === 0 && (
            <div className="text-center py-12">
              <p className="text-[#718096]">No photos yet. Add photos to the content/animals directory.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
