import { FaCircleInfo } from "react-icons/fa6";
import CustomTooltip from "../../../shared/components/tooltip/Tooltip";

const AchievementPage = () => {
  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-[2.3em]">Achievements</h1>
        <CustomTooltip
          className=""
          placement="top"
          title={"INFO"}
          component={"button"}
        >
          <FaCircleInfo size={25} />
        </CustomTooltip>
      </div>
    </>
  );
};

export default AchievementPage;
