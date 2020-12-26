const colors = require('tailwindcss/colors');
const plugin = require('tailwindcss/plugin');

module.exports = {
	purge: ['./src/**/*.tsx'],
	darkMode: false,

	theme: {
		extend: {
			colors: {
				rose: colors.rose,
			},
			spacing: {
				// For sidebar width to match traffic lights
				17: '4.25rem',
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [
		require('@tailwindcss/forms'),
		require('@tailwindcss/typography'),
		require('@tailwindcss/aspect-ratio'),
		plugin(({ addUtilities }) => {
			addUtilities({
				'.draggable': {
					'-webkit-app-region': 'drag',
				},
			});
		}),
	],
};
