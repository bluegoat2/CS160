import Image from "next/image";

export default function Home() {
  return (
    <div>
      <section className="relative bg-cover bg-center h-[80vh]">
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white space-y-4 px-4">
            <h2 className="text-4xl md:text-6xl font-bold">EmberAlert</h2>
            <p className="text-lg md:text-xl">Real-time wildfire and air quality updates</p>
          </div>
        </div>
      </section>
    </div>
  );
}
