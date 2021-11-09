import React from 'react';
import {Link} from "react-router-dom";

const LinksCard = ({links}) => {
    if(!links.length){
        return <p className='center'>Ссылок пока нет</p>
    }
    return (
        <table>
            <thead>
            <tr>
                <th>№</th>
                <th>Link name</th>
                <th>Link short</th>
                <th>Open link</th>
            </tr>
            </thead>

            <tbody>
            {links.map((link, index) => {
                return(
                    <tr key={link._id}>
                        <td>{index + 1}</td>
                        <td>{link.from}</td>
                        <td>{link.to}</td>
                        <td>
                            <Link to={`/detail/${link._id}`}>Open link</Link>
                        </td>
                    </tr>
                )
            })}

            </tbody>
        </table>
    );
};

export default LinksCard;