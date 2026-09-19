import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessageService } from 'primeng/api';
/* ── Component ─────────────────────────────────────── */
@Component({
  selector: 'app-quickpage',
  templateUrl: './quickpage.component.html',
  styleUrls: ['./quickpage.component.css'],
})
export class QuickpageComponent implements OnInit, OnDestroy {

  // ─── Clock ───────────────────────────────────────────────
  currentDateTime = '';
  private clockInterval: any;
 
  // ─── Filters ─────────────────────────────────────────────
  searchText       = '';
  selectedDoctor   = '';
  selectedWard     = '';
  selectedStatus   = '';
  activeTab        = 'ALL';
  activeModality   = 'ALL';
 
  // ─── Detail panel ─────────────────────────────────────────
  selectedPatientId: number | null = null;
 
  // ─── Work Drawer ──────────────────────────────────────────
  drawerOpen    = false;
  drawerPatient: any = null;
  activeWkTab   = 'assess';
 
  // ─── Modals ───────────────────────────────────────────────
  ctcaeModalOpen:any  = false;
  esignModalOpen:any  = false;
  esignTitle      = 'Doctor E-Signature';
  esignPin        = '';
  esignRole       = 'Treating consultant';
  toxAttr         = 'Probably';
  postpone        = 'No';
  postponeReason  = '';
  postponeDays :any   = '';
  toxRows: any[]  = [];
 
  // ─── Prescription rows ────────────────────────────────────
  rxRows: any[] = [];
 
  // ─── Dropdown options ─────────────────────────────────────
  doctorOptions = [
    { label: 'All Doctors', value: '' },
    { label: 'Dr. Sharma',  value: 'Sharma'   },
    { label: 'Dr. Rajan',   value: 'Rajan'    },
    { label: 'Dr. Mehta',   value: 'Mehta'    },
    { label: 'Dr. Pillai',  value: 'Pillai'   },
    { label: 'Dr. Krishnan',value: 'Krishnan' }
  ];
 
  wardOptions = [
    { label: 'All Wards', value: '' },
    { label: 'Ward 4B',   value: '4B'  },
    { label: 'Ward 5C',   value: '5C'  },
    { label: 'Daycare 1', value: 'DC1' },
    { label: 'Daycare 2', value: 'DC2' },
    { label: 'ER Bay',    value: 'ER'  },
    { label: 'OPD',       value: 'OPD' },
    { label: 'RT Suite',  value: 'RT'  }
  ];
 
  statusOptions = [
    { label: 'All Statuses',  value: ''            },
    { label: 'Waiting',       value: 'Waiting'     },
    { label: 'In Progress',   value: 'In Progress' },
    { label: 'Completed',     value: 'Completed'   },
    { label: 'On Hold',       value: 'On Hold'     }
  ];
 
  modalityPills = ['ALL','Chemo','Radiation','Surgery','Palliative','Pain','Preventive','MTB'];
 
  routeOptions = ['PO','IV','SC','IM','Topical','PO/IV','Inhalation'];
 
  toxSystemOptions = ['Haematological','GI','Neurological','Cardiac','Renal','Dermatological','Respiratory','Other'];
 
  toxGradeOptions = [
    { label: 'G1 – Mild',      value: '1' },
    { label: 'G2 – Moderate',  value: '2' },
    { label: 'G3 – Severe',    value: '3' },
    { label: 'G4 – Life-threatening', value: '4' },
    { label: 'G5 – Death',     value: '5' }
  ];
 
  toxPlaceOptions = ['OPD','Daycare','Inpatient','ER','ICU'];
 
