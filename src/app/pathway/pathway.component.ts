import { Component, OnInit } from '@angular/core';
 
@Component({
  selector: 'app-pathway',
  templateUrl: './pathway.component.html',
  styleUrls: ['./pathway.component.css']
})
export class PathwayComponent implements OnInit {


  /* ══════════════════════════════════════
     PATIENT DATA
  ══════════════════════════════════════ */
  patient = {
    name: 'Amelia Patel',
    initials: 'AP',
    diagnosis: 'IDC Breast · Grade 3',
    stage: 'IIB · T2N1M0',
    receptors: 'ER+ · HER2 3+ · PR−',
    ecog: '1'
  };
 
  /* ══════════════════════════════════════
     MODALITIES MASTER LIST
  ══════════════════════════════════════ */
  modalities = [
    { id: 'neo-chemo',  label: 'Neoadjuvant Chemo',  sub: 'Pre-surgical systemic therapy',  color: '#0d9488', bg: '#f0fdfa' },
    { id: 'surgery',    label: 'Surgery',             sub: 'Resection / BCS / Mastectomy',   color: '#c2410c', bg: '#fff7ed' },
    { id: 'adj-chemo',  label: 'Adjuvant Chemo',      sub: 'Post-surgical systemic therapy', color: '#065048', bg: '#f0fdfa' },
    { id: 'adj-her2',   label: 'HER2 Therapy',        sub: 'Trastuzumab / Pertuzumab',       color: '#2563eb', bg: '#eff6ff' },
    { id: 'radiation',  label: 'Radiation Therapy',   sub: 'Adjuvant / Definitive RT',       color: '#7c3aed', bg: '#f5f3ff' },
    { id: 'hormonal',   label: 'Hormonal Therapy',    sub: 'Letrozole / Tamoxifen / AI',     color: '#d97706', bg: '#fffbeb' },
    { id: 'immuno',     label: 'Immunotherapy',       sub: 'Checkpoint inhibitors',          color: '#2563eb', bg: '#eff6ff' },
    { id: 'targeted',   label: 'Targeted Therapy',    sub: 'Small molecule / mAb',           color: '#15803d', bg: '#f0fdf4' },
    { id: 'pallia',     label: 'Palliative Care',     sub: 'Symptom / comfort care',         color: '#6b7280', bg: '#f9fafb' },
    { id: 'pain',       label: 'Pain Management',     sub: 'Opioid / non-opioid plan',       color: '#be123c', bg: '#fff1f2' },
    { id: 'clinical',   label: 'Clinical Trial',      sub: 'Experimental / IRB approved',    color: '#9333ea', bg: '#f5f3ff' },
    { id: 'supportive', label: 'Supportive Care',     sub: 'Nutritional / psychological',    color: '#0891b2', bg: '#f0f9ff' }
  ];
 
