import { FaCircleInfo } from "react-icons/fa6";
import CustomTooltip from "../../../shared/components/tooltip/Tooltip";

export const Integrations = () => {
  return (
    <div className="flex flex-col px-[24px] py-[24px] pt-0 gap-4">
      <section className="flex items-center">
        <h1 className="text-[2.3em]">Integrations</h1>
        <CustomTooltip
          className=""
          placement="top"
          title={"INFO"}
          component={"button"}
        >
          <FaCircleInfo size={25} />
        </CustomTooltip>
      </section>
    </div>
  );
};

export default Integrations;