  // ─── Master Patient Data ──────────────────────────────────
  allPatients: any[] = [
    // EMERGENCY
    { id:1, name:'Dinesh Kumar',          age:48, sex:'M', mrn:'MR-2025-0101', group:'ER', time:'08:30',
      modality:'Chemo',   protocol:'CHOP-R',                     cycleNum:4,  cycleTot:6,  frNum:null, frTot:null,
      diagnosis:'NHL — Diffuse Large B Cell', doctor:'Mehta', ward:'ER Bay 2',
      status:'In Progress', priority:'High',
      prevTox:{ g:3, n:'Febrile Neutropenia' },
      labs:{ HB:7.8, PLT:35000, ANC:200, WBC:1.2 }, ecog:2, pain:4, bsa:1.82,
      consent:true, decision:'Hold — Neutropenic fever',
      rtGap:false, concChemo:false, postOpDay:null, goalsCare:false, lastCycle:false, drain:false, cardiac:false },
 
    { id:2, name:'Rajiv Menon',           age:59, sex:'M', mrn:'MR-2024-1034', group:'ER', time:'09:45',
      modality:'Pain',    protocol:'Opioid Titration',            cycleNum:null, cycleTot:null, frNum:null, frTot:null,
      diagnosis:'Pancreatic Ca — Stage IV', doctor:'Mehta', ward:'ER Bay 1',
      status:'In Progress', priority:'High',
      prevTox:{ g:3, n:'Cachexia' },
      labs:{ HB:9.5, PLT:80000, ANC:1400, WBC:4.2 }, ecog:3, pain:9, bsa:1.65,
      consent:true, decision:'Pain crisis — escalate',
      rtGap:false, concChemo:false, postOpDay:null, goalsCare:true, lastCycle:false, drain:false, cardiac:false },
 
    // INPATIENT
    { id:3, name:'Arun Mehta',            age:71, sex:'M', mrn:'MR-2023-1188', group:'IP', time:'—',
      modality:'Palliative', protocol:'Palliative Care Consult',  cycleNum:null, cycleTot:null, frNum:null, frTot:null,
      diagnosis:'Lung Ca — Stage IV', doctor:'Mehta', ward:'4B-Rm12',
      status:'Waiting', priority:'High',
      prevTox:{ g:3, n:'Dyspnoea' },
      labs:{ HB:8.1, PLT:60000, ANC:900, WBC:3.1 }, ecog:3, pain:7, bsa:1.71,
      consent:false, decision:'Goals of care discussion',
      rtGap:false, concChemo:false, postOpDay:null, goalsCare:true, lastCycle:false, drain:false, cardiac:false },
 
    { id:4, name:'Vijay Gopalakrishnan',  age:58, sex:'M', mrn:'MR-2024-0799', group:'IP', time:'—',
      modality:'Surgery', protocol:'Post-op Ward Round',          cycleNum:null, cycleTot:null, frNum:null, frTot:null,
      diagnosis:'Gastric Ca — Total Gastrectomy', doctor:'Rajan', ward:'5C-Rm7',
      status:'In Progress', priority:'Med',
      prevTox:{ g:0, n:'' },
      labs:{ HB:10.0, PLT:210000, ANC:4200, WBC:9.8 }, ecog:1, pain:5, bsa:1.88,
      consent:true, decision:'Stable',
      rtGap:false, concChemo:false, postOpDay:3, goalsCare:false, lastCycle:false, drain:true, cardiac:false },
 
    { id:5, name:'Suresh Iyer',           age:66, sex:'M', mrn:'MR-2023-0878', group:'IP', time:'—',
      modality:'Radiation', protocol:'Palliative RT Spine 30Gy/10Fr', cycleNum:null, cycleTot:null, frNum:10, frTot:10,
      diagnosis:'Prostate Ca — Bone Mets', doctor:'Pillai', ward:'4B-Rm8',
      status:'Completed', priority:'Med',
      prevTox:{ g:1, n:'Fatigue' },
      labs:{ HB:11.2, PLT:130000, ANC:2200, WBC:5.6 }, ecog:2, pain:6, bsa:1.79,
      consent:true, decision:'Completed',
      rtGap:false, concChemo:false, postOpDay:null, goalsCare:false, lastCycle:false, drain:false, cardiac:false },
 
    { id:6, name:'Harish Balakrishnan',   age:73, sex:'M', mrn:'MR-2023-0554', group:'IP', time:'—',
      modality:'Palliative', protocol:'Goals of Care',            cycleNum:null, cycleTot:null, frNum:null, frTot:null,
      diagnosis:'Bladder Ca — Stage IVB', doctor:'Mehta', ward:'4B-Rm15',
      status:'Waiting', priority:'High',
      prevTox:{ g:2, n:'Haematuria' },
      labs:{ HB:8.9, PLT:70000, ANC:1100, WBC:3.8 }, ecog:4, pain:8, bsa:1.62,
      consent:false, decision:'Goals of care',
      rtGap:false, concChemo:false, postOpDay:null, goalsCare:true, lastCycle:false, drain:false, cardiac:false },
 
    // DAYCARE
    { id:7, name:'Ramesh Nair',           age:64, sex:'M', mrn:'MR-2024-0422', group:'DC', time:'09:15',
      modality:'Chemo', protocol:'FOLFOX6',                       cycleNum:5,  cycleTot:8,  frNum:null, frTot:null,
      diagnosis:'Colorectal Ca — Stage IV', doctor:'Rajan', ward:'DC1',
      status:'In Progress', priority:'Med',
      prevTox:{ g:1, n:'Fatigue' },
      labs:{ HB:11.4, PLT:140000, ANC:2100, WBC:5.9 }, ecog:1, pain:2, bsa:1.91,
      consent:true, decision:'Proceed',
      rtGap:false, concChemo:false, postOpDay:null, goalsCare:false, lastCycle:false, drain:false, cardiac:false },
 
    { id:8, name:'Kavitha Sundaram',      age:39, sex:'F', mrn:'MR-2025-0023', group:'DC', time:'10:00',
      modality:'Chemo', protocol:'AC-T Dense Dose',               cycleNum:2,  cycleTot:8,  frNum:null, frTot:null,
      diagnosis:'Breast Ca — Stage II', doctor:'Sharma', ward:'DC2',
      status:'Waiting', priority:'Low',
      prevTox:{ g:1, n:'Nausea' },
      labs:{ HB:12.1, PLT:180000, ANC:2400, WBC:6.8 }, ecog:0, pain:1, bsa:1.68,
      consent:true, decision:'Proceed',
      rtGap:false, concChemo:false, postOpDay:null, goalsCare:false, lastCycle:false, drain:false, cardiac:false },
 
    { id:9, name:'Padmavathi Reddy',      age:63, sex:'F', mrn:'MR-2024-0902', group:'DC', time:'10:30',
      modality:'Chemo', protocol:'Carboplatin + Pemetrexed',      cycleNum:6,  cycleTot:6,  frNum:null, frTot:null,
      diagnosis:'NSCLC — Stage IIIA', doctor:'Pillai', ward:'DC1',
      status:'Waiting', priority:'Med',
      prevTox:{ g:2, n:'Thrombocytopenia' },
      labs:{ HB:10.5, PLT:110000, ANC:1600, WBC:4.4 }, ecog:1, pain:3, bsa:1.58,
      consent:true, decision:'Last cycle — response assessment due',
      rtGap:false, concChemo:false, postOpDay:null, goalsCare:false, lastCycle:true, drain:false, cardiac:false },
 
    { id:10, name:'Geetha Nambiar',       age:50, sex:'F', mrn:'MR-2024-0741', group:'DC', time:'11:30',
      modality:'Chemo', protocol:'Capecitabine (Oral)',            cycleNum:8,  cycleTot:8,  frNum:null, frTot:null,
      diagnosis:'Colorectal Ca — Stage III', doctor:'Rajan', ward:'DC1',
      status:'Waiting', priority:'Low',
      prevTox:{ g:1, n:'Hand-foot syndrome' },
      labs:{ HB:12.8, PLT:160000, ANC:2800, WBC:7.1 }, ecog:0, pain:1, bsa:1.74,
      consent:true, decision:'Last cycle',
      rtGap:false, concChemo:false, postOpDay:null, goalsCare:false, lastCycle:true, drain:false, cardiac:false },
 
    { id:11, name:'Srinivasan Pillai',    age:55, sex:'M', mrn:'MR-2024-0619', group:'DC', time:'12:00',
      modality:'Chemo', protocol:'Gemcitabine + Cisplatin',        cycleNum:3,  cycleTot:6,  frNum:null, frTot:null,
      diagnosis:'Bladder Ca — Muscle-invasive', doctor:'Pillai', ward:'DC2',
      status:'On Hold', priority:'Med',
      prevTox:{ g:2, n:'Nephrotoxicity — Cr↑' },
      labs:{ HB:10.2, PLT:95000, ANC:1300, WBC:3.9 }, ecog:1, pain:3, bsa:1.87,
      consent:true, decision:'Hold — renal function review',
      rtGap:false, concChemo:false, postOpDay:null, goalsCare:false, lastCycle:false, drain:false, cardiac:false },
 
    { id:12, name:'Annapoorna Devi',      age:52, sex:'F', mrn:'MR-2025-0211', group:'DC', time:'13:00',
      modality:'Chemo', protocol:'Trastuzumab Maintenance',        cycleNum:12, cycleTot:18, frNum:null, frTot:null,
      diagnosis:'Breast Ca HER2+ — Stage III', doctor:'Sharma', ward:'DC2',
      status:'Waiting', priority:'Low',
      prevTox:{ g:0, n:'' },
      labs:{ HB:13.1, PLT:210000, ANC:3200, WBC:7.9 }, ecog:0, pain:0, bsa:1.72,
      consent:true, decision:'Proceed — LVEF monitoring due',
      rtGap:false, concChemo:false, postOpDay:null, goalsCare:false, lastCycle:false, drain:false, cardiac:true },
 
    { id:13, name:'Prem Shankar Das',     age:67, sex:'M', mrn:'MR-2024-0533', group:'DC', time:'13:30',
      modality:'Chemo', protocol:'Bendamustine + Rituximab',       cycleNum:4,  cycleTot:6,  frNum:null, frTot:null,
      diagnosis:'CLL — Relapsed', doctor:'Mehta', ward:'DC1',
      status:'Waiting', priority:'Med',
      prevTox:{ g:2, n:'Infusion reaction Gr2' },
      labs:{ HB:9.8, PLT:88000, ANC:900, WBC:2.4 }, ecog:1, pain:2, bsa:1.94,
      consent:true, decision:'Pre-medicate — prior infusion reaction',
      rtGap:false, concChemo:false, postOpDay:null, goalsCare:false, lastCycle:false, drain:false, cardiac:false },
 
    // OUTPATIENT
    { id:14, name:'Meera Krishnamurthy',  age:52, sex:'F', mrn:'MR-2024-0318', group:'OP', time:'09:00',
      modality:'Chemo', protocol:'BR PACL + TRAS 21d',             cycleNum:3,  cycleTot:6,  frNum:null, frTot:null,
      diagnosis:'Breast Ca — Stage III', doctor:'Sharma', ward:'OPD-3',
      status:'In Progress', priority:'High',
      prevTox:{ g:2, n:'Peripheral Neuropathy' },
      labs:{ HB:9.2, PLT:95000, ANC:800, WBC:2.8 }, ecog:1, pain:4, bsa:1.68,
      consent:false, decision:'Review — dose reduction consider',
      rtGap:false, concChemo:false, postOpDay:null, goalsCare:false, lastCycle:false, drain:false, cardiac:false },
 
    { id:15, name:'Sujata Rao',           age:47, sex:'F', mrn:'MR-2024-0511', group:'OP', time:'09:30',
      modality:'Radiation', protocol:'EBRT IMRT 66Gy/33Fr',        cycleNum:null, cycleTot:null, frNum:18, frTot:33,
      diagnosis:'Cervical Ca — Stage IIB', doctor:'Pillai', ward:'RT Suite',
      status:'Waiting', priority:'Med',
      prevTox:{ g:2, n:'Mucositis Gr2' },
      labs:{ HB:10.8, PLT:120000, ANC:1800, WBC:5.2 }, ecog:0, pain:3, bsa:1.61,
      consent:true, decision:'Proceed',
      rtGap:false, concChemo:true, postOpDay:null, goalsCare:false, lastCycle:false, drain:false, cardiac:false },
 
    { id:16, name:'Lakshmi Patel',        age:55, sex:'F', mrn:'MR-2024-0654', group:'OP', time:'10:15',
      modality:'MTB', protocol:'MTB Review — 2nd Opinion',          cycleNum:null, cycleTot:null, frNum:null, frTot:null,
      diagnosis:'Ovarian Ca — Stage III (Recurrence)', doctor:'Sharma', ward:'Conf Rm B',
      status:'Waiting', priority:'Med',
      prevTox:{ g:1, n:'Alopecia' },
      labs:{ HB:11.6, PLT:150000, ANC:1900, WBC:5.8 }, ecog:1, pain:2, bsa:1.69,
      consent:true, decision:'Plan pending MTB decision',
      rtGap:false, concChemo:false, postOpDay:null, goalsCare:false, lastCycle:false, drain:false, cardiac:false },
 
    { id:17, name:'Anita Bose',           age:44, sex:'F', mrn:'MR-2025-0209', group:'OP', time:'11:00',
      modality:'Preventive', protocol:'High Risk Screening BRCA1+', cycleNum:null, cycleTot:null, frNum:null, frTot:null,
      diagnosis:'BRCA1+ — Unaffected Surveillance', doctor:'Sharma', ward:'OPD-5',
      status:'Waiting', priority:'Low',
      prevTox:{ g:0, n:'' },
      labs:{ HB:13.2, PLT:220000, ANC:3100, WBC:8.0 }, ecog:0, pain:0, bsa:1.71,
      consent:false, decision:'Proceed',
      rtGap:false, concChemo:false, postOpDay:null, goalsCare:false, lastCycle:false, drain:false, cardiac:false },
 
    { id:18, name:'Ravi Kumar Sharma',    age:61, sex:'M', mrn:'MR-2024-0888', group:'OP', time:'11:45',
      modality:'Radiation', protocol:'Adjuvant RT H&N 60Gy/30Fr',  cycleNum:null, cycleTot:null, frNum:8, frTot:30,
      diagnosis:'Oral Ca — SCC Post-Surgery', doctor:'Krishnan', ward:'RT Suite',
      status:'Waiting', priority:'Med',
      prevTox:{ g:1, n:'Xerostomia Gr1' },
      labs:{ HB:11.9, PLT:145000, ANC:2000, WBC:5.4 }, ecog:1, pain:3, bsa:1.82,
      consent:true, decision:'Proceed',
      rtGap:true, concChemo:true, postOpDay:null, goalsCare:false, lastCycle:false, drain:false, cardiac:false }
  ];
 
