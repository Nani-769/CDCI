import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';
 
// ─── Interfaces ───────────────────────────────────────────────────────────────
 
export interface DrugLibraryItem {
  name: string;
  type: 'pre' | 'sys' | 'post';
  sub: string;
  route: string;
}
 
export interface DrugDetail {
  name: string;
  zone: 'pre' | 'sys' | 'post';
  dose: string;
  doseUnit: string;
  dosePer: string;
  maxDose: string;
  maxDoseUnit: string;
  route: string;
  adminType: string;
  durationType: string;
  freq: string;
  diluent: string;
  volume: string;
  hrs: number;
  mins: number;
  special: string;
  adminDays: string;
  adminDaysParsed: number[];
  isComplete: boolean;
}
 
export interface ZoneDrug {
  name: string;
  zone: 'pre' | 'sys' | 'post';
  detail?: DrugDetail;
}
 
export interface Protocol {
  id: number;
  name: string;
  status: 'Active' | 'Draft' | 'Inactive';
  cycles: number;
  days: number;
  drugCount: number;
}
 
export interface VersionEntry {
  version: string;
  label: string;
  author: string;
  date: string;
  isCurrent: boolean;
}
 
// ─── Sample data ──────────────────────────────────────────────────────────────
 
const DRUG_LIBRARY_DATA: DrugLibraryItem[] = [
  { name: 'Ondansetron',    type: 'pre',  sub: '5-HT3 Antagonist',        route: 'IV' },
  { name: 'Palonosetron',   type: 'pre',  sub: '5-HT3 Antagonist',        route: 'IV' },
  { name: 'Granisetron',    type: 'pre',  sub: '5-HT3 Antagonist',        route: 'IV' },
  { name: 'Aprepitant',     type: 'pre',  sub: 'NK-1 Antagonist',         route: 'PO' },
  { name: 'Fosaprepitant',  type: 'pre',  sub: 'NK-1 Antagonist',         route: 'IV' },
  { name: 'Dexamethasone',  type: 'pre',  sub: 'Corticosteroid',          route: 'IV' },
  { name: 'Methylprednisolone', type: 'pre', sub: 'Corticosteroid',       route: 'IV' },
  { name: 'Pheniramine',    type: 'pre',  sub: 'Antihistamine',           route: 'IV' },
  { name: 'Diphenhydramine',type: 'pre',  sub: 'Antihistamine',           route: 'IV' },
  { name: 'Ranitidine',     type: 'pre',  sub: 'H2 Blocker',              route: 'IV' },
  { name: 'Famotidine',     type: 'pre',  sub: 'H2 Blocker',              route: 'IV' },
  { name: 'Pantoprazole',   type: 'pre',  sub: 'Proton Pump Inhibitor',   route: 'IV' },
  { name: 'Mannitol',       type: 'pre',  sub: 'Osmotic Diuretic',        route: 'IV' },
  { name: 'Atropine',       type: 'pre',  sub: 'Anticholinergic',         route: 'IV' },
  { name: 'Doxorubicin',         type: 'sys', sub: 'Anthracycline',                    route: 'IV' },
  { name: 'Liposomal Doxorubicin', type: 'sys', sub: 'Anthracycline',                  route: 'IV' },
  { name: 'Epirubicin',           type: 'sys', sub: 'Anthracycline',                   route: 'IV' },
  { name: 'Paclitaxel',           type: 'sys', sub: 'Taxane',                          route: 'IV Infusion' },
  { name: 'Nab-Paclitaxel',       type: 'sys', sub: 'Taxane',                          route: 'IV Infusion' },
  { name: 'Docetaxel',            type: 'sys', sub: 'Taxane',                          route: 'IV Infusion' },
  { name: 'Cisplatin',            type: 'sys', sub: 'Platinum',                        route: 'IV' },
  { name: 'Carboplatin',          type: 'sys', sub: 'Platinum',                        route: 'IV' },
  { name: 'Oxaliplatin',          type: 'sys', sub: 'Platinum',                        route: 'IV' },
  { name: 'Cyclophosphamide',     type: 'sys', sub: 'Alkylating',                      route: 'IV' },
  { name: 'Ifosfamide',           type: 'sys', sub: 'Alkylating',                      route: 'IV' },
  { name: 'Temozolomide',         type: 'sys', sub: 'Alkylating',                      route: 'PO' },
  { name: '5-Fluorouracil',       type: 'sys', sub: 'Antimetabolite',                  route: 'IV' },
  { name: 'Capecitabine',         type: 'sys', sub: 'Antimetabolite',                  route: 'PO' },
  { name: 'Gemcitabine',          type: 'sys', sub: 'Antimetabolite',                  route: 'IV' },
  { name: 'Methotrexate',         type: 'sys', sub: 'Antimetabolite',                  route: 'IV' },
  { name: 'Pemetrexed',           type: 'sys', sub: 'Antimetabolite',                  route: 'IV' },
  { name: 'Cytarabine',           type: 'sys', sub: 'Antimetabolite',                  route: 'IV' },
  { name: 'Leucovorin',           type: 'sys', sub: 'Folate Analog',                   route: 'IV' },
  { name: 'Irinotecan',           type: 'sys', sub: 'Topoisomerase Inhibitor',          route: 'IV' },
  { name: 'Etoposide',            type: 'sys', sub: 'Topoisomerase Inhibitor',          route: 'IV' },
  { name: 'Vincristine',          type: 'sys', sub: 'Vinca Alkaloid',                  route: 'IV' },
  { name: 'Vinblastine',          type: 'sys', sub: 'Vinca Alkaloid',                  route: 'IV' },
  { name: 'Bleomycin',            type: 'sys', sub: 'Antitumor Antibiotic',            route: 'IV' },
  { name: 'Trastuzumab',          type: 'sys', sub: 'HER2 Targeted',                   route: 'IV' },
  { name: 'Pertuzumab',           type: 'sys', sub: 'HER2 Targeted',                   route: 'IV' },
  { name: 'Bevacizumab',          type: 'sys', sub: 'Anti-VEGF',                       route: 'IV' },
  { name: 'Cetuximab',            type: 'sys', sub: 'Anti-EGFR',                       route: 'IV' },
  { name: 'Rituximab',            type: 'sys', sub: 'Anti-CD20',                       route: 'IV' },
  { name: 'Nivolumab',            type: 'sys', sub: 'PD-1 Checkpoint Inhibitor',       route: 'IV' },
  { name: 'Pembrolizumab',        type: 'sys', sub: 'PD-1 Checkpoint Inhibitor',       route: 'IV' },
  { name: 'Atezolizumab',         type: 'sys', sub: 'PD-L1 Checkpoint Inhibitor',      route: 'IV' },
  { name: 'Imatinib',             type: 'sys', sub: 'Tyrosine Kinase Inhibitor',       route: 'PO' },
  { name: 'Osimertinib',          type: 'sys', sub: 'Tyrosine Kinase Inhibitor',       route: 'PO' },
  { name: 'Bortezomib',           type: 'sys', sub: 'Proteasome Inhibitor',            route: 'SC' },
  { name: 'Lenalidomide',         type: 'sys', sub: 'Immunomodulator',                 route: 'PO' },
  { name: 'Filgrastim',     type: 'post', sub: 'G-CSF',               route: 'SC' },
  { name: 'Pegfilgrastim',  type: 'post', sub: 'G-CSF (long acting)', route: 'SC' },
  { name: 'Lenograstim',    type: 'post', sub: 'G-CSF',               route: 'SC' },
  { name: 'Mesna',          type: 'post', sub: 'Uroprotectant',       route: 'IV' },
  { name: 'Calcium Folinate', type: 'post', sub: 'Rescue Agent',      route: 'IV' },
  { name: 'Zoledronic Acid',type: 'post', sub: 'Bisphosphonate',      route: 'IV' },
  { name: 'Denosumab',      type: 'post', sub: 'RANKL Inhibitor',     route: 'SC' },
  { name: 'Erythropoietin', type: 'post', sub: 'ESA',                 route: 'SC' },
];
 
