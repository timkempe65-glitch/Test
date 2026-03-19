export const properties = [
  {
    id: 1,
    address: "Musterstraße 12",
    city: "Berlin",
    zip: "10115",
    units: 4,
    image: null,
    tenants: [1, 2, 3, 4],
    monthlyIncome: 3200,
    utilities: {
      water: { current: 142, previous: 128, unit: "m³" },
      heating: { current: 18400, previous: 16200, unit: "kWh" },
    },
  },
  {
    id: 2,
    address: "Gartenweg 5",
    city: "Munich",
    zip: "80331",
    units: 2,
    image: null,
    tenants: [5, 6],
    monthlyIncome: 2100,
    utilities: {
      water: { current: 68, previous: 62, unit: "m³" },
      heating: { current: 9200, previous: 8800, unit: "kWh" },
    },
  },
  {
    id: 3,
    address: "Bachstraße 22a",
    city: "Hamburg",
    zip: "20095",
    units: 3,
    image: null,
    tenants: [7, 8, 9],
    monthlyIncome: 2850,
    utilities: {
      water: { current: 105, previous: 98, unit: "m³" },
      heating: { current: 14100, previous: 13500, unit: "kWh" },
    },
  },
];

export const tenants = [
  { id: 1, name: "Anna Müller", apartment: "1A", propertyId: 1, rent: 850, lastPayment: "2026-03-01", paymentStatus: "paid", email: "anna@example.com", phone: "+49 151 1234567", moveIn: "2023-06-01", meterReadings: [{ date: "2026-02-28", type: "water", value: 34.2 }, { date: "2026-02-28", type: "heating", value: 4520 }], payments: [{ date: "2026-03-01", amount: 850, status: "paid" }, { date: "2026-02-01", amount: 850, status: "paid" }, { date: "2026-01-01", amount: 850, status: "paid" }] },
  { id: 2, name: "Max Schmidt", apartment: "1B", propertyId: 1, rent: 780, lastPayment: "2026-03-01", paymentStatus: "paid", email: "max@example.com", phone: "+49 152 2345678", moveIn: "2022-01-15", meterReadings: [{ date: "2026-02-28", type: "water", value: 28.8 }, { date: "2026-02-28", type: "heating", value: 3980 }], payments: [{ date: "2026-03-01", amount: 780, status: "paid" }, { date: "2026-02-01", amount: 780, status: "paid" }, { date: "2026-01-01", amount: 780, status: "paid" }] },
  { id: 3, name: "Sarah Weber", apartment: "2A", propertyId: 1, rent: 820, lastPayment: "2026-02-01", paymentStatus: "overdue", email: "sarah@example.com", phone: "+49 153 3456789", moveIn: "2024-03-01", meterReadings: [{ date: "2026-01-15", type: "water", value: 41.5 }, { date: "2026-01-15", type: "heating", value: 5120 }], payments: [{ date: "2026-02-01", amount: 820, status: "paid" }, { date: "2026-01-01", amount: 820, status: "paid" }, { date: "2025-12-01", amount: 820, status: "late" }] },
  { id: 4, name: "Tom Fischer", apartment: "2B", propertyId: 1, rent: 750, lastPayment: "2026-03-01", paymentStatus: "paid", email: "tom@example.com", phone: "+49 154 4567890", moveIn: "2021-09-01", meterReadings: [{ date: "2026-02-28", type: "water", value: 22.1 }, { date: "2026-02-28", type: "heating", value: 3200 }], payments: [{ date: "2026-03-01", amount: 750, status: "paid" }, { date: "2026-02-01", amount: 750, status: "paid" }, { date: "2026-01-01", amount: 750, status: "paid" }] },
  { id: 5, name: "Lisa Braun", apartment: "EG", propertyId: 2, rent: 1100, lastPayment: "2026-03-01", paymentStatus: "paid", email: "lisa@example.com", phone: "+49 155 5678901", moveIn: "2023-11-01", meterReadings: [{ date: "2026-02-28", type: "water", value: 38.0 }, { date: "2026-02-28", type: "heating", value: 5200 }], payments: [{ date: "2026-03-01", amount: 1100, status: "paid" }, { date: "2026-02-01", amount: 1100, status: "paid" }, { date: "2026-01-01", amount: 1100, status: "paid" }] },
  { id: 6, name: "Jan Hoffmann", apartment: "OG", propertyId: 2, rent: 1000, lastPayment: "2026-02-01", paymentStatus: "pending", email: "jan@example.com", phone: "+49 156 6789012", moveIn: "2024-07-01", meterReadings: [{ date: "2026-01-31", type: "water", value: 30.5 }, { date: "2026-01-31", type: "heating", value: 4100 }], payments: [{ date: "2026-02-01", amount: 1000, status: "paid" }, { date: "2026-01-01", amount: 1000, status: "paid" }, { date: "2025-12-01", amount: 1000, status: "paid" }] },
  { id: 7, name: "Maria Schneider", apartment: "1L", propertyId: 3, rent: 950, lastPayment: "2026-03-01", paymentStatus: "paid", email: "maria@example.com", phone: "+49 157 7890123", moveIn: "2022-05-01", meterReadings: [{ date: "2026-02-28", type: "water", value: 36.7 }, { date: "2026-02-28", type: "heating", value: 4800 }], payments: [{ date: "2026-03-01", amount: 950, status: "paid" }, { date: "2026-02-01", amount: 950, status: "paid" }, { date: "2026-01-01", amount: 950, status: "paid" }] },
  { id: 8, name: "David Koch", apartment: "1R", propertyId: 3, rent: 950, lastPayment: "2026-03-01", paymentStatus: "paid", email: "david@example.com", phone: "+49 158 8901234", moveIn: "2023-02-01", meterReadings: [{ date: "2026-02-28", type: "water", value: 25.3 }, { date: "2026-02-28", type: "heating", value: 3600 }], payments: [{ date: "2026-03-01", amount: 950, status: "paid" }, { date: "2026-02-01", amount: 950, status: "paid" }, { date: "2026-01-01", amount: 950, status: "paid" }] },
  { id: 9, name: "Emma Richter", apartment: "2L", propertyId: 3, rent: 950, lastPayment: "2026-02-01", paymentStatus: "overdue", email: "emma@example.com", phone: "+49 159 9012345", moveIn: "2024-10-01", meterReadings: [{ date: "2026-01-20", type: "water", value: 39.1 }, { date: "2026-01-20", type: "heating", value: 5400 }], payments: [{ date: "2026-02-01", amount: 950, status: "paid" }, { date: "2026-01-01", amount: 950, status: "late" }, { date: "2025-12-01", amount: 950, status: "paid" }] },
];

