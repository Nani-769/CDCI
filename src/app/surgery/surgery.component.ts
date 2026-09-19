import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-surgery',
  templateUrl: './surgery.component.html',
  styleUrls: ['./surgery.component.css']
})
export class SurgeryComponent implements OnInit {

  // ─── UI State ────────────────────────────────────────
  activeTab = 't1';
  activeProc = 0;
  sidebarVisible = false;
  isUnsaved = false;
  showValBanner = false;
  valMsg = '';

  // Card edit toggles
  cardEdit: Record<string, boolean> = {
    t1a: false, t1b: false, t1c: false, t1d: false, t1e: false,
    t2a: false, t2b: false, t2c: false, t2d: false, t2e: false, t2f: false, t2g: false,
    t3a: false, t3b: false, t3c: false, t3d: false, t3e: false,
    t4a: false, t4b: false, t4c: false,
    t5a: false, t5b: false, t5c: false, t5d: false
  };

  // ─── Patient Info ─────────────────────────────────────
  patient = {
    name: 'Meenakshi Raghavan',
    gender: 'F',
    age: '47Y',
    asa: 'II',
    ht: '158cm',
    wt: '62kg',
    blood: 'B+ve',
    ward: 'Ward 6B / Bed 4',
    mrn: 'MRN-2024-04892',
    diagnosis: 'Ca. Breast Lt · IDC NST',
    tnm: 'pT2 pN2 pM0',
    stageGroup: '↑ Stage IIB post-op'
  };

  // ─── Dropdown Options ─────────────────────────────────
  estDurOptions = [
    { label: '—', value: '' },
    { label: '1 Hour', value: '1 Hour' },
    { label: '2 Hours', value: '2 Hours' },
    { label: '3 Hours', value: '3 Hours' },
    { label: '4 Hours', value: '4 Hours' },
    { label: '5 Hours', value: '5 Hours' },
    { label: '6 Hours', value: '6 Hours' },
    { label: '7 Hours', value: '7 Hours' },
    { label: 'More than 8 Hours', value: 'More than 8 Hours' }
  ];

  caseStatusOptions = [
    { label: '—', value: '' },
    { label: 'Minor', value: 'Minor' },
    { label: 'Elective', value: 'Elective' },
    { label: 'Emergency', value: 'Emergency' },
    { label: 'Re-Exploration', value: 'Re-Exploration' }
  ];

  approachOptions = [
    { label: '—', value: '' },
    { label: 'Open', value: 'Open' },
    { label: 'Laparoscopic', value: 'Laparoscopic' },
    { label: 'Robotic', value: 'Robotic' },
    { label: 'Laparoscopic + Open', value: 'Laparoscopic + Open' }
  ];

  lateralityOptions = [
    { label: '—', value: '' },
    { label: 'Left', value: 'Left' },
    { label: 'Right', value: 'Right' },
    { label: 'Bilateral', value: 'Bilateral' },
    { label: 'Not Applicable', value: 'Not Applicable' }
  ];

  woundClassOptions = [
    { label: '—', value: '' },
    { label: 'Clean', value: 'Clean' },
    { label: 'Clean-Contaminated', value: 'Clean-Contaminated' },
    { label: 'Contaminated', value: 'Contaminated' },
    { label: 'Dirty', value: 'Dirty' }
  ];

  insuranceOptions = [
    { label: '—', value: '' },
    { label: 'No Insurance', value: 'No Insurance' },
    { label: 'Ayushman Bharat', value: 'Ayushman Bharat' },
    { label: 'CGHS', value: 'CGHS' },
    { label: 'Private Insurance', value: 'Private Insurance' },
    { label: 'State Insurance', value: 'State Insurance' }
  ];

  bloodGroupOptions = [
    { label: '—', value: '' },
    { label: 'A+', value: 'A+' }, { label: 'A-', value: 'A-' },
    { label: 'B+', value: 'B+' }, { label: 'B-', value: 'B-' },
    { label: 'AB+', value: 'AB+' }, { label: 'AB-', value: 'AB-' },
    { label: 'O+', value: 'O+' }, { label: 'O-', value: 'O-' }
  ];

  yesNoOptions = [
    { label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'No' }
  ];

  asaOptions = [
    { label: '—', value: '' },
    { label: 'I', value: 'I' }, { label: 'II', value: 'II' },
    { label: 'III', value: 'III' }, { label: 'IV', value: 'IV' },
    { label: 'V', value: 'V' }, { label: 'VI', value: 'VI' },
    { label: 'E (Emergency)', value: 'E (Emergency)' }
  ];

