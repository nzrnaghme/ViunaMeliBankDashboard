import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LocationOn from "@material-ui/icons/LocationOn";
import PublicRoundedIcon from '@material-ui/icons/PublicRounded';
import QuestionAnswerRoundedIcon from '@material-ui/icons/QuestionAnswerRounded';
// core components/views for Admin layout
import UserProfile from "views/UserProfile/UserProfile.js";
import CourseList from "views/CourseList/CourseList.js";
import Planning from "views/Planning/Planning.js";
import DashboardPage from "views/Dashboard/Dashboard";
import News from "views/News/News";
import QuestionAnswer from "views/QuestionAnswer/QuestionAnswer";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "داشبرد",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/teacher",
  },
  {
    path: "/user",
    name: "اطلاعات کاربر",
    icon: Person,
    component: UserProfile,
    layout: "/teacher",
  },
  {
    path: "/userList",
    name: "دوره ها",
    icon: "content_paste",
    component: CourseList,
    layout: "/teacher",
  },
  {
    path: "/news",
    name: "خبر و مقالات",
    icon: PublicRoundedIcon,
    component: News,
    layout: "/teacher",
  },

  {
    path: "/questionAnswer",
    name: "پرسش و پاسخ",
    icon: QuestionAnswerRoundedIcon,
    component: QuestionAnswer,
    layout: "/teacher",
  },

  {
    path: "/planning",
    name: "برنامه روزانه",
    icon: LocationOn,
    component: Planning,
    layout: "/teacher",
  },
  
];

export default dashboardRoutes;

