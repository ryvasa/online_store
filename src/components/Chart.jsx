import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Chart = ({ from, data }) => {
  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {from === "home" && (
            <>
              <Bar dataKey="transactions" fill="rgb(67, 56, 202)" />
              <Bar dataKey="users" fill="rgb(251, 191, 36)" />
              <Bar dataKey="products" fill="rgb(34, 197, 94)" />
            </>
          )}
          {from === "transactions" && (
            <Bar dataKey="transactions" fill="rgb(67, 56, 202)" />
          )}
          {from === "users" && <Bar dataKey="users" fill="rgb(251, 191, 36)" />}
          {from === "orders" && (
            <Bar dataKey="orders" fill="rgb(220, 38, 38)" />
          )}
          {from === "products" && (
            <Bar dataKey="products" fill="rgb(34, 197, 94)" />
          )}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
