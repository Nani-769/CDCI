import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-opd-consult',
  templateUrl: './opd-consult.component.html',
  styleUrls: ['./opd-consult.component.css']
})
export class OpdConsultComponent implements OnInit {
// ─────────────────────────────────────────────
  //  SCREEN / TAB STATE
  // ─────────────────────────────────────────────
  currentScreen: string = 'firstvisit';
  activeTab: string = 'hist';
  sidebarCollapsed: boolean = false;
 
  // collapsed section map
  collapsedSections: { [key: string]: boolean } = {};
 
  // ─────────────────────────────────────────────
  //  PRIOR TOX MODAL
  // ─────────────────────────────────────────────
  showPriorToxModal: boolean = false;
  showValidationModal: boolean = false;
  validationErrors: string[] = [];
 
  // ─────────────────────────────────────────────
  //  PATIENT DATA
  // ─────────────────────────────────────────────
  patients: any = {
    firstvisit: {
      name: 'Suresh Nambiar', age: 62, sex: 'M',
      uhid: 'ONC-NEW-2025', registeredOn: '11 Jan 2025',
      diagnosis: 'Under evaluation', ecog: null,
      weight: 65.0, height: 170, allergies: 'NKDA',
      chiefComplaint: 'Altered bowel habits, rectal bleeding × 3 months',
      referredBy: 'Dr. Anil Sharma (Gastroenterology)',
      visitType: 'FIRST'
    },
    decision: {
      name: 'Suresh Nambiar', age: 62, sex: 'M',
      uhid: 'ONC-2025-04521', registeredOn: '11 Jan 2025',
      firstVisit: '11 Jan 2025',
      diagnosis: 'Carcinoma Rectum — T3N2M0 (Stage IIIC), Moderately Differentiated Adenocarcinoma',
      ecog: 1, weight: 64.5, height: 170, allergies: 'NKDA',
      stage: 'IIIC', t: 'T3', n: 'N2', m: 'M0',
      histology: 'Moderately Diff. Adenocarcinoma',
      visitType: 'DECISION',
      planDecision: 'Neoadjuvant Chemoradiation → Surgery → Adjuvant FOLFOX-6 × 6 cycles'
    },
    chemo: {
      name: 'Arjun Sharma', age: 58, sex: 'M',
      uhid: 'ONC-2025-04522',
      diagnosis: 'Carcinoma Sigmoid Colon — T3N1M0 (Stage IIIB)',
      ecogLast: 1, ecogToday: 1,
      weight: 68.2, weightLast: 70.1,
      height: 172, bsa: 1.80, bsaProtocol: 1.83,
      allergies: 'NKDA', visitType: 'CHEMO',
      protocol: 'FOLFOX-6', cycleTotal: 12, cycleCurrent: 3,
      cycleStatuses: ['done','done','current','future','future','future','future','future','future','future','future','future'],
      lastVisit: '4 Jan 2025', nextCycleDate: '2025-02-01'
    },
    rt: {
      name: 'Meena Krishnan', age: 52, sex: 'F',
      uhid: 'ONC-2025-03812',
      diagnosis: 'Ca Cervix — IIB (FIGO) — Squamous Cell Carcinoma',
      ecogLast: 1, ecogToday: 1,
      weight: 55.0, weightLast: 55.8,
      height: 158, bsa: 1.57, bsaProtocol: 1.58,
      allergies: 'Penicillin', visitType: 'RT',
      technique: 'IMRT', energy: '6 MV', machine: 'Elekta Versa HD',
      fractionDose: 1.8, totalDose: 50.4,
      fractionTotal: 28, fractionCurrent: 3,
      concurrentChemo: 'Cisplatin 40 mg/m² IV weekly',
      lastVisit: '10 Jan 2025'
    }
  };
 
