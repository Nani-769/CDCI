import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-mdtmodule',
  templateUrl: './mdtmodule.component.html',
  styleUrls: ['./mdtmodule.component.css']
})
export class MdtmoduleComponent implements OnInit {

  // ─── Active Screen ───────────────────────────────────────
  activeScreen: 'login' | 'dashboard' | 'patselect' | 'entry' | 'chart' = 'login';
 
  // ─── Login / User ─────────────────────────────────────────
  currentUser: any = { name: 'Dr. Suresh Bajpai', dept: 'Medical Oncology', initials: 'SB' };
  loginEmail    = 's.bajpai@tmh.org.in';
  loginPassword = '';
  selectedRole  = 0;
 
  roles: any[] = [
    { name: 'Medical Oncology',   doctor: 'Dr. Suresh Bajpai',  initials: 'SB' },
    { name: 'Surgical Oncology',  doctor: 'Dr. Anita Krishnan', initials: 'AK' },
    { name: 'Radiation Oncology', doctor: 'Dr. Prashant Mehta', initials: 'PM' },
    { name: 'Radiology',          doctor: 'Dr. Meena Pillai',   initials: 'MP' },
  ];
 
  // ─── Dashboard ────────────────────────────────────────────
  dashTabFilter   = '';
  dashSearch      = '';
  filterStatus    = '';
  filterType      = '';
 
  cases: any[] = [
    { id:'TB-2024-10-0094', name:'Priya Venkataraman', mrn:'MRN·2024·08741', age:'48F', type:'Breast',          dx:'Carcinoma Right Breast — IDC',      stage:'IIIA', reason:'Treatment Planning', date:'15 Oct 2024', doctor:'Dr. S. Bajpai', status:'Completed',      priority:'High',    board:'Breast',      flag:'' },
    { id:'TB-2024-10-0090', name:'Ramesh Iyer',         mrn:'MRN·2024·07211', age:'62M', type:'Lung',            dx:'Adenocarcinoma Right Lung',          stage:'IVA',  reason:'Treatment Planning', date:'15 Oct 2024', doctor:'Dr. P. Kumar', status:'Pending Review', priority:'High',    board:'Thoracic',    flag:'STAT' },
    { id:'TB-2024-10-0088', name:'Sunita Rao',           mrn:'MRN·2024·06934', age:'55F', type:'GI / GU',         dx:'Carcinoma Cervix — SCC',             stage:'IIB',  reason:'Treatment Planning', date:'14 Oct 2024', doctor:'Dr. R. Mehta', status:'Completed',      priority:'Routine', board:'Gynae-Onco',  flag:'' },
    { id:'TB-2024-10-0087', name:'Arun Sharma',          mrn:'MRN·2024·06712', age:'44M', type:'Colorectal',      dx:'Colorectal Adenocarcinoma',          stage:'IIIC', reason:'At Relapse',         date:'14 Oct 2024', doctor:'Dr. S. Bajpai', status:'Scheduled',     priority:'Medium',  board:'GI-Onco',     flag:'Urgent' },
    { id:'TB-2024-10-0085', name:'Meera Nair',           mrn:'MRN·2024·06401', age:'39F', type:'Haematological',  dx:'Diffuse Large B-Cell Lymphoma',      stage:'III',  reason:'For Diagnosis',      date:'12 Oct 2024', doctor:'Dr. V. Joshi',  status:'Pending Review', priority:'High',    board:'Haemato',     flag:'' },
    { id:'TB-2024-10-0082', name:'Deepak Verma',          mrn:'MRN·2024·05987', age:'71M', type:'Lung',            dx:'Squamous Cell Carcinoma Lung',       stage:'IIIB', reason:'Second Opinion',     date:'11 Oct 2024', doctor:'Dr. P. Kumar', status:'Draft',          priority:'Routine', board:'Thoracic',    flag:'' },
    { id:'TB-2024-10-0079', name:'Kavitha Reddy',         mrn:'MRN·2024·05701', age:'52F', type:'Breast',          dx:'Carcinoma Left Breast — ILC',        stage:'IIA',  reason:'Treatment Planning', date:'10 Oct 2024', doctor:'Dr. S. Bajpai', status:'Completed',      priority:'Medium',  board:'Breast',      flag:'' },
  ];
 
