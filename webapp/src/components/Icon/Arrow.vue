<script>
export default {
  name: 'icon-arrow',
  props: {
    color: { type: String, required: false, default: () => '#6C38D3' },
    rotate: { type: Number, required: false, default: () => 0 }
  },
  computed: {
    styles() {
      return {
        '-ms-transform': `rotate(${this.rotate}deg)`,
        transform: `rotate(${this.rotate}deg)`
      }
    }
  },
}
</script>
<template>
  <svg :style="styles" width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0)">
    <path d="M11.3981 2.7265L6.19146 12.7265C6.10191 12.8985 5.9228 13 5.72756 13C5.68694 13 5.64633 12.992 5.60572 12.9845C5.36986 12.93 5.2069 12.7345 5.2069 12.5V7.99999H0.520953C0.276764 7.99999 0.0737061 7.84349 0.0164335 7.61699C-0.0408391 7.39049 0.0731855 7.15599 0.285094 7.05449L10.6983 2.0545C10.7717 2.0155 10.8529 2 10.9342 2C11.0727 2 11.2028 2.047 11.3002 2.1485C11.4631 2.297 11.5038 2.5315 11.3975 2.7265H11.3981Z" :fill="color"/>
    </g>
    <defs>
    <clipPath id="clip0">
    <rect width="11.4545" height="14" fill="white"/>
    </clipPath>
    </defs>
  </svg>
</template>

