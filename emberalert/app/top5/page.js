import Image from 'next/image';
import Link from 'next/link';

export default function WildfiresPage() {
  return (
    <div>
      <h1>Top 5 Most Notable Wildfires</h1>
      <p>Here are some of the most devastating and impactful wildfires in history:</p>

      <div>
        <h2>1. 2019–2020 Australian Bushfires (Black Summer)</h2>
        <Image
          src="/images/bushfire.jpg" // Update with your image path
          alt="Australian Bushfires"
          width={600}
          height={400}
        />
        <p>
          Area burned: 42 million acres (17 million hectares) <br />
          Casualties: 33 human deaths and 3 billion animals affected <br />
          The Black Summer fires were one of the worst wildfire seasons in Australia, causing widespread damage and ecological destruction.
        </p>
      </div>

      <div>
        <h2>2. 2019 Amazon Rainforest Fires</h2>
        <Image
          src="/images/amazon.jpg" // Update with your image path
          alt="Amazon Rainforest Fires"
          width={600}
          height={400}
        />
        <p>
          Area burned: 24.3 to 39.8 million acres (9.8 to 16.1 million hectares) <br />
          The Amazon fires sparked global concern over deforestation and climate change, burning large portions of the Amazon rainforest.
        </p>
      </div>

      <div>
        <h2>3. 2020 California Wildfires</h2>
        <Image
          src="/images/californiafires.jpg" // Update with your image path
          alt="California Wildfires"
          width={600}
          height={400}
        />
        <p>
          Area burned: 1.78 million acres (720,000 hectares) <br />
          Casualties: 31 human deaths and significant property damage <br />
          These fires were some of the most destructive in California's history, affecting communities and the environment.
        </p>
      </div>

      <div>
        <h2>4. 2003 Siberian Taiga Fires</h2>
        <Image
          src="/images/siberianfire.jpg" // Update with your image path
          alt="Siberian Taiga Fires"
          width={600}
          height={400}
        />
        <p>
          Area burned: 55 million acres (22 million hectares) <br />
          The Siberian Taiga fires were the largest in recorded history, burning vast stretches of forest and contributing significantly to climate change.
        </p>
      </div>

      <div>
        <h2>5. 2018 Camp Fire</h2>
        <Image
          src="/images/campfire2018.jpg" // Update with your image path
          alt="Camp Fire"
          width={600}
          height={400}
        />
        <p>
          Area burned: 153,336 acres (62,400 hectares) <br />
          Casualties: 85 human deaths <br />
          This fire was California's deadliest, devastating the town of Paradise and causing widespread destruction.
        </p>
      </div>
    </div>
  );
}
