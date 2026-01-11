// QR Code Attendance System
import QRCode from 'qrcode';

export const generateEventQRCode = async (eventId, clubId) => {
  const attendanceData = {
    eventId,
    clubId,
    timestamp: Date.now(),
    expires: Date.now() + (15 * 60 * 1000) // 15 minutes
  };
  
  const qrData = JSON.stringify(attendanceData);
  
  try {
    const qrCodeDataURL = await QRCode.toDataURL(qrData, {
      width: 300,
      margin: 2,
      color: {
        dark: '#333333',
        light: '#FFFFFF'
      }
    });
    
    return qrCodeDataURL;
  } catch (error) {
    console.error('Error generating QR code:', error);
    return null;
  }
};

export const validateQRCode = (qrData) => {
  try {
    const data = JSON.parse(qrData);
    const now = Date.now();
    
    if (now > data.expires) {
      return { valid: false, reason: 'QR code has expired' };
    }
    
    return { valid: true, data };
  } catch (error) {
    return { valid: false, reason: 'Invalid QR code' };
  }
};

export const markAttendance = (userId, eventId, clubId) => {
  const attendanceRecord = {
    userId,
    eventId,
    clubId,
    timestamp: Date.now(),
    method: 'qr_code'
  };
  
  // Get existing attendance records
  const records = JSON.parse(localStorage.getItem('attendance_records') || '[]');
  records.push(attendanceRecord);
  localStorage.setItem('attendance_records', JSON.stringify(records));
  
  // Award points
  const user = JSON.parse(localStorage.getItem('clubconnect_user'));
  if (user) {
    user.points = (user.points || 0) + 10; // 10 points per attendance
    user.eventsAttended = (user.eventsAttended || 0) + 1;
    localStorage.setItem('clubconnect_user', JSON.stringify(user));
  }
  
  return attendanceRecord;
};
