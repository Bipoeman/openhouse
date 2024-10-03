import React, { useState, useEffect } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

const RealTimeChart = () => {
  const [data, setData] = useState([]);
  const [currentValue, setCurrentValue] = useState(1.0); // เริ่มต้นค่าปัจจุบันที่ 1.0
  const duration = 10000; // อัปเดตทุก 10 วินาที (10000 มิลลิวินาที)
  const maxEntries = 60; // จำนวนข้อมูลสูงสุดที่เก็บไว้ในกราฟ

  // ฟังก์ชันเพิ่มค่าทีละน้อยเพื่อไม่ให้กราฟดูผันผวนมาก
  const generateSmoothData = () => {
    // สุ่มการเปลี่ยนแปลงระหว่าง -0.15 ถึง +0.15
    const change = (Math.random() * 0.3) - 0.15; 
    const newValue = Math.max(0.9, Math.min(1.2, currentValue + change)); // ป้องกันไม่ให้ค่าเกินช่วง 0.9-1.2

    // อัปเดตข้อมูลกราฟ
    setData((prevData) => {
      const currentTime = new Date().getTime(); // เวลาปัจจุบันในมิลลิวินาที
      const newEntry = { time: currentTime, value: newValue }; // ใช้ timestamp เป็นแกน X
      const updatedData = [...prevData, newEntry];

      // จำกัดให้มีข้อมูลไม่เกิน maxEntries
      if (updatedData.length > maxEntries) {
        return updatedData.slice(updatedData.length - maxEntries); // เก็บเฉพาะ maxEntries ชุดข้อมูลล่าสุด
      }
      return updatedData;
    });

    setCurrentValue(newValue); // อัปเดตค่าปัจจุบัน
  };

  // ฟังก์ชันแปลง timestamp ให้เป็นเวลาอ่านง่าย (HH:mm:ss)
  const formatXAxis = (tickItem) => {
    const date = new Date(tickItem);
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  };

  useEffect(() => {
    // ปรับให้กราฟเปลี่ยนแปลงค่าทุกๆ 10 วินาที
    const interval = setInterval(() => {
      generateSmoothData();
    }, duration); // อัปเดตข้อมูลทุก 10 วินาที

    return () => clearInterval(interval); // ล้าง interval เมื่อ component ถูกทำลาย
  }, [currentValue]);

  return (
    <div style={{ width: '100%', height: 200 }}>
      <center><h5 style={{ color: '#181818' }}>Live Dashboard - Datarate (Updated Every 10 Seconds)</h5></center>
      <ResponsiveContainer>
        <AreaChart data={data} margin={{ top: 0, right: 30, bottom: 30, left: 0 }}>  
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="time" 
            type="number"
            domain={['auto', 'auto']} // ให้แกน X ปรับช่วงเวลาอัตโนมัติ
            tickFormatter={formatXAxis} // แปลงเวลาจาก timestamp เป็นเวลาอ่านง่าย
            scale="time"
            angle={-45} // หมุน label ของแกน X ให้เป็นแนวนอน
            textAnchor="end" // ปรับการจัดแนวข้อความ
            fontSize={10}
            tick={{ stroke: '#333333', strokeWidth: 0.8 }}
            label={{ value: 'time (Sec)', position: 'bottom', offset: '15', fontSize: '15', style: { fill: '#181818' }}}
          />
          <YAxis 
            orientation="left" // ตั้งค่าให้ label แกน Y อยู่ทางซ้าย
            dy={-10} // ปรับตำแหน่ง label ให้สูงขึ้นหรือต่ำลง
            label={{ value: 'data rate (kB)', angle: -90, position: 'center', fontSize: '15', style: { fill: '#181818' }}} // กำหนด label ของแกน Y
            fontSize={10}
            tick={{ stroke: '#333333', strokeWidth: 0.8 }}
          />
          <Tooltip labelFormatter={(label) => new Date(label).toLocaleTimeString()} />
          <Area dataKey="value" stroke="#f7693b" fill="#f5d798" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RealTimeChart;
