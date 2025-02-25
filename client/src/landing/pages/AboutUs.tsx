import { useTranslation } from "react-i18next";

const AboutUs = () => {
  const { t } = useTranslation();

  return (
    <>
      <h1 className="invisible">About Us</h1>

      {/* <!-- Mission Section --> */}
      <section className="max-w-4xl mx-auto py-10 px-6">
        <h2 className="text-4xl font-semibold text-black  text-center mb-4">
          {t("OurMissionTitle")}
        </h2>
        <p className="text-xl leading-relaxed">{t("OurMissionDesc1")}</p>
      </section>

      {/* <!-- Features --> */}
      <section className="max-w-5xl mx-auto py-10 px-6">
        <h2 className="text-4xl font-semibold text-black mb-6 text-center">
          {t("WhyChooseFamilyFLow")}
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <li className="bg-amber-400 p-6 rounded-xl shadow-lg hover:shadow-xl transition">
            <h3 className="text-xl font-bold text-black mb-2">
              {t("WhyChooseFamilyFLowTitle1")}
            </h3>
            <p>{t("WhyChooseFamilyFLowDesc1")}</p>
          </li>
          <li className="bg-amber-400 p-6 rounded-xl shadow-lg hover:shadow-xl transition">
            <h3 className="text-xl font-bold text-black mb-2">
              {t("WhyChooseFamilyFLowTitle2")}
            </h3>
            <p>{t("WhyChooseFamilyFLowDesc2")}</p>
          </li>
          <li className="bg-amber-400 p-6 rounded-xl shadow-lg hover:shadow-xl transition">
            <h3 className="text-xl font-bold text-black mb-2">
              {t("WhyChooseFamilyFLowTitle3")}
            </h3>
            <p>{t("WhyChooseFamilyFLowDesc3")}</p>
          </li>
        </ul>
      </section>
    </>
  );
};

export default AboutUs;
