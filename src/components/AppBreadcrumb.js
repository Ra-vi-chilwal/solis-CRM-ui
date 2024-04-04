import React from 'react'
import { Link } from 'react-router-dom';


function AppBreadcrumb(props) {
    const title = props && props.title;
    const links = props && props.links;
    return (
        <div className="page-titles">
            <ol className="breadcrumb">
                <li>
                    <h5 className="bc-title">{title}</h5>
                </li>
                <li className="breadcrumb-item">
                    <Link to="/">
                        <i className='icon icon-home' style={{ fontSize: "25px" }}></i>
                    </Link>
                </li>
                {links && links.map((item, index) => {
                    return (
                        <li className="breadcrumb-item tx-15" key={index}>
                            <Link to={item.link}>{item.page}</Link>
                        </li>
                    )
                })}
            </ol>
        </div>

    )
}

export default AppBreadcrumb