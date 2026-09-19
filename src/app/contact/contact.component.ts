import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface IncidentModel {
  eventType: string;
  severity: string;
  occurredAt: string;
  patientLookup: string;
  patientId: string;
  encounterId: string;
  location: string;
  description: string;
  immediateAction: string;
  outcome: string;
  escalateTo: string[];
  reportedBy: string;
  investigationNotes: string;
}

export interface PatientPreview {
  name: string;
  uhid: string;
  id: string;
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
 searchText = '';
  selectedFilter = 'ALL';

  activeTabIndex = 0;

  transfers = [
    { ref: 'TRF-000841', date: 'Feb 17, 2026', route: 'PHA-A → EMR-P', initiator: 'John Operator', items: '1 SKU', value: '$250', status: 'Draft' },
    { ref: 'TRF-000912', date: 'Feb 16, 2026', route: 'PHA-A → OT-STR', initiator: 'John Operator', items: '1 SKU', value: '$120', status: 'Approved' },
    { ref: 'TRF-000755', date: 'Feb 15, 2026', route: 'EMR-P → OPD-PHA', initiator: 'John Operator', items: '1 SKU', value: '$1,500', status: 'In Transit' },
    { ref: 'TRF-000621', date: 'Feb 14, 2026', route: 'OT-STR → PHA-A', initiator: 'John Operator', items: '1 SKU', value: '$80', status: 'Cancelled' },
    { ref: 'TRF-000542', date: 'Feb 13, 2026', route: 'OPD-PHA → PHA-A', initiator: 'John Operator', items: '1 SKU', value: '$120', status: 'Closed' }
  ];

  onTabChange(event: any) {
    const map = ['ALL', 'DRAFT', 'APPROVED', 'CANCELLED', 'CLOSED'];
    this.selectedFilter = map[event.index];
  }
  tabs = [
    { label: 'Stock Transfers', icon: 'pi pi-sync' },
    { label: 'Inventory Ledger', icon: 'pi pi-book' },
    { label: 'Global Audit Logs', icon: 'pi pi-shield' }
  ];

  filters = [
    { label: 'All', value: 'ALL' },
    { label: 'Yet to Approve', value: 'DRAFT' },
    { label: 'Approved & Active', value: 'APPROVED' },
    { label: 'Rejected', value: 'CANCELLED' },
    { label: 'Completed', value: 'CLOSED' }
  ];

  statusSeverity: any = {
    Draft: 'secondary',
    Approved: 'info',
    'In Transit': 'warning',
    Cancelled: 'danger',
    Closed: 'success'
  };
  chartOptions = {
    cutout: '70%',
    plugins: {
      legend: {
        display: false,
      },
    },
  };
  transferss = [
    {
      ref: 'TRF-000841',
      date: 'Feb 17, 2026',
      route: 'PHA-A → EMR-P',
      initiator: 'John Operator',
      items: '1 SKU',
      value: '$250',
      status: 'Draft'
    },
    {
      ref: 'TRF-000912',
      date: 'Feb 16, 2026',
      route: 'PHA-A → OT-STR',
      initiator: 'John Operator',
      items: '1 SKU',
      value: '$120',
      status: 'Approved'
    },
    {
      ref: 'TRF-000755',
      date: 'Feb 15, 2026',
      route: 'EMR-P → OPD-PHA',
      initiator: 'John Operator',
      items: '1 SKU',
      value: '$1,500',
      status: 'In Transit'
    },
    {
      ref: 'TRF-000621',
      date: 'Feb 14, 2026',
      route: 'OT-STR → PHA-A',
      initiator: 'John Operator',
      items: '1 SKU',
      value: '$80',
      status: 'Cancelled'
    },
    {
      ref: 'TRF-000542',
      date: 'Feb 13, 2026',
      route: 'OPD-PHA → PHA-A',
      initiator: 'John Operator',
      items: '1 SKU',
      value: '$120',
      status: 'Closed'
    }
  ];

  filteredTransfers() {
    return this.transfers.filter(t =>
      (this.selectedFilter === 'ALL' || t.status.toUpperCase().includes(this.selectedFilter)) &&
      (t.ref.toLowerCase().includes(this.searchText.toLowerCase()) ||
       t.initiator.toLowerCase().includes(this.searchText.toLowerCase()))
    );
  }
  ngOnInit() {

  }
}
