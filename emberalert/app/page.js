import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-black text-white">
      {/* Hero Section */}
      <section className="relative bg-cover bg-center h-[80vh] bg-[url('/images/amazon.jpg')]">
        <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-center px-4">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">EmberAlert</h2>
          <p className="text-lg md:text-2xl mb-6 text-gray-300">Real-time wildfire and air quality updates</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="/map/wildfires" className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl text-lg font-semibold">
              🔥 View Wildfire Heatmap
            </a>
            <a href="/map/airquality" className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl text-lg font-semibold">
              ☁️ Check Air Quality
            </a>
          </div>
        </div>
      </section>

      {/* Feature Links */}
      <section className="pt-2 pb-10 bg-black px-6">
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto">
          <a href="/top5" className="block bg-[#1a1a1a] p-6 rounded-2xl shadow hover:shadow-lg hover:bg-[#2a2a2a] transition border border-gray-700">
            <h4 className="text-xl font-bold mb-2 text-white">🔥 Top 5 Wildfires</h4>
            <p className="text-gray-400">Get a quick overview of the most severe wildfires throughout history.</p>
          </a>
          <a href="/news" className="block bg-[#1a1a1a] p-6 rounded-2xl shadow hover:shadow-lg hover:bg-[#2a2a2a] transition border border-gray-700">
            <h4 className="text-xl font-bold mb-2 text-white">📰 Latest News</h4>
            <p className="text-gray-400">Stay informed with the latest wildfire updates.</p>
          </a>
          <a href="/impact" className="block bg-[#1a1a1a] p-6 rounded-2xl shadow hover:shadow-lg hover:bg-[#2a2a2a] transition border border-gray-700">
            <h4 className="text-xl font-bold mb-2 text-white">🌍 Wildfire Impact</h4>
            <p className="text-gray-400">Explore areas most affected by wildfire damage and smoke spread.</p>
          </a>
          <a href="/evacuation" className="block bg-[#1a1a1a] p-6 rounded-2xl shadow hover:shadow-lg hover:bg-[#2a2a2a] transition border border-gray-700">
            <h4 className="text-xl font-bold mb-2 text-white">❗ Evacuation Resources</h4>
            <p className="text-gray-400">Access links and tips for safe evacuation and shelter locations.</p>
          </a>
        </div>
      </section>
    </div>
  );
}
