import Sidebar from '@/components/Sidebar';
import { getAllNovaPhotos } from '@/lib/nova';
import Image from 'next/image';

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

export default async function NovaPage() {
  const photos = await getAllNovaPhotos();

  return (
    <div className="min-h-screen bg-[#F7FAFC]">
      <div className="flex md:flex-row">
        <Sidebar />
        
        {/* Main Content */}
        <main className="flex-1 max-w-6xl mx-auto px-4 md:px-8 py-8">
          <header className="mb-8 flex justify-end">
            <div className="text-right">
              <div className="text-base text-[#4A5568]">Nishant Iyengar</div>
              <div className="text-sm text-[#718096] mt-1">iyengar.nish@gmail.com</div>
            </div>
          </header>

          {/* Simple Gallery Grid - No Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {photos.map((photo, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-lg bg-white cursor-pointer transition-transform duration-300 hover:scale-105 shadow-sm"
              >
                <div className="relative aspect-square w-full">
                  <Image
                    src={photo.src}
                    alt={photo.alt || photo.caption || 'Nova photo'}
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
              </div>
            ))}
          </div>

          {photos.length === 0 && (
            <div className="text-center py-12">
              <p className="text-[#718096]">No photos yet. Add photos to the content/nova directory.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
