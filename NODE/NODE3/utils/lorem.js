export function generateLorem(count) {
  const paragraph = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.";
  return Array(count).fill(paragraph).join("\n\n");
}
