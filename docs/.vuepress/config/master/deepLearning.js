export const DeepLearningNavBar = {
	text: 'Deep Learning',
	children: [
		{ text: 'Ubuntu', link: '/master/ubuntu/' },
		{ text: 'GNN', link: '/master/GNN/' },
		{ text: 'Python', link: '/master/python/' },
	]
}

export const DeepLearningSideBar = {
	'/master/ubuntu/': [
		{
			text: 'Ubuntu',
			children: [
				'/master/ubuntu/README.md',
				'/master/ubuntu/system_usage.md',
				'/master/ubuntu/python_usage.md',
				'/master/ubuntu/java_usage.md',
			],
		},
	],
	'/master/GNN/': [
		{
			text: 'GNN',
			children: [
				'/master/GNN/README.md',
				'/master/GNN/base_concept.md',
				'/master/GNN/pytorch_usage.md',
				'/master/GNN/python_usage.md',
			],
		},
	],
	'/master/python/': [
		{
			text: 'Python',
			children: [
				'/master/python/README.md',
				'/master/python/base_usage.md',
			],
		},
	],
}