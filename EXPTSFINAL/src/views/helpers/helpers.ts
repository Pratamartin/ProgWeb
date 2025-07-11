function eq(a: any, b: any): boolean {
  return a === b;
}

function listNodeTechnologies(techs: { name: string; type: string; poweredByNodejs: boolean }[]) {
  const list = techs
    .filter(t => t.poweredByNodejs)
    .map(t => `<li>${t.name} - ${t.type}</li>`)
    .join('');
  return `<ul>${list}</ul>`;
}

export default {
  eq,
  listNodeTechnologies
};
