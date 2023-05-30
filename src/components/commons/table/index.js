import { Table } from "react-daisyui";

export function TableText({ args, data }) {
  const prepareColumns = (data) => {
    const columns = [];
    const keys = Object.keys(data[0]);
    keys.forEach((key) => {
      columns.push({
        Header: key,
        accessor: key,
      });
    });
    return (
      <Table.Head>
        {columns.map((column) => (
          <span key={column.Header}>
            {column.Header === "userId" ? "" : column.Header}
          </span>
        ))}
      </Table.Head>
    );
  };

  const truncateLongText = (text) => {
    if (text.length > 50) {
      return text.substring(0, 50) + "...";
    }
    return text;
  };
  const prepareRows = (data) => {
    const rows = [];
    data.forEach((row, i) => {
      rows.push(
        <Table.Body key={i * 2}>
          <Table.Row>
            {Object.values(row).map((value, j) => (
              <span key={j * 3} title={value}>
                {truncateLongText(value)}
              </span>
            ))}
          </Table.Row>
        </Table.Body>
      );
    });
    return rows;
  };

  return (
    <div className="w-full mt-14 flex justify-center overflow-x-auto">
      <Table {...args}>
        {prepareColumns(data)}
        {prepareRows(data)}
      </Table>
    </div>
  );
}
