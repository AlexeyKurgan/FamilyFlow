import { useSelector } from "react-redux";
import Button from "../../../shared/components/Button";
import { RootState } from "../../../store/store";
import { Avatar } from "@mui/material";
import { fetchFamilyMembers } from "../../../auth/api/utils/userUtils";
import { useEffect, useState } from "react";
import { User } from "../../../shared/components/modal/addTaskModal/AddTaskModal";

const ProfilePage = () => {
  const { userProfile } = useSelector((state: RootState) => state.profile);
  const [familyMembers, setFamilyMembers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadFamilyMembers = async () => {
      setLoading(true);
      try {
        const members = await fetchFamilyMembers();
        const filteredMembers = members.filter(
          (member) => member.uuid !== userProfile?.uuid
        );
        setFamilyMembers(filteredMembers);
      } finally {
        setLoading(false);
      }
    };
    if (userProfile?.uuid) {
      loadFamilyMembers();
    }
  }, [userProfile?.uuid]);

  return (
    <div className="flex flex-col items-center px-6  min-h-screen">
      <div className="relative w-full">
        <div className="relative h-32 bg-gradient-to-r from-amber-400 to-pink-400 rounded-t-xl flex justify-center items-center">
          <div className="relative">
            <Avatar
              className="!w-29 !h-29 bg-white border-4 border-gray-100 rounded-full shadow-md"
              alt={`${userProfile?.name} ${userProfile?.last_name}`}
              src={userProfile?.profiles[0]?.avatar_url?.toString() || ""}
            />
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              className="absolute left-[120px] bottom-[5px]  opacity-0 cursor-pointer"
              onChange={(e) => console.log(e.target.files)}
            />
            <label
              htmlFor="avatar-upload"
              className="absolute bottom-[5px] left-[120px] bg-white p-2 rounded-[8px] cursor-pointer text-[1em] font-bold text-gray-800"
            >
              Change
            </label>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <h2 className="text-2xl font-semibold text-gray-900">Profile Edit</h2>

          <div className="mt-4 text-left">
            <label className="text-gray-600">User Name</label>
            <input
              type="text"
              className="w-full p-4 border border-gray-100 shadow-2xs rounded-md mt-1 focus:ring-2 focus:ring-amber-400 focus:outline-none"
              placeholder={userProfile?.name}
            />
          </div>

          <div className="mt-4 text-left">
            <label className="text-gray-600">Description</label>
            <textarea
              className="w-full p-4 border border-gray-100 shadow-2xs rounded-md mt-1 focus:ring-2 focus:ring-amber-400 focus:outline-none"
              placeholder={userProfile?.profiles[0].bio_info}
            ></textarea>
          </div>

          <div className="mt-6 p-4 bg-gray-100 rounded-lg text-left">
            <h3 className="text-lg font-medium">UUID family</h3>
            <div className="flex items-center justify-between mt-2 bg-white p-5 rounded-md">
              <span className="text-gray-700 select-all text-sm">
                {userProfile?.family_id}
              </span>
              <button className="bg-amber-400 text-white px-3 py-2 rounded-md text-sm hover:bg-amber-500">
                Copy
              </button>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-100 rounded-lg text-left">
            <h3 className="text-lg font-medium">Family members</h3>
            {loading ? (
              <p className="text-gray-600 mt-2">Loading family members...</p>
            ) : familyMembers.length > 0 ? (
              <ul className="mt-3 space-y-2">
                {familyMembers.map((member) => (
                  <li
                    key={member.uuid}
                    className="flex items-center gap-3 p-3 bg-white rounded-md shadow-sm"
                  >
                    <Avatar
                      className="!w-14 !h-14"
                      alt={`${member.name} ${member.last_name}`}
                      src={member.avatar_url || ""}
                    />
                    <span className="text-gray-800 text-sm">
                      {member.name} {member.last_name}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600 mt-2">No family members found.</p>
            )}
          </div>

          <div className="flex justify-center">
            <Button
              type="button"
              className="mt-6 text-[1.2em] text-white font-bold bg-amber-400 
                                hover:scale-[1.1] pl-7 justify-center max-w-[200px]"
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
