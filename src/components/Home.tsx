const messages = [
  "London's Independent Cinemas",
  "Discover Special Screenings",
  "Share Film Events",
  "Join the Discussion",
];

const Frame = ({ index }: { index: number }) => (
  <div className="tw-flex-none tw-mr-1">
    <div className="kino-grey tw-relative tw-w-72 tw-h-48 tw-border-2 tw-border-gray-800">
      {/* Top Film Reel Sprocket holes */}
      <div className="tw-absolute -tw-top-3 tw-left-0 tw-w-full tw-flex tw-justify-between tw-px-2">
        <div className="tw-w-2 tw-h-2 tw-bg-gray-800 tw-rounded-full" />
        <div className="tw-w-2 tw-h-2 tw-bg-gray-800 tw-rounded-full" />
        <div className="tw-w-2 tw-h-2 tw-bg-gray-800 tw-rounded-full" />
        <div className="tw-w-2 tw-h-2 tw-bg-gray-800 tw-rounded-full" />
      </div>
      {/* Bottom Film Reel Sprocket holes */}
      <div className="tw-absolute -tw-bottom-3 tw-left-0 tw-w-full tw-flex tw-justify-between tw-px-2">
        <div className="tw-w-2 tw-h-2 tw-bg-gray-800 tw-rounded-full" />
        <div className="tw-w-2 tw-h-2 tw-bg-gray-800 tw-rounded-full" />
        <div className="tw-w-2 tw-h-2 tw-bg-gray-800 tw-rounded-full" />
        <div className="tw-w-2 tw-h-2 tw-bg-gray-800 tw-rounded-full" />
      </div>
      {/* Film 'Slides' Content */}

      <div className="tw-flex tw-items-center tw-justify-center tw-h-full">
        <p className="is-size-5 has-text-white-ter">
          {messages[index % messages.length]}
        </p>
      </div>
    </div>
  </div>
);

function Home() {
  return (
    <section className="kino-gradient tw-relative tw-h-screen tw-w-full tw-overflow-hidden">
      <div className="tw-w-full tw-text-center tw-pt-20 tw-mt-32">
        {" "}
        <h1 className="is-size-1 has-text-white-ter tw-font-bold title">
          Kino Connect
        </h1>
        <h2 className="is-size-4 has-text-white-ter tw-font-bold subtitle">
          Independent Cinema, Together
        </h2>
      </div>
      <div className="tw-absolute tw-inset-0 tw-flex tw-items-center tw-mt-20">
        <div className="tw-animate-scroll tw-flex tw-flex-nowrap">
          {[...Array(12)].map((_, index) => (
            <Frame key={index} index={index} />
          ))}
          {[...Array(12)].map((_, index) => (
            <Frame key={index} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Home;