const PROTOCOL_LIST_DATA: Protocol[] = [
  { id: 1, name: 'AC-T (Dose Dense)',      status: 'Active',   cycles: 8,  days: 14, drugCount: 4 },
  { id: 2, name: 'FOLFOX-4',              status: 'Active',   cycles: 12, days: 14, drugCount: 5 },
  { id: 3, name: 'Carboplatin-Paclitaxel',status: 'Active',   cycles: 6,  days: 21, drugCount: 4 },
  { id: 4, name: 'mFOLFOX6',             status: 'Draft',    cycles: 12, days: 14, drugCount: 3 },
  { id: 5, name: 'BEP',                   status: 'Inactive', cycles: 3,  days: 21, drugCount: 5 },
  { id: 6, name: 'R-CHOP',               status: 'Active',   cycles: 6,  days: 21, drugCount: 7 },
  { id: 7, name: 'Gemcitabine-Cisplatin', status: 'Active',   cycles: 6,  days: 21, drugCount: 4 },
];
 
const VERSION_HISTORY: VersionEntry[] = [
  { version: '2.1', label: 'Version 2.1 — Current', author: 'Dr. Sharma', date: '10 Jul 2024, 14:32', isCurrent: true },
  { version: '2.0', label: 'Version 2.0',            author: 'Dr. Mehta',  date: '2 Jul 2024, 09:15',  isCurrent: false },
  { version: '1.0', label: 'Version 1.0',            author: 'Dr. Sharma', date: '24 May 2024, 11:00', isCurrent: false },
];
@Component({
  selector: 'app-protocal-master',
  templateUrl: './protocal-master.component.html',
  styleUrls: ['./protocal-master.component.css']
})
export class ProtocalMasterComponent implements OnInit {