  hrMDTOptions = [
    { label: '—', value: '' },
    { label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'No' },
    { label: 'Not Applicable', value: 'Not Applicable' }
  ];

  anaTypeOptions = [
    { label: '—', value: '' },
    { label: 'General', value: 'General' },
    { label: 'Regional', value: 'Regional' },
    { label: 'Both (General + Regional)', value: 'Both (General + Regional)' },
    { label: 'MAC', value: 'MAC' }
  ];

  opTypeOptions = [
    { label: '—', value: '' },
    { label: 'Primary', value: 'Primary' },
    { label: 'Adjunct', value: 'Adjunct' },
    { label: 'Reconstructive', value: 'Reconstructive' },
    { label: 'Node Dissection', value: 'Node Dissection' }
  ];

  opLatOptions = [
    { label: '—', value: '' },
    { label: 'Left', value: 'Left' },
    { label: 'Right', value: 'Right' },
    { label: 'Bilateral', value: 'Bilateral' },
    { label: 'N/A', value: 'N/A' }
  ];

  pTOptions = ['—','Tis','T1','T1a','T1b','T1c','T2','T3','T4','T4a','T4b','T4c','T4d'];
  pNOptions = ['—','N0','N1','N1mi','N2','N2a','N2b','N3','N3a','N3b','N3c'];
  pMOptions = ['—','M0','M1'];

  rStatusOptions = [
    { label: 'R0 — Clear', value: 'R0' },
    { label: 'R1 — Microscopically Positive', value: 'R1' },
    { label: 'R2 — Macroscopically Positive', value: 'R2' }
  ];

  gradeOptions = [
    { label: '—', value: '' },
    { label: 'Grade 1', value: 'Grade 1' },
    { label: 'Grade 2', value: 'Grade 2' },
    { label: 'Grade 3', value: 'Grade 3' }
  ];

  lviOptions = [
    { label: 'Present', value: 'Present' },
    { label: 'Absent', value: 'Absent' },
    { label: 'Indeterminate', value: 'Indeterminate' }
  ];

  her2Options = [
    { label: '—', value: '' },
    { label: '0 (Negative)', value: '0' },
    { label: '1+ (Negative)', value: '1+' },
    { label: '2+ (Equivocal)', value: '2+' },
    { label: '3+ (Positive)', value: '3+' }
  ];

  ajccStageOptions = [
    { label: '— Select —', value: '' },
    'Stage 0','Stage I','Stage IA','Stage IB','Stage IIA','Stage IIB',
    'Stage IIIA','Stage IIIB','Stage IIIC','Stage IV'
  ].map(v => typeof v === 'string' ? { label: v, value: v } : v);

  drainStatusOptions = [
    { label: '—', value: '' },
    { label: 'In Situ', value: 'In Situ' },
    { label: 'Removed', value: 'Removed' }
  ];

  woundStatusOptions = [
    { label: 'Healed', value: 'Healed' },
    { label: 'Healing Well', value: 'Healing Well' },
    { label: 'Minor Dehiscence', value: 'Minor Dehiscence' },
    { label: 'Significant Complication', value: 'Significant Complication' }
  ];

  clavienDindoGrades = ['Grade 1','Grade 2','Grade 3','Grade 3a','Grade 3b','Grade 4','Grade 4a','Grade 4b','Grade 5','N/A'];

  // ─── Complication chips ───────────────────────────────
  postComplChips = [
    'Wound Infection','Seroma','Haematoma','Anastomotic Leak','Paralytic Ileus',
    'DVT/PE','Respiratory Complication','Urinary Complication','Lymphoedema','Nerve Injury','Others'
  ];

  // ─── Adjuvant items ───────────────────────────────────
  adjuvantItems = [
    'Adjuvant Chemotherapy','Adjuvant Radiation (PMRT)','Hormonal Therapy',
    'Targeted Therapy','Re-surgery','None'
  ];