  // ─────────────────────────────────────────────
  //  CHECKLISTS
  // ─────────────────────────────────────────────
  checklists: { [key: string]: any[] } = {
    firstvisit: [
      { id: 'ck-regn',    label: 'Patient registered / UHID assigned',  done: true,  group: 'Registration' },
      { id: 'ck-ref',     label: 'Referral reviewed & acknowledged',     done: true,  group: 'Registration' },
      { id: 'ck-cc',      label: 'Chief complaint recorded',             done: false, group: 'History',      req: true },
      { id: 'ck-hx',      label: 'History of present illness',           done: false, group: 'History',      req: true },
      { id: 'ck-pmhx',    label: 'Past medical / surgical history',      done: false, group: 'History',      req: true },
      { id: 'ck-fhx',     label: 'Family history documented',            done: false, group: 'History' },
      { id: 'ck-pe',      label: 'Physical examination done',            done: false, group: 'Examination',  req: true },
      { id: 'ck-ecog',    label: 'ECOG / KPS recorded',                  done: false, group: 'Examination',  req: true },
      { id: 'ck-sys',     label: 'Systemic examination done',            done: false, group: 'Examination',  req: true },
      { id: 'ck-inv',     label: 'Investigations ordered',               done: false, group: 'Workup',       req: true },
      { id: 'ck-prov',    label: 'Provisional diagnosis documented',     done: false, group: 'Workup',       req: true },
      { id: 'ck-counsel', label: 'Patient / family counselled',          done: false, group: 'Counselling' },
      { id: 'ck-fu',      label: 'Follow-up date given',                 done: false, group: 'Counselling',  req: true },
      { id: 'ck-sig-fv',  label: 'Physician sign-off on note',           done: false, group: 'Sign-off',     req: true }
    ],
    decision: [
      { id: 'ck-ecog-dv', label: 'ECOG re-assessed today',              done: false, group: 'Assessment',   req: true },
      { id: 'ck-inv-rev', label: 'All investigation reports reviewed',   done: true,  group: 'Review' },
      { id: 'ck-imaging', label: 'Imaging reviewed (CT/MRI)',            done: true,  group: 'Review' },
      { id: 'ck-histo',   label: 'Histopathology confirmed',             done: true,  group: 'Review' },
      { id: 'ck-staging', label: 'Staging documented (TNM/AJCC)',        done: false, group: 'Staging',      req: true },
      { id: 'ck-mdt',     label: 'MDT discussion completed',             done: false, group: 'MDT',          req: true },
      { id: 'ck-plan',    label: 'Treatment plan decided',               done: false, group: 'Plan',         req: true },
      { id: 'ck-counsel2',label: 'Treatment counselling given',          done: false, group: 'Plan',         req: true },
      { id: 'ck-consent', label: 'Written informed consent obtained',    done: false, group: 'Consent',      req: true },
      { id: 'ck-sched',   label: 'Treatment schedule communicated',      done: false, group: 'Scheduling',   req: true },
      { id: 'ck-fu2',     label: 'Next appointment confirmed',           done: false, group: 'Scheduling',   req: true }
    ],
    chemo: [
      { id: 'ck-ctx',     label: 'Context & prior cycle reviewed',       done: true,  group: 'Pre-Cycle' },
      { id: 'ck-allerg',  label: 'Allergy / drug interaction check',     done: false, group: 'Pre-Cycle',    req: true },
      { id: 'ck-consent', label: 'Cycle consent verified',               done: false, group: 'Pre-Cycle',    req: true },
      { id: 'ck-tox',     label: 'Prior toxicities reviewed',            done: false, group: 'Assessment',   req: true },
      { id: 'ck-labs',    label: 'CBC / LFT / RFT reviewed',             done: false, group: 'Assessment',   req: true },
      { id: 'ck-ecog',    label: 'ECOG / KPS recorded',                  done: false, group: 'Assessment',   req: true },
      { id: 'ck-bsa',     label: 'BSA & weight recorded',                done: false, group: 'Dose',         req: true },
      { id: 'ck-dose',    label: 'Dose sheet confirmed',                 done: false, group: 'Dose',         req: true },
      { id: 'ck-decision',label: 'Continue / Modify / Stop decision',   done: false, group: 'Decision',     req: true },
      { id: 'ck-disc',    label: 'Discharge advice given',               done: false, group: 'Discharge',    req: true },
      { id: 'ck-sig',     label: 'All 3-role signatures obtained',       done: false, group: 'Discharge',    req: true }
    ],
    rt: [
      { id: 'ck-ctx',     label: 'Patient identity & plan verified',     done: true,  group: 'Pre-Fraction' },
      { id: 'ck-frac',    label: 'Fraction count verified',              done: false, group: 'Treatment',    req: true },
      { id: 'ck-verif',   label: 'CBCT / Image verification done',       done: false, group: 'Treatment',    req: true },
      { id: 'ck-oar',     label: 'OAR constraints reviewed',             done: false, group: 'Treatment',    req: true },
      { id: 'ck-concurrent',label:'Concurrent chemo status reviewed',    done: false, group: 'Treatment',    req: true },
      { id: 'ck-acute',   label: 'Acute reactions assessed',             done: false, group: 'Assessment',   req: true },
      { id: 'ck-peer',    label: 'Peer review done',                     done: false, group: 'QA' },
      { id: 'ck-sig',     label: 'RO + MP + RTT signed',                 done: false, group: 'Sign-off',     req: true },
      { id: 'ck-advice',  label: 'Treatment advice given',               done: false, group: 'Sign-off' }
    ]
  };
 
