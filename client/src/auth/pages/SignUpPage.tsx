import { Link } from "react-router-dom";
import CustomTooltip from "../../shared/components/Tooltip";
import AuthForm from "../components/AuthForm";
import { AuthMode } from "../constants/AuthMode";
import { GoArrowRight } from "../../shared/react-icons/icons";

const SignUpPage = () => {
  return (
    <div className="flex w-full h-full box-content max-lg:flex-col">
      <div
        className="flex flex-col 
                justify-center items-center 
                w-[50%] relative p-5 bg-linear-to-t 
                from-400 to-amber-500 overflow-hidden min-h-[260px] max-lg:w-[100%]"
      >
        <CustomTooltip
          placement="bottom"
          title="Back Home"
          className="absolute top-5 left-5 rotate-180"
          component={Link}
          pathUrl={"/"}
        >
          <GoArrowRight size={35} />
        </CustomTooltip>
        <h1 className="text-5xl font-medium mb-6">FamilyFlow</h1>
        <p className="text-xl font-bold max-md:text-base">
          A task manager designed for families and productive for parents.
        </p>

        <div className="absolute top-[-90px] right-[-140px] -z-10 w-[250px] h-[250px] bg-black rounded-full"></div>
        <div className="absolute bottom-[-150px] left-[-110px] -z-10 w-[250px] h-[250px] bg-amber-400 rounded-full"></div>
      </div>
      <div className="w-[50%] p-5 flex flex-col justify-center  max-lg:w-[100%] max-md:pt-[2rem]">
        <span className="text-center block text-4xl font-bold mb-2.5">
          Hello!
        </span>
        <p className="text-center font-bold">Sign Up to Get Started</p>
        <AuthForm mode={AuthMode.SIGN_UP} />
      </div>
    </div>
  );
};

export default SignUpPage;
