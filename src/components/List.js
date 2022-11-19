import { React } from "react";
import data from './books.json';

function List(props) {
    const filteredData = data.filter((elem) => {
        if (props.input === '') {
            return elem;
        } else {
            return elem.title.toLowerCase().includes(props.input);
        }
    })

    return (
        <ul>
            {filteredData.map((item) => (
                <li key={item.url}>{item.title}</li>
            ))}
        </ul>
    )
}

export default List