export const recentActivity = [
  { id: 1, type: "payment", text: "Anna Müller paid rent", time: "2 hours ago", icon: "check" },
  { id: 2, type: "alert", text: "Sarah Weber — rent overdue", time: "1 day ago", icon: "alert" },
  { id: 3, type: "meter", text: "New meter reading: Tom Fischer", time: "2 days ago", icon: "meter" },
  { id: 4, type: "ai", text: "AI generated utility statement", time: "3 days ago", icon: "ai" },
  { id: 5, type: "payment", text: "Max Schmidt paid rent", time: "3 days ago", icon: "check" },
  { id: 6, type: "alert", text: "Emma Richter — rent overdue", time: "5 days ago", icon: "alert" },
];

export const notifications = [
  { id: 1, text: "2 tenants haven't submitted meter readings", type: "warning" },
  { id: 2, text: "2 rent payments overdue", type: "error" },
  { id: 3, text: "Utility statement ready for Musterstraße 12", type: "info" },
];

export const aiChatSuggestions = [
  "Explain this utility bill",
  "Why are costs higher this year?",
  "Create utility statement for all tenants",
  "Which tenants have overdue payments?",
];

export const aiResponses = {
  "explain this utility bill": {
    text: "Based on your latest utility bill for Musterstraße 12:\n\n**Water costs:** €842.50 (up 11% from last year)\n**Heating costs:** €3,220.00 (up 14% from last year)\n\nThe increase is mainly due to:\n• Higher energy prices (+8% market average)\n• Colder winter months (15% more heating days)\n• Tenant in 2A (Sarah Weber) has significantly higher water usage\n\nWould you like me to break this down per tenant?",
    delay: 2000,
  },
  "why are costs higher this year?": {
    text: "Great question! I analyzed your utility data across all properties:\n\n**Main reasons for higher costs:**\n\n1. **Energy prices** increased by ~8% nationally\n2. **Colder winter** — 15% more heating degree days compared to last year\n3. **Tenant behavior** — Water usage in Musterstraße 12, Apt 2A is 22% above average\n\n**Recommendation:**\nConsider sending a friendly reminder to tenants about energy-saving tips. I can draft that message for you.",
    delay: 2500,
  },
  "create utility statement for all tenants": {
    text: "I'll prepare utility statements for all 9 tenants across your 3 properties.\n\n**Status:**\n✅ Musterstraße 12 — 4 statements ready\n✅ Gartenweg 5 — 2 statements ready\n⚠️ Bachstraße 22a — 1 tenant missing meter reading\n\nTotal utility costs to distribute: **€8,245.80**\n\nWould you like me to:\n• Generate PDF statements?\n• Send them directly to tenants via email?\n• Show a preview first?",
    delay: 3000,
  },
  "which tenants have overdue payments?": {
    text: "I found **2 tenants** with overdue payments:\n\n1. **Sarah Weber** — Musterstraße 12, Apt 2A\n   • Rent: €820/month\n   • Last payment: Feb 1, 2026\n   • Overdue: March rent (18 days)\n\n2. **Emma Richter** — Bachstraße 22a, Apt 2L\n   • Rent: €950/month\n   • Last payment: Feb 1, 2026\n   • Overdue: March rent (18 days)\n\nWould you like me to send a friendly payment reminder to both?",
    delay: 2000,
  },
  default: {
    text: "I've analyzed your rental data. Based on your portfolio of 3 properties and 9 tenants:\n\n• Total monthly income: **€8,150**\n• Average occupancy: **100%**\n• Payment reliability: **78%** (7 of 9 on time)\n\nIs there something specific you'd like me to look into?",
    delay: 1800,
  },
};