  // ─── RX Seeds per modality ────────────────────────────────
  rxSeeds: any = {
    Chemo:[
      { sym:'Nausea / Vomiting',   drug:'Ondansetron 8mg',  rt:'PO/IV', dose:'8 mg',    freq:'BD',  days:'3' },
      { sym:'Infection prophylaxis',drug:'Filgrastim (G-CSF)',rt:'SC',  dose:'300 mcg', freq:'OD',  days:'5' },
      { sym:'Gastric protection',  drug:'Pantoprazole',     rt:'PO',    dose:'40 mg',   freq:'OD',  days:'7' }
    ],
    Radiation:[
      { sym:'Mucositis',   drug:'Benzydamine rinse', rt:'Topical', dose:'15 ml', freq:'QID', days:'14' },
      { sym:'Skin care',   drug:'Aqueous cream',     rt:'Topical', dose:'PRN',   freq:'BD',  days:'—'  }
    ],
    Pain:[
      { sym:'Pain',             drug:'Morphine SR',  rt:'PO', dose:'20 mg', freq:'BD',  days:'—' },
      { sym:'Breakthrough pain',drug:'Morphine IR',  rt:'PO', dose:'5 mg',  freq:'PRN', days:'—' },
      { sym:'Constipation',     drug:'Lactulose',    rt:'PO', dose:'15 ml', freq:'BD',  days:'—' }
    ],
    Palliative:[
      { sym:'Pain',       drug:'Morphine SR', rt:'PO', dose:'15 mg', freq:'BD',  days:'—' },
      { sym:'Secretions', drug:'Hyoscine',    rt:'SC', dose:'20 mg', freq:'PRN', days:'—' }
    ],
    default:[{ sym:'Symptomatic', drug:'', rt:'PO', dose:'', freq:'', days:'' }]
  };
 
