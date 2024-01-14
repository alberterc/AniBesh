const { SlashCommandBuilder, SlashCommandStringOption } = require('discord.js');
const { request } = require('undici');

const commandNames = {
    title: 'title',
    orderBy: 'order_by',
    sort: 'sort'
};

const titleOptions = new SlashCommandStringOption()
    .setName(commandNames.title)
    .setRequired(false)
    .setDescription('Anime Title');

const orderByOptions = new SlashCommandStringOption()
    .setName(commandNames.orderBy)
    .setRequired(false)
    .setDescription('Order Result By. Default: Favorites')
    .addChoices(
        { name: 'Favorites', value: 'favorites'},
        { name: 'Title', value: 'title'},
        { name: 'Start Date', value: 'start_date'},
        { name: 'End Date', value: 'end_date'},
        { name: 'Episodes', value: 'episodes'},
        { name: 'Score', value: 'score'},
        { name: 'Rank', value: 'rank'},
        { name: 'Popularity', value: 'popularity'}
    );

const sortByOptions = new SlashCommandStringOption()
    .setName(commandNames.sort)
    .setRequired(false)
    .setDescription('Sort Result. Default: Descending')
    .addChoices(
        { name: 'Ascending', value: 'asc'},
        { name: 'Descending', value: 'desc'}
    );

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('anisearch')
        .setDescription('Search for an anime title')
        .addStringOption(titleOptions)
        .addStringOption(orderByOptions)
        .addStringOption(sortByOptions),
    async execute(interaction) {
        await interaction.deferReply();

        let interactionMessage = `Based on your search for:\n`;

        let title = '';
        if (interaction.options.getString(commandNames.title) !== null) {
            title = interaction.options.getString(commandNames.title);
            interactionMessage += `- Title: *${title}*\n`;
        }
        else {
            interactionMessage += `- Title: *${title}*\n`;
        }

        let orderby = 'favorites';
        if (interaction.options.getString(commandNames.orderBy) !== null) {
            orderby = interaction.options.getString(commandNames.orderBy);
            interactionMessage += `- Order by: *${orderby}*\n`;
        }
        else {
            interactionMessage += `- Order by: *${orderby}*\n`;
        }

        let sortby = 'desc';
        if (interaction.options.getString(commandNames.sort) !== null) {
            sortby = interaction.options.getString(commandNames.sort);
            interactionMessage += `- Sort: *${sortby}*\n`;
        }
        else {
            interactionMessage += `- Sort: *${sortby}*\n`;
        }

		const params = new URLSearchParams({
            q: title,
            order_by: orderby,
            sort: sortby
        });

        const url = `https://api.jikan.moe/v4/anime?limit=10&page=1&${params}`;
        const searchResult = await request(url);
		const response = await searchResult.body.json();
        
        if (response && response.data && !response.data.length) {
			return interaction.editReply(`No results found for **${title}**.`);
		}

        const resultList = response.data;

        interactionMessage += `Results:\n`
        for (const result of resultList) {
            interactionMessage += `- ${result.title}\n`
        }

        interaction.editReply(interactionMessage);
    }
};