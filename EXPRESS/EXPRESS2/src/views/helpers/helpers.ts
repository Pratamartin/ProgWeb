export function listProfs(techs: any[]) {
  const filtered = techs.filter(t => t.poweredByNodejs);
  const list = filtered.map(t => `<li>${t.name} - ${t.type}</li>`);
  return `<ul>${list.join('')}</ul>`;
}
