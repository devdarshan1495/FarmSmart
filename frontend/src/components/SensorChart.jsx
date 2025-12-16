import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

function SensorChart({ readings, sensorType, unit }) {
  // Format data for chart
  const chartData = readings.map((reading) => ({
    time: new Date(reading.timestamp).toLocaleTimeString(),
    value: reading.value
  })).reverse().slice(-20); // Show last 20 readings

  const getLineColor = () => {
    switch(sensorType) {
      case 'moisture': return '#2196f3';
      case 'temperature': return '#ff5722';
      case 'waterLevel': return '#4caf50';
      default: return '#667eea';
    }
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis label={{ value: unit || '', angle: -90, position: 'insideLeft' }} />
        <Tooltip />
        <Legend />
        <Line 
          type="monotone" 
          dataKey="value" 
          stroke={getLineColor()} 
          strokeWidth={2}
          name={`${sensorType} ${unit}`}
          dot={{ r: 3 }}
          activeDot={{ r: 5 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default SensorChart;
