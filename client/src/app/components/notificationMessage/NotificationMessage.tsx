interface notificationMessageProps {
  isPanelShow: boolean;
  // onMenuClose: () => void;
  //   anchorEl: null | HTMLElement;
}

const NotificationMessage = ({ isPanelShow }: notificationMessageProps) => {
  return (
    <>
      {isPanelShow && (
        <div
          className=" bg-black border-amber-400 rounded-md z-10 absolute p-[20px] top-[45px] left-[-600px] w-[750px] h-[350px] 
        max-h-[450px] max-w-[750px] overflow-hidden"
        >
          <ul className="text-[.8em] h-full font-bold list-none border-2 scrollbar overflow-auto">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => (
              <li
                key={index}
                className="flex items-center justify-between mb-2.5 nth-[odd]:bg-amber-400 mr-[20px] nth-[odd]:text-black nth-[even]:text-amber-400"
              >
                <span className="p-1.5 min-w-[120px]">выучить Реакт</span>
                <p className="p-1.5 max-w-[250px] min-w-[250px] overflow-hidden">
                  как можно поскрее. Это строка нужна для тестирования длинны
                  текста что бы потом можно его было обрезать
                </p>
                <p className="p-1.5">Олена Курган</p>
                <p className="p-1.5">
                  <span>18 March</span>
                  <span> 2025 |</span>
                  <span> 18:35 AM</span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default NotificationMessage;