  /* ══════════════════════════════════════
     TEMPLATES DATA
  ══════════════════════════════════════ */
  templates = [
    {
      id: 'breast-her2-iib', cancer: 'Breast Cancer', popular: true,
      title: 'HER2+ Stage IIB — Curative',
      nccn: 'Breast v4.2024 Cat 1',
      modalities: ['neo-chemo','surgery','adj-chemo','adj-her2','radiation','hormonal'],
      phases: [
        { mod: 'neo-chemo', seq: 1, detail: 'AC-T × 8 cycles q3w',            constraint: 'HTN → no dose escalation',            conc: false, userNote: '' },
        { mod: 'surgery',   seq: 2, detail: 'BCS + SLNB · elective',           constraint: 'pCR criteria for SLNB',               conc: false, userNote: '' },
        { mod: 'adj-chemo', seq: 3, detail: 'AC-TH × 12 cycles q3w',          constraint: 'LVEF echo q3 cycles mandatory',        conc: false, userNote: '' },
        { mod: 'adj-her2',  seq: 3, detail: 'Trastuzumab 6mg/kg q3w',         constraint: 'Stop if LVEF <50% or ↓15%',           conc: true,  userNote: '' },
        { mod: 'radiation', seq: 4, detail: 'IMRT 25fx · 50 Gy · post-BCS',   constraint: 'Cardiac dose constraints',            conc: false, userNote: '' },
        { mod: 'hormonal',  seq: 5, detail: 'Letrozole 2.5mg/d · 5yr',        constraint: 'Goserelin ovarian suppression',       conc: true,  userNote: '' }
      ]
    },
    {
      id: 'breast-tnbc-iii', cancer: 'Breast Cancer', popular: false,
      title: 'TNBC Stage III — Curative',
      nccn: 'Breast v4.2024 Cat 2A',
      modalities: ['neo-chemo','surgery','adj-chemo','radiation'],
      phases: [
        { mod: 'neo-chemo', seq: 1, detail: 'ddAC × 4 → Paclitaxel+Carbo × 4', constraint: 'G-CSF mandatory · ANC monitoring',    conc: false, userNote: '' },
        { mod: 'surgery',   seq: 2, detail: 'MRM or BCS based on response',     constraint: 'pCR determines RT field',            conc: false, userNote: '' },
        { mod: 'adj-chemo', seq: 3, detail: 'Capecitabine × 8 if no pCR',       constraint: 'Monitor hand-foot syndrome',         conc: false, userNote: '' },
        { mod: 'radiation', seq: 4, detail: 'PMRT 25fx 50Gy + boost',           constraint: 'Lung dose constraints V20 <35%',     conc: false, userNote: '' }
      ]
    },
    {
      id: 'breast-er-luminal', cancer: 'Breast Cancer', popular: false,
      title: 'Luminal A Stage I-II — Hormonal only',
      nccn: 'Breast v4.2024',
      modalities: ['surgery','radiation','hormonal'],
      phases: [
        { mod: 'surgery',   seq: 1, detail: 'BCS + SLNB',                          constraint: 'Margin assessment required',         conc: false, userNote: '' },
        { mod: 'radiation', seq: 2, detail: 'WBI 15fx 40Gy (hypofractionated)',     constraint: 'Standard post-BCS',                 conc: false, userNote: '' },
        { mod: 'hormonal',  seq: 3, detail: 'Tamoxifen or AI · 5–10yr',            constraint: 'Menopause status drives choice',     conc: false, userNote: '' }
      ]
    },
    {
      id: 'crc-stage-iii', cancer: 'Colorectal Cancer', popular: true,
      title: 'CRC Stage III — Adjuvant FOLFOX',
      nccn: 'CRC v3.2024 Cat 1',
      modalities: ['surgery','adj-chemo'],
      phases: [
        { mod: 'surgery',   seq: 1, detail: 'Curative resection + lymph node harvest', constraint: '≥12 nodes required',            conc: false, userNote: '' },
        { mod: 'adj-chemo', seq: 2, detail: 'FOLFOX × 12 cycles q2w',                 constraint: 'Neuropathy monitoring · stop if Gr3', conc: false, userNote: '' }
      ]
    },
    {
      id: 'crc-rectal', cancer: 'Colorectal Cancer', popular: false,
      title: 'Rectal Cancer — Neoadjuvant CRT',
      nccn: 'CRC v3.2024',
      modalities: ['neo-chemo','radiation','surgery','adj-chemo'],
      phases: [
        { mod: 'neo-chemo', seq: 1, detail: 'Capecitabine concurrent with RT',     constraint: 'Renal function monitoring',        conc: true,  userNote: '' },
        { mod: 'radiation', seq: 1, detail: 'Long course CRT 25fx 45Gy + boost',   constraint: 'Bowel dose constraints',           conc: true,  userNote: '' },
        { mod: 'surgery',   seq: 2, detail: 'TME · 8wk post-CRT',                  constraint: 'MRI restaging before surgery',     conc: false, userNote: '' },
        { mod: 'adj-chemo', seq: 3, detail: 'FOLFOX × 8 cycles',                   constraint: 'Start within 12wk of surgery',     conc: false, userNote: '' }
      ]
    },
    {
      id: 'lung-nsclc-stage3', cancer: 'Lung Cancer', popular: false,
      title: 'NSCLC Stage III — Concurrent CRT',
      nccn: 'NSCLC v5.2024 Cat 1',
      modalities: ['neo-chemo','radiation','immuno'],
      phases: [
        { mod: 'neo-chemo', seq: 1, detail: 'Carboplatin + Paclitaxel concurrent',    constraint: 'PS ≤1 required',                  conc: true,  userNote: '' },
        { mod: 'radiation', seq: 1, detail: '60 Gy in 30fx · concurrent',             constraint: 'V20 <35% · mean lung dose <20Gy', conc: true,  userNote: '' },
        { mod: 'immuno',    seq: 2, detail: 'Durvalumab 10mg/kg q2w × 12mo',          constraint: 'PD-L1 ≥1% preferred · ILD monitoring', conc: false, userNote: '' }
      ]
    },
    {
      id: 'lymphoma-dlbcl', cancer: 'Lymphoma', popular: false,
      title: 'DLBCL — R-CHOP × 6',
      nccn: 'DLBCL v2.2024 Cat 1',
      modalities: ['adj-chemo'],
      phases: [
        { mod: 'adj-chemo', seq: 1, detail: 'R-CHOP × 6 cycles q21d', constraint: 'LVEF ≥50% before anthracycline · Hepatitis B screen', conc: false, userNote: '' }
      ]
    },
    {
      id: 'palliative-solid', cancer: 'Palliative', popular: false,
      title: 'Palliative — Best Supportive Care',
      nccn: 'Supportive Care v1.2024',
      modalities: ['pallia','pain','supportive'],
      phases: [
        { mod: 'pallia',    seq: 1, detail: 'Goals of care · family counselling', constraint: 'ECOG 3-4 · no curative intent',  conc: false, userNote: '' },
        { mod: 'pain',      seq: 1, detail: 'WHO ladder · opioid titration',      constraint: 'Renal dosing adjustment',        conc: true,  userNote: '' },
        { mod: 'supportive',seq: 1, detail: 'Nutrition · psychology · physio',    constraint: 'QoL tracking q4wk',              conc: true,  userNote: '' }
      ]
    }
  ];
 