  patients: any[] = [
    { name:'Priya Venkataraman', mrn:'MRN·2024·08741', meta:'F · 48 yrs · Breast Oncology', dx:'Ca Breast Right · T3N2M0',   av:'PV' },
    { name:'Ramesh Iyer',        mrn:'MRN·2024·07211', meta:'M · 62 yrs · Thoracic Oncology',dx:'Adenocarcinoma Lung · T4N2M1a',av:'RI' },
    { name:'Sunita Rao',         mrn:'MRN·2024·06934', meta:'F · 55 yrs · GYN Oncology',    dx:'Carcinoma Cervix · IIB',      av:'SR' },
    { name:'Arun Sharma',        mrn:'MRN·2024·06712', meta:'M · 44 yrs · GI Oncology',     dx:'Colorectal Ca · T4N2M0',      av:'AS' },
    { name:'Meera Nair',         mrn:'MRN·2024·06401', meta:'F · 39 yrs · Haematology',     dx:'DLBCL · Stage III',            av:'MN' },
  ];
 
  patientSearch   = '';
  selectedPatient: any = null;
 
  // ─── Entry Form ───────────────────────────────────────────
  activeSectionId = 'fs-attendees';
  tbId = 'TB-2024-10-0095';
 
  // 1. Attendees
  attendees: any[] = [
    { dept:'Medical Oncology',   name:'Dr. Suresh Bajpai',   role:'Senior Consultant',    present:'Present', sign:true },
    { dept:'Surgical Oncology',  name:'Dr. Anita Krishnan',  role:'Consultant (Chair)',   present:'Present', sign:true },
    { dept:'Radiation Oncology', name:'Dr. Prashant Mehta',  role:'Associate Prof.',      present:'Present', sign:true },
    { dept:'Radiology',          name:'Dr. Meena Pillai',    role:'Radiologist',          present:'Remote',  sign:true },
    { dept:'Pathology',          name:'Dr. Rajesh Kumar',    role:'Senior Pathologist',   present:'Present', sign:false },
  ];
 
  attendanceOptions = ['Present', 'Remote', 'Absent'];
 
  // 2. Primary Details
  mdtBoard      = 'Breast MDT';
  meetingDate   = '';
  meetingTime   = '09:00';
  meetingRoom   = 'Seminar Hall B · TMC';
  chairperson   = 'Dr. Anita Krishnan';
  treatingDoctor= 'Dr. S. Bajpai — Breast Oncology';
  presentingDoctor= 'Dr. A. Nair';
  boardOptions  = ['Breast MDT','Thoracic MDT','GI-Onco MDT','Gynae-Onco MDT','Haemato MDT','Neuro-Onco MDT'];
 
  // 3. Previous History
  prevHx     = 'No previous malignancy. Menopausal status: Pre-menopausal. Family history: Mother — Ca Breast (62 yrs).';
  prevSurg   = 'Nil relevant surgical history.';
  prevChemo  = '';
  prevRt     = '';
  allergies  = 'NKDA';
 
  // 4. Examination
  ecog       = '1';
  bsa        = '1.68';
  bp         = '124/80';
  weight     = '62';
  height     = '162';
  ps         = '';
  examFindings = 'Right breast lump — 4×3 cm, upper outer quadrant. Right axillary lymph nodes palpable (3 nodes). No contralateral findings. No distant signs.';
  ecogOptions  = ['0','1','2','3','4'];
 