  // ─────────────────────────────────────────────
  //  DROPDOWN OPTIONS
  // ─────────────────────────────────────────────
  ecogOptions = [
    { label: '0 — Fully active', value: '0' },
    { label: '1 — Restricted strenuous', value: '1' },
    { label: '2 — Ambulatory, unable to work', value: '2' },
    { label: '3 — Limited self-care', value: '3' },
    { label: '4 — Completely disabled', value: '4' }
  ];
 
  onsetOptions = [
    { label: 'Gradual', value: 'Gradual' },
    { label: 'Sudden', value: 'Sudden' },
    { label: 'Insidious', value: 'Insidious' }
  ];
 
  progressionOptions = [
    { label: 'Progressive', value: 'Progressive' },
    { label: 'Static', value: 'Static' },
    { label: 'Fluctuating', value: 'Fluctuating' }
  ];
 
  qaTypeOptions = [
    { label: 'Daily CBCT (completed)', value: 'cbct' },
    { label: 'Weekly film', value: 'film' },
    { label: 'Monthly port', value: 'port' }
  ];
 
  gradeOptions = [
    { label: 'G0', value: 'G0' }, { label: 'G1', value: 'G1' },
    { label: 'G2', value: 'G2' }, { label: 'G3', value: 'G3' }, { label: 'G4', value: 'G4' }
  ];
 
  attributionOptions = [
    { label: 'Unrelated', value: 'Unrelated' },
    { label: 'Possible', value: 'Possible' },
    { label: 'Probable', value: 'Probable' },
    { label: 'Definite', value: 'Definite' }
  ];
 
  routeOptions = [
    { label: 'PO', value: 'PO' }, { label: 'SC', value: 'SC' }, { label: 'IV', value: 'IV' }
  ];
 
