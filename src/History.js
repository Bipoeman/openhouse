import React, { useState, useEffect } from 'react';
import './index.css';

const FileHistory = () => {
  const [history, setHistory] = useState([]); // สร้าง state สำหรับเก็บประวัติ 10 รายการล่าสุด
  const [fileName, setFileName] = useState(''); // สร้าง state สำหรับเก็บชื่อไฟล์ปัจจุบัน

  // ฟังก์ชันดึงข้อมูลจาก API
  const fetchData = async () => {
    try {
      const response = await fetch('https://api.example.com/files'); // แทน URL ด้วย API ที่คุณต้องการ
      const result = await response.json();

      // สมมุติว่า result มีชื่อไฟล์อยู่ในฟิลด์ "fileName"
      const newFile = result.fileName || 'testpicfile_withip4_' + Math.floor(Math.random() * 100); // ใช้ข้อมูลที่ดึงมา หรือสร้างข้อมูลจำลอง

      // อัปเดตชื่อไฟล์
      setFileName(newFile);

      // อัปเดต history ให้แสดงเฉพาะ 10 รายการล่าสุด
      setHistory((prevHistory) => {
        const updatedHistory = [newFile, ...prevHistory]; // เพิ่มชื่อไฟล์ใหม่เข้าไปในลำดับแรก
        if (updatedHistory.length > 9) {
          return updatedHistory.slice(0, 9); // เก็บแค่ 10 รายการล่าสุด
        }
        return updatedHistory;
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // ฟังก์ชันสร้างข้อมูลสมมุติ
  const generateMockData = () => {
    const randomFileNumber = Math.floor(Math.random() * 1000); // สร้างหมายเลขไฟล์สุ่ม
    const newFile = `testpicfile_withip4_${randomFileNumber}.HEX`; // ชื่อไฟล์สมมุติ

    // อัปเดตชื่อไฟล์
    setFileName(newFile);

    // อัปเดต history ให้แสดงเฉพาะ 10 รายการล่าสุด
    setHistory((prevHistory) => {
      const updatedHistory = [newFile, ...prevHistory]; // เพิ่มชื่อไฟล์ใหม่เข้าไปในลำดับแรก
      if (updatedHistory.length > 30) {
        return updatedHistory.slice(0, 30); // เก็บแค่ 10 รายการล่าสุด
      }
      return updatedHistory;
    });
  };

  useEffect(() => {
    const interval = setInterval(generateMockData, 150); // ดึงข้อมูลทุก 1 วินาทีจากฟังก์ชัน generateMockData

    return () => clearInterval(interval); // ล้าง interval เมื่อ component ถูกทำลาย
  }, []); // ใช้ [] เพื่อให้ useEffect รันครั้งเดียวเมื่อ component ถูก mount

  return (
    <div>
      <center><h5 style={{ color: '#181818' }}>File History</h5></center>
      <ul style={{ color: '#181818' }}>
        {history.map((file, index) => (
          <li key={index}>{file}</li> // แสดงชื่อไฟล์ในรายการ
        ))}
      </ul>
    </div>
  );
};

export default FileHistory;