  // ─── Surgical Procedures list (sidebar) ───────────────
  procedures: any[] = [
    {
      id: 1,
      caseNo: 'OT-2024-00312',
      date: '2024-03-15',
      name: 'Modified Radical Mastectomy + ALND',
      type: 'Oncological',
      unit: 'Surg Onco Unit 2',
      preDx: 'Ca. Left Breast, IDC, cT2N1M0',
      caseStatus: 'Elective',

      // Tab 1a
      otRoom: 'OT-3',
      ward: 'Ward 6B / Bed 4',
      unitName: 'Surg Onco Unit 2',
      doctor: 'Dr. Ramesh Kumar',
      bookSurgeon: 'Dr. Ramesh Kumar',
      estDur: '3 Hours',
      approach: 'Open',
      laterality: 'Left',
      skinPrep: 'Betadine + Chlorhexidine',
      woundClass: 'Clean',
      propAb: 'Cefazolin 2g IV',
      preDiagnosis: 'Ca. Left Breast, IDC, cT2N1M0',
      postDiagnosis: 'Ca. Left Breast, IDC Grade 2, pT2N2M0',
      insurance: 'Ayushman Bharat',
      bloodGroup: 'B+',
      viralMarkers: ['HBsAg','HCV'],
      pastTransfusion: 'No',
      transfReaction: 'No',
      transfDetail: '',
      remarks: 'Patient in supine position; electrocautery required',
      typeOfSurgery: ['Primary','Adjunct'],

      // Tab 1b
      intent: 'Curative',
      asa: 'II',
      hrMDT: 'No',
      hrMDTComments: '',

      // Tab 1c
      opStartDate: '2024-03-15',
      opStart: '09:00',
      opEndDate: '2024-03-15',
      opEnd: '12:15',
      anaStartDate: '2024-03-15',
      anaStart: '08:30',
      anaEndDate: '2024-03-15',
      anaEnd: '12:45',
      anaType: 'General',

      // Tab 1d
      proposed: 'Modified Radical Mastectomy\nALND Level I-II',
      opRows: [
        { type: 'Primary', proc: 'Modified Radical Mastectomy', lat: 'Left' },
        { type: 'Node Dissection', proc: 'ALND Level I-II', lat: 'Left' },
        { type: '', proc: '', lat: '' }
      ],
      incision: 'Transverse elliptical incision, Vicryl 2-0 deep, Monocryl 3-0 subcuticular',
      pathMat: 'Left breast specimen + axillary contents forwarded for HPE',
      deviation: '',

      // Tab 1e
      ps: 'Dr. Ramesh Kumar',
      as1: 'Dr. Priya Menon',
      as2: 'Dr. Arvind Shetty',
      as3: '',
      pa: 'Dr. Suresh Pillai',
      an1: 'Dr. Kavitha Nair',
      an2: '',
      reconPs: 'N/A',
      reconAs1: '', reconAs2: '', reconAs3: '',
      sn1: 'Sr. Lakshmi Devi',
      sn2: 'Sr. Anitha Rao',

      // Tab 2a
      pT: 'T2', pN: 'N2', pM: 'M0',
      tumSize: '3.2 cm',
      tumLoc: 'Upper outer quadrant',

      // Tab 2b
      rStatus: 'R0',

      // Tab 2c
      margins: ['Anterior','Posterior'],
      marginDetail: 'All margins clear > 2mm',

      // Tab 2d
      frozenPerf: 'Yes',
      frozenResult: 'IDC Grade 2, margins clear',

      // Tab 2e
      ebl: '280',
      bloodVol: '4200',
      bloodProds: ['PRBC'],

      // Tab 2f
      course: 'Uneventful',
      iRef: 'No',
      iRefSpec: '',
      compls: ['None'],
      cDetails: '',

      // Tab 2g
      findings: 'Hard irregular mass 3.2x2.8cm in upper outer quadrant. Matted axillary nodes noted. Skin and nipple-areola complex involved macroscopically. Muscle free.',
      postAb: 'Amoxicillin-Clavulanate 625mg BD x 5 days',
      d1type: 'Redivac',
      d1loc: 'Axilla',
      d2type: 'Redivac',
      d2loc: 'Chest wall flap',

      // Tab 3a
      specSite: 'Left Breast',
      specType: 'Modified radical mastectomy specimen',
      specSize: '18x14x5 cm',
      histoType: 'Invasive Ductal Carcinoma, NST',
      grade: 'Grade 2',
      lvi: 'Present',
      pni: 'Absent',
      necrosis: '10',
      er: '90% (3+)',
      pr: '70% (2+)',
      her2: '1+',
      ki67: '28',

      // Tab 3b
      nodesPos: '4',
      nodesTotal: '16',
      snbEx: 'Not performed',
      snbStatus: 'N/A',

      // Tab 3c
      nactResp: 'Partial',
      mp: 'Miller-Payne 3',
      rcb: 'RCB-II',
      residPct: '40',

      // Tab 3d
      pathR: 'R0',
      mAnt: '4mm',
      mPost: '8mm',
      mMed: '12mm',
      mLat: '22mm',

      // Tab 3e
      uploadNote: 'HPE report uploaded on 20 Mar 2024',

      // Tab 4a
      ajccStage: 'Stage IIB',
      stgDetail: 'ER+ PR+ HER2− Ki67 28%',

      // Tab 4b
      finalR: 'R0',
      intentAch: 'Yes',

      // Tab 4c
      adjuvant: ['Adjuvant Chemotherapy','Adjuvant Radiation (PMRT)','Hormonal Therapy'],

      // Tab 5a
      postCompl: 'Yes',
      postComplList: ['Seroma'],
      cdRows: [{ compl: 'Seroma', grade: 'Grade 1', desc: 'Small seroma at axillary drain site, managed conservatively' }],
      cdGrade: 'Grade 1',
      cdDesc: 'Small seroma managed with aspiration',
      readm30: 'No', mort30: 'No', readm90: 'No', mort90: 'No',

      // Tab 5b
      woundStatus: 'Healing Well',
      wReview: '2024-03-22',
      d1st: 'Removed',
      d1rm: '2024-03-18',
      d2st: 'Removed',
      d2rm: '2024-03-20',

      // Tab 5c
      rdyFrom: '2024-04-10',
      rdyTo: '2024-04-15',
      rdyNote: 'Wound fully healed. Ready for adjuvant chemotherapy.',

      // Tab 5d
      handover: 'Patient transferred to Medical Oncology team for adjuvant therapy planning. All reports handed over. Follow-up in 4 weeks for surgical review.',
      hnAuthor: 'Dr. Ramesh Kumar',
      hnTo: 'Dr. Vijay Anand (Medical Oncology)'
    }
  ];