  @ViewChild('drugDetailForm') drugDetailForm!: NgForm;
  @ViewChild('newProtoForm')   newProtoForm!: NgForm;
 
  // ── Protocol list ────────────────────────────────────────────
  protocols: Protocol[] = PROTOCOL_LIST_DATA;
  filteredProtocols: Protocol[] = [];
  protocolSearch = '';
  sidebarView: 'list' | 'grid' = 'list';
  selectedProtocolId: number = 1;
 
  // ── Protocol header form ─────────────────────────────────────
  protocolName = 'AC-T (Dose Dense)';
  protocolStatus: 'Active' | 'Draft' | 'Inactive' = 'Active';
  numberOfCycles = 8;
  daysBetweenCycles = 14;
  customDays: number | null = null;
  useCustomDays = false;
  cancerType = 'Breast Cancer';
  specialInstructions = '';
  sameDrugsForAllCycles = true;
  lastSavedTime = '2 minutes ago';
 
  // ── Drug library ─────────────────────────────────────────────
  drugLibrary: DrugLibraryItem[] = DRUG_LIBRARY_DATA;
  filteredDrugLibrary: DrugLibraryItem[] = [];
  drugSearch = '';
  drugLibraryFilter: 'all' | 'pre' | 'sys' | 'post' = 'all';
 
  // ── Zone drugs ───────────────────────────────────────────────
  preZoneDrugs: ZoneDrug[] = [];
  sysZoneDrugs: ZoneDrug[] = [];
  postZoneDrugs: ZoneDrug[] = [];
  preDragOver = false;
  sysDragOver = false;
  postDragOver = false;
 
  // ── Drug detail panel ────────────────────────────────────────
  detailPanelOpen = false;
  selectedDrug: ZoneDrug | null = null;
 
  // Detail form model
  detail: DrugDetail = this.emptyDetail();
 
  // ── Day view ─────────────────────────────────────────────────
  currentView: 'zone' | 'day' = 'zone';
  dayColumns: { day: number; drugs: ZoneDrug[] }[] = [];
 
  // ── Modals ───────────────────────────────────────────────────
  showNewProtoModal    = false;
  showVersionModal     = false;
  showPreviewModal     = false;
  showSaveWarningModal = false;
  showSaveSuccessModal = false;
  showAddDayModal      = false;
  showCycleFreqModal   = false;
 
  newProtoName   = '';
  newProtoCancer = 'Breast Cancer';
  newProtoCycles = 6;
  newProtoDays   = 21;
 
  versionHistory: VersionEntry[] = VERSION_HISTORY;
  saveSuccessSummary = '';
  saveVersion = 2;
 
