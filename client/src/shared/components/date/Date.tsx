import { MdCalendarToday } from "react-icons/md";
import Card from "../card/Card";
import { useEffect, useState } from "react";
import DateObject from "react-date-object";

interface IDateProps {
  classNames?: string;
}

const Date = ({ classNames }: IDateProps) => {
  const [currentDay, setCurrentDay] = useState("");
  const [currentDateWithOutDay, setCurrentDateWithOutDay] = useState("");

  useEffect(() => {
    const date = new DateObject();

    setCurrentDay(date.format("dddd"));
    setCurrentDateWithOutDay(date.format("DD MMM YYYY, hh:mm a"));
  }, [currentDay, currentDateWithOutDay]);

  return (
    <Card className={classNames}>
      <div className={`flex items-center`}>
        <MdCalendarToday size={48} color="#4a90e2" className="mr-5" />
        <h2>{currentDay}</h2>
      </div>

      <p>{currentDateWithOutDay}</p>
    </Card>
  );
};

export default Date;
