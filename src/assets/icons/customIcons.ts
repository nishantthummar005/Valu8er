export const customIconNames = [
  'valuation',
  'company',
  'analysis',
  'analytics',
  'reports',
  'benchmarking',
  'insights',
  'documents',
  'security',
  'workflow',
  'users',
  'settings',
  'dashboard',
] as const

export type CustomIconName = (typeof customIconNames)[number]

type IconNode = {
  d?: string
  cx?: string
  cy?: string
  r?: string
  x1?: string
  y1?: string
  x2?: string
  y2?: string
  type: 'path' | 'circle' | 'line'
}

export const customIcons: Record<CustomIconName, IconNode[]> = {
  valuation: [
    { type: 'path', d: 'M4 19V7.5L12 4l8 3.5V19' },
    { type: 'path', d: 'M8 19v-6h8v6' },
    { type: 'path', d: 'M9.5 10.5h5' },
  ],
  company: [
    { type: 'path', d: 'M4 20h16' },
    { type: 'path', d: 'M6 20V7h7v13' },
    { type: 'path', d: 'M13 11h5v9' },
    { type: 'path', d: 'M8.5 10h2' },
    { type: 'path', d: 'M8.5 13.5h2' },
    { type: 'path', d: 'M15.5 14.5h1' },
  ],
  analysis: [
    { type: 'path', d: 'M4 18h16' },
    { type: 'path', d: 'M7 15l3.2-4.2 3.1 2.4L17 8' },
    { type: 'circle', cx: '17', cy: '8', r: '1.3' },
  ],
  analytics: [
    { type: 'path', d: 'M6 18V9' },
    { type: 'path', d: 'M12 18V6' },
    { type: 'path', d: 'M18 18v-7' },
  ],
  reports: [
    { type: 'path', d: 'M7 4.5h7.5L19 9v10.5H7z' },
    { type: 'path', d: 'M14.5 4.5V9H19' },
    { type: 'path', d: 'M10 13h4.5' },
    { type: 'path', d: 'M10 16h3' },
  ],
  benchmarking: [
    { type: 'circle', cx: '12', cy: '12', r: '7.5' },
    { type: 'circle', cx: '12', cy: '12', r: '3.2' },
    { type: 'path', d: 'M12 4.5V7' },
    { type: 'path', d: 'M19.5 12H17' },
  ],
  insights: [
    { type: 'circle', cx: '12', cy: '10', r: '5.2' },
    { type: 'path', d: 'M10 15.6 9.3 20h5.4L14 15.6' },
    { type: 'path', d: 'M10.2 10.2h3.6' },
  ],
  documents: [
    { type: 'path', d: 'M7 5.5h7l3 3V18.5H7z' },
    { type: 'path', d: 'M14 5.5v3h3' },
    { type: 'path', d: 'M9.5 12h5' },
    { type: 'path', d: 'M9.5 15h3.5' },
  ],
  security: [
    { type: 'path', d: 'M12 3.8 5.5 6.4v5.3c0 4.3 2.8 7.1 6.5 8.5 3.7-1.4 6.5-4.2 6.5-8.5V6.4z' },
    { type: 'path', d: 'M9.6 12.1 11.4 14l3.2-3.5' },
  ],
  workflow: [
    { type: 'circle', cx: '6', cy: '7', r: '2' },
    { type: 'circle', cx: '18', cy: '7', r: '2' },
    { type: 'circle', cx: '12', cy: '17', r: '2' },
    { type: 'path', d: 'M8 7h8' },
    { type: 'path', d: 'M6 9v3.2C6 13.8 7.2 15 8.8 15H10' },
    { type: 'path', d: 'M18 9v3.2C18 13.8 16.8 15 15.2 15H14' },
  ],
  users: [
    { type: 'circle', cx: '9', cy: '8.5', r: '2.4' },
    { type: 'path', d: 'M4.8 17.5c.5-2.6 2.3-4 4.2-4s3.7 1.4 4.2 4' },
    { type: 'circle', cx: '16.3', cy: '9.2', r: '2' },
    { type: 'path', d: 'M14.6 17.5c.4-1.8 1.6-3 3.1-3 1 0 1.8.5 2.3 1.4' },
  ],
  settings: [
    { type: 'circle', cx: '12', cy: '12', r: '3' },
    {
      type: 'path',
      d: 'M19.2 13.4a7.7 7.7 0 0 0 0-2.8l1.8-1.4-1.7-3-2.1.6a7.5 7.5 0 0 0-2.4-1.4L14.3 3h-4.6L9.2 5.4A7.5 7.5 0 0 0 6.8 6.8l-2.1-.6-1.7 3 1.8 1.4a7.7 7.7 0 0 0 0 2.8L3 14.8l1.7 3 2.1-.6a7.5 7.5 0 0 0 2.4 1.4L9.7 21h4.6l.5-2.4a7.5 7.5 0 0 0 2.4-1.4l2.1.6 1.7-3z',
    },
  ],
  dashboard: [
    { type: 'path', d: 'M4.8 4.8h6.2v6.2H4.8z' },
    { type: 'path', d: 'M13 4.8h6.2v4H13z' },
    { type: 'path', d: 'M13 11.2h6.2v8H13z' },
    { type: 'path', d: 'M4.8 13.4h6.2v5.8H4.8z' },
  ],
}

export function isCustomIcon(name: string): name is CustomIconName {
  return customIconNames.includes(name as CustomIconName)
}
