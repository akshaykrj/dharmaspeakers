type Props = {
  speaker: any;
};

export default function SpeakerProfile({ speaker }: Props) {
  return (
    <section className="bg-[#faf9f6] text-black">
      <div className="max-w-6xl mx-auto px-6 py-24 text-black">
        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-16 items-start">

          {/* Photo */}
          <div>
            {speaker.photo_url ? (
              <img
                src={speaker.photo_url}
                alt={speaker.name}
                className="w-full rounded-2xl object-cover"
              />
            ) : (
              <div className="w-full aspect-[3/4] rounded-2xl bg-gray-200 flex items-center justify-center text-sm text-gray-500 tracking-wide">
                Speaker Photo
              </div>
            )}
          </div>

          {/* Content */}
          <div className="max-w-2xl">
            <h1 className="text-4xl font-serif font-medium mb-3 text-black">
              {speaker.name}
            </h1>

            {speaker.current_role && (
              <p className="text-lg text-gray-700 mb-6">
                {speaker.current_role}
              </p>
            )}

            <div className="w-14 h-px bg-gray-400 mb-8" />

            {speaker.bio && (
              <div className="space-y-5 text-base leading-relaxed text-gray-900">
                <p>{speaker.bio}</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
