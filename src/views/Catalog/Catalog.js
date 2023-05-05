import React, { useEffect, useState, useContext } from "react";
import { makeStyles } from '@material-ui/core/styles';
// @material-ui/core components
import TreeView from "@material-ui/lab/TreeView";
import TreeItem from "@material-ui/lab/TreeItem";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import "./Catalog.css"
// api
import { trackPromise } from "react-promise-tracker";
import { GeneralContext } from "providers/GeneralContext";
import { getListCatalog } from "api/Core/Catalog";

const useStyles = makeStyles({
    root: {
        // height: 240,
        flexGrow: 1,
        // maxWidth: 400,
    },
});

export default function Setting() {
    const classes = useStyles();

    const [Catalog, setCatalog] = useState({})


    const {
        setOpenToast,
        onToast
    } = useContext(GeneralContext);

    useEffect(() => {
        trackPromise(getCatalog())
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
            onToast("کاتالوگی وجود ندارد", "warning")
            setOpenToast(true)
        }
    }

    const getChildren = async (catalogName) => {
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

            var c = Catalog.map((data) => {
                if (data.path === catalogName) {
                    return {
                        name: data.name,
                        id: data.id,
                        children: newData,
                        path: data.path
                    }
                } else {
                    return data;
                }
            })
            setCatalog(c)

            console.log(Catalog, "44444");
        } else {
            onToast("کاتالوگی وجود ندارد", "warning")
            setOpenToast(true)
        }
    }

    console.log(Catalog, "Catalog");

    const renderTree = (nodes) => (

        <TreeItem
            key={nodes.id}
            nodeId={nodes.id}
            label={nodes.name}
            onClick={() => {
                getChildren(nodes.path)
            }}>
            {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
        </TreeItem>
    );

    return (
        <>
            <GridContainer>

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

        </>
    );
}
