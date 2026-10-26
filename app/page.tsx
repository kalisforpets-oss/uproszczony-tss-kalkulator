'use client';

import React, { useState } from 'react';
import { 
  Calculator, 
  Zap, 
  TrendingDown, 
  TrendingUp, 
  Settings, 
  CheckCircle2, 
  AlertTriangle, 
  Eye, 
  Lightbulb, 
  BatteryCharging,
  Briefcase,
  Cpu
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

// ==========================================
// SŁOWNIK TŁUMACZEŃ (PL / EN)
// ==========================================
const dict = {
  pl: {
    headerSub: 'Patent UPRP Nr 243550 | Napęd A.S.N.T.',
    microInst: 'Mikroinstalacja do 50 kWp bez PnB',
    microInstMob: 'Do 50 kWp',
    tagline: 'Autokonsumpcja i redukcja Opłaty Mocowej (219,40 PLN/MWh)',
    titleMain: 'Kalkulator fotowoltaiki dla firm:',
    titleSubInv: 'TSS 2-Osiowy vs. Statyka Południe',
    titleSubPro: 'TSS 2-Osiowy vs. 1-Osiowy vs. Statyka (Płd. / Wsch-Zach)',
    desc: 'Sprawdź symulację dla 1 zestawu (50 kWp) lub dostosuj instalację do pełnego zapotrzebowania Twojej fabryki.',
    
    viewBusiness: 'Widok Inwestorski',
    viewPro: 'Audyt Techniczny',

    configTitle: 'Konfiguracja Zakładu B2B',
    billLabel: 'Miesięczna faktura za prąd (Netto):',
    consumption: 'Zużycie roczne: ~',
    shiftLabel: 'Tryb pracy zakładu (Okno autokonsumpcji):',
    shift1: '1 Zmiana',
    shift1Sub: '06:00 - 14:00',
    shift2: '2 Zmiany',
    shift2Sub: '06:00 - 22:00',
    shift3: '3 Zmiany',
    shift3Sub: 'Ruch ciągły 24/7',
    
    recomTitle: 'Rekomendacja dla Twojej faktury',
    recomDesc1: 'Aby zaspokoić zapotrzebowanie fabryki, rekomendujemy zastosowanie',
    recomDesc2: 'zestawów',
    recomDesc2_1: 'zestawu',
    applyOpt: 'Zastosuj optymalizację',
    recomCalcFor: 'Obecnie przeliczasz parametry dla:',
    
    profit10y: 'Zysk Netto z TSS (10 lat)',
    profitSub: 'Po pełnym spłaceniu inwestycji',
    roi: 'Zwrot z inwestycji (ROI)',
    roiSub: 'Z pełnym kosztem serwisu (OPEX)',
    
    summaryTitle: 'Podsumowanie korzyści A.S.N.T.',
    summaryTSSall: 'Wybierając technologię TSS Mini-Max zamiast rozwiązań statycznych lub 1-osiowych, unikasz utraty kapitału rzędu dziesiątek tysięcy złotych rocznie.',
    summaryTSSallSub: 'Różnica w zysku po 10 latach to potężna przewaga na korzyść Twojego biznesu.',
    summarySpec: 'Wybierając TSS zamiast',
    summarySpec2: 'zabezpieczasz swój kapitał przed drastyczną utratą.',
    summarySpecSub: 'W skali 10 lat zyskujesz łącznie aż',
    summarySpecSub2: 'przewagi rynkowej.',
    summaryPrompt: 'Zaznacz odpowiednie pary nad wykresem, aby zobaczyć bezpośrednie porównanie utraconych korzyści względem konkurencji.',

    invRecTitle: 'Rekomendacja inwestycyjna:',
    invRecText1: 'Wybierając technologię TSS Mini-Max, po okresie spłaty inwestycji realny koszt wytworzenia 1 kWh energii wynosi zaledwie 0,09 zł (9 gr).',
    invRecText2: 'Kwota ta obejmuje pełny pakiet gwarancyjny oraz kompleksowy serwis mechaniki i napędu A.S.N.T., rozliczany wyłącznie od wyprodukowanej kilowatogodziny. Otrzymujesz 100% przewidywalności kosztowej i zabezpieczenie ciągłości pracy bez ukrytych wydatków.',

    structTitle: 'Struktura rocznych przychodów A.S.N.T. (Brutto):',
    struct1: 'Zatrzymane w kasie (Zużycie):',
    struct2: 'Zatrzymane (Tarcza Mocowa):',
    struct3: 'Zarobione na TGE (Eksport):',
    structTotal: 'Zysk całkowity (przed OPEX):',
    kwhCost: 'Koszt 1 kWh po spłacie:',
    kwhCostVal: '~0,09 zł',
    kwhCostSub: '(9 gr)',
    kwhSub: 'Ta kwota to wyłącznie roczny operacyjny OPEX (pełna gwarancja, serwis i utrzymanie mechaniki). Magazynów brak.',
    
    advToggleHide: 'Ukryj parametry taryfowe',
    advToggleShow: 'Dostosuj stawki energii i cenę BESS (Dla Energetyka)',
    advEnergy: 'Koszt energii (czynna + dystrybucja):',
    advExport: 'Cena odsprzedaży nadwyżki (RCEm):',
    advExportSub: 'Wskazówka: System 2-osiowy eksportuje potężne nadwyżki aż do zachodu słońca. Przyjmij uśrednioną stawkę dla szczytu wieczornego (16:00–20:00), gdy ceny na TGE osiągają najwyższe wartości w dobie.',
    advBess: 'Cena rynkowa magazynów BESS pod klucz:',
    advBessSub: 'Średnia rynkowa w segmencie C&I (magazyn LFP + falownik PCS + montaż + PPOŻ). Kalkulator doliczy ten CAPEX konkurencji po włączeniu testu wyrównania szans.',

    chartTitle: 'Dobowy profil mocy dla',
    chartSub: 'Wizualizacja pracy w optymalny dzień letni. Wszystkie technologie pracują w identycznych warunkach nasłonecznienia. Porównaj wygenerowaną moc ze stałym poborem fabryki (Czerwona Linia).',
    quickCompare: 'Szybkie porównanie par:',
    compareAll: 'Wszystkie 4',
    
    tableTitle: 'Uśredniony bilans całoroczny dla',
    tableTitleBase: 'bazowo',
    tableOn: 'Włączono koszt wyrównania',
    tableSub: 'Wszystkie technologie przeliczone dla tych samych warunków pogodowych (w tym zima, zachmurzenie).',
    
    thParam: 'Parametr',
    thSouth: 'Statyka Płd.',
    thEW: 'Wsch-Zach',
    thAxis1: '1-Osiowy',
    thTSS: 'TSS Mini-Max',
    
    trProd: 'Roczna produkcja:',
    trAuto: 'Autokonsumpcja (Baza):',
    trDeficit: 'Dodatkowy zakup z sieci vs TSS:',
    trMatch: 'Aby wyrównać do TSS:',
    trNet: 'Korzyść netto / rok',
    trROI: 'Realny zwrot (ROI):',
    tr10y: 'Zysk netto po 10 l.',
    
    deficitTSSVal: '0,0 MWh (Baza)',
    matchAddPV: 'kWp PV',
    matchAddBESS: 'kWh BESS',
    matchSurcharge: 'Dopłata:',
    matchNone: 'Baza',
    
    altTitle: 'Utracony zysk (Gdy wybierzesz "gołą" instalację innej technologii bez rozbudowy):',
    altBuyGrid: 'Dokupujesz z sieci:',
    altLossYr: 'Strata roczna:',
    altLoss10y: 'Nadpłata za prąd (10 lat):',

    bizMatchTitle: 'Test rynkowy: Ile kosztuje dogonienie TSS na statyce?',
    bizMatchSub: 'Kliknij, aby sprawdzić, o ile paneli i jaki magazyn BESS trzeba dokupić do statyki, by wyrównać wynik finansowy.',
    bizCardRec: 'REKOMENDACJA',
    bizCardAlt: 'ALTERNATYWA',
    bizAuto: 'Autokonsumpcja energii:',
    bizAnnualNet: 'Roczna oszczędność netto:',
    bizProfit10y: 'Zysk netto (10 lat):',
    bizLoss10y: 'Utracony zysk (10 lat):',
    bizROI: 'Czas zwrotu (ROI):',
    bizROIAfter: 'ROI po rozbudowie:',
    bizCostkWh: 'Koszt energii (LCOE):',
    bizCapexAdd: 'Wymagana dopłata CAPEX:',
    bizBuyMore: 'Aby dogonić TSS musisz dokupić:',
    bizSpaceWarn: 'Wymaga dodatkowej powierzchni dachu/gruntu!',
    
    bizTssPillLabel: 'Zabezpieczenie profilu:',
    bizTssPillValue: 'Maksymalne pokrycie w szczycie',
    bizAltPillLabel: 'Dokupujesz z sieci vs TSS:',
    bizAltPillMatchLabel: 'Wyrównano:',
    bizAltPillMatchValue: 'Pobór z sieci zredukowany przez BESS',
    perYear: '/rok',

    currency: 'zł',
    unitK: 'tys.',
    unitM: 'mln',
    years: 'lat',
    months: 'mies.',
  },
  en: {
    headerSub: 'UPRP Patent No. 243550 | A.S.N.T. Drive',
    microInst: 'Micro-installation up to 50 kWp without permit',
    microInstMob: 'Up to 50 kWp',
    tagline: 'Self-consumption and Capacity Market Fee reduction',
    titleMain: 'B2B Solar ROI Calculator:',
    titleSubInv: '2-Axis TSS vs. Fixed South',
    titleSubPro: '2-Axis TSS vs. 1-Axis vs. Fixed (South / E-W)',
    desc: 'Run a simulation for 1 unit (50 kWp) or adjust the installation to meet your factory\'s full energy demand.',
    
    viewBusiness: 'Investor View',
    viewPro: 'Technical Audit',

    configTitle: 'B2B Facility Configuration',
    billLabel: 'Monthly electricity bill (Net):',
    consumption: 'Annual consumption: ~',
    shiftLabel: 'Factory operating mode (Consumption window):',
    shift1: '1 Shift',
    shift1Sub: '06:00 - 14:00',
    shift2: '2 Shifts',
    shift2Sub: '06:00 - 22:00',
    shift3: '3 Shifts',
    shift3Sub: '24/7 Operation',
    
    recomTitle: 'Recommendation for your bill',
    recomDesc1: 'To meet the factory\'s demand, we recommend using',
    recomDesc2: 'units',
    recomDesc2_1: 'unit',
    applyOpt: 'Apply optimization',
    recomCalcFor: 'Currently calculating for:',
    
    profit10y: 'TSS Net Profit (10 years)',
    profitSub: 'After full return on investment',
    roi: 'Return on Investment (ROI)',
    roiSub: 'Including full service costs (OPEX)',
    
    summaryTitle: 'A.S.N.T. Benefits Summary',
    summaryTSSall: 'By choosing TSS Mini-Max technology instead of fixed or 1-axis solutions, you avoid capital loss of tens of thousands annually.',
    summaryTSSallSub: 'The difference in profit over 10 years is a massive advantage for your business.',
    summarySpec: 'By choosing TSS instead of',
    summarySpec2: 'you protect your capital from drastic loss.',
    summarySpecSub: 'Over 10 years, you gain a total of',
    summarySpecSub2: 'in market advantage.',
    summaryPrompt: 'Select corresponding pairs above the chart to see a direct comparison of lost benefits against competitors.',

    invRecTitle: 'Investment Recommendation:',
    invRecText1: 'By choosing TSS Mini-Max, after the payback period, the actual production cost per 1 kWh is only €0.02 (2 cents).',
    invRecText2: 'This amount includes a full warranty package and comprehensive operational maintenance of the A.S.N.T. drive, calculated solely per generated kWh. You gain 100% cost predictability and risk-free long-term operation with no hidden expenses.',

    structTitle: 'A.S.N.T. Annual Revenue Structure (Gross):',
    struct1: 'Kept in pocket (Self-consumption):',
    struct2: 'Kept in pocket (Capacity Fee Shield):',
    struct3: 'Earned on Exchange (Export):',
    structTotal: 'Total Profit (before OPEX):',
    kwhCost: 'Cost per 1 kWh after ROI:',
    kwhCostVal: '~€0.02',
    kwhCostSub: '(2 cents)',
    kwhSub: 'This amount is purely the annual operational OPEX (full warranty, service, and mechanical maintenance). No batteries required.',
    
    advToggleHide: 'Hide tariff parameters',
    advToggleShow: 'Adjust energy rates & BESS price (For Engineers)',
    advEnergy: 'Energy Cost (Active + Distribution):',
    advExport: 'Surplus Resale Price (Spot Market):',
    advExportSub: 'Hint: The 2-axis system exports massive surplus until sunset. Assume an averaged rate for the evening peak (16:00–20:00), when market prices reach daily maximums.',
    advBess: 'Turnkey BESS Market Price:',
    advBessSub: 'C&I segment market average (LFP battery + PCS inverter + installation + fire safety). The calculator adds this CAPEX to competitors during the parity test.',

    chartTitle: 'Daily power profile for',
    chartSub: 'Visualization of operation on an optimal summer day. All technologies operate under identical sunlight conditions. Compare generated power with the factory\'s constant demand (Red Line).',
    quickCompare: 'Quick pair comparison:',
    compareAll: 'All 4 systems',
    
    tableTitle: 'Averaged annual balance for',
    tableTitleBase: 'base',
    tableOn: 'Parity Cost Enabled',
    tableSub: 'All technologies calculated for identical weather conditions (including winter, cloud cover).',
    
    thParam: 'Parameter',
    thSouth: 'Fixed South',
    thEW: 'East-West',
    thAxis1: '1-Axis',
    thTSS: 'TSS Mini-Max',
    
    trProd: 'Annual production:',
    trAuto: 'Self-consumption (Base):',
    trDeficit: 'Grid deficit vs TSS:',
    trMatch: 'To match TSS results:',
    trNet: 'Net benefit / year',
    trROI: 'Real ROI:',
    tr10y: 'Net profit after 10 yrs',
    
    deficitTSSVal: '0.0 MWh (Base)',
    matchAddPV: 'kWp PV',
    matchAddBESS: 'kWh BESS',
    matchSurcharge: 'Surcharge:',
    matchNone: 'Base',
    
    altTitle: 'Lost profit (If you choose a "bare" alternative installation without expansion):',
    altBuyGrid: 'You buy from grid:',
    altLossYr: 'Annual loss:',
    altLoss10y: 'Extra grid cost (10 yrs):',

    bizMatchTitle: 'Market Test: What is the cost to match TSS with fixed solar?',
    bizMatchSub: 'Click to check how much PV capacity and BESS storage must be added to fixed solar to equal the financial return.',
    bizCardRec: 'RECOMMENDATION',
    bizCardAlt: 'ALTERNATIVE',
    bizAuto: 'Energy Self-consumption:',
    bizAnnualNet: 'Annual net savings:',
    bizProfit10y: 'Net profit (10 yrs):',
    bizLoss10y: 'Lost profit (10 yrs):',
    bizROI: 'Return Time (ROI):',
    bizROIAfter: 'ROI after expansion:',
    bizCostkWh: 'Energy Cost (LCOE):',
    bizCapexAdd: 'Required CAPEX Surcharge:',
    bizBuyMore: 'To catch up with TSS you must buy:',
    bizSpaceWarn: 'Requires extra roof/ground space!',

    bizTssPillLabel: 'Profile security:',
    bizTssPillValue: 'Maximum peak coverage',
    bizAltPillLabel: 'Grid purchase vs TSS:',
    bizAltPillMatchLabel: 'Matched:',
    bizAltPillMatchValue: 'Grid dependency reduced by BESS',
    perYear: '/yr',
    
    currency: '€',
    unitK: 'k',
    unitM: 'M',
    years: 'years',
    months: 'mos',
  }
};

const EXCHANGE_RATE = 4.30;

export default function SolarCalculatorPage() {
  const [lang, setLang] = useState<'pl' | 'en'>('pl');
  const [viewMode, setViewMode] = useState<'inv' | 'pro'>('inv');
  
  const t = dict[lang];

  const handleLangSwitch = (newLang: 'pl' | 'en') => {
    if (newLang === lang) return;
    if (newLang === 'en') {
      setFakturaMiesieczna(prev => Math.round(Number(prev) / EXCHANGE_RATE));
      setCenaEnergii(prev => Math.round(prev / EXCHANGE_RATE));
      setCenaOdsprzedazy(prev => Math.round(prev / EXCHANGE_RATE));
      setCenaBESS(prev => Math.round(prev / EXCHANGE_RATE));
    } else {
      setFakturaMiesieczna(prev => Math.round(Number(prev) * EXCHANGE_RATE));
      setCenaEnergii(prev => Math.round(prev * EXCHANGE_RATE));
      setCenaOdsprzedazy(prev => Math.round(prev * EXCHANGE_RATE));
      setCenaBESS(prev => Math.round(prev * EXCHANGE_RATE));
    }
    setLang(newLang);
  };

  const [fakturaMiesieczna, setFakturaMiesieczna] = useState<number | string>(20000);
  const [cenaEnergii, setCenaEnergii] = useState<number>(1000);
  const [cenaOdsprzedazy, setCenaOdsprzedazy] = useState<number>(250);
  const [cenaBESS, setCenaBESS] = useState<number>(1800);

  const ex = lang === 'en' ? EXCHANGE_RATE : 1.0;
  
  const aktFakturaPLN = (Number(fakturaMiesieczna) || 0) * ex;
  const cenaEnergiiPLN = cenaEnergii * ex;
  const cenaOdsprzedazyPLN = cenaOdsprzedazy * ex;
  const cenaBESS_PLN = cenaBESS * ex;

  const [zmiany, setZmiany] = useState<number>(2);
  const [aktywnaLiczbaZestawow, setAktywnaLiczbaZestawow] = useState<number>(1);
  const [pokazKosztyDogonienia, setPokazKosztyDogonienia] = useState<boolean>(false);
  
  const [showTSS, setShowTSS] = useState<boolean>(true);
  const [showAxis1, setShowAxis1] = useState<boolean>(true);
  const [showSouth, setShowSouth] = useState<boolean>(true);
  const [showEW, setShowEW] = useState<boolean>(true);
  const [showDemand, setShowDemand] = useState<boolean>(true);

  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);

  const ustawParęWykresu = (tss: boolean, axis1: boolean, south: boolean, ew: boolean) => {
    setShowTSS(tss);
    setShowAxis1(axis1);
    setShowSouth(south);
    setShowEW(ew);
  };

  const formatWielkiejKwoty = (valuePLN: number, showCurrency: boolean = true) => {
    const value = lang === 'en' ? valuePLN / EXCHANGE_RATE : valuePLN;
    const absVal = Math.abs(value);
    const sign = value >= 0 ? '+' : '-';
    const suffix = showCurrency ? ` ${t.currency}` : '';
    
    if (absVal >= 1000000) {
      const millions = (absVal / 1000000).toFixed(2).replace('.', lang === 'pl' ? ',' : '.');
      return `${sign}${millions} ${t.unitM}${suffix}`;
    } else {
      const thousands = (absVal / 1000).toFixed(0);
      return `${sign}${thousands} ${t.unitK}${suffix}`;
    }
  };

  const formatStandard = (valuePLN: number, hideSign: boolean = false) => {
    const value = lang === 'en' ? valuePLN / EXCHANGE_RATE : valuePLN;
    const rounded = Math.round(value);
    const formatted = rounded.toLocaleString(lang === 'pl' ? 'pl-PL' : 'en-US');
    if (hideSign || rounded === 0) return formatted;
    return value > 0 ? `+${formatted}` : `-${formatted.replace('-', '')}`;
  };

  const oplataMocowaStawkaPLN = 219.40;
  const rocznyKosztObecnyPLN = aktFakturaPLN * 12;
  const roczneZuzycieZakladuMWh = rocznyKosztObecnyPLN / Math.max(1, cenaEnergiiPLN);

  const dzielnikDoboruMWh = zmiany === 2 ? 165 : (zmiany === 1 ? 190 : 175);
  const sugerowaneZestawy = Math.max(1, Math.min(20, Math.round(roczneZuzycieZakladuMWh / dzielnikDoboruMWh)));
  
  const liczbaZestawow = aktywnaLiczbaZestawow;
  const mocZainstalowanaKWp = liczbaZestawow * 49.7;

  const produkcjaRocznaTSS = liczbaZestawow * 82.5;
  const produkcjaRocznaAxis1 = liczbaZestawow * 63.0;
  const produkcjaRocznaSouth = liczbaZestawow * 50.0;
  const produkcjaRocznaEW = liczbaZestawow * 41.5;

  const godzinyPracyRocznie = zmiany === 1 ? 2016 : (zmiany === 2 ? 4032 : 6048);
  const godzinyPostojuRocznie = 8760 - godzinyPracyRocznie;

  const udzialEnergiiRoboczej = zmiany === 1 ? 0.72 : (zmiany === 2 ? 0.82 : 0.88);
  const energiaRoboczaRocznaMWh = roczneZuzycieZakladuMWh * udzialEnergiiRoboczej;
  const energiaPodtrzymaniaRocznaMWh = roczneZuzycieZakladuMWh * (1 - udzialEnergiiRoboczej);

  const demandPeak_kW = (energiaRoboczaRocznaMWh * 1000) / godzinyPracyRocznie;
  const demandOff_kW = (energiaPodtrzymaniaRocznaMWh * 1000) / godzinyPostojuRocznie;

  const udzialDniRoboczych = 252 / 365;
  const udzialDniWolnych = 113 / 365;

  const chlonnoscWeekendowaMWh = (demandOff_kW * 113 * 11.5) / 1000;
  const chlonnoscRoboczaSlonecznaMWh = zmiany === 1 
    ? (energiaRoboczaRocznaMWh * 0.90) + ((demandOff_kW * 252 * 6) / 1000)
    : energiaRoboczaRocznaMWh * 0.68;

  const obliczRealnaAutokonsumpcje = (prodRoczna: number, wspBazowy1Zm: number, wspBazowy2Zm: number, wspBazowy3Zm: number) => {
    const wspBazowy = zmiany === 1 ? wspBazowy1Zm : (zmiany === 2 ? wspBazowy2Zm : wspBazowy3Zm);
    const celBazowyMWh = prodRoczna * wspBazowy;
    const prodRoboczaMWh = prodRoczna * udzialDniRoboczych;
    const prodWeekendowaMWh = prodRoczna * udzialDniWolnych;

    const wchlonieteRoboczeMWh = Math.min(prodRoboczaMWh * (zmiany === 1 ? 0.76 : 0.97), chlonnoscRoboczaSlonecznaMWh);
    const wchlonieteWeekendMWh = zmiany === 3 
      ? Math.min(prodWeekendowaMWh * 0.95, chlonnoscWeekendowaMWh * 2.2)
      : Math.min(prodWeekendowaMWh * 0.90, chlonnoscWeekendowaMWh);

    return Math.min(celBazowyMWh, wchlonieteRoboczeMWh + wchlonieteWeekendMWh);
  };

  const autoBazoweMWh_TSS = obliczRealnaAutokonsumpcje(produkcjaRocznaTSS, 0.70, 0.90, 0.96);
  const autoBazoweMWh_Axis1 = obliczRealnaAutokonsumpcje(produkcjaRocznaAxis1, 0.67, 0.86, 0.93);
  const autoBazoweMWh_South = obliczRealnaAutokonsumpcje(produkcjaRocznaSouth, 0.55, 0.70, 0.82);
  const autoBazoweMWh_EW = obliczRealnaAutokonsumpcje(produkcjaRocznaEW, 0.66, 0.85, 0.90);

  const eksportBazowyMWh_TSS = produkcjaRocznaTSS - autoBazoweMWh_TSS;
  const eksportBazowyMWh_Axis1 = produkcjaRocznaAxis1 - autoBazoweMWh_Axis1;
  const eksportBazowyMWh_South = produkcjaRocznaSouth - autoBazoweMWh_South;
  const eksportBazowyMWh_EW = produkcjaRocznaEW - autoBazoweMWh_EW;

  const sprawnoscRTE = 0.86; 
  const oknoSoC = 0.70; 
  const cenaZaKwPV_PLN = 2500; 

  const obliczDogonienie = (techNazwa: string, techProd: number, techAuto: number, cykle: number) => {
    const brakujeMWh_Auto = Math.max(0, autoBazoweMWh_TSS - techAuto);
    const brakujeMWh_Prod = Math.max(0, produkcjaRocznaTSS - techProd);
    
    if (brakujeMWh_Auto === 0 && brakujeMWh_Prod === 0) {
      return { wymaga: false, nominalBESS: 0, dodatkoweKWp: 0, calkowityCapex: 0, calkowityOpex: 0, wchloniete: 0, dodatek: 0 };
    }

    const uzyskZ1kWp = techProd / mocZainstalowanaKWp;
    const dodatkoweKWp = brakujeMWh_Prod / uzyskZ1kWp;
    const capexPV_PLN = dodatkoweKWp * cenaZaKwPV_PLN;
    const opexPV_PLN = dodatkoweKWp * (techNazwa === 'Axis1' ? 76 : 65); 

    const potrzebaWchlonac = brakujeMWh_Auto > 0 ? brakujeMWh_Auto / sprawnoscRTE : 0;
    const pojemnoscUzytecznaKWh = (potrzebaWchlonac * 1000) / (cykle * Math.max(1, liczbaZestawow));
    const nominalBESS = brakujeMWh_Auto > 0 ? Math.ceil(pojemnoscUzytecznaKWh / oknoSoC) : 0;
    
    const capexBESS_PLN = nominalBESS * cenaBESS_PLN * Math.max(1, liczbaZestawow);
    const opexBESS_PLN = capexBESS_PLN * 0.015;

    return { 
      wymaga: true, nominalBESS, dodatkoweKWp, 
      calkowityCapex: capexPV_PLN + capexBESS_PLN, 
      calkowityOpex: opexPV_PLN + opexBESS_PLN,
      wchloniete: potrzebaWchlonac, dodatek: brakujeMWh_Auto
    };
  };

  const matchSouth = obliczDogonienie('South', produkcjaRocznaSouth, autoBazoweMWh_South, 180);
  const matchEW = obliczDogonienie('EW', produkcjaRocznaEW, autoBazoweMWh_EW, 180);
  const matchAxis1 = obliczDogonienie('Axis1', produkcjaRocznaAxis1, autoBazoweMWh_Axis1, 210);

  const autoMWh_TSS = autoBazoweMWh_TSS;
  const autoMWh_South = pokazKosztyDogonienia && matchSouth.wymaga ? autoBazoweMWh_TSS : autoBazoweMWh_South;
  const autoMWh_EW = pokazKosztyDogonienia && matchEW.wymaga ? autoBazoweMWh_TSS : autoBazoweMWh_EW;
  const autoMWh_Axis1 = pokazKosztyDogonienia && matchAxis1.wymaga ? autoBazoweMWh_TSS : autoBazoweMWh_Axis1;

  const eksportMWh_TSS = eksportBazowyMWh_TSS;
  const eksportMWh_South = pokazKosztyDogonienia && matchSouth.wymaga 
    ? Math.max(0, produkcjaRocznaTSS - autoBazoweMWh_South - matchSouth.wchloniete) : eksportBazowyMWh_South;
  const eksportMWh_EW = pokazKosztyDogonienia && matchEW.wymaga 
    ? Math.max(0, produkcjaRocznaTSS - autoBazoweMWh_EW - matchEW.wchloniete) : eksportBazowyMWh_EW;
  const eksportMWh_Axis1 = pokazKosztyDogonienia && matchAxis1.wymaga 
    ? Math.max(0, produkcjaRocznaTSS - autoBazoweMWh_Axis1 - matchAxis1.wchloniete) : eksportBazowyMWh_Axis1;

  const realnyProcAutoTSS = Math.round((autoMWh_TSS / produkcjaRocznaTSS) * 100);
  const realnyProcAutoAxis1 = Math.round((autoMWh_Axis1 / (pokazKosztyDogonienia ? produkcjaRocznaTSS : produkcjaRocznaAxis1)) * 100);
  const realnyProcAutoSouth = Math.round((autoMWh_South / (pokazKosztyDogonienia ? produkcjaRocznaTSS : produkcjaRocznaSouth)) * 100);
  const realnyProcAutoEW = Math.round((autoMWh_EW / (pokazKosztyDogonienia ? produkcjaRocznaTSS : produkcjaRocznaEW)) * 100);

  const oszczednoscBruttoTSS_PLN = (autoMWh_TSS * cenaEnergiiPLN) + (eksportMWh_TSS * cenaOdsprzedazyPLN);
  const oszczednoscBruttoAxis1_PLN = (autoMWh_Axis1 * cenaEnergiiPLN) + (eksportMWh_Axis1 * cenaOdsprzedazyPLN);
  const oszczednoscBruttoSouth_PLN = (autoMWh_South * cenaEnergiiPLN) + (eksportMWh_South * cenaOdsprzedazyPLN);
  const oszczednoscBruttoEW_PLN = (autoMWh_EW * cenaEnergiiPLN) + (eksportMWh_EW * cenaOdsprzedazyPLN);

  const opexTSS_PLN = liczbaZestawow * 4413;
  const opexAxis1_PLN = (liczbaZestawow * 3800) + (pokazKosztyDogonienia ? matchAxis1.calkowityOpex : 0);
  const opexSouth_PLN = (liczbaZestawow * 3250) + (pokazKosztyDogonienia ? matchSouth.calkowityOpex : 0);
  const opexEW_PLN = (liczbaZestawow * 3250) + (pokazKosztyDogonienia ? matchEW.calkowityOpex : 0);

  const korzyscNettoTSS_PLN = oszczednoscBruttoTSS_PLN - opexTSS_PLN;
  const korzyscNettoAxis1_PLN = oszczednoscBruttoAxis1_PLN - opexAxis1_PLN;
  const korzyscNettoSouth_PLN = oszczednoscBruttoSouth_PLN - opexSouth_PLN;
  const korzyscNettoEW_PLN = oszczednoscBruttoEW_PLN - opexEW_PLN;

  const capexTSS_PLN = liczbaZestawow * 280000;
  const capexAxis1_PLN = (liczbaZestawow * 165000) + (pokazKosztyDogonienia ? matchAxis1.calkowityCapex : 0);
  const capexSouth_PLN = (liczbaZestawow * 110000) + (pokazKosztyDogonienia ? matchSouth.calkowityCapex : 0);
  const capexEW_PLN = (liczbaZestawow * 115000) + (pokazKosztyDogonienia ? matchEW.calkowityCapex : 0);

  const roiTSS = (capexTSS_PLN / Math.max(1, korzyscNettoTSS_PLN)).toFixed(2);
  const roiAxis1 = (capexAxis1_PLN / Math.max(1, korzyscNettoAxis1_PLN)).toFixed(2);
  const roiSouth = (capexSouth_PLN / Math.max(1, korzyscNettoSouth_PLN)).toFixed(2);
  const roiEW = (capexEW_PLN / Math.max(1, korzyscNettoEW_PLN)).toFixed(2);

  const zysk10LatTSS_PLN = (korzyscNettoTSS_PLN * 10) - capexTSS_PLN;
  const zysk10LatAxis1_PLN = (korzyscNettoAxis1_PLN * 10) - capexAxis1_PLN;
  const zysk10LatSouth_PLN = (korzyscNettoSouth_PLN * 10) - capexSouth_PLN;
  const zysk10LatEW_PLN = (korzyscNettoEW_PLN * 10) - capexEW_PLN;

  const udzialGodzinMocowych = zmiany === 1 ? 0.85 : (zmiany === 2 ? 0.90 : 0.72);
  const tarczaOplatyMocowejPLN = autoMWh_TSS * udzialGodzinMocowych * oplataMocowaStawkaPLN;

  // =========================================================================
  // GWARANCJA NIEZMIENNOŚCI DANYCH DLA "GOŁYCH" INSTALACJI (BARE)
  // =========================================================================
  const oszczednoscBruttoSouth_BARE_PLN = (autoBazoweMWh_South * cenaEnergiiPLN) + (eksportBazowyMWh_South * cenaOdsprzedazyPLN);
  const oszczednoscBruttoEW_BARE_PLN = (autoBazoweMWh_EW * cenaEnergiiPLN) + (eksportBazowyMWh_EW * cenaOdsprzedazyPLN);
  const oszczednoscBruttoAxis1_BARE_PLN = (autoBazoweMWh_Axis1 * cenaEnergiiPLN) + (eksportBazowyMWh_Axis1 * cenaOdsprzedazyPLN);

  const korzyscNettoSouth_BARE_PLN = oszczednoscBruttoSouth_BARE_PLN - (liczbaZestawow * 3250);
  const korzyscNettoEW_BARE_PLN = oszczednoscBruttoEW_BARE_PLN - (liczbaZestawow * 3250);
  const korzyscNettoAxis1_BARE_PLN = oszczednoscBruttoAxis1_BARE_PLN - (liczbaZestawow * 3800);

  const zysk10LatSouth_BARE_PLN = (korzyscNettoSouth_BARE_PLN * 10) - (liczbaZestawow * 110000);
  const zysk10LatEW_BARE_PLN = (korzyscNettoEW_BARE_PLN * 10) - (liczbaZestawow * 115000);
  const zysk10LatAxis1_BARE_PLN = (korzyscNettoAxis1_BARE_PLN * 10) - (liczbaZestawow * 165000);

  const fLimits = lang === 'en' ? { min: 1750, max: 35000, step: 250 } : { min: 7500, max: 150000, step: 2500 };
  const eLimits = lang === 'en' ? { min: 140, max: 350, step: 5 } : { min: 600, max: 1500, step: 25 };
  const oLimits = lang === 'en' ? { min: 0, max: 280, step: 5 } : { min: 0, max: 1200, step: 25 };
  const bLimits = lang === 'en' ? { min: 280, max: 600, step: 10 } : { min: 1200, max: 2600, step: 50 };

  const skala = liczbaZestawow;
  const rawPoints = [
    { time: '04:30', tss: 2.81,  axis1: 0.00,  south: 0.00,  ew: 0.00  },
    { time: '05:00', tss: 12.50, axis1: 2.10,  south: 1.04,  ew: 1.90  },
    { time: '05:30', tss: 22.09, axis1: 6.50,  south: 1.77,  ew: 4.10  },
    { time: '06:00', tss: 29.49, axis1: 12.20, south: 2.50,  ew: 7.20  },
    { time: '06:30', tss: 35.32, axis1: 18.40, south: 5.21,  ew: 10.80 },
    { time: '07:00', tss: 39.60, axis1: 24.50, south: 9.59,  ew: 14.90 },
    { time: '07:30', tss: 42.62, axis1: 28.80, south: 14.80, ew: 18.90 },
    { time: '08:00', tss: 44.18, axis1: 32.10, south: 20.01, ew: 22.50 },
    { time: '08:30', tss: 45.43, axis1: 34.80, south: 25.22, ew: 25.60 },
    { time: '09:00', tss: 45.95, axis1: 36.20, south: 29.59, ew: 27.40 },
    { time: '09:30', tss: 45.74, axis1: 37.10, south: 32.51, ew: 28.90 },
    { time: '10:00', tss: 45.54, axis1: 36.50, south: 34.91, ew: 30.10 },
    { time: '10:30', tss: 45.22, axis1: 35.20, south: 37.93, ew: 31.00 },
    { time: '11:00', tss: 45.12, axis1: 33.10, south: 41.26, ew: 31.80 },
    { time: '11:30', tss: 45.74, axis1: 31.40, south: 43.97, ew: 32.40 },
    { time: '12:00', tss: 43.24, axis1: 30.00, south: 42.72, ew: 31.60 },
    { time: '12:30', tss: 42.62, axis1: 29.90, south: 42.41, ew: 31.30 },
    { time: '13:00', tss: 42.72, axis1: 30.10, south: 42.62, ew: 31.40 },
    { time: '13:30', tss: 42.93, axis1: 31.60, south: 41.47, ew: 31.00 },
    { time: '14:00', tss: 43.56, axis1: 33.40, south: 40.12, ew: 30.20 },
    { time: '14:30', tss: 44.29, axis1: 35.60, south: 34.39, ew: 28.50 },
    { time: '15:00', tss: 45.64, axis1: 37.50, south: 31.47, ew: 27.00 },
    { time: '15:30', tss: 46.06, axis1: 38.80, south: 30.11, ew: 25.60 },
    { time: '16:00', tss: 46.16, axis1: 39.10, south: 26.57, ew: 24.00 },
    { time: '16:30', tss: 46.06, axis1: 37.50, south: 21.15, ew: 22.10 },
    { time: '17:00', tss: 45.33, axis1: 34.60, south: 15.94, ew: 19.30 },
    { time: '17:30', tss: 44.08, axis1: 29.20, south: 10.52, ew: 15.60 },
    { time: '18:00', tss: 41.58, axis1: 22.80, south: 5.73,  ew: 11.40 },
    { time: '18:30', tss: 38.03, axis1: 15.40, south: 3.02,  ew: 7.60  },
    { time: '19:00', tss: 34.07, axis1: 8.20,  south: 2.19,  ew: 4.60  },
    { time: '19:30', tss: 25.53, axis1: 3.80,  south: 1.56,  ew: 2.70  },
    { time: '20:00', tss: 17.19, axis1: 1.10,  south: 1.04,  ew: 1.50  },
    { time: '20:30', tss: 8.96,  axis1: 0.20,  south: 0.52,  ew: 0.70  },
    { time: '21:00', tss: 0.73,  axis1: 0.00,  south: 0.00,  ew: 0.00  }
  ];

  const chartData = rawPoints.map(p => {
    let isPeak = false;
    if (zmiany === 1 && p.time >= '06:00' && p.time <= '14:00') isPeak = true;
    if (zmiany === 2 && p.time >= '06:00' && p.time <= '22:00') isPeak = true;
    if (zmiany === 3) isPeak = true;
    return {
      time: p.time,
      tss: Number((p.tss * skala).toFixed(1)),
      axis1: Number((p.axis1 * skala).toFixed(1)),
      south: Number((p.south * skala).toFixed(1)),
      ew: Number((p.ew * skala).toFixed(1)),
      demand: Number((isPeak ? demandPeak_kW : demandOff_kW).toFixed(1))
    };
  });

  const vShowTSS = viewMode === 'inv' ? true : showTSS;
  const vShowSouth = viewMode === 'inv' ? true : showSouth;
  const vShowAxis1 = viewMode === 'inv' ? false : showAxis1;
  const vShowEW = viewMode === 'inv' ? false : showEW;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-sky-500/30 pb-12 sm:pb-20 overflow-x-hidden">
      
      <header className="border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-2">
          
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="p-1.5 sm:p-2 bg-sky-500/10 rounded-lg border border-sky-500/20 shrink-0">
              <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-sky-400" />
            </div>
            <div className="truncate hidden sm:block">
              <span className="text-lg sm:text-xl font-bold tracking-tight text-white">TSS <span className="text-sky-400">Mini-Max</span></span>
              <span className="block text-[9px] sm:text-[10px] text-slate-400 tracking-wider font-mono uppercase truncate">{t.headerSub}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="flex bg-slate-900 border border-slate-700 p-0.5 rounded-lg text-[10px] sm:text-xs font-bold font-mono">
              <button 
                onClick={() => handleLangSwitch('pl')}
                className={`px-2 py-1 rounded-md transition-all ${lang === 'pl' ? 'bg-sky-500/20 text-sky-400' : 'text-slate-500 hover:text-slate-300'}`}
              >
                PL
              </button>
              <div className="w-px bg-slate-700 my-1 mx-0.5"></div>
              <button 
                onClick={() => handleLangSwitch('en')}
                className={`px-2 py-1 rounded-md transition-all ${lang === 'en' ? 'bg-sky-500/20 text-sky-400' : 'text-slate-500 hover:text-slate-300'}`}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-3 sm:px-6 pt-6 sm:pt-8 space-y-6 sm:space-y-8">
        
        <div className="flex flex-col items-center text-center space-y-5 max-w-4xl mx-auto pb-4">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-[11px] sm:text-xs font-semibold">
            <TrendingDown className="w-3.5 h-3.5 shrink-0" />
            <span>{t.tagline}</span>
          </div>
          
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {t.titleMain} <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-300 to-indigo-300">
              {viewMode === 'inv' ? t.titleSubInv : t.titleSubPro}
            </span>
          </h1>

          <div className="mt-4 inline-flex bg-slate-900 border border-slate-700 p-1.5 rounded-xl shadow-lg">
            <button 
              onClick={() => { setViewMode('inv'); setPokazKosztyDogonienia(false); }}
              className={`px-5 py-2.5 text-xs sm:text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2 w-40 sm:w-48 ${viewMode === 'inv' ? 'bg-sky-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'}`}
            >
              <Briefcase className="w-4 h-4" />
              {t.viewBusiness}
            </button>
            <button 
              onClick={() => { setViewMode('pro'); setPokazKosztyDogonienia(false); }}
              className={`px-5 py-2.5 text-xs sm:text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2 w-40 sm:w-48 ${viewMode === 'pro' ? 'bg-purple-500 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
            >
              <Cpu className="w-4 h-4" />
              {t.viewPro}
            </button>
          </div>
          
          <p className="text-slate-400 text-xs sm:text-sm max-w-2xl mt-4">
            {t.desc}
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* LEWA KOLUMNA */}
          <div className="order-2 xl:order-1 xl:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 lg:p-7 shadow-xl space-y-5 overflow-hidden">
            
            <div className="space-y-3.5 sm:space-y-4 border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-sm sm:text-base lg:text-lg font-bold text-white leading-snug">
                  {t.chartTitle} {mocZainstalowanaKWp.toFixed(1)} kWp ({liczbaZestawow} {liczbaZestawow === 1 ? t.recomDesc2_1 : t.recomDesc2})
                </h2>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                  {t.chartSub}
                </p>
              </div>

              {viewMode === 'pro' && (
                <>
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5 text-sky-400 shrink-0" /> {t.quickCompare}
                    </span>
                    <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
                      <button onClick={() => ustawParęWykresu(true, true, false, false)} className={`px-2.5 sm:px-3 py-2 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold border transition text-center touch-manipulation ${showTSS && showAxis1 && !showSouth && !showEW ? 'bg-purple-500/20 border-purple-400 text-white' : 'bg-slate-950 border-slate-800 text-slate-400'}`}>TSS + {t.thAxis1}</button>
                      <button onClick={() => ustawParęWykresu(true, false, true, false)} className={`px-2.5 sm:px-3 py-2 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold border transition text-center touch-manipulation ${showTSS && !showAxis1 && showSouth && !showEW ? 'bg-sky-500/20 border-sky-400 text-white' : 'bg-slate-950 border-slate-800 text-slate-400'}`}>TSS + {t.thSouth}</button>
                      <button onClick={() => ustawParęWykresu(true, false, false, true)} className={`px-2.5 sm:px-3 py-2 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold border transition text-center touch-manipulation ${showTSS && !showAxis1 && !showSouth && showEW ? 'bg-sky-500/20 border-sky-400 text-white' : 'bg-slate-950 border-slate-800 text-slate-400'}`}>TSS + {t.thEW}</button>
                      <button onClick={() => ustawParęWykresu(true, true, true, true)} className={`px-2.5 sm:px-3 py-2 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold border transition text-center touch-manipulation ${showTSS && showAxis1 && showSouth && showEW ? 'bg-slate-800 border-slate-600 text-white' : 'bg-slate-950 border-slate-800 text-slate-400'}`}>{t.compareAll}</button>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-2 pt-1 text-[11px] sm:text-xs">
                    <label className="inline-flex items-center gap-1.5 cursor-pointer py-0.5 touch-manipulation"><input type="checkbox" checked={showTSS} onChange={(e) => setShowTSS(e.target.checked)} className="accent-sky-400 w-3.5 h-3.5 rounded" /><span className="text-sky-400 font-semibold">{t.thTSS}</span></label>
                    <label className="inline-flex items-center gap-1.5 cursor-pointer py-0.5 touch-manipulation"><input type="checkbox" checked={showAxis1} onChange={(e) => setShowAxis1(e.target.checked)} className="accent-purple-400 w-3.5 h-3.5 rounded" /><span className="text-purple-400 font-semibold">{t.thAxis1}</span></label>
                    <label className="inline-flex items-center gap-1.5 cursor-pointer py-0.5 touch-manipulation"><input type="checkbox" checked={showSouth} onChange={(e) => setShowSouth(e.target.checked)} className="accent-amber-400 w-3.5 h-3.5 rounded" /><span className="text-amber-400 font-semibold">{t.thSouth}</span></label>
                    <label className="inline-flex items-center gap-1.5 cursor-pointer py-0.5 touch-manipulation"><input type="checkbox" checked={showEW} onChange={(e) => setShowEW(e.target.checked)} className="accent-emerald-400 w-3.5 h-3.5 rounded" /><span className="text-emerald-400 font-semibold">{t.thEW}</span></label>
                  </div>
                </>
              )}
            </div>

            <div className="h-60 sm:h-72 lg:h-80 w-full pt-1">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 5, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorTSS" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#38bdf8" stopOpacity={0.40}/><stop offset="95%" stopColor="#38bdf8" stopOpacity={0.0}/></linearGradient>
                    <linearGradient id="colorAxis1" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#a855f7" stopOpacity={0.28}/><stop offset="95%" stopColor="#a855f7" stopOpacity={0.0}/></linearGradient>
                    <linearGradient id="colorSouth" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#f59e0b" stopOpacity={0.25}/><stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0}/></linearGradient>
                    <linearGradient id="colorEW" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10b981" stopOpacity={0.25}/><stop offset="95%" stopColor="#10b981" stopOpacity={0.0}/></linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="time" stroke="#64748b" fontSize={10} tickLine={false} minTickGap={20} />
                  <YAxis stroke="#64748b" fontSize={10} tickLine={false} unit=" kW" width={55} />
                  <Tooltip wrapperClassName="hidden sm:block" contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '11px' }} itemStyle={{ padding: '2px 0' }} />
                  {showDemand && <Area type="stepAfter" dataKey="demand" name="Pobór (kW)" stroke="#f43f5e" strokeWidth={1.5} strokeDasharray="4 4" fill="none" />}
                  {vShowSouth && <Area type="monotone" dataKey="south" name={t.thSouth} stroke="#f59e0b" strokeWidth={2} fillOpacity={1} fill="url(#colorSouth)" />}
                  {vShowEW && <Area type="monotone" dataKey="ew" name={t.thEW} stroke="#10b981" strokeWidth={2} strokeDasharray="5 3" fillOpacity={1} fill="url(#colorEW)" />}
                  {vShowAxis1 && <Area type="monotone" dataKey="axis1" name={t.thAxis1} stroke="#a855f7" strokeWidth={2} fillOpacity={1} fill="url(#colorAxis1)" />}
                  {vShowTSS && <Area type="monotone" dataKey="tss" name={t.thTSS} stroke="#38bdf8" strokeWidth={2.5} fillOpacity={1} fill="url(#colorTSS)" />}
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* WIDOK INWESTORSKI */}
            {viewMode === 'inv' && (
              <div className="pt-4 space-y-5">
                
                <div className="p-4 bg-sky-950/30 rounded-xl border border-sky-500/30">
                  <div className="flex items-center gap-1.5 text-sky-400 font-bold mb-1.5 text-sm">
                    <TrendingUp className="w-4 h-4 shrink-0" /> {t.invRecTitle}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {t.invRecText1}
                    <br/><span className="text-sky-400 font-bold mt-1 block">{t.invRecText2}</span>
                  </p>
                </div>

                <div 
                  className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-5 bg-slate-900/80 border-2 rounded-xl cursor-pointer transition-all touch-manipulation select-none ${pokazKosztyDogonienia ? 'border-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.2)]' : 'border-slate-700 hover:border-slate-500'}`}
                  onClick={() => setPokazKosztyDogonienia(!pokazKosztyDogonienia)}
                >
                  <div className="flex items-start gap-3 sm:gap-4 pr-2">
                    <div className={`p-2 rounded-lg shrink-0 mt-0.5 ${pokazKosztyDogonienia ? 'bg-rose-500/20' : 'bg-slate-800'}`}>
                      <BatteryCharging className={`w-6 h-6 ${pokazKosztyDogonienia ? 'text-rose-400' : 'text-slate-400'}`} />
                    </div>
                    <div>
                      <strong className={`text-base sm:text-lg block leading-snug ${pokazKosztyDogonienia ? 'text-white' : 'text-slate-300'}`}>
                        {t.bizMatchTitle}
                      </strong>
                      <span className="text-[11px] sm:text-xs text-slate-400 leading-relaxed block mt-1">
                        {t.bizMatchSub}
                      </span>
                    </div>
                  </div>
                  <div className={`mt-4 sm:mt-0 w-12 h-6 rounded-full relative transition-colors shrink-0 ${pokazKosztyDogonienia ? 'bg-rose-500' : 'bg-slate-700'}`}>
                    <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${pokazKosztyDogonienia ? 'translate-x-6' : 'translate-x-0'}`}></div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  
                  {/* KARTA TSS */}
                  <div className="bg-slate-950 border border-sky-500/30 rounded-2xl p-5 flex flex-col relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-sky-500 text-slate-950 text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">
                      {t.bizCardRec}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1">{t.thTSS}</h3>
                    <p className="text-sm text-slate-400 mb-5">{t.trProd} <strong className="text-sky-400">{produkcjaRocznaTSS.toFixed(1)} MWh</strong></p>
                    
                    <div className="flex flex-col grow gap-5">
                      <div>
                        <span className="text-xs text-slate-400 block uppercase tracking-wider mb-0.5">{t.bizAuto}</span>
                        <span className="text-2xl font-bold text-emerald-400 block">{autoMWh_TSS.toFixed(1)} MWh <span className="text-base opacity-80">({realnyProcAutoTSS}%)</span></span>
                        <div className="mt-1.5 inline-flex items-center gap-1.5 px-2 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-[10px] text-emerald-400">
                          <CheckCircle2 className="w-3 h-3" />
                          <span><span className="font-semibold">{t.bizTssPillLabel}</span> {t.bizTssPillValue}</span>
                        </div>
                      </div>
                      <div>
                        <span className="text-xs text-slate-400 block uppercase tracking-wider mb-0.5">{t.bizAnnualNet}</span>
                        <span className="text-2xl font-bold text-white">{formatStandard(korzyscNettoTSS_PLN, true)} {t.currency}</span>
                      </div>
                      
                      {pokazKosztyDogonienia && <div className="hidden sm:block grow" />}
                      
                      <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-800 mt-auto">
                        <div>
                          <span className="text-[11px] text-sky-500 font-semibold block">{t.bizROI}</span>
                          <span className="text-base font-bold text-sky-400">{roiTSS} {t.years}</span>
                        </div>
                        <div>
                          <span className="text-[11px] text-emerald-500 font-semibold block">{t.bizProfit10y}</span>
                          <span className="text-base font-bold text-emerald-400">{formatWielkiejKwoty(zysk10LatTSS_PLN)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* KARTA STATYKA */}
                  <div className={`bg-slate-950 border rounded-2xl p-5 flex flex-col relative transition-all duration-500 ${pokazKosztyDogonienia ? 'border-rose-500/50 shadow-[0_0_20px_rgba(244,63,94,0.15)]' : 'border-slate-800'}`}>
                    <div className="absolute top-0 right-0 bg-slate-800 text-slate-400 text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">
                      {t.bizCardAlt}
                    </div>
                    <h3 className="text-2xl font-bold text-slate-300 mb-1">{t.thSouth}</h3>
                    <p className="text-sm text-slate-500 mb-5">{t.trProd} <strong className="text-slate-300">{produkcjaRocznaSouth.toFixed(1)} MWh</strong></p>
                    
                    <div className="flex flex-col grow gap-5">
                      <div>
                        <span className="text-xs text-slate-400 block uppercase tracking-wider mb-0.5">{t.bizAuto}</span>
                        <span className={`text-2xl font-bold block ${pokazKosztyDogonienia ? 'text-emerald-400' : 'text-amber-400'}`}>{autoMWh_South.toFixed(1)} MWh <span className="text-base opacity-80">({realnyProcAutoSouth}%)</span></span>
                        
                        {pokazKosztyDogonienia ? (
                          <div className="mt-1.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-[10px] text-emerald-400">
                            <CheckCircle2 className="w-3 h-3" />
                            <span><span className="font-semibold">{t.bizAltPillMatchLabel}</span> {t.bizAltPillMatchValue}</span>
                          </div>
                        ) : (
                          <div className="mt-1.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-rose-500/10 border border-rose-500/20 text-[10px] text-rose-400">
                            <TrendingDown className="w-3 h-3" />
                            <span>
                              <span className="font-semibold">{t.bizAltPillLabel}</span> +{(autoBazoweMWh_TSS - autoBazoweMWh_South).toFixed(1)} MWh {t.perYear}
                              <strong className="ml-1 opacity-90">({formatStandard(-((autoBazoweMWh_TSS - autoBazoweMWh_South) * cenaEnergiiPLN))} {t.currency}{t.perYear})</strong>
                            </span>
                          </div>
                        )}
                      </div>
                      <div>
                        <span className="text-xs text-slate-400 block uppercase tracking-wider mb-0.5">{t.bizAnnualNet}</span>
                        <span className={`text-2xl font-bold ${pokazKosztyDogonienia ? 'text-white' : 'text-slate-300'}`}>{formatStandard(korzyscNettoSouth_PLN, true)} {t.currency}</span>
                      </div>
                      
                      {pokazKosztyDogonienia && (
                        <div className="bg-rose-950/30 rounded-xl p-3 border border-rose-900/50 my-auto">
                          <span className="text-xs text-rose-400 font-bold block mb-1.5">{t.bizBuyMore}</span>
                          <ul className="text-sm text-rose-300 font-mono space-y-1 mb-3">
                            <li>+{matchSouth.dodatkoweKWp.toFixed(1)} {t.matchAddPV}</li>
                            <li>+{matchSouth.nominalBESS} {t.matchAddBESS}</li>
                          </ul>
                          <div className="border-t border-rose-900/50 pt-2.5">
                            <span className="text-[10px] text-slate-400 block uppercase">{t.bizCapexAdd}</span>
                            <span className="text-lg font-bold text-rose-400">{formatWielkiejKwoty(matchSouth.calkowityCapex)}</span>
                          </div>
                          <span className="text-[10px] text-rose-500 block mt-1.5 leading-tight uppercase font-bold">{t.bizSpaceWarn}</span>
                        </div>
                      )}
                      
                      {pokazKosztyDogonienia ? (
                        <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-800 mt-auto">
                          <div>
                            <span className="text-[11px] text-rose-500 font-bold block">{t.bizROIAfter}</span>
                            <span className="text-base font-bold text-rose-400">{roiSouth} {t.years}</span>
                          </div>
                          <div>
                            <span className="text-[11px] text-slate-500 block">{t.bizProfit10y}</span>
                            <span className="text-base font-bold text-rose-400">{formatWielkiejKwoty(zysk10LatSouth_PLN)}</span>
                          </div>
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-800 mt-auto">
                          <div>
                            <span className="text-[11px] text-slate-500 block">{t.bizROI}</span>
                            <span className="text-base font-bold text-slate-400">{roiSouth} {t.years}</span>
                          </div>
                          <div>
                            <span className="text-[11px] text-slate-500 block">{t.bizLoss10y}</span>
                            <span className="text-base font-bold text-rose-400">{formatWielkiejKwoty(zysk10LatTSS_PLN - zysk10LatSouth_BARE_PLN).replace('+', '-')}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* WIDOK AUDYTU */}
            {viewMode === 'pro' && (
              <>
                <div className="pt-3 border-t border-slate-800">
                  <div className="text-xs font-semibold text-slate-300 mb-1 flex flex-wrap items-center justify-between gap-2">
                    <span>{t.tableTitle} {liczbaZestawow} szt. ({mocZainstalowanaKWp.toFixed(1)} kWp {t.tableTitleBase}):</span>
                    {pokazKosztyDogonienia && <span className="bg-rose-500/10 text-rose-400 px-2 py-0.5 rounded text-[10px] uppercase font-bold border border-rose-500/20 shrink-0">{t.tableOn}</span>}
                  </div>
                  <div className="text-[10px] text-slate-500 mb-3 leading-relaxed">
                    {t.tableSub}
                  </div>
                  
                  <div className="-mx-4 sm:mx-0 overflow-x-hidden pb-3">
                    <table className="w-full min-w-0 sm:min-w-[480px] text-left border-collapse text-xs">
                      <thead>
                        <tr className="border-b border-slate-800 text-slate-400 text-[10px] sm:text-[11px]">
                          <th className="py-2 pr-1 sm:pr-2 pl-0.5 sm:pl-0 font-semibold">{t.thParam}</th>
                          <th className="py-2 px-0.5 sm:px-1.5 text-amber-400 font-semibold whitespace-nowrap">{t.thSouth}</th>
                          <th className="py-2 px-0.5 sm:px-1.5 text-emerald-400 font-semibold whitespace-nowrap">{t.thEW}</th>
                          <th className="py-2 px-0.5 sm:px-1.5 text-purple-400 font-semibold whitespace-nowrap">{t.thAxis1}</th>
                          <th className="py-2 pl-0.5 sm:pl-1.5 text-sky-400 font-bold whitespace-nowrap">{t.thTSS}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 font-mono text-[10px] sm:text-[11px]">
                        <tr>
                          <td className="py-2 pr-1 sm:pr-2 pl-0.5 sm:pl-0 font-sans text-slate-300 whitespace-nowrap">{t.trProd}</td>
                          <td className="py-2 px-0.5 sm:px-1.5 text-slate-300 whitespace-nowrap">{produkcjaRocznaSouth.toFixed(1)} MWh</td>
                          <td className="py-2 px-0.5 sm:px-1.5 text-slate-300 whitespace-nowrap">{produkcjaRocznaEW.toFixed(1)} MWh</td>
                          <td className="py-2 px-0.5 sm:px-1.5 text-purple-300 whitespace-nowrap">{produkcjaRocznaAxis1.toFixed(1)} MWh</td>
                          <td className="py-2 pl-0.5 sm:pl-1.5 text-sky-400 font-bold whitespace-nowrap">{produkcjaRocznaTSS.toFixed(1)} MWh</td>
                        </tr>
                        <tr>
                          <td className="py-2 pr-1 sm:pr-2 pl-0.5 sm:pl-0 font-sans text-slate-300 whitespace-nowrap">{t.trAuto}</td>
                          <td className="py-2 px-0.5 sm:px-1.5 text-slate-300 whitespace-nowrap">{autoBazoweMWh_South.toFixed(1)} MWh ({Math.round(autoBazoweMWh_South/produkcjaRocznaSouth*100)}%)</td>
                          <td className="py-2 px-0.5 sm:px-1.5 text-slate-300 whitespace-nowrap">{autoBazoweMWh_EW.toFixed(1)} MWh ({Math.round(autoBazoweMWh_EW/produkcjaRocznaEW*100)}%)</td>
                          <td className="py-2 px-0.5 sm:px-1.5 text-purple-300 whitespace-nowrap">{autoBazoweMWh_Axis1.toFixed(1)} MWh ({Math.round(autoBazoweMWh_Axis1/produkcjaRocznaAxis1*100)}%)</td>
                          <td className="py-2 pl-0.5 sm:pl-1.5 text-emerald-400 font-bold whitespace-nowrap">{autoBazoweMWh_TSS.toFixed(1)} MWh ({Math.round(autoBazoweMWh_TSS/produkcjaRocznaTSS*100)}%)</td>
                        </tr>
                        
                        <tr>
                          <td className="py-2 pr-1 sm:pr-2 pl-0.5 sm:pl-0 font-sans text-slate-300 whitespace-nowrap">{t.trDeficit}</td>
                          <td className="py-2 px-0.5 sm:px-1.5 text-rose-400 font-semibold whitespace-nowrap">
                            +{(autoBazoweMWh_TSS - autoBazoweMWh_South).toFixed(1)} MWh
                          </td>
                          <td className="py-2 px-0.5 sm:px-1.5 text-rose-400 font-semibold whitespace-nowrap">
                            +{(autoBazoweMWh_TSS - autoBazoweMWh_EW).toFixed(1)} MWh
                          </td>
                          <td className="py-2 px-0.5 sm:px-1.5 text-rose-400 font-semibold whitespace-nowrap">
                            +{(autoBazoweMWh_TSS - autoBazoweMWh_Axis1).toFixed(1)} MWh
                          </td>
                          <td className="py-2 pl-0.5 sm:pl-1.5 text-emerald-400 font-bold whitespace-nowrap">
                            {t.deficitTSSVal}
                          </td>
                        </tr>

                        {pokazKosztyDogonienia && (
                          <tr className="bg-rose-950/20">
                            <td className="py-2 pr-1 sm:pr-2 pl-0.5 sm:pl-0 font-sans text-slate-300 font-bold whitespace-nowrap">{t.trMatch}</td>
                            <td className="py-2 px-0.5 sm:px-1.5 text-rose-400 font-bold leading-tight whitespace-nowrap">
                              {matchSouth.wymaga ? (
                                <>
                                  +{matchSouth.dodatkoweKWp.toFixed(1)} {t.matchAddPV}<br/>
                                  +{matchSouth.nominalBESS} {t.matchAddBESS}<br/>
                                  <span className="text-[9px] sm:text-[10px] opacity-80 block mt-0.5">
                                    {t.matchSurcharge}<br/>
                                    {formatWielkiejKwoty(matchSouth.calkowityCapex)}
                                  </span>
                                </>
                              ) : (
                                <span className="text-[10px] text-slate-500 font-normal">{t.matchNone}</span>
                              )}
                            </td>
                            <td className="py-2 px-0.5 sm:px-1.5 text-rose-400 font-bold leading-tight whitespace-nowrap">
                              {matchEW.wymaga ? (
                                <>
                                  +{matchEW.dodatkoweKWp.toFixed(1)} {t.matchAddPV}<br/>
                                  +{matchEW.nominalBESS} {t.matchAddBESS}<br/>
                                  <span className="text-[9px] sm:text-[10px] opacity-80 block mt-0.5">
                                    {t.matchSurcharge}<br/>
                                    {formatWielkiejKwoty(matchEW.calkowityCapex)}
                                  </span>
                                </>
                              ) : (
                                <span className="text-[10px] text-slate-500 font-normal">{t.matchNone}</span>
                              )}
                            </td>
                            <td className="py-2 px-0.5 sm:px-1.5 text-rose-400 font-bold leading-tight whitespace-nowrap">
                              {matchAxis1.wymaga ? (
                                <>
                                  +{matchAxis1.dodatkoweKWp.toFixed(1)} {t.matchAddPV}<br/>
                                  +{matchAxis1.nominalBESS} {t.matchAddBESS}<br/>
                                  <span className="text-[9px] sm:text-[10px] opacity-80 block mt-0.5">
                                    {t.matchSurcharge}<br/>
                                    {formatWielkiejKwoty(matchAxis1.calkowityCapex)}
                                  </span>
                                </>
                              ) : (
                                <span className="text-[10px] text-slate-500 font-normal">{t.matchNone}</span>
                              )}
                            </td>
                            <td className="py-2 pl-0.5 sm:pl-1.5 text-sky-400 font-bold leading-tight whitespace-nowrap">
                              {t.matchNone}
                            </td>
                          </tr>
                        )}

                        <tr>
                          <td className="py-2 pr-1 sm:pr-2 pl-0.5 sm:pl-0 font-sans text-slate-300 whitespace-nowrap">{t.trNet} [{t.currency}]:</td>
                          <td className="py-2 px-0.5 sm:px-1.5 text-slate-300 whitespace-nowrap">{formatStandard(korzyscNettoSouth_PLN, true)}</td>
                          <td className="py-2 px-0.5 sm:px-1.5 text-slate-300 whitespace-nowrap">{formatStandard(korzyscNettoEW_PLN, true)}</td>
                          <td className="py-2 px-0.5 sm:px-1.5 text-purple-300 whitespace-nowrap">{formatStandard(korzyscNettoAxis1_PLN, true)}</td>
                          <td className="py-2 pl-0.5 sm:pl-1.5 text-white font-bold whitespace-nowrap">{formatStandard(korzyscNettoTSS_PLN, true)}</td>
                        </tr>
                        <tr>
                          <td className="py-2 pr-1 sm:pr-2 pl-0.5 sm:pl-0 font-sans text-slate-300 whitespace-nowrap">{t.trROI}</td>
                          <td className={`py-2 px-0.5 sm:px-1.5 whitespace-nowrap ${pokazKosztyDogonienia && matchSouth.wymaga ? 'text-rose-400 font-bold' : 'text-slate-300'}`}>{roiSouth} {t.years}</td>
                          <td className={`py-2 px-0.5 sm:px-1.5 whitespace-nowrap ${pokazKosztyDogonienia && matchEW.wymaga ? 'text-rose-400 font-bold' : 'text-slate-300'}`}>{roiEW} {t.years}</td>
                          <td className={`py-2 px-0.5 sm:px-1.5 whitespace-nowrap ${pokazKosztyDogonienia && matchAxis1.wymaga ? 'text-rose-400 font-bold' : 'text-purple-300'}`}>{roiAxis1} {t.years}</td>
                          <td className="py-2 pl-0.5 sm:pl-1.5 text-sky-400 font-bold whitespace-nowrap">{roiTSS} {t.years}</td>
                        </tr>
                        <tr>
                          <td className="py-2 pr-1 sm:pr-2 pl-0.5 sm:pl-0 font-sans text-slate-300 whitespace-nowrap">{t.tr10y} [{t.currency}]:</td>
                          <td className={`py-2 px-0.5 sm:px-1.5 whitespace-nowrap ${pokazKosztyDogonienia && zysk10LatSouth_PLN < 0 ? 'text-rose-400 font-bold' : 'text-slate-300'}`}>{formatWielkiejKwoty(zysk10LatSouth_PLN, false)}</td>
                          <td className={`py-2 px-0.5 sm:px-1.5 whitespace-nowrap ${pokazKosztyDogonienia && zysk10LatEW_PLN < 0 ? 'text-rose-400 font-bold' : 'text-slate-300'}`}>{formatWielkiejKwoty(zysk10LatEW_PLN, false)}</td>
                          <td className={`py-2 px-0.5 sm:px-1.5 whitespace-nowrap ${pokazKosztyDogonienia && zysk10LatAxis1_PLN < 0 ? 'text-rose-400 font-bold' : 'text-purple-300'}`}>{formatWielkiejKwoty(zysk10LatAxis1_PLN, false)}</td>
                          <td className="py-2 pl-0.5 sm:pl-1.5 text-emerald-400 font-bold whitespace-nowrap">{formatWielkiejKwoty(zysk10LatTSS_PLN, false)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="border-t border-slate-800 pt-4">
                    <div className="flex items-start sm:items-center gap-1.5 text-rose-400 font-bold text-xs mb-2.5">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5 sm:mt-0" />
                      <span>{t.altTitle}</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
                      
                      <div className="bg-rose-950/20 border border-rose-900/40 rounded-xl p-3 flex flex-col justify-between text-left">
                        <div>
                          <span className="text-[11px] text-slate-300 font-bold block mb-1">vs. {t.thSouth}:</span>
                          <span className="text-[10px] text-slate-400 block leading-tight">
                            {t.altBuyGrid} <strong className="text-rose-300 font-mono whitespace-nowrap">+{(autoBazoweMWh_TSS - autoBazoweMWh_South).toFixed(1)} MWh/r</strong>
                          </span>
                        </div>
                        <div className="mt-2.5 pt-2 border-t border-rose-900/30">
                          <div className="flex justify-between items-baseline gap-2">
                            <span className="text-[10px] text-slate-400">{t.altLossYr}</span>
                            <span className="text-rose-400 font-mono font-bold text-xs whitespace-nowrap">
                              -{formatStandard(korzyscNettoTSS_PLN - korzyscNettoSouth_BARE_PLN, true)} {t.currency}
                            </span>
                          </div>
                          <div className="flex justify-between items-baseline gap-2 mt-0.5">
                            <span className="text-[10px] text-slate-400">{t.altLoss10y}</span>
                            <span className="text-rose-400 font-mono font-bold text-xs whitespace-nowrap">
                              {formatWielkiejKwoty((korzyscNettoTSS_PLN - korzyscNettoSouth_BARE_PLN) * 10).replace('+', '-')}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-rose-950/20 border border-rose-900/40 rounded-xl p-3 flex flex-col justify-between text-left">
                        <div>
                          <span className="text-[11px] text-slate-300 font-bold block mb-1">vs. {t.thEW}:</span>
                          <span className="text-[10px] text-slate-400 block leading-tight">
                            {t.altBuyGrid} <strong className="text-rose-300 font-mono whitespace-nowrap">+{(autoBazoweMWh_TSS - autoBazoweMWh_EW).toFixed(1)} MWh/r</strong>
                          </span>
                        </div>
                        <div className="mt-2.5 pt-2 border-t border-rose-900/30">
                          <div className="flex justify-between items-baseline gap-2">
                            <span className="text-[10px] text-slate-400">{t.altLossYr}</span>
                            <span className="text-rose-400 font-mono font-bold text-xs whitespace-nowrap">
                              -{formatStandard(korzyscNettoTSS_PLN - korzyscNettoEW_BARE_PLN, true)} {t.currency}
                            </span>
                          </div>
                          <div className="flex justify-between items-baseline gap-2 mt-0.5">
                            <span className="text-[10px] text-slate-400">{t.altLoss10y}</span>
                            <span className="text-rose-400 font-mono font-bold text-xs whitespace-nowrap">
                              {formatWielkiejKwoty((korzyscNettoTSS_PLN - korzyscNettoEW_BARE_PLN) * 10).replace('+', '-')}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-rose-950/20 border border-rose-900/40 rounded-xl p-3 flex flex-col justify-between text-left">
                        <div>
                          <span className="text-[11px] text-slate-300 font-bold block mb-1">vs. {t.thAxis1}:</span>
                          <span className="text-[10px] text-slate-400 block leading-tight">
                            {t.altBuyGrid} <strong className="text-rose-300 font-mono whitespace-nowrap">+{(autoBazoweMWh_TSS - autoBazoweMWh_Axis1).toFixed(1)} MWh/r</strong>
                          </span>
                        </div>
                        <div className="mt-2.5 pt-2 border-t border-rose-900/30">
                          <div className="flex justify-between items-baseline gap-2">
                            <span className="text-[10px] text-slate-400">{t.altLossYr}</span>
                            <span className="text-rose-400 font-mono font-bold text-xs whitespace-nowrap">
                              -{formatStandard(korzyscNettoTSS_PLN - korzyscNettoAxis1_BARE_PLN, true)} {t.currency}
                            </span>
                          </div>
                          <div className="flex justify-between items-baseline gap-2 mt-0.5">
                            <span className="text-[10px] text-slate-400">{t.altLoss10y}</span>
                            <span className="text-rose-400 font-mono font-bold text-xs whitespace-nowrap">
                              {formatWielkiejKwoty((korzyscNettoTSS_PLN - korzyscNettoAxis1_BARE_PLN) * 10).replace('+', '-')}
                            </span>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>

                </div>
              </>
            )}

          </div>

          {/* PRAWA KOLUMNA */}
          <div className="order-1 xl:order-2 xl:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 lg:p-7 shadow-2xl space-y-5 sm:space-y-6">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3.5 sm:pb-4">
              <div className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-sky-400 shrink-0" />
                <h3 className="font-bold text-white text-base sm:text-lg">{t.configTitle}</h3>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <label className="text-xs font-semibold text-slate-300">
                  {t.billLabel}
                </label>
                <div className="flex items-center gap-1.5 sm:gap-2 bg-slate-950 px-2.5 sm:px-3 py-1.5 rounded-lg border border-slate-700 focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500 transition-all shrink-0">
                  <input 
                    type="number"
                    min="100"
                    max="500000"
                    step="50"
                    value={fakturaMiesieczna}
                    onChange={(e) => {
                      const val = e.target.value;
                      setFakturaMiesieczna(val === '' ? '' : Number(val));
                      setAktywnaLiczbaZestawow(1);
                    }}
                    onFocus={(e) => e.target.select()}
                    className="w-24 sm:w-28 bg-transparent text-white font-mono font-bold text-base sm:text-lg text-right outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    style={{ MozAppearance: 'textfield' }}
                  />
                  <span className="text-slate-500 font-mono font-bold text-xs sm:text-sm">{t.currency}</span>
                </div>
              </div>

              <input 
                type="range" 
                min={fLimits.min} 
                max={fLimits.max} 
                step={fLimits.step}
                value={Math.max(fLimits.min, Math.min(fLimits.max, Number(fakturaMiesieczna)))} 
                onChange={(e) => {
                  setFakturaMiesieczna(Number(e.target.value));
                  setAktywnaLiczbaZestawow(1); 
                }}
                onDragStart={(e) => e.preventDefault()}
                draggable={false}
                className="w-full h-6 accent-sky-500 cursor-pointer touch-pan-y"
              />
              <div className="flex justify-between text-[10px] sm:text-[11px] text-slate-400 font-mono">
                <span>{fLimits.min.toLocaleString()} {t.currency}</span>
                <span className="text-slate-300 font-semibold">{t.consumption}{roczneZuzycieZakladuMWh.toFixed(0)} MWh</span>
                <span>{fLimits.max.toLocaleString()} {t.currency}</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 block">
                {t.shiftLabel}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 1, label: t.shift1, sub: t.shift1Sub },
                  { id: 2, label: t.shift2, sub: t.shift2Sub },
                  { id: 3, label: t.shift3, sub: t.shift3Sub }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => setZmiany(item.id)}
                    className={`p-2 sm:p-2.5 rounded-xl text-left border transition-all touch-manipulation ${zmiany === item.id ? 'bg-sky-500/15 border-sky-400 text-white shadow-sm' : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'}`}
                  >
                    <span className="font-bold text-[11px] sm:text-xs block">{item.label}</span>
                    <span className="text-[9px] sm:text-[10px] text-slate-400 block truncate">{item.sub}</span>
                  </button>
                ))}
              </div>
            </div>

            {viewMode === 'pro' && (
              <div 
                className={`flex items-center justify-between p-3 sm:p-3.5 mt-2 bg-slate-900/60 border rounded-xl cursor-pointer transition-all touch-manipulation select-none ${pokazKosztyDogonienia ? 'border-rose-500/60 shadow-[0_0_15px_rgba(244,63,94,0.15)]' : 'border-slate-700 hover:border-slate-500'}`}
                onClick={() => setPokazKosztyDogonienia(!pokazKosztyDogonienia)}
              >
                <div className="flex items-start gap-2.5 sm:gap-3 pr-2">
                  <div className={`p-1.5 rounded-lg shrink-0 mt-0.5 ${pokazKosztyDogonienia ? 'bg-rose-500/20' : 'bg-slate-800'}`}>
                    <BatteryCharging className={`w-4 h-4 sm:w-5 sm:h-5 ${pokazKosztyDogonienia ? 'text-rose-400' : 'text-slate-400'}`} />
                  </div>
                  <div>
                    <strong className={`text-xs sm:text-sm block leading-snug ${pokazKosztyDogonienia ? 'text-white' : 'text-slate-300'}`}>
                      {t.bizMatchTitle}
                    </strong>
                    <span className="text-[10px] text-slate-400 leading-tight block mt-1">
                      {t.bizMatchSub}
                    </span>
                  </div>
                </div>
                <div className={`w-10 h-5 rounded-full relative transition-colors shrink-0 ${pokazKosztyDogonienia ? 'bg-rose-500' : 'bg-slate-700'}`}>
                  <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${pokazKosztyDogonienia ? 'translate-x-5' : 'translate-x-0'}`}></div>
                </div>
              </div>
            )}

            <div className="bg-sky-950/30 rounded-xl p-3.5 sm:p-4 border border-sky-500/30 space-y-3.5 sm:space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div>
                  <h4 className="text-sky-400 font-bold flex items-center gap-1.5 mb-1 text-xs sm:text-sm">
                    <Lightbulb className="w-4 h-4 shrink-0" /> {t.recomTitle}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed">
                    {t.recomDesc1} <strong className="text-white bg-slate-900 px-1.5 py-0.5 rounded whitespace-nowrap">{sugerowaneZestawy} {sugerowaneZestawy === 1 ? t.recomDesc2_1 : t.recomDesc2}</strong>.
                  </p>
                </div>
                {aktywnaLiczbaZestawow !== sugerowaneZestawy && (
                  <button
                    onClick={() => setAktywnaLiczbaZestawow(sugerowaneZestawy)}
                    className="w-full sm:w-auto shrink-0 bg-sky-500 hover:bg-sky-400 text-slate-950 px-3 py-2 rounded-lg text-xs font-bold transition-all shadow-lg shadow-sky-500/20 text-center touch-manipulation"
                  >
                    {t.applyOpt} ({sugerowaneZestawy})
                  </button>
                )}
              </div>

              <div className="flex items-center justify-between border-t border-sky-500/20 pt-3.5">
                <span className="text-[11px] sm:text-xs text-slate-400">{t.recomCalcFor}</span>
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <button
                    onClick={() => setAktywnaLiczbaZestawow(Math.max(1, aktywnaLiczbaZestawow - 1))}
                    className="w-9 h-9 sm:w-8 sm:h-8 rounded-lg bg-slate-900 border border-slate-700 hover:border-sky-400 text-white font-bold flex items-center justify-center transition touch-manipulation"
                  >
                    -
                  </button>
                  <div className="text-center min-w-[85px] sm:min-w-[90px]">
                    <strong className="text-white font-mono text-xs sm:text-sm block">
                      {aktywnaLiczbaZestawow} {aktywnaLiczbaZestawow === 1 ? t.recomDesc2_1 : t.recomDesc2}
                    </strong>
                    <span className="text-[10px] text-sky-400 font-mono">
                      ({mocZainstalowanaKWp.toFixed(1)} kWp)
                    </span>
                  </div>
                  <button
                    onClick={() => setAktywnaLiczbaZestawow(Math.min(20, aktywnaLiczbaZestawow + 1))}
                    className="w-9 h-9 sm:w-8 sm:h-8 rounded-lg bg-slate-900 border border-slate-700 hover:border-sky-400 text-white font-bold flex items-center justify-center transition touch-manipulation"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-slate-950 rounded-xl p-4 sm:p-5 border border-slate-800 space-y-4">
              <div className="grid grid-cols-2 gap-3 sm:gap-4 pb-4 border-b border-slate-800/80">
                <div>
                  <span className="text-[10px] sm:text-[11px] text-slate-400 block">{t.profit10y}</span>
                  <span className="text-xl sm:text-2xl font-extrabold font-mono text-emerald-400 block mt-0.5">
                    {formatWielkiejKwoty(zysk10LatTSS_PLN)}
                  </span>
                  <span className="text-[9px] sm:text-[10px] text-slate-400 block mt-0.5">
                    {t.profitSub}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] sm:text-[11px] text-slate-400 block">{t.roi}</span>
                  <span className="text-xl sm:text-2xl font-extrabold font-mono text-sky-400 block mt-0.5">
                    {roiTSS} {t.years}
                  </span>
                  <span className="text-[9px] sm:text-[10px] text-slate-400 block mt-0.5">
                    {t.roiSub}
                  </span>
                </div>
              </div>
              
              {viewMode === 'pro' && (
                <div className="p-3 sm:p-3.5 bg-sky-950/30 rounded-lg border border-sky-500/30 text-[11px] space-y-2">
                  <div className="flex items-center gap-1.5 text-sky-400 font-bold mb-1 text-xs">
                    <TrendingUp className="w-4 h-4 shrink-0" />
                    {t.summaryTitle}
                  </div>
                  
                  {showTSS && showSouth && showEW && showAxis1 ? (
                    <p className="text-slate-300 leading-relaxed">
                      {t.summaryTSSall}
                      <br/><span className="text-sky-400/80 mt-1 block">{t.summaryTSSallSub}</span>
                    </p>
                  ) : showTSS && showSouth && !showEW && !showAxis1 ? (
                    <p className="text-slate-300 leading-relaxed">
                      {t.summarySpec} <strong className="text-white">{t.thSouth}</strong>, {t.summarySpec2}
                      <br/><span className="text-sky-400/80 mt-1 block">{t.summarySpecSub} {formatWielkiejKwoty(zysk10LatTSS_PLN - zysk10LatSouth_BARE_PLN)} {t.summarySpecSub2}</span>
                    </p>
                  ) : showTSS && !showSouth && showEW && !showAxis1 ? (
                    <p className="text-slate-300 leading-relaxed">
                      {t.summarySpec} <strong className="text-white">{t.thEW}</strong>, {t.summarySpec2}
                      <br/><span className="text-sky-400/80 mt-1 block">{t.summarySpecSub} {formatWielkiejKwoty(zysk10LatTSS_PLN - zysk10LatEW_BARE_PLN)} {t.summarySpecSub2}</span>
                    </p>
                  ) : showTSS && !showSouth && !showEW && showAxis1 ? (
                    <p className="text-slate-300 leading-relaxed">
                      {t.summarySpec} <strong className="text-white">{t.thAxis1}</strong>, {t.summarySpec2}
                      <br/><span className="text-sky-400/80 mt-1 block">{t.summarySpecSub} {formatWielkiejKwoty(zysk10LatTSS_PLN - zysk10LatAxis1_BARE_PLN)} {t.summarySpecSub2}</span>
                    </p>
                  ) : (
                    <p className="text-slate-400 leading-relaxed">
                      {t.summaryPrompt}
                    </p>
                  )}
                </div>
              )}

              <div className="p-3.5 sm:p-4 bg-slate-950/50 rounded-xl border border-slate-800 space-y-2.5 sm:space-y-3">
                <div className="flex items-center gap-1.5 text-slate-300 font-bold text-xs mb-2 border-b border-slate-800/80 pb-2">
                  <Calculator className="w-4 h-4 text-sky-400 shrink-0" />
                  {t.structTitle}
                </div>
                
                <div className="flex justify-between items-center gap-2 text-[11px] sm:text-xs">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"></div>
                    <span>{t.struct1}</span>
                  </span>
                  <span className="font-mono font-bold text-emerald-400 whitespace-nowrap">
                    {formatStandard((autoMWh_TSS * cenaEnergiiPLN) - tarczaOplatyMocowejPLN, true)} {t.currency}
                  </span>
                </div>
                
                <div className="flex justify-between items-center gap-2 text-[11px] sm:text-xs">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0"></div>
                    <span>{t.struct2}</span>
                  </span>
                  <span className="font-mono font-bold text-amber-400 whitespace-nowrap">
                    {formatStandard(tarczaOplatyMocowejPLN, true)} {t.currency}
                  </span>
                </div>

                <div className="flex justify-between items-center gap-2 text-[11px] sm:text-xs pb-2 border-b border-slate-800/80">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0"></div>
                    <span>{t.struct3}</span>
                  </span>
                  <span className="font-mono font-bold text-purple-400 whitespace-nowrap">
                    {formatStandard(eksportMWh_TSS * cenaOdsprzedazyPLN, true)} {t.currency}
                  </span>
                </div>

                <div className="flex justify-between items-center gap-2 text-xs pt-1">
                  <span className="text-slate-300 font-bold">{t.structTotal}</span>
                  <span className="font-mono font-bold text-sky-400 text-sm whitespace-nowrap">
                    {formatStandard(oszczednoscBruttoTSS_PLN, true)} {t.currency}
                  </span>
                </div>
                
                <div className="flex flex-col gap-1.5 pt-3 border-t border-slate-700/80 mt-2">
                  <div className="flex justify-between items-center gap-2">
                    <span className="text-slate-200 font-bold text-xs sm:text-sm flex items-center gap-1.5">
                      <Zap className="w-4 h-4 text-sky-400 shrink-0" />
                      <span>{t.kwhCost}</span>
                    </span>
                    <span className="font-mono font-extrabold text-sky-400 text-base sm:text-lg tracking-tight whitespace-nowrap">
                      {t.kwhCostVal} <span className="text-xs sm:text-sm font-bold text-sky-400/80">{t.kwhCostSub}</span>
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 leading-relaxed">
                    {t.kwhSub}
                  </span>
                </div>
              </div>

            </div>

            <div>
              <button 
                onClick={() => setShowAdvanced(!showAdvanced)} 
                className="text-[11px] text-slate-400 hover:text-sky-400 flex items-center gap-1.5 transition py-1 touch-manipulation"
              >
                <Settings className="w-3.5 h-3.5 shrink-0" />
                <span>{showAdvanced ? t.advToggleHide : t.advToggleShow}</span>
              </button>
              {showAdvanced && (
                <div className="mt-2.5 p-3.5 bg-slate-950 rounded-lg border border-slate-800 space-y-3.5 text-xs">
                  <div>
                    <div className="flex justify-between text-slate-400 mb-1 gap-2">
                      <span>{t.advEnergy}</span>
                      <span className="text-white font-mono whitespace-nowrap">{cenaEnergii} {t.currency} / MWh</span>
                    </div>
                    <input type="range" min={eLimits.min} max={eLimits.max} step={eLimits.step} value={cenaEnergii} onChange={(e) => setCenaEnergii(Number(e.target.value))} onDragStart={(e) => e.preventDefault()} draggable={false} className="w-full h-6 accent-slate-500 touch-pan-y" />
                  </div>
                  <div>
                    <div className="flex justify-between text-slate-400 mb-1 gap-2">
                      <span>{t.advExport}</span>
                      <span className="text-white font-mono whitespace-nowrap">{cenaOdsprzedazy} {t.currency} / MWh</span>
                    </div>
                    <input type="range" min={oLimits.min} max={oLimits.max} step={oLimits.step} value={cenaOdsprzedazy} onChange={(e) => setCenaOdsprzedazy(Number(e.target.value))} onDragStart={(e) => e.preventDefault()} draggable={false} className="w-full h-6 accent-slate-500 touch-pan-y" />
                    <p className="text-[10px] text-sky-400/90 leading-relaxed mt-1">
                      {t.advExportSub}
                    </p>
                  </div>
                  <div>
                    <div className="flex justify-between text-slate-400 mb-1 gap-2">
                      <span className="text-rose-400 font-semibold">{t.advBess}</span>
                      <span className="text-white font-mono whitespace-nowrap">{cenaBESS} {t.currency} / kWh</span>
                    </div>
                    <input type="range" min={bLimits.min} max={bLimits.max} step={bLimits.step} value={cenaBESS} onChange={(e) => setCenaBESS(Number(e.target.value))} onDragStart={(e) => e.preventDefault()} draggable={false} className="w-full h-6 accent-rose-500 touch-pan-y" />
                    <p className="text-[10px] text-slate-500 leading-tight mt-1">
                      {t.advBessSub}
                    </p>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

      </main>
    </div>
  );
}