  // ── Options ──────────────────────────────────────────────────
  cancerTypeOptions = [
    'Breast Cancer', 'Lung Cancer', 'Colorectal',
    'Lymphoma', 'Ovarian Cancer', 'Prostate Cancer', 'Bladder Cancer',
  ];
  dayOptions: { label: string; value: number | 'custom' }[] = [
    ...(Array.from({ length: 42 }, (_, i) => ({
      label: `${i + 1} day${i > 0 ? 's' : ''}`,
      value: i + 1 as number,
    }))),
    { label: 'Custom…', value: 'custom' as any },
  ];
  routeOptions       = ['Intravenous', 'Intravenous Central Line', 'Subcutaneous', 'Intramuscular', 'Per Oral', 'Intrathecal', 'Transdermal'];
  doseUnitOptions    = ['ml', 'mg', 'mcg', 'gms', 'Unit'];
  dosePerOptions     = ['m²', 'Kg', 'Fixed'];
  maxDoseUnitOptions = ['mg', 'mcg', 'gms'];
  diluentOptions     = ['Normal Saline', 'Ringers Lactate', '5% Dextrose', '10% Dextrose', 'Dextrose Normal Saline', 'Distilled Water'];
  freqOptions        = ['Once Daily', 'Twice Daily', 'Thrice Daily', 'Four Times Daily', 'Others'];
  adminDayPresets    = [
    { label: 'Day 1',      value: '1' },
    { label: 'Day 1, 8',   value: '1,8' },
    { label: 'Day 1, 8, 15', value: '1,8,15' },
    { label: 'Day 1, 15',  value: '1,15' },
    { label: 'Day 1–5',    value: '1,2,3,4,5' },
  ];
 
  constructor(
    private messageService: MessageService,
    private cdr: ChangeDetectorRef,
  ) {}
 
  ngOnInit(): void {
    this.filteredProtocols = [...this.protocols];
    this.applyDrugLibraryFilter();
    this.seedInitialDrugs();
    this.buildDayColumns();
  }
 
  // ─── SEED ────────────────────────────────────────────────────
  seedInitialDrugs(): void {
    const mkDetail = (overrides: Partial<DrugDetail>): DrugDetail => ({
      ...this.emptyDetail(), ...overrides,
    });
    this.preZoneDrugs = [
      {
        name: 'Ondansetron', zone: 'pre',
        detail: mkDetail({ name: 'Ondansetron', zone: 'pre', dose: '8', doseUnit: 'mg', dosePer: 'Fixed', maxDose: '16', maxDoseUnit: 'mg', route: 'Intravenous', adminType: 'Bolus', durationType: 'Stat', freq: 'Once Daily', diluent: 'Normal Saline', volume: '50', hrs: 0, mins: 15, adminDays: '1', adminDaysParsed: [1], isComplete: true }),
      },
      {
        name: 'Dexamethasone', zone: 'pre',
        detail: mkDetail({ name: 'Dexamethasone', zone: 'pre', dose: '12', doseUnit: 'mg', dosePer: 'Fixed', maxDose: '20', maxDoseUnit: 'mg', route: 'Intravenous', adminType: 'Bolus', durationType: 'Stat', freq: 'Once Daily', diluent: 'Normal Saline', volume: '50', hrs: 0, mins: 15, adminDays: '1', adminDaysParsed: [1], isComplete: true }),
      },
    ];
    this.sysZoneDrugs = [
      {
        name: 'Doxorubicin', zone: 'sys',
        detail: mkDetail({ name: 'Doxorubicin', zone: 'sys', dose: '60', doseUnit: 'mg', dosePer: 'm²', maxDose: '120', maxDoseUnit: 'mg', route: 'Intravenous', adminType: 'Bolus', durationType: 'Duration', freq: 'Once Daily', diluent: 'Normal Saline', volume: '250', hrs: 0, mins: 30, special: 'Vesicant — monitor IV site closely', adminDays: '1', adminDaysParsed: [1], isComplete: true }),
      },
      {
        name: 'Cyclophosphamide', zone: 'sys',
        detail: mkDetail({ name: 'Cyclophosphamide', zone: 'sys', dose: '600', doseUnit: 'mg', dosePer: 'm²', maxDose: '', maxDoseUnit: 'mg', route: 'Intravenous', adminType: 'Infusion', durationType: 'Duration', freq: 'Once Daily', diluent: 'Normal Saline', volume: '500', hrs: 1, mins: 0, adminDays: '1', adminDaysParsed: [1], isComplete: false }),
      },
    ];
    this.postZoneDrugs = [];
  }
 