  // 5. Investigations
  pathologyReport = 'Core biopsy — IDC Grade III. ER 90%, PR 70%, HER2 1+ (negative). Ki-67 42%. Node positive N2.';
  imagingReport   = 'MRI Breast: T3 (4.2 cm) right breast mass, N2 axillary nodes. PET-CT: T3N2M0. No visceral/bone involvement.';
  labResults      = 'CBC: WBC 8.2, Hb 11.8, Plt 240K. LFT/RFT normal. CA 15-3: 68 U/mL.';
  biomarkers      = 'ER+ (90%) / PR+ (70%) / HER2 Negative (1+) · Ki-67 42%';
 
  // 6. Case Summary
  primaryDiagnosis  = 'Carcinoma Right Breast — Invasive Ductal Carcinoma, Grade III';
  laterality        = 'Right';
  tumorSize         = '42';
  grading           = 'Grade III';
  tnmT              = 'T3';
  tnmN              = 'N2';
  tnmM              = 'M0';
  riskLevel         = 'High';
  lateralityOptions = ['Right','Left','Bilateral','N/A'];
  gradingOptions    = ['Grade I','Grade II','Grade III','Grade IV','N/A'];
  tnmTOptions       = ['TX','T0','T1','T2','T3','T4'];
  tnmNOptions       = ['NX','N0','N1','N2','N3'];
  tnmMOptions       = ['MX','M0','M1'];
 
  get combinedTnm(): string { return `${this.tnmT}${this.tnmN}${this.tnmM}`; }
  get computedStage(): string {
    if (this.tnmM === 'M1') return 'Stage IV';
    if (this.tnmT === 'T4') return 'Stage IIIB';
    if (this.tnmN === 'N2' || this.tnmN === 'N3') return 'Stage IIIA';
    if (this.tnmN === 'N1') return 'Stage IIA';
    return 'Stage I';
  }
 
  mdtReasons: any[] = [
    { label:'Treatment Planning — New',   checked:true  },
    { label:'At Relapse',                  checked:false },
    { label:'For Diagnosis',               checked:false },
    { label:'Clinical Trial Eligibility',  checked:false },
    { label:'Second Opinion',              checked:false },
    { label:'Others',                      checked:false },
  ];
  reasonOther    = '';
  showReasonOther= false;
 
  mdtQuestions: any[] = [
    { dept:'Surgical Onco',    text:'Is BCS feasible given T3N2 and current tumour size?' },
    { dept:'Radiation Onco',   text:'Regional nodal irradiation for N2 — recommended fields?' },
  ];
  questionDeptOptions = ['Surgical Onco','Radiation Onco','Medical Onco','Radiology','All'];
 
  // 7. Discussion
  discussionSummary = '';
  ncgCompliant      = 'yes';
  ncgDeviationReason= '';
  showNcgReason     = false;
 
  specialists: any[] = [
    {
      dept:'Radiation Oncology', doctor:'Dr. P. Mehta', color:'#B02A2A',
      recommendation:'Adjuvant RT recommended',
      comments:'Post-BCS, locoregional RT to right breast + axilla. Suggest 40 Gy/15 fr hypofractionation. DIBH for cardiac sparing.',
      status:'approved', remote:false,
      recOptions:['— Recommendation —','Adjuvant RT recommended','Neoadjuvant RT','Not recommended']
    },
    {
      dept:'Surgical Oncology', doctor:'Dr. A. Krishnan', color:'#1C5FA8',
      recommendation:'MRM recommended',
      comments:'T3N2 — MRM right breast + ALND. Post-NACT reassessment for BCS feasibility if good response.',
      status:'submitted', remote:false,
      recOptions:['— Recommendation —','BCS feasible','Borderline','MRM recommended']
    },
    {
      dept:'Medical Oncology', doctor:'Dr. S. Bajpai', color:'#0E7C66',
      recommendation:'NACT recommended',
      comments:'NACT — ddAC-T ×8 cycles. ER+/HER2- — endocrine post-surgery. Consider CDK4/6 inhibitor for high-risk node+ disease.',
      status:'approved', remote:false,
      recOptions:['— Recommendation —','NACT recommended','Adjuvant CT','Endocrine only']
    },
    {
      dept:'Radiology', doctor:'Dr. M. Pillai', color:'#BF7E1C',
      recommendation:'',
      comments:'PET-CT confirms T3N2M0. No distant metastases. 3 FDG-avid axillary nodes, largest 25mm. No visceral/bone involvement.',
      status:'submitted', remote:true,
      recOptions:['— Recommendation —']
    },
    {
      dept:'Pathology', doctor:'Dr. R. Kumar', color:'#BF7E1C',
      recommendation:'',
      comments:'IDC Grade III. ER 90%, PR 70%, HER2 1+ (negative). Ki-67 42%. Node positive (N2). Recommend Oncotype DX genomic profiling.',
      status:'pending', remote:false, fullWidth:true,
      furtherTests:'Oncotype DX genomic profiling',
      recOptions:['— Recommendation —']
    },
  ];
 