  // ─────────────────────────────────────────────
  //  FORM MODEL — FIRST VISIT
  // ─────────────────────────────────────────────
  fvForm: any = {
    uhid: 'ONC-NEW-2025',
    regDate: '2025-01-11',
    regTime: '10:30',
    regType: 'New OPD',
    fullName: 'Suresh Nambiar',
    dob: '1963-03-14',
    sex: 'Male',
    contact: '+91 98765 43210',
    email: '',
    address: '',
    occupation: 'Retired government officer',
    // Chief Complaint
    chiefComplaint: 'Altered bowel habits, rectal bleeding × 3 months',
    ccDuration: '3 months',
    onset: 'Gradual',
    progression: 'Progressive',
    weightLoss: 'Yes — ~5 kg',
    appetite: 'Reduced',
    // HPI
    hpiText: 'Mr. Suresh Nambiar, 62-year-old male, presents with a 3-month history of altered bowel habits (alternating constipation and loose stools), fresh rectal bleeding (2–3 episodes/week), and feeling of incomplete evacuation. Reports significant weight loss ~5 kg over 3 months. No haematuria, no jaundice. Colonoscopy at referral hospital showed an annular growth at rectosigmoid junction; biopsy taken. Referred for oncology evaluation.',
    rectalBleeding: 'Present',
    abdominalPain: 'Absent',
    urgencyTenesmus: 'Present',
    // PMHx
    diabetes: 'Yes — T2DM',
    hypertension: 'Yes — on Rx',
    cad: 'No',
    priorMalignancy: 'No',
    priorChemoRT: 'No',
    priorSurgery: 'Appendicectomy 2008',
    currentMeds: 'Metformin 500mg BD, Telmisartan 40mg OD, Aspirin 75mg OD',
    allergies: 'NKDA',
    smokingAlcohol: 'Ex-smoker 10 pack-years; social alcohol',
    carcinogenExposure: 'None known',
    diet: 'Moderate',
    // Family Hx
    familyHxCancer: 'Yes',
    familyRelativeCancer: 'Father — Ca Rectum (dx age 65)',
    lynchScreen: 'Planned',
    // Vitals
    weight: 65.0,
    height: 170,
    bp: '142/88',
    pulse: 78,
    spo2: 98,
    temp: 98.4,
    ecog: '1',
    // Examination
    generalExam: 'Conscious, cooperative, mildly pale. No icterus/cyanosis/clubbing/lymphadenopathy.',
    abdomenExam: 'Soft, mild tenderness in left iliac fossa. No organomegaly. No free fluid.',
    dre: 'Irregular hard growth in anterior wall at 8 cm from anal verge. Not mobile. No blood on glove.',
    // Provisional Dx
    provisionalDx: 'Carcinoma Rectum (? Adenocarcinoma) awaiting biopsy',
    icd10Code: 'C20 — Malignant neoplasm of rectum',
    // Investigations ordered
    investigationsOrdered: 'CBC, LFT, RFT, CEA, CA 19-9\nMRI Rectum (pelvis)\nCECT Chest-Abdomen-Pelvis\nColonoscopy + biopsy (done, awaiting report)\nSurgery consultation',
    // Follow-up
    followUpDate: '2025-01-25',
    counsellingNote: 'Explained probable diagnosis. Awaiting biopsy. Family present. Patient anxious but cooperative. MDT referral planned after reports.',
    // Sign-off
    sigOncologist: false,
    sigOncologistTime: ''
  };
 
  // ─────────────────────────────────────────────
  //  FORM MODEL — CHEMO
  // ─────────────────────────────────────────────
  chemoForm: any = {
    // Vitals
    ecogToday: '1',
    weight: 68.2,
    height: 172,
    bsaCalc: '1.80',
    // Toxicities
    toxRows: [
      { toxicity: 'Neutropenia', grade: 'G3', attribution: 'Probable', action: 'G-CSF D5–8; 25% delay', notes: 'ANC nadir 0.6' },
      { toxicity: 'Nausea / Vomiting', grade: 'G2', attribution: 'Possible', action: 'Antiemetic escalated', notes: '' },
      { toxicity: 'Peripheral Neuropathy', grade: 'G1', attribution: 'Probable', action: 'Observation', notes: 'Tingling fingertips' }
    ],
    // Labs
    hb: '10.8', wbc: '3.2', plt: '180', anc: '1.4',
    creatinine: '1.0', bilirubin: '0.8', alt: '32', ast: '28',
    // Decision
    cycleDecision: 'Proceed',
    doseModification: '20% Oxaliplatin reduction (prior G3 neutropenia)',
    oxa: 85, lv: 400, fub: 400, fuInf: 2400,
    // Discharge advice
    dischargeAdvice: '1. Ondansetron 8mg PO TDS × 3 days\n2. Dexamethasone 4mg BD × 3 days\n3. Loratadine 10mg OD × 5 days\n4. G-CSF (Filgrastim) 300mcg SC D3–7 (prophylactic)\n5. Oral hydration — min 2L water daily\n6. Contact if fever >38°C, severe vomiting, new bruising',
    nextCycleDate: '2025-02-01',
    // Signatures
    roSigned: false, roTime: '',
    mpSigned: false, mpTime: '',
    rttSigned: false, rttTime: ''
  };
 
