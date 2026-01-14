import React, { useState, useEffect, useRef } from 'react';
import { generateEventQRCode, markAttendance, validateQRCode } from '../services/qrCodeService';
import { useAuth } from '../context/AuthContext';
import './QRAttendance.css';

const QRAttendance = () => {
  const { user } = useAuth();
  const [mode, setMode] = useState('scan'); // 'scan' or 'generate'
  const [qrCode, setQrCode] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState('');
  const [scanResult, setScanResult] = useState(null);
  const [scanning, setScanning] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const detectorRef = useRef(null);
  const scanIntervalRef = useRef(null);

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
    setScanResult(null);
    setScanning(true);

    // Start camera and initialize BarcodeDetector when available
    const start = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }

        // Prefer native BarcodeDetector when available
        if (window.BarcodeDetector) {
          try {
            const formats = await BarcodeDetector.getSupportedFormats();
            if (formats.includes('qr_code')) {
              detectorRef.current = new BarcodeDetector({ formats: ['qr_code'] });
            }
          } catch (e) {
            // ignore
          }
        }

        // Poll for detections
        scanIntervalRef.current = setInterval(async () => {
          try {
            if (detectorRef.current && videoRef.current) {
              const detections = await detectorRef.current.detect(videoRef.current);
              if (detections && detections.length > 0) {
                handleDetected(detections[0].rawValue);
              }
            } else if (videoRef.current && canvasRef.current) {
              // Fallback: draw frame to canvas and try detector if available
              const ctx = canvasRef.current.getContext('2d');
              canvasRef.current.width = videoRef.current.videoWidth;
              canvasRef.current.height = videoRef.current.videoHeight;
              ctx.drawImage(videoRef.current, 0, 0);
              // If BarcodeDetector exists but wasn't initialized earlier, try detect on canvas
              if (window.BarcodeDetector) {
                try {
                  const imgBitmap = await createImageBitmap(canvasRef.current);
                  const det = new BarcodeDetector({ formats: ['qr_code'] });
                  const results = await det.detect(imgBitmap);
                  if (results && results.length > 0) handleDetected(results[0].rawValue);
                } catch (e) {
                  // no-op
                }
              }
            }
          } catch (err) {
            // ignore transient errors
          }
        }, 500);
      } catch (err) {
        setScanResult({ success: false, message: 'Camera access denied or not available' });
        setScanning(false);
      }
    };

    start();
  };

  const stopScanning = () => {
    setScanning(false);
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
      scanIntervalRef.current = null;
    }
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(t => t.stop());
      videoRef.current.srcObject = null;
    }
    detectorRef.current = null;
  };

  const handleDetected = (rawValue) => {
    const validation = validateQRCode(rawValue);
    if (!validation.valid) {
      setScanResult({ success: false, message: validation.reason || 'Invalid QR code' });
      stopScanning();
      return;
    }

    const { data } = validation;
    markAttendance(user?.id || 'anon', data.eventId, data.clubId);
    setScanResult({ success: true, message: 'Attendance marked successfully!', points: 10 });
    stopScanning();
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
                  Start Camera
                </button>
              </div>
            )}

            {scanning && (
              <div className="camera-frame">
                <video ref={videoRef} className="video-feed" playsInline muted />
                <canvas ref={canvasRef} style={{ display: 'none' }} />
                <div className="scanner-overlay">
                  <div className="scanner-line"></div>
                </div>
                <div style={{ marginTop: 12 }}>
                  <button onClick={stopScanning} className="scan-btn">Stop</button>
                </div>
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