  treatmentIntent    = 'Curative';
  intentOptions      = ['Curative','Palliative','Adjuvant','Neoadjuvant'];
  treatmentModalities: any[] = [
    { icon:'💊', label:'Chemotherapy',   selected:true  },
    { icon:'🔪', label:'Surgery',         selected:true  },
    { icon:'☢',  label:'Radiotherapy',   selected:true  },
    { icon:'🎯', label:'Targeted Therapy',selected:false },
    { icon:'💉', label:'Hormonal Therapy',selected:false },
    { icon:'🧪', label:'Clinical Trial',  selected:false },
  ];
 
  finalDecision        = 'NACT ddAC-T ×8 cycles, followed by reassessment. If good response: BCS; else MRM + ALND. Post-surgery: Adjuvant RT (40 Gy/15 fr, DIBH). Endocrine therapy (AI) ×5-10 yrs. Oncotype DX to guide further decisions.';
  treatmentStartDate   = '2024-10-21';
  subsequentMdt        = 'yes';
  diagnosisChanged     = 'no';
  revisedDiagnosis     = '';
 
  // 8. Follow-Up
  followUpDate         = '';
  linkedPrevMdt        = 'TB-2024-10-0094 · 15 Oct 2024';
  decisionFollowed     = '';
  notFollowedReasons: any[] = [
    { label:'Patient refusal',         checked:false },
    { label:'Clinical deterioration',  checked:false },
    { label:'Insurance / cost issues', checked:false },
    { label:'Doctor unavailability',   checked:false },
    { label:'Others',                  checked:false },
  ];
  currentOutcome = '';
  responseStatus = '';
  nextReviewDate = '';
  outcomeNotes   = '';
  outcomeOptions = ['Complete Response','Partial Response','Stable Disease','Progressive Disease','Not Yet Assessed'];
 
