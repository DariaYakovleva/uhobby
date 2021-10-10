import React from 'react';
import '../fonts/Montserrat/Montserrat-Light.ttf';
import './Template.css';

export const Template = ({ link, projectName, children }) => {
    return (
        <div className="Template">
            <div className="Template__header">
                <div className="Template__headerIn">
                    <a className="Template__project" href={link}>
                        {projectName}
                    </a>
                </div>
            </div>
            <div className="Template__container">
                {children}
            </div>
            <div className="Template__footer">
                <div className="Template__footerIn">
                    <div className="Template__footerMain">
                        <a className="Template__logo" href="https://www.ykvlv.ai/">
                            YKVLV
                        </a>
                        <div className="Template__sign">
                            Сделано с любовью.
                        </div>
                        <a className="Template__footerTg" href="https://t.me/dashalovesstartups" />
                    </div>
                </div>
            </div>
        </div>
    )
}

