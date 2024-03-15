import React, { useEffect, useState } from "react";
import GradeDropdown from "../components/dropdowns/GradeDropdown";
import StudentGrades from "../components/StudentGrades";
import axios from "axios";
import getCookie from "../apis/getCookies";
import { getTeacher } from "../apis/get";

const Grades = () => {

  const [classroom, setClassroom] : any = useState([{}]);
  const [classrooms, setClassrooms] : any = useState([]);
  const [grades, setGrades] : any =useState([]);
  const[modules, setModules] : any = useState([]);


  const [students, setStudents] : any = useState([]);


  const[currentUser, setCurrentUser]: any = useState({
    first_name:"",
    last_name:"",
    id:"",
    class:"",
    gradesAverage:0,
    modules:[
      {
        name:""
      }
    ]
  });

  const token = getCookie("jwt");

  const getAllData =  async ()=>{
  
      const resModules = await axios.get("http://localhost:6868/api/modules",{
        headers:{
            'Authorization': `Bearer ${token}`,
            'Content-Type' : 'application/json',
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',   
        }});
      
    const students = await getStudents();
    const classroomsData = await getClassrooms();
    const modulesData = resModules.data;
    

      setStudents(students);
      setClassrooms(classroomsData);
      setModules(modulesData);
  }

  const getClassrooms = async ()=>{
    const resClassrooms = await axios.get("http://localhost:6868/api/classrooms",{
      headers:{
          'Authorization': `Bearer ${token}`,
          'Content-Type' : 'application/json',
          'Access-Control-Allow-Credentials': true,
          'Access-Control-Allow-Origin' : '*',
          'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',   
      }});
    
      const resTeachers = await axios.get("http://localhost:6868/api/teachers",{
      headers:{
          'Authorization': `Bearer ${token}`,
          'Content-Type' : 'application/json',
          'Access-Control-Allow-Credentials': true,
          'Access-Control-Allow-Origin' : '*',
          'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',   
      }});

      const classroomsData = resClassrooms.data;
      const teachers = resTeachers.data;

    for( let i = 0 ; i < classroomsData.length; i++){
      let classTeachers : any = [];
      for(let j=0; j< teachers.length; j++){
        if(classroomsData[i].teacher == teachers[j].id){
          classTeachers.push(teachers[j]);
        }
        classroomsData[i].teachers = classTeachers;
        classroomsData[i].numOfTeachers = classTeachers.length;
      }
    }
    

    for(let i=0; i < classroomsData.length; i++){
      let classStudents : any = [];
      for(let j=0; j< students.length; j++){
        if(classroomsData[i].name == students[j].class){
          classStudents.push(students[j]);
        }
        classroomsData[i].students = classStudents;
        classroomsData[i].numOfStudents = classStudents.length;
    }
  }
    return classroomsData;
  }

  const setModulesForStudents = (student, modules)=>{
    for(let i =0; i< student.grades.length; i++ ){
      student["modules"] = [];
      student.grades[i]["moduleName"] = "";
      for(let j = 0; j< modules.length; j++){  
        if(student.grades[i].module == modules[j].id){
          student.grades[i]["moduleName"]= modules[j].name;
          student["modules"].push(modules[j]);
        }
      }
    } 
    return student;
  }

 const getStudents = async ()=>{
  const resGrades = await axios.get("http://localhost:6868/api/grades",{
    headers:{
        'Authorization': `Bearer ${token}`,
        'Content-Type' : 'application/json',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',   
    }});
    const resStudents = await axios.get("http://localhost:6868/api/students", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
    });
    const resModules = await axios.get("http://localhost:6868/api/modules",{
        headers:{
            'Authorization': `Bearer ${token}`,
            'Content-Type' : 'application/json',
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',   
        }});

    const students = resStudents.data;
    const gradesData = resGrades.data;
    const modulesData = resModules.data;

    for( let i=0; i < students.length; i++){
      let sum = 0;
      let count = 0;
      students[i]["grades"] = [];
      for(let j=0; j < gradesData.length; j++){
        if( students[i].id == gradesData[j].student){
          students[i]["grades"].push(gradesData[j]);
          sum += gradesData[j].grade;
          count++;
        }
        if( count > 0 ){
        students[i].gradesAverage = sum / count
        }
        else{
          students[i].gradesAverage = 0;
        }
      }
    } 


    for( let i =0; i < students.length; i++){
      
        students[i] = setModulesForStudents(students[i], modulesData)
        
    }

    return students;
  }

  const changeUser = (user)=>{
   setCurrentUser(user)

   
  }

  
  const search = async (event)=>{

    
    const allStudents = await getStudents();

    const input = event.target.value;
    setTimeout(async ()=>{
      
      const newStudents = allStudents.filter((item)=> item.last_name.includes(input));
      setStudents(newStudents);
    },1000)
  }

  const selectClassroom = (event)=>{
    const value = event.target.value;
    const selectedClass = classrooms.find((item)=> item.name == value);
    setClassroom(selectedClass);
    
    setStudents(selectedClass.students);
    setCurrentUser(selectedClass.students[0])
    
  }



  useEffect(()=>{
      getAllData();
  },[])


  return (
    <section className="w-4/5">
      <p className="px-6 pt-6 font-semibold text-2xl">Grades</p>
      <p className="px-6 font-normal text-slate-500">
        Select Classrom and Check Individual grade of each student
      </p>
      <div className="ml-6 mt-10  flex">
        <select
          className="border-2 border-gray-200 rounded-md p-2 w-[200px] outline-none "
          id="classrooms"
          onChange={selectClassroom}
        >
          <option value="">Select Classroom</option>
          {classrooms && classrooms.map((item)=>{
            return(
              <option value={item.name}>{item.name}</option>
            );
          })}
        
        </select>
      </div>

      <div className="flex w-[98%] mx-[1%] border border-slate-400 rounded-lg mt-6 mb-2 min-h-[calc(100vh_-_100px)]">
        <div className="student-list-details w-[30%]">
          <div className="title flex items-center">
            <p className="font-semibold text-xl pl-4 pr-1 py-4">Students</p>
            <p className="font-ligth text-lg text-slate-400">({students.length})</p>
          </div>

          <div className="input px-4 mt-2 ">
            <label
              htmlFor="search"
              className="relative text-gray-400 focus-within:text-gray-600 block"
            >
              <svg
                width="15"
                height="15"
                className="pointer-events-none absolute top-1/2 transform -translate-y-1/2 ml-2"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.5 17.5L14.5834 14.5833M16.6667 9.58333C16.6667 13.4954 13.4954 16.6667 9.58333 16.6667C5.67132 16.6667 2.5 13.4954 2.5 9.58333C2.5 5.67132 5.67132 2.5 9.58333 2.5C13.4954 2.5 16.6667 5.67132 16.6667 9.58333Z"
                  stroke="#667085"
                  stroke-width="1.66667"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>

              <input
                type="text"
                name="search"
                onChange={search}
                placeholder="Student ID or name"
                className="form-input w-full outline-none pr-2 pl-8 py-2 border border-slate-400 rounded-lg"
              />
            </label>
          </div>

          <p className="px-4 mt-4 italic font-sm text-slate-400">
            Student list
          </p>

          <div className="student-list px-4 mt-2 max-h-[calc(100vh_-_100px)] overflow-auto scrollbar-thumb-slate-300 scrollbar-thin scrollbar-h-[15px]">
            {students.length > 0 && students.map((item, index) => {
              return (
                <div className={ currentUser.id == item.id ? "flex justify-between items-center py-1 bg-purple-100 text-purple-600 rounded-lg p-2 cursor-pointer" :"flex justify-between items-center py-1 p-2 cursor-pointer"} onClick={()=>{changeUser(item)}}>
                  <div className="flex">
                    <svg
                      width="25"
                      height="25"
                      className="aspect-square object-contain object-center w-10 self-center overflow-hidden shrink-0 max-w-full rounded-[50%]"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                    </svg>
                    <div className="username ml-2 text-left">
                      <p className="font-semibold text-sm">{item.first_name} {item.last_name}</p>
                      <p className="text-sm font-light">ID: {item.id}</p>
                    </div>
                  </div>
                  <p>{Number.isNaN(item.gradesAverage) ? 0 : item.gradesAverage}</p>
                </div>
              );
            })}
          </div>

        </div>


        <div className="w-[68%] h-screen mx-[1%] mt-4 mb-2 border border-slate-400 rounded-lg">
          <StudentGrades user={currentUser} />
        </div>
      </div>
    </section>
  );
};

export default Grades;
