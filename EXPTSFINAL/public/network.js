export async function enviarPontuacao(score) {
  try {
    await fetch('/game-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ score })
    });
    console.log('Pontuação enviada:', score);
  } catch (err) {
    console.error('Erro ao enviar pontuação:', err);
  }
}
