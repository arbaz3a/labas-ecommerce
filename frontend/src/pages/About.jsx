import React from "react";

function About() {
  return (
    <div className="bg-[#f6f6f6] py-12 px-4">
      <h1 className="text-2xl md:text-3xl font-semibold tracking-widest text-center mb-6 text-black">
        ABOUT US
      </h1>
      <div className="max-w-5xl mx-auto bg-white rounded-xl p-8 md:p-12">
        <section className="mb-10">
          <h2 className="text-xl font-medium mb-3 text-black">Who We Are</h2>
          <p className="text-gray-800 text-base leading-relaxed">
            Founded in 2026, ZevyLabas is a modern fashion brand offering a
            curated collection of clothing, footwear, and fragrances. We combine
            style, comfort, and confidence to create a complete lifestyle
            experience.
          </p>
          <p className="text-gray-800 text-base leading-relaxed mt-4">
            Collections are designed to reflect contemporary trends while
            maintaining timeless appeal. At ZevyLabas, fashion is not just about
            what you wear, it's about how you express yourself.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-medium mb-3 text-black">Mission</h2>
          <p className="text-gray-800 text-base leading-relaxed">
            Provide high-quality fashion choices that empower individuals to
            express their identity with confidence and style.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-medium mb-3 text-black">Vision</h2>
          <p className="text-gray-800 text-base leading-relaxed">
            Grow into a trusted fashion destination known for innovation,
            quality, and a customer-first approach.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium mb-4 text-black">Core Values</h2>
          <ul className="grid sm:grid-cols-2 gap-y-2 text-base text-gray-800 list-none">
            <li>Quality</li>
            <li>Innovation</li>
            <li>Customer Commitment</li>
            <li>Integrity</li>
            <li>Style & Expression</li>
            <li>Growth</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

export default About;