  // ─── Computed getters ─────────────────────────────────────
  get filteredPatients(): any[] {
    return this.allPatients.filter(p => {
      const matchTab      = this.activeTab === 'ALL' || p.group === this.activeTab;
      const matchModality = this.activeModality === 'ALL' || p.modality === this.activeModality;
      const matchSearch   = !this.searchText ||
        p.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
        p.mrn.toLowerCase().includes(this.searchText.toLowerCase());
      const matchDoctor  = !this.selectedDoctor  || p.doctor === this.selectedDoctor;
      const matchWard    = !this.selectedWard    || p.ward.includes(this.selectedWard);
      const matchStatus  = !this.selectedStatus  || p.status === this.selectedStatus;
      return matchTab && matchModality && matchSearch && matchDoctor && matchWard && matchStatus;
    });
  }
 
  get tabCounts(): any {
    const counts: any = { ALL:0, ER:0, IP:0, DC:0, OP:0 };
    this.allPatients.forEach(p => {
      counts.ALL++;
      if (counts[p.group] !== undefined) counts[p.group]++;
    });
    return counts;
  }
 
  get selectedPatient(): any {
    return this.allPatients.find(p => p.id === this.selectedPatientId) || null;
  }
 
  get statusBarStats(): any {
    const highPri      = this.allPatients.filter(p => p.priority === 'High').length;
    const pendConsent  = this.allPatients.filter(p => !p.consent).length;
    const labAlerts    = this.allPatients.filter(p =>
      p.labs.ANC < 1000 || p.labs.HB < 10 || p.labs.PLT < 100000).length;
    return { highPri, pendConsent, labAlerts };
  }
 
