import React, { useEffect, useState, useContext } from "react";
import { makeStyles } from '@material-ui/core/styles';
// @material-ui/core components
import TreeView from "@material-ui/lab/TreeView";
import TreeItem from "@material-ui/lab/TreeItem";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

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
import { getListCatalog } from "api/Core/Catalog";
import { removeCatalog } from "api/Core/Catalog";

const useStyles = makeStyles({
    root: {
        // height: 240,
        flexGrow: 1,
        // maxWidth: 400,
    },
});

export default function Setting() {
    const classes = useStyles();

    const [Catalog, setCatalog] = useState({});
    const [oldNode, setOldNode] = useState("");

    //new catalog
    const [openPopUpCreateCatalog, setOpenPopUpCreateCatalog] = useState(false);



    const {
        setOpenToast,
        onToast
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
                path: item.path
            }));
            setCatalog(newData);

        } else {
            onToast("فایلی وجود ندارد", "warning");
            setOpenToast(true);
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
                path: item.path
            }));

            addChildToUser(Catalog, catalogName, newData);

        } else {
            onToast("فایل داخلی وجود ندارد", "warning");
            setOpenToast(true);
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
            label={nodes.name}
            onClick={() => {
                if (oldNode != nodes.path)
                    getChildren(nodes.path);
            }}>
            {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}

        </TreeItem>
    );

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
                                setOpenPopUpCreateCatalog(true);
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


                            onClick={async () => {
                                if (oldNode) {
                                    const data = {
                                        PATH: oldNode,
                                        RECURSIVE: "true"
                                    }
                                    const response = await removeCatalog(data);
                                    if (response.data === "RemoveFolder_Done") {
                                        setOpenToast(true);
                                        onToast("فایل حذف شد", "success");
                                        trackPromise(getCatalog());
                                    } else {
                                        setOpenToast(true);
                                        onToast("فایل حذف نشد", "error");
                                    }
                                } else {
                                    setOpenToast(true);
                                    onToast("لطفا فایل انتخاب کنید", "error");
                                }


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

                        <CardBody>
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
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
            {openPopUpCreateCatalog && (
                <CreateCatalog
                    openCreateUserPopUp={openPopUpCreateCatalog}
                    CreateSuccess={() => {
                        setOpenPopUpCreateCatalog(false);

                        setOpenToast(true);
                        onToast("فایل اضافه شد", "success");
                        trackPromise(getCatalog());
                    }}
                    closePopUpCreate={() => {
                        setOpenPopUpCreateCatalog(false);
                    }}
                    parentPath={oldNode}
                />
            )}
        </>
    );
}