  /* ══════════════════════════════════════
     AI ROWS DATA
  ══════════════════════════════════════ */
  aiRows = [
    { mod: 'neo-chemo', detail: 'AC-T × 8 cycles',      data: 'Stage IIB, Grade 3, HER2+, Ki67 42%', nccn: 'NCCN Breast 1.A', constraint: 'HTN → no dose escalation',   ctype: 'cp-amber',   selected: true },
    { mod: 'surgery',   detail: 'BCS + SLNB',            data: 'T2 tumour · patient preference BCS',  nccn: 'NCCN Breast 2.B', constraint: 'SLNB if neo achieves pCR',    ctype: 'cp-neutral', selected: true },
    { mod: 'adj-chemo', detail: 'AC-TH × 12 cycles',    data: 'Post-BCS · adjuvant standard',        nccn: 'NCCN Breast 4.A', constraint: 'LVEF echo q3 cycles mandatory',ctype: 'cp-amber',   selected: true },
    { mod: 'adj-her2',  detail: 'Trastuzumab 6mg/kg',   data: 'HER2 3+ · LVEF 65% (safe)',           nccn: 'NCCN Breast 4.A', constraint: 'Stop if LVEF <50%',           ctype: 'cp-rose',    selected: true },
    { mod: 'radiation', detail: 'IMRT 25fx 50Gy',       data: 'BCS surgery · N1 node involvement',   nccn: 'NCCN Breast 5.C', constraint: 'Cardiac dose constraints',    ctype: 'cp-neutral', selected: true },
    { mod: 'hormonal',  detail: 'Letrozole 5yr',        data: 'ER+ · pre-menopausal · 5yr standard', nccn: 'NCCN Breast 6.D', constraint: 'Goserelin ovarian suppression',ctype: 'cp-violet',  selected: true }
  ];
 