export const invoiceScanResult = {
  provider: "Stadtwerke Berlin",
  date: "2026-02-15",
  amount: 842.50,
  category: "Water",
  period: "Jan 2025 – Dec 2025",
  property: "Musterstraße 12, Berlin",
  details: [
    { label: "Base fee", amount: 120.00 },
    { label: "Usage (142 m³ × €4.85)", amount: 688.70 },
    { label: "Wastewater fee", amount: 33.80 },
  ],
  confidence: 97,
};

export const statementPreview = {
  title: "Utility Cost Statement 2025",
  property: "Musterstraße 12, 10115 Berlin",
  period: "January 2025 – December 2025",
  totalCosts: 4062.50,
  items: [
    { category: "Water supply", total: 842.50, perUnit: "by usage (m³)" },
    { category: "Heating", total: 3220.00, perUnit: "by living area (m²)" },
  ],
  tenantBreakdowns: [
    { name: "Anna Müller", apt: "1A", prepaid: 2400, actual: 2180.50, balance: 219.50 },
    { name: "Max Schmidt", apt: "1B", prepaid: 2400, actual: 1895.20, balance: 504.80 },
    { name: "Sarah Weber", apt: "2A", prepaid: 2400, actual: 2650.30, balance: -250.30 },
    { name: "Tom Fischer", apt: "2B", prepaid: 2400, actual: 1820.10, balance: 579.90 },
  ],
};
