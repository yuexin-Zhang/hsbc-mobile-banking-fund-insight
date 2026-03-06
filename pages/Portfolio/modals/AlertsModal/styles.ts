export const dropdownAnimationStyles = `
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.3); }
    to { opacity: 1; transform: scale(1); }
  }
  .alert-dropdown {
    animation: scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    transform-origin: top right;
  }
`;
