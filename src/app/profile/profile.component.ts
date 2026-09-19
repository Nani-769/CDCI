import { Component, OnInit } from '@angular/core';
// import { MessageService } from 'primeng/api';

// ─── Models ────────────────────────────────────────────────────────────────────

export interface Patient {
  id: string;
  umr: string;
  firstName: string;
  lastName: string;
  name: string;
  dob: string;
  gender: 'M' | 'F';
  age: string;
  phone: string;
  lastVisit: string;
  lastVisitType: string;
  cardIds: string[];
}

export interface InsuranceCard {
  id: string;
  patientId?: string;
  insurer: string;
  bin: string;
  group: string;
  member: string;
  holderName: string;
  dob: string;
  gender: string;
  effective: string;
  expiry: string;
  personCode: string;
  relCode: string;
}

export interface ServiceItem {
  uid: number;
  code: string;
  hsn: string;
  name: string;
  price: number;
  qty: number;
  disc: number;
  discPct: number;
  gstPct: number;
  batchId?: string;
}

export interface StagedCard {
  swipeId: string;
  insurer: string;
  bin: string;
  group: string;
  member: string;
  holderName: string;
  effective: string;
  expiry: string;
}

export interface ClaimAttempt {
  cardId: string;
  insurer: string;
  bin: string;
  member: string;
  requested: number;
  approved: number;
  status: 'approved' | 'rejected' | 'skipped';
  authNo: string | null;
  rejectCode: string | null;
  rejectMsg: string | null;
  batchId?: string;
  batchLabel?: string;
}

export interface ClaimBatch {
  id: string;
  label: string;
  serviceUids: number[];
  attempts: ClaimAttempt[];
  timestamp: string;
  requested: number;
  approved: number;
}

export interface EligibilityResult {
  status: 'ok' | 'warn';
  msg: string;
  benefit: number | null;
}

export interface PaymentAllocations {
  cash: number;
  card: number;
  cheque: number;
  upi: number;
  advance: number;
}

export interface Encounter {
  id: string;
  services: ServiceItem[];
  nextServiceUid: number;
  stagedCards: StagedCard[];
  eligibilityResults: { [swipeId: string]: EligibilityResult };
  eligibilityRun: boolean;
  claimBatches: ClaimBatch[];
  nextBatchNum: number;
  paymentAllocations: PaymentAllocations;
  insPanelCollapsed: boolean;
}

export type AppView = 'patient-search' | 'billing' | 'success';
export type SimMode = 'happy' | 'all-reject' | 'full-cover';
export type ModalType =
  | 'swipe-patient-lookup'
  | 'swipe-in-billing'
  | 'card-management'
  | 'eligibility-running'
  | 'cascade-preview'
  | 'claim-cascade'
  | 'payment-details'
  | 'cancel-confirm'
  | null;

export interface PatientType {
  label: string;
  value: string;
}

export interface SearchField {
  label: string;
  value: string;
}

// ─── Seed Data ──────────────────────────────────────────────────────────────────

const PATIENTS: Patient[] = [
  { id: 'P-00481', umr: 'CMSSMG24000481', firstName: 'Shaquill', lastName: 'Grant', name: 'Shaquill Grant', dob: '1993-06-21', gender: 'M', age: '32Y', phone: '876-555-0142', lastVisit: '2025-11-04', lastVisitType: 'OPD', cardIds: ['CRD-001'] },
  { id: 'P-00813', umr: 'CMSSMG22000813', firstName: 'Shaquill', lastName: 'Grant', name: 'Shaquill Grant', dob: '1993-06-21', gender: 'M', age: '32Y', phone: '876-555-0998', lastVisit: '2024-02-19', lastVisitType: 'IP discharge', cardIds: [] },
  { id: 'P-00642', umr: 'CMSSMG23000642', firstName: 'Lakku', lastName: 'Satesh', name: 'Lakku Satesh', dob: '1997-08-15', gender: 'M', age: '28Y', phone: '7330958016', lastVisit: '2026-01-15', lastVisitType: 'OPD', cardIds: ['CRD-004'] },
  { id: 'P-00759', umr: 'CMSSMG23000759', firstName: 'Priya', lastName: 'Sharma', name: 'Priya Sharma', dob: '1985-12-03', gender: 'F', age: '40Y', phone: '9876543210', lastVisit: '2025-10-22', lastVisitType: 'OPD', cardIds: [] },
  { id: 'P-00882', umr: 'CMSSMG24000882', firstName: 'Maria', lastName: 'Thompson', name: 'Maria Thompson', dob: '1988-03-14', gender: 'F', age: '37Y', phone: '876-555-0301', lastVisit: '2025-09-12', lastVisitType: 'OPD', cardIds: [] }
];