  // ─── Lifecycle ────────────────────────────────────────────
  constructor(private messageService: MessageService) {}
 
  ngOnInit(): void {
    this.tick();
    this.clockInterval = setInterval(() => this.tick(), 30000);
  }
 
  ngOnDestroy(): void {
    if (this.clockInterval) clearInterval(this.clockInterval);
  }
 
  // ─── Clock ────────────────────────────────────────────────
  tick(): void {
    const now  = new Date();
    const h12  = now.getHours() % 12 || 12;
    const m    = now.getMinutes().toString().padStart(2, '0');
    const ampm = now.getHours() < 12 ? 'AM' : 'PM';
    const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    this.currentDateTime =
      `${days[now.getDay()]}, ${now.getDate().toString().padStart(2,'0')} ${months[now.getMonth()]} ${now.getFullYear()}  |  ${h12.toString().padStart(2,'0')}:${m} ${ampm}`;
  }
 
  // ─── Tab / Filter ─────────────────────────────────────────
  switchTab(tab: string): void {
    this.activeTab = tab;
    this.selectedPatientId = null;
  }
 
  filterModality(mod: string): void {
    this.activeModality = mod;
  }
 
  // ─── Row selection ────────────────────────────────────────
  selectPatient(p: any): void {
    this.selectedPatientId = this.selectedPatientId === p.id ? null : p.id;
  }
 