  // ─────────────────────────────────────────────
  //  FORM MODEL — RT
  // ─────────────────────────────────────────────
  rtForm: any = {
    ecogToday: '1',
    weight: 55.0,
    bp: '118/76',
    pulse: 82,
    // Image verification
    cbctPerformed: 'Yes',
    cbctShiftLat: '+1.2', cbctShiftLong: '+0.8', cbctShiftVert: '-0.5',
    cbctShiftAccepted: 'Yes',
    cbctNote: 'Bladder adequate. Small bowel displaced. Uterus in expected position.',
    // Acute reactions
    rtReactionRows: [
      { reaction: 'Dermatitis — pelvic skin', grade: 'G1', management: 'Aqueous cream BD', treatmentGap: 'No' },
      { reaction: 'Diarrhoea', grade: 'G1', management: 'Loperamide PRN, BRAT diet', treatmentGap: 'No' },
      { reaction: 'Fatigue', grade: 'G1', management: 'Rest, hydration, counselling', treatmentGap: 'No' }
    ],
    // Concurrent chemo
    cisplatinDue: 'No',
    cisplatinThisFraction: 'No',
    lastCisplatinDate: '2025-01-06',
    // QA
    qaType: 'cbct',
    qaResult: 'Pass',
    machineQaLog: 'EVH-2025-01-11-AM',
    peerReviewDone: 'Yes',
    peerReviewer: 'Dr. Ravi Pillai, RO',
    peerReviewOutcome: 'Plan approved',
    qaNotes: 'Peer review completed at Fraction 3. IMRT plan approved. CBCT shifts within tolerance.',
    // Advice
    adviceGiven: '1. Continue full bladder protocol — drink 500 mL water 30 min before each fraction\n2. Maintain good skin care — gentle moisturiser to pelvic area BD\n3. BRAT diet for loose motions — continue Loperamide PRN\n4. Avoid tight-fitting clothing over treatment area',
    emergencyContacts: 'RT Department helpline: Ext 5500 (Mon–Fri 8am–6pm)\nOn-call oncology: Ext 4000 (24hrs)',
    nextFractionDate: '2025-01-13',
    nextFractionTime: '10:00',
    // Sign-off
    fractionTime: '10:23',
    beamOnTime: 8.4,
    icdCode: 'C53.1 Ca Cervix | Z51.0 RT encounter',
    roSigned: false, roTime: '',
    mpSigned: false, mpTime: '',
    rttSigned: false, rttTime: ''
  };
 
  // ─────────────────────────────────────────────
  //  COMPUTED PROPERTIES
  // ─────────────────────────────────────────────
  get currentPatient(): any {
    return this.patients[this.currentScreen];
  }
 
  get currentChecklist(): any[] {
    return this.checklists[this.currentScreen] || [];
  }
 
  get checklistGroups(): string[] {
    const groups: string[] = [];
    this.currentChecklist.forEach(item => {
      if (!groups.includes(item.group)) groups.push(item.group);
    });
    return groups;
  }
 
  get completedCount(): number {
    return this.currentChecklist.filter(i => i.done).length;
  }
 
  get progressPercent(): number {
    const total = this.currentChecklist.length;
    return total > 0 ? Math.round((this.completedCount / total) * 100) : 0;
  }
 
  get patientInitials(): string {
    return this.currentPatient?.name?.split(' ').map((w: string) => w[0]).join('').slice(0, 2) || '--';
  }
 
  get weightDiff(): string {
    const p = this.patients.chemo;
    const diff = (p.weight - p.weightLast).toFixed(1);
    return (parseFloat(diff) > 0 ? '+' : '') + diff;
  }
 
  get weightDiffColor(): string {
    const diff = Math.abs(this.patients.chemo.weight - this.patients.chemo.weightLast);
    if (diff > 2) return 'danger';
    if (diff > 1) return 'warn';
    return 'ok';
  }
 