  // ─── Current procedure copy for form binding ──────────
  form: any = {};

  // ─── Logbook (Tab 6) ──────────────────────────────────
  logbookCols = [
    { field: 'date', header: 'Date' },
    { field: 'patient', header: 'Patient' },
    { field: 'age', header: 'Age/Sex' },
    { field: 'caseNo', header: 'Case No.' },
    { field: 'preDx', header: 'Pre-Op Dx' },
    { field: 'name', header: 'Procedure' },
    { field: 'unit', header: 'Unit' },
    { field: 'surgeon', header: 'Surgeon' },
    { field: 'role', header: 'Role' },
    { field: 'type', header: 'Type' }
  ];

  logbookRows: any[] = [];

  logbookFilter = {
    fromDate: null as Date | null,
    toDate: null as Date | null,
    surgeon: '',
    type: ''
  };

  // ─── New Procedure Modal ──────────────────────────────
  showNewProcModal = false;
  newProc: any = {
    date: new Date().toISOString().split('T')[0],
    name: '',
    caseNo: '',
    type: 'Oncological',
    unit: '',
    ps: '',
    preDx: ''
  };

  // ─── Complications per row ────────────────────────────
  cdRows: any[] = [];

  // ─── Computed ─────────────────────────────────────────
  get opDuration(): string {
    if (!this.form.opStart || !this.form.opEnd) return '—';
    const [sh, sm] = this.form.opStart.split(':').map(Number);
    const [eh, em] = this.form.opEnd.split(':').map(Number);
    let mins = (eh * 60 + em) - (sh * 60 + sm);
    if (mins < 0) mins += 24 * 60; // Overnight logic cross midnight
    if (mins === 0) return '—';
    return `${Math.floor(mins / 60)}h ${mins % 60}m`;
  }

  get nodalFraction(): string {
    const p = +this.form.nodesPos;
    const t = +this.form.nodesTotal;
    if (p && t) return `${p}/${t} (${((p / t) * 100).toFixed(0)}%)`;
    return '—';
  }

  get completionPct(): number {
    const fields = ['caseNo', 'preDiagnosis', 'intent', 'pT', 'ajccStage'];
    const filled = fields.filter(f => this.form[f] && this.form[f] !== '—').length;
    return Math.round((filled / fields.length) * 100);
  }

  get completionSections(): boolean[] {
    return [
      !!(this.form.caseNo && this.form.preDiagnosis),
      !!(this.form.pT && this.form.pT !== '—' && this.form.pN && this.form.pN !== '—'),
      !!(this.form.histoType),
      !!(this.form.ajccStage && this.form.ajccStage !== '— Select —'),
      !!(this.form.woundStatus)
    ];
  }