const CARDS_ON_FILE: { [id: string]: InsuranceCard } = {
  'CRD-001': { id: 'CRD-001', patientId: 'P-00481', insurer: 'Sagicor Life Jamaica', bin: 'GLL', group: '1115-03', member: '100617', holderName: 'SHAQUILL GRANT', dob: '1993-06-21', gender: 'M', effective: '2016-09-30', expiry: '2027-12-31', personCode: '003', relCode: '3' },
  'CRD-004': { id: 'CRD-004', patientId: 'P-00642', insurer: 'Star Health', bin: 'STR', group: '4401-01', member: '224155', holderName: 'LAKKU SATESH', dob: '1997-08-15', gender: 'M', effective: '2023-04-01', expiry: '2026-08-31', personCode: '001', relCode: '1' }
};

const SWIPE_DECK: InsuranceCard[] = [
  { id: 'SWIPE-A', insurer: 'Sagicor Life Jamaica', bin: 'GLL', group: '1115-03', member: '100617', holderName: 'SHAQUILL GRANT', dob: '1993-06-21', gender: 'M', effective: '2016-09-30', expiry: '2027-12-31', personCode: '003', relCode: '3' },
  { id: 'SWIPE-B', insurer: 'Guardian Life', bin: 'GRD', group: '2204-11', member: '559301', holderName: 'SHAQUILL GRANT', dob: '1993-06-21', gender: 'M', effective: '2020-01-01', expiry: '2027-08-31', personCode: '001', relCode: '1' },
  { id: 'SWIPE-C', insurer: 'CanopyHealth Jamaica', bin: 'CNP', group: '0871-02', member: '778145', holderName: 'SHAQUILL GRANT', dob: '1993-06-21', gender: 'M', effective: '2022-06-15', expiry: '2026-12-31', personCode: '001', relCode: '1' },
  { id: 'SWIPE-D', insurer: 'Guardian Life', bin: 'GRD', group: '2204-11', member: '771044', holderName: 'MARIA THOMPSON', dob: '1988-03-14', gender: 'F', effective: '2022-01-01', expiry: '2027-12-31', personCode: '001', relCode: '1' }
];