  get rtProgressPct(): number {
    const p = this.patients.rt;
    return Math.round((p.fractionCurrent / p.fractionTotal) * 100);
  }
 
  get rtCumulativeDose(): string {
    const p = this.patients.rt;
    return (p.fractionCurrent * p.fractionDose).toFixed(1);
  }
 
  get tabsForScreen(): any[] {
    const tabMap: any = {
      firstvisit: [
        { id: 'hist', label: 'History' },
        { id: 'exam', label: 'Examination' },
        { id: 'inv', label: 'Investigations' },
        { id: 'note', label: 'Clinical Note' }
      ],
      decision: [
        { id: 'results', label: 'Investigation Results' },
        { id: 'staging', label: 'Staging & MDT' },
        { id: 'plan', label: 'Treatment Plan' },
        { id: 'consent', label: 'Consent & Scheduling' }
      ],
      chemo: [
        { id: 'consult', label: 'Consultation' },
        { id: 'dose', label: 'Dose & Protocol' },
        { id: 'labs', label: 'Labs & Trends' },
        { id: 'disc', label: 'Discharge Advice' },
        { id: 'sig', label: 'Signatures' }
      ],
      rt: [
        { id: 'fraction', label: 'Fraction Visit' },
        { id: 'dose', label: 'Dose & OAR' },
        { id: 'concurrent', label: 'Concurrent Chemo' },
        { id: 'qasig', label: 'QA & Sign-off' }
      ]
    };
    return tabMap[this.currentScreen] || [];
  }
 
  get accentColor(): string {
    const colorMap: any = {
      firstvisit: 'indigo', decision: 'violet', chemo: 'amber', rt: 'teal'
    };
    return colorMap[this.currentScreen] || 'indigo';
  }
 
  itemsInGroup(group: string): any[] {
    return this.currentChecklist.filter(i => i.group === group);
  }
 
  // ─────────────────────────────────────────────
  //  ACTIONS
  // ─────────────────────────────────────────────
  constructor(private messageService: MessageService) {}
 
  ngOnInit(): void {
    this.switchScreen('firstvisit');
  }
 
  switchScreen(screen: string): void {
    this.currentScreen = screen;
    const firstTabMap: any = {
      firstvisit: 'hist', decision: 'results', chemo: 'consult', rt: 'fraction'
    };
    this.activeTab = firstTabMap[screen] || 'hist';
  }
 
  switchTab(tabId: string): void {
    this.activeTab = tabId;
  }
 
  isTabActive(tabId: string): boolean {
    return this.activeTab === tabId;
  }
 
  toggleSection(sectionId: string): void {
    this.collapsedSections[sectionId] = !this.collapsedSections[sectionId];
  }
 
  isSectionCollapsed(sectionId: string): boolean {
    return !!this.collapsedSections[sectionId];
  }
 
  markDone(ckId: string): void {
    const item = this.currentChecklist.find(i => i.id === ckId);
    if (item) item.done = true;
  }
 
  showToast(msg: string, severity: string = 'success'): void {
    this.messageService.add({ severity, summary: severity === 'success' ? 'Saved' : severity === 'warn' ? 'Warning' : 'Info', detail: msg, life: 3000 });
  }
 
  calcBSA(): void {
    const w = this.chemoForm.weight || 0;
    const h = this.chemoForm.height || 0;
    this.chemoForm.bsaCalc = Math.sqrt(h * w / 3600).toFixed(2);
    this.markDone('ck-bsa');
    this.updateDoses();
  }
 
  updateDoses(): void {
    const bsa = parseFloat(this.chemoForm.bsaCalc) || 1.80;
    this.chemoForm.oxa    = Math.round(bsa * 85);
    this.chemoForm.lv     = Math.round(bsa * 400);
    this.chemoForm.fub    = Math.round(bsa * 400);
    this.chemoForm.fuInf  = Math.round(bsa * 2400);
  }
 