  closeDetail(): void {
    this.selectedPatientId = null;
  }
 
  // ─── Work Drawer ──────────────────────────────────────────
  openDrawer(patient: any, tab: string): void {
    this.drawerPatient = patient;
    this.activeWkTab   = tab;
    this.drawerOpen    = true;
    if (tab === 'rx') {
      this.initRxRows(patient);
    }
    if (tab === 'tox') {
      this.initToxRows(patient);
    }
  }
 
  closeDrawer(): void {
    this.drawerOpen = false;
  }
 
  switchWkTab(tab: string): void {
    this.activeWkTab = tab;
    if (tab === 'rx' && this.drawerPatient) this.initRxRows(this.drawerPatient);
    if (tab === 'tox' && this.drawerPatient) this.initToxRows(this.drawerPatient);
  }
 
  // ─── Prescriptions ────────────────────────────────────────
  initRxRows(patient: any): void {
    const seeds = this.rxSeeds[patient.modality] || this.rxSeeds['default'];
    this.rxRows = seeds.map((s: any) => ({ ...s, orig: { ...s }, modified: false }));
  }
 
  addRxRow(): void {
    this.rxRows.push({ sym:'', drug:'', rt:'PO', dose:'', freq:'', days:'', modified:false });
  }
 
  removeRxRow(i: number): void {
    this.rxRows.splice(i, 1);
  }
 
