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

const data = [
  {
    name: "Jan",
    uv: 4000,
    pv: 1700,
    amt: 2400,
  },
  {
    name: "Feb",
    uv: 4500,
    pv: 2900,
    amt: 1400,
  },
  {
    name: "Mar",
    uv: 3000,
    pv: 2800,
    amt: 1000,
  },
  {
    name: "Apr",
    uv: 2200,
    pv: 3400,
    amt: 1900,
  },

  {
    name: "May",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "JUN",
    uv: 2000,
    pv: 5800,
    amt: 2290,
  },
  {
    name: "Jun",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Aug",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Sep",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Oct",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "Nov",
    uv: 2490,
    pv: 4000,
    amt: 2600,
  },
  {
    name: "Des",
    uv: 2300,
    pv: 1300,
    amt: 3100,
  },
];

const Chart = ({ from }) => {
  console.log(from);

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
              <Bar dataKey="pv" fill="rgb(67, 56, 202)" />
              <Bar dataKey="uv" fill="rgb(251, 191, 36)" />
              <Bar dataKey="amt" fill="rgb(34, 197, 94)" />
            </>
          )}
          {from === "income" && <Bar dataKey="pv" fill="rgb(67, 56, 202)" />}
          {from === "users" && <Bar dataKey="uv" fill="rgb(251, 191, 36)" />}
          {from === "orders" && <Bar dataKey="amt" fill="rgb(220, 38, 38)" />}
          {from === "products" && <Bar dataKey="pv" fill="rgb(34, 197, 94)" />}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
