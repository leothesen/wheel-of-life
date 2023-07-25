interface Entry {
  data: {
    [key: string]: number;
  };
  meta: {
    color: string;
  };
  date: Date;
}

interface Props {
  data: Entry[];
  captions: {
    [key: string]: string;
  };
}

export const EntriesTable: React.FC<Props> = ({ data, captions }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            {/* Additional headers */}
            <th>Date</th>
            {Object.values(captions).map((caption, index) => (
              <th key={index}>{caption}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* rows */}
          {data.map((entry, index) => (
            <tr key={index}>
              {/* Additional data */}
              <td>{entry.date.toString()}</td>

              {/* Data */}
              {Object.keys(entry.data).map((key, dataIndex) => (
                <td key={dataIndex}>{entry.data[key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