  /* ══════════════════════════════════════
     STATE
  ══════════════════════════════════════ */
  currentMode: string = 'template';
  previousMode: string = 'template';
 
  selectedTemplate: any = null;
  templateSearch: string = '';
  filteredTemplateGroups: any[] = [];
 
  selectedManual: Set<string> = new Set();
  manualConfigRows: any[] = [];
 
  manualForm = {
    intent: '',
    guideline: '',
    mdtDate: ''
  };
 
  confirmedPhases: any[] = [];
  confirmedSourceLabel: string = '';
  confirmedSource: string = '';
  constrainedPhases: any[] = [];
 
  /* ══════════════════════════════════════
     LIFECYCLE
  ══════════════════════════════════════ */
  ngOnInit(): void {
    this.buildTemplateGroups();
  }
 
  /* ══════════════════════════════════════
     HELPERS
  ══════════════════════════════════════ */
  getModality(id: string): any {
    return this.modalities.find(m => m.id === id) || { label: id, color: '#6b7280', bg: '#f3f4f6' };
  }
 
  get selectionCount(): number {
    if (this.currentMode === 'ai')       return this.aiRows.filter(r => r.selected).length;
    if (this.currentMode === 'template') return this.selectedTemplate ? this.selectedTemplate.phases.length : 0;
    if (this.currentMode === 'manual')   return this.selectedManual.size;
    if (this.currentMode === 'confirmed') return this.confirmedPhases.length;
    return 0;
  }
 
  get footerModeLabel(): string {
    const map: any = {
      ai: 'AI Suggestion',
      template: 'Template Library',
      manual: 'Manual Build',
      confirmed: 'Confirmed'
    };
    return map[this.currentMode] || this.currentMode;
  }
 
  /* ══════════════════════════════════════
     MODE SWITCH
  ══════════════════════════════════════ */
  switchMode(mode: string): void {
    this.currentMode = mode;
  }
 
  /* ══════════════════════════════════════
     AI TABLE
  ══════════════════════════════════════ */
  updateCount(): void {
    // count is computed via getter — no-op needed, triggers change detection
  }
 
  editConstraint(index: number, mode: string): void {
    alert(`Edit constraint for row ${index + 1} in ${mode} mode — in production this opens an inline editor.`);
  }
 
  /* ══════════════════════════════════════
     TEMPLATE LIBRARY
  ══════════════════════════════════════ */
  buildTemplateGroups(filter?: string): void {
    const groups: any = {};
    this.templates.forEach(t => {
      if (filter) {
        const f = filter.toLowerCase();
        if (!t.title.toLowerCase().includes(f) &&
            !t.cancer.toLowerCase().includes(f) &&
            !t.nccn.toLowerCase().includes(f)) return;
      }
      if (!groups[t.cancer]) groups[t.cancer] = [];
      groups[t.cancer].push(t);
    });
    this.filteredTemplateGroups = Object.entries(groups).map(([cancer, templates]) => ({ cancer, templates }));
  }
 
  onTemplateSearch(val: string): void {
    this.buildTemplateGroups(val);
  }
 
  selectTemplate(id: string): void {
    this.selectedTemplate = this.templates.find(t => t.id === id) || null;
    this.buildTemplateGroups();
  }
 
  clearTemplate(): void {
    this.selectedTemplate = null;
    this.templateSearch = '';
    this.buildTemplateGroups();
  }
 
