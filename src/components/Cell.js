import React from "react";

export default function Cell({details, updateFlag, revealCell}) {

    return (
        <div 
            onContextMenu={(e)=> updateFlag(e, details.x, details.y)} 
            onClick={()=>revealCell(details.x, details.y)} 
            style={style.cellStyle}
        >
            {details.revealed ? details.value : ""}
        </div>
    )
}

const style = {
    cellStyle: {
        width:40,
        height:40,
        background: "grey",
        border: '1px solid black',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer'
    }
}