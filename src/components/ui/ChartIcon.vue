<template>
  <span class="chart-icon-wrap" title="Visual Chart & Graph Included">
    <svg
      class="chart-icon-svg"
      viewBox="0 0 32 22"
      width="32"
      height="22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Chart Included"
    >
      <defs>
        <linearGradient id="valu8erChartBg" x1="0" y1="0" x2="32" y2="22" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#0284c7" stop-opacity="0.32" />
          <stop offset="100%" stop-color="#00d1b2" stop-opacity="0.22" />
        </linearGradient>
        <linearGradient id="valu8erChartBar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#38bdf8" />
          <stop offset="100%" stop-color="#00d1b2" />
        </linearGradient>
        <linearGradient id="valu8erChartLine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#7dd3fc" />
          <stop offset="100%" stop-color="#ffffff" />
        </linearGradient>
      </defs>

      <!-- Glass Background Box -->
      <rect
        x="0.5"
        y="0.5"
        width="31"
        height="21"
        rx="3.5"
        fill="url(#valu8erChartBg)"
        stroke="rgba(56, 189, 248, 0.5)"
        stroke-width="1"
      />

      <!-- Vertical Bars -->
      <rect x="4" y="12" width="3" height="6" rx="0.75" fill="url(#valu8erChartBar)" fill-opacity="0.75" />
      <rect x="9" y="8.5" width="3" height="9.5" rx="0.75" fill="url(#valu8erChartBar)" fill-opacity="0.85" />
      <rect x="14" y="11" width="3" height="7" rx="0.75" fill="url(#valu8erChartBar)" fill-opacity="0.8" />
      <rect x="19" y="6" width="3" height="12" rx="0.75" fill="url(#valu8erChartBar)" fill-opacity="0.95" />
      <rect x="24" y="3.5" width="3" height="14.5" rx="0.75" fill="#38bdf8" />

      <!-- Upward Trend Line -->
      <path
        d="M 5.5 11.5 Q 11.5 7.5 15.5 10 T 25.5 3"
        fill="none"
        stroke="url(#valu8erChartLine)"
        stroke-width="1.4"
        stroke-linecap="round"
      />

      <!-- Peak Point Marker -->
      <circle cx="25.5" cy="3" r="1.3" fill="#ffffff" />
    </svg>
  </span>
</template>

<style scoped>
.chart-icon-wrap {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  line-height: 1;
  cursor: default;
}

.chart-icon-svg {
  display: block;
  transition: transform 0.2s ease, filter 0.2s ease;
  filter: drop-shadow(0 1px 3px rgba(0, 0, 0, 0.3));
}

.chart-icon-wrap:hover .chart-icon-svg {
  transform: scale(1.15);
  filter: drop-shadow(0 2px 8px rgba(0, 209, 178, 0.45));
}
</style>