  // FIXED: Replaces arrow function in HTML template
  get completedSectionsCount(): number {
    return this.completionSections.filter(Boolean).length;
  }

  get filteredLogbookRows(): any[] {
    return this.logbookRows.filter(row => {
      if (!this.logbookFilter.fromDate && !this.logbookFilter.toDate) return true;
      const rowDate = new Date(row.rawDate + 'T00:00:00'); 
      if (this.logbookFilter.fromDate && rowDate < this.logbookFilter.fromDate) return false;
      if (this.logbookFilter.toDate && rowDate > this.logbookFilter.toDate) return false;
      return true;
    });
  }

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.selectProc(0);
  }

  // ─── Procedure Selection ──────────────────────────────
  selectProc(idx: number): void {
    this.activeProc = idx;
    this.form = JSON.parse(JSON.stringify(this.procedures[idx]));
    this.cdRows = this.form.cdRows ? JSON.parse(JSON.stringify(this.form.cdRows)) : [];
    this.buildLogbook();
  }

  // ─── Tab Navigation ───────────────────────────────────
  switchTab(tab: string): void {
    this.activeTab = tab;
  }

  // ─── Card Edit Toggle ─────────────────────────────────
  toggleCard(cardId: string): void {
    this.cardEdit[cardId] = !this.cardEdit[cardId];
  }

  // ─── Save Actions ─────────────────────────────────────
  validateRequired(): boolean {
    const missing: string[] = [];
    if (!this.form.caseNo) missing.push('Case Number');
    if (!this.form.date) missing.push('Date of Surgery');
    if (!this.form.doctor) missing.push('Treating Doctor');
    if (!this.form.intent) missing.push('Surgical Intent');
    if (missing.length) {
      this.valMsg = `Please fill required fields: ${missing.join(', ')}`;
      this.showValBanner = true;
      return false;
    }
    this.showValBanner = false;
    return true;
  }

  saveDraft(): void {
    this.syncToProcedures();
    this.isUnsaved = false;
    this.messageService.add({ severity: 'success', summary: 'Draft Saved', detail: 'Draft saved successfully', life: 3000 });
  }

  saveAll(): void {
    if (!this.validateRequired()) {
      this.messageService.add({ severity: 'warn', summary: 'Validation', detail: this.valMsg, life: 4000 });
      return;
    }
    this.syncToProcedures();
    this.isUnsaved = false;
    this.messageService.add({ severity: 'success', summary: 'Saved & Signed', detail: 'Record saved and signed successfully', life: 3000 });
  }

  clearForm(): void {
    this.form = {
      ...this.procedures[this.activeProc],
      caseNo: '', preDiagnosis: '', postDiagnosis: '', intent: '',
      pT: '—', pN: '—', pM: '—', ajccStage: '', rStatus: '', woundStatus: '',
      typeOfSurgery: [], viralMarkers: [], bloodProds: [], postComplList: []
    };
    this.isUnsaved = false;
    this.messageService.add({ severity: 'info', summary: 'Cleared', detail: 'Form cleared', life: 2500 });
  }

  syncToProcedures(): void {
    this.form.cdRows = JSON.parse(JSON.stringify(this.cdRows));
    this.procedures[this.activeProc] = JSON.parse(JSON.stringify(this.form));
    this.buildLogbook();
  }

  markUnsaved(): void {
    this.isUnsaved = true;
  }

  // ─── New Procedure Modal ──────────────────────────────
  openNewProcModal(): void {
    this.newProc = {
      date: new Date().toISOString().split('T')[0],
      name: '',
      caseNo: '',
      type: 'Oncological',
      unit: '',
      ps: '',
      preDx: ''
    };
    this.showNewProcModal = true;
  }

  createNewProc(): void {
    if (!this.newProc.name || !this.newProc.date) {
      this.messageService.add({ severity: 'warn', summary: 'Required', detail: 'Procedure name and date are required', life: 3000 });
      return;
    }
    const newEntry = {
      id: this.procedures.length + 1,
      caseNo: this.newProc.caseNo || `OT-2024-${String(this.procedures.length + 1).padStart(5, '0')}`,
      date: this.newProc.date,
      name: this.newProc.name,
      type: this.newProc.type,
      unit: this.newProc.unit,
      ps: this.newProc.ps,
      preDx: this.newProc.preDx,
      caseStatus: 'Elective',
      intent: '', pT: '—', pN: '—', pM: '—',
      opRows: [{ type: '', proc: '', lat: '' }, { type: '', proc: '', lat: '' }, { type: '', proc: '', lat: '' }],
      cdRows: [], adjuvant: [], viralMarkers: [], typeOfSurgery: [],
      margins: [], bloodProds: [], compls: [], postComplList: []
    };
    this.procedures.push(newEntry);
    this.selectProc(this.procedures.length - 1);
    this.showNewProcModal = false;
    this.messageService.add({ severity: 'success', summary: 'Created', detail: 'New procedure created', life: 2500 });
  }

  // ─── Complication CD Rows ─────────────────────────────
  addCDRow(): void {
    this.cdRows.push({ compl: '', grade: '', desc: '' });
    this.markUnsaved();
  }

  removeCDRow(idx: number): void {
    this.cdRows.splice(idx, 1);
    this.markUnsaved();
  }

  // ─── Key-Safe Multi-chip Toggle ───────────────────────
  toggleChip(fieldName: string, val: string): void {
    if (!this.form[fieldName]) {
      this.form[fieldName] = [];
    }
    const idx = this.form[fieldName].indexOf(val);
    if (idx > -1) {
      this.form[fieldName].splice(idx, 1);
    } else {
      this.form[fieldName].push(val);
    }
    this.markUnsaved();
  }

  hasChip(arr: string[], val: string): boolean {
    return arr && arr.includes(val);
  }

  // ─── Toggle Adjuvant ─────────────────────────────────
  toggleAdjuvant(val: string): void {
    if (!this.form.adjuvant) this.form.adjuvant = [];
    const idx = this.form.adjuvant.indexOf(val);
    if (idx > -1) this.form.adjuvant.splice(idx, 1);
    else this.form.adjuvant.push(val);
    this.markUnsaved();
  }

  isAdjuvantOn(val: string): boolean {
    return this.form.adjuvant && this.form.adjuvant.includes(val);
  }

  // ─── Logbook ──────────────────────────────────────────
  buildLogbook(): void {
    this.logbookRows = this.procedures.map(p => ({
      rawDate: p.date,
      date: this.formatDate(p.date),
      patient: this.patient.name,
      age: `${this.patient.age} / ${this.patient.gender}`,
      caseNo: p.caseNo || '—',
      preDx: p.preDx || p.preDiagnosis || '—',
      name: p.name || '—',
      unit: p.unit || p.unitName || '—',
      surgeon: p.ps || '—',
      role: 'Primary',
      type: p.type || '—'
    }));
  }

  // ─── Helpers ─────────────────────────────────────────
  formatDate(d: string): string {
    if (!d) return '—';
    try {
      const parsed = new Date(d + 'T12:00:00');
      return isNaN(parsed.getTime()) ? d : parsed.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
    } catch { return d; }
  }

  getInitials(name: string): string {
    if (!name) return '?';
    return name.replace('Dr.', '').replace('Sr.', '').trim().split(' ')
      .map(n => n[0]).slice(0, 2).join('').toUpperCase();
  }

  getRStatusClass(r: string): string {
    if (r === 'R0') return 'r-status r0';
    if (r === 'R1') return 'r-status r1';
    if (r === 'R2') return 'r-status r2';
    return 'r-status';
  }

  getStageClass(s: string): string {
    if (!s) return '';
    if (s.includes('IV')) return 'stage-chip sc-IV';
    if (s.includes('IIIC')) return 'stage-chip sc-IIIC';
    if (s.includes('IIIB')) return 'stage-chip sc-IIIB';
    if (s.includes('IIIA')) return 'stage-chip sc-IIIA';
    if (s.includes('IIB')) return 'stage-chip sc-IIB';
    if (s.includes('IIA')) return 'stage-chip sc-IIA';
    if (s.includes('IB')) return 'stage-chip sc-IB';
    if (s.includes('IA')) return 'stage-chip sc-IA';
    if (s.includes('I')) return 'stage-chip sc-I';
    return 'stage-chip sc-0';
  }

  getMilestoneClass(idx: number): string {
    const done = [
      !!(this.form.date),
      !!(this.form.wReview),
      !!(this.form.histoType),
      !!(this.form.adjuvant && this.form.adjuvant.length)
    ];
    return done[idx] ? 'ms-dot done' : 'ms-dot pend';
  }

}