  /* ══════════════════════════════════════
     MANUAL PICKER
  ══════════════════════════════════════ */
  toggleManualMod(id: string): void {
    if (this.selectedManual.has(id)) {
      this.selectedManual.delete(id);
    } else {
      this.selectedManual.add(id);
    }
    this.rebuildManualConfigRows();
  }
 
  rebuildManualConfigRows(): void {
    // Preserve existing row data (detail, phase, concurrent, constraints)
    const existingMap: any = {};
    this.manualConfigRows.forEach(r => { existingMap[r.id] = r; });
 
    let phase = 1;
    this.manualConfigRows = Array.from(this.selectedManual).map(id => {
      const mod = this.getModality(id);
      if (existingMap[id]) return existingMap[id];
      return {
        id,
        label: mod.label,
        sub: mod.sub,
        color: mod.color,
        bg: mod.bg,
        phase: phase++,
        concurrent: false,
        detail: '',
        showConstraint: false,
        constraints: []
      };
    });
  }
 
  removeManualMod(id: string): void {
    this.selectedManual.delete(id);
    this.manualConfigRows = this.manualConfigRows.filter(r => r.id !== id);
  }
 
  /* ══════════════════════════════════════
     CONSTRAINT EDITOR
  ══════════════════════════════════════ */
  toggleConstraint(row: any): void {
    row.showConstraint = !row.showConstraint;
    if (row.showConstraint && row.constraints.length === 0) {
      this.addConstraintRow(row);
    }
  }
 
  addConstraintRow(row: any): void {
    row.constraints.push({ metric: 'ANC', operator: '≥', value: '' });
  }
 
  removeConstraintRow(row: any, index: number): void {
    row.constraints.splice(index, 1);
  }
 
  /* ══════════════════════════════════════
     CONFIRM PATHWAY
  ══════════════════════════════════════ */
  confirmPathway(source: string): void {
    this.confirmedSource = source;
    this.confirmedPhases = [];
 
    if (source === 'template' && this.selectedTemplate) {
      this.confirmedPhases = this.selectedTemplate.phases.map((p: any) => ({
        num:        p.seq,
        label:      this.getModality(p.mod).label,
        detail:     p.detail,
        constraint: p.constraint,
        conc:       p.conc,
        color:      this.getModality(p.mod).color,
        bg:         this.getModality(p.mod).bg
      }));
      this.confirmedSourceLabel = `Source: Template — ${this.selectedTemplate.title}`;
 
    } else if (source === 'ai') {
      let seq = 1;
      this.aiRows.filter(r => r.selected).forEach(r => {
        this.confirmedPhases.push({
          num:        seq++,
          label:      this.getModality(r.mod).label,
          detail:     r.detail,
          constraint: r.constraint,
          conc:       false,
          color:      this.getModality(r.mod).color,
          bg:         this.getModality(r.mod).bg
        });
      });
      this.confirmedSourceLabel = 'Source: NCCN AI Suggestion';
 
    } else if (source === 'manual') {
      let seq = 1;
      this.selectedManual.forEach(id => {
        const mod = this.getModality(id);
        const row = this.manualConfigRows.find(r => r.id === id);
        this.confirmedPhases.push({
          num:        seq++,
          label:      mod.label,
          detail:     row ? row.detail || mod.sub : mod.sub,
          constraint: '—',
          conc:       row ? row.concurrent : false,
          color:      mod.color,
          bg:         mod.bg
        });
      });
      this.confirmedSourceLabel = 'Source: Manual build';
    }
 
    this.constrainedPhases = this.confirmedPhases.filter(p => p.constraint && p.constraint !== '—');
    this.previousMode = source;
    this.currentMode = 'confirmed';
  }
 
  goBack(): void {
    this.currentMode = this.previousMode;
  }
 
  proceedToPhases(): void {
    alert('Proceeding to Configure Phases — wire up your router navigation here.');
  }
 
  saveDraft(): void {
    alert('Draft saved successfully.');
  }

}
