import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Navbar from "components/Navbars/Navbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import routes from "routes.js";
import styles from "assets/jss/material-dashboard-react/layouts/rtlStyle.js";
// import bgImage from "assets/img/sidebar-9.png";
import logo from "assets/img/logo4.png";
import Dashboard from "views/Dashboard/Dashboard";
import UserProfile from "views/UserProfile/UserProfile";
import CourseList from "views/CourseList/CourseList";
import Teachers from "views/Teachers/Teachers";
import Students from "views/Students/Students";
import LessonList from "views/Lessons/Lessons";
import Comments from "views/Comments/Comments";
import News from "views/News/News";
import Planning from "views/Planning/Planning";
import Support from "views/Support/Support";
import QuestionAnswer from "views/QuestionAnswer/QuestionAnswer";
import Suggest from "views/Suggest/Suggest";
// import { GeneralContext } from "providers/GeneralContext";
let ps;

//bg import
import sidebar from "./../assets/img/sidebar-10.png";
// import myBg01 from "./../assets/img/bg01.png";
// import myBg02 from "./../assets/img/bg01.png";
import myBg03 from "./../assets/img/bg03.png";

const useStyles = makeStyles(styles);

export default function Main({ ...rest }) {
  // const userId = getItem('id')
  const classes = useStyles();
  const mainPanel = React.createRef();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState(false);

  // const{hover, setHover} = React.useContent(GeneralContext);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };

  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", resizeFunction);
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
      window.removeEventListener("resize", resizeFunction);
    };
  }, [mainPanel]);

  const handleScroll = (event) => {
    console.log(event.currentTarget.scrollTop, "event");
    if (event.currentTarget.scrollTop > 0) setScroll(true);
    else setScroll(false);
  };

  return (
    <div
      className={classes.wrapper}
      style={{ backgroundImage: "url(" + myBg03 + ")" }}
    >
      <Sidebar
        routes={routes}
        logoText={"بانک ملّی ایران"}
        logo={logo}
        image={sidebar}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color={"orange"}
        rtlActive
        {...rest}
      />

      <div
        className={classes.mainPanel}
        ref={mainPanel}
        onScroll={handleScroll}
      >
        <Navbar
          routes={routes}
          handleDrawerToggle={handleDrawerToggle}
          rtlActive
          scrollAction={scroll}
          {...rest}
        />

        <div className={classes.content}>
          <div className={classes.container}>
            <Switch>
              <Route path={"/admin/dashboard"} component={Dashboard} />
              <Route path={"/admin/user"} component={UserProfile} />
              <Route path={"/admin/userList"} component={CourseList} />
              <Route path={"/admin/Teachers"} component={Teachers} />
              <Route path={"/admin/students"} component={Students} />
              <Route path={"/admin/lessons"} component={LessonList} />
              <Route path={"/admin/comments"} component={Comments} />
              <Route path={"/admin/news"} component={News} />
              <Route path={"/admin/planning"} component={Planning} />
              <Route path={"/admin/support"} component={Support} />
              <Route path={"/admin/contactMe"} component={Suggest} />

              <Route
                path={"/admin/questionAnswer"}
                component={QuestionAnswer}
              />

              <Redirect to="/admin/dashboard" from="/" />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
}