  emptyDetail(): DrugDetail {
    return {
      name: '', zone: 'sys', dose: '', doseUnit: 'mg', dosePer: 'm²',
      maxDose: '', maxDoseUnit: 'mg', route: 'Intravenous', adminType: 'Bolus',
      durationType: 'Stat', freq: 'Once Daily', diluent: 'Normal Saline',
      volume: '', hrs: 0, mins: 0, special: '', adminDays: '', adminDaysParsed: [],
      isComplete: false,
    };
  }
 
  // ─── PROTOCOL LIST ───────────────────────────────────────────
  filterProtocols(): void {
    const q = this.protocolSearch.toLowerCase().trim();
    this.filteredProtocols = q
      ? this.protocols.filter(p => p.name.toLowerCase().includes(q))
      : [...this.protocols];
  }
 
  selectProtocol(p: Protocol): void {
    this.selectedProtocolId = p.id;
    this.protocolName = p.name;
    this.protocolStatus = p.status;
    this.numberOfCycles = p.cycles;
    this.daysBetweenCycles = p.days;
    this.showToast(`Loaded: ${p.name}`);
  }
 
  statusBadgeClass(status: string): string {
    return status === 'Active' ? 'badge-active' : status === 'Draft' ? 'badge-draft' : 'badge-inactive';
  }
 
  // ─── DRUG LIBRARY ────────────────────────────────────────────
  applyDrugLibraryFilter(): void {
    const q = this.drugSearch.toLowerCase().trim();
    this.filteredDrugLibrary = this.drugLibrary.filter(d => {
      const matchType = this.drugLibraryFilter === 'all' || d.type === this.drugLibraryFilter;
      const matchQuery = !q || d.name.toLowerCase().includes(q) || d.sub.toLowerCase().includes(q);
      return matchType && matchQuery;
    });
  }
 
  setDrugFilter(filter: 'all' | 'pre' | 'sys' | 'post'): void {
    this.drugLibraryFilter = filter;
    this.applyDrugLibraryFilter();
  }
 
  drugTypeDot(type: string): string {
    return type === 'pre' ? 'dot-pre' : type === 'sys' ? 'dot-sys' : 'dot-post';
  }
 
  isPlacedDrug(name: string): boolean {
    return [...this.preZoneDrugs, ...this.sysZoneDrugs, ...this.postZoneDrugs].some(d => d.name === name);
  }
 
  // ─── DRAG & DROP ─────────────────────────────────────────────
  onDragStart(event: DragEvent, drug: DrugLibraryItem): void {
    event.dataTransfer?.setData('drugName', drug.name);
    event.dataTransfer?.setData('drugType', drug.type);
  }
 
  onDragOver(event: DragEvent, zone: 'pre' | 'sys' | 'post'): void {
    event.preventDefault();
    this.setZoneDragOver(zone, true);
  }
 
  onDragLeave(event: DragEvent, zone: 'pre' | 'sys' | 'post'): void {
    this.setZoneDragOver(zone, false);
  }
 
  onDrop(event: DragEvent, zone: 'pre' | 'sys' | 'post'): void {
    event.preventDefault();
    this.setZoneDragOver(zone, false);
    const drugName = event.dataTransfer?.getData('drugName');
    const drugType = event.dataTransfer?.getData('drugType') as DrugLibraryItem['type'];
    if (!drugName) return;
 
    const already = this.getAllZoneDrugs().some(d => d.name === drugName);
    if (already) { this.showToast(`${drugName} is already in the protocol`); return; }
 
    const newDrug: ZoneDrug = { name: drugName, zone, detail: undefined };
    this.getZoneList(zone).push(newDrug);
    this.buildDayColumns();
    this.showToast(`${drugName} added to ${zone === 'pre' ? 'Pre-Systemic' : zone === 'sys' ? 'Systemic' : 'Post-Systemic'}`);
    this.openDetailPanel(newDrug);
  }
 
