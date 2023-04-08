import React, { useContext } from "react";
import { GeneralContext } from "providers/GeneralContext";
import "./destroy.css"

export default function Loading() {

    const {
        loadingShow
    } = useContext(GeneralContext)

    return (
        <>
            {loadingShow &&

                <div id="allLoading">
                    <div id="container">
                    </div>
                </div>
            }

        </>
    )
}