const SERVICES_CATALOG = [
  { code: '99213', hsn: '99931100', name: 'OPD Consultation — General Medicine', price: 6000 },
  { code: 'CBC', hsn: '99931400', name: 'Complete Blood Count (CBC)', price: 300 },
  { code: 'LFT', hsn: '99931400', name: 'Liver Function Test (LFT)', price: 800 },
  { code: 'KFT', hsn: '99931400', name: 'Kidney Function Test (KFT)', price: 750 },
  { code: 'HBA1C', hsn: '99931400', name: 'HbA1c — Glycated Hemoglobin', price: 600 },
  { code: 'XRAY', hsn: '99932100', name: 'X-Ray Chest PA View', price: 450 },
  { code: 'ECG', hsn: '99931700', name: 'ECG — 12 Lead', price: 350 },
  { code: 'USG', hsn: '99932100', name: 'Ultrasound Abdomen', price: 1200 },
  { code: 'TSH', hsn: '99931400', name: 'Thyroid Stimulating Hormone', price: 450 }
];

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  view: AppView = 'patient-search';
  simMode: SimMode = 'happy';
  showHelpBanner = true;

  searchTerm = '';
  selectedSearchField = 'UMR No';
  selectedPatientType = 'OP';
  matchedPatients: Patient[] = [];
  selectedPatient: Patient | null = null;

  patientTypeOptions: PatientType[] = [
    { label: 'OP', value: 'OP' },
    { label: 'IP', value: 'IP' }
  ];

  searchFieldOptions: SearchField[] = [
    { label: 'UMR No', value: 'UMR No' },
    { label: 'Name', value: 'Name' },
    { label: 'Phone', value: 'Phone' }
  ];

  quickSearchHints = ['shaquill', 'lakku', 'priya'];

  encounter: Encounter = this.makeBlankEncounter();

  doctorName = 'Sitya Sai';
  stockPoint = 'Main store';
  serviceSearchQuery = '';
  filteredServices: typeof SERVICES_CATALOG = [];
  activeTabIndex = 0;

  billingTabs = [
    'Invoices', 'Collect Due', 'Advance Management',
    'Cancellation', 'Pharmacy Returns', 'Refund Management',
    'My Shifts', 'Opening Balances'
  ];

  activeModal: ModalType = null;

  // Claim cascade modal state
  claimableScope: { uids: number[], amount: number, services: ServiceItem[] } = { uids: [], amount: 0, services: [] };
  cascadeIdx = 0;
  cascadeAttempts: ClaimAttempt[] = [];
  cascadeRemaining = 0;
  cascadeScopedAmount = 0;
  cascadeRunning = false;

  paymentAllocations: PaymentAllocations = { cash: 0, card: 0, cheque: 0, upi: 0, advance: 0 };
  eligibilityRunning = false;
  eligibilityIdx = 0;
  eligibilityResultsList: EligibilityResult[] = [];
  receipt: any = null;
  readonly swipeDeck = SWIPE_DECK;

  // constructor(private messageService: MessageService) {}

  ngOnInit(): void {}

  fmt(n: number): string {
    return Number(n).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  initials(name: string): string {
    return name.split(' ').map(p => p[0]).join('').slice(0, 2).toUpperCase();
  }

  makeBlankEncounter(): Encounter {
    return {
      id: 'ENC-' + Date.now().toString().slice(-6),
      services: [],
      nextServiceUid: 1,
      stagedCards: [],
      eligibilityResults: {},
      eligibilityRun: false,
      claimBatches: [],
      nextBatchNum: 1,
      paymentAllocations: { cash: 0, card: 0, cheque: 0, upi: 0, advance: 0 },
      insPanelCollapsed: false
    };
  }

  // Toast state for inline feedback (replaces PrimeNG MessageService while it's commented out)
  private _toastQueue: Array<{severity: string; summary: string; detail: string}> = [];

  toast(severity: string, summary: string, detail: string): void {
    // Uncomment the line below when MessageService is injected:
    // this.messageService.add({ severity, summary, detail, life: 4000 });
    console.log(`[${severity.toUpperCase()}] ${summary}: ${detail}`);
  }

  onSearchInput(): void {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) {
      this.matchedPatients = [];
      return;
    }
    this.matchedPatients = PATIENTS.filter(p =>
      p.name.toLowerCase().includes(term) ||
      p.umr.toLowerCase().includes(term) ||
      (p.phone && p.phone.includes(term))
    );
  }

  applyHint(term: string): void {
    this.searchTerm = term;
    this.onSearchInput();
  }

  selectPatient(patient: Patient, autoSwipedCardId?: string): void {
    this.selectedPatient = patient;
    if (autoSwipedCardId) {
      const cardData = SWIPE_DECK.find(c => c.id === autoSwipedCardId);
      if (cardData && !this.encounter.stagedCards.find(c => c.swipeId === autoSwipedCardId)) {
        this.encounter.stagedCards.push({
          swipeId: cardData.id!, insurer: cardData.insurer, bin: cardData.bin,
          group: cardData.group, member: cardData.member, holderName: cardData.holderName,
          effective: cardData.effective, expiry: cardData.expiry
        });
      }
    }
    this.view = 'billing';
    this.toast('success', 'Patient Selected', patient.name);
  }

  onServiceSearch(event: any): void {
    const q = event.query?.toLowerCase() || '';
    this.filteredServices = SERVICES_CATALOG.filter(s =>
      s.name.toLowerCase().includes(q) || s.code.toLowerCase().includes(q)
    );
  }
  applyAdvance = false;
  readonly advanceBalance = 1600;

  onAdvanceToggle(apply: boolean): void {
    if (apply) {
      this.paymentAllocations.advance = Math.min(this.advanceBalance, this.patientPayable);
    } else {
      this.paymentAllocations.advance = 0;
    }
  }

  // { code: string; hsn: string; name: string; price: number }
  // { code: string; hsn: string; name: string; price: number }
  addService(svc:any ) {
    const existing = this.encounter.services.find(s => s.code === svc.code && !this.getServiceBatch(s.uid));
    if (existing) {
      existing.qty++;
      this.toast('info', 'Quantity Updated', `${svc.name} qty → ${existing.qty}`);
    } else {
      this.encounter.services.push({
        uid: this.encounter.nextServiceUid++,
        code: svc.code,
        hsn: svc.hsn,
        name: svc.name,
        price: svc.price,
        qty: 1,
        disc: 0,
        discPct: 0,
        gstPct: 0
      });
      if (this.hasSettledBatch) {
        this.toast('success', 'New item added', `${svc.name} — submit a new claim to adjudicate it`);
      } else {
        this.toast('success', 'Service Added', svc.name);
      }
    }
    this.serviceSearchQuery = '';
  }

  removeService(uid: number): void {
    const batch = this.getServiceBatch(uid);
    if (batch) {
       this.toast('warning', 'Cannot remove', `Service was paid in ${batch.label}. Use "Reverse & Cancel" first.`);
       return;
    }
    this.encounter.services = this.encounter.services.filter(s => s.uid !== uid);
  }

  serviceTotal(svc: ServiceItem): number {
    return svc.price * svc.qty;
  }

  discAmount(svc: ServiceItem): number {
    if (svc.discPct > 0) return svc.price * svc.qty * svc.discPct / 100;
    return svc.disc || 0;
  }

  taxAmount(svc: ServiceItem): number {
    const base = svc.price * svc.qty - this.discAmount(svc);
    return base * (svc.gstPct || 0) / 100;
  }

  netAmount(svc: ServiceItem): number {
    return svc.price * svc.qty - this.discAmount(svc) + this.taxAmount(svc);
  }

  get billTotal(): number {
    return this.encounter.services.reduce((s, x) => s + x.price * x.qty, 0);
  }

  get insuranceCovered(): number {
    return this.encounter.claimBatches.reduce((s, b) =>
      s + b.attempts.filter(a => a.status === 'approved').reduce((ss, a) => ss + a.approved, 0), 0);
  }

  get patientPayable(): number {
    return Math.max(0, this.billTotal - this.insuranceCovered);
  }

  get hasSettledBatch(): boolean {
    return this.encounter.claimBatches.length > 0;
  }

  get unadjudicatedServices(): ServiceItem[] {
    return this.encounter.services.filter(s => !this.getServiceBatch(s.uid));
  }

  get unadjudicatedTotal(): number {
    return this.unadjudicatedServices.reduce((s, x) => s + x.price * x.qty, 0);
  }

  get allClaimAttempts(): ClaimAttempt[] {
    return this.encounter.claimBatches.flatMap(b =>
      b.attempts.map(a => ({ ...a, batchId: b.id, batchLabel: b.label }))
    );
  }

  get allocatedTotal(): number {
    const p = this.paymentAllocations;
    return p.cash + p.card + p.cheque + p.upi + p.advance;
  }

  get balanceDue(): number {
    return Math.max(0, this.patientPayable - this.allocatedTotal);
  }

  getServiceBatch(uid: number): ClaimBatch | null {
    return this.encounter.claimBatches.find(b => b.serviceUids.includes(uid)) || null;
  }
  swipeLookupMode: 'armed' | 'parsed' = 'armed';
  parsedCardData: InsuranceCard | null = null;
  selectedMatchId: string | null = null;
