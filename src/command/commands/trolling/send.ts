import { ChatInputCommandInteraction, SlashCommandBuilder, TextChannel } from "discord.js";
import { Command } from "../../command";

import { ConfigHandler } from "../../../config/config";
const { Channels } = ConfigHandler.getInstance().getConfig();

//There should be a command to make PotatoBot send custom messages, but only accessible by staff in the staff chat
export const command: Command = {
	data: new SlashCommandBuilder()
		.setName('send')
		.addChannelOption(option => option
			.setName('channel')
			.setDescription('The channel to be sent in')
			.setRequired(true))
		.addStringOption(option => option
			.setName('message')
			.setDescription('The message to be sent')
			.setRequired(true))	
		.setDescription('sends a message as the bot in the specified channel'),
	init: () => {},
	permittedChannelIDs: [Channels.zombbblob_trolling, Channels.staff_bot_commands],
	execute: async (interaction: ChatInputCommandInteraction) => {
		const targetChannel = interaction.options.getChannel('channel', true);
		if (!(targetChannel instanceof TextChannel)) {
			await interaction.reply("Target channel must be a text channel!");
			return;
		}

		await targetChannel.send(interaction.options.getString('message', true))
			.then(message => interaction.reply(`Message sent! ${message.url}`))
			.catch(_ => interaction.reply("Failed to send message in that channel (I probably don't have permissions)."));
	}
};