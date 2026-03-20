import "./HeroComets.css";

const HeroComets = () => {
  return (
    <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
      {/* Comet 1 — top-right arc, moving leftward */}
      <div className="comet comet-1">
        <div className="comet-head">
          <div className="comet-core" />
          <div className="comet-glow" />
          <div className="comet-bloom" />
        </div>
        <div className="comet-trail" />
      </div>

      {/* Comet 2 — bottom-left arc, moving rightward */}
      <div className="comet comet-2">
        <div className="comet-head">
          <div className="comet-core" />
          <div className="comet-glow" />
          <div className="comet-bloom" />
        </div>
        <div className="comet-trail" />
      </div>
    </div>
  );
};

export default HeroComets;
