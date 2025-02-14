const AboutUs = () => {
  return (
    <>
      <h1 className="invisible">About Us</h1>

      {/* <!-- Mission Section --> */}
      <section className="max-w-4xl mx-auto py-10 px-6">
        <h2 className="text-4xl font-semibold text-black  text-center mb-4">
          Our Mission
        </h2>
        <p className="text-xl leading-relaxed">
          At FamilyFlow, we aim to simplify family life by providing a task
          manager designed for parents and children alike. Our mission is to
          foster teamwork, responsibility, and connection through easy-to-use
          collaborative tools.
        </p>
      </section>

      {/* <!-- Features --> */}
      <section className="max-w-5xl mx-auto py-10 px-6">
        <h2 className="text-4xl font-semibold text-black mb-6 text-center">
          Why Choose FamilyFlow?
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <li className="bg-amber-400 p-6 rounded-xl shadow-lg hover:shadow-xl transition">
            <h3 className="text-xl font-bold text-black mb-2">
              Task Management
            </h3>
            <p>
              Easily assign and track household tasks to involve the whole
              family in daily activities.
            </p>
          </li>
          <li className="bg-amber-400 p-6 rounded-xl shadow-lg hover:shadow-xl transition">
            <h3 className="text-xl font-bold text-black mb-2">
              Collaborative Planning
            </h3>
            <p>
              Plan events, chores, and family activities together with intuitive
              planning features.
            </p>
          </li>
          <li className="bg-amber-400 p-6 rounded-xl shadow-lg hover:shadow-xl transition">
            <h3 className="text-xl font-bold text-black mb-2">
              Engaging Challenges
            </h3>
            <p>
              Make task completion fun with challenges and rewards that motivate
              kids and adults alike.
            </p>
          </li>
        </ul>
      </section>
    </>
  );
};

export default AboutUs;
