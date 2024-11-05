const messages = [
  "London's Independent Cinemas",
  "Discover Special Screenings",
  "Share Film Events",
  "Join the Discussion",
];

const Frame = ({ index }: { index: number }) => (
  <div className="tw-flex-none tw-mr-1">
    <div className="kino-grey tw-relative tw-w-56 md:tw-w-72 tw-h-36 md:tw-h-48 tw-border-2 tw-border-gray-800">
      {/* Top Film Reel Strip */}
      <div className="tw-absolute -tw-top-3 tw-left-0 tw-w-full tw-h-4 tw-bg-gray-800">
        <div className="tw-w-full tw-h-full tw-flex tw-justify-between tw-px-2 tw-items-center">
          <div
            className="tw-w-2 tw-h-2 tw-rounded-full tw-bg-transparent tw-border-2 tw-border-transparent"
            style={{
              boxShadow: "0 0 0 2px transparent, inset 0 0 0 2px #1a1a1a",
            }}
          />
          <div
            className="tw-w-2 tw-h-2 tw-rounded-full tw-bg-transparent tw-border-2 tw-border-transparent"
            style={{
              boxShadow: "0 0 0 2px transparent, inset 0 0 0 2px #1a1a1a",
            }}
          />
          <div
            className="tw-w-2 tw-h-2 tw-rounded-full tw-bg-transparent tw-border-2 tw-border-transparent"
            style={{
              boxShadow: "0 0 0 2px transparent, inset 0 0 0 2px #1a1a1a",
            }}
          />
          <div
            className="tw-w-2 tw-h-2 tw-rounded-full tw-bg-transparent tw-border-2 tw-border-transparent"
            style={{
              boxShadow: "0 0 0 2px transparent, inset 0 0 0 2px #1a1a1a",
            }}
          />
        </div>
      </div>

      {/* Bottom Film Reel Strip */}
      <div className="tw-absolute -tw-bottom-3 tw-left-0 tw-w-full tw-h-4 tw-bg-gray-800">
        <div className="tw-w-full tw-h-full tw-flex tw-justify-between tw-px-2 tw-items-center">
          <div
            className="tw-w-2 tw-h-2 tw-rounded-full tw-bg-transparent tw-border-2 tw-border-transparent"
            style={{
              boxShadow: "0 0 0 2px transparent, inset 0 0 0 2px #1a1a1a",
            }}
          />
          <div
            className="tw-w-2 tw-h-2 tw-rounded-full tw-bg-transparent tw-border-2 tw-border-transparent"
            style={{
              boxShadow: "0 0 0 2px transparent, inset 0 0 0 2px #1a1a1a",
            }}
          />
          <div
            className="tw-w-2 tw-h-2 tw-rounded-full tw-bg-transparent tw-border-2 tw-border-transparent"
            style={{
              boxShadow: "0 0 0 2px transparent, inset 0 0 0 2px #1a1a1a",
            }}
          />
          <div
            className="tw-w-2 tw-h-2 tw-rounded-full tw-bg-transparent tw-border-2 tw-border-transparent"
            style={{
              boxShadow: "0 0 0 2px transparent, inset 0 0 0 2px #1a1a1a",
            }}
          />
        </div>
      </div>

      {/* Film 'Slides' Content */}
      <div className="tw-flex tw-items-center tw-justify-center tw-h-full tw-px-4">
        <p className="is-size-6-mobile is-size-5-tablet has-text-white-ter">
          {messages[index % messages.length]}
        </p>
      </div>
    </div>
  </div>
);

function Home() {
  return (
    <section className="kino-gradient tw-relative tw-h-screen tw-w-full tw-overflow-hidden">
      {/* Title container with responsive padding and margin */}
      <div className="tw-w-full tw-text-center tw-pt-16 md:tw-pt-20 tw-mt-16 md:tw-mt-32">
        <h1 className="is-size-2-mobile is-size-1-tablet has-text-white-ter tw-font-bold title">
          Kino Connect
        </h1>
        <h2 className="is-size-5-mobile is-size-4-tablet has-text-white-ter tw-font-bold subtitle">
          Independent Cinema, Together
        </h2>
      </div>

      {/* Film reel container with responsive positioning */}
      <div className="tw-absolute tw-inset-x-0 tw-top-1/2 tw-transform -tw-translate-y-1/2 tw-mt-10 md:tw-mt-20">
        <div className="tw-animate-scroll tw-flex tw-flex-nowrap">
          {[...Array(12)].map((_, index) => (
            <Frame key={index} index={index} />
          ))}
          {[...Array(12)].map((_, index) => (
            <Frame key={`clone-${index}`} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Home;