  setZoneDragOver(zone: 'pre' | 'sys' | 'post', val: boolean): void {
    if (zone === 'pre') this.preDragOver = val;
    else if (zone === 'sys') this.sysDragOver = val;
    else this.postDragOver = val;
  }
 
  getZoneList(zone: 'pre' | 'sys' | 'post'): ZoneDrug[] {
    return zone === 'pre' ? this.preZoneDrugs : zone === 'sys' ? this.sysZoneDrugs : this.postZoneDrugs;
  }
 
  getAllZoneDrugs(): ZoneDrug[] {
    return [...this.preZoneDrugs, ...this.sysZoneDrugs, ...this.postZoneDrugs];
  }
 
  removeDrug(zone: 'pre' | 'sys' | 'post', name: string, event: Event): void {
    event.stopPropagation();
    const list = this.getZoneList(zone);
    const idx = list.findIndex(d => d.name === name);
    if (idx > -1) { list.splice(idx, 1); this.buildDayColumns(); }
    if (this.selectedDrug?.name === name) this.closeDetailPanel();
  }
 
  // ─── DETAIL PANEL ────────────────────────────────────────────
  openDetailPanel(drug: ZoneDrug): void {
    this.selectedDrug = drug;
    if (drug.detail) {
      this.detail = { ...drug.detail };
    } else {
      this.detail = this.emptyDetail();
      this.detail.name = drug.name;
      this.detail.zone = drug.zone;
    }
    this.detailPanelOpen = true;
  }
 
  closeDetailPanel(): void {
    this.detailPanelOpen = false;
    this.selectedDrug = null;
  }
 
  saveDrugDetail(): void {
    if (!this.selectedDrug) return;
    this.detail.isComplete = !!(this.detail.dose && this.detail.maxDose && this.detail.route && this.detail.adminType);
    this.detail.adminDaysParsed = this.parseAdminDays(this.detail.adminDays);
    this.selectedDrug.detail = { ...this.detail };
    this.showToast(`${this.detail.name} details saved`);
    this.closeDetailPanel();
  }
 
  parseAdminDays(raw: string): number[] {
    if (!raw) return [];
    const days: Set<number> = new Set();
    raw.split(',').forEach(part => {
      const range = part.trim().match(/^(\d+)-(\d+)$/);
      if (range) {
        const from = parseInt(range[1]), to = parseInt(range[2]);
        for (let i = from; i <= to; i++) days.add(i);
      } else {
        const n = parseInt(part.trim());
        if (!isNaN(n)) days.add(n);
      }
    });
    return [...days].sort((a, b) => a - b);
  }
 
  selectAdminPreset(val: string): void {
    this.detail.adminDays = val;
    this.detail.adminDaysParsed = this.parseAdminDays(val);
  }
 
  get adminDaysPreview(): string {
    const p = this.detail.adminDaysParsed;
    return p.length ? `Day ${p.join(', ')}` : '';
  }
 
  // ─── VALIDATION ──────────────────────────────────────────────
  get configuredDrugCount(): number {
    return this.getAllZoneDrugs().length;
  }
 
  get incompleteDrugCount(): number {
    return this.getAllZoneDrugs().filter(d => !d.detail?.isComplete).length;
  }
 
  get allDrugsComplete(): boolean {
    return this.incompleteDrugCount === 0;
  }
 
  drugDoseLabel(drug: ZoneDrug): string {
    if (!drug.detail) return '—';
    const { dose, doseUnit, dosePer, route, adminType } = drug.detail;
    const per = dosePer !== 'Fixed' ? `/${dosePer}` : '';
    return `${dose} ${doseUnit}${per} ${route?.slice(0, 2)} · ${adminType}`;
  }
 
  // ─── DAY VIEW ────────────────────────────────────────────────
  switchView(view: 'zone' | 'day'): void {
    this.currentView = view;
    if (view === 'day') this.buildDayColumns();
  }
 
