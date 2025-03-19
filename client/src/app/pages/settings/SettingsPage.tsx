import Button from "../../../shared/components/Button";
import CustomTooltip from "../../../shared/components/tooltip/Tooltip";
import { FaCircleInfo } from "../../../shared/react-icons/icons";

const SettingsPage = () => {
  return (
    <div className="flex flex-col px-[24px] py-[24px] pt-0">
      <div className="flex items-center">
        <h1 className="text-[2.3em] mb-3.5">Settings</h1>
        <CustomTooltip
          className=""
          placement="top"
          title={"INFO"}
          component={"button"}
        >
          <FaCircleInfo size={25} />
        </CustomTooltip>
      </div>

      <div className="w-full">
        <div className="bg-white p-6 rounded-xl shadow-md text-center ">
          <div className="mt-4 text-left">
            <label className="text-gray-600">Уведомления</label>
            <select className="w-full p-2 border rounded-md mt-1 focus:ring-2 focus:ring-amber-400 focus:outline-none">
              <option>Включены</option>
              <option>Отключены</option>
            </select>
          </div>

          <div className="mt-4 text-left">
            <label className="text-gray-600">Мова Інтерфейсу</label>
            <select className="w-full p-2 border rounded-md mt-1 focus:ring-2 focus:ring-amber-400 focus:outline-none">
              <option>English</option>
              <option>Українська</option>
            </select>
          </div>

          <div className="mt-4 text-left">
            <label className="text-gray-600">Тема оформления</label>
            <select className="w-full p-2 border rounded-md mt-1 focus:ring-2 focus:ring-amber-400 focus:outline-none">
              <option>Светлая</option>
              <option>Темная</option>
              <option>Системная</option>
            </select>
          </div>

          <div className="flex justify-center">
            <Button
              type="button"
              className="mt-6 text-[1.2em] text-white font-bold bg-amber-400 
                                hover:scale-[1.1] pl-7 justify-center max-w-[200px]"
            >
              Сохранить
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
