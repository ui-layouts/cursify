export function NavigationIcon({ open }: { open: boolean }) {
  const outline = 'M3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124Z';
  const leftPanel = 'M2.5 7C2.5 4.5 4.5 2.5 7 2.5H9V21.5H7C4.5 21.5 2.5 19.5 2.5 17V7Z';
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" strokeLinecap="round" strokeLinejoin="round">
      {open && <path d={leftPanel} fill="#484848" />}
      <path d={outline} stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 2.5V21.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function PanelIcon({ open }: { open: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" stroke="currentColor" />
      <path d="M12 2.5V21.5" strokeWidth="1.5" strokeLinecap="round" stroke="currentColor" />
      {open && <path d="M3 7C3 4.79086 4.79086 3 7 3H12V21H7C4.79086 21 3 19.2091 3 17V7Z" fill="currentColor" fillOpacity=".72" />}
    </svg>
  );
}