  addToxRow(): void {
    this.chemoForm.toxRows.push({ toxicity: '', grade: 'G0', attribution: 'Possible', action: '', notes: '' });
  }
 
  removeToxRow(index: number): void {
    this.chemoForm.toxRows.splice(index, 1);
  }
 
  addRTReactionRow(): void {
    this.rtForm.rtReactionRows.push({ reaction: '', grade: 'G0', management: '', treatmentGap: 'No' });
  }
 
  signRole(role: 'ro' | 'mp' | 'rtt', formModel: any): void {
    const roleNames: any = { ro: 'Radiation Oncologist', mp: 'Medical Physicist', rtt: 'Radiation Therapist' };
    const now = new Date();
    const timeStr = now.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
      + ' ' + now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
    formModel[role + 'Signed'] = true;
    formModel[role + 'Time'] = timeStr;
    this.showToast(`${roleNames[role]} signature recorded`);
    if (formModel.roSigned && formModel.mpSigned && formModel.rttSigned) {
      this.markDone('ck-sig');
      this.showToast('All signatures obtained — ready to finalise');
    }
  }
 
  finalise(): void {
    const missing = this.currentChecklist.filter(i => i.req && !i.done);
    if (missing.length > 0) {
      this.validationErrors = missing.map(i => i.label);
      this.showValidationModal = true;
      return;
    }
    this.showToast('Consultation finalised and signed ✓');
  }
 
  assignUHID(): void {
    this.fvForm.uhid = 'ONC-2025-' + Math.floor(10000 + Math.random() * 90000);
    this.showToast('UHID assigned');
    this.markDone('ck-regn');
  }
 
  // Review of Systems data
  reviewSystems = [
    { sys: 'Constitutional', sx: 'Fever, chills, night sweats, fatigue', flag: 'amber', value: 'Abnormal' },
    { sys: 'Gastrointestinal', sx: 'Nausea, vomiting, bleeding, change in bowel', flag: 'red', value: 'Significant' },
    { sys: 'Genitourinary', sx: 'Haematuria, dysuria, nocturia', flag: 'green', value: 'Normal' },
    { sys: 'Respiratory', sx: 'Cough, dyspnoea, haemoptysis', flag: 'green', value: 'Normal' },
    { sys: 'Cardiovascular', sx: 'Chest pain, palpitations, oedema', flag: 'green', value: 'Normal' },
    { sys: 'Neurological', sx: 'Headache, weakness, numbness, seizure', flag: 'green', value: 'Normal' },
    { sys: 'Musculoskeletal', sx: 'Bone pain, joint swelling', flag: 'green', value: 'Normal' },
    { sys: 'Skin / Integument', sx: 'Jaundice, rash, lesions', flag: 'green', value: 'Normal' },
    { sys: 'Head, Eyes, ENT', sx: 'Hoarseness, dysphagia', flag: 'green', value: 'Normal' },
    { sys: 'Haematological', sx: 'Easy bruising, bleeding tendency', flag: 'amber', value: 'Abnormal' }
  ];
 
  setReviewSystem(item: any, val: string): void {
    item.value = val;
  }
 
  // Decision visit data
  decisionForm: any = {
    ecog: '1',
    tStage: 'T3', nStage: 'N2', mStage: 'M0', ajccStage: 'IIIC',
    histology: 'Moderately Differentiated Adenocarcinoma',
    grade: 'Grade 2 (Moderately Differentiated)',
    msiStatus: 'MSS (Microsatellite Stable)',
    rnciHer2: 'Not tested',
    mdtDate: '2025-01-10',
    mdtDecision: 'Neoadjuvant Chemoradiation → Surgery (LAR) → Adjuvant FOLFOX-6 × 6 cycles',
    treatmentIntent: 'Curative',
    counsellingDone: false,
    consentSigned: false,
    consentDate: '',
    treatmentStartDate: '2025-01-20',
    rtConsultDate: '2025-01-14',
    surgeryConsultDate: '2025-01-18',
    followUpDate: '2025-02-01',
    goalsOfCare: 'curative'
  };

}