  checkRxMod(row: any): void {
    if (!row.orig || row.orig.drug === undefined) return;
    row.modified = (
      row.drug !== row.orig.drug ||
      row.dose !== row.orig.dose ||
      row.freq !== row.orig.freq ||
      row.days !== row.orig.days ||
      row.rt   !== row.orig.rt
    );
  }
 
  saveRxDraft(): void {
    this.toast('Prescription saved as draft ✓');
  }
 
  signAndSendPrescription(): void {
    this.esignTitle = 'Sign Prescription — ' + (this.drawerPatient?.name || '');
    this.esignModalOpen = true;
  }
 
  // ─── Toxicity ─────────────────────────────────────────────
  initToxRows(patient: any): void {
    this.toxRows = [{ cycle:'', dayOnset:'', place:'', system:'', grade:'', adverse:'' }];
  }
 
  addToxRow(): void {
    this.toxRows.push({ cycle:'', dayOnset:'', place:'', system:'', grade:'', adverse:'' });
  }
 
  removeToxRow(i: number): void {
    this.toxRows.splice(i, 1);
  }
 
  saveToxicity() {
    this.ctcaeModalOpen = false;
    this.toast('Toxicity record saved ✓');
  }
 
  openToxModal(patient: any): void {
    this.drawerPatient  = patient;
    this.initToxRows(patient);
    this.ctcaeModalOpen = true;
  }
 
  // ─── E-Sign Modal ─────────────────────────────────────────
  openEsignModal(patient: any): void {
    this.drawerPatient = patient;
    this.esignTitle    = 'Doctor E-Signature';
    this.esignPin      = '';
    this.esignModalOpen = true;
  }
 
  confirmEsign(): void {
    if (!this.esignPin || this.esignPin.length < 4) {
      this.toast('Please enter a valid 4–6 digit PIN', 'error');
      return;
    }
    this.esignModalOpen = false;
    this.toast('Signed & submitted successfully ✓');
  }
 
  // ─── Toast ────────────────────────────────────────────────
  toast(msg: string, severity: string = 'success'): void {
    this.messageService.add({ severity, summary: msg, life: 3000 });
  }
 
