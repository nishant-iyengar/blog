import Sidebar from '@/components/Sidebar';
import { getPhotosBySection } from '@/lib/photos';
import Image from 'next/image';

// Force dynamic rendering to ensure blob storage API calls work at runtime
export const dynamic = 'force-dynamic';

export default async function PhotosPage() {
  const sections = await getPhotosBySection();

  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      if (!isNaN(date.getTime())) {
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
      }
    } catch (e) {
      // If not a valid date, return as-is
    }
    return dateString;
  };

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

          <div className="space-y-12">
            {sections.map((section, sectionIndex) => (
              <section key={sectionIndex} className="scroll-mt-8">
                {/* Section Header */}
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-[#4A5568] mb-2">
                    {formatDate(section.date)}
                  </h2>
                  {section.description && (
                    <p className="text-sm text-[#718096] leading-5">
                      {section.description}
                    </p>
                  )}
                </div>

                {/* Photos Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {section.photos.map((photo, photoIndex) => (
                    <div
                      key={photoIndex}
                      className="group relative overflow-hidden rounded-lg bg-white cursor-pointer transition-transform duration-300 hover:scale-105 shadow-sm"
                    >
                      <div className="relative aspect-square w-full">
                        <Image
                          src={photo.src}
                          alt={photo.alt || photo.caption || 'Photo'}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                      </div>
                      {photo.caption && (
                        <div className="p-3 bg-white">
                          <p className="text-sm text-[#718096]">{photo.caption}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {sections.length === 0 && (
            <div className="text-center py-12">
              <p className="text-[#718096]">No photos yet. Add photos to the content/photos directory.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
