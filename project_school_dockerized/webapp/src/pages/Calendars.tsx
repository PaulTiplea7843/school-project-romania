import React from "react";

const Calendars = ()=>{
    return(
        <section>
      <div className="flex items-center justify-between p-4 w-full min-h-[50px] border-l border-r border-b border-gray-300  rounded-b-xl shadow-xl">
        <a
          className="border-r border-gray-400 px-8 font-semibold"
          href="/dashboard"
        >
          Dashboard
        </a>
        <a
          className="border-r border-gray-400 px-8 font-semibold"
          href="/teachers"
        >
          Teachers
        </a>
        <a
          className="border-r border-gray-400 px-8 font-semibold"
          href="/students"
        >
          Students
        </a>
        <a
          className="border-r border-gray-400 px-8 font-semibold"
          href="/classrooms"
        >
          Class rooms
        </a>
        <a
          className="border-r border-gray-400 px-8 font-semibold"
          href="/calendars"
        >
          Calendars
        </a>
        <a
          className="border-r border-gray-400 px-8 font-semibold"
          href="/grades"
        >
          Grades
        </a>
        <a
          className="border-r border-gray-400 px-8 font-semibold"
          href="/rewards"
        >
          Rewards
        </a>
        <a
          className="border-r border-gray-400 px-8 font-semibold"
          href="/teacher-review"
        >
          Teacher review
        </a>
        <a
          className="border-r border-gray-400 px-8 font-semibold"
          href="/student-gaps"
        >
          Student Gaps
        </a>
        <a className="px-8 font-semibold" href="/psycological-test">
          Psycolgical test
        </a>
      </div>
      <section className="flex justify-between">
        <div className="text-center w-1/6 border-2 mt-4 h-[calc(100vh_-_100px)]  border-gray-200 shadow-2xl rounded-xl  mb-10 ml-2">
          <h1 className="font-bold mb-4 mt-4 text-xl">Class rooms</h1>
          <p className="font-semibold bg-slate-100 cursor-pointer ">
            Classroom 1
          </p>
          <p className="font-semibold bg-white cursor-pointer ">
            Classroom 2
          </p>
          <p className="font-semibold bg-slate-100 cursor-pointer ">
            Classroom 1
          </p>
        </div>
        <div className=" w-4/5 border-2 mt-4 h-[calc(100vh_-_100px)]  border-gray-200 shadow-2xl rounded-xl mr-4">
          <div className="top flex">
          <p className="mt-4 ml-8 text-2xl">
            <b>December</b> 2023
          </p>

          <div className="pages-toggle flex justify-evenly items-center w-[200px] min-h-[40px] max-h-[50px] border rounded-3xl mt-4 ml-11 bg-gray-200">
                <div className="w-2/4 flex items-center justify-center h-full text-center bg-green-500 rounded-3xl cursor-pointer">
                    <p>Absences</p>
                </div>
                <div className="w-2/4 flex items-center justify-center h-full text-center rounded-3xl cursor-pointer">
                    <p>Schedule</p>
                </div>
          </div>
          </div>
        
        </div>
        
      </section>
    </section>
    )
    ;
}
export default Calendars;