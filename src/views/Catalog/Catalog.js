import React, { useEffect, useState, useContext } from "react";
import { makeStyles } from '@material-ui/core/styles';
// @material-ui/core components
import TreeView from "@material-ui/lab/TreeView";
import TreeItem from "@material-ui/lab/TreeItem";
import Typography from '@material-ui/core/Typography';
//icons
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import DvrIcon from '@material-ui/icons/Dvr';
import AssessmentIcon from '@material-ui/icons/Assessment';
import FilterListIcon from '@material-ui/icons/FilterList';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import SettingsEthernetIcon from '@material-ui/icons/SettingsEthernet';
import FolderIcon from '@material-ui/icons/Folder';
import Label from '@material-ui/icons/Label';

import { toast } from "react-toastify";

import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from '@material-ui/icons/Add';
import Close from "@material-ui/icons/Close";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CreateCatalog from "./CreateCatalog"
import "./Catalog.css"
// api
import { trackPromise } from "react-promise-tracker";
import { GeneralContext } from "providers/GeneralContext";
import { getListCatalog, removeCatalog, detailCatalog } from "api/Core/Catalog";

const useStyles = makeStyles({
    root: {
        // height: 240,
        flexGrow: 1,
        maxWidth: 400,
    },
    cardBody: {
        display: "flex",
        justifyContent: "space-between"
    }
});

