import React from 'react';
import FaHeart0 from 'react-icons/lib/fa/heart';

export default class Footer extends React.Component {
    render() {
        return (
            <div className="container">
                <p>
                    Made with so much <FaHeart0 color="red" /> by your boyfriend
                </p>
                <style>{`
                    .container {
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        width: 100vw;
                        height: 45px;
                    }
                    .container p {
                        width: 290px;
                        display: block;
                        margin: 10px auto;
                    }
                `}</style>
            </div>
        );
    }
}