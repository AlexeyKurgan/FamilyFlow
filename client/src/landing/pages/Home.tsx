import Button from "../../shared/components/Button";
import BgEllipseSVG from "../components/icons/BgEllipse";
import ElementDecorSVG from "../components/icons/ElementsDecor";
import IllustrationGirlSVG from "../components/icons/IllustrationGirl";
import IllustrationMenSVG from "../components/icons/IllustrationMen";
import PlaneSVG from "../components/icons/Plane";
import LineDecorSVG from "../components/icons/LineDecor";
import { GoArrowRight } from "../../shared/react-icons/icons";

const Home = () => {
  return (
    <section className="relative">
      <h1 className="invisible">Landing</h1>
      <div
        className="flex gap-5 relative 
                 max-[1328px]:flex-col"
      >
        <div className="basis-[50vw]">
          <div className="relative">
            <h2
              className="text-[68px] font-bold p-5 pb-0 mb-8 leading-[1.1] 
                           z-1 max-[1328px]:max-w-[800px] max-md:text-[48px]
                           max-md:mb-2 max-md:p-2 max-md:text-center max-sm:text-3xl"
            >
              FamilyFlow: A Creative Space for Families
            </h2>
            <p className="text-[24px] pt-4 pl-5 pr-5 max-[1328px]:text-[34px] max-md:text-[16px]">
              The interactive platform to bring families together, anytime,
              anywhere, through creative activities, learning, and fun.
            </p>
            <div className="w-[220px] p-5 relative max-sm:flex max-sm:justify-center max-sm:w-full">
              <Button
                type="button"
                className="text-lg font-bold bg-amber-400 
                                hover:scale-[1.1] pl-7 justify-start relative max-sm:max-w-[180px]"
              >
                Get Started
                <GoArrowRight
                  className="text-xl animate-bounce max-md:animate-none absolute 
                                       right-2 top-1/2 transform translate-x-[-50%] translate-y-[-43%]"
                />
              </Button>
            </div>
            <p className="p-5 max-[1328px]:text-[22px] max-md:text-[16px] max-md:pt-1 max-md:pb-8 max-sm:text-center">
              Free forever — no credit card required.
            </p>
            <BgEllipseSVG className="absolute top-0 left-0 -z-1 max-md:top-[-25px] max-sm:w-16 max-sm:left-7" />

            <IllustrationGirlSVG className="mx-auto z-0 max-md:max-w-[450px] max-md:text-[48px] max-md:size-max max-sm:max-w-[250px]" />

            <PlaneSVG className="absolute top-0 -right-40 animate-scale-animation max-[1328px]:-right-0 max-[1328px]:-z-1 max-[1018px]:hidden" />
          </div>
        </div>
        <ElementDecorSVG className="absolute inset-1/2 transform -translate-x-1/2 -translate-y-1/ max-[1328px]:hidden" />
        <LineDecorSVG className="absolute inset-1/2 transform translate-x-[-221px] -translate-y-1/4 -z-1 max-[1328px]:hidden" />
        <div className="basis-[50vw] flex justify-end items-center flex-col-reverse">
          <div className="max-[1328px]:order-1">
            <h2
              className="text-[49px] font-bold p-5 pb-0 mb-8 leading-[1.1]
                           max-md:mb-1 max-md:p-2 max-md:text-center
                           max-sm:text-3xl"
            >
              Stay creative and connected
            </h2>
            <p className="text-[24px] pt-4 pl-5 pr-5 max-[1328px]:text-[34px] max-md:text-[16px]">
              Bring your family’s activities together in one shared space.
              Choose the creative tools that suit your style, and bond with your
              loved ones no matter where you are.
            </p>
          </div>
          <IllustrationMenSVG className="max-md:max-w-[450px] max-md:size-max max-sm:max-w-[250px]" />
        </div>
      </div>
    </section>
  );
};

export default Home;
