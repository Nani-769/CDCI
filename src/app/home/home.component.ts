import { Component, ElementRef, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [MessageService],
})
export class HomeComponent {
 selectedPeriod = 'today';
  period = 'today';
  dateRange: any;
  totalAppointments = 312;

  kpiCards = [
    { label: 'Total Appointments (2025)', value: '24,816', trend: 'badge-up',   trendText: '▲ 9.3% vs 2024',        color: '#6366f1', type: 'total'      },
    { label: "Today's Appointments",      value: '312',    trend: 'badge-up',   trendText: '▲ 24 vs yesterday',      color: '#14b8a6', type: 'today'      },
    { label: 'Cancellations',             value: '187',    trend: 'badge-down', trendText: '▲ 11.8% cancel rate',    color: '#f43f5e', type: 'cancel'     },
    { label: 'Avg. Waiting Time',         value: '18 min', trend: 'badge-down', trendText: '▼ 3 min vs last month',  color: '#f59e0b', type: 'waiting'    },
    { label: 'Appointment Conversion',    value: '84.2%',  trend: 'badge-up',   trendText: '▲ 2.1% vs last month',  color: '#10b981', type: 'conversion' },
  ];

  doctors = [
    { initials: 'RM', name: 'Dr. Ramesh Mehta',  department: 'Cardiology',  booked: 38, seen: 34, pending: 4, color: '#6366f1' },
    { initials: 'SR', name: 'Dr. Sunita Reddy',  department: 'Gynecology',  booked: 32, seen: 29, pending: 3, color: '#14b8a6' },
    { initials: 'AK', name: 'Dr. Anil Kumar',    department: 'Orthopedics', booked: 28, seen: 26, pending: 2, color: '#f59e0b' },
    { initials: 'PV', name: 'Dr. Priya Verma',   department: 'Dermatology', booked: 24, seen: 21, pending: 3, color: '#f43f5e' },
    { initials: 'KD', name: 'Dr. Kiran Das',     department: 'Neurology',   booked: 22, seen: 19, pending: 3, color: '#8b5cf6' },
  ];

  departments = [
    { name: 'Cardiology',  percent: 28, count: 87, color: '#6366f1', time: 28 },
    { name: 'Gynecology',  percent: 19, count: 59, color: '#14b8a6', time: 19 },
    { name: 'Opthopedics', percent: 16, count: 50, color: '#f59e0b', time: 16 },
    { name: 'Dermatology', percent: 16, count: 44, color: '#f43f5e', time: 16 },
    { name: 'Neurology',   percent: 12, count: 37, color: '#8b5cf6', time: 16 },
    { name: 'Others',      percent: 16, count: 35, color: '#10b981', time: 16 },
  ];

  deptChartData = {
    labels: this.departments.map(d => d.name),
    datasets: [{
      data: this.departments.map(d => d.percent),
      backgroundColor: this.departments.map(d => d.color),
      borderWidth: 0,
    }],
  };

  chartOptions = {
    cutout: '70%',
    plugins: { legend: { display: false } },
  };

  schedule = [
    { time: '9–10 AM',  count: 38, percent: 60,  status: 'full' },
    { time: '10–11 AM', count: 54, percent: 85,  status: 'full' },
    { time: '11–12 PM', count: 61, percent: 100, status: 'over' },
    { time: '12–1 PM',  count: 45, percent: 70,  status: 'good' },
    { time: '2–3 PM',   count: 50, percent: 80,  status: 'full' },
    { time: '3–4 PM',   count: 36, percent: 55,  status: 'open' },
    { time: '4–5 PM',   count: 28, percent: 40,  status: 'open' },
  ];

  missedPatients = [
    { patient: 'PT–02184 · Rajan Verma',  time: '9:30 AM',  department: 'Cardiology', doctor: 'Dr. Mehta', status: 'SMS sent',    color: '#f59e0b' },
    { patient: 'PT–01921 · Sheela Rao',   time: '10:00 AM', department: 'Gynecology', doctor: 'Dr. Reddy', status: 'Called',      color: '#f59e0b' },
    { patient: 'PT–03342 · Arjun Nair',   time: '11:30 AM', department: 'Ortho',      doctor: 'Dr. Kumar', status: 'Not reached', color: '#ef4444' },
    { patient: 'PT–02841 · Kavya Singh',  time: '2:00 PM',  department: 'Neuro',      doctor: 'Dr. Das',   status: 'SMS sent',    color: '#fbbf24' },
  ];

  waitingData = [
    { label: 'Under 10 min', percent: 28, color: '#22c55e' },
    { label: '10–20 min',    percent: 44, color: '#facc15' },
    { label: '20–30 min',    percent: 21, color: '#ef4444' },
    { label: 'Over 30 min',  percent: 7,  color: '#be123c' },
  ];

  hours = Array.from({ length: 24 }, (_, i) => String(i));

  cardio = [1,0,0,0,2,3,5,7,8,14,18,16,10,19,12,7,6,5,3,2,1,0,0,0];
  gynec  = [0,0,1,1,2,4,6,8,6,11,14,16,7,17,10,4,3,2,1,1,0,0,0,0];
  ortho  = [0,0,0,0,1,2,3,4,5,9,12,8,4,11,9,3,2,2,1,1,0,0,0,0];

  changePeriod(p: string) { this.selectedPeriod = p; }
  setPeriod(p: string)    { this.period = p; }

  viewRecords(type: any)    { console.log('Open records for', type); }
  exportReport()            { console.log('export'); }
  refreshDashboard()        { console.log('refresh'); }
  openDoctorRecords()       { console.log('open doctor records'); }
  openScheduleRecords()     { console.log('open schedule records'); }
  openCancelRecords()       { console.log('open cancellation records'); }
  openMissedRecords()       { console.log('open missed appointments'); }
  openRecords()             { console.log('open consultation records'); }
}
