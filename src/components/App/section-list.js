import React from 'react';
import _ from 'lodash';
import FaPlus from 'react-icons/lib/fa/plus';
import InjectionPlaces from '../../javascripts/places.json';

export default class SectionList extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let counter = 0;
        return (
            <div className="table__container">
                <table>
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th style={{ paddingTop: 5 + 'px' }}>
                                <span style={{ marginLeft: 45 + 'px' }}>Lugar de inyección</span>
                                <button
                                    onClick={() => this.props.addNew()}
                                    className="addNew"
                                >
                                    <FaPlus color={'white'} size={20} />
                                </button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            _.map(this.props.sections, (section) =>
                                <tr key={section.id}>
                                    <th>{section.name}</th>
                                    {
                                        InjectionPlaces.map(item => {
                                            counter = counter + 1;
                                            if(item.number === section.injectionPlace) {
                                                return(<th key={counter}>{section.injectionPlace} - {item.place}</th>)
                                            } else {
                                                counter = counter += counter;
                                            }
                                        })
                                    }
                                </tr>
                            )
                        }
                    </tbody>
                </table>
                <style>{`
                    .addNew {
                        border: none;
                        background-color: transparent;
                        cursor: pointer;
                        float: right;
                        margin-right: 10px;
                    }
                    button:focus {
                        outline: 0;
                    }
                    @media (max-width: 850px) {
                        table {
                            width: 90% !important;
                        }
                    }

                    @media (max-width: 450px) {
                        .table__container {
                            max-height: 300px;
                            margin-top: 3vh;
                        }
                    }

                    .table__container {
                        max-height: 400px;
                        overflow-y: scroll;
                        margin-top: 11vh;
                    }

                    table {
                        width: 50%;
                        border: 1px solid #000;
                        border-spacing: 0;
                        margin: 0 auto;
                        height: 100%;
                    }

                    th {
                        height: 40px;
                        padding: 0;
                    }
                    tr th {
                        border-top: 1px solid #000;
                        border-left: 1px solid #000;
                    }

                    tr th:nth-child(1) {
                        border-left: 0;
                    }
                    thead th {
                        border-top: 0;
                    }

                    thead tr th {
                        font-weight: bold;
                        background-color: #F79F81;
                        color: white;
                    }
                `}</style>
            </div>
        );
    }
}