import React from 'react';

export default class Header extends React.Component {
    render() {
        return (
            <div className="headerContainer">
                <div className="headerContainer__menu">
                    <a>home</a>
                    <a className="margin">lugares</a>
                </div>
                <style>{`
                    .headerContainer {
                        width: 100vw;
                        height: 50px;
                    }

                    a {
                        cursor: pointer;
                        font-size: 18px;
                    }

                    .margin {
                        margin-left: 30px;
                    }

                    a:hover {
                        text-decoration: underline;
                    }

                    .headerContainer__menu {
                        width: 135px;
                        margin: 30px auto 0 auto;
                    }
                `}</style>
            </div>
        );
    }
}