  // ─── Helper: clinical flags ───────────────────────────────
  getFlags(p: any): { cls: string; label: string }[] {
    const flags: { cls: string; label: string }[] = [];
    if (p.cycleNum)       flags.push({ cls:'info',  label:`Cycle ${p.cycleNum}/${p.cycleTot}${p.cycleNum===p.cycleTot?' · Last':''}` });
    if (p.frNum != null)  flags.push({ cls: p.frNum===p.frTot?'ok':'info', label:`Fr ${p.frNum}/${p.frTot}${p.frNum===p.frTot?' · Complete':''}` });
    if (p.rtGap)          flags.push({ cls:'crit',  label:'RT Gap' });
    if (p.concChemo)      flags.push({ cls:'warn',  label:'Concurrent chemo' });
    if (p.postOpDay!=null)flags.push({ cls:'info',  label:`Post-op Day ${p.postOpDay}` });
    if (p.drain)          flags.push({ cls:'crit',  label:'Drain output ↑' });
    if (p.prevTox.g >= 3) flags.push({ cls:'crit',  label:`Prior Tox G${p.prevTox.g}: ${p.prevTox.n}` });
    else if (p.prevTox.g===2) flags.push({ cls:'warn', label:`Prior Tox G2: ${p.prevTox.n}` });
    else if (p.prevTox.g===1 && p.prevTox.n) flags.push({ cls:'ok', label:`Prior Tox G1: ${p.prevTox.n}` });
    if (p.labs.ANC < 500)       flags.push({ cls:'crit', label:`ANC ${p.labs.ANC} — Severe` });
    else if (p.labs.ANC < 1000) flags.push({ cls:'warn', label:`ANC ${p.labs.ANC} — Low` });
    if (p.labs.HB < 8)          flags.push({ cls:'crit', label:`HB ${p.labs.HB}` });
    else if (p.labs.HB < 10)    flags.push({ cls:'warn', label:`HB ${p.labs.HB} g/dL` });
    if (p.labs.PLT < 50000)     flags.push({ cls:'crit', label:`PLT ${(p.labs.PLT/1000).toFixed(0)}K` });
    else if (p.labs.PLT < 100000) flags.push({ cls:'warn', label:`PLT ${(p.labs.PLT/1000).toFixed(0)}K` });
    if (p.pain >= 7)   flags.push({ cls:'crit', label:`Pain ${p.pain}/10` });
    else if (p.pain >= 4) flags.push({ cls:'warn', label:`Pain ${p.pain}/10` });
    if (p.ecog >= 3)   flags.push({ cls:'crit', label:`ECOG ${p.ecog}` });
    if (!p.consent)    flags.push({ cls:'warn', label:'Consent pending' });
    if (p.goalsCare)   flags.push({ cls:'crit', label:'Goals-of-care' });
    if (p.cardiac)     flags.push({ cls:'warn', label:'LVEF monitoring due' });
    if (p.decision)    flags.push({ cls: p.decision.toLowerCase().includes('hold')?'crit': p.decision.toLowerCase().includes('last')?'ok':'neu', label: p.decision });
    if (!flags.length) flags.push({ cls:'ok', label:'No active flags' });
    return flags;
  }
 
  getLabClass(type: string, p: any): string {
    if (type === 'HB')  return p.labs.HB  < 8 ? 'lab-crit' : p.labs.HB  < 10 ? 'lab-warn' : 'lab-ok';
    if (type === 'PLT') return p.labs.PLT < 50000 ? 'lab-crit' : p.labs.PLT < 100000 ? 'lab-warn' : 'lab-ok';
    if (type === 'ANC') return p.labs.ANC < 500 ? 'lab-crit' : p.labs.ANC < 1000 ? 'lab-warn' : 'lab-ok';
    if (type === 'pain')return p.pain >= 7 ? 'lab-crit' : p.pain >= 4 ? 'lab-warn' : 'lab-ok';
    if (type === 'ecog')return p.ecog >= 3 ? 'lab-crit' : p.ecog >= 2 ? 'lab-warn' : 'lab-ok';
    return '';
  }
 
  getStatusDot(status: string): string {
    const map: any = { 'Waiting':'waiting', 'In Progress':'inprog', 'Completed':'done', 'On Hold':'hold', 'Urgent':'urgent' };
    return map[status] || 'waiting';
  }
 
  getGroupBadgeClass(group: string): string {
    const map: any = { ER:'cs-er', IP:'cs-ip', DC:'cs-dc', OP:'cs-op' };
    return 'cs-badge ' + (map[group] || '');
  }
 
  getGroupLabel(group: string): string {
    const map: any = { ER:'Emergency', IP:'Inpatient', DC:'Daycare', OP:'Outpatient' };
    return map[group] || group;
  }
 
  getPltK(plt: number): string {
    return (plt / 1000).toFixed(0) + 'K';
  }
 
  isHighPriority(p: any): boolean {
    return p.priority === 'High';
  }
 
  isErRow(p: any): boolean {
    return p.group === 'ER';
  }
 
  trackById(_: number, p: any): number {
    return p.id;
  }
}