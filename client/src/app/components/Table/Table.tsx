import { FaEdit } from "react-icons/fa";
import CustomTooltip from "../../../shared/components/tooltip/Tooltip";
import { MdNoteAdd } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { useState } from "react";

const Table = () => {
  const [currentPage, setCurrentPage] = useState(1);
  //   const itemsPerPage = 3;
  return (
    <div className="bg-gray-900 text-white rounded-lg shadow-lg">
      {/* Header */}
      <div
        className="grid grid-cols-[14%_37%_9%_9%_11%_repeat(auto-fit,minmax(50px,1fr))]
         gap-2 bg-[#fabb18]
         text-[1.2em]
         text-black font-bold py-6 px-4"
      >
        <span className="flex items-center">Title</span>
        <span className="flex items-center">Description</span>
        <span className="flex items-center">Status</span>
        <span className="flex items-center">Priority</span>
        <span className="flex items-center">Assign From</span>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className="max-h-[270px] overflow-auto scrollbar">
        {/* Row */}
        {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
          <div
            key={index}
            className="grid grid-cols-[14%_37%_9%_9%_11%_repeat(auto-fit,minmax(50px,1fr))] 
                       gap-2 border-b-4 border-amber-400 last:border-b-0 bg-gray-800 py-6 px-4
                       "
          >
            <CustomTooltip
              className="!cursor-auto !rounded-[0] !text-white !text-[1em] !justify-start !relative"
              placement="top"
              title={"task 1 adsdadsadsad"}
              component={"div"}
              disableRipple={true}
            >
              <span className=""> Task 1</span>
            </CustomTooltip>
            <CustomTooltip
              className="!cursor-auto !rounded-[0] !text-white !text-[1em] !justify-start"
              placement="top"
              disableRipple={true}
              title={
                "Do something asdasdadadasdasdasd asdasdassd asdasda dasdasd asdasdasdasd dasdadadadadad"
              }
              component={"div"}
            >
              <span className="">Do something</span>
            </CustomTooltip>
            <CustomTooltip
              className="!cursor-auto !rounded-[0] !text-white !text-[1em] !justify-start"
              placement="top"
              disableRipple={true}
              title={"task 1 adsdadsadsad"}
              component={"div"}
            >
              <span>Pending</span>
            </CustomTooltip>
            <CustomTooltip
              className="!cursor-auto !rounded-[0] !text-white !text-[1em] !justify-start"
              placement="top"
              disableRipple={true}
              title={"Low priority adsdadsadsad"}
              component={"div"}
            >
              <span className="">Low</span>
            </CustomTooltip>
            <CustomTooltip
              className="!cursor-auto !rounded-[0] !text-white !text-[1em] !justify-start"
              placement="top"
              disableRipple={true}
              title={"Low priority adsdadsadsad"}
              component={"div"}
            >
              <span>John</span>
            </CustomTooltip>
            <CustomTooltip
              className="group !static"
              placement="top"
              disableRipple={true}
              title={"Add Task"}
              component={"div"}
            >
              <MdNoteAdd
                size={25}
                className="text-white group-hover:text-amber-400"
              />
            </CustomTooltip>
            <CustomTooltip
              className="group"
              placement="top"
              disableRipple={true}
              title={"Edit task"}
              component={"div"}
            >
              <FaEdit
                className="text-white group-hover:text-amber-400"
                size={25}
              />
            </CustomTooltip>
            <CustomTooltip
              className="group"
              placement="top"
              disableRipple={true}
              title={"Delete task"}
              component={"div"}
            >
              <AiFillDelete
                className="text-white group-hover:text-amber-400"
                size={25}
              />
            </CustomTooltip>
          </div>
        ))}
      </div>
      {/* Table Pagination */}
      <div className="flex justify-center gap-2 mt-4">
        <button
          className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Prev
        </button>
        <span className="text-white">
          {currentPage} / {10}
        </span>
        <button
          className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
          disabled={currentPage === 10}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Table;
