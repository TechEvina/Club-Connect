import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import './Analytics.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Analytics = () => {
  const { user } = useAuth();
  const [timeRange, setTimeRange] = useState('week');

  const engagementData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Event Attendance',
      data: [12, 19, 15, 25, 22, 18, 20],
      borderColor: '#7ED957',
      backgroundColor: 'rgba(126, 217, 87, 0.1)',
      tension: 0.4
    }]
  };

  const clubDistributionData = {
    labels: ['STEM', 'Arts', 'Sports', 'Community Service', 'Leadership'],
    datasets: [{
      data: [30, 20, 15, 25, 10],
      backgroundColor: [
        '#7ED957',
        '#6EB5FF',
        '#FFE066',
        '#FF9AA2',
        '#95E1D3'
      ]
    }]
  };

  const attendanceComparisonData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Your Attendance',
        data: [3, 5, 4, 6],
        backgroundColor: '#7ED957'
      },
      {
        label: 'School Average',
        data: [2, 3, 3, 4],
        backgroundColor: '#6EB5FF'
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom'
      }
    }
  };

  return (
    <div className="analytics-page">
      <div className="analytics-header">
        <div>
          <h1>📊 Analytics Dashboard</h1>
          <p>Insights into your club engagement</p>
        </div>
        <select 
          value={timeRange} 
          onChange={(e) => setTimeRange(e.target.value)}
          className="time-range-select"
        >
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="semester">This Semester</option>
          <option value="year">This Year</option>
        </select>
      </div>

      <div className="analytics-grid">
        <div className="metric-card highlight">
          <div className="metric-icon">📈</div>
          <div className="metric-content">
            <h3>Total Events</h3>
            <p className="metric-value">{user?.eventsAttended || 0}</p>
            <span className="metric-change positive">+15% from last week</span>
          </div>
        </div>

        <div className="metric-card highlight">
          <div className="metric-icon">⭐</div>
          <div className="metric-content">
            <h3>Engagement Score</h3>
            <p className="metric-value">85%</p>
            <span className="metric-change positive">+8% from last week</span>
          </div>
        </div>

        <div className="metric-card highlight">
          <div className="metric-icon">🏆</div>
          <div className="metric-content">
            <h3>Leaderboard Rank</h3>
            <p className="metric-value">#12</p>
            <span className="metric-change positive">+3 positions</span>
          </div>
        </div>

        <div className="metric-card highlight">
          <div className="metric-icon">⏱️</div>
          <div className="metric-content">
            <h3>Hours This Month</h3>
            <p className="metric-value">{user?.hoursVolunteered || 0}h</p>
            <span className="metric-change positive">+5h from last month</span>
          </div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <h2>Weekly Engagement Trend</h2>
          <div className="chart-container">
            <Line data={engagementData} options={chartOptions} />
          </div>
        </div>

        <div className="chart-card">
          <h2>Club Distribution</h2>
          <div className="chart-container">
            <Doughnut data={clubDistributionData} options={chartOptions} />
          </div>
        </div>

        <div className="chart-card wide">
          <h2>Attendance Comparison</h2>
          <div className="chart-container">
            <Bar data={attendanceComparisonData} options={chartOptions} />
          </div>
        </div>
      </div>

      <div className="insights-section">
        <h2>💡 Key Insights</h2>
        <div className="insights-grid">
          <div className="insight-card">
            <div className="insight-icon">🔥</div>
            <div className="insight-content">
              <h3>Consistent Engagement</h3>
              <p>You've attended events 4 weeks in a row! Keep up the great work.</p>
            </div>
          </div>
          <div className="insight-card">
            <div className="insight-icon">📚</div>
            <div className="insight-content">
              <h3>STEM Focus</h3>
              <p>60% of your activities are STEM-related. Consider exploring other areas!</p>
            </div>
          </div>
          <div className="insight-card">
            <div className="insight-icon">🎯</div>
            <div className="insight-content">
              <h3>Peak Activity</h3>
              <p>Thursdays are your most active days with 5 events attended on average.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
