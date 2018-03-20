import React from 'react';
import _ from 'lodash';
import FaPlus from 'react-icons/lib/fa/plus';
import MdDelete from 'react-icons/lib/md/delete';
import FaPencil from 'react-icons/lib/fa/pencil';
import InjectionPlaces from '../../javascripts/places.json';
import Months from '../../javascripts/months.json';

export default class SectionList extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let counter = 0;
        let tempArray = [];

        return (
            <div className="table__container">
                <table>
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th style={{ paddingTop: 5 + 'px' }}>
                                <span>Lugar de inyección</span>
                            </th>
                            <th>
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
                                    {
                                        // tempArray en posicion 1 = mes, 2 = dia
                                        Months.map(month => {
                                            tempArray = section.name.split("-");
                                            if(month.number === tempArray[1]) {
                                                return(<th key={counter}>{tempArray[2]} - {month.name}</th>)
                                            } else {
                                                counter = counter += counter;
                                            }
                                        })
                                    }
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
                                    <th id={section.id}>
                                        <a onClick={() => this.props.edit(true, section.id)}>
                                            <FaPencil size={20} color="#F79F81" />
                                        </a>
                                        <a style={{ marginLeft: 10 + 'px' }} onClick={() => this.props.delete(section.id)}>
                                            <MdDelete size={20} color="#F79F81" />
                                        </a>
                                    </th>
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
                        padding: 0;
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
                            max-height: 350px !important;
                            margin-top: 2vh !important;
                        }
                        table {
                            width: 97% !important;
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