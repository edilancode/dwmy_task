/* eslint-disable react/prop-types */
import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";


const Header = ({time, dayMonthYear, setTasks, mainDisplay, setMainDisplay, setPeriod}) => {
  const dates = [
    {day:"Day", value:"Day", margin:"70px", date: time.format('DD')},
    {week:"Week", value:"Week", margin:"166px", date: time.format('dddd')},
    {month:"Month", value:"Month", margin:"268px", date: time.format('MMMM')},
    {year:"Year", value:"Year", margin:"370px", date: time.format('YYYY')},
    {all: "All", margin:"460px", date: time.format('MM DD YYYY'), check: false}
    ];

    const ref = useRef();

    const handleClick = (index) => {
      const storedList = JSON.parse(localStorage.getItem('localTasks'));
      const filtered = storedList.filter((task) => {
        if (task.period === index.value ||
            task.isChecked === index.check)
            return task;
      })
      ref.current.style.marginLeft=(index.margin);
      setPeriod(index.value);
      setTasks(filtered);
      setMainDisplay(index.date);
    };
  
    return (
      <div className="header">
        <section className="navBar">
          {dates.map((dates, index) => (
            <li key={index} onClick={() => handleClick(dates)}>
              {dates.day}{dates.week}{dates.month}{dates.year}{dates.all}
            </li>
          ))}
        </section>
        <span ref={ref} className="horizontal-line"/>
        <section className="display">
          <FaChevronLeft className="chevLeft"/>
          <h1>{mainDisplay}</h1>
          <FaChevronRight className="chevRight"/>
          <p>{dayMonthYear}</p>
        </section>
      </div>
    );
};

export default Header;