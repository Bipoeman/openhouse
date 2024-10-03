import React, { useState, useEffect } from 'react';
import './index.css';
import { Facebook, Instagram } from "react-feather";
import igicon from "./Instagram_icon.png"
import fbicon from "./Facebook_Logo.png"

const FileHistory = () => {
  const [history, setHistory] = useState([]); // สร้าง state สำหรับเก็บประวัติ
  const [fileName, setFileName] = useState(''); // สร้าง state สำหรับเก็บชื่อไฟล์ปัจจุบัน

  // ฟังก์ชันสร้างข้อมูลสมมุติ
  const generateMockData = () => {
    const randomFileNumber = Math.floor(Math.random() * 1000); // สร้างหมายเลขไฟล์สุ่ม
    const newFile = `testpicfile_withip4_${randomFileNumber}.HEX`; // ชื่อไฟล์สมมุติ

    // อัปเดตชื่อไฟล์
    setFileName(newFile);

    // อัปเดต history ให้แสดงเฉพาะ 10 รายการล่าสุด
    setHistory((prevHistory) => {
      const updatedHistory = [newFile, ...prevHistory]; // เพิ่มชื่อไฟล์ใหม่เข้าไปในลำดับแรก
      if (updatedHistory.length > 10) {
        return updatedHistory.slice(0, 10); // เก็บแค่ 10 รายการล่าสุด
      }
      return updatedHistory;
    });
  };

  useEffect(() => {
    const interval = setInterval(generateMockData, 150); // สร้างข้อมูลทุกๆ 150 มิลลิวินาที

    return () => clearInterval(interval); // ล้าง interval เมื่อ component ถูกทำลาย
  }, []); 

  return (
    <div className="file-history-wrapper">
      <center><h5 style={{ color: '#181818' }}>File History</h5></center>
      <ul style={{ color: '#181818' }}>
        {history.map((file, index) => (
          <li key={index}>{file}</li> // แสดงชื่อไฟล์ในรายการ
        ))}
      </ul>

      {/* เพิ่ม Contact Section */}
      <div className="contact-section">
        <h3>Contact Us</h3>
        <ul style={{ display: 'flex', gap: '20px' }}>
  <li style={{ display: 'flex', alignItems: 'center',marginLeft:'10px' }}>
    <a
      href="https://www.instagram.com/knacksat3"
      target="_blank"
      rel="KNACKSAT"
      title="Instagram"
      style={{ display: 'flex', alignItems: 'center' }} // จัดให้อยู่ในบรรทัดเดียวกัน
    >
      <img
        src={igicon} // ชี้ไปยังโฟลเดอร์ public โดยตรง
        alt='IG'
        style={{width:'28px',height:'28px'}}      
      />

      <span style={{ marginLeft: '8px', color: '#181818',fontSize:'24px'}}>KNACKSAT</span> {/* เว้นช่องว่างระหว่างโลโก้กับข้อความ */}
    </a>
  </li>
  <li style={{ display: 'flex', alignItems: 'center' }}>
    <a
      href="https://www.facebook.com/KNACKSAT3"
      target="_blank"
      rel="KNACKSAT"
      title="Facebook"
      style={{ display: 'flex', alignItems: 'center' }} // จัดให้อยู่ในบรรทัดเดียวกัน
    >
      <img
        src={fbicon} // ชี้ไปยังโฟลเดอร์ public โดยตรง
        alt='FACEBOOK'
        style={{width:'28px',height:'28px'}}      
      />
      <span style={{ marginLeft: '8px', color: '#181818',fontSize:'24px' }}>KNACKSAT</span> {/* เว้นช่องว่างระหว่างโลโก้กับข้อความ */}
    </a>
  </li>
</ul>

      </div>
    </div>
  );
};

export default FileHistory;