  // ─── Chart / Report view ──────────────────────────────────
  currentChart: any = null;
  charts: any = {
    'TB-2024-10-0094': {
      tb:'TB-2024-10-0094', caseNo:'CASE-2024-0452', status:'Finalized',
      patient: { name:'Priya Venkataraman', mrn:'MRN·2024·08741', meta:'F · 48 yrs', av:'PV' },
      meeting: { board:'Breast MDT', date:'15 Oct 2024', time:'09:00 – 11:00 AM', room:'Seminar Hall B · TMC', chair:'Dr. Anita Krishnan' },
      treatingDoctor:'Dr. S. Bajpai — Breast Oncology',
      attendees: [
        { dept:'Medical Oncology',   name:'Dr. Suresh Bajpai',  role:'Senior Consultant',  present:'Present', signed:true  },
        { dept:'Surgical Oncology',  name:'Dr. Anita Krishnan', role:'Consultant (Chair)', present:'Present', signed:true  },
        { dept:'Radiation Oncology', name:'Dr. Prashant Mehta', role:'Associate Prof.',    present:'Present', signed:true  },
        { dept:'Radiology',          name:'Dr. Meena Pillai',   role:'Radiologist',        present:'Remote',  signed:true  },
        { dept:'Pathology',          name:'Dr. Rajesh Kumar',   role:'Senior Pathologist', present:'Present', signed:false },
      ],
      clinical: {
        diagnosis:'Carcinoma Right Breast — Invasive Ductal Carcinoma, Grade III',
        laterality:'Right', tnm:'T3N2M0', stage:'IIIA', ecog:'1', risk:'High',
        biomarkers:'ER+ (90%) / PR+ (70%) / HER2 Negative (1+) · Ki-67 42%',
        reason:'Treatment Planning — New', ncgCompliant:true
      },
      decisions: [
        { dept:'Radiation Oncology', doctor:'Dr. P. Mehta',  rec:'Adjuvant RT recommended', note:'Post-BCS, locoregional RT to right breast + axilla. 40 Gy/15 fr hypofractionation. DIBH for cardiac sparing.',                                    status:'approved' },
        { dept:'Surgical Oncology',  doctor:'Dr. A. Krishnan',rec:'MRM recommended',        note:'T3N2 — MRM right breast + ALND. Post-NACT reassessment for BCS feasibility if good response.',                                                     status:'submitted' },
        { dept:'Medical Oncology',   doctor:'Dr. S. Bajpai', rec:'NACT recommended',        note:'NACT ddAC-T ×8 cycles. ER+/HER2- endocrine post-surgery. Consider CDK4/6 inhibitor for high-risk node+ disease.',                                status:'approved' },
        { dept:'Radiology',          doctor:'Dr. M. Pillai', rec:'Imaging confirmed',       note:'PET-CT confirms T3N2M0. No distant metastases. 3 FDG-avid axillary nodes, largest 25mm.',                                                          status:'submitted' },
        { dept:'Pathology',          doctor:'Dr. R. Kumar',  rec:'Genomic profiling advised',note:'IDC Grade III. ER 90%, PR 70%, HER2 1+. Ki-67 42%. Node positive (N2). Recommend Oncotype DX.',                                                  status:'pending' },
      ],
      plan: {
        intent:'Curative',
        sequence:['Neoadjuvant Chemotherapy','Surgery (MRM/BCS)','Adjuvant Radiotherapy','Endocrine Therapy'],
        narrative:'NACT ddAC-T ×8 cycles → reassessment → MRM + ALND (or BCS if good response). Post-surgery: Adjuvant RT (40 Gy/15 fr, DIBH). Endocrine therapy (AI) ×5-10 yrs. Oncotype DX to guide further systemic therapy.',
        startTarget:'21 Oct 2024',
      },
      followup: {
        appointments:['Medical Oncology — NACT initiation, 21 Oct 2024','Surgical Oncology — Post-NACT review, Jan 2025'],
        pending:['Oncotype DX genomic profiling','Baseline ECHO / MUGA (pre-anthracycline)'],
        referrals:['Onco-fertility counselling','Cardio-oncology (DIBH planning)'],
        subsequentMdt:'Yes — post-NACT reassessment',
      },
      timeline: [
        { stage:'Referral',            date:'12 Oct 2024', future:false },
        { stage:'MDT Meeting',          date:'15 Oct 2024', future:false },
        { stage:'Decision Finalized',   date:'15 Oct 2024', future:false },
        { stage:'Treatment Start',      date:'21 Oct 2024', future:true  },
        { stage:'Follow-Up MDT',        date:'Jan 2025',    future:true  },
      ],
      approval: [
        { label:'Draft',     meta:'12 Oct, Dr. A. Nair',  state:'done' },
        { label:'Reviewed',  meta:'13 Oct, Dr. A. Nair',  state:'done' },
        { label:'Finalized', meta:'15 Oct, Dr. S. Bajpai', state:'done' },
      ],
      audit: [
        { action:'MDT record finalized',                          by:'Dr. S. Bajpai',   dept:'Medical Oncology',  when:'15 Oct 2024, 11:32 AM' },
        { action:'Final decision updated — plan revised',         by:'Dr. S. Bajpai',   dept:'Medical Oncology',  when:'15 Oct 2024, 10:48 AM' },
        { action:'Radiology comments added remotely',             by:'Dr. M. Pillai',   dept:'Radiology',          when:'14 Oct 2024, 11:41 PM' },
        { action:'Case submitted for review',                     by:'Dr. A. Nair',     dept:'Surgical Oncology',  when:'13 Oct 2024, 04:22 PM' },
        { action:'Draft created — patient selected',              by:'Dr. A. Nair',     dept:'Surgical Oncology',  when:'12 Oct 2024, 03:10 PM' },
      ],
    }
  };
 
