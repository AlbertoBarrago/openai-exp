import Image from "next/image";

export const TableResult = ({data}) => {
    const prepareHeaderTable = () => {
        let headerTable = [];
        if (data && data.length > 0) {
            Object.keys(data[0]).forEach(item => {
                headerTable.push(item);
            })
        }
        return headerTable;
    }
    const prepareBodyTable = () => {
        let bodyTable = [];
        if (data && data.length > 0) {
            data.forEach(item => {
                let row = [];
                Object.values(item).forEach(value => {
                    row.push(value);
                })
                bodyTable.push(row);
            })
        }

        return bodyTable;
    }
    const convertTime = (time) => {
        let date = new Date(time);
        return date.toLocaleDateString("en-US",{year: 'numeric', month: 'long', day: 'numeric'});
    }
    return (
        <div className="overflow-x-auto">
            <table className="table w-full">
                {/* head */}
                <thead>
                 <tr>
                    {prepareHeaderTable().map((item, index) => {
                        return (
                            <th key={index}>{item}</th>
                        )
                    })}
                </tr>
                </thead>
                <tbody>
                {prepareBodyTable().map((item, index) => {
                    return (
                        <tr key={index}>
                            {item.map((value, index) => {
                                return (
                                    <td key={index}>
                                        {(typeof value === "string" && value.includes('http')) && (<Image
                                            alt={value}
                                            src={value} width={50} height={50}/>)
                                        }
                                        {(typeof value === "string" && !value.includes('http')) && (<>{value}</>)}

                                    </td>
                                )
                            })}
                         </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    )
}