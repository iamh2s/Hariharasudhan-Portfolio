
"use client";

export default function ParticleField() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 h-dvh w-full overflow-hidden"
      aria-hidden="true"
    >
      {/* Background grid */}
      <div className="grid-bg mask-radial absolute inset-0 h-full w-full" />

      {/* Orb 1 */}
      <div
        className="
          absolute -left-[180px] top-[8%]
          h-[360px] w-[360px] rounded-full
          sm:-left-[160px] sm:h-[430px] sm:w-[430px]
          lg:-left-[140px] lg:h-[500px] lg:w-[500px]
        "
        style={{
          background:
            "radial-gradient(circle, rgba(99,102,241,0.035), transparent 70%)",
        }}
      />

      {/* Orb 2 */}
      <div
        className="
          absolute -right-[140px] top-[48%]
          h-[300px] w-[300px] rounded-full
          sm:-right-[130px] sm:h-[350px] sm:w-[350px]
          lg:-right-[100px] lg:h-[400px] lg:w-[400px]
        "
        style={{
          background:
            "radial-gradient(circle, rgba(6,182,212,0.025), transparent 70%)",
        }}
      />

      {/* Orb 3 */}
      <div
        className="
          absolute bottom-[-100px] left-[25%]
          h-[280px] w-[280px] rounded-full
          sm:h-[320px] sm:w-[320px]
          lg:left-[30%] lg:h-[350px] lg:w-[350px]
        "
        style={{
          background:
            "radial-gradient(circle, rgba(99,102,241,0.02), transparent 70%)",
        }}
      />
    </div>
  );
}
