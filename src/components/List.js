import { React } from "react";

function List(props) {
    // const filteredData = props.titleList.filter((elem) => {
    //     if (props.input === '') {
    //         return elem;
    //     } else {
    //         return elem.Title.toLowerCase().includes(props.input);
    //     }
    // })
    //console.log(props.titleList)

    return (
        <ul>
            {props.titleList.map((item, index) => (
                <li key={index}>{item}</li>
            ))}
        </ul>
    )
}

export default List