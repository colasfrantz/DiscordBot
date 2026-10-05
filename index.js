import { Client, GatewayIntentBits, Events, EmbedBuilder } from 'discord.js';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, async (c) => {
  // Enregistre la commande sur ton serveur de test (apparition instantanée)
  await c.guilds.cache.get(process.env.GUILD_ID)?.commands.set([
    { name: 'ping', description: 'Vérifie que le bot répond' },
  ]);
  console.log(`Connecté en tant que ${c.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'ping') {
    const embed = new EmbedBuilder()
      .setColor(0x5865f2)
      .setTitle('Pong 🏓')
      .setDescription('Le bot fonctionne.');
    await interaction.reply({ embeds: [embed] });
  }
});

client.login(process.env.DISCORD_TOKEN);