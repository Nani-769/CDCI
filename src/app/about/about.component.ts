import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent {
dateRange: Date[] = [];
  searchText = '';
  genderPeriod = 'Today';
  agePeriod = 'Today';
  locationPeriod = 'today';
  referralPeriod = 'today';

  periodOptions = [
    { label: 'Today', value: 'Today' },
    { label: 'Monthly', value: 'Monthly' },
    { label: 'Yearly', value: 'Yearly' },
  ];

  kpiCards = [
    { title: 'Total Registered (2025)', value: '18,432', badge: '▲ 12.4% vs 2024', badgeType: 'badge-up', color: '#3b82f6' },
    { title: "Today's Registrations", value: '247', badge: '▲ 18 vs yesterday', badgeType: 'badge-up', color: '#14b8a6' },
    { title: 'New Patients (This Month)', value: '1,584', badge: '▼ 3.1% vs last month', badgeType: 'badge-down', color: '#f43f5e' },
    { title: 'Returning Patients', value: '62.7%', badge: '▲ 5.2% loyalty rate', badgeType: 'badge-up', color: '#f59e0b' },
    { title: 'Corporate Tie-ups', value: '14', badge: '3,210 corporate pts', badgeType: 'badge-neutral', color: '#8b5cf6' },
  ];

  dailyStats = { walkins: 182, appointments: 65 };

  hourlyChartData = {
    labels: ['9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM'],
    datasets: [{ label: 'Patients', backgroundColor: '#3b82f6', data: [18, 34, 41, 38, 22, 45, 32, 17] }],
  };

  monthlyChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
    datasets: [{ label: 'Registrations', backgroundColor: '#10b981', data: [1421, 1380, 1510, 1490, 1620, 1543, 1612, 1589, 1701, 1584, 1582] }],
  };

  chartOptions = { responsive: true, maintainAspectRatio: false };

  donutOptions = { plugins: { legend: { display: false } }, cutout: '70%' };

  genderChartData = {
    labels: ['Male', 'Female', 'Other'],
    datasets: [{ data: [58, 36, 6], backgroundColor: ['#3b82f6', '#f43f5e', '#f59e0b'] }],
  };

  ageData = [
    { label: '0–12', value: 28, percent: 20, color: '#fde68a' },
    { label: '13–24', value: 21, percent: 15, color: '#fcd34d' },
    { label: '25–40', value: 86, percent: 80, color: '#f59e0b' },
    { label: '41–60', value: 94, percent: 100, color: '#d97706' },
    { label: '61–80', value: 18, percent: 35, color: '#b45309' },
  ];

  yearlyGrowth = [
    { year: '2021', value: '11,204', percent: 48 },
    { year: '2022', value: '13,451', percent: 61 },
    { year: '2023', value: '15,884', percent: 72 },
    { year: '2024', value: '16,398', percent: 84 },
    { year: '2025', value: '18,432', percent: 100 },
  ];

  locations = [
    { area: 'Hyderabad Central', patients: 42, share: 100 },
    { area: 'Secunderabad', patients: 35, share: 83 },
    { area: 'Gachibowli', patients: 28, share: 67 },
    { area: 'Banjara Hills', patients: 24, share: 57 },
  ];

  referrals = [
    { name: 'Doctor Referral', percent: 28, count: 69, color: '#8b5cf6' },
    { name: 'Word of Mouth', percent: 24, count: 59, color: '#3b82f6' },
    { name: 'Online Search', percent: 22, count: 54, color: '#14b8a6' },
    { name: 'Social Media', percent: 16, count: 40, color: '#f43f5e' },
    { name: 'Other', percent: 10, count: 25, color: '#f59e0b' },
  ];

  referralChartData = {
    labels: ['Doctor', 'Word of Mouth', 'Online', 'Social', 'Other'],
    datasets: [{ data: [28, 24, 22, 16, 10], backgroundColor: ['#8b5cf6', '#3b82f6', '#14b8a6', '#f43f5e', '#f59e0b'] }],
  };

  monthlyReturning = [
    { month: 'Jan', value: 531, percent: 58 },
    { month: 'Mar', value: 589, percent: 64 },
    { month: 'Jun', value: 641, percent: 70 },
    { month: 'Sep', value: 712, percent: 100 },
  ];

  corporatePatients = [
    { code: 'TCS', company: 'TCS Ltd.', type: 'IT', patients: 621, revenue: '₹18.4L', status: 'active', color: '#3b82f6' },
    { code: 'INF', company: 'Infosys', type: 'IT', patients: 548, revenue: '₹16.2L', status: 'active', color: '#8b5cf6' },
    { code: 'REL', company: 'Reliance', type: 'Mfg', patients: 412, revenue: '₹12.1L', status: 'active', color: '#f59e0b' },
    { code: 'L&T', company: 'L&T Group', type: 'Engg', patients: 389, revenue: '₹11.4L', status: 'active', color: '#14b8a6' },
    { code: 'WPR', company: 'Wipro', type: 'IT', patients: 341, revenue: '₹10.0L', status: 'renewal', color: '#f43f5e' },
  ];

  patients = [
    { id: 'PT-00214', name: 'Rajesh Kumar', initial: 'RK', color: '#3b82f6', ageGender: '45 / M', phone: '98765-43210', area: 'Hyd Central', regDate: '15 Jan 2025', type: 'Returning', referredBy: 'Dr. Sharma', corporate: 'TCS Ltd.', lastVisit: '3 Dec 2025', status: 'Active' },
    { id: 'PT-00215', name: 'Priya Patel', initial: 'PP', color: '#f43f5e', ageGender: '32 / F', phone: '91234-56789', area: 'Banjara Hills', regDate: '16 Jan 2025', type: 'New', referredBy: 'Google Search', corporate: '—', lastVisit: '16 Jan 2025', status: 'Active' },
    { id: 'PT-00216', name: 'Arjun Mehta', initial: 'AM', color: '#8b5cf6', ageGender: '58 / M', phone: '99988-77123', area: 'Secunderabad', regDate: '18 Jan 2025', type: 'Returning', referredBy: 'Dr. Reddy', corporate: 'Infosys', lastVisit: '10 Nov 2025', status: 'Active' },
    { id: 'PT-00217', name: 'Sunita Nair', initial: 'SN', color: '#14b8a6', ageGender: '27 / F', phone: '87654-32109', area: 'Gachibowli', regDate: '20 Jan 2025', type: 'New', referredBy: 'Social Media', corporate: '—', lastVisit: '20 Jan 2025', status: 'Follow-up' },
    { id: 'PT-00218', name: 'Vikram Chandra', initial: 'VC', color: '#f59e0b', ageGender: '63 / M', phone: '78901-23456', area: 'Kukatpally', regDate: '22 Jan 2025', type: 'Returning', referredBy: 'Word of Mouth', corporate: 'L&T', lastVisit: '5 Dec 2025', status: 'Active' },
  ];

  ngOnInit() {}

  refresh() {
    console.log('Refreshing dashboard...');
  }
}
