export default function Footer() {
  const releaseYear = 2026;
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <small>
        <span aria-hidden='true'>&copy; </span>
        <span className='visually-hidden'>Copyright</span>
        <span>
          {releaseYear === currentYear
            ? `${currentYear} `
            : `${releaseYear}-${currentYear} `}
        </span>
        Ana Vučić
      </small>
    </footer>
  );
}
