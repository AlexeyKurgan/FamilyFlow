import { FaCircleInfo } from "react-icons/fa6";
import CustomTooltip from "../../../shared/components/tooltip/Tooltip";

const Resources = () => {
  return (
    <section className="flex items-center">
      <h1 className="text-[2.3em]">Resources</h1>
      <CustomTooltip
        className=""
        placement="top"
        title={"INFO"}
        component={"button"}
      >
        <FaCircleInfo size={25} />
      </CustomTooltip>
    </section>
  );
};

export default Resources;