export default function Setting() {
    const classes = useStyles();

    const [Catalog, setCatalog] = useState({});
    const [oldNode, setOldNode] = useState("");
    const [detailsCatalog, setDetailsCatalog] = useState();


    //new catalog
    const [openPopUpCreateCatalog, setOpenPopUpCreateCatalog] = useState(false);

    console.log(detailsCatalog, "detailsCatalog");

    const {
        setConfirmPopupOpen,
        onConfirmSetter,
    } = useContext(GeneralContext);

    useEffect(() => {
        trackPromise(getCatalog());
    }, [])

    const getCatalog = async () => {

        const data = {
            PATH: `/`,
            Mask: "*",
            Resolvelinks: "true"
        }
        let response = await getListCatalog(data);
        if (Object.values(response.data).length > 0) {
            var newData = Object.values(response.data).map((item) => ({
                name: item.caption,
                id: Math.random(),
                children: [],
                path: item.path,
                type: item.type
            }));
            const filteredData = newData.filter(item => item.path === "/shared" || item.path === "/users");

            setCatalog(filteredData);

        } else {
            toast.warning("فایلی وجود ندارد");
        }
    }

    const getChildren = async (catalogName) => {
        setOldNode(catalogName);
        const data = {
            PATH: `${catalogName}`,
            Mask: "*",
            Resolvelinks: "true"
        }
        let response = await getListCatalog(data);

        if (Object.values(response.data).length > 0) {
            var newData = Object.values(response.data).map((item) => ({
                name: item.caption,
                id: Math.random(),
                children: [],
                path: item.path,
                type: item.type
            }));
            addChildToUser(Catalog, catalogName, newData);
            getDetailCatalog(catalogName);
        } else {
            toast.warning("فایل داخلی وجود ندارد");
        }
    }


    const addChildToUser = (userData, parentId, childrenData) => {
        userData.forEach(user => {
            if (user.path === parentId) {
                user.children.push(...childrenData);
                setCatalog([...Catalog]); // Update state with new data reference
            } else if (user.children && user.children.length > 0) {
                addChildToUser(user.children, parentId, childrenData);
            }
        });
    }

    const getDetailCatalog = async (catalogName) => {
        const data = {
            PATH: `${catalogName}`
        }
        let response = await detailCatalog(data);

        setDetailsCatalog(Object.values(response.data)[0]);

        let today = new Date(Object.values(response.data)[0].CREATED).toLocaleDateString('fa-IR');
        console.log(today, "today");
    }

    // const removeNode = (userData, nodeId) => {
    //     console.log(nodeId, "node");
    //     userData.forEach(user => {
    //         const index = user.children.findIndex(child => child.path === nodeId);
    //         console.log(index, "iiiii");
    //         if (index !== -1) {
    //             user.children.splice(index, 1);
    //             setCatalog([...Catalog]); // Update state with new data reference
    //         } else if (user.children && user.children.length > 0) {
    //             removeNode(user.children, nodeId);
    //         }
    //     });
    // };


    const renderTree = (nodes) => (

        <TreeItem
            key={nodes.id}
            nodeId={nodes.id}
            label={
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "0.5px 0px"
                }}>
                    {nodes.type === "Folder" ? <FolderIcon color="inherit" style={{ marginRight: 1, color: "#e3742f", fontSize: "1.2rem", marginLeft: 5 }} /> :
                        nodes.type === "Dashboards" ? <DvrIcon color="inherit" style={{ marginRight: 1, color: "#e3742f", fontSize: "1.2rem", marginLeft: 5 }} /> :
                            nodes.type === "Analysis" ? <AssessmentIcon color="inherit" style={{ marginRight: 1, color: "#e3742f", fontSize: "1.2rem", marginLeft: 5 }} /> :
                                nodes.type === "Filter" ? <FilterListIcon color="inherit" style={{ marginRight: 1, color: "#e3742f", fontSize: "1.2rem", marginLeft: 5 }} /> :
                                    nodes.type === "Dashboard Prompt" ? <PlaylistAddCheckIcon color="inherit" style={{ marginRight: 1, color: "#e3742f", fontSize: "1.2rem", marginLeft: 5 }} /> :
                                        nodes.type === "Condition" ? <SettingsEthernetIcon color="inherit" style={{ marginRight: 1, color: "#e3742f", fontSize: "1.2rem", marginLeft: 5 }} /> :
                                            <Label color="inherit" style={{ marginRight: 1, color: "#e3742f", fontSize: "1.2rem", marginLeft: 5 }} />
                    }

                    <Typography variant="body2" style={{ fontWeight: "inherit", flexGrow: 1 }}>
                        {nodes.name}
                    </Typography>
                </div>
            }

            onClick={() => {
                if (oldNode != nodes.path)
                    getChildren(nodes.path);
            }}>
            {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}

        </TreeItem>
    );

    const removeSelectCatalog = async () => {
        if (oldNode) {
            const data = {
                PATH: oldNode,
                RECURSIVE: "true"
            }
            const response = await removeCatalog(data);
            if (response.data === "RemoveFolder_Done") {
                toast.success("فایل حذف شد");
                trackPromise(getCatalog());
            } else {
                toast.error("فایل حذف نشد");
            }
        } else {
            toast.error("لطفا فایل انتخاب کنید");
        }
    }

    return (
        <>
            <GridContainer>
                <div className="btnAdd2">
                    <Tooltip
                        id="tooltip-top-start"
                        title="افزودن فایل"
                        placement="top"
                        classes={{ tooltip: classes.tooltip }}
                        color={"#00adef"}
                    >
                        <IconButton
                            aria-label="Key"
                            className={classes.tableActionButton}
                            onClick={() => {
                                if (oldNode)
                                    setOpenPopUpCreateCatalog(true);
                                else toast.warning("!!لطفا یک کاتالوگ انتخاب کنید")
                            }}
                        >
                            <AddIcon
                                className={
                                    classes.tableActionButtonIcon}
                                style={{ color: "white", fontSize: "2rem" }}
                            />
                        </IconButton>
                    </Tooltip>

                </div>

                <div className="btnremove2">
                    <Tooltip
                        id="tooltip-top-start"
                        title="حذف فایل"
                        placement="top"
                        classes={{ tooltip: classes.tooltip }}
                        color={"#00adef"}
                    >
                        <IconButton
                            aria-label="Key"
                            className={classes.tableActionButton}


                            onClick={() => {
                                onConfirmSetter("آیا برای حذف کاتالوگ مطمئن هستید؟", () => {
                                    trackPromise(removeSelectCatalog());
                                });
                                setConfirmPopupOpen(true);
                            }}
                        >
                            <Close
                                className={
                                    classes.tableActionButtonIcon}
                                style={{ color: "white", fontSize: "2rem" }}
                            />
                        </IconButton>
                    </Tooltip>

                </div>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>

                        <CardBody className={classes.cardBody}>
                            {Object.values(Catalog).length > 0 &&
                                <TreeView
                                    className={classes.root}
                                    defaultCollapseIcon={<ExpandMoreIcon />}
                                    // defaultExpanded={['root']}
                                    defaultExpandIcon={<ChevronRightIcon />}
                                >
                                    {
                                        Catalog.map((node) => (renderTree(node)))
                                    }

                                </TreeView>
                            }
                            {(detailsCatalog !== null && detailsCatalog !== undefined) &&
                                <div className="details">
                                    <div className="catalosDetail">
                                        <p>تاریخ ایجاد : </p>
                                        <p>{new Date(detailsCatalog.CREATED).toLocaleDateString('fa-IR')}</p>
                                    </div>
                                    <div className="catalosDetail">
                                        <p>نوع : </p>
                                        <p>{detailsCatalog.TYPE ? detailsCatalog.TYPE : "..."}</p>
                                    </div>

                                </div>
                            }
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer >
            {openPopUpCreateCatalog && (
                <CreateCatalog
                    openCreateUserPopUp={openPopUpCreateCatalog}
                    CreateSuccess={() => {
                        setOpenPopUpCreateCatalog(false);

                        toast.success("فایل اضافه شد");
                        trackPromise(getCatalog());
                    }}
                    closePopUpCreate={() => {
                        setOpenPopUpCreateCatalog(false);
                    }}
                    parentPath={oldNode}
                />
            )
            }
        </>
    );
}
