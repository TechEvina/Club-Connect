import React, { useState, useEffect } from 'react';
import { generateEventQRCode, markAttendance } from '../services/qrCodeService';
import { useAuth } from '../context/AuthContext';
import './QRAttendance.css';

const QRAttendance = () => {
  const { user } = useAuth();
  const [mode, setMode] = useState('scan'); // 'scan' or 'generate'
  const [qrCode, setQrCode] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState('');
  const [scanResult, setScanResult] = useState(null);
  const [scanning, setScanning] = useState(false);

  const events = [
    { id: 'evt1', name: 'Robotics Workshop', clubId: 'robotics', date: 'Today, 3:00 PM' },
    { id: 'evt2', name: 'Chess Tournament', clubId: 'chess', date: 'Tomorrow, 4:00 PM' },
    { id: 'evt3', name: 'Drama Rehearsal', clubId: 'drama', date: 'Friday, 6:00 PM' }
  ];

  const handleGenerateQR = async () => {
    if (!selectedEvent) return;
    
    const event = events.find(e => e.id === selectedEvent);
    const qrCodeImage = await generateEventQRCode(event.id, event.clubId);
    setQrCode(qrCodeImage);
  };

  const handleScanQR = () => {
    setScanning(true);
    
    // Simulate QR scan (in production, use a real QR scanner library)
    setTimeout(() => {
      const mockScanData = JSON.stringify({
        eventId: 'evt1',
        clubId: 'robotics',
        timestamp: Date.now(),
        expires: Date.now() + (15 * 60 * 1000)
      });
      
      const attendance = markAttendance(user.id, 'evt1', 'robotics');
      setScanResult({
        success: true,
        message: 'Attendance marked successfully!',
        points: 10
      });
      setScanning(false);
    }, 2000);
  };

  return (
    <div className="qr-attendance-page">
      <div className="qr-header">
        <h1>📱 QR Attendance</h1>
        <p>Quick and easy event check-in</p>
      </div>

      <div className="mode-switcher">
        <button 
          className={mode === 'scan' ? 'active' : ''}
          onClick={() => setMode('scan')}
        >
          📸 Scan QR
        </button>
        <button 
          className={mode === 'generate' ? 'active' : ''}
          onClick={() => setMode('generate')}
        >
          🎫 Generate QR
        </button>
      </div>

      {mode === 'scan' && (
        <div className="scan-section">
          <div className="scan-container">
            {!scanning && !scanResult && (
              <div className="scan-placeholder">
                <div className="scan-icon">📷</div>
                <p>Position QR code within the frame</p>
                <button onClick={handleScanQR} className="scan-btn">
                  Start Scanning
                </button>
              </div>
            )}

            {scanning && (
              <div className="scanning-animation">
                <div className="scanner-line"></div>
                <p>Scanning...</p>
              </div>
            )}

            {scanResult && (
              <div className={`scan-result ${scanResult.success ? 'success' : 'error'}`}>
                <div className="result-icon">{scanResult.success ? '✅' : '❌'}</div>
                <h2>{scanResult.message}</h2>
                {scanResult.success && (
                  <div className="points-earned">
                    <span className="points-badge">+{scanResult.points} pts</span>
                  </div>
                )}
                <button onClick={() => setScanResult(null)} className="scan-again-btn">
                  Scan Another
                </button>
              </div>
            )}
          </div>

          <div className="scan-info">
            <h3>💡 How to scan</h3>
            <ul>
              <li>Ask event organizer for QR code</li>
              <li>Click "Start Scanning" button</li>
              <li>Align QR code within frame</li>
              <li>Attendance will be marked automatically</li>
            </ul>
          </div>
        </div>
      )}

      {mode === 'generate' && (
        <div className="generate-section">
          <div className="event-selector">
            <label>Select Event</label>
            <select 
              value={selectedEvent} 
              onChange={(e) => setSelectedEvent(e.target.value)}
            >
              <option value="">Choose an event...</option>
              {events.map(event => (
                <option key={event.id} value={event.id}>
                  {event.name} - {event.date}
                </option>
              ))}
            </select>
            <button 
              onClick={handleGenerateQR}
              disabled={!selectedEvent}
              className="generate-btn"
            >
              Generate QR Code
            </button>
          </div>

          {qrCode && (
            <div className="qr-display">
              <div className="qr-code-container">
                <img src={qrCode} alt="Event QR Code" />
              </div>
              <div className="qr-instructions">
                <h3>✅ QR Code Generated</h3>
                <p>Show this code to attendees for quick check-in</p>
                <div className="qr-details">
                  <span className="qr-label">Valid for:</span>
                  <span className="qr-value">15 minutes</span>
                </div>
                <div className="qr-actions">
                  <button className="download-btn">💾 Download</button>
                  <button className="share-btn">📤 Share</button>
                </div>
              </div>
            </div>
          )}

          <div className="generate-info">
            <h3>ℹ️ For Organizers</h3>
            <ul>
              <li>Generate QR code before event starts</li>
              <li>Display code on screen or print it</li>
              <li>Attendees scan to mark attendance</li>
              <li>Code expires after 15 minutes for security</li>
              <li>Attendance records saved automatically</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default QRAttendance;
