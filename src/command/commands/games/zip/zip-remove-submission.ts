import { ChatInputCommandInteraction, SlashCommandBuilder, Snowflake } from "discord.js";
import { Command } from "../../../command";

import { ZipGameDatabase } from "../../../../fun/zipgamedb";

export const command: Command = {
	data: new SlashCommandBuilder()
		.setName("zip-remove-submission")
		.addStringOption(option => option
			.setName("message_id")
			.setDescription("Submission's message ID")
			.setRequired(true)
		)
		.setDescription("remove zip submission from database"),
	init: () => { },
	execute: async (interaction: ChatInputCommandInteraction) => {
		const resultRemoved = 
			ZipGameDatabase.getInstance()
							.removeSubmission(interaction.options.getString('message_id', true));

		if (!resultRemoved) {
			await interaction.reply({
				content: "There is no submission in the database with that message ID.",
				flags: "Ephemeral"
			});
			return;
		}

		await interaction.reply({
			content: "Successfully removed submission!",
			flags: "Ephemeral"
		});
	},
};