  // ─── KPI ─────────────────────────────────────────────────
  kpis: any[] = [
    { label:'Total MDTs',      value:'284', sub:'▲ 6% vs Sep',              trend:'up',   color:'navy'  },
    { label:'Pending Review',  value:'18',  sub:'▼ 3 awaiting discussion',   trend:'down', color:'amber' },
    { label:'Completed',       value:'241', sub:'▲ 12% this month',          trend:'up',   color:'green' },
    { label:"Today's Cases",   value:'7',   sub:'2 STAT · 15 Oct 2024',      trend:'flat', color:'teal'  },
    { label:'Avg Closure',     value:'3.2d',sub:'▼ 0.4d from submission',    trend:'up',   color:'red'   },
  ];
 
  // ─── Collapsed sections map ───────────────────────────────
  collapsedSections: any = {
    'fs-attendees':false, 'fs-primary':false, 'fs-prevhx':true,
    'fs-exam':false,      'fs-invest':true,   'fs-summary':false,
    'fs-discuss':false,   'fs-followup':true
  };
 
  // ─── Validation ───────────────────────────────────────────
  loginSubmitted = false;
  entrySubmitted = false;
 
  constructor(private messageService: MessageService) {}
 
  ngOnInit(): void {}
 
  // ─── LOGIN ────────────────────────────────────────────────
  selectRole(index: number): void { this.selectedRole = index; this.currentUser = this.roles[index]; }
 
  doLogin(): void {
    this.loginSubmitted = true;
    if (!this.loginEmail) { this.showToast('Email is required', 'error'); return; }
    this.currentUser = this.roles[this.selectedRole];
    this.activeScreen = 'dashboard';
  }
 
  // ─── NAVIGATION ──────────────────────────────────────────
  goTo(screen: 'login'|'dashboard'|'patselect'|'entry'|'chart'): void {
    this.activeScreen = screen;
    if (screen === 'patselect') this.renderPatients('');
  }
 
  // ─── DASHBOARD ───────────────────────────────────────────
  get filteredCases(): any[] {
    return this.cases.filter(c => {
      // Added null-safety check for string parsing to prevent undefined errors
      const matchTab    = !this.dashTabFilter || c.status === this.dashTabFilter || (this.dashTabFilter === 'Draft' && c.doctor.includes(this.currentUser.name.split(' ').pop() || ''));
      const matchSearch = !this.dashSearch   || c.name.toLowerCase().includes(this.dashSearch.toLowerCase()) || c.mrn.toLowerCase().includes(this.dashSearch.toLowerCase()) || c.dx.toLowerCase().includes(this.dashSearch.toLowerCase());
      const matchStatus = !this.filterStatus || c.status === this.filterStatus;
      const matchType   = !this.filterType   || c.type === this.filterType;
      return matchTab && matchSearch && matchStatus && matchType;
    });
  }
 
  setDashTab(tab: string): void { this.dashTabFilter = tab; }
 
