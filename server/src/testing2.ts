function degreesToString(degrees: number) {
  if (degrees < -30) return 'Få inn katta!';
  if (degrees < -20) return 'Kjøle kaaalt';
  if (degrees > 30) return 'Kokheitt';
  if (degrees > 20) return 'Søkke heitt';
  return 'Julivær';
}

export { degreesToString }