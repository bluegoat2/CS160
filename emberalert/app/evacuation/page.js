export default function Evacuation() {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-12">
      <div className="max-w-5xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-center">Evacuation Resources</h1>
        <p className="text-lg text-center text-gray-300">
          Be prepared to act quickly. Here are essential tools, tips, and resources to help you evacuate safely during wildfires and poor air quality events.
        </p>

        {/* Quick Resource Links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <a
            href="https://www.ready.gov/wildfires"
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-[#1a1a1a] p-6 rounded-xl shadow hover:shadow-lg hover:bg-[#2a2a2a] transition border border-gray-700"
          >
            <h3 className="text-xl font-semibold mb-2 text-white">🚨 Ready.gov - Wildfires</h3>
            <p className="text-gray-400">Official government evacuation guides and emergency plan templates.</p>
          </a>
          <a
            href="https://www.redcross.org/get-help/disaster-relief-and-recovery-services/find-an-open-shelter.html"
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-[#1a1a1a] p-6 rounded-xl shadow hover:shadow-lg hover:bg-[#2a2a2a] transition border border-gray-700"
          >
            <h3 className="text-xl font-semibold mb-2 text-white">🏠 Red Cross Shelter Finder</h3>
            <p className="text-gray-400">Find open shelters near you during a wildfire or disaster event.</p>
          </a>
          <a
            href="https://www.fema.gov"
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-[#1a1a1a] p-6 rounded-xl shadow hover:shadow-lg hover:bg-[#2a2a2a] transition border border-gray-700"
          >
            <h3 className="text-xl font-semibold mb-2 text-white">🧰 FEMA Resources</h3>
            <p className="text-gray-400">Disaster assistance, preparation guides, and financial recovery help.</p>
          </a>
        </div>

        {/* Tips */}
        <div className="bg-[#1a1a1a] rounded-xl shadow p-6 border border-gray-700">
          <h2 className="text-2xl font-bold mb-4 text-white">✅ Evacuation Tips</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>Prepare a go-bag with essentials: ID, meds, water, food, flashlight, charger.</li>
            <li>Keep your vehicle fueled and parked facing the exit route.</li>
            <li>Follow local alerts and do not wait for a mandatory evacuation order.</li>
            <li>Know multiple escape routes and have a communication plan.</li>
            <li>Keep N95 masks handy if air quality is poor due to smoke.</li>
            <li>Keep emergency funds to purchase important survival necessities.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