get matchedPatientsFromSwipe(): Patient[] {
    if (!this.parsedCardData) return [];
    const parts = this.parsedCardData.holderName.split(' ');
    const first = parts[0]?.toLowerCase() || '';
    const last = parts[1]?.toLowerCase() || '';
    
    return PATIENTS.filter(p =>
      p.firstName.toLowerCase() === first &&
      p.lastName.toLowerCase() === last &&
      p.dob === this.parsedCardData!.dob &&
      p.gender === this.parsedCardData!.gender
    );
  }

  simulateSwipeFromLookup(card: InsuranceCard): void {
    this.parsedCardData = card;
    this.swipeLookupMode = 'parsed';
    const matches = this.matchedPatientsFromSwipe;
    this.selectedMatchId = matches.length > 0 ? matches[0].id : null;
  }

  resetSwipeLookup(): void {
    this.swipeLookupMode = 'armed';
    this.parsedCardData = null;
    this.selectedMatchId = null;
  }

  confirmPatientFromSwipe(): void {
    if (!this.selectedMatchId || !this.parsedCardData) return;
    const pid = this.selectedMatchId;
    const swipeId = this.parsedCardData.id;
    // Reset swipe modal state BEFORE closing so next open starts fresh
    this.swipeLookupMode = 'armed';
    this.parsedCardData = null;
    this.selectedMatchId = null;
    this.closeModal();
    const patient = PATIENTS.find(p => p.id === pid);
    if (patient) {
      this.selectPatient(patient, swipeId);
    }
  }
  getServiceAdjudicationDetails(svc: ServiceItem): { total: number; ratio: number; batch: ClaimBatch | null; tooltipAttempts: any[] } {
    const batch = this.getServiceBatch(svc.uid);
    if (!batch) return { total: 0, ratio: 0, batch: null, tooltipAttempts: [] };

    const batchServices = this.encounter.services.filter(x => batch.serviceUids.includes(x.uid));
    const batchSvcTotal = batchServices.reduce((a, x) => a + x.price * x.qty, 0);
    const rowTotal = svc.price * svc.qty;
    const ratio = batchSvcTotal > 0 ? rowTotal / batchSvcTotal : 0;
    
    const approved = batch.attempts.filter(a => a.status === 'approved').reduce((a, x) => a + x.approved, 0);
    const totalForItem = Math.round(approved * ratio * 100) / 100;

    const tooltipAttempts = batch.attempts.map(a => {
      const itemShare = a.status === 'approved' ? Math.round(a.approved * ratio * 100) / 100 : 0;
      return {
        ...a,
        itemShare
      };
    });

    return { total: totalForItem, ratio, batch, tooltipAttempts };
  }

  toggleInsPanel(): void {
    this.encounter.insPanelCollapsed = !this.encounter.insPanelCollapsed;
  }

  useCardsOnFile(): void {
    if (!this.selectedPatient) return;
    this.selectedPatient.cardIds.forEach(cid => {
      const card = CARDS_ON_FILE[cid];
      if (card && !this.encounter.stagedCards.find(c => c.swipeId === cid)) {
        this.encounter.stagedCards.push({
          swipeId: card.id, insurer: card.insurer, bin: card.bin,
          group: card.group, member: card.member, holderName: card.holderName,
          effective: card.effective, expiry: card.expiry
        });
      }
    });
    this.toast('success', 'Cards Added', 'Cards on file loaded for this encounter');
  }

  swipeCard(cardData: InsuranceCard): void {
    if (this.encounter.stagedCards.find(c => c.swipeId === cardData.id)) {
      this.toast('warning', 'Already Staged', `${cardData.insurer} is already in the queue`);
      return;
    }
    this.encounter.stagedCards.push({
      swipeId: cardData.id!, insurer: cardData.insurer, bin: cardData.bin,
      group: cardData.group, member: cardData.member, holderName: cardData.holderName,
      effective: cardData.effective, expiry: cardData.expiry
    });
    
    this.encounter.eligibilityRun = false;
    this.encounter.eligibilityResults = {};
    
    this.closeModal();
    
    if (this.hasSettledBatch && this.unadjudicatedTotal > 0) {
      this.toast('success', 'Card Added', `${cardData.insurer} — use "Claim New Items" to submit`);
    } else if (this.hasSettledBatch) {
      this.toast('success', 'Card Added', `${cardData.insurer} — available for future claims`);
    } else {
      this.toast('success', 'Card staged', `${cardData.insurer} added`);
    }
  }

  removeCard(idx: number): void {
    this.encounter.stagedCards.splice(idx, 1);
    this.encounter.eligibilityRun = false;
    this.encounter.eligibilityResults = {};
  }

  moveCard(idx: number, dir: -1 | 1): void {
    const arr = this.encounter.stagedCards;
    const newIdx = idx + dir;
    if (newIdx < 0 || newIdx >= arr.length) return;
    [arr[idx], arr[newIdx]] = [arr[newIdx], arr[idx]];
  }

  runEligibility(): void {
    this.eligibilityRunning = true;
    this.eligibilityIdx = 0;
    this.eligibilityResultsList = [];
    this.openModal('eligibility-running');
    this.processNextEligibility();
  }

  rerunEligibility(): void {
    this.encounter.eligibilityRun = false;
    this.encounter.eligibilityResults = {};
    this.runEligibility();
  }

  private processNextEligibility(): void {
    const cards = this.encounter.stagedCards;
    if (this.eligibilityIdx >= cards.length) {
      cards.forEach((c, i) => {
        this.encounter.eligibilityResults[c.swipeId] = this.eligibilityResultsList[i];
      });
      this.encounter.eligibilityRun = true;
      this.eligibilityRunning = false;
      this.toast('success', 'Eligibility done', `${cards.length} card${cards.length > 1 ? 's' : ''} verified`);
      return;
    }
    const card = cards[this.eligibilityIdx];
    setTimeout(() => {
      const result = this.simulateEligibility(card);
      this.eligibilityResultsList.push(result);
      this.eligibilityIdx++;
      this.processNextEligibility();
    }, 700 + Math.random() * 400);
  }

  private simulateEligibility(card: StagedCard): EligibilityResult {
    if (card.insurer === 'CanopyHealth Jamaica') return { status: 'warn', msg: 'Active but plan limit near exhaustion', benefit: null };
    if (card.insurer === 'Sagicor Life Jamaica') return { status: 'ok', msg: 'Coverage active · Remaining annual benefit: ₹ 45,200', benefit: 45200 };
    if (card.insurer === 'Guardian Life') return { status: 'ok', msg: 'Coverage active · Secondary coordination allowed', benefit: null };
    return { status: 'ok', msg: 'Coverage active · Member verified', benefit: null };
  }

  getClaimableScope() {
    const services = this.unadjudicatedServices;
    const uids = services.map(s => s.uid);
    const amount = services.reduce((s, x) => s + x.price * x.qty, 0);
    return { uids, amount, services };
  }

  openCascadePreview(): void {
    this.claimableScope = this.getClaimableScope();
    this.openModal('cascade-preview');
  }

  runDirectClaimFromStaged(): void {
    if (this.billTotal === 0) { this.toast('warning', 'No services', 'Add services before submitting a claim.'); return; }
    const scope = this.getClaimableScope();
    if (scope.amount <= 0) { this.toast('warning', 'Nothing to claim', 'All services already adjudicated.'); return; }
    this.runClaimCascade(scope);
  }

  runDirectClaim(): void {
    const scope = this.getClaimableScope();
    if (scope.amount <= 0) { this.toast('warning', 'Nothing to claim', 'All services already adjudicated.'); return; }
    this.runClaimCascade(scope);
  }

  runNewItemsClaim(): void {
    const scope = this.getClaimableScope();
    if (scope.amount <= 0) { this.toast('warning', 'Nothing to claim', 'No new items pending.'); return; }
    this.runClaimCascade(scope);
  }

  private runClaimCascade(scope: any): void {
    this.cascadeIdx = 0;
    this.cascadeAttempts = [];
    this.cascadeScopedAmount = scope.amount;
    this.cascadeRemaining = scope.amount;
    this.claimableScope = scope;
    this.cascadeRunning = true;
    this.openModal('claim-cascade');
    this.processNextClaim();
  }

  private processNextClaim(): void {
    const cards = this.encounter.stagedCards;
    const idx = this.cascadeIdx;

    if (idx >= cards.length) {
      const batchNum = this.encounter.nextBatchNum++;
      const batch: ClaimBatch = {
        id: 'BATCH-' + batchNum,
        label: 'Batch ' + batchNum,
        serviceUids: [...this.claimableScope.uids],
        attempts: [...this.cascadeAttempts],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        requested: this.cascadeScopedAmount,
        approved: this.cascadeAttempts.filter(a => a.status === 'approved').reduce((s, a) => s + a.approved, 0)
      };
      this.encounter.claimBatches.push(batch);

      setTimeout(() => {
        this.cascadeRunning = false;
        const rem = this.patientPayable;
        if (rem === 0) this.toast('success', `${batch.label} settled`, 'Insurance covered the full bill');
        else this.toast('success', `${batch.label} settled`, `Insurance ₹ ${this.fmt(batch.approved)} · ₹ ${this.fmt(rem)} co-pay`);
        if (rem > 0) this.paymentAllocations.cash = rem;
      }, 800);
      return;
    }

    const card = cards[idx];
    const requested = this.cascadeRemaining;
    if (requested <= 0) {
      this.cascadeAttempts.push({ cardId: card.swipeId, insurer: card.insurer, bin: card.bin, member: card.member, requested: 0, approved: 0, status: 'skipped', authNo: null, rejectCode: null, rejectMsg: 'Balance already covered' });
      this.cascadeIdx++;
      this.processNextClaim();
      return;
    }

    setTimeout(() => {
      const result = this.simulateClaim(card, requested);
      this.cascadeAttempts.push({
        cardId: card.swipeId, insurer: card.insurer, bin: card.bin, member: card.member,
        requested, approved: result.approved, status: result.status,
        authNo: result.authNo, rejectCode: result.rejectCode, rejectMsg: result.rejectMsg
      });
      this.cascadeRemaining = Math.max(0, requested - result.approved);
      this.cascadeIdx++;
      this.processNextClaim();
    }, 1000 + Math.random() * 500);
  }

  private simulateClaim(card: StagedCard, requested: number): { status: 'approved' | 'rejected'; approved: number; authNo: string | null; rejectCode: string | null; rejectMsg: string | null } {
    if (this.simMode === 'all-reject') return { status: 'rejected', approved: 0, authNo: null, rejectCode: '65', rejectMsg: 'Patient Not Covered' };
    if (this.simMode === 'full-cover') return { status: 'approved', approved: requested, authNo: 'AUTH-FULL-' + Math.floor(10000 + Math.random() * 89999), rejectCode: null, rejectMsg: null };
    if (card.bin === 'GLL') return { status: 'approved', approved: Math.min(requested, 3000), authNo: 'AUTH-7K2X-' + Math.floor(10000 + Math.random() * 89999), rejectCode: null, rejectMsg: null };
    if (card.bin === 'GRD') return { status: 'approved', approved: Math.min(requested, 1000), authNo: 'AUTH-G55-' + Math.floor(10000 + Math.random() * 89999), rejectCode: null, rejectMsg: null };
    if (card.bin === 'CNP') return { status: 'rejected', approved: 0, authNo: null, rejectCode: '76', rejectMsg: 'Plan Limit Exceeded' };
    return { status: 'approved', approved: Math.min(requested, Math.floor(requested / 2)), authNo: 'AUTH-GEN-' + Math.floor(10000 + Math.random() * 89999), rejectCode: null, rejectMsg: null };
  }

  openPaymentDetails(): void {
    this.paymentAllocations = { ...this.encounter.paymentAllocations };
    this.openModal('payment-details');
  }

  completeBill(): void {
    this.receipt = {
      receiptNo: 'RCT-' + Date.now().toString().slice(-8),
      patient: this.selectedPatient?.name,
      encounterId: this.encounter.id,
      services: [...this.encounter.services],
      total: this.billTotal,
      insuranceCovered: this.insuranceCovered,
      patientPayable: this.patientPayable,
      allocations: { ...this.paymentAllocations },
      claimAttempts: this.allClaimAttempts,
      batches: this.encounter.claimBatches.map(b => ({ ...b })),
      timestamp: new Date().toLocaleString()
    };
    this.encounter.paymentAllocations = { ...this.paymentAllocations };
    this.closeModal();
    this.view = 'success';
    this.toast('success', 'Bill Paid', 'Receipt generated');
  }

  doCancel(): void {
    this.toast('success', 'Reversed', 'All claims reversed. Bill cancelled.');
    setTimeout(() => this.resetApp(), 800);
  }

  setSimMode(mode: SimMode): void {
    this.simMode = mode;
    this.toast('info', 'Simulation', 'Mode: ' + mode);
  }

  openModal(modal: ModalType): void {
    this.activeModal = modal;
  }

  closeModal(): void {
    // Reset swipe lookup state when closing that modal so it always opens fresh
    if (this.activeModal === 'swipe-patient-lookup') {
      this.swipeLookupMode = 'armed';
      this.parsedCardData = null;
      this.selectedMatchId = null;
    }
    this.activeModal = null;
  }

  resetApp(): void {
    this.view = 'patient-search';
    this.searchTerm = '';
    this.matchedPatients = [];
    this.selectedPatient = null;
    this.encounter = this.makeBlankEncounter();
    this.cascadeIdx = 0;
    this.cascadeAttempts = [];
    this.cascadeRemaining = 0;
    this.cascadeRunning = false;
    this.paymentAllocations = { cash: 0, card: 0, cheque: 0, upi: 0, advance: 0 };
    this.activeModal = null;
    this.receipt = null;
    this.eligibilityRunning = false;
    this.eligibilityResultsList = [];
    this.toast('info', 'Reset', 'Application reset');
  }

  get cascadeAllDone(): boolean {
    return this.cascadeIdx >= this.encounter.stagedCards.length && !this.cascadeRunning;
  }

  get approvedAttemptCount(): number {
    return this.allClaimAttempts.filter(a => a.status === 'approved').length;
  }

  get rejectedAttemptCount(): number {
    return this.allClaimAttempts.filter(a => a.status === 'rejected').length;
  }

  get cascadeApprovedCount(): number {
    return this.cascadeAttempts.filter(a => a.status === 'approved').length;
  }

  onFileCards(): InsuranceCard[] {
    if (!this.selectedPatient) return [];
    return this.selectedPatient.cardIds.map(id => CARDS_ON_FILE[id]).filter(Boolean);
  }

  getRemainingAfter(index: number): number {
    let runningRemaining = this.cascadeScopedAmount;
    for (let i = 0; i <= index; i++) {
        if (this.cascadeAttempts[i]) {
            runningRemaining = Math.max(0, runningRemaining - (this.cascadeAttempts[i].approved || 0));
        }
    }
    return runningRemaining;
  }
stageSwipedCard(card: InsuranceCard): void {
    this.swipeCard(card);
  }
  trackByUid(index: number, svc: ServiceItem): number { return svc.uid; }
  trackBySwipeId(index: number, c: StagedCard): string { return c.swipeId; }
  trackByBatchId(index: number, b: ClaimBatch): string { return b.id; }
}