  buildDayColumns(): void {
    const dayCount = this.useCustomDays ? (this.customDays || 1) : this.daysBetweenCycles;
    this.dayColumns = [];
    for (let i = 1; i <= dayCount; i++) {
      const drugsOnDay = this.getAllZoneDrugs().filter(d =>
        !d.detail || d.detail.adminDaysParsed.length === 0 || d.detail.adminDaysParsed.includes(i)
      );
      this.dayColumns.push({ day: i, drugs: drugsOnDay });
    }
  }
 
  addDayColumn(): void {
    const maxDay = Math.max(...this.dayColumns.map(c => c.day), this.daysBetweenCycles);
    this.dayColumns.push({ day: maxDay + 1, drugs: [] });
  }
 
  // ─── SAVE / CLONE ────────────────────────────────────────────
  saveProtocol(form?: NgForm): void {
    if (!this.allDrugsComplete) {
      this.showSaveWarningModal = true;
      return;
    }
    this.doSave();
  }
 
  doSave(): void {
    this.showSaveWarningModal = false;
    this.saveVersion++;
    this.lastSavedTime = 'just now';
    this.saveSuccessSummary = `${this.protocolName} · v${this.saveVersion} · ${this.configuredDrugCount} drugs`;
    this.showSaveSuccessModal = true;
    this.protocolStatus = this.allDrugsComplete ? 'Active' : 'Draft';
  }
 
  cloneProtocol(): void {
    const clone: Protocol = {
      id: Date.now(),
      name: `${this.protocolName} (Copy)`,
      status: 'Draft',
      cycles: this.numberOfCycles,
      days: this.daysBetweenCycles,
      drugCount: this.configuredDrugCount,
    };
    this.protocols.push(clone);
    this.filteredProtocols = [...this.protocols];
    this.showToast('Protocol cloned as Draft');
  }
 
  toggleActivation(): void {
    this.protocolStatus = this.protocolStatus === 'Active' ? 'Inactive' : 'Active';
    this.showToast(`Protocol ${this.protocolStatus === 'Active' ? 'activated' : 'deactivated'}`);
  }
 
  // ─── NEW PROTOCOL ────────────────────────────────────────────
  createNewProtocol(form: NgForm): void {
    if (form.invalid) return;
    const proto: Protocol = {
      id: Date.now(),
      name: this.newProtoName,
      status: 'Draft',
      cycles: this.newProtoCycles,
      days: this.newProtoDays,
      drugCount: 0,
    };
    this.protocols.push(proto);
    this.filteredProtocols = [...this.protocols];
    this.selectProtocol(proto);
    this.preZoneDrugs = [];
    this.sysZoneDrugs = [];
    this.postZoneDrugs = [];
    this.showNewProtoModal = false;
    this.newProtoName = '';
    this.showToast(`Protocol "${proto.name}" created`);
  }
 
  // ─── TOAST ───────────────────────────────────────────────────
  showToast(msg: string): void {
    this.messageService.add({ severity: 'success', summary: msg, life: 2500 });
  }
 
  downloadJSON(): void {
    const data = {
      protocol: {
        name: this.protocolName,
        status: this.protocolStatus,
        cycles: this.numberOfCycles,
        daysBetweenCycles: this.daysBetweenCycles,
        cancerType: this.cancerType,
        specialInstructions: this.specialInstructions,
        drugs: this.getAllZoneDrugs().map(d => d.detail || { name: d.name, zone: d.zone }),
      },
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `${this.protocolName.replace(/\s+/g, '_')}.json`; a.click();
    URL.revokeObjectURL(url);
  }
 
  restoreVersion(v: VersionEntry): void {
    this.showToast(`Restored Version ${v.version}`);
    this.showVersionModal = false;
  }
 
  onDaysBetweenChange(): void {
    const val = this.daysBetweenCycles as any;
    if (val === 'custom') { this.useCustomDays = true; }
    else { this.useCustomDays = false; this.buildDayColumns(); }
  }
 
  zoneLabel(zone: 'pre' | 'sys' | 'post'): string {
    return zone === 'pre' ? 'pre' : zone === 'sys' ? 'sys' : 'post';
  }
 
  presetActive(val: string): boolean {
    return this.detail.adminDays === val;
  }
 
  drugZoneClass(zone: 'pre' | 'sys' | 'post'): string {
    return `zone-${zone}-drug`;
  }

}
