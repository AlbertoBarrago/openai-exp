'use client';
import {useState} from "react";

/**
 * FilterResult component
 * @param handleFilter
 * @return {JSX.Element}
 * @constructor
 */
export const FilterResult = ({handleFilter}) => {
    const [activeButton, setActiveButton] = useState('all');
    return (
        <>
            <div className={`flex flex-row justify-center items-center`}>
                <div>
                    <button onClick={() => {
                        handleFilter('all')
                        setActiveButton('all')
                    }} className={`btn btn-primary me-2 ${activeButton === 'all' ? 'btn-active' : ''}`}>All
                    </button>
                </div>
                <div>
                    <button onClick={() => {
                        handleFilter('created')
                        setActiveButton('created')
                    }} className={`btn btn-secondary me-2 ${activeButton === 'created' ? 'btn-active' : ''}`}>Created
                    </button>
                </div>
                <div>
                    <button onClick={() => {
                        handleFilter('edited')
                        setActiveButton('edited')
                    }} className={`btn btn-secondary me-2 ${activeButton === 'edited' ? 'btn-active' : ''}`}>Edited
                    </button>
                </div>
                <div>
                    <button onClick={() => {
                        handleFilter('variation')
                        setActiveButton('variation')
                    }} className={`btn btn-secondary ${activeButton === 'variation' ? 'btn-active' : ''}`}>Variation
                    </button>
                </div>
            </div>
        </>
    )
}