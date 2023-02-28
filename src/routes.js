import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
// import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import PeopleIcon from '@material-ui/icons/People';
import AssignmentIcon from '@material-ui/icons/Assignment';
// import PublicRoundedIcon from '@material-ui/icons/PublicRounded';
// import ContactSupportRoundedIcon from '@material-ui/icons/ContactSupportRounded';
// import QuestionAnswerRoundedIcon from '@material-ui/icons/QuestionAnswerRounded';
// core components/views for Admin layout
import UserProfile from "views/UserProfile/UserProfile.js";
import CourseList from "views/CourseList/CourseList.js";
import Teachers from "views/Teachers/Teachers.js";
// import Planning from "views/Planning/Planning.js";
import DashboardPage from "views/Dashboard/Dashboard";
import LessonList from "views/Lessons/Lessons";
import Comments from "views/Comments/Comments";
// import News from "views/News/News";
import Students from "views/Students/Students";
// import Support from "views/Support/Support";
// import QuestionAnswer from "views/QuestionAnswer/QuestionAnswer";
// import Suggest from "views/Suggest/Suggest";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "داشبرد",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin",
  },
  {
    path: "/user",
    name: "اطلاعات کاربر",
    icon: Person,
    component: UserProfile,
    layout: "/admin",
  },
  {
    path: "/courses",
    name: "دوره ها",
    icon: "content_paste",
    component: CourseList,
    layout: "/admin",
  },
  {
    path: "/Teachers",
    name: "اساتید",
    icon: LocalLibraryIcon,
    component: Teachers,
    layout: "/admin",
  },
  {
    path: "/students",
    name: "دانشجویان",
    icon: PeopleIcon,
    component: Students,
    layout: "/admin",
  },
  {
    path: "/lessons",
    name: "درس ها",
    icon: AssignmentIcon,
    component: LessonList,
    layout: "/admin",
  },
  {
    path: "/comments",
    name: "کامنت ها",
    icon: Notifications,
    component: Comments,
    layout: "/admin",
  },
  // {
  //   path: "/support",
  //   name: "پشتیبانی",
  //   icon: ContactSupportRoundedIcon,
  //   component: Support,
  //   layout: "/admin",
  // },

  // {
  //   path: "/questionAnswer",
  //   name: "پرسش و پاسخ",
  //   icon: QuestionAnswerRoundedIcon,
  //   component: QuestionAnswer,
  //   layout: "/admin",
  // },

  // {
  //   path: "/news",
  //   name: "مقاله و خبر",
  //   icon: PublicRoundedIcon,
  //   component: News,
  //   layout: "/admin",
  // },
  // {
  //   path: "/contactMe",
  //   name: "ارتباط با ما",
  //   icon: QuestionAnswerRoundedIcon,
  //   component: Suggest,
  //   layout: "/admin",
  // },

  // {
  //   path: "/planning",
  //   name: "برنامه روزانه",
  //   icon: LocationOn,
  //   component: Planning,
  //   layout: "/admin",
  // },

];

export default dashboardRoutes;