  getStatusClass(status: string): string {
    const m: any = { 'Completed':'b-teal','Pending Review':'b-amber','Scheduled':'b-navy','Draft':'b-gray' };
    return m[status] || 'b-gray';
  }
 
  getPriorityClass(p: string): string {
    return p === 'High' ? 'prio-high' : p === 'Medium' ? 'prio-med' : 'prio-routine';
  }
 
  getFlagClass(f: string): string {
    return f === 'STAT' ? 'flag-stat' : f === 'Urgent' ? 'flag-urgent' : '';
  }
 
  // ─── PATIENT SELECT ───────────────────────────────────────
  get filteredPatients(): any[] {
    if (!this.patientSearch) return this.patients;
    const q = this.patientSearch.toLowerCase();
    return this.patients.filter(p =>
      p.name.toLowerCase().includes(q) || p.mrn.toLowerCase().includes(q) || p.dx.toLowerCase().includes(q)
    );
  }
 
  renderPatients(q: string): void { this.patientSearch = q; }
 
  selectPatient(p: any): void { this.selectedPatient = p; }
 
  loadPatientEntry(): void {
    if (!this.selectedPatient) { this.showToast('Please select a patient first', 'warn'); return; }
    this.activeScreen = 'entry';
    this.tbId = 'TB-2024-10-0095';
  }
 
  // ─── ENTRY ────────────────────────────────────────────────
  toggleSection(id: string): void { this.collapsedSections[id] = !this.collapsedSections[id]; }
  isCollapsed(id: string): boolean { return !!this.collapsedSections[id]; }
  scrollToSection(id: string): void { this.activeSectionId = id; document.getElementById(id)?.scrollIntoView({ behavior:'smooth', block:'start' }); }
 
  toggleReasonOther(reason: any): void {
    if (reason.label === 'Others') this.showReasonOther = reason.checked;
  }
 
  addQuestion(): void {
    this.mdtQuestions.push({ dept:'All', text:'' });
  }
 
  removeQuestion(i: number): void {
    this.mdtQuestions.splice(i, 1);
  }
 
  toggleNcgReason(): void { this.showNcgReason = this.ncgCompliant === 'no'; }
 
  setSpecStatus(spec: any, status: string): void {
    spec.status = status;
    this.showToast(`${spec.dept} marked as ${status}`, 'success');
  }
 
  getSpecStatusClass(status: string): string {
    const m: any = { approved:'ss-approved', submitted:'ss-submitted', pending:'ss-pending' };
    return m[status] || 'ss-pending';
  }
 
  toggleModality(mod: any): void { mod.selected = !mod.selected; }
 
  saveDraft(): void {
    this.showToast('Draft saved — TB-' + this.tbId, 'success');
  }
 
  submitCase(): void {
    this.entrySubmitted = true;
    if (!this.primaryDiagnosis || !this.finalDecision) {
      this.showToast('Please complete required fields', 'error');
      return;
    }
    this.showToast('Case submitted for review ✓', 'success');
    setTimeout(() => this.activeScreen = 'dashboard', 1500);
  }
 
  // ─── CHART VIEW ───────────────────────────────────────────
  openChart(caseId: string): void {
    this.currentChart = this.charts[caseId] || null;
    if (this.currentChart) {
      this.activeScreen = 'chart';
    } else {
      this.showToast('Chart not available for this case', 'warn');
    }
  }
 
  printChart(): void {
    this.showToast('Opening print dialog…', 'info');
    setTimeout(() => window.print(), 300);
  }
 
  // ─── TOAST ────────────────────────────────────────────────
  showToast(msg: string, severity: string = 'success'): void {
    this.messageService.add({ severity, summary: msg, life: 3000 });
  }
 
  // ─── HELPERS ─────────────────────────────────────────────
  getInitials(name: string): string {
    return name.split(' ').filter(Boolean).map(w => w[0]).join('').substring(0, 2).toUpperCase();
  }
 
  trackByIndex(i: number): number { return i; }
}