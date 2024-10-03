import React, { useState, useEffect } from 'react';

// ฟังก์ชันเพื่อโหลดรูปภาพตามชื่อที่กำหนด
const importImages = (n) => {
  const images = [];
  
  // สร้างชื่อไฟล์จาก 0_0 ถึง (n-1)_(n-1)
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const fileName = `${i}_${j}.jpg`; // สร้างชื่อไฟล์
      images.push(fileName); // เพิ่มชื่อไฟล์ลงในอาร์เรย์
    }
  }
  
  return images; // ส่งกลับอาร์เรย์ชื่อไฟล์
};

const ImageGrid = ({ n, onComplete }) => {
  const [loadedImages, setLoadedImages] = useState([]); // เก็บรูปที่โหลดแล้ว

  // ฟังก์ชันเพิ่มรูปทีละรูป
  const loadImages = (index, images) => {
    if (index < images.length) {
      const imgSrc = images[index];

      // ตรวจสอบว่ารูปภาพสามารถโหลดได้
      const image = new Image();
      image.src = require(`./img/${imgSrc}`);
      image.onload = () => {
        setLoadedImages((prevLoaded) => [...prevLoaded, imgSrc]); // เพิ่มรูปใหม่เข้า array
      };
      image.onerror = () => {
        console.error(`Error loading image: ${imgSrc}`); // แสดงข้อผิดพลาดในกรณีที่ไม่สามารถโหลดรูปภาพได้
      };

      setTimeout(() => loadImages(index + 1, images),20); // โหลดรูปถัดไปหลังจาก 1 วินาที
    } else {
      onComplete(); // เรียกฟังก์ชันเมื่อโหลดครบ
    }
  };

  useEffect(() => {
    const images = importImages(n); // โหลดชื่อรูปภาพตาม n
    loadImages(0, images); // เริ่มโหลดรูปภาพจาก index ที่ 0
  }, [n]);

  return (
    <center><div className="image-grid" style={{ display: 'grid', gridTemplateColumns: `repeat(${n}, 1fr)`, gap: '0' }}>
      {loadedImages.map((imgSrc, index) => (
        <div key={index} className="grid-item">
          <img 
            src={require(`./img/${imgSrc}`)} // ใช้ require เพื่อโหลดรูปจากโฟลเดอร์ img
            alt={`Image ${index}`} 
            style={{ width: '100%', height: '100%', borderRadius: '0px'}} 
          />
        </div>
      ))}
    </div>
    </center>
  );
};

// Component หลัก
const App = () => {
  const [n, setN] = useState(30); // ตั้งค่าเริ่มต้นเป็น 3x3
  const [reload, setReload] = useState(0); // สถานะสำหรับควบคุมการโหลดใหม่

  const handleComplete = () => {
    setTimeout(() => {
      setReload((prev) => prev + 1); // อัปเดตสถานะเพื่อให้โหลดใหม่
    }, 1000); // รอ 30 วินาทีก่อนเคลียร์
  };

  return (
    <div>
      <ImageGrid n={n} onComplete={handleComplete} key={reload} margin={{ top: 0, right: 0, bottom: '20%', left: 0 }}/> {/* ส่งค่า n และฟังก์ชัน onComplete */}
    </div>
  );
};

export default App;
