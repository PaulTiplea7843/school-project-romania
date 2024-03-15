import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import deleteCookie from "../apis/deleteCookies";
import getCookie from "../apis/getCookies";

const RootLayout = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const routePath = location.pathname;
  console.log(routePath);
  const token = getCookie("jwt");
  const [user, setUser] : any = useState({});


  async function logout() {
    
    document.cookie = "jwt= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
    document.cookie = "email= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
      window.location.reload();
   
  }
  const email = getCookie("email"); 

  const getData = async ()=>{
    const resData = await axios.get("http://localhost:6868/api/users",{
      headers:{
          'Authorization': `Bearer ${token}`,
          'Content-Type' : 'application/json',
          'Access-Control-Allow-Credentials': true,
          'Access-Control-Allow-Origin' : '*',
          'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',   
      }});
    
      const data = resData.data;
      const user = data.filter((item)=> item.email == email);
      console.log(user);
      

      return user;
  }
  useEffect(()=>{
    //setUser(getData)
   
  },[])

  const menuItems = [
    {
      name: "Dashboard",
      pathname: "/dashboard",
      route: "dashboard",
      active: false,
      svg: (
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18.5625 3.4375H3.4375C3.07283 3.4375 2.72309 3.58237 2.46523 3.84023C2.20737 4.09809 2.0625 4.44783 2.0625 4.8125V17.1875C2.0625 17.5522 2.20737 17.9019 2.46523 18.1598C2.72309 18.4176 3.07283 18.5625 3.4375 18.5625H18.5625C18.9272 18.5625 19.2769 18.4176 19.5348 18.1598C19.7926 17.9019 19.9375 17.5522 19.9375 17.1875V4.8125C19.9375 4.44783 19.7926 4.09809 19.5348 3.84023C19.2769 3.58237 18.9272 3.4375 18.5625 3.4375ZM17.1875 15.125C17.3698 15.125 17.5447 15.1974 17.6736 15.3264C17.8026 15.4553 17.875 15.6302 17.875 15.8125C17.875 15.9948 17.8026 16.1697 17.6736 16.2986C17.5447 16.4276 17.3698 16.5 17.1875 16.5H4.8125C4.63016 16.5 4.4553 16.4276 4.32636 16.2986C4.19743 16.1697 4.125 15.9948 4.125 15.8125V6.1875C4.125 6.00516 4.19743 5.8303 4.32636 5.70136C4.4553 5.57243 4.63016 5.5 4.8125 5.5C4.99484 5.5 5.1697 5.57243 5.29864 5.70136C5.42757 5.8303 5.5 6.00516 5.5 6.1875V11.5947L8.4975 9.09648C8.6114 9.00156 8.75294 8.94601 8.901 8.93811C9.04906 8.93022 9.19571 8.97039 9.31906 9.05266L13.0144 11.5182L16.7449 8.40898C16.8851 8.29229 17.0659 8.23606 17.2475 8.25266C17.4291 8.26926 17.5967 8.35733 17.7134 8.4975C17.8301 8.63767 17.8864 8.81846 17.8698 9.00009C17.8532 9.18172 17.7651 9.34932 17.6249 9.46602L13.4999 12.9035C13.386 12.9984 13.2445 13.054 13.0964 13.0619C12.9484 13.0698 12.8017 13.0296 12.6784 12.9473L8.98305 10.4818L5.5 13.3848V15.125H17.1875Z"
            fill={routePath == "/dashboard" ? "#7E3EE5" : "#7D7D7D"}
          />
        </svg>
      ),
    },
    {
      name: "Teachers",
      pathname: "/teachers",
      route: "teachers",
      active: false,
      svg: (
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18.5625 3.4375H3.4375C3.07283 3.4375 2.72309 3.58237 2.46523 3.84023C2.20737 4.09809 2.0625 4.44783 2.0625 4.8125V17.1875C2.0625 17.5522 2.20737 17.9019 2.46523 18.1598C2.72309 18.4176 3.07283 18.5625 3.4375 18.5625H4.5882C4.71832 18.5625 4.84577 18.5257 4.95576 18.4561C5.06575 18.3866 5.15374 18.2873 5.20953 18.1698C5.54384 17.4639 6.07167 16.8675 6.73161 16.4499C7.39155 16.0322 8.1565 15.8105 8.9375 15.8105C9.7185 15.8105 10.4834 16.0322 11.1434 16.4499C11.8033 16.8675 12.3312 17.4639 12.6655 18.1698C12.7213 18.2873 12.8093 18.3866 12.9192 18.4561C13.0292 18.5257 13.1567 18.5625 13.2868 18.5625H18.5625C18.9272 18.5625 19.2769 18.4176 19.5348 18.1598C19.7926 17.9019 19.9375 17.5522 19.9375 17.1875V4.8125C19.9375 4.44783 19.7926 4.09809 19.5348 3.84023C19.2769 3.58237 18.9272 3.4375 18.5625 3.4375ZM8.9375 14.4375C8.3936 14.4375 7.86192 14.2762 7.40968 13.974C6.95745 13.6719 6.60497 13.2424 6.39683 12.7399C6.18869 12.2374 6.13423 11.6844 6.24034 11.151C6.34645 10.6176 6.60836 10.1276 6.99296 9.74296C7.37755 9.35836 7.86755 9.09645 8.401 8.99034C8.93445 8.88423 9.48738 8.93869 9.98988 9.14683C10.4924 9.35497 10.9219 9.70745 11.224 10.1597C11.5262 10.6119 11.6875 11.1436 11.6875 11.6875C11.6875 12.4168 11.3978 13.1163 10.882 13.632C10.3663 14.1478 9.66685 14.4375 8.9375 14.4375ZM18.5625 17.1875H13.701C13.4013 16.6707 13.0193 16.2063 12.5701 15.8125H16.5C16.6823 15.8125 16.8572 15.7401 16.9861 15.6111C17.1151 15.4822 17.1875 15.3073 17.1875 15.125V6.875C17.1875 6.69266 17.1151 6.5178 16.9861 6.38886C16.8572 6.25993 16.6823 6.1875 16.5 6.1875H5.5C5.31766 6.1875 5.1428 6.25993 5.01386 6.38886C4.88493 6.5178 4.8125 6.69266 4.8125 6.875V15.125C4.81242 15.2775 4.86304 15.4256 4.95638 15.5462C5.04972 15.6668 5.18049 15.7529 5.32812 15.791C4.86854 16.1892 4.47849 16.6612 4.17398 17.1875H3.4375V4.8125H18.5625V17.1875Z"
            fill={routePath == "/teachers" ? "#7E3EE5" : "#7D7D7D"}
          />
        </svg>
      ),
    },
    {
      name: "Students",
      pathname: "/students",
      route: "students",
      active: false,
      svg: (
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.4674 4.84779L11.2174 2.09779C11.0763 2.05074 10.9237 2.05074 10.7826 2.09779L2.53258 4.84779C2.39568 4.89342 2.27662 4.98097 2.19225 5.09804C2.10788 5.21511 2.06249 5.35575 2.0625 5.50005V12.3751C2.0625 12.5574 2.13493 12.7323 2.26386 12.8612C2.3928 12.9901 2.56766 13.0626 2.75 13.0626C2.93234 13.0626 3.1072 12.9901 3.23614 12.8612C3.36507 12.7323 3.4375 12.5574 3.4375 12.3751V6.45396L6.32414 7.4156C5.5572 8.65465 5.31331 10.1474 5.64604 11.5661C5.97876 12.9848 6.8609 14.2135 8.09875 14.9824C6.55187 15.5891 5.21469 16.6865 4.23672 18.187C4.18586 18.2626 4.15053 18.3475 4.13279 18.4369C4.11504 18.5263 4.11524 18.6183 4.13337 18.7076C4.1515 18.7969 4.18719 18.8817 4.23838 18.957C4.28957 19.0324 4.35523 19.0969 4.43154 19.1466C4.50785 19.1964 4.5933 19.2305 4.68291 19.247C4.77253 19.2634 4.86452 19.2619 4.95354 19.2425C5.04256 19.2231 5.12684 19.1862 5.20147 19.134C5.2761 19.0817 5.3396 19.0151 5.38828 18.9381C6.68336 16.9512 8.72867 15.8126 11 15.8126C13.2713 15.8126 15.3166 16.9512 16.6117 18.9381C16.7126 19.088 16.8683 19.1921 17.0453 19.2281C17.2224 19.264 17.4064 19.2288 17.5577 19.1302C17.709 19.0315 17.8154 18.8772 17.8539 18.7007C17.8923 18.5242 17.8598 18.3397 17.7633 18.187C16.7853 16.6865 15.443 15.5891 13.9012 14.9824C15.1379 14.2136 16.0192 12.9857 16.3519 11.568C16.6846 10.1503 16.4414 8.65858 15.6759 7.41989L19.4674 6.15661C19.6043 6.111 19.7234 6.02346 19.8078 5.9064C19.8922 5.78933 19.9377 5.64867 19.9377 5.50435C19.9377 5.36003 19.8922 5.21937 19.8078 5.1023C19.7234 4.98523 19.6043 4.89769 19.4674 4.85208V4.84779ZM15.125 10.3126C15.1252 10.9647 14.9707 11.6076 14.6744 12.1885C14.378 12.7694 13.9481 13.2717 13.4199 13.6543C12.8918 14.0369 12.2805 14.2888 11.6362 14.3894C10.9918 14.4899 10.3328 14.4363 9.71321 14.2329C9.09361 14.0294 8.53108 13.682 8.07176 13.2191C7.61244 12.7561 7.26942 12.1909 7.07086 11.5697C6.8723 10.9485 6.82384 10.2891 6.92947 9.64559C7.0351 9.00206 7.2918 8.39274 7.67851 7.86763L10.7826 8.89888C10.9237 8.94593 11.0763 8.94593 11.2174 8.89888L14.3215 7.86763C14.8438 8.57575 15.1254 9.43264 15.125 10.3126Z"
            fill={routePath == "/students" ? "#7E3EE5" : "#7D7D7D"}
          />
        </svg>
      ),
    },
    {
      name: "Classroom",
      pathname: "/classrooms",
      route: "classrooms",
      active: false,
      svg: (
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.875 2.75H15.8125V2.0625C15.8125 1.88016 15.7401 1.7053 15.6111 1.57636C15.4822 1.44743 15.3073 1.375 15.125 1.375C14.9427 1.375 14.7678 1.44743 14.6389 1.57636C14.5099 1.7053 14.4375 1.88016 14.4375 2.0625V2.75H7.5625V2.0625C7.5625 1.88016 7.49007 1.7053 7.36114 1.57636C7.2322 1.44743 7.05734 1.375 6.875 1.375C6.69266 1.375 6.5178 1.44743 6.38886 1.57636C6.25993 1.7053 6.1875 1.88016 6.1875 2.0625V2.75H4.125C3.76033 2.75 3.41059 2.89487 3.15273 3.15273C2.89487 3.41059 2.75 3.76033 2.75 4.125V17.875C2.75 18.2397 2.89487 18.5894 3.15273 18.8473C3.41059 19.1051 3.76033 19.25 4.125 19.25H17.875C18.2397 19.25 18.5894 19.1051 18.8473 18.8473C19.1051 18.5894 19.25 18.2397 19.25 17.875V4.125C19.25 3.76033 19.1051 3.41059 18.8473 3.15273C18.5894 2.89487 18.2397 2.75 17.875 2.75ZM9.625 15.8125C9.625 15.9948 9.55257 16.1697 9.42364 16.2986C9.2947 16.4276 9.11984 16.5 8.9375 16.5C8.75516 16.5 8.5803 16.4276 8.45136 16.2986C8.32243 16.1697 8.25 15.9948 8.25 15.8125V11.4245L7.87016 11.6153C7.70697 11.6969 7.51804 11.7103 7.34495 11.6526C7.17186 11.5949 7.02878 11.4708 6.94719 11.3077C6.86559 11.1445 6.85217 10.9555 6.90986 10.7825C6.96756 10.6094 7.09165 10.4663 7.25484 10.3847L8.62984 9.69719C8.7347 9.64472 8.85123 9.61994 8.96836 9.6252C9.08549 9.63046 9.19933 9.6656 9.29906 9.72726C9.39878 9.78892 9.48108 9.87506 9.53813 9.97749C9.59518 10.0799 9.62508 10.1953 9.625 10.3125V15.8125ZM14.4375 15.125C14.6198 15.125 14.7947 15.1974 14.9236 15.3264C15.0526 15.4553 15.125 15.6302 15.125 15.8125C15.125 15.9948 15.0526 16.1697 14.9236 16.2986C14.7947 16.4276 14.6198 16.5 14.4375 16.5H11.6875C11.5598 16.5 11.4347 16.4644 11.3261 16.3973C11.2175 16.3302 11.1297 16.2342 11.0726 16.12C11.0155 16.0058 10.9913 15.8779 11.0028 15.7508C11.0142 15.6236 11.0609 15.5021 11.1375 15.4L13.6108 12.1026C13.667 12.0277 13.7074 11.9421 13.7294 11.851C13.7514 11.76 13.7545 11.6654 13.7386 11.5731C13.7227 11.4808 13.6882 11.3927 13.637 11.3142C13.5859 11.2357 13.5192 11.1686 13.4412 11.1168C13.3631 11.065 13.2753 11.0297 13.1831 11.0131C13.0909 10.9965 12.9963 10.9988 12.9051 11.0201C12.8139 11.0414 12.7279 11.081 12.6526 11.1367C12.5773 11.1923 12.5141 11.2628 12.467 11.3438C12.4231 11.4244 12.3636 11.4955 12.2919 11.5528C12.2202 11.6101 12.1377 11.6525 12.0493 11.6774C11.961 11.7023 11.8685 11.7093 11.7774 11.6979C11.6863 11.6865 11.5984 11.6569 11.5189 11.611C11.4394 11.5651 11.3699 11.5037 11.3145 11.4305C11.2591 11.3573 11.219 11.2737 11.1964 11.1847C11.1738 11.0957 11.1693 11.0031 11.1831 10.9124C11.1969 10.8216 11.2287 10.7345 11.2767 10.6562C11.5038 10.2632 11.8542 9.95614 12.2736 9.78252C12.693 9.60891 13.1579 9.57849 13.5964 9.69598C14.0348 9.81347 14.4222 10.0723 14.6986 10.4324C14.975 10.7924 15.1248 11.2336 15.125 11.6875C15.1265 12.1359 14.9803 12.5723 14.7091 12.9293L13.0625 15.125H14.4375ZM4.125 6.875V4.125H6.1875V4.8125C6.1875 4.99484 6.25993 5.1697 6.38886 5.29864C6.5178 5.42757 6.69266 5.5 6.875 5.5C7.05734 5.5 7.2322 5.42757 7.36114 5.29864C7.49007 5.1697 7.5625 4.99484 7.5625 4.8125V4.125H14.4375V4.8125C14.4375 4.99484 14.5099 5.1697 14.6389 5.29864C14.7678 5.42757 14.9427 5.5 15.125 5.5C15.3073 5.5 15.4822 5.42757 15.6111 5.29864C15.7401 5.1697 15.8125 4.99484 15.8125 4.8125V4.125H17.875V6.875H4.125Z"
            fill={routePath == "/classrooms" ? "#7E3EE5" : "#7D7D7D"}
          />
        </svg>
      ),
    },
    {
      name: "Calendars",
      pathname: "/calendars",
      route: "calendars",
      active: false,
      svg: (
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.875 2.75H15.8125V2.0625C15.8125 1.88016 15.7401 1.7053 15.6111 1.57636C15.4822 1.44743 15.3073 1.375 15.125 1.375C14.9427 1.375 14.7678 1.44743 14.6389 1.57636C14.5099 1.7053 14.4375 1.88016 14.4375 2.0625V2.75H7.5625V2.0625C7.5625 1.88016 7.49007 1.7053 7.36114 1.57636C7.2322 1.44743 7.05734 1.375 6.875 1.375C6.69266 1.375 6.5178 1.44743 6.38886 1.57636C6.25993 1.7053 6.1875 1.88016 6.1875 2.0625V2.75H4.125C3.76033 2.75 3.41059 2.89487 3.15273 3.15273C2.89487 3.41059 2.75 3.76033 2.75 4.125V17.875C2.75 18.2397 2.89487 18.5894 3.15273 18.8473C3.41059 19.1051 3.76033 19.25 4.125 19.25H17.875C18.2397 19.25 18.5894 19.1051 18.8473 18.8473C19.1051 18.5894 19.25 18.2397 19.25 17.875V4.125C19.25 3.76033 19.1051 3.41059 18.8473 3.15273C18.5894 2.89487 18.2397 2.75 17.875 2.75ZM9.625 15.8125C9.625 15.9948 9.55257 16.1697 9.42364 16.2986C9.2947 16.4276 9.11984 16.5 8.9375 16.5C8.75516 16.5 8.5803 16.4276 8.45136 16.2986C8.32243 16.1697 8.25 15.9948 8.25 15.8125V11.4245L7.87016 11.6153C7.70697 11.6969 7.51804 11.7103 7.34495 11.6526C7.17186 11.5949 7.02878 11.4708 6.94719 11.3077C6.86559 11.1445 6.85217 10.9555 6.90986 10.7825C6.96756 10.6094 7.09165 10.4663 7.25484 10.3847L8.62984 9.69719C8.7347 9.64472 8.85123 9.61994 8.96836 9.6252C9.08549 9.63046 9.19933 9.6656 9.29906 9.72726C9.39878 9.78892 9.48108 9.87506 9.53813 9.97749C9.59518 10.0799 9.62508 10.1953 9.625 10.3125V15.8125ZM14.4375 15.125C14.6198 15.125 14.7947 15.1974 14.9236 15.3264C15.0526 15.4553 15.125 15.6302 15.125 15.8125C15.125 15.9948 15.0526 16.1697 14.9236 16.2986C14.7947 16.4276 14.6198 16.5 14.4375 16.5H11.6875C11.5598 16.5 11.4347 16.4644 11.3261 16.3973C11.2175 16.3302 11.1297 16.2342 11.0726 16.12C11.0155 16.0058 10.9913 15.8779 11.0028 15.7508C11.0142 15.6236 11.0609 15.5021 11.1375 15.4L13.6108 12.1026C13.667 12.0277 13.7074 11.9421 13.7294 11.851C13.7514 11.76 13.7545 11.6654 13.7386 11.5731C13.7227 11.4808 13.6882 11.3927 13.637 11.3142C13.5859 11.2357 13.5192 11.1686 13.4412 11.1168C13.3631 11.065 13.2753 11.0297 13.1831 11.0131C13.0909 10.9965 12.9963 10.9988 12.9051 11.0201C12.8139 11.0414 12.7279 11.081 12.6526 11.1367C12.5773 11.1923 12.5141 11.2628 12.467 11.3438C12.4231 11.4244 12.3636 11.4955 12.2919 11.5528C12.2202 11.6101 12.1377 11.6525 12.0493 11.6774C11.961 11.7023 11.8685 11.7093 11.7774 11.6979C11.6863 11.6865 11.5984 11.6569 11.5189 11.611C11.4394 11.5651 11.3699 11.5037 11.3145 11.4305C11.2591 11.3573 11.219 11.2737 11.1964 11.1847C11.1738 11.0957 11.1693 11.0031 11.1831 10.9124C11.1969 10.8216 11.2287 10.7345 11.2767 10.6562C11.5038 10.2632 11.8542 9.95614 12.2736 9.78252C12.693 9.60891 13.1579 9.57849 13.5964 9.69598C14.0348 9.81347 14.4222 10.0723 14.6986 10.4324C14.975 10.7924 15.1248 11.2336 15.125 11.6875C15.1265 12.1359 14.9803 12.5723 14.7091 12.9293L13.0625 15.125H14.4375ZM4.125 6.875V4.125H6.1875V4.8125C6.1875 4.99484 6.25993 5.1697 6.38886 5.29864C6.5178 5.42757 6.69266 5.5 6.875 5.5C7.05734 5.5 7.2322 5.42757 7.36114 5.29864C7.49007 5.1697 7.5625 4.99484 7.5625 4.8125V4.125H14.4375V4.8125C14.4375 4.99484 14.5099 5.1697 14.6389 5.29864C14.7678 5.42757 14.9427 5.5 15.125 5.5C15.3073 5.5 15.4822 5.42757 15.6111 5.29864C15.7401 5.1697 15.8125 4.99484 15.8125 4.8125V4.125H17.875V6.875H4.125Z"
            fill="#7D7D7D"
          />
        </svg>
      ),
    },
    {
      name: "Grades",
      pathname: "/grades",
      route: "grades",
      active: false,
      svg: (
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.25 9.78742L9.20047 11.6875H7.29953L8.25 9.78742ZM19.9375 4.8125V18.5625C19.9376 18.6797 19.9077 18.7951 19.8506 18.8975C19.7936 18.9999 19.7113 19.0861 19.6116 19.1477C19.5118 19.2094 19.398 19.2445 19.2809 19.2498C19.1637 19.2551 19.0472 19.2303 18.9423 19.1778L16.5 17.9558L14.0577 19.1778C13.9621 19.2256 13.8568 19.2505 13.75 19.2505C13.6432 19.2505 13.5379 19.2256 13.4423 19.1778L11 17.9558L8.55766 19.1778C8.46214 19.2256 8.35681 19.2505 8.25 19.2505C8.14319 19.2505 8.03786 19.2256 7.94234 19.1778L5.5 17.9558L3.05766 19.1778C2.9528 19.2303 2.83627 19.2551 2.71914 19.2498C2.60201 19.2445 2.48817 19.2094 2.38844 19.1477C2.28872 19.0861 2.20642 18.9999 2.14937 18.8975C2.09232 18.7951 2.06242 18.6797 2.0625 18.5625V4.8125C2.0625 4.44783 2.20737 4.09809 2.46523 3.84023C2.72309 3.58237 3.07283 3.4375 3.4375 3.4375H18.5625C18.9272 3.4375 19.2769 3.58237 19.5348 3.84023C19.7926 4.09809 19.9375 4.44783 19.9375 4.8125ZM11.6153 13.4423L8.86531 7.94234C8.80829 7.82794 8.72051 7.7317 8.61181 7.66442C8.50312 7.59715 8.37783 7.56151 8.25 7.56151C8.12217 7.56151 7.99688 7.59715 7.88819 7.66442C7.77949 7.7317 7.69171 7.82794 7.63469 7.94234L4.88469 13.4423C4.80309 13.6055 4.78967 13.7945 4.84736 13.9675C4.90506 14.1406 5.02915 14.2837 5.19234 14.3653C5.35554 14.4469 5.54446 14.4603 5.71755 14.4026C5.89064 14.3449 6.03372 14.2208 6.11531 14.0577L6.61203 13.0625H9.88797L10.3847 14.0577C10.4251 14.1385 10.481 14.2105 10.5493 14.2697C10.6175 14.3289 10.6967 14.3741 10.7825 14.4026C10.8682 14.4312 10.9587 14.4426 11.0488 14.4362C11.1389 14.4298 11.2269 14.4057 11.3077 14.3653C11.3885 14.3249 11.4605 14.269 11.5197 14.2007C11.5789 14.1325 11.6241 14.0533 11.6526 13.9675C11.6812 13.8818 11.6926 13.7913 11.6862 13.7012C11.6798 13.6111 11.6557 13.5231 11.6153 13.4423ZM17.875 11C17.875 10.8177 17.8026 10.6428 17.6736 10.5139C17.5447 10.3849 17.3698 10.3125 17.1875 10.3125H15.8125V8.9375C15.8125 8.75516 15.7401 8.5803 15.6111 8.45136C15.4822 8.32243 15.3073 8.25 15.125 8.25C14.9427 8.25 14.7678 8.32243 14.6389 8.45136C14.5099 8.5803 14.4375 8.75516 14.4375 8.9375V10.3125H13.0625C12.8802 10.3125 12.7053 10.3849 12.5764 10.5139C12.4474 10.6428 12.375 10.8177 12.375 11C12.375 11.1823 12.4474 11.3572 12.5764 11.4861C12.7053 11.6151 12.8802 11.6875 13.0625 11.6875H14.4375V13.0625C14.4375 13.2448 14.5099 13.4197 14.6389 13.5486C14.7678 13.6776 14.9427 13.75 15.125 13.75C15.3073 13.75 15.4822 13.6776 15.6111 13.5486C15.7401 13.4197 15.8125 13.2448 15.8125 13.0625V11.6875H17.1875C17.3698 11.6875 17.5447 11.6151 17.6736 11.4861C17.8026 11.3572 17.875 11.1823 17.875 11Z"
            fill={routePath == "/grades" ? "#7E3EE5" : "#7D7D7D"}
          />
        </svg>
      ),
    },
    {
      name: "Chats",
      pathname: "/chats",
      route: "chats",
      active: false,
      svg: (
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18.5625 3.4375H3.4375C3.07283 3.4375 2.72309 3.58237 2.46523 3.84023C2.20737 4.09809 2.0625 4.44783 2.0625 4.8125V15.8125C2.0625 16.1772 2.20737 16.5269 2.46523 16.7848C2.72309 17.0426 3.07283 17.1875 3.4375 17.1875L8.55078 17.1927L9.82094 19.2698C9.94281 19.4731 10.1152 19.6414 10.3213 19.7584C10.5274 19.8755 10.7602 19.9373 10.9973 19.9378C11.2343 19.9383 11.4674 19.8775 11.674 19.7614C11.8806 19.6453 12.0537 19.4777 12.1765 19.2749L13.4518 17.1875H18.5625C18.9272 17.1875 19.2769 17.0426 19.5348 16.7848C19.7926 16.5269 19.9375 16.1772 19.9375 15.8125V4.8125C19.9375 4.44783 19.7926 4.09809 19.5348 3.84023C19.2769 3.58237 18.9272 3.4375 18.5625 3.4375ZM13.75 12.375H8.25C8.06766 12.375 7.8928 12.3026 7.76386 12.1736C7.63493 12.0447 7.5625 11.8698 7.5625 11.6875C7.5625 11.5052 7.63493 11.3303 7.76386 11.2014C7.8928 11.0724 8.06766 11 8.25 11H13.75C13.9323 11 14.1072 11.0724 14.2361 11.2014C14.3651 11.3303 14.4375 11.5052 14.4375 11.6875C14.4375 11.8698 14.3651 12.0447 14.2361 12.1736C14.1072 12.3026 13.9323 12.375 13.75 12.375ZM13.75 9.625H8.25C8.06766 9.625 7.8928 9.55257 7.76386 9.42364C7.63493 9.2947 7.5625 9.11984 7.5625 8.9375C7.5625 8.75516 7.63493 8.5803 7.76386 8.45136C7.8928 8.32243 8.06766 8.25 8.25 8.25H13.75C13.9323 8.25 14.1072 8.32243 14.2361 8.45136C14.3651 8.5803 14.4375 8.75516 14.4375 8.9375C14.4375 9.11984 14.3651 9.2947 14.2361 9.42364C14.1072 9.55257 13.9323 9.625 13.75 9.625Z"
            fill={routePath == "/chats" ? "#7E3EE5" : "#7D7D7D"}
          />
        </svg>
      ),
    },
    {
      name: "Rewards",
      pathname: "/rewards",
      route: "rewards",
      active: false,
      svg: (
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.8125 7.69742V7.21875C15.8125 5.06344 12.5615 3.4375 8.25 3.4375C3.93852 3.4375 0.6875 5.06344 0.6875 7.21875V10.6562C0.6875 12.4515 2.94336 13.878 6.1875 14.3052V14.7812C6.1875 16.9366 9.43852 18.5625 13.75 18.5625C18.0615 18.5625 21.3125 16.9366 21.3125 14.7812V11.3438C21.3125 9.56484 19.128 8.13656 15.8125 7.69742ZM4.8125 12.6216C3.12898 12.1516 2.0625 11.3773 2.0625 10.6562V9.44711C2.76375 9.94383 3.70305 10.3443 4.8125 10.6133V12.6216ZM11.6875 10.6133C12.797 10.3443 13.7362 9.94383 14.4375 9.44711V10.6562C14.4375 11.3773 13.371 12.1516 11.6875 12.6216V10.6133ZM10.3125 16.7466C8.62898 16.2766 7.5625 15.5023 7.5625 14.7812V14.4229C7.78852 14.4315 8.01711 14.4375 8.25 14.4375C8.58344 14.4375 8.90914 14.4263 9.22883 14.4074C9.58397 14.5346 9.94572 14.6424 10.3125 14.7305V16.7466ZM10.3125 12.9121C9.62964 13.013 8.94027 13.0633 8.25 13.0625C7.55973 13.0633 6.87036 13.013 6.1875 12.9121V10.8677C6.87137 10.9568 7.56035 11.001 8.25 11C8.93965 11.001 9.62863 10.9568 10.3125 10.8677V12.9121ZM15.8125 17.0371C14.4448 17.2376 13.0552 17.2376 11.6875 17.0371V14.9875C12.3712 15.0794 13.0602 15.1253 13.75 15.125C14.4397 15.126 15.1286 15.0818 15.8125 14.9927V17.0371ZM19.9375 14.7812C19.9375 15.5023 18.871 16.2766 17.1875 16.7466V14.7383C18.297 14.4693 19.2362 14.0688 19.9375 13.5721V14.7812Z"
            fill={routePath == "/rewards" ? "#7E3EE5" : "#7D7D7D"}
          />
        </svg>
      ),
    },
    {
      name: "Curriculum Setup",
      pathname: "/curriculum-setup",
      route: "curriculum-setup",
      active: false,
      svg: (
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18.5625 3.4375H3.4375C3.07283 3.4375 2.72309 3.58237 2.46523 3.84023C2.20737 4.09809 2.0625 4.44783 2.0625 4.8125V17.1875C2.0625 17.5522 2.20737 17.9019 2.46523 18.1598C2.72309 18.4176 3.07283 18.5625 3.4375 18.5625H18.5625C18.9272 18.5625 19.2769 18.4176 19.5348 18.1598C19.7926 17.9019 19.9375 17.5522 19.9375 17.1875V4.8125C19.9375 4.44783 19.7926 4.09809 19.5348 3.84023C19.2769 3.58237 18.9272 3.4375 18.5625 3.4375ZM3.4375 4.8125H18.5625V8.25H3.4375V4.8125ZM18.5625 17.1875H9.625V9.625H18.5625V17.1875Z"
            fill={routePath == "/curriculum-setup" ? "#7E3EE5" : "#7D7D7D"}
          />
        </svg>
      ),
    },
    {
      name: "Psychological test",
      pathname: "/psycological-test",
      route: "psycological-test",
      active: false,
      svg: (
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.9376 13.3985C19.9342 13.2452 19.9052 13.0936 19.8517 12.9499L18.2137 8.46307C18.0876 8.12286 17.832 7.84633 17.5028 7.69372C17.1736 7.54112 16.7975 7.52482 16.4563 7.64838L10.6289 9.75986L11.667 3.83018C11.7313 3.47133 11.6505 3.10163 11.4423 2.80237C11.2341 2.5031 10.9155 2.29878 10.5567 2.23432L5.8585 1.39643C5.68088 1.3652 5.49885 1.36935 5.32285 1.40864C5.14684 1.44793 4.98032 1.52159 4.83285 1.62538C4.68538 1.72918 4.55985 1.86108 4.46348 2.0135C4.3671 2.16592 4.30177 2.33588 4.27123 2.51361L2.12279 14.813C2.02457 15.3553 2.04657 15.9125 2.18723 16.4453C2.32788 16.9782 2.58378 17.4736 2.93684 17.8968C3.28991 18.3199 3.73155 18.6604 4.23058 18.8942C4.72962 19.128 5.27389 19.2495 5.82498 19.2499H18.5626C18.9273 19.2499 19.277 19.1051 19.5349 18.8472C19.7928 18.5893 19.9376 18.2396 19.9376 17.8749V13.3985ZM5.84389 16.8437C5.57194 16.8437 5.3061 16.763 5.07998 16.612C4.85386 16.4609 4.67762 16.2461 4.57355 15.9949C4.46948 15.7436 4.44225 15.4672 4.49531 15.2004C4.54836 14.9337 4.67932 14.6887 4.87162 14.4964C5.06391 14.3041 5.30892 14.1732 5.57564 14.1201C5.84236 14.0671 6.11883 14.0943 6.37008 14.1984C6.62133 14.3024 6.83607 14.4787 6.98716 14.7048C7.13825 14.9309 7.21889 15.1967 7.21889 15.4687C7.21889 15.8334 7.07402 16.1831 6.81616 16.441C6.5583 16.6988 6.20856 16.8437 5.84389 16.8437ZM9.51514 16.1235L10.3556 11.3179L16.923 8.93744L18.5626 13.4156L9.34842 16.7578C9.42189 16.5515 9.47767 16.3393 9.51514 16.1235ZM18.5626 17.8749H10.2903L18.5626 14.8766V17.8749Z"
            fill={routePath == "/psycological-test" ? "#7E3EE5" : "#7D7D7D"}
          />
        </svg>
      ),
    },
    {
      name: "Settings",
      pathname: "/settings",
      route: "settings",
      active: false,
      svg: (
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.4475 9.2133C20.4284 9.11649 20.3886 9.02493 20.3309 8.94486C20.2732 8.86478 20.199 8.79807 20.1132 8.74924L17.5497 7.2883L17.5394 4.39908C17.5391 4.29958 17.5172 4.20133 17.4752 4.11112C17.4332 4.02091 17.3721 3.94089 17.2962 3.87658C16.3663 3.09 15.2954 2.4872 14.1406 2.10026C14.0496 2.06947 13.9532 2.05808 13.8576 2.06681C13.762 2.07555 13.6693 2.10421 13.5854 2.15096L10.9996 3.59643L8.41112 2.14838C8.3272 2.10137 8.23435 2.07249 8.13858 2.06361C8.0428 2.05472 7.94623 2.06604 7.8551 2.09682C6.70093 2.48625 5.63124 3.09138 4.70291 3.88002C4.62709 3.94423 4.56608 4.02411 4.5241 4.11417C4.48211 4.20422 4.46015 4.3023 4.45971 4.40166L4.44682 7.29346L1.8833 8.7544C1.79754 8.80322 1.72329 8.86994 1.66561 8.95002C1.60792 9.03009 1.56816 9.12165 1.54901 9.21846C1.31439 10.3974 1.31439 11.6111 1.54901 12.79C1.56816 12.8868 1.60792 12.9784 1.66561 13.0585C1.72329 13.1385 1.79754 13.2053 1.8833 13.2541L4.44682 14.715L4.45713 17.6051C4.45744 17.7046 4.47935 17.8029 4.52134 17.8931C4.56333 17.9833 4.6244 18.0633 4.70033 18.1276C5.63024 18.9142 6.70109 19.517 7.85596 19.9039C7.94691 19.9347 8.04329 19.9461 8.13891 19.9374C8.23452 19.9286 8.32725 19.9 8.41112 19.8532L10.9996 18.4035L13.588 19.8515C13.6904 19.9086 13.8059 19.9382 13.9231 19.9374C13.9982 19.9374 14.0728 19.9252 14.144 19.9014C15.2979 19.5121 16.3675 18.9076 17.2962 18.1199C17.372 18.0557 17.433 17.9758 17.475 17.8857C17.517 17.7957 17.539 17.6976 17.5394 17.5982L17.5523 14.7064L20.1158 13.2455C20.2016 13.1967 20.2758 13.1299 20.3335 13.0499C20.3912 12.9698 20.431 12.8782 20.4501 12.7814C20.6834 11.6034 20.6825 10.391 20.4475 9.2133ZM10.9996 14.4374C10.3197 14.4374 9.65507 14.2358 9.08978 13.8581C8.52449 13.4804 8.08389 12.9435 7.82372 12.3154C7.56354 11.6873 7.49547 10.9961 7.6281 10.3293C7.76074 9.66251 8.08813 9.05001 8.56887 8.56926C9.04962 8.08852 9.66212 7.76113 10.3289 7.62849C10.9957 7.49586 11.6869 7.56393 12.315 7.82411C12.9431 8.08428 13.48 8.52488 13.8577 9.09017C14.2354 9.65546 14.4371 10.3201 14.4371 10.9999C14.4371 11.9116 14.0749 12.786 13.4302 13.4306C12.7856 14.0753 11.9112 14.4374 10.9996 14.4374Z"
            fill={routePath == "settings" ? "#7E3EE5" : "#7D7D7D"}
          />
        </svg>
      ),
    },
  ];

  menuItems.forEach((item) => {
    if (item.pathname == routePath) {
      item.active = true;
    }
  });

  return (
    <main className="root-main flex">
      <div className="flex flex-col items-stretch w-1/5 max-md:w-full max-md:ml-0">
        <div className="bg-white flex w-full grow flex-col mx-auto px-5 py-6 border-r-gray-200 border-r border-solid max-md:mt-8">
          {/*LOGO */}
          <svg
            width="168"
            height="41"
            className="self-center"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#a)">
              <path
                d="M49.277 28.953H61.23v-3.6h-7.704v-13.56h-4.248v17.16ZM68.31 26.553c-1.703 0-2.591-1.488-2.591-3.72s.888-3.744 2.592-3.744c1.704 0 2.616 1.512 2.616 3.744s-.912 3.72-2.616 3.72Zm.025 2.784c3.96 0 6.552-2.808 6.552-6.504 0-3.696-2.592-6.504-6.552-6.504-3.936 0-6.576 2.808-6.576 6.504 0 3.696 2.64 6.504 6.576 6.504ZM81.741 33.2c1.824 0 3.432-.408 4.512-1.368.984-.888 1.632-2.232 1.632-4.08V16.664h-3.744v1.32h-.048c-.72-1.032-1.824-1.68-3.456-1.68-3.048 0-5.16 2.544-5.16 6.144 0 3.768 2.568 5.832 5.328 5.832 1.488 0 2.424-.6 3.144-1.416h.096v1.224c0 1.488-.696 2.352-2.352 2.352-1.296 0-1.944-.552-2.16-1.2h-3.792c.384 2.568 2.616 3.96 6 3.96Zm-.024-7.824c-1.464 0-2.424-1.2-2.424-3.048 0-1.872.96-3.072 2.424-3.072 1.632 0 2.496 1.392 2.496 3.048 0 1.728-.792 3.072-2.496 3.072ZM95.584 26.553c-1.704 0-2.592-1.488-2.592-3.72s.888-3.744 2.592-3.744c1.704 0 2.616 1.512 2.616 3.744s-.912 3.72-2.616 3.72Zm.024 2.784c3.96 0 6.551-2.808 6.551-6.504 0-3.696-2.591-6.504-6.551-6.504-3.936 0-6.576 2.808-6.576 6.504 0 3.696 2.64 6.504 6.576 6.504ZM103.302 28.953h3.912V16.665h-3.912v12.288Zm0-13.992h3.912v-3.168h-3.912v3.168ZM108.911 33.008h3.912V27.68h.048c.768 1.032 1.896 1.656 3.48 1.656 3.216 0 5.352-2.544 5.352-6.528 0-3.696-1.992-6.504-5.256-6.504-1.68 0-2.88.744-3.72 1.848h-.072v-1.488h-3.744v16.344Zm6.432-6.696c-1.68 0-2.64-1.368-2.64-3.36 0-1.992.864-3.504 2.568-3.504 1.68 0 2.472 1.392 2.472 3.504 0 2.088-.912 3.36-2.4 3.36ZM128.072 29.336c3.216 0 5.592-1.392 5.592-4.08 0-3.144-2.544-3.696-4.704-4.056-1.56-.288-2.952-.408-2.952-1.272 0-.768.744-1.128 1.704-1.128 1.08 0 1.824.336 1.968 1.44h3.6c-.192-2.424-2.064-3.936-5.544-3.936-2.904 0-5.304 1.344-5.304 3.936 0 2.88 2.28 3.456 4.416 3.816 1.632.288 3.12.408 3.12 1.512 0 .792-.744 1.224-1.92 1.224-1.296 0-2.112-.6-2.256-1.824h-3.696c.12 2.712 2.376 4.368 5.976 4.368ZM138.978 29.313c1.704 0 2.784-.672 3.672-1.872h.072v1.512h3.744V16.665h-3.912v6.864c0 1.464-.816 2.472-2.16 2.472-1.248 0-1.848-.745-1.848-2.088v-7.248h-3.888v8.064c0 2.736 1.488 4.584 4.32 4.584ZM148.168 28.952h3.912v-6.888c0-1.464.72-2.496 1.944-2.496 1.176 0 1.728.768 1.728 2.088v7.296h3.912v-6.888c0-1.464.696-2.496 1.944-2.496 1.176 0 1.728.768 1.728 2.088v7.296h3.912V20.96c0-2.76-1.392-4.656-4.176-4.656-1.584 0-2.904.672-3.864 2.16h-.048c-.624-1.32-1.848-2.16-3.456-2.16-1.776 0-2.952.84-3.72 2.112h-.072v-1.752h-3.744v12.288Z"
                fill="#344054"
              />
              <path
                d="M25.41 1.977 21.477.923l-3.314 12.37L15.17 2.124 11.237 3.18l3.233 12.065-8.053-8.052-2.879 2.879 8.833 8.833-11-2.948L.317 19.89l12.019 3.22a8.144 8.144 0 1 1 15.869-.011l10.923 2.927 1.053-3.933-12.066-3.233 11-2.948-1.053-3.933-12.066 3.233 8.052-8.052-2.879-2.88-8.71 8.71 2.95-11.012Z"
                fill="#7E3EE5"
              />
              <path
                d="M28.194 23.145a8.127 8.127 0 0 1-2.025 3.732l7.912 7.913 2.88-2.88-8.767-8.765ZM26.089 26.96a8.137 8.137 0 0 1-3.64 2.151l2.88 10.746 3.933-1.054L26.09 26.96ZM22.303 29.15a8.157 8.157 0 0 1-2.034.256c-.752 0-1.48-.102-2.172-.293L15.215 39.87l3.933 1.054 3.155-11.773ZM17.958 29.074a8.142 8.142 0 0 1-3.575-2.183l-7.932 7.932 2.879 2.88 8.628-8.63ZM14.317 26.82a8.125 8.125 0 0 1-1.975-3.686L1.383 26.071l1.054 3.933 11.88-3.184Z"
                fill="#7E3EE5"
              />
            </g>
            <defs>
              <clipPath id="a">
                <path fill="#fff" d="M0 0h168v41H0z" />
              </clipPath>
            </defs>
          </svg>
          <div className="items-stretch border shadow-sm bg-white self-stretch flex w-full flex-col justify-center mb-4 mt-10 px-3.5 py-2.5 rounded-lg border-solid border-gray-300">
            {/* Search bar */}
            <label
              htmlFor="search"
              className="relative text-gray-400 focus-within:text-gray-600 block"
            >
              <svg
                width="12"
                height="12"
                className="pointer-events-none absolute top-1/2 transform -translate-y-1/2 "
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
                placeholder="Search"
                className="form-input w-full outline-none pl-4"
              />
            </label>
          </div>
          {menuItems.map((item, index) => {
            return (
              <div
                className={
                  item.active
                    ? "bg-purple-100 text-purple-600 self-stretch flex justify-between gap-2.5 mt-2.5 p-2.5 rounded-lg items-start max-md:pr-5"
                    : "self-stretch flex justify-between gap-2.5 mt-2.5 p-2.5 rounded-lg items-start max-md:pr-5"
                }
              >
                {item.svg}

                <div
                  className="text-base font-medium leading-6 self-stretch grow whitespace-nowrap cursor-pointer"
                  onClick={() => {
                    navigate(item.route);
                  }}
                >
                  {item.name}
                </div>
              </div>
            );
          })}

          {/* User Details */}
          <div className="self-stretch flex gap-2.5 mt-10 pt-5 pb-2.5 px-2.5 border-t-gray-200 border-t border-solid items-start max-md:mt-10">
            <svg
              className="w-8 h-8 self-center"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
            </svg>

            <div className="justify-center items-stretch self-stretch flex grow basis-[0%] flex-col pr-2">
              <div className="text-slate-700 text-base font-medium leading-6">
                Jane Cooper
              </div>
              <div className="text-gray-500 text-xs leading-6 whitespace-nowrap">
                {email}
              </div>
            </div>
            <svg
              onClick={logout}
              width="22"
              className="cursor-pointer"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.625 18.5625C9.625 18.7448 9.55257 18.9197 9.42364 19.0486C9.2947 19.1776 9.11984 19.25 8.9375 19.25H4.125C3.76033 19.25 3.41059 19.1051 3.15273 18.8473C2.89487 18.5894 2.75 18.2397 2.75 17.875V4.125C2.75 3.76033 2.89487 3.41059 3.15273 3.15273C3.41059 2.89487 3.76033 2.75 4.125 2.75H8.9375C9.11984 2.75 9.2947 2.82243 9.42364 2.95136C9.55257 3.0803 9.625 3.25516 9.625 3.4375C9.625 3.61984 9.55257 3.7947 9.42364 3.92364C9.2947 4.05257 9.11984 4.125 8.9375 4.125H4.125V17.875H8.9375C9.11984 17.875 9.2947 17.9474 9.42364 18.0764C9.55257 18.2053 9.625 18.3802 9.625 18.5625ZM19.0489 10.5136L15.6114 7.07609C15.5153 6.97984 15.3927 6.91427 15.2593 6.8877C15.1258 6.86113 14.9875 6.87474 14.8618 6.92682C14.7361 6.9789 14.6287 7.0671 14.5532 7.18026C14.4777 7.29342 14.4374 7.42645 14.4375 7.5625V10.3125H8.9375C8.75516 10.3125 8.5803 10.3849 8.45136 10.5139C8.32243 10.6428 8.25 10.8177 8.25 11C8.25 11.1823 8.32243 11.3572 8.45136 11.4861C8.5803 11.6151 8.75516 11.6875 8.9375 11.6875H14.4375V14.4375C14.4374 14.5736 14.4777 14.7066 14.5532 14.8197C14.6287 14.9329 14.7361 15.0211 14.8618 15.0732C14.9875 15.1253 15.1258 15.1389 15.2593 15.1123C15.3927 15.0857 15.5153 15.0202 15.6114 14.9239L19.0489 11.4864C19.1128 11.4226 19.1635 11.3467 19.1981 11.2633C19.2327 11.1798 19.2505 11.0903 19.2505 11C19.2505 10.9097 19.2327 10.8202 19.1981 10.7367C19.1635 10.6533 19.1128 10.5774 19.0489 10.5136Z"
                fill={"#7D7D7D"}
              />
            </svg>
          </div>
        </div>
      </div>

      <Outlet />
    </main>
  );
};
export default RootLayout;
